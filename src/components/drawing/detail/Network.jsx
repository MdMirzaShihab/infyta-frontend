// Network Infrastructure: the network core island, the internet line coming in, and cables out to three small
// islands in a row: the cameras (violet, Security's), the access point and the staff desks (teal).
import { PH, projector } from "@/lib/iso";
import { Box, Cable, Lay } from "../iso/parts";
import { zoneCore } from "../iso/zones";
import { AccessPoint, CameraPole, Desk, Ground, T, byDepth } from "./kit";

const NET = "network-infrastructure", SEC = "security-surveillance";
const P = projector(126, 124);
const W = 13.2, D = 3.3, Y0 = 0.3, DY = 2.4;
const core = zoneCore(P, 0.25, Y0);
const CAM = 3.75, AP = 6.85, DESK = 9.95; // island x; each 2.6 wide, the desks 3.0
const ct = core.anchors.top;

const island = (x, w) => <Box P={P} x={x} y={Y0} z={0} w={w} d={DY} h={PH} kind="p" />;
const camObjs = [{ depth: CAM + 1.65 + Y0 + 0.45, node: <CameraPole P={P} x={CAM + 1.65} y={Y0 + 0.45} /> }];
const apObjs = [{ depth: AP + 1.9 + Y0 + 0.6, node: <AccessPoint P={P} x={AP + 1.9} y={Y0 + 0.5} /> }];
const deskObjs = [0.2, 1.55].map((dx) => ({ depth: DESK + dx + Y0 + 1.2, node: <Desk P={P} x={DESK + dx} y={Y0 + 0.3} w={1.25} /> }));

export const viewBox = "0 0 590 474";
export const body = (
  <>
    <Ground P={P} W={W} D={D} />

    {/* Cables on the floor, under the islands: violet to the cameras, teal along the front to Wi-Fi and the desks. */}
    <g data-svc={SEC}><Cable P={P} points={[[2.6, 1.5], [CAM + 0.6, 1.5]]} /></g>
    <g data-svc={NET}>
      <Cable P={P} points={[[1.9, 2.5], [1.9, 3.0], [DESK + 1.5, 3.0], [DESK + 1.5, 2.5]]} />
      <Cable P={P} points={[[AP + 1.3, 3.0], [AP + 1.3, 2.5]]} />
    </g>

    <g data-svc={NET}>{core.floor}</g>
    <g data-svc={SEC}>
      {island(CAM, 2.6)}
      <Lay P={P} x={CAM + 0.3} y={Y0 + 1.75}>CCTV</Lay>
      <Lay P={P} x={CAM + 0.3} y={Y0 + 2.15} className="t2">Cameras</Lay>
    </g>
    <g data-svc={NET}>
      {island(AP, 2.6)}
      <Lay P={P} x={AP + 0.3} y={Y0 + 1.75}>Office Wi-Fi</Lay>
      <Lay P={P} x={AP + 0.3} y={Y0 + 2.15} className="t2">Guest Wi-Fi</Lay>
      {island(DESK, 3.0)}
      <Lay P={P} x={DESK + 0.3} y={Y0 + 1.75}>Workstations</Lay>
      <Lay P={P} x={DESK + 0.3} y={Y0 + 2.15} className="t2">Staff</Lay>
    </g>

    <g data-svc={NET}>{byDepth(core.objs)}</g>
    <g data-svc={SEC}>{byDepth(camObjs)}</g>
    <g data-svc={NET}>{byDepth([...apObjs, ...deskObjs])}</g>

    {/* The internet line comes in from outside, into the top of the rack. */}
    <g data-svc={NET}>
      <path className="cab cab--dash" d={`M330 20L${ct[0]} ${ct[1] - 2}`} />
      <T x={338} y={24} cls="t2">Internet</T>
      <path className="lead thin" d="M88 84H112" />
      <T x={82} y={88} anchor="end">Router</T>
      <T x={82} y={103} cls="t2" anchor="end">MikroTik</T>
      <path className="lead thin" d="M88 121H112V114" />
      <T x={82} y={125} anchor="end">Firewall</T>
      <T x={82} y={140} cls="t2" anchor="end">Fortinet</T>
    </g>
  </>
);
