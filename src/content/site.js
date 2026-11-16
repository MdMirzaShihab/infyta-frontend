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
    // Optional: postalCode: '1000' (string) -> added to JSON-LD PostalAddress. It is NOT
    // added to `display` automatically; also edit `addressDisplay` above by hand to include it.
  },
  phone: { display: '+880 1318 121558', e164: '+8801318121558' },
  // Flip to true once info@infyta.com is a working mailbox. The addresses
  // themselves live in ./email.js (server-only) so the inactive one never
  // reaches client JS bundles. Do not import ./email.js from a client component.
  domainEmailActive: false,
  hours: {
    display: ['Saturday – Thursday: 9 AM – 6 PM', 'Friday: Closed'],
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00',
  },
  // geo: null, or { latitude: 23.7, longitude: 90.38 } (numbers) -> JSON-LD GeoCoordinates.
  geo: null,
  // socials: array of { name: 'Facebook', url: 'https://facebook.com/...' } (objects, not
  // plain strings) -> footer icons and JSON-LD sameAs.
  socials: [],
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressDisplay)}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressDisplay)}&output=embed`,
};

export function absoluteUrl(path) {
  return path === '/' ? SITE_URL : SITE_URL + path;
}
