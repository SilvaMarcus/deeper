import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { createBibleHandler } from './bible-online.mjs';

const root = process.cwd();
const port = Number(process.env.PORT || 8080);
const publicHostname = process.env.DEEPER_HOSTNAME || 'deeperai.localhost';
const bindHostname = process.env.DEEPER_BIND || '0.0.0.0';
const publicFiles = new Set(['/index.html','/styles.css','/app.js','/manifest.webmanifest','/service-worker.js']);
const types = new Map([
  ['.html','text/html; charset=utf-8'],['.css','text/css; charset=utf-8'],['.js','text/javascript; charset=utf-8'],
  ['.json','application/json; charset=utf-8'],['.webmanifest','application/manifest+json; charset=utf-8'],
  ['.svg','image/svg+xml'],['.png','image/png'],['.jpg','image/jpeg'],['.jpeg','image/jpeg'],['.gz','application/gzip']
]);

const handleBible = createBibleHandler(root);
createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const requestHostname = String(request.headers.host || '').split(':')[0].toLowerCase();
  if (requestHostname === '127.0.0.1' || requestHostname === 'localhost') {
    response.writeHead(302, { Location: `http://${publicHostname}:${port}${url.pathname}${url.search}` }).end();
    return;
  }
  if (await handleBible(request, response, url)) return;
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const isAsset = pathname.startsWith('/assets/');
  const isBibleAsset = pathname === '/data/bible-stories.json' || pathname === '/data/chronological-plan.json' || pathname === '/data/bibles/catalog.json' || /^\/data\/bibles\/[a-z0-9-]+\.json\.gz$/.test(pathname);
  if (!publicFiles.has(pathname) && !isAsset && !isBibleAsset) {
    response.writeHead(404).end('Not found');
    return;
  }
  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(root) || !statSafe(filePath)) {
    response.writeHead(404).end('Not found');
    return;
  }
  response.setHeader('Content-Type', types.get(path.extname(filePath)) || 'application/octet-stream');
  response.setHeader('Cache-Control', pathname.endsWith('.json.gz') ? 'public, max-age=31536000, immutable' : 'no-cache');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Deeper-Server', 'local');
  createReadStream(filePath).pipe(response);
}).listen(port, bindHostname, () => {
  console.log(`Deeper local server: http://${publicHostname}:${port}`);
  console.log(`Deeper local network: http://<seu-ip-local>:${port}`);
});

function statSafe(filePath) {
  try { return statSync(filePath).isFile(); } catch { return false; }
}
