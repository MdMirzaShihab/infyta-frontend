import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './helpers.mjs';
import { services } from '../../src/content/services.js';
import { expertise } from '../../src/content/expertise.js';
import { chiefAdvisor } from '../../src/content/team.js';
import { pages } from '../../src/content/pages.js';
import { site } from '../../src/content/site.js';

const { html, doc } = loadPage('/');
const main = doc.querySelector('main');
const text = main.textContent.replace(/\s+/g, ' ');

test('headline keeps today\'s words', () => {
  assert.equal(main.querySelector('h1').textContent.trim(), 'Infyta – Limitless Tech Solutions');
});
test('hero drawing links to every service, in both layouts', () => {
  for (const cls of ['dwg--wide', 'dwg--tall']) {
    const svg = main.querySelector(`svg.${cls}`);
    assert.ok(svg.getAttribute('aria-label'));
    for (const s of services) {
      const a = svg.querySelector(`a[href="/services/${s.slug}"]`);
      assert.ok(a && a.getAttribute('aria-label'), `${cls}: ${s.slug}`);
    }
  }
});
test('hero text', () => {
  for (const needle of [pages.home.description, 'Typical office network', 'Infyta, Azimpur, Dhaka', 'Not to scale', '1 to 5 are our services. Select any part.']) assert.ok(text.includes(needle), needle);
  assert.equal(main.querySelector('a.btn[href="/contact"]').textContent.trim(), 'Get Started');
  assert.ok(main.querySelectorAll('a[href="/services"]').some((a) => a.textContent.trim() === 'Explore Solutions'));
});
test('service rows', () => {
  const rows = main.querySelectorAll('a.key__row');
  assert.deepEqual(rows.map((r) => r.getAttribute('href')), services.map((s) => `/services/${s.slug}`));
  rows.forEach((row, i) => {
    assert.equal(row.querySelector('.num').textContent.trim(), String(i + 1));
    assert.ok(row.textContent.includes(services[i].summary) && row.textContent.includes(services[i].worksWith));
    assert.equal(row.querySelector('svg').getAttribute('aria-hidden'), 'true');
  });
  assert.ok(main.querySelectorAll('a[href="/services"]').some((a) => a.textContent.trim() === 'Explore All Services'));
});
test('expertise schedule', () => {
  const table = main.querySelector('table.sched');
  assert.deepEqual(table.querySelectorAll('thead th').map((th) => th.textContent.trim()), ['Domain', 'What we work with', 'Certifications and specialists']);
  assert.deepEqual(table.querySelectorAll('tbody th').map((th) => th.textContent.trim()), expertise.map((e) => e.title));
});
test('chief advisor band', () => {
  const band = main.querySelector('section.inverse#advisor');
  assert.equal(band.querySelector('img').getAttribute('alt'), 'Md. Arif, Chief Advisor at Infyta');
  for (const h of chiefAdvisor.highlights) assert.ok(band.textContent.includes(h), h);
  assert.equal(band.querySelector('a[href="/team"]').textContent.trim(), 'View Our Team');
});
test('call to action and contact panel', () => {
  for (const needle of ['Ready to Transform Your Business?', 'Dhaka time', 'আজিমপুর, ঢাকা', 'Open in Google Maps']) assert.ok(text.includes(needle), needle);
  assert.ok(main.querySelector(`a[href="${site.whatsappUrl}"]`));
  assert.equal(main.querySelector('[lang="bn"]').textContent.trim(), 'আজিমপুর, ঢাকা');
  assert.equal(main.querySelectorAll('.week > div').length, 7);
  assert.ok(!text.includes('Contact Sales'));
});
test('nothing in the page is hidden by an inline style', () => {
  assert.doesNotMatch(html, /style="[^"]*opacity:\s*0(?![.\d])/);
});
