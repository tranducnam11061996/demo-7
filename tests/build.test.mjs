import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { composeHtml, validateManifest, renderPage } from '../tools/build.mjs';

const manifest = () => ({sections:Array.from({length:25},(_,i)=>({number:i+1,id:`section-${i+1}`,status:i===6?'approved':'pending'}))});
test('combined review allows all drafted sections without marking them approved',()=>{
 const m=manifest();m.reviewMode='combined';for(const s of m.sections) if(s.status!=='approved')s.status='in_review';
 assert.equal(validateManifest(m).length,25);assert.equal(m.sections.filter(s=>s.status==='approved').length,1);
 m.reviewMode='invalid';assert.throws(()=>validateManifest(m),/review mode/);
});
test('manifest validates numeric ordering and rejects invalid review states',()=>{
 const m=manifest(); m.sections.reverse();
 assert.equal(validateManifest(m)[1].number,2);
 m.sections[0].status='in_review'; m.sections[1].status='in_review';
 assert.throws(()=>validateManifest(m),/Only one/);
 m.sections[1].status='bad'; assert.throws(()=>validateManifest(m),/Invalid status/);
 m.sections[1].status='pending'; m.sections[1].id=m.sections[0].id; assert.throws(()=>validateManifest(m),/duplicate/);
});
test('page composition preserves heading styles and adjusts preview asset paths',()=>{
 const template='<link href="assets/styles/main.css"><!-- include:approved-sections -->';
 const sections=[{number:1,html:'<header id="section-1"><h1 data-section-heading class="title">Home</h1></header>'},{number:7,html:'<section id="section-7"><h1 data-section-heading class="builder-title">PC</h1></section>'}];
 const output=renderPage(template,sections);
 assert.match(output,/<h2 data-section-heading class="builder-title">PC<\/h2>/);
 assert.match(output,/<\/header><main>/);
 assert.match(renderPage(template,[sections[1]],true),/href="\.\.\/assets\/styles\/main.css"/);
 assert.throws(()=>renderPage('<!-- include:bad -->',sections),/Unresolved/);
 assert.throws(()=>renderPage(template,[sections[1],sections[1]]),/Duplicate/);
});

async function cleanTestDirectory(directory) {
  assert(resolve(directory).startsWith(resolve(tmpdir(), 'hacom-sections-')), 'Cleanup must stay in the named test temp directory');
  await rm(directory, { recursive: true, force: true });
}

test('composes multiple sections in template order, including repeated sections', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'hacom-sections-'));
  try {
    await writeFile(join(directory, 'section-7.html'), '<section>Hero</section>');
    await writeFile(join(directory, 'section-8.html'), '<section>Next</section>');
    const html = await composeHtml('<main><!-- include:section-7 --><!-- include:section-8 --><!-- include:section-7 --></main>', directory);
    assert.equal(html, '<main><section>Hero</section><section>Next</section><section>Hero</section></main>');
  } finally { await cleanTestDirectory(directory); }
});

test('fails clearly for missing sections and malformed or nested include markers', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'hacom-sections-'));
  try {
    await assert.rejects(composeHtml('<!-- include:section-99 -->', directory), /Cannot include section-99/);
    await assert.rejects(composeHtml('<!-- include:..\/secret -->', directory), /Unresolved or malformed/);
    await writeFile(join(directory, 'section-7.html'), '<!-- include:section-8 -->');
    await assert.rejects(composeHtml('<!-- include:section-7 -->', directory), /Unresolved or malformed/);
  } finally { await cleanTestDirectory(directory); }
});
