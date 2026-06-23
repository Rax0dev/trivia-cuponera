"""
Servidor de desarrollo local para probar api/notify.py sin Vercel.
Carga las variables de .env.local y levanta el handler en el puerto 8000.
"""

import os
from http.server import HTTPServer


def load_env_local(path=".env.local"):
    """Carga manualmente las variables de .env.local en os.environ."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"No se encontro {path}")

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ[key.strip()] = value.strip()


if __name__ == "__main__":
    load_env_local()
    # Importamos despues de cargar las variables de entorno.
    from api.notify import handler

    port = 8000
    server = HTTPServer(("localhost", port), handler)
    print(f"Backend listo en http://localhost:{port}/api/notify")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nApagando servidor...")
    finally:
        server.shutdown()
