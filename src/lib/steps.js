// Separates a lead phrase ending in a colon from the rest of an approach step. No words change.
export function splitStep(text) {
  const i = text.indexOf(':');
  if (i <= 0) return { lead: null, rest: text };
  return { lead: text.slice(0, i + 1), rest: text.slice(i + 1) };
}
