// IT Support & Consultancy: this service is the office itself, so the drawing is a small office on the navy base,
// with "Your office" on the base. The router rack, the server rack, two desks and an access point stand on the floor
// in the neutral faces: no islands. Their cables take IT Support's line, which is the navy of the base.
import { faceY, projector } from "@/lib/iso";
import { Box, Cable, Dot, FaceRect, Lay } from "../iso/parts";
import { AccessPoint, Desk, Ground, Line } from "./kit";

const P = projector(181, 70);
const W = 9.8, D = 3.2, BH = 0.78;
const baseA = P(0.55, D, -0.56);

// The router rack, front on its +y face: a router with its ports, and a patch panel under it.
const R = { x: 0.4, y: 0.45, w: 1.2, d: 0.9, h: 1.5 }, RF = faceY(P, R.y + R.d);
const router = (
  <>
    <Box P={P} x={R.x} y={R.y} z={0} w={R.w} d={R.d} h={R.h} kind="n" />
    <FaceRect F={RF} a0={R.x + 0.12} b0={1.0} a1={R.x + 1.08} b1={1.32} className="unit" />
    <Dot at={RF(R.x + 0.26, 1.16)} r={2.2} />
    {[0, 1, 2, 3].map((i) => <FaceRect key={i} F={RF} a0={R.x + 0.46 + i * 0.15} b0={1.1} a1={R.x + 0.56 + i * 0.15} b1={1.22} className={i < 2 ? "thin lit" : "thin"} />)}
    <FaceRect F={RF} a0={R.x + 0.12} b0={0.5} a1={R.x + 1.08} b1={0.82} className="unit" />
    {[0, 1, 2, 3, 4, 5].map((i) => <FaceRect key={i} F={RF} a0={R.x + 0.22 + i * 0.13} b0={0.6} a1={R.x + 0.3 + i * 0.13} b1={0.72} className="thin" />)}
  </>
);

// The server rack, front on its +y face: four servers.
const S = { x: 2.1, y: 0.4, w: 1.1, d: 1.0, h: 2.3 }, SF = faceY(P, S.y + S.d);
const servers = (
  <>
    <Box P={P} x={S.x} y={S.y} z={0} w={S.w} d={S.d} h={S.h} kind="n" />
    {[0, 1, 2, 3].map((j) => {
      const z = 0.3 + j * 0.46;
      return (
        <g key={j}>
          <FaceRect F={SF} a0={S.x + 0.1} b0={z} a1={S.x + 1.0} b1={z + 0.34} className="unit" />
          <Dot at={SF(S.x + 0.2, z + 0.17)} r={2.2} />
          <Line a={[SF(S.x + 0.34, z + 0.17), SF(S.x + 0.58, z + 0.17)]} />
          {[0.7, 0.79, 0.88].map((a) => <Line key={a} a={[SF(S.x + a, z + 0.08), SF(S.x + a, z + 0.26)]} />)}
        </g>
      );
    })}
  </>
);

export const viewBox = "0 0 590 376";
export const body = (
  <>
    <Ground P={P} W={W} D={D} BH={BH} />
    <text className="basetext" transform={`matrix(.866 .5 0 1 ${baseA[0]} ${baseA[1]})`}>Your office</text>

    {/* One cable from the router along the front of the room, to the servers, the desks and the access point. */}
    <Cable P={P} points={[[1.0, 1.35], [1.0, 1.65], [8.5, 1.65], [8.5, 1.0]]} />
    <Cable P={P} points={[[2.65, 1.65], [2.65, 1.4]]} />
    <Cable P={P} points={[[4.65, 1.65], [4.65, 1.3]]} />
    <Cable P={P} points={[[6.6, 1.65], [6.6, 1.3]]} />

    <Lay P={P} x={0.45} y={2.35}>Router</Lay>
    <Lay P={P} x={2.15} y={2.35}>Servers</Lay>
    <Lay P={P} x={4.45} y={2.35}>Workstations</Lay>
    <Lay P={P} x={7.5} y={2.35}>Office Wi-Fi</Lay>

    {router}
    {servers}
    <Desk P={P} x={3.8} y={0.5} z={0} kind="n" />
    <Desk P={P} x={5.75} y={0.5} z={0} kind="n" />
    <AccessPoint P={P} x={8.4} y={0.8} z={0} kind="n" />
  </>
);
