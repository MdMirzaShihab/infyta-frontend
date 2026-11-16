import { site, SITE_URL, absoluteUrl } from '../../content/site.js';
import { primaryEmail } from '../../content/email.js';
import { pages } from '../../content/pages.js';
import { services } from '../../content/services.js';

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const CTX = 'https://schema.org';

const areaServed = () => [
  { '@type': 'City', name: 'Dhaka' },
  { '@type': 'Country', name: 'Bangladesh' },
];

export function businessGraph(s = site, svc = services) {
  const email = primaryEmail(s);
  const business = {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: s.name,
    url: s.url,
    logo: absoluteUrl(s.logo),
    image: absoluteUrl(s.logo),
    description: pages.home.description,
    telephone: s.phone.e164,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.streetAddress,
      addressLocality: s.address.addressLocality,
      addressCountry: s.address.addressCountry,
      ...(s.address.postalCode ? { postalCode: s.address.postalCode } : {}),
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.hours.days,
      opens: s.hours.opens,
      closes: s.hours.closes,
    }],
    areaServed: areaServed(),
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: s.phone.e164,
      email,
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['en', 'bn'],
    }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT services',
      itemListElement: svc.map((x) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/${x.slug}#service`, name: x.name },
      })),
    },
  };
  if (s.geo) business.geo = { '@type': 'GeoCoordinates', latitude: s.geo.latitude, longitude: s.geo.longitude };
  if (s.socials.length) business.sameAs = s.socials.map((x) => x.url);
  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: s.url,
    name: s.name,
    publisher: { '@id': BUSINESS_ID },
  };
  return { '@context': CTX, '@graph': [business, website] };
}

export function webPage({ path, name, description, type = 'WebPage' }) {
  return {
    '@context': CTX,
    '@type': type,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
  };
}

export function breadcrumbList(items) {
  return {
    '@context': CTX,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function serviceSchema(service) {
  const url = `${SITE_URL}/services/${service.slug}`;
  return {
    '@context': CTX,
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed(),
    url,
  };
}

export function serviceItemList(svc = services) {
  return {
    '@context': CTX,
    '@type': 'ItemList',
    itemListElement: svc.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.name,
      url: `${SITE_URL}/services/${x.slug}`,
    })),
  };
}

export function faqPage(faqs) {
  return {
    '@context': CTX,
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function personSchema(person) {
  return {
    '@context': CTX,
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    worksFor: { '@id': BUSINESS_ID },
    knowsAbout: person.knowsAbout,
    image: absoluteUrl(person.image),
  };
}

export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
