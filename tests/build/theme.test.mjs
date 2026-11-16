import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { parse } from 'node-html-parser';
import { OUT, allHtmlFiles } from './helpers.mjs';

for (const file of allHtmlFiles()) {
  const name = relative(OUT, file);
  const html = readFileSync(file, 'utf8');
  const doc = parse(html, { blockTextElements: { script: true, style: false } });
  test(`${name}: the theme is the visitor's choice, never hard-coded`, () => {
    assert.doesNotMatch(html, /<html[^>]*data-theme/);
    assert.match(html, /<html lang="en" class="[^"]+"/);
    assert.ok(doc.querySelectorAll('head script').some((s) => s.rawText.includes('infyta-theme')));
    const metas = doc.querySelectorAll('meta[name="theme-color"]').map((m) => [m.getAttribute('media'), m.getAttribute('content').toUpperCase()]);
    assert.deepEqual(metas.sort(), [['(prefers-color-scheme: dark)', '#1F2C62'], ['(prefers-color-scheme: light)', '#F4F6FA']]);
  });
}
