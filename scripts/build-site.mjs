// docs/ 의 마크다운을 스캔해 data/index.json 을 만들고, 배포용 _site/ 를 조립한다.
// 사용법: node scripts/build-site.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const SRC = path.join(ROOT, 'site');
const OUT = path.join(ROOT, '_site');

// 공개하지 않을 최상위 폴더 (docs/ 기준). 인덱스와 배포물 모두에서 제외한다.
const EXCLUDE = new Set(['07-career']);

// ---------- frontmatter (key: value / [a, b] / "quoted") ----------
const unquote = (s) => {
  s = s.trim();
  return (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")) ? s.slice(1, -1) : s;
};

function parseMarkdown(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  let body = text;
  if (m) {
    body = text.slice(m[0].length);
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
      if (!kv) continue;
      const [, k, v] = kv;
      meta[k] = v.startsWith('[') && v.endsWith(']') ? v.slice(1, -1).split(',').map(unquote).filter(Boolean) : unquote(v);
    }
  }
  return { meta, body };
}

// 첫 인용문(> ...)을 요약으로 쓰고, 없으면 첫 본문 문단을 쓴다.
function summarize(body) {
  const lines = body.split('\n');
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith('>')) {
      const s = t.replace(/^>+\s*/, '').replace(/[*`_]/g, '').trim();
      if (s && !/^\[!\w+\]/.test(s)) return s;
    }
  }
  for (const l of lines) {
    const t = l.trim();
    if (t && !/^(#|[-*|>`]|\d+\.|---)/.test(t)) return t.replace(/[*`_]/g, '');
  }
  return '';
}

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const humanize = (s) => s.replace(/^\d+-/, '').replace(/-/g, ' ');
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const rel = (p) => path.relative(DOCS, p).split(path.sep).join('/');

// ---------- 스캔 ----------
const mdFiles = walk(DOCS).map(rel).filter((r) => r.endsWith('.md') && !EXCLUDE.has(r.split('/')[0]));

const cats = {}; // "01-dotnet" / "01-dotnet/csharp-10" -> 표시 제목
const order = {}; // 글 경로 -> 주제 index.md 표에서의 순서
const posts = [];

for (const e of fs.readdirSync(DOCS, { withFileTypes: true })) {
  if (e.isDirectory() && !EXCLUDE.has(e.name)) cats[e.name] = humanize(e.name);
}

for (const r of mdFiles) {
  const parts = r.split('/');
  const { meta, body } = parseMarkdown(fs.readFileSync(path.join(DOCS, r), 'utf8'));

  if (parts[parts.length - 1] === 'index.md') {
    if (parts.length === 2 || parts.length === 3) {
      cats[parts.slice(0, -1).join('/')] = meta.title || humanize(parts[parts.length - 2]);
    }
    if (parts.length === 3) {
      // 주제 index.md 표의 링크 순서 = 학습 순서
      let i = 0;
      for (const m of body.matchAll(/\]\(\.\/(docs\/[^)\s]+?)\.md\)/g)) order[`${parts[0]}/${parts[1]}/${m[1]}`] = i++;
    }
    continue;
  }
  if (parts.length < 2) continue;

  const p = r.replace(/\.md$/, '');
  posts.push({
    path: p,
    c: parts[0],
    t: parts.length >= 3 ? parts[1] : '',
    title: meta.title || humanize(parts[parts.length - 1].replace(/\.md$/, '')),
    date: meta.date || '',
    sum: clip(summarize(body), 150),
  });
}
for (const p of posts) if (order[p.path] !== undefined) p.order = order[p.path];

const index = { generatedAt: new Date().toISOString(), cats, posts };

// ---------- _site 조립 ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });
fs.cpSync(SRC, OUT, { recursive: true });
fs.cpSync(DOCS, path.join(OUT, 'docs'), {
  recursive: true,
  filter: (src) => {
    const r = rel(src);
    return r === '' || !EXCLUDE.has(r.split('/')[0]);
  },
});
fs.writeFileSync(path.join(OUT, 'data', 'index.json'), JSON.stringify(index));
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

const topics = Object.keys(cats).filter((k) => k.includes('/')).length;
console.log(`posts: ${posts.length}, categories: ${Object.keys(cats).length - topics}, topics: ${topics} -> ${path.relative(ROOT, OUT)}/`);
