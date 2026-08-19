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


def draw_gradient_diagonal(draw, size, color1, color2):
    for y in range(size):
        for x in range(size):
            factor = (x + y) / (2 * size - 2)
            color = interpolate_color(color1, color2, factor)
            draw.point((x, y), fill=color)


def create_icon(size, output_path):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Fondo redondeado
    corner_radius = size // 6
    bg_color = hex_to_rgb('#fce7f3')
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner_radius, fill=bg_color)

    # Cuerpo de la bóveda con gradiente
    margin = int(size * 0.16)
    vault_radius = size // 12
    
    # Gradiente diagonal para la bóveda
    vault_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    vault_draw = ImageDraw.Draw(vault_img)
    
    color1 = hex_to_rgb('#f472b6')
    color2 = hex_to_rgb('#e11d48')
    
    for y in range(margin, size - margin):
        for x in range(margin, size - margin):
            factor = (x + y - 2 * margin) / (2 * (size - 2 * margin) - 2)
            color = interpolate_color(color1, color2, factor)
            vault_draw.point((x, y), fill=color)
    
    # Crear máscara para el rectángulo redondeado
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([margin, margin, size - margin - 1, size - margin - 1], 
                                radius=vault_radius, fill=255)
    
    # Aplicar máscara
    img.paste(vault_img, (0, 0), mask)
    draw = ImageDraw.Draw(img)
    
    # Borde de la bóveda
    border_color = hex_to_rgb('#be185d')
    border_width = max(2, size // 40)
    draw.rounded_rectangle([margin, margin, size - margin - 1, size - margin - 1], 
                          radius=vault_radius, outline=border_color, width=border_width)

    # Puerta circular con gradiente
    center = size // 2
    door_radius = int(size * 0.23)
    
    door_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    door_draw = ImageDraw.Draw(door_img)
    
    door_color1 = hex_to_rgb('#a855f7')
    door_color2 = hex_to_rgb('#9333ea')
    
    for y in range(center - door_radius, center + door_radius + 1):
        for x in range(center - door_radius, center + door_radius + 1):
            if (x - center) ** 2 + (y - center) ** 2 <= door_radius ** 2:
                factor = (x + y - 2 * (center - door_radius)) / (4 * door_radius)
                color = interpolate_color(door_color1, door_color2, factor)
                door_draw.point((x, y), fill=color)
    
    # Máscara para el círculo
    door_mask = Image.new('L', (size, size), 0)
    door_mask_draw = ImageDraw.Draw(door_mask)
    door_mask_draw.ellipse([center - door_radius, center - door_radius, 
                           center + door_radius, center + door_radius], fill=255)
    
    img.paste(door_img, (0, 0), door_mask)
    draw = ImageDraw.Draw(img)
    
    # Borde de la puerta
    door_border = hex_to_rgb('#7e22ce')
    door_border_width = max(2, size // 60)
    draw.ellipse([center - door_radius, center - door_radius, 
                 center + door_radius, center + door_radius], 
                outline=door_border, width=door_border_width)

    # Cerradura central
    lock_radius = int(size * 0.08)
    lock_color = hex_to_rgb('#fce7f3')
    lock_border = hex_to_rgb('#be185d')
    lock_border_width = max(1, size // 80)
    
    draw.ellipse([center - lock_radius, center - lock_radius, 
                 center + lock_radius, center + lock_radius], 
                fill=lock_color, outline=lock_border, width=lock_border_width)

    # Manija de la cerradura (cruz)
    handle_color = hex_to_rgb('#be185d')
    handle_width = max(2, size // 30)
    handle_length = int(size * 0.14)
    
    # Vertical
    draw.rounded_rectangle([center - handle_width // 2, center - handle_length,
                           center + handle_width // 2, center + handle_length],
                          radius=handle_width // 2, fill=handle_color)
    # Horizontal
    draw.rounded_rectangle([center - handle_length, center - handle_width // 2,
                           center + handle_length, center + handle_width // 2],
                          radius=handle_width // 2, fill=handle_color)

    # Bisagras decorativas
    hinge_radius = int(size * 0.03)
    hinge_offset = int(size * 0.20)
    hinge_color = hex_to_rgb('#fce7f3')
    hinge_border = hex_to_rgb('#be185d')
    hinge_border_width = max(1, size // 100)
    
    hinge_positions = [
        (margin + hinge_offset, margin + hinge_offset),
        (size - margin - hinge_offset, margin + hinge_offset),
        (margin + hinge_offset, size - margin - hinge_offset),
        (size - margin - hinge_offset, size - margin - hinge_offset),
    ]
    
    for hx, hy in hinge_positions:
        draw.ellipse([hx - hinge_radius, hy - hinge_radius,
                     hx + hinge_radius, hy + hinge_radius],
                    fill=hinge_color, outline=hinge_border, width=hinge_border_width)

    # Brillo cartoon
    shine_x = int(size * 0.35)
    shine_y = int(size * 0.35)
    shine_rx = int(size * 0.06)
    shine_ry = int(size * 0.04)
    
    shine_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    shine_draw = ImageDraw.Draw(shine_img)
    shine_draw.ellipse([shine_x - shine_rx, shine_y - shine_ry,
                       shine_x + shine_rx, shine_y + shine_ry],
                      fill=(*hex_to_rgb('#fce7f3'), 150))
    
    img = Image.alpha_composite(img, shine_img)

    img.save(output_path, 'PNG')
    print(f'Saved {output_path}')


def main():
    create_icon(192, os.path.join(ICONS_DIR, 'icon-192.png'))
    create_icon(512, os.path.join(ICONS_DIR, 'icon-512.png'))
    create_icon(180, os.path.join(ICONS_DIR, 'apple-touch-icon.png'))


if __name__ == '__main__':
    main()
