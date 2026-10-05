import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { projectRoot } from '../tools/build.mjs';

const manifest = JSON.parse(await readFile(join(projectRoot, 'src/sections.manifest.json'), 'utf8'));
const pages = ['index.html', ...manifest.sections.filter(s => s.status !== 'pending').map(s => `previews/${s.id}.html`)];
const css = await readFile(join(projectRoot, 'assets/styles/main.css'), 'utf8');
const productCounts = {4:5,5:6,6:6,8:8,9:7,10:8,11:7,12:7,13:7,14:6,15:6,16:7,17:7,18:6};
for (const page of pages) {
const html = await readFile(join(projectRoot, page), 'utf8');
assert(!/<!--\s*include\b/i.test(html), 'Unresolved include');
assert(!/<script\b|\son\w+\s*=/i.test(html), 'Demo must not contain scripts or event handlers');
assert(!/D:[\\/]/i.test(html + css), 'Output must not reference an absolute project path');
assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, 'Exactly one page heading');
if (page.startsWith('previews/')) {
  const number = +page.match(/section-(\d+)/)[1];
  if (productCounts[number]) assert.equal([...html.matchAll(/<article class="hs-product"/g)].length, productCounts[number], `Product count section ${number}`);
  if (number === 2) { assert.equal([...html.matchAll(/<article class="hs-maincategory\b/g)].length, 5); assert.equal([...html.matchAll(/s2-small-category-\d+\.webp/g)].length, 6); }
  if (number === 3) assert.equal([...html.matchAll(/<article class="hs-profession"/g)].length, 8);
  if (number === 21) assert.equal([...html.matchAll(/<article class="hs-video(?: |")/g)].length, 7);
  if (number === 23) assert.equal([...html.matchAll(/s23-customer-\d+\.webp/g)].length, 10);
  if (number === 25) assert.equal([...html.match(/<ol>([\s\S]*?)<\/ol>/)[1].matchAll(/<li>/g)].length, 20);
}
if (html.includes('id="section-7"')) assert.equal([...html.matchAll(/class="builder-part"/g)].length, 8, 'Eight component rows');
assert(!/<base\b|<form\b/i.test(html), 'No base or submitting forms');
if (page === 'index.html') assert.deepEqual([...html.matchAll(/id="section-(\d+)"/g)].map(m => +m[1]), manifest.sections.filter(s => manifest.reviewMode === 'combined' ? s.status !== 'pending' : s.status === 'approved').map(s => s.number).sort((a,b)=>a-b));
for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
  assert(/\bhref="#"/.test(match[1]), 'Every UI link must have href="#"');
}
for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
  const text = match[2].replace(/<[^>]*>/g, '').trim();
  assert(text || /\baria-label="[^"]+"/.test(match[1]) || /\balt="[^"]+"/.test(match[2]), 'Link must have an accessible name');
}
for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
  assert(/\btype="button"/.test(match[1]), 'Every button must have type="button"');
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Unique element IDs');
for (const match of html.matchAll(/\baria-labelledby="([^"]+)"/g)) {
  for (const id of match[1].split(/\s+/)) assert(ids.includes(id), `Missing label ${id}`);
}
for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
  assert(/\balt="[^"]*"/.test(match[1]), 'Image missing alt');
  assert(/\bwidth="\d+"/.test(match[1]) && /\bheight="\d+"/.test(match[1]), 'Image dimensions missing');
}
for (const match of html.matchAll(/<(?:img|link)\b[^>]*\b(?:src|href)="([^"]+)"/gi)) {
  assert(!/^(?:https?:)?\/\//i.test(match[1]), 'HTML assets must be local');
  await access(resolve(projectRoot, dirname(page), match[1]));
}
for (const match of css.matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/g)) {
  assert(!/^(?:https?:)?\/\//i.test(match[1]), 'CSS assets must be local');
  await access(resolve(projectRoot, 'assets/styles', match[1]));
}
console.log(`Static audit passed: ${page}`);
}
