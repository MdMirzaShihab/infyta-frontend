import test from 'node:test';
import assert from 'node:assert/strict';
import { site, absoluteUrl } from '../../src/content/site.js';
import { primaryEmail, publicEmails } from '../../src/content/email.js';

test('NAP is exact', () => {
  assert.equal(site.address.display, '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh');
  assert.equal(site.address.streetAddress, '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur');
  assert.equal(site.phone.display, '+880 1318 121558');
  assert.equal(site.phone.e164, '+8801318121558');
});
test('email follows the domainEmailActive flag', () => {
  const off = { ...site, domainEmailActive: false };
  assert.equal(primaryEmail(off), 'infytaofficial@gmail.com');
  assert.deepEqual(publicEmails(off), ['infytaofficial@gmail.com']);
  assert.equal(primaryEmail(), primaryEmail(site));
  assert.deepEqual(publicEmails(), publicEmails(site));
  const on = { ...site, domainEmailActive: true };
  assert.equal(primaryEmail(on), 'info@infyta.com');
  assert.deepEqual(publicEmails(on), ['info@infyta.com', 'infytaofficial@gmail.com']);
});
test('absoluteUrl', () => {
  assert.equal(absoluteUrl('/'), 'https://infyta.com');
  assert.equal(absoluteUrl('/team'), 'https://infyta.com/team');
});

test('closed dates and WhatsApp link', () => {
  assert.ok(Array.isArray(site.closedDates));
  for (const d of site.closedDates) assert.match(d, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(site.whatsappUrl, 'https://wa.me/' + site.phone.e164.slice(1));
});
