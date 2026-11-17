// The six zones of the 3D-style office, ported coordinate for coordinate from the mock's iso.mjs.
// Each returns { floor, label, objs: [{ depth, node }], hits, anchors }: `floor` is the island (drawn before any
// equipment), `label` the words painted on it, `objs` the equipment to sort back to front by depth, `hits` the
// outlines a link needs to cover the zone (the island and every box), and `anchors` the screen points the scene uses.
import { PH, boxFaces, cylinder, faceX, faceY, pts } from '../../../lib/iso.js';
import { Box, Cyl, Dot, FaceRect, Lay } from './parts.jsx';

// Draws boxes and cylinders while collecting their outlines.
function kit(P) {
  const hits = [];
  const box = (x, y, z, w, d, h, kind = 'c') => {
    hits.push(boxFaces(P, x, y, z, w, d, h).hull);
    return <Box P={P} x={x} y={y} z={z} w={w} d={d} h={h} kind={kind} />;
  };
  const cyl = (x, y, z, r, h) => {
    hits.push(cylinder(P, x, y, z, r, h).hull);
    return <Cyl P={P} x={x} y={y} z={z} r={r} h={h} />;
  };
  return { hits, box, cyl };
}
const Line = ({ a, className = 'thin' }) => <polyline className={className} points={pts(a)} />;

// Network core: one rack holding the router, the firewall and the core switch. Front on the +y face.
export function zoneCore(P, x0, y0) {
  const { hits, box } = kit(P);
  const floor = box(x0, y0, 0, 2.8, 2.4, PH, 'p');
  const x = x0 + 0.6, y = y0 + 0.2, F = faceY(P, y + 1.0);
  const u = (a, b) => <FaceRect F={F} a0={x + 0.15} b0={PH + a} a1={x + 1.45} b1={PH + b} className="unit" />;
  const node = (
    <>
      {box(x, y, PH, 1.6, 1.0, 2.45)}
      {u(1.85, 2.2)}<Dot at={F(x + 0.32, PH + 2.02)} />
      {[0, 1, 2, 3].map((i) => <FaceRect key={i} F={F} a0={x + 0.56 + i * 0.21} b0={PH + 1.95} a1={x + 0.69 + i * 0.21} b1={PH + 2.1} className="thin" />)}
      {u(1.33, 1.68)}
      <FaceRect F={F} a0={x + 0.28} b0={PH + 1.42} a1={x + 0.82} b1={PH + 1.59} className="thin" />
      <Line a={[F(x + 0.46, PH + 1.42), F(x + 0.46, PH + 1.59)]} />
      <Line a={[F(x + 0.64, PH + 1.42), F(x + 0.64, PH + 1.59)]} />
      <Dot at={F(x + 1.25, PH + 1.5)} />
      {u(0.55, 1.15)}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <FaceRect F={F} a0={x + 0.26 + i * 0.15} b0={PH + 0.93} a1={x + 0.36 + i * 0.15} b1={PH + 1.05} className="thin" />
          <FaceRect F={F} a0={x + 0.26 + i * 0.15} b0={PH + 0.67} a1={x + 0.36 + i * 0.15} b1={PH + 0.79} className={[1, 3, 4, 6].includes(i) ? 'thin lit' : 'thin'} />
        </g>
      ))}
      <Dot at={F(x + 1.35, PH + 0.86)} />
    </>
  );
  return { floor, label: null, objs: [{ depth: x + y + 1.3, node }], hits, anchors: { top: P(x + 0.8, y + 0.5, PH + 2.45) } };
}

// Servers: two racks against the left wall. Fronts on the +x face.
export function zoneServers(P, x0, y0) {
  const { hits, box } = kit(P);
  const floor = box(x0, y0, 0, 3.0, 2.9, PH, 'p');
  const objs = [];
  const tops = [];
  for (const [i, y] of [y0 + 0.3, y0 + 1.5].entries()) {
    const x = x0 + 0.15, h = i ? 2.25 : 2.6, F = faceX(P, x + 1.1);
    const units = Array.from({ length: i ? 4 : 5 }, (_, j) => {
      const z = PH + 0.28 + j * 0.46;
      return (
        <g key={j}>
          <FaceRect F={F} a0={y + 0.1} b0={z} a1={y + 0.95} b1={z + 0.34} className="unit" />
          <Dot at={F(y + 0.2, z + 0.17)} r={2.2} />
          <Line a={[F(y + 0.85, z + 0.08), F(y + 0.85, z + 0.26)]} />
          <Line a={[F(y + 0.76, z + 0.08), F(y + 0.76, z + 0.26)]} />
          <Line a={[F(y + 0.67, z + 0.08), F(y + 0.67, z + 0.26)]} />
          <Line a={[F(y + 0.34, z + 0.17), F(y + 0.56, z + 0.17)]} />
        </g>
      );
    });
    objs.push({ depth: x + y + 1.1, node: <>{box(x, y, PH, 1.1, 1.05, h)}{units}</> });
    tops.push(P(x + 0.55, y + 0.52, PH + h));
  }
  return { floor, label: null, objs, hits, anchors: { top: tops[0] } };
}

// Software, on the floor: two databases and a large screen. The app window floats above (the scene adds it).
export function zoneSoftware(P, x0, y0, w = 7.4, d = 2.4) {
  const { hits, box, cyl } = kit(P);
  const floor = box(x0, y0, 0, w, d, PH, 'p');
  const objs = [];
  objs.push({ depth: x0 + 0.9 + y0 + 0.85, node: cyl(x0 + 0.9, y0 + 0.85, PH, 0.44, 1.05) });
  objs.push({ depth: x0 + 2.05 + y0 + 1.2, node: cyl(x0 + 2.05, y0 + 1.2, PH, 0.4, 0.68) });
  const sx = x0 + 3.5, sy = y0 + 0.8, F = faceY(P, sy + 0.13);
  objs.push({
    depth: sx + 1.1 + sy + 0.2,
    node: (
      <>
        {box(sx + 0.95, sy - 0.05, PH, 0.3, 0.3, 0.5)}
        {box(sx, sy, PH + 0.5, 2.2, 0.13, 1.3)}
        <FaceRect F={F} a0={sx + 0.1} b0={PH + 0.6} a1={sx + 2.1} b1={PH + 1.7} className="unit" />
        <FaceRect F={F} a0={sx + 0.1} b0={PH + 1.52} a1={sx + 2.1} b1={PH + 1.7} className="solid" />
        {[0.34, 0.52, 0.42, 0.66, 0.56, 0.78].map((h, i) => (
          <FaceRect key={i} F={F} a0={sx + 0.3 + i * 0.29} b0={PH + 0.68} a1={sx + 0.49 + i * 0.29} b1={PH + 0.68 + h * 0.95} className="solid" />
        ))}
      </>
    ),
  });
  return { floor, label: null, objs, hits, anchors: { dbTop: P(x0 + 0.9, y0 + 0.85, PH + 1.05), screenTop: P(sx + 1.1, sy + 0.06, PH + 1.8) } };
}

// Staff: three desks, each with a monitor and a keyboard.
export function zoneStaff(P, x0, y0, w = 7.4) {
  const { hits, box } = kit(P);
  const floor = box(x0, y0, 0, w, 2.9, PH, 'p');
  const DESKS = [0.55, 2.8, 5.05];
  const objs = DESKS.map((dx) => {
    const x = x0 + dx, y = y0 + 0.5, z = PH, F = faceY(P, y + 0.19);
    const node = (
      <>
        {box(x, y, z, 0.07, 0.9, 0.72)}
        {box(x, y, z + 0.3, 1.7, 0.05, 0.42)}
        {box(x + 1.63, y, z, 0.07, 0.9, 0.72)}
        {box(x, y, z + 0.72, 1.7, 0.9, 0.08)}
        {box(x + 0.8, y + 0.13, z + 0.8, 0.1, 0.06, 0.14)}
        {box(x + 0.42, y + 0.12, z + 0.92, 0.86, 0.07, 0.56)}
        <FaceRect F={F} a0={x + 0.47} b0={z + 0.97} a1={x + 1.23} b1={z + 1.43} className="unit" />
        <Line a={[F(x + 0.55, z + 1.33), F(x + 0.95, z + 1.33)]} />
        <Line a={[F(x + 0.55, z + 1.21), F(x + 1.12, z + 1.21)]} />
        <Line a={[F(x + 0.55, z + 1.09), F(x + 0.86, z + 1.09)]} />
        {box(x + 0.5, y + 0.5, z + 0.8, 0.7, 0.22, 0.03)}
      </>
    );
    return { depth: x + y + 1.3, node };
  });
  const label = <Lay P={P} x={x0 + 0.9} y={y0 + 2.4}>Staff workstations</Lay>;
  return { floor, label, objs, hits, anchors: { taps: DESKS.map((dx) => x0 + dx + 0.85), pin: P(x0 + 0.5, y0 + 2.2, PH) } };
}

// Guest Wi-Fi: a bench and a low table, and an access point on a pole at the front, where it hides nothing behind it.
export function zoneGuest(P, x0, y0, w = 5.2) {
  const { hits, box } = kit(P);
  const floor = box(x0, y0, 0, w, 2.8, PH, 'p');
  const objs = [];
  const bx = x0 + 0.5, by = y0 + 0.3;
  objs.push({ depth: bx + by + 1.2, node: <>{box(bx, by, PH + 0.4, 1.7, 0.14, 0.5)}{box(bx, by, PH, 1.7, 0.62, 0.4)}</> });
  objs.push({ depth: bx + by + 2.2, node: box(bx + 0.4, by + 0.95, PH, 0.9, 0.45, 0.32) });
  const ax = x0 + 4.3, ay = y0 + 1.5;
  const [cx, cy] = P(ax + 0.1, ay + 0.1, PH + 1.27);
  // The three arcs above the access point.
  hits.push([[cx - 29, cy - 34], [cx + 29, cy - 34], [cx + 29, cy], [cx - 29, cy]]);
  objs.push({
    depth: ax + ay + 0.3,
    node: (
      <>
        {box(ax, ay, PH, 0.2, 0.2, 1.1)}
        {box(ax - 0.25, ay - 0.25, PH + 1.1, 0.7, 0.7, 0.12)}
        <Dot at={[cx, cy]} r={2.8} />
        <path className="thin" d={`M${cx - 13} ${cy - 16}a18 18 0 0 1 26 0M${cx - 21} ${cy - 25}a30 30 0 0 1 42 0M${cx - 29} ${cy - 34}a42 42 0 0 1 58 0`} />
      </>
    ),
  });
  const label = (
    <>
      <Lay P={P} x={x0 + 0.45} y={y0 + 2.24}>Office Wi-Fi</Lay>
      <Lay P={P} x={x0 + 0.45} y={y0 + 2.67} className="t2">Guest access</Lay>
    </>
  );
  return { floor, label, objs, hits, anchors: { ap: [ax + 0.1, ay], pin: P(ax + 0.1, ay + 0.1, PH + 1.3) } };
}

// Security: a recorder, a camera above it, and a door with its access terminal, all on the left wall.
export function zoneSecurity(P, x0, y0, w = 5.2) {
  const { hits, box } = kit(P);
  const island = box(x0, y0, 0, w, 2.8, PH, 'p');
  const objs = [], FL = faceX(P, 0);
  const rx = x0 + 0.15, ry = y0 + 0.3, F = faceX(P, rx + 0.85);
  objs.push({
    depth: rx + ry + 1.1,
    node: (
      <>
        {box(rx, ry, PH, 0.85, 1.4, 0.8)}
        <FaceRect F={F} a0={ry + 0.15} b0={PH + 0.26} a1={ry + 0.62} b1={PH + 0.6} className="unit" />
        <FaceRect F={F} a0={ry + 0.74} b0={PH + 0.26} a1={ry + 1.21} b1={PH + 0.6} className="unit" />
        <Dot at={F(ry + 1.31, PH + 0.43)} r={2.2} />
      </>
    ),
  });
  const cyy = y0 + 0.7;
  objs.push({
    depth: cyy + 0.7,
    node: <>{box(0, cyy + 0.12, 2.22, 0.3, 0.12, 0.12)}{box(0.25, cyy, 2.14, 0.62, 0.36, 0.28)}<Dot at={P(0.87, cyy + 0.18, 2.28)} r={3} /></>,
  });
  const dy = y0 + 1.75;
  // The door and terminal are flat on the wall, so they are drawn with the floor layer, before any object.
  const door = [FL(dy, 2.1), FL(dy + 1.1, 2.1), FL(dy + 1.1, PH), FL(dy, PH)];
  hits.push(door);
  const floor = (
    <>
      {island}
      <FaceRect F={FL} a0={dy} b0={PH} a1={dy + 1.1} b1={2.1} className="unit" />
      <Dot at={FL(dy + 0.2, 1.05)} r={2.2} className="tap" />
      <Line a={[P(0, cyy + 0.18, 0.94), P(0, cyy + 0.18, 2.2)]} className="cab" />
    </>
  );
  objs.push({ depth: dy - 0.2, node: <>{box(0, dy - 0.48, 1.15, 0.12, 0.3, 0.52)}<Dot at={P(0.12, dy - 0.33, 1.5)} r={2.2} /></> });
  const label = (
    <>
      <Lay P={P} x={x0 + 1.75} y={y0 + 0.78}>CCTV cameras</Lay>
      <Lay P={P} x={x0 + 1.75} y={y0 + 1.2} className="t2">Recorder</Lay>
      <Lay P={P} x={x0 + 1.75} y={y0 + 1.95}>Access control</Lay>
      <Lay P={P} x={x0 + 1.75} y={y0 + 2.37} className="t2">Biometric attendance</Lay>
    </>
  );
  return { floor, label, objs, hits, anchors: { rec: [rx + 0.85, ry + 0.7], pin: P(rx + 0.42, ry + 0.7, PH + 0.8) } };
}
