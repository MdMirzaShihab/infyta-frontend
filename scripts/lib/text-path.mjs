// Text to SVG outline path data. Lays text out one glyph at a time, because in opentype.js 2.0.0
// font.getPath, stringToGlyphs and forEachGlyph throw on Archivo.
import opentype from 'opentype.js';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const num = (n) => String(Number(n.toFixed(2)));

// `file` is a fontsource static file, e.g. '@fontsource/montserrat/files/montserrat-latin-800-normal.woff'.
export function loadFont(file) {
  const buffer = readFileSync(require.resolve(file));
  return opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
}

// Path commands -> path data, optionally scaling x about `ox`.
function pathData(commands, ox = 0, sx = 1) {
  const x = (v) => num(ox + (v - ox) * sx);
  const y = (v) => num(v);
  return commands
    .map((c) => {
      if (c.type === 'M' || c.type === 'L') return `${c.type}${x(c.x)} ${y(c.y)}`;
      if (c.type === 'Q') return `Q${x(c.x1)} ${y(c.y1)} ${x(c.x)} ${y(c.y)}`;
      if (c.type === 'C') return `C${x(c.x1)} ${y(c.y1)} ${x(c.x2)} ${y(c.y2)} ${x(c.x)} ${y(c.y)}`;
      if (c.type === 'Z') return 'Z';
      throw new Error(`text-path: unexpected path command ${c.type}`);
    })
    .join('');
}

// One glyph, placed so the left edge of its bounding box is exactly `leftEdge`.
export function glyphAt(font, char, leftEdge, baseline, size) {
  const glyph = font.charToGlyph(char);
  const shift = leftEdge - glyph.getPath(0, baseline, size).getBoundingBox().x1;
  const path = glyph.getPath(shift, baseline, size);
  return { d: pathData(path.commands), box: path.getBoundingBox() };
}

// A line of text as one path starting at `x`; with `fitWidth`, scaled horizontally about `x`
// so the line (pen start to final advance) is exactly that wide.
export function lineAt(font, text, x, baseline, size, fitWidth) {
  const scale = size / font.unitsPerEm;
  const commands = [];
  let pen = x;
  let previous = null;
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    if (previous) pen += font.getKerningValue(previous, glyph) * scale;
    commands.push(...glyph.getPath(pen, baseline, size).commands);
    pen += glyph.advanceWidth * scale;
    previous = glyph;
  }
  const natural = pen - x;
  const sx = fitWidth ? fitWidth / natural : 1;
  return { d: pathData(commands, x, sx), width: natural * sx };
}
