"""
Author: OrenimDev
Description: Serverless Function for Vercel that receives a redeemed coupon
name via POST and sends an immediate notification through Telegram.

Route: POST /api/notify
Body JSON: {"cupon": "Nombre del cupón"}
"""

import html
import json
import os
import time
from http.server import BaseHTTPRequestHandler
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


# ---------------------------------------------------------------------------
# Environment configuration
# ---------------------------------------------------------------------------
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

# Optional API key. If set, every request must include the header x-api-key.
# Leave empty if you want to rely only on the obscurity of the endpoint URL.
NOTIFY_API_KEY = os.environ.get("NOTIFY_API_KEY", "")

# Allowed origins for CORS. Examples:
#   ALLOWED_ORIGINS=https://trivia-cuponera.vercel.app,http://localhost:5173
# If left empty, only localhost origins are allowed (safe default for dev).
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "")

# Rate limiting: max requests per IP within the time window.
# These are safe defaults for a personal app. Tune as needed.
RATE_LIMIT_REQUESTS = int(os.environ.get("RATE_LIMIT_REQUESTS", "5"))
RATE_LIMIT_WINDOW_SECONDS = int(os.environ.get("RATE_LIMIT_WINDOW_SECONDS", "60"))

# ---------------------------------------------------------------------------
# In-memory rate limiter
# Note: this works for warm serverless instances. It is not distributed,
# but it is enough to stop casual abuse on a small personal project.
# ---------------------------------------------------------------------------
_request_log = {}


def _get_client_ip(headers):
    """Extract the client IP from common proxy headers or fallback."""
    forwarded = headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    real_ip = headers.get("X-Real-IP", "")
    if real_ip:
        return real_ip.strip()
    return headers.get("Remote-Addr", "unknown")


def is_rate_limited(client_ip):
    """Return True if the client has exceeded the configured request limit."""
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECONDS
    log = _request_log.get(client_ip, [])
    # Keep only timestamps inside the current window.
    log = [timestamp for timestamp in log if timestamp > window_start]
    if len(log) >= RATE_LIMIT_REQUESTS:
        _request_log[client_ip] = log
        return True
    log.append(now)
    _request_log[client_ip] = log
    return False


# ---------------------------------------------------------------------------
# CORS helpers
# ---------------------------------------------------------------------------
def get_allowed_origins():
    """Return the set of origins explicitly allowed by ALLOWED_ORIGINS."""
    if not ALLOWED_ORIGINS.strip():
        return set()
    return {origin.strip() for origin in ALLOWED_ORIGINS.split(",") if origin.strip()}


def is_origin_allowed(origin):
    """
    Decide whether an Origin header value is allowed.
    - If ALLOWED_ORIGINS is configured, only listed origins pass.
    - Otherwise, only localhost origins are accepted (development fallback).
    """
    if not origin:
        return True
    allowed = get_allowed_origins()
    if not allowed:
        return origin.startswith("http://localhost") or origin.startswith("http://127.0.0.1")
    return origin in allowed


# ---------------------------------------------------------------------------
# Telegram helper
# ---------------------------------------------------------------------------
def send_telegram_message(coupon_name):
    """
    Send a WhatsApp-style alert to Telegram via the Bot API.
    Returns the parsed JSON response from Telegram.
    """
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        raise RuntimeError("Telegram credentials are not configured")

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    safe_name = html.escape(coupon_name)
    text = f"🚨 ¡Atención! Mi Amochito acaba de canjear el cupón: {safe_name} 🚨"

    payload = urlencode({
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
    }).encode("utf-8")

    request = Request(
        url,
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    with urlopen(request, timeout=10) as response:
        return json.loads(response.read().decode("utf-8"))


# ---------------------------------------------------------------------------
# Vercel Serverless handler
# Vercel detects a class named `handler` extending BaseHTTPRequestHandler.
# ---------------------------------------------------------------------------
class handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Keep production logs clean.
        pass

    def _set_cors_headers(self):
        """Add CORS headers to the response."""
        origin = self.headers.get("Origin", "")
        if is_origin_allowed(origin):
            self.send_header("Access-Control-Allow-Origin", origin or "*")
        else:
            self.send_header("Access-Control-Allow-Origin", "")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, x-api-key")
        self.send_header("Access-Control-Max-Age", "86400")

    def _send_json(self, status_code, payload):
        """Send a JSON response with the given status code."""
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self._set_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_error(self, status_code, message):
        """Send a JSON error response."""
        self._send_json(status_code, {"ok": False, "error": message})

    def _read_body(self):
        """Read and return the request body as bytes."""
        content_length = self.headers.get("Content-Length")
        if not content_length:
            return b""
        return self.rfile.read(int(content_length))

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        """Receive the coupon name and trigger the Telegram notification."""
        client_ip = _get_client_ip(self.headers)
        if is_rate_limited(client_ip):
            return self._send_error(429, "Too many requests. Please slow down.")

        # Validate the optional API key if one is configured.
        api_key = self.headers.get("x-api-key", "")
        if NOTIFY_API_KEY and api_key != NOTIFY_API_KEY:
            return self._send_error(401, "Unauthorized")

        # Only JSON bodies are accepted.
        content_type = self.headers.get("Content-Type", "")
        if "application/json" not in content_type:
            return self._send_error(415, "Content-Type must be application/json")

        # Parse the request body.
        raw_body = self._read_body()
        try:
            body = json.loads(raw_body.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return self._send_error(400, "Invalid JSON body")

        coupon_name = body.get("cupon")
        if not coupon_name or not isinstance(coupon_name, str):
            return self._send_error(400, "Field 'cupon' is required and must be a string")

        # Send the Telegram message.
        try:
            telegram_response = send_telegram_message(coupon_name)
        except HTTPError as exc:
            return self._send_error(502, f"Telegram API error: {exc.code}")
        except URLError as exc:
            return self._send_error(502, f"Could not reach Telegram: {exc.reason}")
        except RuntimeError as exc:
            return self._send_error(500, str(exc))
        except Exception as exc:  # noqa: BLE001
            # Never leak internal details to the client.
            return self._send_error(502, f"Notification failed: {type(exc).__name__}")

        self._send_json(200, {
            "ok": True,
            "message": "Notification sent",
            "coupon": coupon_name,
            "telegram": telegram_response,
        })
