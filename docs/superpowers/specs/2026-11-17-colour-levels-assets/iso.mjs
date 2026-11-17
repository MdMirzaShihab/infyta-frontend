// Level 3 mockup: the office network as a 3D-style (isometric) drawing. Same parts and labels as the flat drawing,
// with software lifted to the top as the largest, warmest object. A sketch for discussion, not final artwork.

const K = 40, A = K * Math.sqrt(3) / 2, B = K / 2, OX = 430, OY = 150;
const r1 = (n) => Math.round(n * 10) / 10;
const P = (x, y, z = 0) => [r1(OX + (x - y) * A), r1(OY + (x + y) * B - z * K)];
const pts = (a) => a.map((p) => p.join(",")).join(" ");
const poly = (c, a) => `<polygon class="${c}" points="${pts(a)}"/>`;
const pline = (c, a, x = "") => `<polyline class="${c}" points="${pts(a)}"${x}/>`;
const dpath = (a) => "M" + a.map((p) => p.join(" ")).join("L");
const svc = (slug, inner) => `<a class="svc" data-svc="${slug}" href="/services/${slug}">${inner}</a>`;
const SW = "software-development", NET = "network-infrastructure", IT = "it-support-consultancy", SEC = "security-surveillance", SRV = "server-cloud-solutions";

// A box drawn from its three visible faces: the +y face (left), the +x face (right) and the top.
function box(x, y, z, w, d, h, k = "c") {
  const [t, l, r] = k === "c" ? ["ft", "fl", "fr"] : ["nt", "nl", "nr"];
  return poly(l, [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)])
    + poly(r, [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)])
    + poly(t, [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]);
}
const fy = (Y) => (x, z) => P(x, Y, z);
const fx = (X) => (y, z) => P(X, y, z);
const frect = (F, a0, b0, a1, b1, c) => poly(c, [F(a0, b1), F(a1, b1), F(a1, b0), F(a0, b0)]);
const dot = (p, r = 2.6, c = "led") => `<circle class="${c}" cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
const T = (x, y, s, c = "t1", anchor = "start") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${anchor}">${s}</text>`;
const bub = (n, x, y) => `<g class="bub" transform="translate(${x} ${y})"><circle r="12.5"/><text text-anchor="middle" dy="4.8">${n}</text></g>`;
const wallText = (x, z, s, c) => { const p = P(x, 0, z); return `<text class="${c}" transform="matrix(.866 .5 0 1 ${p[0]} ${p[1]})">${s}</text>`; };
const flow = (path, dur, begin = 0) => `<circle class="flow" r="3.8"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/></circle>`;
const cable = (slug, p3, dur = 3, begin = 0) => {
  const a = p3.map((p) => P(...p));
  return `<g data-svc="${slug}">${pline("cab", a)}${flow(dpath(a), dur, begin)}</g>`;
};

export function isoScene() {
  const W = 12, D = 10, H = 2.6, TH = 0.25;
  let s = "";

  // The office boundary and its two labels, lying on the ground along the front edges.
  const M = 1.2;
  let it = poly("boundary", [P(-M, -M), P(W + M, -M), P(W + M, D + M), P(-M, D + M)]);
  const a = P(0.5, D + 0.86), b = P(W + 0.86, D - 0.4);
  it += `<text class="floortext" transform="matrix(.866 .5 -.866 .5 ${a[0]} ${a[1]})">Your office</text>`;
  it += `<text class="floortext" transform="matrix(.866 -.5 .866 .5 ${b[0]} ${b[1]})">IT Support &amp; Consultancy</text>`;
  const b3 = P(W + M, D - 5.9);
  it += bub(3, b3[0], b3[1]);
  s += svc(IT, it);

  // Walls and floor.
  s += poly("wb", [P(0, 0, H), P(W, 0, H), P(W, 0, 0), P(0, 0, 0)]);
  s += poly("wa", [P(0, 0, H), P(0, D, H), P(0, D, 0), P(0, 0, 0)]);
  s += poly("nt", [P(-TH, -TH, H), P(W, -TH, H), P(W, 0, H), P(0, 0, H), P(0, D, H), P(-TH, D, H)]);
  s += poly("nr", [P(W, -TH, H), P(W, 0, H), P(W, 0, -0.3), P(W, -TH, -0.3)]);
  s += poly("nl", [P(-TH, D, H), P(0, D, H), P(0, D, -0.3), P(-TH, D, -0.3)]);
  s += poly("nl", [P(0, D, 0), P(W, D, 0), P(W, D, -0.3), P(0, D, -0.3)]);
  s += poly("nr", [P(W, 0, 0), P(W, D, 0), P(W, D, -0.3), P(W, 0, -0.3)]);
  s += poly("floor", [P(0, 0), P(W, 0), P(W, D), P(0, D)]);
  for (let i = 2; i < W; i += 2) s += pline("grid", [P(i, 0), P(i, D)]);
  for (let j = 2; j < D; j += 2) s += pline("grid", [P(0, j), P(W, j)]);

  // Zones on the floor.
  s += `<g data-svc="${NET}">${poly("carpet", [P(2.8, 4.3), P(9.7, 4.3), P(9.7, 7.6), P(2.8, 7.6)])}</g>`;
  s += `<g data-svc="${SEC}">${poly("carpet", [P(0.05, 5.0), P(4.3, 5.0), P(4.3, 9.9), P(0.05, 9.9)])}${poly("carpet", [P(9.2, 0.05), P(11.7, 0.05), P(11.7, 1.5), P(9.2, 1.5)])}</g>`;
  s += `<g data-svc="${SEC}">${poly("cone", [P(0.85, 8.16, 2.2), P(3.5, 6.5), P(3.9, 9.5)])}</g>`;

  // On the walls: the door and its terminal, and the cables that climb.
  const FR = fy(0), FL = fx(0);
  s += svc(SEC, frect(FR, 10.15, 0, 11.35, 2.05, "unit") + dot(FR(10.4, 1.0), 2.2, "tap")
    + pline("cab", [P(9.65, 0, 0), P(9.65, 0, 1.15)]) + pline("cab", [P(0, 6.9, 0.8), P(0, 6.9, 2.2), P(0, 8.1, 2.2)]));

  // Cables on the floor, one colour per segment, from the network rack outwards.
  s += cable(SRV, [[2.2, 1.15], [2.2, 1.6], [3.9, 1.6], [3.9, 1.25]], 1.6);
  s += cable(SEC, [[1.9, 1.15], [1.9, 2.2], [9.65, 2.2], [9.65, 0]], 3.4, 0.4);
  s += cable(NET, [[1.6, 1.15], [1.6, 3.9], [10.45, 3.9], [10.45, 8.1]], 3.8);
  s += `<g data-svc="${NET}">${pline("cab", [P(4.05, 3.9), P(4.05, 4.9)])}${pline("cab", [P(6.25, 3.9), P(6.25, 4.9)])}${pline("cab", [P(8.45, 3.9), P(8.45, 4.9)])}</g>`;
  s += cable(SEC, [[1.3, 1.15], [1.3, 6.2], [0.97, 6.2]], 2.6, 0.8);

  // Objects, back to front.
  const objs = [];
  const add = (depth, slug, svg) => objs.push({ depth, svg: slug ? svc(slug, svg) : svg });

  // Network rack: router, firewall and core switch.
  {
    const F = fy(1.15);
    let g = box(0.8, 0.15, 0, 1.6, 1.0, 2.5);
    g += frect(F, 0.95, 1.85, 2.25, 2.2, "unit") + dot(F(1.12, 2.02));
    for (let i = 0; i < 4; i++) g += frect(F, 1.36 + i * 0.21, 1.95, 1.49 + i * 0.21, 2.1, "thin");
    g += frect(F, 0.95, 1.33, 2.25, 1.68, "unit") + frect(F, 1.08, 1.42, 1.62, 1.59, "thin") + pline("thin", [F(1.26, 1.42), F(1.26, 1.59)]) + pline("thin", [F(1.44, 1.42), F(1.44, 1.59)]) + dot(F(2.05, 1.5));
    g += frect(F, 0.95, 0.55, 2.25, 1.15, "unit");
    for (let i = 0; i < 7; i++) {
      g += frect(F, 1.06 + i * 0.15, 0.93, 1.16 + i * 0.15, 1.05, "thin");
      g += frect(F, 1.06 + i * 0.15, 0.67, 1.16 + i * 0.15, 0.79, [1, 3, 4, 6].includes(i) ? "thin lit" : "thin");
    }
    g += dot(F(2.15, 0.86));
    add(2.25, NET, g);
  }
  // Server rack.
  {
    const F = fy(1.25);
    let g = box(3.2, 0.15, 0, 1.4, 1.1, 2.9);
    for (let i = 0; i < 5; i++) {
      const z = 0.32 + i * 0.5;
      g += frect(F, 3.33, z, 4.47, z + 0.36, "unit") + dot(F(4.33, z + 0.18), 2.3);
      g += pline("thin", [F(3.45, z + 0.09), F(3.45, z + 0.27)]) + pline("thin", [F(3.56, z + 0.09), F(3.56, z + 0.27)]) + pline("thin", [F(3.67, z + 0.09), F(3.67, z + 0.27)]) + pline("thin", [F(3.85, z + 0.18), F(4.18, z + 0.18)]);
    }
    add(4.6, SRV, g);
  }
  // Database, beside the servers.
  {
    const [cx, cy] = P(5.55, 0.75, 0), h = 0.95 * K, rx = r1(0.42 * K * 1.2247), ry = r1(0.42 * K * 0.7071), ty = r1(cy - h);
    const g = `<path class="fl" d="M${cx - rx} ${ty}V${cy}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}V${ty}Z"/><ellipse class="ft" cx="${cx}" cy="${ty}" rx="${rx}" ry="${ry}"/>`
      + `<path class="thin" d="M${cx - rx} ${r1(ty + h * 0.36)}A${rx} ${ry} 0 0 0 ${cx + rx} ${r1(ty + h * 0.36)}M${cx - rx} ${r1(ty + h * 0.68)}A${rx} ${ry} 0 0 0 ${cx + rx} ${r1(ty + h * 0.68)}"/>`;
    add(6.3, SW, g);
  }
  // Recorder against the left wall, and the camera above it.
  {
    const F = fx(0.97);
    const g = box(0.12, 5.5, 0, 0.85, 1.5, 0.8) + frect(F, 5.65, 0.28, 6.15, 0.6, "unit") + frect(F, 6.25, 0.28, 6.75, 0.6, "unit") + dot(F(6.87, 0.44), 2.3);
    add(6.8, SEC, g);
    const cam = box(0, 8.1, 2.14, 0.3, 0.12, 0.12, "n") + box(0.25, 7.98, 2.06, 0.62, 0.36, 0.28) + dot(P(0.87, 8.16, 2.2), 3, "led");
    add(8.7, SEC, cam);
  }
  // Door terminal.
  add(9.7, SEC, box(9.45, 0, 1.15, 0.4, 0.12, 0.55) + dot(P(9.65, 0.12, 1.5), 2.2));
  // Three desks; the screens carry the software colour.
  for (const x of [3.2, 5.4, 7.6]) {
    const y = 4.9;
    let g = box(x, y, 0, 0.07, 0.9, 0.72, "n") + box(x, y, 0.3, 1.7, 0.05, 0.42, "n") + box(x + 1.63, y, 0, 0.07, 0.9, 0.72, "n") + box(x, y, 0.72, 1.7, 0.9, 0.08, "n");
    g += box(x + 0.8, y + 0.13, 0.8, 0.1, 0.06, 0.14, "n");
    g += `<g data-svc="${SW}">${box(x + 0.42, y + 0.12, 0.92, 0.86, 0.07, 0.56)}${pline("thin", [P(x + 0.52, y + 0.19, 1.34), P(x + 0.95, y + 0.19, 1.34)])}${pline("thin", [P(x + 0.52, y + 0.19, 1.22), P(x + 1.15, y + 0.19, 1.22)])}${pline("thin", [P(x + 0.52, y + 0.19, 1.1), P(x + 0.85, y + 0.19, 1.1)])}</g>`;
    g += box(x + 0.5, y + 0.5, 0.8, 0.7, 0.22, 0.03, "n");
    add(x + y + 1.3, NET, g);
  }
  // Wi-Fi access point on a stand.
  {
    let g = box(10.2, 8.1, 0, 0.5, 0.5, 1.05, "n") + box(10.13, 8.03, 1.05, 0.64, 0.64, 0.12);
    const [cx, cy] = P(10.45, 8.35, 1.17);
    g += dot([cx, cy], 2.8);
    g += `<path class="thin" d="M${cx - 13} ${cy - 16}a18 18 0 0 1 26 0M${cx - 21} ${cy - 25}a30 30 0 0 1 42 0M${cx - 29} ${cy - 34}a42 42 0 0 1 58 0"/>`;
    add(18.6, NET, g);
  }
  objs.sort((p, q) => p.depth - q.depth);
  s += objs.map((o) => o.svg).join("");

  // Cloud, outside the office, and the internet line coming in over the wall.
  const rt = P(1.6, 0.65, 2.5);
  s += svc(SRV, `<g transform="translate(40 30) scale(1.5)"><path class="ft" d="M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z"/></g>`
    + T(104, 136, "Cloud", "t1", "middle") + T(104, 154, "AWS, Azure, Google Cloud", "t2", "middle") + bub(5, 58, 44));
  s += svc(NET, `<path class="wan" d="M172 88L${rt[0]} ${rt[1]}"/>` + T(232, 80, "Internet", "t2"));

  // Software: the largest, warmest thing in the picture, above everything it runs on.
  {
    const cx = 664, cy = 18, w = 250, h = 158;
    let g = `<path class="cab" d="M${cx} 100H549Q541 100 541 108V124"/>` + flow(`M${cx} 100H549Q541 100 541 108V124`, 1.8);
    g += `<path class="cab" d="M${cx} 150H604Q596 150 596 158V226"/>` + flow(`M${cx} 150H604Q596 150 596 158V226`, 1.6, 0.5);
    g += `<rect class="slab" x="${cx + 9}" y="${cy + 9}" width="${w}" height="${h}" rx="9"/>`;
    g += `<g transform="translate(${cx} ${cy})"><rect class="card" width="${w}" height="${h}" rx="9"/>`
      + `<path class="slab" d="M0 26V9a9 9 0 0 1 9-9h${w - 18}a9 9 0 0 1 9 9v17z"/><path d="M0 26h${w}"/>`
      + `<circle class="ondark" cx="15" cy="13" r="3.2"/><circle class="ondark" cx="27" cy="13" r="3.2"/><circle class="ondark" cx="39" cy="13" r="3.2"/>`
      + `<path class="thin" d="M58 26v${h - 26}"/>`
      + [40, 54, 68, 82, 96].map((y, i) => `<rect class="${i === 0 ? "solid" : "soft"}" x="11" y="${y}" width="${[36, 30, 34, 26, 32][i]}" height="7" rx="3.5"/>`).join("")
      + [70, 130, 190].map((x) => `<rect class="soft" x="${x}" y="38" width="50" height="34" rx="5"/><rect class="solid" x="${x + 8}" y="46" width="20" height="6" rx="3"/><rect class="ondark" x="${x + 8}" y="58" width="32" height="6" rx="3"/>`).join("")
      + [22, 34, 28, 46, 38, 56, 50, 64].map((bh, i) => `<rect class="solid" x="${72 + i * 21}" y="${146 - bh}" width="13" height="${bh}" rx="2"/>`).join("")
      + `<path class="thin" d="M68 146h172"/></g>`;
    g += `<g transform="translate(884 92)"><rect class="slab" x="6" y="6" width="46" height="86" rx="8"/><rect class="card" width="46" height="86" rx="8"/><rect class="solid" x="6" y="9" width="34" height="14" rx="3"/>`
      + `<path class="thin" d="M8 33h30M8 42h22M8 51h26"/><rect class="solid" x="9" y="62" width="28" height="11" rx="5.5"/><path class="thin" d="M18 80h10"/></g>`;
    g += T(758, 204, "Business software", "t1") + T(758, 222, "SQL Server, MySQL, MongoDB", "t2") + bub(1, cx, cy);
    s += svc(SW, g);
  }

  // Labels.
  s += svc(NET, `<path class="lead thin" d="M410 17H${rt[0]}V${rt[1] - 4}"/>` + T(404, 22, "Router, firewall, core switch", "t1", "end") + T(404, 40, "MikroTik, Fortinet, Cisco", "t2", "end") + bub(2, 164, 18)
    + T(402, 420, "Staff workstations", "t1", "middle") + T(470, 512, "Office Wi-Fi", "t1", "end") + T(470, 530, "Guest access", "t2", "end"));
  s += svc(SRV, `<path class="lead thin" d="M506 48V116"/>` + T(482, 22, "Servers", "t1") + T(482, 40, "Windows, Linux, VMware", "t2") + bub(5, 562, 17));
  s += svc(SEC, T(216, 376, "CCTV cameras", "t1", "middle") + T(216, 394, "Recorder", "t2", "middle") + bub(4, 216, 420)
    + wallText(6.15, 1.42, "Access control", "t1") + wallText(6.15, 0.94, "Biometric attendance", "t2"));

  return `<svg class="dwg iso x3" viewBox="0 0 944 650" role="group" aria-label="3D-style drawing of a typical office: software on top, running on the servers and network beneath it.">${s}</svg>`;
}
