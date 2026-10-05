import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { extname, resolve, sep, join } from 'node:path';
import { buildProject, projectRoot } from './build.mjs';

const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.json':'application/json',
};
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT.');
await buildProject();

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end('Method not allowed');
    }
    const pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
    const path = resolve(projectRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!path.startsWith(projectRoot.endsWith(sep) ? projectRoot : projectRoot + sep)) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    if (!(await stat(path)).isFile()) throw new Error('Not a file');
    const data = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.on('error', (error) => { console.error(error.message); process.exitCode = 1; watcher.close(); });
server.listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port} (refresh after changes)`));

let timer;
let building = false;
let pending = false;
async function rebuild() {
  if (building) { pending = true; return; }
  building = true;
  try { await buildProject(); }
  catch (error) { console.error(error.message); }
  finally {
    building = false;
    if (pending) { pending = false; void rebuild(); }
  }
}
const watcher = watch(join(projectRoot, 'src'), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 150);
});
process.on('SIGINT', () => { clearTimeout(timer); watcher.close(); server.close(); });
