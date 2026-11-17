// Splits a headline around one word, so the word can be marked. Returns null when the word is not there,
// and the caller prints the headline whole.
export function splitHeadline(heading, word) {
  const i = heading && word ? heading.indexOf(word) : -1;
  if (i < 0) return null;
  return { before: heading.slice(0, i), word, after: heading.slice(i + word.length) };
}
