import os
from PIL import Image

def generate_icons(source_path="logo.png"):
    src = Image.open(source_path).convert("RGBA")
    w, h = src.size

    # Fit into a square with transparent padding
    max_side = max(w, h)
    square = Image.new("RGBA", (max_side, max_side), (0, 0, 0, 0))
    offset_x = (max_side - w) // 2
    offset_y = (max_side - h) // 2
    square.paste(src, (offset_x, offset_y), src)

    targets = [
        ("public/favicon.png", 64),
        ("public/apple-touch-icon.png", 180),
        ("public/icon-512.png", 512),
        ("dist/favicon.png", 64),
        ("dist/apple-touch-icon.png", 180),
        ("dist/icon-512.png", 512),
    ]

    for rel_path, size in targets:
        abs_path = os.path.abspath(rel_path)
        os.makedirs(os.path.dirname(abs_path), exist_ok=True)
        resized = square.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(abs_path, "PNG", optimize=True)
        print(f"Generated {abs_path} ({size}x{size})")

    # Generate multi-size favicon.ico
    for folder in ["public", "dist"]:
        ico_path = os.path.abspath(os.path.join(folder, "favicon.ico"))
        ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
        ico_imgs = [square.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
        ico_imgs[0].save(ico_path, format="ICO", sizes=ico_sizes)
        print(f"Generated {ico_path}")

    # Copy logo.png to public and dist
    import shutil
    shutil.copyfile(source_path, "public/logo.png")
    shutil.copyfile(source_path, "dist/logo.png")
    print("Copied logo.png to public and dist")

if __name__ == "__main__":
    generate_icons("logo.png")
