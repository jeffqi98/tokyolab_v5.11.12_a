#!/usr/bin/env python3
"""
Generate TokyoLab photo manifest from assets/photos/gallery/.

Usage:
  python tools/generate_photos.py

This script scans image files and writes:
  assets/js/auto-photos.js

For GitHub Pages, the included GitHub Action can run this automatically
after you upload photos to assets/photos/gallery/.
"""

from pathlib import Path
import json
import re
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
GALLERY = ROOT / "assets" / "photos" / "gallery"
OUT = ROOT / "assets" / "js" / "auto-photos.js"

SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".svg"}

def slugify(name: str) -> str:
    name = name.lower()
    name = re.sub(r"\.[^.]+$", "", name)
    name = re.sub(r"^\d{4}[-_]\d{2}[-_]\d{2}[-_]*", "", name)
    name = re.sub(r"[^a-z0-9]+", "-", name).strip("-")
    return name or "photo"

def title_from_filename(path: Path) -> str:
    stem = path.stem
    stem = re.sub(r"^\d{4}[-_]\d{2}[-_]\d{2}[-_]*", "", stem)
    words = re.split(r"[-_]+", stem)
    return " ".join(w.capitalize() for w in words if w) or path.stem

def date_from_filename_or_mtime(path: Path) -> str:
    m = re.match(r"^(\d{4})[-_](\d{2})[-_](\d{2})", path.stem)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    return datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")

def try_exif(path: Path):
    data = {
        "camera": "",
        "lens": "",
        "focalLength": "",
        "aperture": "",
        "shutter": "",
        "iso": "",
    }

    if path.suffix.lower() not in {".jpg", ".jpeg"}:
        return data

    try:
        from PIL import Image, ExifTags
        img = Image.open(path)
        raw = img.getexif()
        if not raw:
            return data

        tags = {ExifTags.TAGS.get(k, k): v for k, v in raw.items()}

        make = str(tags.get("Make", "")).strip()
        model = str(tags.get("Model", "")).strip()
        camera = " ".join(x for x in [make, model] if x)
        data["camera"] = camera

        data["lens"] = str(tags.get("LensModel", "") or tags.get("LensSpecification", "") or "")

        focal = tags.get("FocalLength")
        if focal:
            try:
                data["focalLength"] = f"{float(focal):.0f}mm"
            except Exception:
                data["focalLength"] = str(focal)

        fnum = tags.get("FNumber")
        if fnum:
            try:
                data["aperture"] = f"f/{float(fnum):.1f}".replace(".0", "")
            except Exception:
                data["aperture"] = f"f/{fnum}"

        exposure = tags.get("ExposureTime")
        if exposure:
            try:
                val = float(exposure)
                if val and val < 1:
                    data["shutter"] = f"1/{round(1/val)}s"
                else:
                    data["shutter"] = f"{val:g}s"
            except Exception:
                data["shutter"] = str(exposure)

        iso = tags.get("ISOSpeedRatings") or tags.get("PhotographicSensitivity")
        if iso:
            data["iso"] = f"ISO {iso}"

        dt = tags.get("DateTimeOriginal")
        if dt:
            try:
                data["date"] = datetime.strptime(str(dt), "%Y:%m:%d %H:%M:%S").strftime("%Y-%m-%d")
            except Exception:
                pass

    except Exception:
        pass

    return data

def infer_tags(path: Path):
    text = path.stem.lower()
    known = ["tokyo", "hokkaido", "kyoto", "kamakura", "izu", "sea", "mountain", "street", "night", "autumn", "winter"]
    tags = [t for t in known if t in text]
    return tags or ["photo"]

def main():
    GALLERY.mkdir(parents=True, exist_ok=True)
    files = sorted([p for p in GALLERY.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED])

    photos = []
    used = set()

    for path in files:
        base_slug = slugify(path.name)
        slug = base_slug
        i = 2
        while slug in used:
            slug = f"{base_slug}-{i}"
            i += 1
        used.add(slug)

        date = date_from_filename_or_mtime(path)
        exif = try_exif(path)
        if exif.get("date"):
            date = exif.pop("date")

        title = title_from_filename(path)
        rel = f"assets/photos/gallery/{path.name}"

        photo = {
            "slug": slug,
            "src": rel,
            "detailSrc": rel,
            "title": {"en": title, "zh": title, "ja": title},
            "location": {"en": "", "zh": "", "ja": ""},
            "date": date,
            "year": date[:4],
            "camera": exif.get("camera") or "Unknown camera",
            "lens": exif.get("lens") or "",
            "focalLength": exif.get("focalLength") or "",
            "aperture": exif.get("aperture") or "",
            "shutter": exif.get("shutter") or "",
            "iso": exif.get("iso") or "",
            "tags": infer_tags(path),
            "caption": {"en": "", "zh": "", "ja": ""},
            "note": {"en": "", "zh": "", "ja": ""},
        }
        photos.append(photo)

    photos.sort(key=lambda item: item["date"], reverse=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        "window.AUTO_PHOTOS = " + json.dumps(photos, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8"
    )

    print(f"Generated {OUT} with {len(photos)} photos.")

if __name__ == "__main__":
    main()
