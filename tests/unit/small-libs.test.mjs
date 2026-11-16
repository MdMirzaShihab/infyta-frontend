import test from 'node:test';
import assert from 'node:assert/strict';
import { certsFor } from '../../src/lib/certs.js';
import { splitStep } from '../../src/lib/steps.js';
import { services } from '../../src/content/services.js';
import { pages } from '../../src/content/pages.js';

test('certsFor: unique certifications for expertise keys, in order, capped', () => {
  assert.deepEqual(certsFor(['server', 'network']), ['MCITP', 'RHCSA', 'VMware Certified', 'CCNA']);
  assert.deepEqual(certsFor(['cloud']), ['AWS Specialist']);
  assert.equal(certsFor(['software', 'database'], 10).length, 5);
});
test('splitStep keeps the words and only separates a lead phrase', () => {
  assert.deepEqual(splitStep('Network design: we plan the cabling.'), { lead: 'Network design:', rest: ' we plan the cabling.' });
  assert.deepEqual(splitStep('Testing and handover, followed by ongoing maintenance.'), { lead: null, rest: 'Testing and handover, followed by ongoing maintenance.' });
});
test('worksWith lines are exactly the approved ones', () => {
  assert.deepEqual(Object.fromEntries(services.map((s) => [s.slug, s.worksWith])), {
    'software-development': 'Web and mobile apps, SQL Server, MySQL, MongoDB',
    'network-infrastructure': 'MikroTik, Cisco, Fortinet, wireless deployments',
    'it-support-consultancy': 'Windows and Linux servers, Active Directory, office networks',
    'security-surveillance': 'CCTV, access control, biometric attendance',
    'server-cloud-solutions': 'VMware, Hyper-V, AWS, Azure, Google Cloud',
  });
});
test('home heading keeps today\'s words', () => {
  assert.equal(pages.home.heading, 'Infyta – Limitless Tech Solutions');
});
