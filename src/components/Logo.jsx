import { useId } from 'react';
import { logoPaths } from './logo-paths.js';

// The Infyta logo, drawn from the outlines that scripts/make-logo.mjs generates.
// Wordmark, floor and the dot ring take currentColor; gradients and the cyan y and dot are fixed brand colours.
// Without the tagline the viewBox ends at y 108 (the mock's layout box) but the wall reaches y 116.2,
// so overflow is visible and the tip of the wall hangs below the box.
const CYAN = '#14b9da';

export default function Logo({ tagline = false, className }) {
  const id = useId().replace(/[^A-Za-z0-9_-]/g, '');
  const tiles = logoPaths.tiles.map((d, i) => <path key={i} d={d} />);
  return (
    <svg viewBox={`-2 -4 205 ${tagline ? 125 : 112}`} overflow="visible" role="img" aria-label="Infyta" className={className}>
      <defs>
        <linearGradient id={`${id}-w`} gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="48" y2="108">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="1" stopColor="#212b60" />
        </linearGradient>
        <linearGradient id={`${id}-t`} gradientUnits="userSpaceOnUse" x1="70" y1="2" x2="45" y2="45">
          <stop offset="0" stopColor="#3cc4c4" />
          <stop offset="1" stopColor="#212b60" />
        </linearGradient>
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-2" y="-4" width="205" height="130">
          <rect x="-2" y="-4" width="205" height="130" fill="white" />
          <g fill="black" transform="translate(2 4.2)">{tiles}</g>
        </mask>
      </defs>
      <path d={logoPaths.wall} fill={`url(#${id}-w)`} />
      <path d={logoPaths.floor} fill="currentColor" mask={`url(#${id}-m)`} />
      <g fill={`url(#${id}-t)`}>{tiles}</g>
      <circle cx="67.4" cy="69.5" r="4.7" fill="currentColor" />
      <circle cx="66.2" cy="70.2" r="3.8" fill={CYAN} />
      <g fill="currentColor">
        {logoPaths.word.map((g, i) => (
          <path key={i} d={g.d} fill={g.accent ? CYAN : undefined} />
        ))}
      </g>
      {tagline && <path d={logoPaths.tagline} fill="currentColor" opacity="0.88" />}
    </svg>
  );
}
