import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { parse } from 'node-html-parser';
import { OUT, allHtmlFiles } from './helpers.mjs';
import { services } from '../../src/content/services.js';
import { site } from '../../src/content/site.js';
import { primaryEmail } from '../../src/content/email.js';

const TOP = ['/', '/services', '/team', '/about', '/contact'];
const SERVICE_PATHS = services.map((s) => `/services/${s.slug}`);

test('the Services list opens on keyboard focus with JavaScript off', () => {
  assert.ok(readFileSync('src/styles/shell.css', 'utf8').includes('.has-menu:focus-within .menu'));
});

for (const file of allHtmlFiles()) {
  const name = relative(OUT, file);
  const doc = parse(readFileSync(file, 'utf8'), { blockTextElements: { script: true, style: false } });

  test(`${name}: skip link and main landmark`, () => {
    assert.ok(doc.querySelector('body a.skip[href="#main"]'));
    assert.ok(doc.querySelector('main#main'));
  });

  test(`${name}: header navigation`, () => {
    const nav = doc.querySelector('nav');
    assert.equal(nav.getAttribute('aria-label'), 'Main');
    for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(nav.querySelector(`a[href="${p}"]`), `nav lacks ${p}`);
    const button = nav.querySelector('button[aria-expanded="false"][aria-controls]');
    assert.equal(button.textContent.trim(), 'Services');
    const list = nav.querySelector('#' + button.getAttribute('aria-controls'));
    assert.equal(list.querySelector('a[href="/services"]').textContent.trim(), 'All Services');
    assert.equal(list.querySelectorAll('a').length, 6);
    const header = doc.querySelector('header');
    assert.equal(header.querySelector('a[href="tel:+8801318121558"]').textContent.trim(), site.phone.display);
    assert.equal(header.querySelector('a.btn[href="/contact"]').textContent.trim(), 'Get Started');
    assert.ok(header.querySelector('svg[role="img"][aria-label="Infyta"]'));
    assert.equal(doc.querySelectorAll('img[src*="infyta-logo"]').length, 0);
  });

  test(`${name}: open-hours text is readable before any script runs`, () => {
    const spots = doc.querySelectorAll('[data-open-status]');
    assert.ok(spots.length >= 2);
    for (const s of spots) assert.ok(s.textContent.includes(site.hours.display[0]), s.textContent);
  });

  test(`${name}: theme controls`, () => {
    assert.equal(doc.querySelectorAll('button[data-theme-toggle]').length, 1);
    const light = doc.querySelectorAll('button[data-set-theme="light"]');
    const dark = doc.querySelectorAll('button[data-set-theme="dark"]');
    assert.ok(light.length >= 2 && dark.length === light.length);
    for (const b of light) assert.equal(b.textContent.trim(), 'Light');
    for (const b of dark) assert.equal(b.textContent.trim(), 'Dark');
    const switches = doc.querySelectorAll('.themeseg');
    assert.equal(switches.length, light.length);
    for (const group of switches) {
      assert.equal(group.getAttribute('role'), 'group');
      const label = doc.querySelectorAll('[id]').find((el) => el.getAttribute('id') === group.getAttribute('aria-labelledby'));
      assert.equal(label && label.textContent.trim(), 'Theme');
    }
  });

  test(`${name}: every WhatsApp link opens in a new tab`, () => {
    const links = doc.querySelectorAll(`a[href="${site.whatsappUrl}"]`);
    assert.ok(links.length >= 1);
    for (const a of links) {
      assert.equal(a.getAttribute('target'), '_blank', a.textContent.trim());
      assert.equal(a.getAttribute('rel'), 'noopener noreferrer', a.textContent.trim());
    }
  });

  test(`${name}: mobile menu`, () => {
    const menu = doc.querySelector('#mobile-menu[role="dialog"][aria-modal="true"]');
    assert.ok(doc.querySelector('button[aria-controls="mobile-menu"][aria-expanded="false"]'));
    for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(menu.querySelector(`a[href="${p}"]`), `menu lacks ${p}`);
    assert.ok(menu.querySelector(`a[href="${site.whatsappUrl}"]`));
    assert.ok(menu.querySelector('a[href="tel:+8801318121558"]'));
  });

  test(`${name}: footer`, () => {
    const foot = doc.querySelector('footer');
    assert.ok(foot.classList.contains('inverse'));
    const text = foot.textContent.replace(/\s+/g, ' ');
    for (const needle of [site.tagline, site.address.display, site.phone.display, primaryEmail(), ...site.hours.display, 'Infyta. All rights reserved.']) assert.ok(text.includes(needle), needle);
    assert.ok(!text.includes('Designed with'));
    for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(foot.querySelector(`a[href="${p}"]`), `footer lacks ${p}`);
    assert.ok(foot.querySelector(`a[href="${site.mapsUrl}"]`));
    assert.ok(foot.querySelector(`a[href="mailto:${primaryEmail()}"]`));
  });

  // Two Logo instances (gradient and mask ids) and the menu ids must not collide.
  test(`${name}: every id is unique`, () => {
    const ids = doc.querySelectorAll('[id]').map((el) => el.getAttribute('id'));
    assert.deepEqual(ids.filter((id, i) => ids.indexOf(id) !== i), []);
  });
}
