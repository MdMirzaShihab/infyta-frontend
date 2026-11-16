// Server-only: never import this from a client component ("use client"), or the
// inactive domain address would be bundled into public JS. Server components
// call these and pass plain strings down as props.
import { site } from './site.js';

const EMAILS = { domain: 'info@infyta.com', fallback: 'infytaofficial@gmail.com' };

export function primaryEmail(s = site) {
  return s.domainEmailActive ? EMAILS.domain : EMAILS.fallback;
}

export function publicEmails(s = site) {
  return s.domainEmailActive ? [EMAILS.domain, EMAILS.fallback] : [EMAILS.fallback];
}
