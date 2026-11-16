import Link from "next/link";
import { CALLOUT } from "./callouts";

// "Typical office network" (mock/diagram.mjs `wideDrawing` and `tallDrawing`): the same content in two layouts.
// Coordinates, labels and delays (`--d`, seconds) are the mock's. The load sequence itself is CSS (drawing.css).
const delay = (d) => ({ "--d": `${d}s` });
const T = ({ x, y, cls = "t1", anchor, children }) => <text x={x} y={y} className={cls} textAnchor={anchor}>{children}</text>;
const Bub = ({ n, x, y, d = 2.2 }) => (
  <g className="bub rise" style={delay(d)} transform={`translate(${x} ${y})`}><circle r="11.5" /><text textAnchor="middle" dy="4.4">{n}</text></g>
);
const Flag = ({ x, y, w, d = 1.7, children }) => (
  <g className="flag rise" style={delay(d)} transform={`translate(${x} ${y})`}><rect x={-w / 2} y="-9" width={w} height="18" rx="3" /><text textAnchor="middle" dy="3.8">{children}</text></g>
);
const Use = ({ id, x, y, d = 0 }) => <use href={`#${id}`} x={x} y={y} className="rise" style={delay(d)} />;
const Wire = ({ d: path, t = 1, cls = "" }) => <path className={`wire ${cls}`.trim()} pathLength="1" style={delay(t)} d={path} />;
const Rise = ({ d, children }) => <g className="rise" style={delay(d)}>{children}</g>;
const Fade = ({ d, children }) => <g className="fade" style={delay(d)}>{children}</g>;

// One service in the drawing: a real link to its page, with an accessible name.
const Part = ({ slug, label, children }) => (
  <Link className="svc" data-svc={slug} href={`/services/${slug}`} aria-label={label}>{children}</Link>
);

const ARIA = "Drawing of a typical office network. Each numbered part links to the Infyta service that builds it.";

function Wide() {
  return (
    <svg className="dwg dwg--wide" viewBox="0 0 1200 408" role="group" aria-label={ARIA}>
      <Part slug="it-support-consultancy" label="IT Support & Consultancy: the whole office">
        <rect className="hit" x="196" y="20" width="984" height="372" rx="12" />
        <rect className="boundary fade" style={delay(2.3)} x="196" y="20" width="984" height="372" rx="12" />
        <Fade d={2.3}>
          <rect className="knock" x="214" y="9" width="84" height="22" /><T x={222} y={25}>Your office</T>
          <rect className="knock" x="958" y="9" width="204" height="22" /><T x={1124} y={25} anchor="end">IT Support &amp; Consultancy</T>
        </Fade>
        <Bub n={CALLOUT["it-support-consultancy"]} x={1146} y={20} d={2.5} />
      </Part>

      <Part slug="server-cloud-solutions" label="Server & Cloud Solutions">
        <rect className="hit" x="20" y="24" width="168" height="140" /><rect className="hit" x="862" y="130" width="150" height="220" />
        <Use id="d-cloud" x={44} y={46} d={0.1} />
        <Rise d={0.1}><T x={88} y={120} anchor="middle">Cloud</T><T x={88} y={135} cls="t2" anchor="middle">AWS, Azure,</T><T x={88} y={149} cls="t2" anchor="middle">Google Cloud</T></Rise>
        <Bub n={CALLOUT["server-cloud-solutions"]} x={142} y={40} d={2.4} />
        <Wire d="M700 100V142Q700 150 708 150H912Q920 150 920 158V236" t={1.15} />
        <Flag x={920} y={204} w={50}>Servers</Flag>
        <Use id="d-server" x={876} y={236} d={1.75} /><Use id="d-server" x={876} y={258} d={1.8} /><Use id="d-server" x={876} y={280} d={1.85} />
        <Rise d={1.85}><T x={920} y={320} anchor="middle">Servers</T><T x={920} y={335} cls="t2" anchor="middle">Windows, Linux, VMware</T></Rise>
        <path className="thin rise" style={delay(2.4)} d="M968 246h12" /><Bub n={CALLOUT["server-cloud-solutions"]} x={992} y={246} d={2.4} />
      </Part>

      <Part slug="network-infrastructure" label="Network Infrastructure">
        <rect className="hit" x="236" y="36" width="650" height="104" /><rect className="hit" x="236" y="140" width="290" height="190" />
        <path className="wan fade" style={delay(0.15)} d="M132 76H252" /><Fade d={0.15}><T x={140} y={95} cls="t2">Internet</T></Fade>
        <Use id="d-router" x={252} y={58} d={0.3} /><Rise d={0.3}><T x={252} y={114}>Router</T><T x={252} y={129} cls="t2">MikroTik</T></Rise>
        <Wire d="M332 76H404" t={0.45} cls="quick" />
        <Use id="d-firewall" x={404} y={58} d={0.6} /><Rise d={0.6}><T x={404} y={114}>Firewall</T><T x={404} y={129} cls="t2">Fortinet</T></Rise>
        <Wire d="M484 76H560" t={0.75} cls="quick" />
        <Use id="d-switch" x={560} y={52} d={0.9} /><Rise d={0.9}><T x={814} y={72}>Core switch</T><T x={814} y={87} cls="t2">Cisco</T></Rise>
        <path className="thin rise" style={delay(2.3)} d="M368 50v22" /><Bub n={CALLOUT["network-infrastructure"]} x={368} y={38} d={2.3} />
        <Wire d="M604 100V142Q604 150 596 150H308Q300 150 300 158V236" t={1.15} />
        <Wire d="M628 100V164Q628 172 620 172H478Q470 172 470 180V241" t={1.15} />
        <Flag x={300} y={204} w={40}>Staff</Flag><Flag x={470} y={204} w={66}>Guest Wi-Fi</Flag>
        <path className="rise" style={delay(1.75)} d="M262 246V236H338V246M300 236V246" />
        <Use id="d-pc" x={247} y={246} d={1.75} /><Use id="d-pc" x={285} y={246} d={1.8} /><Use id="d-pc" x={323} y={246} d={1.85} />
        <Rise d={1.85}><T x={300} y={296} anchor="middle">Staff workstations</T></Rise>
        <Use id="d-ap" x={470} y={256} d={1.8} />
        <Rise d={1.85}><T x={470} y={296} anchor="middle">Office Wi-Fi</T><T x={470} y={311} cls="t2" anchor="middle">Guest access</T></Rise>
      </Part>

      <Part slug="security-surveillance" label="Security & Surveillance">
        <rect className="hit" x="596" y="140" width="258" height="200" />
        <Wire d="M652 100V236" t={1.15} />
        <Wire d="M676 100V164Q676 172 684 172H782Q790 172 790 180V236" t={1.15} />
        <Flag x={652} y={204} w={52}>Cameras</Flag><Flag x={790} y={204} w={40}>Doors</Flag>
        <Use id="d-nvr" x={614} y={236} d={1.75} />
        <path className="rise" style={delay(1.85)} d="M630 264V288M674 264V288" />
        <Use id="d-dome" x={618} y={288} d={1.9} /><Use id="d-bullet" x={669} y={288} d={1.9} />
        <Rise d={1.9}><T x={652} y={328} anchor="middle">CCTV cameras</T><T x={652} y={343} cls="t2" anchor="middle">Recorder</T></Rise>
        <Use id="d-door" x={775} y={236} d={1.8} />
        <Rise d={1.85}><T x={790} y={302} anchor="middle">Access control</T><T x={790} y={317} cls="t2" anchor="middle">Biometric attendance</T></Rise>
        <path className="thin rise" style={delay(2.35)} d="M694 250h24M744 250h28" /><Bub n={CALLOUT["security-surveillance"]} x={731} y={250} d={2.35} />
      </Part>

      <Part slug="software-development" label="Software Development">
        <rect className="hit" x="1024" y="204" width="152" height="184" />
        <Wire d="M964 267H1052" t={1.9} cls="quick" />
        <Use id="d-app" x={1052} y={232} d={2.0} />
        <path className="rise" style={delay(2.05)} d="M1094 288V306" />
        <Use id="d-db" x={1076} y={306} d={2.05} />
        <Rise d={2.1}><T x={1094} y={362} anchor="middle">Business software</T><T x={1094} y={377} cls="t2" anchor="middle">SQL Server, MySQL, MongoDB</T></Rise>
        <Bub n={CALLOUT["software-development"]} x={1152} y={222} d={2.45} />
      </Part>
    </svg>
  );
}

function Tall() {
  return (
    <svg className="dwg dwg--tall" viewBox="0 0 360 752" role="group" aria-label={ARIA}>
      <Part slug="it-support-consultancy" label="IT Support & Consultancy: the whole office">
        <rect className="hit" x="6" y="96" width="348" height="648" rx="12" />
        <rect className="boundary fade" style={delay(2.3)} x="6" y="96" width="348" height="648" rx="12" />
        <Fade d={2.3}>
          <rect className="knock" x="16" y="85" width="78" height="22" /><T x={22} y={101}>Your office</T>
          <rect className="knock" x="160" y="85" width="166" height="22" /><T x={318} y={101} anchor="end">IT Support &amp; Consultancy</T>
        </Fade>
        <Bub n={CALLOUT["it-support-consultancy"]} x={338} y={96} d={2.5} />
      </Part>

      <Part slug="server-cloud-solutions" label="Server & Cloud Solutions">
        <rect className="hit" x="6" y="0" width="348" height="74" /><rect className="hit" x="16" y="550" width="330" height="80" />
        <use href="#d-cloud" className="rise" style={delay(0.1)} transform="translate(19 8) scale(.8)" />
        <Rise d={0.1}><T x={110} y={30}>Cloud</T><T x={110} y={45} cls="t2">AWS, Azure, Google Cloud</T></Rise><Bub n={CALLOUT["server-cloud-solutions"]} x={338} y={32} d={2.4} />
        <path className="rise" style={delay(1.7)} d="M42 588H62" /><circle className="tap rise" style={delay(1.7)} cx="42" cy="588" r="2.6" />
        <Use id="d-server" x={62} y={557} d={1.75} /><Use id="d-server" x={62} y={579} d={1.8} /><Use id="d-server" x={62} y={601} d={1.85} />
        <Rise d={1.85}><T x={166} y={584}>Servers</T><T x={166} y={599} cls="t2">Windows, Linux, VMware</T></Rise><Bub n={CALLOUT["server-cloud-solutions"]} x={338} y={588} d={2.4} />
      </Part>

      <Part slug="network-infrastructure" label="Network Infrastructure">
        <rect className="hit" x="8" y="108" width="344" height="270" />
        <path className="wan fade" style={delay(0.15)} d="M54 52V116" /><Fade d={0.15}><T x={64} y={80} cls="t2">Internet</T></Fade>
        <Use id="d-router" x={14} y={116} d={0.3} /><Rise d={0.3}><T x={110} y={131}>Router</T><T x={110} y={146} cls="t2">MikroTik</T></Rise><Bub n={CALLOUT["network-infrastructure"]} x={338} y={134} d={2.3} />
        <Wire d="M54 152V172" t={0.45} cls="quick" />
        <Use id="d-firewall" x={14} y={172} d={0.6} /><Rise d={0.6}><T x={110} y={187}>Firewall</T><T x={110} y={202} cls="t2">Fortinet</T></Rise>
        <Wire d="M54 208V228" t={0.75} cls="quick" />
        <Use id="d-switch-s" x={14} y={228} d={0.9} /><Rise d={0.9}><T x={150} y={245}>Core switch</T><T x={150} y={260} cls="t2">Cisco</T></Rise>
        <Wire d="M42 268V588" t={1.15} />
        <path className="rise" style={delay(1.5)} d="M42 312H62M42 370H69" /><circle className="tap rise" style={delay(1.5)} cx="42" cy="312" r="2.6" /><circle className="tap rise" style={delay(1.5)} cx="42" cy="370" r="2.6" />
        <Use id="d-pc" x={62} y={299} d={1.55} /><Use id="d-pc" x={100} y={299} d={1.6} />
        <Rise d={1.6}><T x={150} y={316}>Staff workstations</T></Rise>
        <Use id="d-ap" x={84} y={370} d={1.6} />
        <Rise d={1.65}><T x={150} y={366}>Office Wi-Fi</T><T x={150} y={381} cls="t2">Guest access</T></Rise>
      </Part>

      <Part slug="security-surveillance" label="Security & Surveillance">
        <rect className="hit" x="16" y="404" width="330" height="140" />
        <path className="rise" style={delay(1.6)} d="M42 430H62M42 512H62" /><circle className="tap rise" style={delay(1.6)} cx="42" cy="430" r="2.6" /><circle className="tap rise" style={delay(1.6)} cx="42" cy="512" r="2.6" />
        <Use id="d-nvr" x={62} y={416} d={1.65} />
        <path className="rise" style={delay(1.75)} d="M78 444V458M118 444V458" />
        <Use id="d-dome" x={66} y={458} d={1.8} /><Use id="d-bullet" x={113} y={458} d={1.8} />
        <Rise d={1.75}><T x={150} y={428}>CCTV cameras</T><T x={150} y={443} cls="t2">Recorder</T></Rise><Bub n={CALLOUT["security-surveillance"]} x={338} y={430} d={2.35} />
        <Use id="d-door" x={62} y={489} d={1.75} />
        <Rise d={1.8}><T x={150} y={508}>Access control</T><T x={150} y={523} cls="t2">Biometric attendance</T></Rise>
      </Part>

      <Part slug="software-development" label="Software Development">
        <rect className="hit" x="16" y="630" width="330" height="108" />
        <Wire d="M106 619V640" t={1.9} cls="quick" />
        <Use id="d-app" x={62} y={640} d={2.0} />
        <path className="rise" style={delay(2.05)} d="M146 668H166" />
        <Use id="d-db" x={166} y={651} d={2.05} />
        <Rise d={2.1}><T x={62} y={716}>Business software</T><T x={62} y={731} cls="t2">SQL Server, MySQL, MongoDB</T></Rise><Bub n={CALLOUT["software-development"]} x={338} y={668} d={2.45} />
      </Part>
    </svg>
  );
}

export default function OfficeNetwork() {
  return (
    <>
      <Wide />
      <Tall />
    </>
  );
}
