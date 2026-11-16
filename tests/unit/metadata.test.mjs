import test from 'node:test';
import assert from 'node:assert/strict';
import { rootMetadata, pageMetadata } from '../../src/lib/seo/metadata.js';
import { pages } from '../../src/content/pages.js';

test('pageMetadata with template title', () => {
  const m = pageMetadata({ path: '/team', title: 'Our Team – Certified IT Experts', description: 'd' });
  assert.equal(m.title, 'Our Team – Certified IT Experts');
  assert.equal(m.alternates.canonical, '/team');
  assert.equal(m.openGraph.url, '/team');
  assert.equal(m.openGraph.title, 'Our Team – Certified IT Experts | Infyta');
  assert.equal(m.openGraph.siteName, 'Infyta');
  assert.equal(m.openGraph.type, 'website');
  assert.equal(m.openGraph.locale, 'en_US');
  assert.equal(m.twitter.card, 'summary_large_image');
});
test('pageMetadata with absoluteTitle', () => {
  const m = pageMetadata({ path: '/about', title: 'About Infyta', description: 'd', absoluteTitle: true });
  assert.deepEqual(m.title, { absolute: 'About Infyta' });
  assert.equal(m.openGraph.title, 'About Infyta');
});
test('rootMetadata', () => {
  assert.equal(rootMetadata.metadataBase.href, 'https://infyta.com/');
  assert.equal(rootMetadata.title.template, '%s | Infyta');
  assert.equal(rootMetadata.title.default, pages.home.title);
});
