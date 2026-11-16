import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { parse } from 'node-html-parser';
import { OUT, allHtmlFiles } from './helpers.mjs';

// Every heading on the page in document order (header, main and footer), as [level, text].
function outline(doc) {
  return doc.querySelectorAll('h1, h2, h3, h4, h5, h6').map((h) => [Number(h.tagName[1]), h.textContent.trim()]);
}

for (const file of allHtmlFiles()) {
  const name = relative(OUT, file);
  const doc = parse(readFileSync(file, 'utf8'), { blockTextElements: { script: true, style: false } });

  test(`${name}: one h1, and no heading skips a level going down`, () => {
    const headings = outline(doc);
    assert.equal(headings.filter(([level]) => level === 1).length, 1, 'h1 count');
    // The page starts above h1, so the first heading must be the h1.
    let prev = 0;
    for (const [level, text] of headings) {
      assert.ok(level <= prev + 1, `h${level} "${text}" follows ${prev ? `an h${prev}` : 'the start of the page'}`);
      prev = level;
    }
  });
}
