"""Extract requested source-pixel crops; never part of the build."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
# Source coordinates (left, top, right, bottom); UI circles (x, y, radius).
SELECTIONS = [
    ('s2-large-category-1.webp', (31, 258, 353, 465), (318, 446, 26)),
    ('s2-large-category-2.webp', (376, 252, 696, 468), (659, 446, 26)),
    ('s2-large-category-3.webp', (713, 258, 1067, 517), (890, 506, 31)),
    ('s2-large-category-4.webp', (1085, 257, 1399, 468), (1361, 446, 26)),
    ('s2-large-category-5.webp', (1423, 247, 1742, 468), (1707, 446, 26)),
    ('s2-small-category-2.webp', (438, 654, 550, 748), (557, 724, 23)),
    ('s2-small-category-3.webp', (743, 663, 844, 748), (850, 724, 23)),
    ('s2-small-category-4.webp', (1041, 660, 1145, 748), (1146, 724, 23)),
    ('s2-small-category-5.webp', (1336, 665, 1430, 748), (1435, 724, 23)),
    ('s2-small-category-6.webp', (1635, 650, 1731, 750), (1715, 724, 24)),
]
# Tight source-space silhouettes keep the original RGB, while excluding the
# rectangular background. Ellipses/body polygons retain the display plinth.
SHAPES = {
 's2-small-category-2.webp': [('polygon', [(438,654),(550,654),(550,748),(438,748)])],
 's2-small-category-3.webp': [('polygon', [(743,663),(844,663),(844,748),(743,748)])],
 's2-small-category-4.webp': [('polygon', [(1041,660),(1145,660),(1145,748),(1041,748)])],
 's2-small-category-5.webp': [('polygon', [(1336,665),(1430,665),(1430,748),(1336,748)])],
 's2-large-category-1.webp': [
  ('polygon', [(54,338),(119,352),(146,319),(314,270),(309,339),(341,328),(329,396),(339,416),(318,429),(84,431),(54,413),(77,398)]),
  ('ellipse', (48,404,343,438)),
  ('polygon', [(48,422),(343,422),(342,441),(327,449),(195,455),(60,446),(48,439)])],
 's2-large-category-2.webp': [
  ('polygon', [(418,349),(524,322),(526,287),(584,258),(670,279),(671,434),(648,445),(451,445),(450,431),(420,427)]),
  ('ellipse', (392,416,680,452)),
  ('polygon', [(392,435),(680,435),(679,453),(657,461),(537,466),(409,458),(392,452)])],
 's2-large-category-3.webp': [
  ('polygon', [(900,268),(1032,259),(1034,375),(915,380),(896,349)]),
  ('polygon', [(767,316),(887,325),(884,365),(765,360)]),
  ('polygon', [(752,365),(914,362),(925,395),(923,450),(777,461),(738,445),(744,393)]),
  ('polygon', [(927,361),(969,372),(971,455),(937,467),(917,451),(918,387)]),
  ('polygon', [(969,363),(1049,366),(1048,452),(976,460),(967,449)]),
  ('ellipse', (729,426,1052,476)),
  ('polygon', [(728,451),(1052,451),(1052,482),(1030,495),(890,513),(751,495),(728,483)])],
 's2-large-category-4.webp': [
  ('polygon', [(1134,324),(1368,264),(1362,412),(1261,419),(1263,432),(1313,440),(1306,449),(1182,449),(1176,440),(1227,430),(1229,421),(1130,411)]),
  ('ellipse', (1101,420,1385,453)),
  ('polygon', [(1100,438),(1386,438),(1386,451),(1367,459),(1224,465),(1118,457),(1100,450)])],
 's2-large-category-5.webp': [
  ('polygon', [(1450,355),(1545,350),(1564,362),(1558,416),(1449,419)]),
  ('polygon', [(1544,374),(1557,342),(1585,330),(1613,335),(1623,363),(1653,390),(1657,419),(1628,439),(1584,440),(1549,422)]),
  ('polygon', [(1663,252),(1690,250),(1709,272),(1719,305),(1715,338),(1718,359),(1714,400),(1709,426),(1690,434),(1653,430),(1640,408),(1634,386),(1627,376),(1634,344),(1629,322),(1640,289),(1652,277),(1657,260)]),
  ('polygon', [(1634,414),(1653,410),(1681,422),(1686,434),(1677,438),(1642,437),(1628,430)]),
  ('ellipse', (1438,416,1727,453)),
  ('polygon', [(1438,438),(1727,438),(1725,454),(1709,462),(1583,466),(1458,459),(1438,451)])],
 's2-small-category-6.webp': [
  ('polygon', [(1648,656),(1671,650),(1701,658),(1710,682),(1725,688),(1727,741),(1713,749),(1637,748),(1635,701),(1648,699)])],
}
source = Image.open(ROOT / 'design/section-2.png').convert('RGB')
manifest_path = ROOT / 'docs/specs/asset-manifest.json'
records = json.loads(manifest_path.read_text(encoding='utf-8'))
for name, box, circle in SELECTIONS:
    artwork = source.crop(box).convert('RGBA')
    alpha = Image.new('L', artwork.size, 0)
    draw = ImageDraw.Draw(alpha)
    for kind, coordinates in SHAPES[name]:
        if kind == 'ellipse':
            a,b,c,d = coordinates
            draw.ellipse((a-box[0],b-box[1],c-box[0],d-box[1]), fill=255)
        else:
            draw.polygon([(x-box[0],y-box[1]) for x,y in coordinates], fill=255)
    alpha = alpha.filter(ImageFilter.GaussianBlur(.6))
    pixels = alpha.load()
    cx, cy, radius = circle
    for y in range(artwork.height):
        for x in range(artwork.width):
            edge = min(x, y, artwork.width - 1 - x, artwork.height - 1 - y)
            value = min(pixels[x,y], min(255, round(edge / 4 * 255)))
            distance = ((x + box[0] - cx) ** 2 + (y + box[1] - cy) ** 2) ** .5
            exclusion = min(255, max(0, round((distance - radius) / 3 * 255)))
            pixels[x, y] = min(value, exclusion)
    artwork.putalpha(alpha)
    asset = 'assets/images/sections/' + name
    artwork.save(ROOT / asset, lossless=True, method=6)
    record = next(r for r in records if r['asset'] == asset)
    record.update(crop=list(box), size=list(artwork.size),
        cleanup={'method': 'source-pixel crop with silhouette alpha and UI exclusion',
                 'source_space_shapes': SHAPES[name], 'silhouette_feather_px': .6,
                 'excluded_ui_circle': list(circle), 'edge_feather_px': 4},
        selection='Product artwork only; source UI excluded, headings/lists/buttons remain HTML.',
        differences='Original UI occludes a small part of the plinth/background; CSS rebuilds the support underneath.' if 'large' in name else 'Source UI occludes lower-right artwork pixels; alpha excludes those pixels. Hidden product pixels are not invented.')
manifest_path.write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Extracted ten section-2 artwork regions and updated provenance; console crop remains unchanged.')
