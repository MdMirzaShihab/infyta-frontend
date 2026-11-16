import { expertise } from '../content/expertise.js';

// Unique certifications for the given expertise keys, in order, capped at `limit`.
export function certsFor(expertiseKeys, limit = 4) {
  const out = [];
  for (const key of expertiseKeys) {
    const entry = expertise.find((e) => e.key === key);
    for (const cert of entry ? entry.certs : []) if (!out.includes(cert)) out.push(cert);
  }
  return out.slice(0, limit);
}
