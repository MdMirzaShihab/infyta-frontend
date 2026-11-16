import test from 'node:test';
import assert from 'node:assert/strict';
import { relative } from 'node:path';
import { parse } from 'node-html-parser';
import { readFileSync } from 'node:fs';
import { OUT, allHtmlFiles, loadPage } from './helpers.mjs';

const HIDDEN = /opacity:\s*0(?![.\d])/;
const pages = allHtmlFiles().map((file) => ({
  name: relative(OUT, file),
  doc: parse(readFileSync(file, 'utf8')),
}));

test('the export has pages to check', () => {
  assert.ok(pages.length >= 10, `only ${pages.length} HTML files in out/`);
});

for (const { name, doc } of pages) {
  test(`${name}: the <h1> and its ancestors do not start at opacity 0`, () => {
    const h1s = doc.querySelectorAll('h1');
    assert.equal(h1s.length, 1, 'expected exactly one <h1>');
    for (let el = h1s[0]; el && el.tagName; el = el.parentNode) {
      const style = el.getAttribute('style') || '';
      assert.doesNotMatch(style, HIDDEN, `<${el.tagName.toLowerCase()} class="${el.getAttribute('class') || ''}"> is hidden`);
    }
  });

  test(`${name}: the <nav> and its ancestors do not start at opacity 0`, () => {
    const navs = doc.querySelectorAll('nav');
    assert.ok(navs.length >= 1, 'no <nav>');
    for (let el = navs[0]; el && el.tagName; el = el.parentNode) {
      const style = el.getAttribute('style') || '';
      assert.doesNotMatch(style, HIDDEN, `<${el.tagName.toLowerCase()}> is hidden`);
    }
  });

  test(`${name}: every <img> has numeric width and height`, () => {
    for (const img of doc.querySelectorAll('img')) {
      const label = img.getAttribute('src') || img.getAttribute('srcset');
      assert.match(img.getAttribute('width') || '', /^\d+$/, `${label} has no numeric width`);
      assert.match(img.getAttribute('height') || '', /^\d+$/, `${label} has no numeric height`);
    }
  });
}

test('home: no hero photo, no eager image', () => {
  const { html, doc } = loadPage('/');
  assert.ok(!html.includes('/images/hero/'));
  assert.equal(doc.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]').length, 0);
});
