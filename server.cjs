const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'LH_모듈러_Kickoff.html');
const port = Number(process.env.PORT || 8003);
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (url.pathname !== '/' && url.pathname !== '/LH_모듈러_Kickoff.html' && decodeURI(url.pathname) !== '/LH_모듈러_Kickoff.html') {
    res.writeHead(404); return res.end('Not found');
  }
  fs.stat(file, (err, stat) => {
    if (err) { res.writeHead(500); return res.end('HTML unavailable'); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': stat.size, 'Cache-Control': 'no-store' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
