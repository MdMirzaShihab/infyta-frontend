import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './helpers.mjs';

const has = (el, ...cls) => cls.every((c) => el.classList.contains(c));

test('home: band grounds and slabs', () => {
  const main = loadPage('/').doc.querySelector('main');
  assert.ok(has(main.querySelector('section#services'), 'band', 'band--alt'));
  const expertise = main.querySelector('section#expertise');
  assert.ok(has(expertise, 'band', 'band--tint') && !has(expertise, 'band--flush'));
  const cta = main.querySelector('section#contact');
  assert.ok(has(cta, 'band', 'band--cta'));
  assert.ok(has(cta.querySelector('.panel'), 'paper-card', 'on-slab'));
  assert.ok(has(main.querySelector('.portrait'), 'on-slab', 'on-slab--lg'));
  assert.ok(has(main.querySelector('.sheet--hero'), 'on-slab'));
});
