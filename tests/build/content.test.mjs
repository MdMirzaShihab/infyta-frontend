import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, textOf } from './helpers.mjs';
import { services } from '../../src/content/services.js';
import { homeIntro } from '../../src/content/pages.js';
import { site } from '../../src/content/site.js';
import { primaryEmail } from '../../src/content/email.js';

const squash = (t) => t.replace(/\s+/g, ' ').trim();

for (const s of services) {
  const path = `/services/${s.slug}`;

  test(`service page has 500+ words of body text: ${path}`, () => {
    const { doc } = loadPage(path);
    const words = squash(textOf(doc)).split(' ').filter(Boolean).length;
    assert.ok(words >= 500, `${path}: ${words} words`);
  });

  test(`every FAQ question and answer is in the HTML: ${path}`, () => {
    const { doc } = loadPage(path);
    const text = squash(textOf(doc));
    assert.ok(s.faqs.length > 0, 'no FAQs');
    for (const faq of s.faqs) {
      assert.ok(text.includes(squash(faq.question)), `missing question: ${faq.question}`);
      assert.ok(text.includes(squash(faq.answer)), `missing answer: ${faq.answer}`);
    }
    assert.equal(doc.querySelectorAll('main details').length, s.faqs.length);
  });

  test(`related service links: ${path}`, () => {
    const { doc } = loadPage(path);
    assert.equal(s.related.length, 2);
    for (const r of s.related) {
      assert.ok(doc.querySelector(`main a[href="/services/${r}"]`), `missing link to ${r}`);
    }
  });
}

test('home page includes the intro paragraph', () => {
  const { doc } = loadPage('/');
  assert.ok(homeIntro.length > 0);
  assert.ok(squash(textOf(doc)).includes(squash(homeIntro)));
});

test('about page has the "Infyta at a glance" facts', () => {
  const { doc } = loadPage('/about');
  const text = squash(textOf(doc));
  for (const needle of ['Infyta at a glance', site.address.display, site.phone.display, primaryEmail(), ...site.hours.display]) {
    assert.ok(text.includes(squash(needle)), `missing: ${needle}`);
  }
  for (const s of services) {
    assert.ok(doc.querySelector(`main a[href="/services/${s.slug}"]`), `missing link to ${s.slug}`);
  }
});
