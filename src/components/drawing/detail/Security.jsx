// Security & Surveillance: the security island as in the hero, against its wall (the camera and the door hang on it),
// fed by a violet cable from a small switch, which keeps Network's teal.
import { faceY, projector, pts } from "@/lib/iso";
import { Box, Cable, FaceRect } from "../iso/parts";
import { zoneSecurity } from "../iso/zones";
import { Ground, T, byDepth } from "./kit";

const NET = "network-infrastructure", SEC = "security-surveillance";
const P = projector(206, 118);
const W = 8.9, D = 3.5, H = 2.6, TH = 0.25;
const sec = zoneSecurity(P, 0.15, 0.3, 5.6);
const { rec } = sec.anchors;

// The switch: a low teal box on the floor, ports on its +y face.
const SW = { x: 7.5, y: 1.0, w: 0.8, d: 0.6, h: 0.32 }, SF = faceY(P, SW.y + SW.d);
const sw = P(SW.x + SW.w / 2, SW.y + SW.d / 2, SW.h);

export const viewBox = "0 0 590 390";
export const body = (
  <>
    <Ground P={P} W={W} D={D} x0={-TH} />
    {/* The wall the camera and the door hang on: neutral. */}
    <polygon className="wa" points={pts([P(0, 0, H), P(0, D, H), P(0, D, 0), P(0, 0, 0)])} />
    <polygon className="nt" points={pts([P(-TH, 0, H), P(0, 0, H), P(0, D, H), P(-TH, D, H)])} />
    <polygon className="nl" points={pts([P(-TH, D, H), P(0, D, H), P(0, D, 0), P(-TH, D, 0)])} />

    <g data-svc={SEC}><Cable P={P} points={[[SW.x + 0.2, rec[1]], [rec[0], rec[1]]]} /></g>
    <g data-svc={SEC}>{sec.floor}{sec.label}</g>
    <g data-svc={SEC}>{byDepth(sec.objs)}</g>
    <g data-svc={NET}>
      <Box P={P} x={SW.x} y={SW.y} z={0} w={SW.w} d={SW.d} h={SW.h} />
      {[0, 1, 2, 3, 4].map((i) => (
        <FaceRect key={i} F={SF} a0={SW.x + 0.1 + i * 0.13} b0={0.1} a1={SW.x + 0.19 + i * 0.13} b1={0.22} className={i === 0 ? "thin lit" : "thin"} />
      ))}
      <T x={sw[0]} y={sw[1] - 22} anchor="middle">Switch</T>
    </g>
    <g data-svc={SEC}><T x={214} y={72}>Cameras</T></g>
  </>
);
