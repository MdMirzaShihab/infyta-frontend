import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { OUT, loadPage } from './helpers.mjs';
import { site } from '../../src/content/site.js';
import { publicEmails } from '../../src/content/email.js';

test('contact page', () => {
  const { html, doc } = loadPage('/contact');
  const main = doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Get In Touch');
  for (const needle of ["Let's discuss how we can transform your business with our tech solutions", 'Send Us A Message', 'Contact Information', 'Our Office', 'Phone', 'WhatsApp', 'Email', 'Working Hours', ...site.hours.display, 'আজিমপুর, ঢাকা']) assert.ok(text.includes(needle), needle);

  const form = main.querySelector('form');
  assert.ok(!form.hasAttribute('action'));
  const fields = { 'cf-first': 'First Name', 'cf-last': 'Last Name', 'cf-email': 'Email', 'cf-message': 'Message' };
  for (const [id, label] of Object.entries(fields)) {
    assert.ok(form.querySelector('#' + id), id);
    assert.equal(form.querySelector(`label[for="${id}"]`).textContent.trim(), label);
  }
  assert.ok(!/placeholder="(John|Doe)"/.test(html));
  assert.deepEqual(form.querySelectorAll('button[type="submit"]').map((b) => [b.getAttribute('value'), b.textContent.trim()]), [['whatsapp', 'Send on WhatsApp'], ['email', 'Send by email']]);

  assert.equal(main.querySelectorAll('iframe').length, 0);
  assert.ok(main.querySelectorAll('button').some((b) => b.textContent.trim() === 'Show map'));
  assert.equal(main.querySelector(`a[href="${site.mapsUrl}"]`).textContent.trim(), 'Open in Google Maps');
  assert.equal(main.querySelectorAll('.week > div').length, 7);
  assert.ok(main.querySelector(`a[href="${site.whatsappUrl}"]`));
  for (const e of publicEmails()) assert.ok(main.querySelector(`a[href="mailto:${e}"]`), e);
});

test('404 page', () => {
  const doc = parse(readFileSync(join(OUT, '404.html'), 'utf8'));
  const main = doc.querySelector('main');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Page not found');
  assert.ok(main.textContent.includes('The page you are looking for does not exist or has moved.'));
  assert.equal(main.querySelector('a.btn[href="/"]').textContent.trim(), 'Go to Home');
  assert.equal(main.querySelector('a.btn[href="/services"]').textContent.trim(), 'View Our Services');
});
