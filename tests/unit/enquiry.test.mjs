import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEnquiry, whatsappUrl, mailtoUrl } from '../../src/lib/enquiry.js';

test('full enquiry', () => {
  const e = buildEnquiry({ firstName: ' Rahim ', lastName: 'Uddin', email: 'rahim@example.com', message: 'We need office Wi-Fi.\n' });
  assert.deepEqual(e, {
    ok: true,
    subject: 'Website enquiry from Rahim Uddin',
    text: 'Hello Infyta, this is Rahim Uddin.\n\nWe need office Wi-Fi.\n\nEmail: rahim@example.com',
  });
});
test('lines for empty fields are left out', () => {
  assert.deepEqual(buildEnquiry({ message: 'Hi' }), { ok: true, subject: 'Website enquiry', text: 'Hi' });
  assert.equal(buildEnquiry({ firstName: 'Rahim', message: 'Hi' }).text, 'Hello Infyta, this is Rahim.\n\nHi');
  assert.equal(buildEnquiry({ email: 'a@b.co', message: 'Hi' }).text, 'Hi\n\nEmail: a@b.co');
});
test('an empty or blank message is not ok', () => {
  for (const message of ['', '   ', '\n\t']) assert.equal(buildEnquiry({ firstName: 'Rahim', message }).ok, false);
  assert.equal(buildEnquiry({}).ok, false);
});
test('special characters survive the round trip', () => {
  const text = 'Rack & cabling #2\nঅফিসের নেটওয়ার্ক? 100% + more';
  const wa = new URL(whatsappUrl('+8801318121558', text));
  assert.equal(wa.origin + wa.pathname, 'https://wa.me/8801318121558');
  assert.equal(wa.searchParams.get('text'), text);
  const mail = mailtoUrl('infytaofficial@gmail.com', 'Website enquiry from R & D', text);
  assert.ok(mail.startsWith('mailto:infytaofficial@gmail.com?subject='));
  const q = new URLSearchParams(mail.split('?')[1].replace(/\+/g, '%2B'));
  assert.equal(q.get('subject'), 'Website enquiry from R & D');
  assert.equal(q.get('body'), text);
  assert.doesNotMatch(mail.split('?')[1], /[ \n#]/);
});
