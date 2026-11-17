// Server & Cloud Solutions: the servers island with its two racks. The second rack is a host: three small flat cards,
// its virtual machines, float above it. The cloud floats above the first rack on a dashed link.
import { projector } from "@/lib/iso";
import { zoneServers } from "../iso/zones";
import { FlatCard, Ground, T, byDepth } from "./kit";

const SRV = "server-cloud-solutions";
const OX = 312, OY = 232;
const P = projector(OX, OY);
const serv = zoneServers(P, 0.3, 0.5);
const st = serv.anchors.top;
const CLOUD = "M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z";
const S = 1.4, CLOUD_B = OY - 150; // the cloud's scale and the y of its flat bottom
const cloudAt = `translate(${st[0] - 45 * S} ${CLOUD_B - 50 * S}) scale(${S})`;
const CARD_Y = OY - 124, CARD_R = OX - 24; // top of the cards, right edge of the row

export const viewBox = "0 0 590 440";
export const body = (
  <>
    <Ground P={P} W={4.6} D={3.9} />
    <g data-svc={SRV}>
      {serv.floor}
      {byDepth(serv.objs)}
      <path className="cab cab--dash" d={`M${st[0]} ${st[1] - 4}V${CLOUD_B}`} />
      <g transform={cloudAt}><path className="ft" d={CLOUD} /></g>
      {[0, 1, 2].map((i) => <FlatCard key={i} x={CARD_R - 130 + i * 46} y={CARD_Y} />)}
      <T x={st[0] + 63} y={CLOUD_B - 12}>Cloud</T>
      <T x={st[0] + 63} y={CLOUD_B + 5} cls="t2">AWS, Azure, Google Cloud</T>
      <T x={CARD_R - 138} y={CARD_Y + 12} anchor="end">Virtual machines</T>
      <T x={CARD_R - 138} y={CARD_Y + 28} cls="t2" anchor="end">VMware, Hyper-V</T>
      <T x={OX + 48} y={OY - 6}>Servers</T>
      <T x={OX + 48} y={OY + 10} cls="t2">Windows, Linux, Active Directory</T>
    </g>
  </>
);
