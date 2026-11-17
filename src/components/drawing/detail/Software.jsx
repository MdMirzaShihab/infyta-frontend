// Software Development: the mock's `isoSoftwareDetail` (iso.mjs), coordinate for coordinate, without links or dots.
import { faceX, pts, projector } from "@/lib/iso";
import { Box, Dot, FaceRect, Lay } from "../iso/parts";
import { zoneSoftware } from "../iso/zones";
import { AppCard } from "../iso/AppCard";
import { Ground, T, byDepth } from "./kit";

const SW = "software-development";
const P = projector(150, 124);
const soft = zoneSoftware(P, 2.6, 0.45, 7.2, 2.8);
// "Existing systems" belong to the client, not to a service: a neutral rack, front on its +x face.
const F = faceX(P, 1.2);
const CX = 300, CY = 12, d1 = soft.anchors.dbTop, d2 = soft.anchors.screenTop;
const p1 = `M${d1[0]} ${d1[1] - 6}V118Q${d1[0]} 110 ${d1[0] + 8} 110H${CX}`;
const p2 = `M${d2[0]} ${d2[1]}V${CY + 158}`;

export const viewBox = "0 0 590 450";
export const body = (
  <>
    <Ground P={P} W={10.2} D={4.25} />
    <Box P={P} x={0.25} y={0.9} z={0} w={0.95} d={0.95} h={1.5} kind="n" />
    {[0.2, 0.62, 1.04].map((z) => (
      <g key={z}><FaceRect F={F} a0={1.0} b0={z} a1={1.75} b1={z + 0.3} className="unit" /><Dot at={F(1.12, z + 0.15)} r={2.1} /></g>
    ))}
    <g data-svc={SW}><polyline className="cab cab--dash" points={pts([P(1.2, 1.3), P(3.06, 1.3)])} /></g>
    <g data-svc={SW}>{soft.floor}<Lay P={P} x={3.0} y={2.6}>Database</Lay><Lay P={P} x={3.0} y={3.0} className="t2">SQL Server, MySQL, MongoDB</Lay></g>
    <Lay P={P} x={0.3} y={3.92}>Existing systems</Lay>
    <g data-svc={SW}>{byDepth(soft.objs)}</g>
    <g data-svc={SW}>
      <path className="cab" d={p1} />
      <path className="cab" d={p2} />
      <AppCard x={CX} y={CY} />
      <T x={292} y={34} anchor="end">Web application</T>
      <T x={572} y={202} anchor="end">Mobile app</T>
    </g>
  </>
);
