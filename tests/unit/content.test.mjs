import test from 'node:test';
import assert from 'node:assert/strict';
import { pages, allPaths } from '../../src/content/pages.js';
import { services, getService } from '../../src/content/services.js';

const fullTitle = (t, abs) => (abs ? t : `${t} | Infyta`);
test('allPaths lists the 10 routes', () => {
  assert.deepEqual(allPaths(), ['/', '/services', ...services.map(s => `/services/${s.slug}`), '/about', '/team', '/contact']);
  assert.equal(allPaths().length, 10);
});
test('five services with the agreed slugs', () => {
  assert.deepEqual(services.map(s => s.slug), ['software-development','network-infrastructure','it-support-consultancy','security-surveillance','server-cloud-solutions']);
  assert.equal(getService('network-infrastructure').name, 'Network Infrastructure');
  assert.equal(getService('training-certification'), undefined);
});
test('titles <= 65 chars and descriptions 70-160 chars', () => {
  const entries = [
    ...Object.values(pages).map(p => [fullTitle(p.title, p.absoluteTitle), p.description]),
    ...services.map(s => [fullTitle(s.metaTitle, false), s.metaDescription]),
  ];
  for (const [title, desc] of entries) {
    assert.ok(title.length <= 65, title);
    assert.ok(desc.length >= 70 && desc.length <= 160, desc);
  }
});
