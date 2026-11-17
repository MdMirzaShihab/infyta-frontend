// The flat app window and phone that float above the software island (the mock's `appCard`).

// The window's and the phone's rectangles, each with its slab, for the Software link's hit shapes.
export function appCardHits(x, y, w = 250, h = 158) {
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  return [rect(x, y, x + w + 9, y + h + 9), rect(x + w - 30, y + 76, x + w + 22, y + 168)];
}

export function AppCard({ x, y, w = 250, h = 158 }) {
  return (
    <>
      <rect className="slab" x={x + 9} y={y + 9} width={w} height={h} rx="9" />
      <g transform={`translate(${x} ${y})`}>
        <rect className="card" width={w} height={h} rx="9" />
        <path className="solid" d={`M0 26V9a9 9 0 0 1 9-9h${w - 18}a9 9 0 0 1 9 9v17z`} />
        <path d={`M0 26h${w}`} />
        <rect width={w} height={h} rx="9" />
        {[15, 27, 39].map((cx) => <circle key={cx} className="ondark" cx={cx} cy="13" r="3.2" />)}
        <path className="thin" d={`M58 26v${h - 26}`} />
        {[40, 54, 68, 82, 96].map((ry, i) => (
          <rect key={ry} className={i === 0 ? 'solid' : 'soft'} x="11" y={ry} width={[36, 30, 34, 26, 32][i]} height="7" rx="3.5" />
        ))}
        {[70, 130, 190].map((tx) => (
          <g key={tx}>
            <rect className="soft" x={tx} y="38" width="50" height="34" rx="5" />
            <rect className="solid" x={tx + 8} y="46" width="20" height="6" rx="3" />
            <rect className="ondark" x={tx + 8} y="58" width="32" height="6" rx="3" />
          </g>
        ))}
        {[22, 34, 28, 46, 38, 56, 50, 64].map((bh, i) => (
          <rect key={i} className="solid" x={72 + i * 21} y={146 - bh} width="13" height={bh} rx="2" />
        ))}
        <path className="thin" d="M68 146h172" />
      </g>
      <g transform={`translate(${x + w - 30} ${y + 76})`}>
        <rect className="slab" x="6" y="6" width="46" height="86" rx="8" />
        <rect className="card" width="46" height="86" rx="8" />
        <rect className="solid" x="6" y="9" width="34" height="14" rx="3" />
        <path className="thin" d="M8 33h30M8 42h22M8 51h26" />
        <rect className="solid" x="9" y="62" width="28" height="11" rx="5.5" />
        <path className="thin" d="M18 80h10" />
      </g>
    </>
  );
}
