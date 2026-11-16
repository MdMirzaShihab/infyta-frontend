import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

export const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../../out');

export function fileForPath(path) {
  return path === '/' ? join(OUT, 'index.html') : join(OUT, `${path.replace(/^\//, '')}.html`);
}

export function loadPage(path) {
  const file = fileForPath(path);
  if (!existsSync(file)) throw new Error(`No exported file for ${path}: ${file}`);
  const html = readFileSync(file, 'utf8');
  const doc = parse(html, { blockTextElements: { script: true, style: false } });
  return { html, doc };
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

export function allFiles() {
  return walk(OUT);
}

export function allHtmlFiles() {
  return allFiles().filter((f) => f.endsWith('.html'));
}

export function jsonLdBlocks(doc) {
  return doc
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => JSON.parse(s.rawText));
}

export function textOf(doc) {
  const main = doc.querySelector('main');
  return main ? main.textContent : '';
}

// Decoded text a reader sees: drops <script>/<style>/<template> so the RSC payload cannot satisfy a check.
export function visibleText(html) {
  const doc = parse(html, { blockTextElements: { script: true, style: true } });
  for (const node of doc.querySelectorAll('script, style, template')) node.remove();
  return doc.textContent;
}
