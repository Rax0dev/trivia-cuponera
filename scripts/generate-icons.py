from PIL import Image, ImageDraw
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS_DIR = os.path.join(ROOT, 'public', 'icons')
os.makedirs(ICONS_DIR, exist_ok=True)


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4))


def interpolate_color(c1, c2, factor):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * factor) for i in range(3))


def rounded_rectangle(draw, xy, radius, fill):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def draw_gradient_background(draw, size, stops):
    for y in range(size):
        factor = y / (size - 1)
        if factor <= 0.5:
            local_factor = factor / 0.5
            color = interpolate_color(stops[0], stops[1], local_factor)
        else:
            local_factor = (factor - 0.5) / 0.5
            color = interpolate_color(stops[1], stops[2], local_factor)
        draw.line([(0, y), (size, y)], fill=color)


def heart_points(center_x, center_y, scale):
    points = []
    for i in range(200):
        t = (i / 200.0) * 2 * math.pi
        x = 16 * math.sin(t) ** 3
        y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
        points.append((center_x + x * scale, center_y + y * scale))
    return points


def draw_star(draw, cx, cy, radius, fill):
    points = []
    for i in range(10):
        angle = math.pi / 2 + i * 2 * math.pi / 10
        r = radius if i % 2 == 0 else radius / 2.5
        x = cx + r * math.cos(angle)
        y = cy - r * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill)


def create_icon(size, output_path):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    corner_radius = size // 4
    stops = [hex_to_rgb('#fff1f2'), hex_to_rgb('#fce7f3'), hex_to_rgb('#fbcfe8')]
    draw_gradient_background(draw, size, stops)

    # Heart
    scale = size / 28
    points = heart_points(size // 2, int(size * 0.48), scale)
    draw.polygon(points, fill=hex_to_rgb('#e11d48'))

    # Little star sparkle
    star_size = size // 14
    draw_star(draw, int(size * 0.72), int(size * 0.28), star_size, hex_to_rgb('#fbbf24'))

    img.save(output_path, 'PNG')
    print(f'Saved {output_path}')


def main():
    create_icon(192, os.path.join(ICONS_DIR, 'icon-192.png'))
    create_icon(512, os.path.join(ICONS_DIR, 'icon-512.png'))
    create_icon(180, os.path.join(ICONS_DIR, 'apple-touch-icon.png'))


if __name__ == '__main__':
    main()
