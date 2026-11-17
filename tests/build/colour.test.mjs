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

import { services } from '../../src/content/services.js';

for (const s of services) {
  test(`${s.slug}: the page carries its colour`, () => {
    const main = loadPage(`/services/${s.slug}`).doc.querySelector('main');
    const sections = main.querySelectorAll('section').filter((el) => el.parentNode === main);
    assert.ok(sections.length >= 7);
    for (const el of sections) assert.equal(el.getAttribute('data-svc'), s.slug);
    assert.ok(has(sections[1], 'band', 'band--alt') && !has(sections[1], 'band--snug'));
    assert.ok(has(main.querySelector('.svc-hero figure'), 'on-slab'));
    assert.ok(has(main.querySelector('.panel.endcta'), 'on-slab'));
  });
}
test('services index, about, team, contact: grounds and slabs', () => {
  const idx = loadPage('/services').doc.querySelector('main');
  assert.ok(has(idx.querySelector('.key').closest('section'), 'band', 'band--alt'));
  const end = idx.querySelector('.panel.endcta');
  assert.ok(has(end, 'on-slab') && !has(end.closest('section'), 'band--flush'));
  const about = loadPage('/about').doc.querySelector('main');
  assert.ok(has(about.querySelector('.statements').closest('section'), 'band--alt'));
  assert.ok(has(about.querySelector('.values').closest('section'), 'band--tint'));
  assert.ok(!has(about.querySelector('.titleblock--facts').closest('section'), 'band--flush'));
  const team = loadPage('/team').doc.querySelector('main');
  assert.ok(has(team.querySelector('section#expertise'), 'band--tint'));
  const contact = loadPage('/contact').doc.querySelector('main');
  assert.ok(has(contact.querySelector('section.cpage'), 'band', 'band--alt'));
  assert.ok(has(contact.querySelector('.cpage .panel'), 'on-slab'));
});
