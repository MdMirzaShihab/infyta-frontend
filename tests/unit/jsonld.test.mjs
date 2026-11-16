import test from 'node:test';
import assert from 'node:assert/strict';
import { site } from '../../src/content/site.js';
import { primaryEmail } from '../../src/content/email.js';
import { services, getService } from '../../src/content/services.js';
import { chiefAdvisor } from '../../src/content/team.js';
import {
  BUSINESS_ID, WEBSITE_ID, businessGraph, webPage, breadcrumbList,
  serviceSchema, faqPage, personSchema, serializeJsonLd,
} from '../../src/lib/seo/jsonld.js';

const biz = (g) => g['@graph'].find(n => n['@type'] === 'LocalBusiness');

test('LocalBusiness node', () => {
  const b = biz(businessGraph());
  assert.equal(b['@id'], BUSINESS_ID);
  assert.equal(b.telephone, '+8801318121558');
  assert.equal(b.email, primaryEmail());
  const expectedAddress = {
    '@type': 'PostalAddress',
    streetAddress: '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  };
  if (site.address.postalCode) expectedAddress.postalCode = site.address.postalCode;
  assert.deepEqual(b.address, expectedAddress);
  assert.deepEqual(b.openingHoursSpecification, [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00', closes: '18:00',
  }]);
  assert.ok(b.areaServed.some(a => a['@type'] === 'City' && a.name === 'Dhaka'));
  assert.ok(b.areaServed.some(a => a['@type'] === 'Country' && a.name === 'Bangladesh'));
  assert.equal(b.hasOfferCatalog.itemListElement.length, 5);
  assert.ok(!('geo' in b));
  assert.ok(!('sameAs' in b));
});
test('geo, sameAs and domain email appear when configured', () => {
  const b = biz(businessGraph({
    ...site,
    geo: { latitude: 23.7, longitude: 90.38 },
    socials: [{ name: 'Facebook', url: 'https://facebook.com/x' }],
    domainEmailActive: true,
  }));
  assert.equal(b.geo['@type'], 'GeoCoordinates');
  assert.deepEqual(b.sameAs, ['https://facebook.com/x']);
  assert.equal(b.email, 'info@infyta.com');
});
test('postalCode is included only when configured', () => {
  const none = biz(businessGraph({ ...site, address: { ...site.address, postalCode: undefined } }));
  assert.ok(!('postalCode' in none.address));
  const set = biz(businessGraph({ ...site, address: { ...site.address, postalCode: '1000' } }));
  assert.equal(set.address.postalCode, '1000');
});
test('email follows the flag in both states', () => {
  assert.equal(biz(businessGraph({ ...site, domainEmailActive: false })).email, 'infytaofficial@gmail.com');
  const on = biz(businessGraph({ ...site, domainEmailActive: true }));
  assert.equal(on.email, 'info@infyta.com');
  assert.equal(on.contactPoint[0].email, 'info@infyta.com');
});
test('offer catalog items are self-contained services', () => {
  const items = biz(businessGraph()).hasOfferCatalog.itemListElement;
  assert.equal(items.length, services.length);
  items.forEach((o, i) => {
    assert.equal(o.itemOffered['@type'], 'Service');
    assert.equal(o.itemOffered.name, services[i].name);
    assert.equal(o.itemOffered['@id'], `https://infyta.com/services/${services[i].slug}#service`);
  });
});
test('WebSite node', () => {
  const w = businessGraph()['@graph'].find(n => n['@type'] === 'WebSite');
  assert.equal(w['@id'], WEBSITE_ID);
  assert.deepEqual(w.publisher, { '@id': BUSINESS_ID });
});
test('breadcrumbList', () => {
  const b = breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]);
  assert.equal(b['@context'], 'https://schema.org');
  assert.deepEqual(b.itemListElement[1], { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://infyta.com/services' });
});
test('serviceSchema', () => {
  const s = serviceSchema(getService('security-surveillance'));
  assert.equal(s['@id'], 'https://infyta.com/services/security-surveillance#service');
  assert.deepEqual(s.provider, { '@id': BUSINESS_ID });
  assert.equal(s.url, 'https://infyta.com/services/security-surveillance');
});
test('faqPage', () => {
  assert.deepEqual(faqPage([{ question: 'Q?', answer: 'A.' }]).mainEntity[0],
    { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } });
});
test('personSchema', () => {
  const p = personSchema(chiefAdvisor);
  assert.deepEqual(p.worksFor, { '@id': BUSINESS_ID });
  assert.equal(p.image, 'https://infyta.com/images/team/chief-advisor.webp');
});
test('webPage', () => {
  const w = webPage({ path: '/about', name: 'x', description: 'y', type: 'AboutPage' });
  assert.equal(w['@type'], 'AboutPage');
  assert.equal(w.url, 'https://infyta.com/about');
  assert.deepEqual(w.isPartOf, { '@id': WEBSITE_ID });
});
test('serializeJsonLd escapes < and round-trips', () => {
  const data = { a: '</script><script>' };
  const out = serializeJsonLd(data);
  assert.ok(!out.includes('</script>'));
  assert.deepEqual(JSON.parse(out), data);
});
test('serviceItemList lists all services', async () => {
  const { serviceItemList } = await import('../../src/lib/seo/jsonld.js');
  assert.equal(serviceItemList().itemListElement.length, services.length);
});
