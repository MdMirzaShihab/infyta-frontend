// Server components for the 3D-style drawings. Each ports a piece of the mock's iso.mjs as JSX.
import { PH, boxFaces, cylinder, pathD, pts } from '../../../lib/iso.js';

const FACES = { c: ['fl', 'fr', 'ft'], p: ['fl', 'fr', 'pt'], n: ['nl', 'nr', 'nt'] };

export function Box({ P, x, y, z, w, d, h, kind = 'c' }) {
  const f = boxFaces(P, x, y, z, w, d, h);
  const [l, r, t] = FACES[kind];
  return (
    <>
      <polygon className={l} points={pts(f.left)} />
      <polygon className={r} points={pts(f.right)} />
      <polygon className={t} points={pts(f.top)} />
    </>
  );
}

export function FaceRect({ F, a0, b0, a1, b1, className }) {
  return <polygon className={className} points={pts([F(a0, b1), F(a1, b1), F(a1, b0), F(a0, b0)])} />;
}

export function Dot({ at, r = 2.6, className = 'led' }) {
  return <circle className={className} cx={at[0]} cy={at[1]} r={r} />;
}

export function Cyl({ P, x, y, z, r, h }) {
  const c = cylinder(P, x, y, z, r, h);
  return (
    <>
      <path className="fl" d={c.body} />
      <ellipse className="ft" cx={c.cx} cy={c.ty} rx={c.rx} ry={c.ry} />
      <path className="thin" d={c.bands} />
    </>
  );
}

export function Pin({ n, x, y, inv, monly }) {
  return (
    <g className={monly ? 'pin monly' : 'pin'} transform={`translate(${x} ${y})`}>
      <g className={inv ? 'bub bub--inv' : 'bub'}>
        <circle className="ring" r="17" />
        <circle r="12.5" />
        <text textAnchor="middle" dy="4.8">{n}</text>
      </g>
    </g>
  );
}

export function Lay({ P, x, y, className = 't1', children }) {
  const p = P(x, y, PH);
  return <text className={`${className} lay`} transform={`matrix(.866 .5 -.866 .5 ${p[0]} ${p[1]})`}>{children}</text>;
}

export function Cable({ P, points, flow }) {
  const a = points.map((p) => P(...p));
  return (
    <>
      <polyline className="cab" points={pts(a)} />
      {flow ? <circle className="flow" r="3.8" style={{ offsetPath: `path("${pathD(a)}")` }} /> : null}
    </>
  );
}
