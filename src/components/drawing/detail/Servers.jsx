// Server & Cloud Solutions: the servers island with its two racks. The second rack is a host: three small flat cards,
// its virtual machines, float above it on a solid link. The cloud floats up and to the right of the first rack, on a
// dashed link that rises from its top and turns beneath the cards' row, so the two links never cross.
import { PH, projector } from "@/lib/iso";
import { zoneServers } from "../iso/zones";
import { FlatCard, Ground, T, byDepth } from "./kit";

const SRV = "server-cloud-solutions";
const OX = 248, OY = 226;
const P = projector(OX, OY);
const serv = zoneServers(P, 0.3, 0.5);
const st = serv.anchors.top; // the first rack's top
const host = P(1.0, 2.52, PH + 2.25); // the second rack's top
const CLOUD = "M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z";
const S = 1.4, CX = OX + 112, CLOUD_B = OY - 140; // the cloud's scale, the x of its middle, the y of its flat bottom
const cloudAt = `translate(${CX - 45 * S} ${CLOUD_B - 50 * S}) scale(${S})`;
const CW = 38, CH = 28, GAP = 46; // a card's size, and the step from one card to the next
const CARD_Y = OY - 142, CARD_L = host[0] - GAP - CW / 2; // top of the cards, left edge of the row
const TURN = CARD_Y + CH + 14; // where the cloud's link turns right, below the cards
const toCloud = `M${st[0]} ${st[1] - 4}V${TURN + 8}Q${st[0]} ${TURN} ${st[0] + 8} ${TURN}H${CX - 8}Q${CX} ${TURN} ${CX} ${TURN - 8}V${CLOUD_B}`;

export const viewBox = "0 0 590 432";
export const body = (
  <>
    <Ground P={P} W={4.6} D={3.9} />
    <g data-svc={SRV}>
      {serv.floor}
      {byDepth(serv.objs)}
      <path className="cab cab--dash" d={toCloud} />
      <g transform={cloudAt}><path className="ft" d={CLOUD} /></g>
      <path className="cab" d={`M${host[0]} ${host[1] - 4}V${CARD_Y + CH}`} />
      {[0, 1, 2].map((i) => <FlatCard key={i} x={CARD_L + i * GAP} y={CARD_Y} w={CW} h={CH} />)}
      <T x={CX + 63} y={CLOUD_B - 12}>Cloud</T>
      <T x={CX + 63} y={CLOUD_B + 5} cls="t2">AWS, Azure, Google Cloud</T>
      <T x={CARD_L - 8} y={CARD_Y + 12} anchor="end">Virtual machines</T>
      <T x={CARD_L - 8} y={CARD_Y + 28} cls="t2" anchor="end">VMware, Hyper-V</T>
      <T x={OX + 48} y={OY - 6}>Servers</T>
      <T x={OX + 48} y={OY + 10} cls="t2">Windows, Linux, Active Directory</T>
    </g>
  </>
);
