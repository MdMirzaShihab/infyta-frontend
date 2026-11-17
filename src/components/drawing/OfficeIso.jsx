import Link from "next/link";
import { services } from "@/content/services";
import { CALLOUT } from "./callouts";
import { projector, pts } from "@/lib/iso";
import { Cable, Pin } from "./iso/parts";
import { zoneCore, zoneGuest, zoneSecurity, zoneServers, zoneSoftware, zoneStaff } from "./iso/zones";
import { AppCard, appCardHits } from "./iso/AppCard";

// "Typical office network", 3D-style (spec 7.3): the mock's `isoScene` from iso.mjs, coordinate for coordinate.
// The visible pieces sit in one hidden group; the five service links are drawn last and hold the hit shapes,
// the upright labels and the pins. Group highlight and motion are CSS (drawing.css).
const SW = "software-development", NET = "network-infrastructure", IT = "it-support-consultancy", SEC = "security-surveillance", SRV = "server-cloud-solutions";
const ARIA = "3D-style drawing of a typical office. Each coloured zone links to the Infyta service that builds it.";
const NAME = Object.fromEntries(services.map((s) => [s.slug, s.slug === IT ? "IT Support & Consultancy: the whole office" : s.name]));
const CLOUD = "M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z";
const CLOUD_AT = "translate(244 22) scale(1.5)";
const CARD = { x: 664, y: 16 };

const P = projector(440, 168);
const W = 12, D = 10, H = 2.6, TH = 0.25, BH = 0.78;

// One visible piece of a service: dims with its service (Task 6) and fades in at `d` seconds.
const Piece = ({ slug, d, children }) => (
  <g className="piece rise" data-svc={slug} style={{ "--d": `${d}s` }}>{children}</g>
);
const T = ({ x, y, cls = "t1", anchor, children }) => <text x={x} y={y} className={cls} textAnchor={anchor}>{children}</text>;
const Flow = ({ d }) => <circle className="flow" r="3.8" style={{ offsetPath: `path("${d}")` }} />;

const core = zoneCore(P, 0.35, 0.15), soft = zoneSoftware(P, 4.2, 0.15), serv = zoneServers(P, 0.15, 3.45);
const staff = zoneStaff(P, 4.2, 3.45), sec = zoneSecurity(P, 0.15, 7.05), guest = zoneGuest(P, 6.4, 7.05);
const ZONES = [[NET, core, 0], [SW, soft, 0.3], [SRV, serv, 0.3], [NET, staff, 0.6], [SEC, sec, 0.9], [NET, guest, 0.9]];

const base = {
  left: [P(-TH, D, 0), P(W, D, 0), P(W, D, -BH), P(-TH, D, -BH)],
  right: [P(W, -TH, 0), P(W, D, 0), P(W, D, -BH), P(W, -TH, -BH)],
};
const baseA = P(0.55, D, -0.56), baseB = P(W, D - 0.55, -0.56), pin3 = P(W, 4.15, -0.4);

const { taps } = staff.anchors, { ap } = guest.anchors, { rec } = sec.anchors;
const CABLES = {
  [SRV]: [{ points: [[1.75, 1.35], [1.75, 4.2], [1.4, 4.2]], flow: true }],
  [SW]: [{ points: [[2.55, 0.9], [4.66, 0.9]], flow: true }],
  [NET]: [
    { points: [[2.55, 1.15], [3.7, 1.15], [3.7, 3.0], [taps[2], 3.0], [taps[2], 3.95]], flow: true },
    { points: [[taps[0], 3.0], [taps[0], 3.95]] },
    { points: [[taps[1], 3.0], [taps[1], 3.95]] },
    { points: [[3.9, 3.0], [3.9, 6.7], [ap[0], 6.7], [ap[0], ap[1]]], flow: true },
  ],
  [SEC]: [{ points: [[2.1, 1.35], [2.1, 2.9], [3.4, 2.9], [3.4, 6.7], [1.6, 6.7], [1.6, rec[1]], [rec[0], rec[1]]], flow: true }],
};

// Links that float outside the office: the cloud to the tall rack, the internet into the router, and the app window's two.
const st = serv.anchors.top, ct = core.anchors.top, d1 = soft.anchors.dbTop, d2 = soft.anchors.screenTop;
const LINKS = {
  [SRV]: [{ d: `M${st[0]} ${st[1] - 4}V96`, line: [[st[0], st[1] - 4], [st[0], 96]], dash: true }],
  [NET]: [{ d: `M368 70L${ct[0]} ${ct[1] - 2}`, line: [[368, 70], [ct[0], ct[1] - 2]], dash: true }],
  [SW]: [
    { d: `M${d1[0]} ${d1[1] - 6}V128Q${d1[0]} 120 ${d1[0] + 8} 120H${CARD.x}`, line: [[d1[0], d1[1] - 6], [d1[0], 120], [CARD.x, 120]], flow: true },
    { d: `M${d2[0]} ${d2[1]}V${CARD.y + 158}`, line: [[d2[0], d2[1]], [d2[0], CARD.y + 158]], flow: true },
  ],
};

const ZONE_HITS = { [SW]: [soft], [NET]: [core, staff, guest], [IT]: [], [SEC]: [sec], [SRV]: [serv] };
const EXTRA_HITS = { [SW]: appCardHits(CARD.x, CARD.y), [IT]: [base.left, base.right] };

const n = CALLOUT;
const PINS = {
  [SW]: <Pin n={n[SW]} x={CARD.x} y={CARD.y} />,
  [NET]: (
    <>
      <Pin n={n[NET]} x={ct[0]} y={ct[1] - 4} />
      <Pin n={n[NET]} x={staff.anchors.pin[0]} y={staff.anchors.pin[1]} monly />
      <Pin n={n[NET]} x={guest.anchors.pin[0]} y={guest.anchors.pin[1]} monly />
    </>
  ),
  [IT]: <Pin n={n[IT]} x={pin3[0]} y={pin3[1]} inv />,
  [SEC]: <Pin n={n[SEC]} x={sec.anchors.pin[0]} y={sec.anchors.pin[1]} />,
  [SRV]: <><Pin n={n[SRV]} x={362} y={30} /><Pin n={n[SRV]} x={st[0] + 30} y={st[1] + 6} /></>,
};

// Upright labels: the mock's words, positions and sizes.
const LABELS = {
  [SRV]: (
    <>
      <T x={232} y={44} anchor="end">Cloud</T>
      <T x={232} y={62} cls="t2" anchor="end">AWS, Azure, Google Cloud</T>
      <path className="lead thin" d={`M238 110H${st[0] - 44}V${st[1] - 14}`} />
      <T x={232} y={104} anchor="end">Servers</T>
      <T x={232} y={122} cls="t2" anchor="end">Windows, Linux, VMware</T>
    </>
  ),
  [NET]: (
    <>
      <T x={386} y={62} cls="t2">Internet</T>
      <path className="lead thin" d={`M${ct[0]} 50V${ct[1] - 18}`} />
      <T x={408} y={24}>Router, firewall, core switch</T>
      <T x={408} y={42} cls="t2">MikroTik, Fortinet, Cisco</T>
    </>
  ),
  [SW]: (
    <>
      <T x={934} y={208} anchor="end">Business software</T>
      <T x={934} y={226} cls="t2" anchor="end">SQL Server, MySQL, MongoDB</T>
    </>
  ),
};

const objs = ZONES.flatMap(([slug, z, d]) => z.objs.map((o) => ({ ...o, slug, d }))).sort((p, q) => p.depth - q.depth);

export default function OfficeIso() {
  return (
    <svg className="dwg dwg--iso dwg--hero" viewBox="0 0 944 660" role="group" aria-label={ARIA}>
      <g aria-hidden="true">
        {/* IT Support is the base the whole office stands on. */}
        <Piece slug={IT} d={1.2}>
          <polygon className="b1" points={pts(base.left)} />
          <polygon className="b2" points={pts(base.right)} />
          <text className="basetext" transform={`matrix(.866 .5 0 1 ${baseA[0]} ${baseA[1]})`}>Your office</text>
          <text className="basetext" transform={`matrix(.866 -.5 0 1 ${baseB[0]} ${baseB[1]})`}>IT Support &amp; Consultancy</text>
        </Piece>

        {/* Walls and floor: neutral, they belong to no service. */}
        <polygon className="wb" points={pts([P(0, 0, H), P(W, 0, H), P(W, 0, 0), P(0, 0, 0)])} />
        <polygon className="wa" points={pts([P(0, 0, H), P(0, D, H), P(0, D, 0), P(0, 0, 0)])} />
        <polygon className="nt" points={pts([P(-TH, -TH, H), P(W, -TH, H), P(W, 0, H), P(0, 0, H), P(0, D, H), P(-TH, D, H)])} />
        <polygon className="nr" points={pts([P(W, -TH, H), P(W, 0, H), P(W, 0, 0), P(W, -TH, 0)])} />
        <polygon className="nl" points={pts([P(-TH, D, H), P(0, D, H), P(0, D, 0), P(-TH, D, 0)])} />
        <polygon className="floor" points={pts([P(0, 0), P(W, 0), P(W, D), P(0, D)])} />

        {/* Cables run in the aisles between islands, each in its segment's colour. */}
        {[SRV, SW, NET, SEC].map((slug) => (
          <Piece key={slug} slug={slug} d={1.2}>
            {CABLES[slug].map((c, i) => <Cable key={i} P={P} points={c.points} flow={c.flow} />)}
          </Piece>
        ))}

        {/* Islands with their painted labels, then the equipment, back to front. */}
        {ZONES.map(([slug, z, d], i) => <Piece key={i} slug={slug} d={d}>{z.floor}{z.label}</Piece>)}
        {objs.map((o, i) => <Piece key={i} slug={o.slug} d={o.d}>{o.node}</Piece>)}

        {/* Outside the office: the cloud linked to the servers, the internet line into the router, and the app window. */}
        <Piece slug={SRV} d={1.5}><path className="cab cab--dash" d={LINKS[SRV][0].d} /></Piece>
        <Piece slug={SRV} d={0.3}><g transform={CLOUD_AT}><path className="ft" d={CLOUD} /></g></Piece>
        <Piece slug={NET} d={1.5}><path className="cab cab--dash" d={LINKS[NET][0].d} /></Piece>
        <Piece slug={SW} d={1.5}>
          {LINKS[SW].map((l) => <g key={l.d}><path className="cab" d={l.d} /><Flow d={l.d} /></g>)}
        </Piece>
        <Piece slug={SW} d={0.3}><AppCard x={CARD.x} y={CARD.y} /></Piece>
      </g>

      {services.map((s) => (
        <Link key={s.slug} className="svc rise" style={{ "--d": "1.5s" }} data-svc={s.slug} href={`/services/${s.slug}`} aria-label={NAME[s.slug]}>
          {ZONE_HITS[s.slug].flatMap((z) => z.hits).concat(EXTRA_HITS[s.slug] || []).map((h, i) => <polygon key={i} className="hit" points={pts(h)} />)}
          {s.slug === SRV ? <g transform={CLOUD_AT}><path className="hit" d={CLOUD} /></g> : null}
          {(CABLES[s.slug] || []).map((c, i) => <polyline key={`c${i}`} className="hit hit--line" points={pts(c.points.map((p) => P(...p)))} />)}
          {(LINKS[s.slug] || []).map((l, i) => <polyline key={`l${i}`} className="hit hit--line" points={pts(l.line)} />)}
          {LABELS[s.slug] ? <g className="lbl">{LABELS[s.slug]}</g> : null}
          {PINS[s.slug]}
        </Link>
      ))}
    </svg>
  );
}
