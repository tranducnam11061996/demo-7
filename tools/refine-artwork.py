"""One-time crop refinement; not part of build. Extract complete product objects.
Connected regions locate artwork inside each original image window; the source
pixels are preserved. UI badges and hearts are separate regions, not retouched.
"""
from pathlib import Path
from PIL import Image
import json,re
ROOT=Path(__file__).resolve().parents[1]
manifest=ROOT/'docs/specs/asset-manifest.json'
records=json.loads(manifest.read_text(encoding='utf-8'))
small=[(155,654,247,748),(438,654,550,748),(743,663,844,748),(1041,660,1145,748),(1336,665,1430,748),(1640,655,1725,747)]
for r in records:
 p=ROOT/r['asset'];n=r['section'];box=r['crop'];source=Image.open(ROOT/r['source']).convert('RGB')
 if n==2 and 'small-category-' in p.name:
  box=small[int(re.search(r'category-(\d+)',p.name)[1])-1]
 elif n==2 and p.name=='s2-large-category-4.webp':box=(1110,266,1373,420)
 elif '-product-' in p.name and n!=15:
  x0,y0,x1,y1=box;step=x1-x0+120;left=x0-60
  window=(left+10,y0,left+step-10,y1)
  im=source.crop(window);w,h=im.size;pixels=im.load();seen=set();regions=[]
  for y in range(h):
   for x in range(w):
    if (x,y) in seen or min(pixels[x,y])>=215:continue
    stack=[(x,y)];seen.add((x,y));component=[]
    while stack:
     px,py=stack.pop();component.append((px,py))
     for nx,ny in [(px-1,py),(px+1,py),(px,py-1),(px,py+1)]:
      if 0<=nx<w and 0<=ny<h and (nx,ny) not in seen and min(pixels[nx,ny])<215:seen.add((nx,ny));stack.append((nx,ny))
    if len(component)>150:
     xs,ys=zip(*component);rect=(min(xs),min(ys),max(xs)+1,max(ys)+1)
     cx=(rect[0]+rect[2])/2;cy=(rect[1]+rect[3])/2
     score=len(component)/(1+3*abs(cx-w/2)/w+abs(cy-h/2)/h)
     regions.append((score,rect))
  if regions:
   b=max(regions,key=lambda item:item[0])[1]
   box=(window[0]+max(0,b[0]-5),window[1]+max(0,b[1]-4),window[0]+min(w,b[2]+5),window[1]+min(h,b[3]+4))
  else:box=window
 else:continue
 im=source.crop(box);im.save(p,quality=94);r.update(crop=box,size=im.size,cleanup=None,selection='clean object region; source pixels retained')
manifest.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for p in (ROOT/'src/sections').glob('*.html'):
 text=p.read_text(encoding='utf-8')
 def dimensions(m):
  tag=m[0];path=re.search(r'src="([^"]+)"',tag)[1];w,h=Image.open(ROOT/path).size
  return re.sub(r'width="\d+" height="\d+"',f'width="{w}" height="{h}"',tag)
 text=re.sub(r'<img\b[^>]+>',dimensions,text)
 p.write_text(text,encoding='utf-8')
print('Refined complete object crops and synchronized HTML image dimensions.')
