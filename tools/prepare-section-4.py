"""Prepare source-pixel category artwork for section 4 (not part of build)."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BOXES = [
    ('s4-category-laptop.webp', (68, 654, 134, 702)),
    ('s4-category-pc.webp', (199, 649, 245, 704)),
    ('s4-category-vga.webp', (311, 653, 390, 703)),
    ('s4-category-monitor.webp', (440, 650, 517, 705)),
    ('s4-category-headset.webp', (579, 647, 639, 705)),
    ('s4-category-rtx.webp', (849, 654, 927, 704)),
    ('s4-category-oled.webp', (970, 650, 1054, 706)),
    ('s4-category-ai-laptop.webp', (1090, 650, 1184, 705)),
    ('s4-category-handheld.webp', (1220, 654, 1301, 704)),
]
source = Image.open(ROOT / 'design/section-4.png').convert('RGB')
manifest_path = ROOT / 'docs/specs/asset-manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
for name, box in BOXES:
    asset = f'assets/images/sections/{name}'
    source.crop(box).save(ROOT / asset, lossless=True)
    manifest = [entry for entry in manifest if entry.get('asset') != asset]
    manifest.append({'section': 4, 'asset': asset, 'source': 'design/section-4.png',
                     'crop': list(box), 'size': [box[2]-box[0], box[3]-box[1]],
                     'processing': 'Source RGB crop; excludes category label and tile border.',
                     'differences': 'Original near-white background retained; displayed with contain.'})
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
