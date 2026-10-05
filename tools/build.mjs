import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));

export function validateManifest(manifest) {
  if (!Array.isArray(manifest.sections) || manifest.sections.length !== 25) throw new Error('Manifest must list all 25 sections.');
  const ids = new Set();
  for (const section of manifest.sections) {
    if (!Number.isInteger(section.number) || section.number < 1 || section.number > 25 || section.id !== `section-${section.number}` || ids.has(section.id)) throw new Error('Invalid or duplicate section ID.');
    if (!['pending', 'in_review', 'approved'].includes(section.status)) throw new Error(`Invalid status: ${section.id}`);
    ids.add(section.id);
  }
  if (!['sequential', 'combined'].includes(manifest.reviewMode || 'sequential')) throw new Error('Invalid review mode.');
  if (manifest.reviewMode !== 'combined' && manifest.sections.filter(s => s.status === 'in_review').length > 1) throw new Error('Only one section may be in review.');
  const sorted = [...manifest.sections].sort((a, b) => a.number - b.number);
  const review = sorted.find(s => s.status === 'in_review');
  if (manifest.reviewMode !== 'combined' && review && review.number !== sorted.find(s => s.status !== 'approved')?.number) throw new Error('Review must follow sequential acceptance order.');
  return sorted;
}

export function renderPage(template, sections, preview = false) {
  let headingUsed = false;
  const content = sections.map(({ number, html }) => {
    const result = html.replace(/<h[12](\b[^>]*data-section-heading[^>]*)>([\s\S]*?)<\/h[12]>/g, (_, attributes, text) => {
      const tag = headingUsed ? 'h2' : 'h1';
      headingUsed = true;
      return `<${tag}${attributes}>${text}</${tag}>`;
    });
    return result;
  });
  const header = sections[0]?.number === 1 ? content.shift() : '';
  const footer = sections.at(-1)?.number === 25 ? content.pop() : '';
  let html = template.replace('<!-- include:approved-sections -->', `${header}<main>${content.join('\n')}</main>${footer}`);
  if (/<!--\s*include\b/.test(html)) throw new Error('Unresolved include marker.');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML ID.');
  if ([...html.matchAll(/<h1\b/g)].length !== 1) throw new Error('Each output needs one main heading.');
  if (preview) html = html.replace(/\b(href|src)="((?:assets\/|LOGO-HACOM\.png)[^"]*)"/g, '$1="../$2"');
  return html;
}

export async function composeHtml(template, sectionDirectory) {
  const pattern = /<!--\s*include:([a-zA-Z0-9_-]+)\s*-->/g;
  const names = [...template.matchAll(pattern)].map((match) => match[1]);
  const sections = new Map();
  for (const name of new Set(names)) {
    try {
      sections.set(name, await readFile(join(sectionDirectory, `${name}.html`), 'utf8'));
    } catch (error) {
      throw new Error(`Cannot include ${name}: ${error.message}`, { cause: error });
    }
  }
  const html = template.replace(pattern, (_, name) => sections.get(name));
  if (/<!--\s*include\b/i.test(html)) {
    throw new Error('Unresolved or malformed include marker in HTML.');
  }
  return html;
}

export async function buildProject() {
  const template = await readFile(join(projectRoot, 'src/index.template.html'), 'utf8');
  const config = JSON.parse(await readFile(join(projectRoot, 'src/sections.manifest.json'), 'utf8'));
  const manifest = validateManifest(config);
  const ready = [];
  for (const section of manifest.filter(s => s.status !== 'pending')) {
    const html = await readFile(join(projectRoot, `src/sections/${section.id}.html`), 'utf8');
    if (!html.includes(`id="${section.id}"`)) throw new Error(`Missing root ID ${section.id}`);
    ready.push({ ...section, html });
  }
  const included = ready.filter(s => config.reviewMode === 'combined' || s.status === 'approved');
  const html = renderPage(template, included);
  const previews = ready.map(s => [s.id, renderPage(template, [s], true).replace(/<title>[^<]*<\/title>/, `<title>HACOM — ${s.name} — Preview ${s.id}</title>`)]);
  const fontDirectory = join(projectRoot, 'assets/fonts');
  await mkdir(fontDirectory, { recursive: true });
  await mkdir(join(projectRoot, 'assets/styles'), { recursive: true });
  await copyFile(
    join(projectRoot, 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2'),
    join(fontDirectory, 'fa-solid-900.woff2'),
  );
  await copyFile(
    join(projectRoot, 'node_modules/@fortawesome/fontawesome-free/LICENSE.txt'),
    join(fontDirectory, 'fontawesome-LICENSE.txt'),
  );
  const cli = join(projectRoot, 'node_modules/@tailwindcss/cli/dist/index.mjs');
  const result = spawnSync(process.execPath, [
    cli, '-i', 'src/styles/input.css', '-o', 'assets/styles/main.css', '--minify',
  ], { cwd: projectRoot, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Tailwind build failed (${result.status}).`);
  await writeFile(join(projectRoot, 'index.html'), html, 'utf8');
  await mkdir(join(projectRoot, 'previews'), { recursive: true });
  for (const [id, page] of previews) await writeFile(join(projectRoot, `previews/${id}.html`), page, 'utf8');
  console.log(`Built ${config.reviewMode || 'sequential'} review: ${included.length} sections; ${previews.length} previews.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildProject().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
