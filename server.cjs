const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'LH_모듈러_Kickoff.html');
const assets = path.join(__dirname, 'assets');
const port = Number(process.env.PORT || 8003);
const types = { '.glb': 'model/gltf-binary', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
function send(res, req, target, type) {
  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  });
}
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  const name = decodeURI(url.pathname);
  if (name === '/' || name === '/LH_모듈러_Kickoff.html') return send(res, req, file, 'text/html; charset=utf-8');
  // GLB models and images the deck loads at runtime (e.g. assets/models/type36.glb)
  if (name.startsWith('/assets/')) {
    const target = path.resolve(__dirname, '.' + name);
    if (target.startsWith(assets + path.sep) && types[path.extname(target).toLowerCase()]) return send(res, req, target, types[path.extname(target).toLowerCase()]);
  }
  res.writeHead(404); res.end('Not found');
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
