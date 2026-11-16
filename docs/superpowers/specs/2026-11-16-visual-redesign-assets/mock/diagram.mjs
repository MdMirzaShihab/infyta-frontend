// The drawing system: device symbols, the hero network drawing (wide + tall), and small detail drawings.
// Everything is stroke: currentColor so a group lights up by changing its colour.

const T = (x, y, s, cls = 't1', anchor) => `<text x="${x}" y="${y}" class="${cls}"${anchor ? ` text-anchor="${anchor}"` : ''}>${s}</text>`;
const bub = (n, x, y, d = 2.2) => `<g class="bub rise" style="--d:${d}s" transform="translate(${x} ${y})"><circle r="11.5"/><text text-anchor="middle" dy="4.4">${n}</text></g>`;
const flag = (x, y, s, w, d = 1.7) => `<g class="flag rise" style="--d:${d}s" transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-9" width="${w}" height="18" rx="3"/><text text-anchor="middle" dy="3.8">${s}</text></g>`;
const use = (id, x, y, d = 0, extra = '') => `<use href="#${id}" x="${x}" y="${y}" class="rise" style="--d:${d}s" ${extra}/>`;
const wire = (dPath, d = 1, cls = '') => `<path class="wire ${cls}" pathLength="1" style="--d:${d}s" d="${dPath}"/>`;

export const NUM = {
  'software-development': 1,
  'network-infrastructure': 2,
  'it-support-consultancy': 3,
  'security-surveillance': 4,
  'server-cloud-solutions': 5,
};

// Shared symbol definitions (rendered once, hidden).
export const symbols = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <g id="d-router"><rect class="body" width="80" height="36" rx="5"/><circle class="led" cx="13" cy="18" r="2.8"/><g class="port"><rect x="27" y="13" width="9" height="10" rx="1.2"/><rect x="40" y="13" width="9" height="10" rx="1.2"/><rect x="53" y="13" width="9" height="10" rx="1.2"/><rect x="66" y="13" width="9" height="10" rx="1.2"/></g></g>
  <g id="d-firewall"><rect class="body" width="80" height="36" rx="5"/><g class="thin"><rect x="10" y="8" width="39" height="20" rx="1"/><path d="M10 18h39M23 8v10M36 8v10M16.5 18v10M29.5 18v10M42.5 18v10"/></g><circle class="led" cx="65" cy="18" r="2.8"/></g>
  <g id="d-switch"><rect class="body" width="240" height="48" rx="5"/><g class="port">${Array.from({ length: 14 }, (_, i) => `<rect x="${16 + 12 * i}" y="10" width="8" height="9" rx="1"/><rect class="${[2, 4, 6, 8, 10].includes(i) ? 'lit' : ''}" x="${16 + 12 * i}" y="28" width="8" height="9" rx="1"/>`).join('')}<rect x="192" y="10" width="11" height="9" rx="1"/><rect x="207" y="10" width="11" height="9" rx="1"/><rect x="192" y="28" width="11" height="9" rx="1"/><rect x="207" y="28" width="11" height="9" rx="1"/></g><circle class="led" cx="229" cy="24" r="2.8"/></g>
  <g id="d-switch-s"><rect class="body" width="120" height="40" rx="5"/><g class="port">${Array.from({ length: 7 }, (_, i) => `<rect x="${12 + 12 * i}" y="8" width="8" height="8" rx="1"/><rect class="${i === 1 ? 'lit' : ''}" x="${12 + 12 * i}" y="24" width="8" height="8" rx="1"/>`).join('')}</g><circle class="led" cx="108" cy="20" r="2.6"/></g>
  <g id="d-pc"><rect class="body" width="30" height="20" rx="2.5"/><path d="M15 20v5M8 25.5h14"/></g>
  <g id="d-ap"><circle class="body" r="15"/><circle class="led" r="2.8"/><path class="thin" d="M-21 -8a22 22 0 0 0 0 16M-27 -12a30 30 0 0 0 0 24M21 -8a22 22 0 0 1 0 16M27 -12a30 30 0 0 1 0 24"/></g>
  <g id="d-nvr"><rect class="body" width="76" height="28" rx="4"/><g class="thin"><rect x="8" y="8" width="20" height="12" rx="1.5"/><rect x="33" y="8" width="20" height="12" rx="1.5"/></g><circle class="led" cx="65" cy="14" r="2.6"/></g>
  <g id="d-dome"><path d="M0 0h24"/><path class="body" d="M2 0a10 10 0 0 0 20 0z"/><circle class="led" cx="12" cy="4.4" r="2.2"/></g>
  <g id="d-bullet"><path d="M5 0v6"/><rect class="body" x="0" y="6" width="28" height="12" rx="3"/><path class="thin" d="M21 6v12"/><circle class="led" cx="24.6" cy="12" r="1.7"/></g>
  <g id="d-door"><rect class="body" width="30" height="46" rx="5"/><rect class="thin" x="5" y="6" width="20" height="13" rx="1.5"/><path class="thin" d="M6.5 35a8.5 8.5 0 0 1 17 0M9.5 36a5.5 5.5 0 0 1 11 0M12.5 37a2.5 2.5 0 0 1 5 0"/></g>
  <g id="d-server"><rect class="body" width="88" height="18" rx="3"/><path class="thin" d="M10 5.5v7M15.5 5.5v7M21 5.5v7M26.5 5.5v7M42 7h22M42 11h22"/><circle class="led" cx="77" cy="9" r="2.4"/></g>
  <g id="d-cloud"><path class="body" d="M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z"/></g>
  <g id="d-app"><rect class="body" width="84" height="56" rx="4"/><path d="M0 12h84"/><g class="dots"><circle cx="8" cy="6" r="1.5"/><circle cx="14.5" cy="6" r="1.5"/><circle cx="21" cy="6" r="1.5"/></g><path class="thin" d="M10 23h34M10 32h52M10 41h26M56 44v-9h8v9M68 44V26h8v18"/></g>
  <g id="d-db"><path class="body" d="M0 6v22a18 6 0 0 0 36 0V6"/><ellipse class="body" cx="18" cy="6" rx="18" ry="6"/><path class="thin" d="M0 17a18 6 0 0 0 36 0"/></g>
</defs></svg>`;

// ---- Hero drawing, wide (desktop). viewBox 1200 x 408 ----
export function wideDrawing() {
  const g = (slug, label, inner) => `<a class="svc" data-svc="${slug}" href="#services" data-goto="service" aria-label="${label}">${inner}</a>`;
  const support = g('it-support-consultancy', 'IT Support and Consultancy: the whole office', `
    <rect class="hit" x="196" y="20" width="984" height="372" rx="12"/>
    <rect class="boundary fade" style="--d:2.3s" x="196" y="20" width="984" height="372" rx="12"/>
    <g class="fade" style="--d:2.3s"><rect class="knock" x="214" y="9" width="84" height="22"/>${T(222, 25, 'Your office')}
    <rect class="knock" x="958" y="9" width="204" height="22"/>${T(1124, 25, 'IT Support &amp; Consultancy', 't1', 'end')}</g>
    ${bub(3, 1146, 20, 2.5)}`);

  const server = g('server-cloud-solutions', 'Server and Cloud Solutions', `
    <rect class="hit" x="20" y="24" width="168" height="140"/><rect class="hit" x="862" y="130" width="150" height="220"/>
    ${use('d-cloud', 44, 46, 0.1)}
    <g class="rise" style="--d:.1s">${T(88, 120, 'Cloud', 't1', 'middle')}${T(88, 135, 'AWS, Azure,', 't2', 'middle')}${T(88, 149, 'Google Cloud', 't2', 'middle')}</g>
    ${bub(5, 142, 40, 2.4)}
    ${wire('M700 100V142Q700 150 708 150H912Q920 150 920 158V236', 1.15)}
    ${flag(920, 204, 'Servers', 50)}
    ${use('d-server', 876, 236, 1.75)}${use('d-server', 876, 258, 1.8)}${use('d-server', 876, 280, 1.85)}
    <g class="rise" style="--d:1.85s">${T(920, 320, 'Servers', 't1', 'middle')}${T(920, 335, 'Windows, Linux, VMware', 't2', 'middle')}</g>
    <path class="thin rise" style="--d:2.4s" d="M968 246h12"/>${bub(5, 992, 246, 2.4)}`);

  const network = g('network-infrastructure', 'Network Infrastructure', `
    <rect class="hit" x="236" y="36" width="650" height="104"/><rect class="hit" x="236" y="140" width="290" height="190"/>
    <path class="wan fade" style="--d:.15s" d="M132 76H252"/><g class="fade" style="--d:.15s">${T(140, 95, 'Internet', 't2')}</g>
    ${use('d-router', 252, 58, 0.3)}<g class="rise" style="--d:.3s">${T(252, 114, 'Router')}${T(252, 129, 'MikroTik', 't2')}</g>
    ${wire('M332 76H404', 0.45, 'quick')}
    ${use('d-firewall', 404, 58, 0.6)}<g class="rise" style="--d:.6s">${T(404, 114, 'Firewall')}${T(404, 129, 'Fortinet', 't2')}</g>
    ${wire('M484 76H560', 0.75, 'quick')}
    ${use('d-switch', 560, 52, 0.9)}<g class="rise" style="--d:.9s">${T(814, 72, 'Core switch')}${T(814, 87, 'Cisco', 't2')}</g>
    <path class="thin rise" style="--d:2.3s" d="M368 50v22"/>${bub(2, 368, 38, 2.3)}
    ${wire('M604 100V142Q604 150 596 150H308Q300 150 300 158V236', 1.15)}
    ${wire('M628 100V164Q628 172 620 172H478Q470 172 470 180V241', 1.15)}
    ${flag(300, 204, 'Staff', 40)}${flag(470, 204, 'Guest Wi-Fi', 66)}
    <path class="rise" style="--d:1.75s" d="M262 246V236H338V246M300 236V246"/>
    ${use('d-pc', 247, 246, 1.75)}${use('d-pc', 285, 246, 1.8)}${use('d-pc', 323, 246, 1.85)}
    <g class="rise" style="--d:1.85s">${T(300, 296, 'Staff workstations', 't1', 'middle')}</g>
    ${use('d-ap', 470, 256, 1.8)}
    <g class="rise" style="--d:1.85s">${T(470, 296, 'Office Wi-Fi', 't1', 'middle')}${T(470, 311, 'Guest access', 't2', 'middle')}</g>`);

  const security = g('security-surveillance', 'Security and Surveillance', `
    <rect class="hit" x="596" y="140" width="258" height="200"/>
    ${wire('M652 100V236', 1.15)}
    ${wire('M676 100V164Q676 172 684 172H782Q790 172 790 180V236', 1.15)}
    ${flag(652, 204, 'Cameras', 52)}${flag(790, 204, 'Doors', 40)}
    ${use('d-nvr', 614, 236, 1.75)}
    <path class="rise" style="--d:1.85s" d="M630 264V288M674 264V288"/>
    ${use('d-dome', 618, 288, 1.9)}${use('d-bullet', 669, 288, 1.9)}
    <g class="rise" style="--d:1.9s">${T(652, 328, 'CCTV cameras', 't1', 'middle')}${T(652, 343, 'Recorder', 't2', 'middle')}</g>
    ${use('d-door', 775, 236, 1.8)}
    <g class="rise" style="--d:1.85s">${T(790, 302, 'Access control', 't1', 'middle')}${T(790, 317, 'Biometric attendance', 't2', 'middle')}</g>
    <path class="thin rise" style="--d:2.35s" d="M694 250h24M744 250h28"/>${bub(4, 731, 250, 2.35)}`);

  const software = g('software-development', 'Software Development', `
    <rect class="hit" x="1024" y="204" width="152" height="184"/>
    ${wire('M964 267H1052', 1.9, 'quick')}
    ${use('d-app', 1052, 232, 2.0)}
    <path class="rise" style="--d:2.05s" d="M1094 288V306"/>
    ${use('d-db', 1076, 306, 2.05)}
    <g class="rise" style="--d:2.1s">${T(1094, 362, 'Business software', 't1', 'middle')}${T(1094, 377, 'SQL Server, MySQL, MongoDB', 't2', 'middle')}</g>
    ${bub(1, 1152, 222, 2.45)}`);

  return `<svg class="dwg dwg--wide" viewBox="0 0 1200 408" role="group" aria-label="Drawing of a typical office network. Each numbered part links to the Infyta service that builds it.">
    ${support}${server}${network}${security}${software}</svg>`;
}

// ---- Hero drawing, tall (phones and tablets). viewBox 360 x 752 ----
export function tallDrawing() {
  const g = (slug, label, inner) => `<a class="svc" data-svc="${slug}" href="#services" data-goto="service" aria-label="${label}">${inner}</a>`;
  const support = g('it-support-consultancy', 'IT Support and Consultancy: the whole office', `
    <rect class="hit" x="6" y="96" width="348" height="648" rx="12"/>
    <rect class="boundary fade" style="--d:2.3s" x="6" y="96" width="348" height="648" rx="12"/>
    <g class="fade" style="--d:2.3s"><rect class="knock" x="16" y="85" width="78" height="22"/>${T(22, 101, 'Your office')}
    <rect class="knock" x="160" y="85" width="166" height="22"/>${T(318, 101, 'IT Support &amp; Consultancy', 't1', 'end')}</g>
    ${bub(3, 338, 96, 2.5)}`);
  const server = g('server-cloud-solutions', 'Server and Cloud Solutions', `
    <rect class="hit" x="6" y="0" width="348" height="74"/><rect class="hit" x="16" y="550" width="330" height="80"/>
    <use href="#d-cloud" class="rise" style="--d:.1s" transform="translate(19 8) scale(.8)"/>
    <g class="rise" style="--d:.1s">${T(110, 30, 'Cloud')}${T(110, 45, 'AWS, Azure, Google Cloud', 't2')}</g>${bub(5, 338, 32, 2.4)}
    <path class="rise" style="--d:1.7s" d="M42 588H62"/><circle class="tap rise" style="--d:1.7s" cx="42" cy="588" r="2.6"/>
    ${use('d-server', 62, 557, 1.75)}${use('d-server', 62, 579, 1.8)}${use('d-server', 62, 601, 1.85)}
    <g class="rise" style="--d:1.85s">${T(166, 584, 'Servers')}${T(166, 599, 'Windows, Linux, VMware', 't2')}</g>${bub(5, 338, 588, 2.4)}`);
  const network = g('network-infrastructure', 'Network Infrastructure', `
    <rect class="hit" x="8" y="108" width="344" height="270"/>
    <path class="wan fade" style="--d:.15s" d="M54 52V116"/><g class="fade" style="--d:.15s">${T(64, 80, 'Internet', 't2')}</g>
    ${use('d-router', 14, 116, 0.3)}<g class="rise" style="--d:.3s">${T(110, 131, 'Router')}${T(110, 146, 'MikroTik', 't2')}</g>${bub(2, 338, 134, 2.3)}
    ${wire('M54 152V172', 0.45, 'quick')}
    ${use('d-firewall', 14, 172, 0.6)}<g class="rise" style="--d:.6s">${T(110, 187, 'Firewall')}${T(110, 202, 'Fortinet', 't2')}</g>
    ${wire('M54 208V228', 0.75, 'quick')}
    ${use('d-switch-s', 14, 228, 0.9)}<g class="rise" style="--d:.9s">${T(150, 245, 'Core switch')}${T(150, 260, 'Cisco', 't2')}</g>
    ${wire('M42 268V588', 1.15)}
    <path class="rise" style="--d:1.5s" d="M42 312H62M42 370H69"/><circle class="tap rise" style="--d:1.5s" cx="42" cy="312" r="2.6"/><circle class="tap rise" style="--d:1.5s" cx="42" cy="370" r="2.6"/>
    ${use('d-pc', 62, 299, 1.55)}${use('d-pc', 100, 299, 1.6)}
    <g class="rise" style="--d:1.6s">${T(150, 316, 'Staff workstations')}</g>
    ${use('d-ap', 84, 370, 1.6)}
    <g class="rise" style="--d:1.65s">${T(150, 366, 'Office Wi-Fi')}${T(150, 381, 'Guest access', 't2')}</g>`);
  const security = g('security-surveillance', 'Security and Surveillance', `
    <rect class="hit" x="16" y="404" width="330" height="140"/>
    <path class="rise" style="--d:1.6s" d="M42 430H62M42 512H62"/><circle class="tap rise" style="--d:1.6s" cx="42" cy="430" r="2.6"/><circle class="tap rise" style="--d:1.6s" cx="42" cy="512" r="2.6"/>
    ${use('d-nvr', 62, 416, 1.65)}
    <path class="rise" style="--d:1.75s" d="M78 444V458M118 444V458"/>
    ${use('d-dome', 66, 458, 1.8)}${use('d-bullet', 113, 458, 1.8)}
    <g class="rise" style="--d:1.75s">${T(150, 428, 'CCTV cameras')}${T(150, 443, 'Recorder', 't2')}</g>${bub(4, 338, 430, 2.35)}
    ${use('d-door', 62, 489, 1.75)}
    <g class="rise" style="--d:1.8s">${T(150, 508, 'Access control')}${T(150, 523, 'Biometric attendance', 't2')}</g>`);
  const software = g('software-development', 'Software Development', `
    <rect class="hit" x="16" y="630" width="330" height="108"/>
    ${wire('M106 619V640', 1.9, 'quick')}
    ${use('d-app', 62, 640, 2.0)}
    <path class="rise" style="--d:2.05s" d="M146 668H166"/>
    ${use('d-db', 166, 651, 2.05)}
    <g class="rise" style="--d:2.1s">${T(62, 716, 'Business software')}${T(62, 731, 'SQL Server, MySQL, MongoDB', 't2')}</g>${bub(1, 338, 668, 2.45)}`);
  return `<svg class="dwg dwg--tall" viewBox="0 0 360 752" role="group" aria-label="Drawing of a typical office network. Each numbered part links to the Infyta service that builds it.">
    ${support}${server}${network}${security}${software}</svg>`;
}

// ---- Small detail drawings used beside each service ----
const mini = (inner) => `<svg class="dwg dwg--mini" viewBox="0 0 168 60" aria-hidden="true" focusable="false">${inner}</svg>`;
export const minis = {
  'software-development': mini(`<use href="#d-app" transform="translate(18 6) scale(.84)"/><path d="M89 30H112"/><use href="#d-db" x="112" y="12"/>`),
  'network-infrastructure': mini(`<path class="wan" d="M0 30H14"/><use href="#d-router" transform="translate(14 17) scale(.72)"/><path d="M72 30H92"/><use href="#d-firewall" transform="translate(92 17) scale(.72)"/><path d="M150 30H168"/>`),
  'it-support-consultancy': mini(`<rect class="boundary" x="6" y="5" width="156" height="50" rx="8"/><use href="#d-pc" x="22" y="17"/><use href="#d-server" transform="translate(64 21) scale(.92)"/>`),
  'security-surveillance': mini(`<use href="#d-nvr" x="14" y="6"/><path d="M52 34V46H104"/><use href="#d-dome" x="104" y="20"/><path d="M116 8V20"/><use href="#d-bullet" x="134" y="30"/>`),
  'server-cloud-solutions': mini(`<use href="#d-server" transform="translate(10 12) scale(.9)"/><use href="#d-server" transform="translate(10 32) scale(.9)"/><path class="wan" d="M89 30H106"/><use href="#d-cloud" transform="translate(102 6) scale(.72)"/>`),
};

// ---- Detail drawing for the Network Infrastructure service page. viewBox 600 x 250 ----
export function networkDetail() {
  return `<svg class="dwg dwg--detail" viewBox="0 0 600 250" role="img" aria-label="Drawing: internet link, router, firewall and switch feeding separate segments for cameras, guest Wi-Fi and staff.">
    <path class="wan" d="M0 48H40"/>${T(2, 36, 'Internet', 't2')}
    <use href="#d-router" x="40" y="30"/>${T(40, 86, 'Router')}${T(40, 101, 'MikroTik', 't2')}
    <path d="M120 48H176"/>
    <use href="#d-firewall" x="176" y="30"/>${T(176, 86, 'Firewall')}${T(176, 101, 'Fortinet', 't2')}
    <path d="M256 48H312"/>
    <use href="#d-switch" x="312" y="24"/>
    <path d="M356 72V114Q356 122 348 122H238Q230 122 230 130V172"/>
    <path d="M380 72V172"/>
    <path d="M404 72V114Q404 122 412 122H502Q510 122 510 130V160"/>
    <g class="flag" transform="translate(230 148)"><rect x="-27" y="-9" width="54" height="18" rx="3"/><text text-anchor="middle" dy="3.8">Cameras</text></g>
    <g class="flag" transform="translate(380 148)"><rect x="-34" y="-9" width="68" height="18" rx="3"/><text text-anchor="middle" dy="3.8">Guest Wi-Fi</text></g>
    <g class="flag" transform="translate(510 148)"><rect x="-21" y="-9" width="42" height="18" rx="3"/><text text-anchor="middle" dy="3.8">Staff</text></g>
    <use href="#d-dome" x="218" y="172"/>${T(230, 206, 'CCTV', 't1', 'middle')}
    <use href="#d-ap" x="380" y="187"/>${T(380, 226, 'Office Wi-Fi', 't1', 'middle')}
    <path d="M491 170V160H529V170"/><use href="#d-pc" x="476" y="170"/><use href="#d-pc" x="514" y="170"/>${T(510, 216, 'Workstations', 't1', 'middle')}
  </svg>`;
}
