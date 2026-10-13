// 로컬 미리보기용 정적 서버. 사용법: node scripts/build-site.mjs && node scripts/serve.mjs [포트]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '_site');
const port = Number(process.argv[2]) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
};

const server = http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404);
      return res.end('not found');
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  })
  ;

// 포트가 이미 쓰이고 있으면 다음 포트로 넘어간다 (최대 20번)
function start(p, tries = 0) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && tries < 20) start(p + 1, tries + 1);
    else throw err;
  });
  server.listen(p, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:${p}/  (root: ${root})`);
    if (p !== port) console.log(`(${port} 포트가 사용 중이라 ${p} 포트로 열었습니다)`);
  });
}
start(port);
