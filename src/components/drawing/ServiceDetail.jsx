// The detail drawing beside each service page's headline, 600 x 250. Network Infrastructure is the mock's
// `networkDetail()`; the other four are drawn with the same symbols, line style and label classes (spec 6.7).
// They are still pictures: no load sequence, no links, and only the labels the spec allows.
const T = ({ x, y, cls = "t1", anchor, children }) => <text x={x} y={y} className={cls} textAnchor={anchor}>{children}</text>;
const Flag = ({ x, y, w, children }) => (
  <g className="flag" transform={`translate(${x} ${y})`}><rect x={-w / 2} y="-9" width={w} height="18" rx="3" /><text textAnchor="middle" dy="3.8">{children}</text></g>
);
const Tap = ({ x, y }) => <circle className="tap" cx={x} cy={y} r="2.6" />;

const DRAWINGS = {
  "software-development": {
    label: "Drawing: a web application and a mobile app sharing one database, linked to existing systems.",
    body: (
      <>
        <use href="#d-app" x="40" y="30" /><T x={40} y={106}>Web application</T>
        <use href="#d-phone" x="40" y="156" /><T x={40} y={222}>Mobile app</T>
        <path d="M124 58H188Q196 58 196 66V171Q196 179 188 179H66" />
        <path d="M196 118H244" /><Tap x={196} y={118} />
        <use href="#d-db" x="244" y="101" /><T x={244} y={157}>Database</T><T x={244} y={172} cls="t2">SQL Server, MySQL, MongoDB</T>
        <path className="wan" d="M280 118H456" />
        <use href="#d-server" x="456" y="109" /><T x={456} y={147}>Existing systems</T>
      </>
    ),
  },
  "network-infrastructure": {
    label: "Drawing: internet link, router, firewall and switch feeding separate segments for cameras, guest Wi-Fi and staff.",
    body: (
      <>
        <path className="wan" d="M0 48H40" /><T x={2} y={36} cls="t2">Internet</T>
        <use href="#d-router" x="40" y="30" /><T x={40} y={86}>Router</T><T x={40} y={101} cls="t2">MikroTik</T>
        <path d="M120 48H176" />
        <use href="#d-firewall" x="176" y="30" /><T x={176} y={86}>Firewall</T><T x={176} y={101} cls="t2">Fortinet</T>
        <path d="M256 48H312" />
        <use href="#d-switch" x="312" y="24" />
        <path d="M356 72V114Q356 122 348 122H238Q230 122 230 130V172" />
        <path d="M380 72V172" />
        <path d="M404 72V114Q404 122 412 122H502Q510 122 510 130V160" />
        <Flag x={230} y={148} w={54}>Cameras</Flag>
        <Flag x={380} y={148} w={68}>Guest Wi-Fi</Flag>
        <Flag x={510} y={148} w={42}>Staff</Flag>
        <use href="#d-dome" x="218" y="172" /><T x={230} y={206} anchor="middle">CCTV</T>
        <use href="#d-ap" x="380" y="187" /><T x={380} y={226} anchor="middle">Office Wi-Fi</T>
        <path d="M491 170V160H529V170" /><use href="#d-pc" x="476" y="170" /><use href="#d-pc" x="514" y="170" /><T x={510} y={216} anchor="middle">Workstations</T>
      </>
    ),
  },
  "it-support-consultancy": {
    label: "Drawing: an office with workstations, a server, an access point and a router inside one boundary.",
    body: (
      <>
        <rect className="boundary" x="16" y="24" width="568" height="208" rx="12" />
        <rect className="knock" x="34" y="13" width="76" height="22" /><T x={42} y={29}>Your office</T>
        <path className="wan" d="M0 78H56" />
        <use href="#d-router" x="56" y="60" /><T x={56} y={116}>Router</T>
        <path d="M136 78H492Q500 78 500 86V166" />
        <path d="M240 78V150M221 160V150H259V160" /><Tap x={240} y={78} />
        <use href="#d-pc" x="206" y="160" /><use href="#d-pc" x="244" y="160" /><T x={240} y={206} anchor="middle">Workstations</T>
        <path d="M372 78V162" /><Tap x={372} y={78} />
        <use href="#d-ap" x="372" y="177" /><T x={372} y={216} anchor="middle">Office Wi-Fi</T>
        <use href="#d-server" x="456" y="166" /><T x={500} y={206} anchor="middle">Servers</T>
      </>
    ),
  },
  "security-surveillance": {
    label: "Drawing: cameras and a recorder, and a door terminal for access control and attendance, on their own network segment.",
    body: (
      <>
        <use href="#d-switch-s" x="272" y="22" /><T x={408} y={47}>Switch</T>
        <path d="M300 62V112" /><Tap x={300} y={112} />
        <path d="M140 138V120Q140 112 148 112H452Q460 112 460 120V138" />
        <Flag x={300} y={88} w={54}>Cameras</Flag>
        <use href="#d-nvr" x="102" y="138" /><T x={190} y={157}>Recorder</T>
        <path d="M118 166V182M162 166V182" />
        <use href="#d-dome" x="106" y="182" /><use href="#d-bullet" x="157" y="182" /><T x={140} y={222} anchor="middle">CCTV cameras</T>
        <use href="#d-door" x="445" y="138" /><T x={460} y={204} anchor="middle">Access control</T><T x={460} y={219} cls="t2" anchor="middle">Biometric attendance</T>
      </>
    ),
  },
  "server-cloud-solutions": {
    label: "Drawing: a rack of servers, a host running virtual machines, and a link to the cloud.",
    body: (
      <>
        <use href="#d-server" x="24" y="128" /><use href="#d-server" x="24" y="150" /><use href="#d-server" x="24" y="172" />
        <T x={24} y={212}>Servers</T><T x={24} y={227} cls="t2">Windows, Linux, Active Directory</T>
        <path d="M112 159H230" />
        <g>
          <rect className="body" x="230" y="110" width="136" height="80" rx="6" />
          <g className="thin">
            <rect x="242" y="122" width="32" height="44" rx="2" /><rect x="282" y="122" width="32" height="44" rx="2" /><rect x="322" y="122" width="32" height="44" rx="2" />
            <path d="M242 130h32M282 130h32M322 130h32" />
          </g>
          <circle className="led" cx="352" cy="178" r="2.6" />
        </g>
        <T x={230} y={212}>Virtual machines</T><T x={230} y={227} cls="t2">VMware, Hyper-V</T>
        <path className="wan" d="M330 110V66Q330 58 338 58H450" />
        <use href="#d-cloud" x="446" y="24" /><T x={490} y={98} anchor="middle">Cloud</T><T x={490} y={113} cls="t2" anchor="middle">AWS, Azure, Google Cloud</T>
      </>
    ),
  },
};

export default function ServiceDetail({ slug }) {
  const drawing = DRAWINGS[slug];
  if (!drawing) return null;
  return (
    <svg className="dwg dwg--detail" viewBox="0 0 600 250" role="img" aria-label={drawing.label}>
      {drawing.body}
    </svg>
  );
}
