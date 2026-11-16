export const SITE_URL = 'https://infyta.com';

const addressDisplay = '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh';

export const site = {
  name: 'Infyta',
  url: SITE_URL,
  tagline: 'Limitless Tech Solutions for a Digital World',
  slogan: "Engineering Tomorrow's Tech Today",
  logo: '/images/infyta-logo.png',
  address: {
    display: addressDisplay,
    streetAddress: '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  phone: { display: '+880 1318 121558', e164: '+8801318121558' },
  // Flip to true once info@infyta.com is a working mailbox.
  domainEmailActive: false,
  emails: { domain: 'info@infyta.com', fallback: 'infytaofficial@gmail.com' },
  hours: {
    display: ['Saturday – Thursday: 9 AM – 6 PM', 'Friday: Closed'],
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00',
  },
  geo: null,
  socials: [],
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressDisplay)}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressDisplay)}&output=embed`,
};

export function absoluteUrl(path) {
  return path === '/' ? SITE_URL : SITE_URL + path;
}

export function primaryEmail(s = site) {
  return s.domainEmailActive ? s.emails.domain : s.emails.fallback;
}

export function publicEmails(s = site) {
  return s.domainEmailActive ? [s.emails.domain, s.emails.fallback] : [s.emails.fallback];
}
