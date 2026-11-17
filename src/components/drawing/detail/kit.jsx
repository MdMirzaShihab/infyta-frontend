// Shared pieces for the service page drawings (spec 8.1): the small floor on its navy base, upright labels, and the
// small parts the zones do not export (a desk, an access point on a pole, a camera on a pole, a flat card).
import { PH, faceY, pts } from "@/lib/iso";
import { Box, Dot, FaceRect } from "../iso/parts";

export const T = ({ x, y, cls = "t1", anchor, children }) => <text x={x} y={y} className={cls} textAnchor={anchor}>{children}</text>;
export const Line = ({ a, className = "thin" }) => <polyline className={className} points={pts(a)} />;

// The floor, W x D, on a base BH high. `x0` moves the base's left end back, under a wall.
export function Ground({ P, W, D, BH = 0.4, x0 = 0 }) {
  return (
    <>
      <polygon className="b1" points={pts([P(x0, D, 0), P(W, D, 0), P(W, D, -BH), P(x0, D, -BH)])} />
      <polygon className="b2" points={pts([P(W, 0, 0), P(W, D, 0), P(W, D, -BH), P(W, 0, -BH)])} />
      <polygon className="floor" points={pts([P(0, 0), P(W, 0), P(W, D), P(0, D)])} />
    </>
  );
}

// Equipment sorted back to front.
export const byDepth = (objs) => [...objs].sort((p, q) => p.depth - q.depth).map((o, i) => <g key={i}>{o.node}</g>);

// A desk with a monitor and a keyboard, front on the +y face: zoneStaff's desk, `w` wide.
export function Desk({ P, x, y, z = PH, w = 1.7, kind = "c" }) {
  const F = faceY(P, y + 0.19), m = (w - 0.86) / 2;
  return (
    <>
      <Box P={P} x={x} y={y} z={z} w={0.07} d={0.9} h={0.72} kind={kind} />
      <Box P={P} x={x} y={y} z={z + 0.3} w={w} d={0.05} h={0.42} kind={kind} />
      <Box P={P} x={x + w - 0.07} y={y} z={z} w={0.07} d={0.9} h={0.72} kind={kind} />
      <Box P={P} x={x} y={y} z={z + 0.72} w={w} d={0.9} h={0.08} kind={kind} />
      <Box P={P} x={x + w / 2 - 0.05} y={y + 0.13} z={z + 0.8} w={0.1} d={0.06} h={0.14} kind={kind} />
      <Box P={P} x={x + m} y={y + 0.12} z={z + 0.92} w={0.86} d={0.07} h={0.56} kind={kind} />
      <FaceRect F={F} a0={x + m + 0.05} b0={z + 0.97} a1={x + m + 0.81} b1={z + 1.43} className="unit" />
      <Line a={[F(x + m + 0.13, z + 1.33), F(x + m + 0.53, z + 1.33)]} />
      <Line a={[F(x + m + 0.13, z + 1.21), F(x + m + 0.7, z + 1.21)]} />
      <Line a={[F(x + m + 0.13, z + 1.09), F(x + m + 0.44, z + 1.09)]} />
      <Box P={P} x={x + w / 2 - 0.35} y={y + 0.5} z={z + 0.8} w={0.7} d={0.22} h={0.03} kind={kind} />
    </>
  );
}

// An access point on a pole: zoneGuest's, standing at (x, y).
export function AccessPoint({ P, x, y, z = PH, kind = "c" }) {
  const [cx, cy] = P(x + 0.1, y + 0.1, z + 1.27);
  return (
    <>
      <Box P={P} x={x} y={y} z={z} w={0.2} d={0.2} h={1.1} kind={kind} />
      <Box P={P} x={x - 0.25} y={y - 0.25} z={z + 1.1} w={0.7} d={0.7} h={0.12} kind={kind} />
      <Dot at={[cx, cy]} r={2.8} />
      <path className="thin" d={`M${cx - 13} ${cy - 16}a18 18 0 0 1 26 0M${cx - 21} ${cy - 25}a30 30 0 0 1 42 0M${cx - 29} ${cy - 34}a42 42 0 0 1 58 0`} />
    </>
  );
}

// A camera on a pole, looking along +x: zoneSecurity's wall camera, mounted on a post instead of the wall.
export function CameraPole({ P, x, y, z = PH }) {
  const h = 1.3;
  return (
    <>
      <Box P={P} x={x} y={y} z={z} w={0.16} d={0.16} h={h} />
      <Box P={P} x={x - 0.12} y={y - 0.1} z={z + h} w={0.62} d={0.36} h={0.28} />
      <Dot at={P(x + 0.5, y + 0.08, z + h + 0.14)} r={3} />
    </>
  );
}

// A small flat card, like a tile in the app window: a virtual machine.
export function FlatCard({ x, y, w = 38, h = 28 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className="soft" width={w} height={h} rx="4" />
      <rect className="solid" x="6" y="7" width={w * 0.42} height="5" rx="2.5" />
      <rect className="ondark" x="6" y="16" width={w * 0.63} height="5" rx="2.5" />
      <rect width={w} height={h} rx="4" />
    </g>
  );
}
