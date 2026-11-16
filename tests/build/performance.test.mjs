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

test('home: exactly one high-priority, responsive hero image', () => {
  const { doc } = loadPage('/');
  const high = doc.querySelectorAll('img[fetchpriority="high"]');
  assert.equal(high.length, 1, `expected one img[fetchpriority=high], found ${high.length}`);
  const srcset = high[0].getAttribute('srcset') || '';
  for (const w of ['640w', '1280w', '1920w']) assert.ok(srcset.includes(w), `srcset lacks ${w}: "${srcset}"`);
  assert.ok(high[0].getAttribute('sizes'), 'hero image has no sizes attribute');
});

test('home: no image other than the hero is loading="eager"', () => {
  const { doc } = loadPage('/');
  const hero = doc.querySelector('img[fetchpriority="high"]');
  const eager = doc.querySelectorAll('img[loading="eager"]');
  assert.ok(eager.length <= 1, `expected at most one eager image, found ${eager.length}`);
  for (const img of eager) assert.equal(img, hero, `${img.getAttribute('src')} is eager but is not the hero image`);
});
