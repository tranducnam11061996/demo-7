from pathlib import Path
from PIL import Image
import shutil

root = Path(__file__).resolve().parents[1]
target = root / 'assets/images/section-1'
target.mkdir(parents=True, exist_ok=True)
image = Image.open(root / 'design/section-1.png')
# Clean artwork only: all interface copy and buttons are recreated in HTML.
crops = {'laptop-artwork': (865, 238, 1375, 716),
         'flash-headphones': (1575, 330, 1702, 411),
         'rtx-graphics': (1544, 486, 1702, 574),
         'build-pc': (1585, 588, 1702, 756)}
for name, box in crops.items():
    image.crop(box).save(target / f'{name}.webp', quality=95)
shutil.copyfile(root / 'LOGO-HACOM.png', target / 'hacom-logo.png')
print('Prepared local section-1 artwork')
