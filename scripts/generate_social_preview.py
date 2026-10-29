import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_social_preview(output_path="public/github-social-preview.png"):
    width = 1280
    height = 640

    # 1. Base Image
    img = Image.new("RGBA", (width, height), (16, 24, 48, 255))
    draw = ImageDraw.Draw(img)

    # 2. Gradient Background (Deep Navy to Slate Blue)
    for y in range(height):
        ratio = y / height
        r = int(18 + (34 - 18) * ratio)
        g = int(27 + (52 - 27) * ratio)
        b = int(58 + (88 - 58) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 3. Ambient Glows (Upper Right Gold Glow & Center Left Soft Blue Glow)
    glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)

    # Gold glow at top right
    for rad in range(350, 0, -10):
        alpha = int(35 * (1 - rad / 350))
        glow_draw.ellipse(
            [1050 - rad, 160 - rad, 1050 + rad, 160 + rad],
            fill=(234, 182, 48, alpha)
        )

    # Blue glow at center left
    for rad in range(300, 0, -10):
        alpha = int(25 * (1 - rad / 300))
        glow_draw.ellipse(
            [250 - rad, 320 - rad, 250 + rad, 320 + rad],
            fill=(75, 110, 190, alpha)
        )

    img = Image.alpha_composite(img, glow_layer)
    draw = ImageDraw.Draw(img)

    # 4. Subtle Decorative Tech Grid (Dot grid)
    dot_color = (255, 255, 255, 18)
    for x in range(40, width, 40):
        for y in range(40, height, 40):
            draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=dot_color)

    # 5. Fonts setup
    font_dir = "C:/Windows/Fonts"
    font_bold = os.path.join(font_dir, "segoeuib.ttf")
    font_regular = os.path.join(font_dir, "segoeui.ttf")
    font_semibold = os.path.join(font_dir, "seguisb.ttf") if os.path.exists(os.path.join(font_dir, "seguisb.ttf")) else font_bold

    try:
        f_badge = ImageFont.truetype(font_bold, 14)
        f_title = ImageFont.truetype(font_bold, 54)
        f_sub = ImageFont.truetype(font_regular, 20)
        f_desc = ImageFont.truetype(font_regular, 16)
        f_card_label = ImageFont.truetype(font_bold, 13)
        f_card_ticket = ImageFont.truetype(font_bold, 50)
        f_card_body = ImageFont.truetype(font_semibold, 16)
        f_card_small = ImageFont.truetype(font_regular, 13)
        f_tech = ImageFont.truetype(font_semibold, 14)
    except Exception:
        f_badge = f_title = f_sub = f_desc = f_card_label = f_card_ticket = f_card_body = f_card_small = f_tech = ImageFont.load_default()

    # 6. Top Decorative Gold Border
    draw.rectangle([0, 0, width, 5], fill=(234, 182, 48, 255))
    draw.rectangle([width // 2 - 200, 0, width // 2 + 200, 5], fill=(255, 223, 156, 255))

    # 7. LEFT SIDE CONTENT
    left_x = 75

    # Top Pill Badge
    pill_w = 340
    pill_h = 34
    pill_y = 65
    draw.rounded_rectangle(
        [left_x, pill_y, left_x + pill_w, pill_y + pill_h],
        radius=17,
        fill=(32, 48, 92, 220),
        outline=(234, 182, 48, 180),
        width=1
    )
    # Badge dot
    draw.ellipse([left_x + 14, pill_y + 12, left_x + 24, pill_y + 22], fill=(234, 182, 48, 255))
    draw.text((left_x + 32, pill_y + 7), "PEMERINTAH KOTA SAMARINDA • 2026", fill=(255, 223, 156, 255), font=f_badge)

    # Big Titles
    draw.text((left_x, 125), "E-Tamu Disperkim", fill=(255, 255, 255, 255), font=f_title)
    draw.text((left_x, 190), "Kota Samarinda", fill=(234, 182, 48, 255), font=f_title)

    # Subtitle
    draw.text(
        (left_x, 268),
        "Sistem Buku Tamu Digital & Rekapitulasi Pelayanan Publik",
        fill=(219, 225, 255, 255),
        font=f_sub
    )

    # Narrative summary
    draw.text(
        (left_x, 305),
        "Pencatatan tamu mandiri ramah layar sentuh (kiosk), antrean transparan,\ndan kepastian verifikasi bidang teknis perumahan & kawasan permukiman.",
        fill=(180, 192, 220, 240),
        font=f_desc
    )

    # Feature Bullet Chips
    chips_y = 375
    chips = [
        "Antrean Otomatis WITA",
        "Scan QR Mandiri",
        "Dashboard Petugas",
        "Ekspor CSV & PDF"
    ]
    cur_x = left_x
    for chip in chips:
        c_w = int(draw.textlength(chip, font=f_card_small)) + 30
        draw.rounded_rectangle(
            [cur_x, chips_y, cur_x + c_w, chips_y + 30],
            radius=8,
            fill=(255, 255, 255, 18),
            outline=(255, 255, 255, 40),
            width=1
        )
        draw.ellipse([cur_x + 10, chips_y + 11, cur_x + 16, chips_y + 17], fill=(234, 182, 48, 255))
        draw.text((cur_x + 22, chips_y + 6), chip, fill=(240, 244, 255, 255), font=f_card_small)
        cur_x += c_w + 10

    # Tech Stack Badges at Bottom Left
    tech_y = 485
    draw.text((left_x, tech_y - 22), "TEKNOLOGI & ARSITEKTUR:", fill=(140, 160, 200, 200), font=f_card_label)
    techs = ["React 18", "Vite 6", "TypeScript Strict", "Tailwind CSS", "SPBE Standar"]
    t_x = left_x
    for t in techs:
        t_w = int(draw.textlength(t, font=f_tech)) + 24
        draw.rounded_rectangle(
            [t_x, tech_y, t_x + t_w, tech_y + 34],
            radius=10,
            fill=(23, 34, 65, 255),
            outline=(234, 182, 48, 120),
            width=1
        )
        draw.text((t_x + 12, tech_y + 7), t, fill=(255, 255, 255, 240), font=f_tech)
        t_x += t_w + 12

    # 8. RIGHT SIDE: MOCKUP GLASSMORPHISM UI CARD
    card_x = 750
    card_y = 75
    card_w = 460
    card_h = 490

    # Card shadow
    card_shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(card_shadow)
    s_draw.rounded_rectangle(
        [card_x + 8, card_y + 12, card_x + card_w + 8, card_y + card_h + 12],
        radius=26,
        fill=(0, 0, 0, 100)
    )
    card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(14))
    img = Image.alpha_composite(img, card_shadow)
    draw = ImageDraw.Draw(img)

    # Card Background (Glass effect)
    card_bg = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_bg)
    c_draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=26,
        fill=(22, 33, 66, 230),
        outline=(234, 182, 48, 160),
        width=2
    )
    img = Image.alpha_composite(img, card_bg)
    draw = ImageDraw.Draw(img)

    # Inside Card: Top Header
    draw.rounded_rectangle(
        [card_x + 1, card_y + 1, card_x + card_w - 1, card_y + 56],
        radius=24,
        fill=(32, 48, 92, 255)
    )
    # Flat bottom for the top header
    draw.rectangle([card_x + 1, card_y + 36, card_x + card_w - 1, card_y + 56], fill=(32, 48, 92, 255))
    draw.line([(card_x, card_y + 56), (card_x + card_w, card_y + 56)], fill=(234, 182, 48, 80), width=1)

    draw.text((card_x + 24, card_y + 18), "DISPERKIM SAMARINDA • E-TAMU", fill=(255, 223, 156, 255), font=f_card_label)
    # Online status green dot
    draw.ellipse([card_x + card_w - 100, card_y + 22, card_x + card_w - 92, card_y + 30], fill=(52, 211, 153, 255))
    draw.text((card_x + card_w - 84, card_y + 18), "LIVE WITA", fill=(52, 211, 153, 255), font=f_badge)

    # Ticket Container inside Card
    t_box_y = card_y + 75
    draw.rounded_rectangle(
        [card_x + 24, t_box_y, card_x + card_w - 24, t_box_y + 125],
        radius=18,
        fill=(14, 23, 46, 255),
        outline=(234, 182, 48, 120),
        width=1
    )
    draw.text((card_x + 44, t_box_y + 16), "NOMOR TIKET ANTREAN TAMU", fill=(219, 225, 255, 200), font=f_card_label)
    draw.text((card_x + 44, t_box_y + 40), "A-018", fill=(255, 223, 156, 255), font=f_card_ticket)

    draw.text((card_x + card_w - 170, t_box_y + 36), "STATUS:", fill=(140, 160, 200, 200), font=f_card_label)
    draw.rounded_rectangle(
        [card_x + card_w - 170, t_box_y + 56, card_x + card_w - 44, t_box_y + 86],
        radius=8,
        fill=(16, 185, 129, 30),
        outline=(16, 185, 129, 120),
        width=1
    )
    draw.text((card_x + card_w - 156, t_box_y + 63), "TERCATAT", fill=(52, 211, 153, 255), font=f_badge)

    # Guest Info inside Card
    info_y = t_box_y + 145
    rows = [
        ("Nama Tamu:", "Rahmat Hidayat, S.T."),
        ("Instansi / Asal:", "PT Kaltim Jaya Bangun Persada (Swasta)"),
        ("Bidang Tujuan:", "Bidang Perumahan (Lantai 2)"),
        ("Keperluan:", "Konsultasi Teknis Siteplan PSU Perumahan"),
    ]

    for label, val in rows:
        draw.text((card_x + 28, info_y), label, fill=(160, 180, 220, 220), font=f_card_small)
        draw.text((card_x + 155, info_y), val, fill=(255, 255, 255, 255), font=f_card_body)
        info_y += 38

    # Card Footer
    draw.line([(card_x + 24, card_y + card_h - 55), (card_x + card_w - 24, card_y + card_h - 55)], fill=(255, 255, 255, 25), width=1)
    draw.text(
        (card_x + 28, card_y + card_h - 40),
        "Terintegrasi Standar SPBE & Perlindungan Privasi Data Tamu",
        fill=(234, 182, 48, 220),
        font=f_card_small
    )

    # 9. Bottom Accent Line
    draw.rectangle([0, height - 6, width, height], fill=(234, 182, 48, 255))
    draw.rectangle([width // 2 - 250, height - 6, width // 2 + 250, height], fill=(255, 223, 156, 255))

    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Social preview saved to {output_path}")

if __name__ == "__main__":
    create_social_preview("public/github-social-preview.png")
    create_social_preview("public/og-image.png")
    create_social_preview("dist/github-social-preview.png")
    create_social_preview("dist/og-image.png")
