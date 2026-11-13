"""Process official Terus logos: transparent BG, crop, favicons."""

from pathlib import Path

from PIL import Image

DEST = Path(__file__).resolve().parents[1] / "public" / "logos" / "terus"
APP_DIR = Path(__file__).resolve().parents[1] / "app"

MAPPING = {
    "c8132ccc-acc2-4461-aaa0-ce42729252da-6819183f-d992-40d4-a3c8-d84138973da6.png": "terus-wordmark.png",
    "cb12fffc-72c1-417d-8b0c-a8302ffe5f55-6d223300-fe8e-4958-b0ea-299c7349fc10.png": "terus-mark.png",
    "694c9a8d-8435-41d5-98b2-c1108ddc8d46-a72dd691-1baa-4154-bc81-2fb2cca44972.png": "terus-mark-light.png",
}


def make_transparent(src: Path, out: Path, threshold: int = 28) -> Image.Image:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _a = pixels[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                pixels[x, y] = (0, 0, 0, 0)
    bbox = img.getbbox()
    if bbox:
        pad = 8
        left, top, right, bottom = bbox
        left = max(0, left - pad)
        top = max(0, top - pad)
        right = min(w, right + pad)
        bottom = min(h, bottom + pad)
        img = img.crop((left, top, right, bottom))
    img.save(out, "PNG", optimize=True)
    print(f"{out.name}: {img.size} from {src.name}")
    return img


def main() -> None:
    for src_name, out_name in MAPPING.items():
        src = DEST / src_name
        if not src.exists():
            print(f"SKIP missing {src_name}")
            continue
        make_transparent(src, DEST / out_name)
        src.unlink()

    jpg = DEST / "terus.jpg"
    if jpg.exists():
        img = Image.open(jpg).convert("RGBA")
        pixels = img.load()
        w, h = img.size
        for y in range(h):
            for x in range(w):
                r, g, b, _a = pixels[x, y]
                if r >= 245 and g >= 245 and b >= 245:
                    pixels[x, y] = (255, 255, 255, 0)
        bbox = img.getbbox()
        if bbox:
            pad = 4
            left, top, right, bottom = bbox
            img = img.crop(
                (
                    max(0, left - pad),
                    max(0, top - pad),
                    min(w, right + pad),
                    min(h, bottom + pad),
                )
            )
        light = DEST / "terus-wordmark-on-light.png"
        img.save(light, "PNG", optimize=True)
        print(f"{light.name}: {img.size}")

    mark = Image.open(DEST / "terus-mark.png")
    side = max(mark.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - mark.size[0]) // 2
    oy = (side - mark.size[1]) // 2
    canvas.paste(mark, (ox, oy), mark)

    for size, name in [
        (512, "icon-512.png"),
        (192, "icon-192.png"),
        (32, "favicon-32.png"),
        (16, "favicon-16.png"),
    ]:
        resized = canvas.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(DEST / name, "PNG", optimize=True)
        print(f"{name}: {size}")

    canvas.resize((512, 512), Image.Resampling.LANCZOS).save(
        APP_DIR / "icon.png", "PNG", optimize=True
    )
    canvas.resize((180, 180), Image.Resampling.LANCZOS).save(
        APP_DIR / "apple-icon.png", "PNG", optimize=True
    )
    print("Wrote app/icon.png and app/apple-icon.png")

    print("Done. Files:")
    for path in sorted(DEST.iterdir()):
        print(f"  {path.name} ({path.stat().st_size})")


if __name__ == "__main__":
    main()
