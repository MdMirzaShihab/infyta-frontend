// The 3D-style (isometric) drawing kit for the colour mockup, version 2.
// One island per zone: a low coloured platform with that service's equipment on it, in that service's colour only.
// The office floor sits on a navy base, which is IT Support. Software is the largest object and floats above its island.
// Every piece carries data-svc, so one service lights up as a group (styles in levels.css and build.mjs).

const K = 40, A = K * Math.sqrt(3) / 2, B = K / 2;
let OX = 440, OY = 168;
const r1 = (n) => Math.round(n * 10) / 10;
const P = (x, y, z = 0) => [r1(OX + (x - y) * A), r1(OY + (x + y) * B - z * K)];
const pts = (a) => a.map((p) => p.join(",")).join(" ");
const poly = (c, a) => `<polygon class="${c}" points="${pts(a)}"/>`;
const pline = (c, a) => `<polyline class="${c}" points="${pts(a)}"/>`;
const dpath = (a) => "M" + a.map((p) => p.join(" ")).join("L");

export const SW = "software-development", NET = "network-infrastructure", IT = "it-support-consultancy", SEC = "security-surveillance", SRV = "server-cloud-solutions";
const NAMES = { [SW]: "Software Development", [NET]: "Network Infrastructure", [IT]: "IT Support & Consultancy: the whole office", [SEC]: "Security & Surveillance", [SRV]: "Server & Cloud Solutions" };
const NUM = { [SW]: 1, [NET]: 2, [IT]: 3, [SEC]: 4, [SRV]: 5 };
// Every piece of a service is wrapped the same way, so the group can be styled and hovered as one.
const part = (slug, inner, cls = "") => `<a class="svc${cls ? " " + cls : ""}" data-svc="${slug}" href="/services/${slug}" aria-label="${NAMES[slug].replace("&", "&amp;")}">${inner}</a>`;

// A box from its three visible faces: the +y face (left), the +x face (right) and the top.
// kind "c" is equipment in the service colour, "p" a platform, "n" neutral (walls only).
const FACES = { c: ["ft", "fl", "fr"], p: ["pt", "pl", "pr"], n: ["nt", "nl", "nr"] };
function box(x, y, z, w, d, h, k = "c") {
  const [t, l, r] = FACES[k];
  return poly(l, [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)])
    + poly(r, [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)])
    + poly(t, [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]);
}
const fy = (Y) => (x, z) => P(x, Y, z);
const fx = (X) => (y, z) => P(X, y, z);
const frect = (F, a0, b0, a1, b1, c) => poly(c, [F(a0, b1), F(a1, b1), F(a1, b0), F(a0, b0)]);
const dot = (p, r = 2.6, c = "led") => `<circle class="${c}" cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
const T = (x, y, s, c = "t1", anchor = "start") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${anchor}">${s}</text>`;
const pin = (slug, x, y, cls = "") => `<g class="pin" transform="translate(${x} ${y})"><g class="bub${cls ? " " + cls : ""}"><circle r="12.5"/><text text-anchor="middle" dy="4.8">${NUM[slug]}</text></g></g>`;
// Text lying on a platform top, running along +x: zone names are painted on the floor, so they never spill over an edge.
const lay = (x, y, s, c = "t1") => { const p = P(x, y, PH); return `<text class="${c} lay" transform="matrix(.866 .5 -.866 .5 ${p[0]} ${p[1]})">${s}</text>`; };
const flow = (path, dur, begin = 0) => `<circle class="flow" r="3.8"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/></circle>`;
const cable = (p3, dur = 0, begin = 0) => { const a = p3.map((p) => P(...p)); return pline("cab", a) + (dur ? flow(dpath(a), dur, begin) : ""); };
const cylinder = (x, y, z, r, h) => {
  const [cx, cy] = P(x, y, z), hh = h * K, rx = r1(r * K * 1.2247), ry = r1(r * K * 0.7071), ty = r1(cy - hh);
  return `<path class="fl" d="M${cx - rx} ${ty}V${cy}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}V${ty}Z"/><ellipse class="ft" cx="${cx}" cy="${ty}" rx="${rx}" ry="${ry}"/>`
    + `<path class="thin" d="M${cx - rx} ${r1(ty + hh * 0.36)}A${rx} ${ry} 0 0 0 ${cx + rx} ${r1(ty + hh * 0.36)}M${cx - rx} ${r1(ty + hh * 0.68)}A${rx} ${ry} 0 0 0 ${cx + rx} ${r1(ty + hh * 0.68)}"/>`;
};

const PH = 0.14; // platform height

// ── Zones. Each returns { floor, objs: [{ depth, svg }] } in world units; the scene decides where labels go. ──

// Network core: one rack holding the router, the firewall and the core switch. Front on the +y face.
function zoneCore(x0, y0) {
  const x = x0 + 0.6, y = y0 + 0.2, F = fy(y + 1.0);
  let g = box(x, y, PH, 1.6, 1.0, 2.45);
  const u = (a, b) => frect(F, x + 0.15, PH + a, x + 1.45, PH + b, "unit");
  g += u(1.85, 2.2) + dot(F(x + 0.32, PH + 2.02));
  for (let i = 0; i < 4; i++) g += frect(F, x + 0.56 + i * 0.21, PH + 1.95, x + 0.69 + i * 0.21, PH + 2.1, "thin");
  g += u(1.33, 1.68) + frect(F, x + 0.28, PH + 1.42, x + 0.82, PH + 1.59, "thin") + pline("thin", [F(x + 0.46, PH + 1.42), F(x + 0.46, PH + 1.59)]) + pline("thin", [F(x + 0.64, PH + 1.42), F(x + 0.64, PH + 1.59)]) + dot(F(x + 1.25, PH + 1.5));
  g += u(0.55, 1.15);
  for (let i = 0; i < 7; i++) {
    g += frect(F, x + 0.26 + i * 0.15, PH + 0.93, x + 0.36 + i * 0.15, PH + 1.05, "thin");
    g += frect(F, x + 0.26 + i * 0.15, PH + 0.67, x + 0.36 + i * 0.15, PH + 0.79, [1, 3, 4, 6].includes(i) ? "thin lit" : "thin");
  }
  g += dot(F(x + 1.35, PH + 0.86));
  return { floor: box(x0, y0, 0, 2.8, 2.4, PH, "p"), objs: [{ depth: x + y + 1.3, svg: g }], top: P(x + 0.8, y + 0.5, PH + 2.45) };
}

// Servers: two racks against the left wall. Fronts on the +x face.
function zoneServers(x0, y0) {
  const objs = [];
  const tops = [];
  for (const [i, y] of [y0 + 0.3, y0 + 1.5].entries()) {
    const x = x0 + 0.15, h = i ? 2.25 : 2.6, F = fx(x + 1.1);
    let g = box(x, y, PH, 1.1, 1.05, h);
    for (let j = 0; j < (i ? 4 : 5); j++) {
      const z = PH + 0.28 + j * 0.46;
      g += frect(F, y + 0.1, z, y + 0.95, z + 0.34, "unit") + dot(F(y + 0.2, z + 0.17), 2.2);
      g += pline("thin", [F(y + 0.85, z + 0.08), F(y + 0.85, z + 0.26)]) + pline("thin", [F(y + 0.76, z + 0.08), F(y + 0.76, z + 0.26)]) + pline("thin", [F(y + 0.67, z + 0.08), F(y + 0.67, z + 0.26)]) + pline("thin", [F(y + 0.34, z + 0.17), F(y + 0.56, z + 0.17)]);
    }
    objs.push({ depth: x + y + 1.1, svg: g });
    tops.push(P(x + 0.55, y + 0.52, PH + h));
  }
  return { floor: box(x0, y0, 0, 3.0, 2.9, PH, "p"), objs, top: tops[0] };
}

// Software, on the floor: two databases and a large screen. The readable app window floats above (the scene adds it).
function zoneSoftware(x0, y0, w = 7.4, d = 2.4) {
  const objs = [];
  objs.push({ depth: x0 + 0.9 + y0 + 0.85, svg: cylinder(x0 + 0.9, y0 + 0.85, PH, 0.44, 1.05) });
  objs.push({ depth: x0 + 2.05 + y0 + 1.2, svg: cylinder(x0 + 2.05, y0 + 1.2, PH, 0.4, 0.68) });
  const sx = x0 + 3.5, sy = y0 + 0.8, F = fy(sy + 0.13);
  let g = box(sx + 0.95, sy - 0.05, PH, 0.3, 0.3, 0.5) + box(sx, sy, PH + 0.5, 2.2, 0.13, 1.3);
  g += frect(F, sx + 0.1, PH + 0.6, sx + 2.1, PH + 1.7, "unit") + frect(F, sx + 0.1, PH + 1.52, sx + 2.1, PH + 1.7, "solid");
  [0.34, 0.52, 0.42, 0.66, 0.56, 0.78].forEach((h, i) => { g += frect(F, sx + 0.3 + i * 0.29, PH + 0.68, sx + 0.49 + i * 0.29, PH + 0.68 + h * 0.95, "solid"); });
  objs.push({ depth: sx + 1.1 + sy + 0.2, svg: g });
  return { floor: box(x0, y0, 0, w, d, PH, "p"), objs, dbTop: P(x0 + 0.9, y0 + 0.85, PH + 1.05), screenTop: P(sx + 1.1, sy + 0.06, PH + 1.8) };
}

// Staff: three desks, each with a monitor and a keyboard.
function zoneStaff(x0, y0, w = 7.4) {
  const objs = [];
  for (const dx of [0.55, 2.8, 5.05]) {
    const x = x0 + dx, y = y0 + 0.5, z = PH;
    let g = box(x, y, z, 0.07, 0.9, 0.72) + box(x, y, z + 0.3, 1.7, 0.05, 0.42) + box(x + 1.63, y, z, 0.07, 0.9, 0.72) + box(x, y, z + 0.72, 1.7, 0.9, 0.08);
    g += box(x + 0.8, y + 0.13, z + 0.8, 0.1, 0.06, 0.14) + box(x + 0.42, y + 0.12, z + 0.92, 0.86, 0.07, 0.56);
    const F = fy(y + 0.19);
    g += frect(F, x + 0.47, z + 0.97, x + 1.23, z + 1.43, "unit") + pline("thin", [F(x + 0.55, z + 1.33), F(x + 0.95, z + 1.33)]) + pline("thin", [F(x + 0.55, z + 1.21), F(x + 1.12, z + 1.21)]) + pline("thin", [F(x + 0.55, z + 1.09), F(x + 0.86, z + 1.09)]);
    g += box(x + 0.5, y + 0.5, z + 0.8, 0.7, 0.22, 0.03);
    objs.push({ depth: x + y + 1.3, svg: g });
  }
  return { floor: box(x0, y0, 0, w, 2.9, PH, "p"), objs, taps: [0.55, 2.8, 5.05].map((dx) => x0 + dx + 0.85), label: lay(x0 + 0.9, y0 + 2.4, "Staff workstations"), pin: P(x0 + 0.5, y0 + 2.2, PH) };
}

// Guest Wi-Fi: a bench and a low table, and an access point on a pole at the front, where it hides nothing behind it.
function zoneGuest(x0, y0, w = 5.2) {
  const objs = [];
  const bx = x0 + 0.5, by = y0 + 0.3;
  objs.push({ depth: bx + by + 1.2, svg: box(bx, by, PH + 0.4, 1.7, 0.14, 0.5) + box(bx, by, PH, 1.7, 0.62, 0.4) });
  objs.push({ depth: bx + by + 2.2, svg: box(bx + 0.4, by + 0.95, PH, 0.9, 0.45, 0.32) });
  const ax = x0 + 4.3, ay = y0 + 1.5;
  const [cx, cy] = P(ax + 0.1, ay + 0.1, PH + 1.27);
  objs.push({ depth: ax + ay + 0.3, svg: box(ax, ay, PH, 0.2, 0.2, 1.1) + box(ax - 0.25, ay - 0.25, PH + 1.1, 0.7, 0.7, 0.12) + dot([cx, cy], 2.8)
    + `<path class="thin" d="M${cx - 13} ${cy - 16}a18 18 0 0 1 26 0M${cx - 21} ${cy - 25}a30 30 0 0 1 42 0M${cx - 29} ${cy - 34}a42 42 0 0 1 58 0"/>` });
  return { floor: box(x0, y0, 0, w, 2.8, PH, "p"), objs, ap: [ax + 0.1, ay], label: lay(x0 + 0.45, y0 + 2.24, "Office Wi-Fi") + lay(x0 + 0.45, y0 + 2.67, "Guest access", "t2"), pin: P(ax + 0.1, ay + 0.1, PH + 1.3) };
}

// Security: a recorder, a camera above it, and a door with its access terminal, all on the left wall.
function zoneSecurity(x0, y0, w = 5.2) {
  const objs = [], FL = fx(0);
  const rx = x0 + 0.15, ry = y0 + 0.3, F = fx(rx + 0.85);
  objs.push({ depth: rx + ry + 1.1, svg: box(rx, ry, PH, 0.85, 1.4, 0.8) + frect(F, ry + 0.15, PH + 0.26, ry + 0.62, PH + 0.6, "unit") + frect(F, ry + 0.74, PH + 0.26, ry + 1.21, PH + 0.6, "unit") + dot(F(ry + 1.31, PH + 0.43), 2.2) });
  const cyy = y0 + 0.7;
  objs.push({ depth: cyy + 0.7, svg: box(0, cyy + 0.12, 2.22, 0.3, 0.12, 0.12) + box(0.25, cyy, 2.14, 0.62, 0.36, 0.28) + dot(P(0.87, cyy + 0.18, 2.28), 3) });
  const dy = y0 + 1.75;
  // The door and terminal are flat on the wall, so they are drawn with the floor layer, before any object.
  const wall = frect(FL, dy, PH, dy + 1.1, 2.1, "unit") + dot(FL(dy + 0.2, 1.05), 2.2, "tap")
    + pline("cab", [P(0, cyy + 0.18, 0.94), P(0, cyy + 0.18, 2.2)]);
  objs.push({ depth: dy - 0.2, svg: box(0, dy - 0.48, 1.15, 0.12, 0.3, 0.52) + dot(P(0.12, dy - 0.33, 1.5), 2.2) });
  const label = lay(x0 + 1.75, y0 + 0.78, "CCTV cameras") + lay(x0 + 1.75, y0 + 1.2, "Recorder", "t2") + lay(x0 + 1.75, y0 + 1.95, "Access control") + lay(x0 + 1.75, y0 + 2.37, "Biometric attendance", "t2");
  return { floor: box(x0, y0, 0, w, 2.8, PH, "p") + wall, objs, rec: [rx + 0.85, ry + 0.7], label, pin: P(rx + 0.42, ry + 0.7, PH + 0.8) };
}

// The flat app window and phone that float above the software island.
function appCard(cx, cy, w = 250, h = 158) {
  let g = `<rect class="slab" x="${cx + 9}" y="${cy + 9}" width="${w}" height="${h}" rx="9"/>`;
  g += `<g transform="translate(${cx} ${cy})"><rect class="card" width="${w}" height="${h}" rx="9"/>`
    + `<path class="solid" d="M0 26V9a9 9 0 0 1 9-9h${w - 18}a9 9 0 0 1 9 9v17z"/><path d="M0 26h${w}"/><rect width="${w}" height="${h}" rx="9"/>`
    + `<circle class="ondark" cx="15" cy="13" r="3.2"/><circle class="ondark" cx="27" cy="13" r="3.2"/><circle class="ondark" cx="39" cy="13" r="3.2"/>`
    + `<path class="thin" d="M58 26v${h - 26}"/>`
    + [40, 54, 68, 82, 96].map((y, i) => `<rect class="${i === 0 ? "solid" : "soft"}" x="11" y="${y}" width="${[36, 30, 34, 26, 32][i]}" height="7" rx="3.5"/>`).join("")
    + [70, 130, 190].map((x) => `<rect class="soft" x="${x}" y="38" width="50" height="34" rx="5"/><rect class="solid" x="${x + 8}" y="46" width="20" height="6" rx="3"/><rect class="ondark" x="${x + 8}" y="58" width="32" height="6" rx="3"/>`).join("")
    + [22, 34, 28, 46, 38, 56, 50, 64].map((bh, i) => `<rect class="solid" x="${72 + i * 21}" y="${146 - bh}" width="13" height="${bh}" rx="2"/>`).join("")
    + `<path class="thin" d="M68 146h172"/></g>`;
  g += `<g transform="translate(${cx + w - 30} ${cy + 76})"><rect class="slab" x="6" y="6" width="46" height="86" rx="8"/><rect class="card" width="46" height="86" rx="8"/><rect class="solid" x="6" y="9" width="34" height="14" rx="3"/>`
    + `<path class="thin" d="M8 33h30M8 42h22M8 51h26"/><rect class="solid" x="9" y="62" width="28" height="11" rx="5.5"/><path class="thin" d="M18 80h10"/></g>`;
  return g;
}
const CLOUD = "M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z";

// ── The hero scene ──
export function isoScene() {
  OX = 440; OY = 168;
  const W = 12, D = 10, H = 2.6, TH = 0.25, BH = 0.78;
  let s = "";

  // IT Support is the base the whole office stands on.
  {
    const a = P(0.55, D, -0.56), b = P(W, D - 0.55, -0.56), p3 = P(W, 4.15, -0.4);
    s += part(IT, poly("b1", [P(-TH, D, 0), P(W, D, 0), P(W, D, -BH), P(-TH, D, -BH)]) + poly("b2", [P(W, -TH, 0), P(W, D, 0), P(W, D, -BH), P(W, -TH, -BH)])
      + `<text class="basetext" transform="matrix(.866 .5 0 1 ${a[0]} ${a[1]})">Your office</text>`
      + `<text class="basetext" transform="matrix(.866 -.5 0 1 ${b[0]} ${b[1]})">IT Support &amp; Consultancy</text>` + pin(IT, p3[0], p3[1], "inv"));
  }
  // Walls and floor: neutral, they belong to no service.
  s += poly("wb", [P(0, 0, H), P(W, 0, H), P(W, 0, 0), P(0, 0, 0)]) + poly("wa", [P(0, 0, H), P(0, D, H), P(0, D, 0), P(0, 0, 0)]);
  s += poly("nt", [P(-TH, -TH, H), P(W, -TH, H), P(W, 0, H), P(0, 0, H), P(0, D, H), P(-TH, D, H)]);
  s += poly("nr", [P(W, -TH, H), P(W, 0, H), P(W, 0, 0), P(W, -TH, 0)]) + poly("nl", [P(-TH, D, H), P(0, D, H), P(0, D, 0), P(-TH, D, 0)]);
  s += poly("floor", [P(0, 0), P(W, 0), P(W, D), P(0, D)]);

  const core = zoneCore(0.35, 0.15), soft = zoneSoftware(4.2, 0.15), serv = zoneServers(0.15, 3.45), staff = zoneStaff(4.2, 3.45), sec = zoneSecurity(0.15, 7.05), guest = zoneGuest(6.4, 7.05);
  const zones = [[NET, core], [SW, soft], [SRV, serv], [NET, staff], [SEC, sec], [NET, guest]];

  // Cables run in the aisles between islands, each in its segment's colour.
  s += part(SRV, cable([[1.75, 1.35], [1.75, 4.2], [1.4, 4.2]], 2.0));
  s += part(SW, cable([[2.55, 0.9], [4.66, 0.9]], 1.3, 0.3));
  s += part(NET, cable([[2.55, 1.15], [3.7, 1.15], [3.7, 3.0], [staff.taps[2], 3.0], [staff.taps[2], 3.95]], 3.2)
    + cable([[staff.taps[0], 3.0], [staff.taps[0], 3.95]]) + cable([[staff.taps[1], 3.0], [staff.taps[1], 3.95]])
    + cable([[3.9, 3.0], [3.9, 6.7], [guest.ap[0], 6.7], [guest.ap[0], guest.ap[1]]], 3.4, 0.6));
  s += part(SEC, cable([[2.1, 1.35], [2.1, 2.9], [3.4, 2.9], [3.4, 6.7], [1.6, 6.7], [1.6, sec.rec[1]], [sec.rec[0], sec.rec[1]]], 3.6, 0.9));

  for (const [slug, z] of zones) s += part(slug, z.floor) + (z.label ? part(slug, z.label, "lbl") : "");
  const objs = zones.flatMap(([slug, z]) => z.objs.map((o) => ({ depth: o.depth, svg: part(slug, o.svg) })));
  objs.sort((p, q) => p.depth - q.depth);
  s += objs.map((o) => o.svg).join("");

  // Outside the office: the cloud, linked to the servers, and the internet line into the router.
  const st = serv.top, ct = core.top;
  s += part(SRV, `<path class="cab dash" d="M${st[0]} ${st[1] - 4}V96"/><g transform="translate(244 22) scale(1.5)"><path class="ft" d="${CLOUD}"/></g>` + pin(SRV, 362, 30) + pin(SRV, st[0] + 30, st[1] + 6));
  s += part(NET, `<path class="cab dash" d="M368 70L${ct[0]} ${ct[1] - 2}"/>` + pin(NET, ct[0], ct[1] - 4));

  // Software floats above its island: the largest, warmest thing in the picture.
  {
    const cx = 664, cy = 16, d1 = soft.dbTop, d2 = soft.screenTop;
    const p1 = `M${d1[0]} ${d1[1] - 6}V128Q${d1[0]} 120 ${d1[0] + 8} 120H${cx}`, p2 = `M${d2[0]} ${d2[1]}V${cy + 158}`;
    s += part(SW, `<path class="cab" d="${p1}"/>${flow(p1, 1.8)}<path class="cab" d="${p2}"/>${flow(p2, 1.2, 0.4)}` + appCard(cx, cy) + pin(SW, cx, cy));
  }

  // Labels sit on top of everything; on small screens they are hidden and the numbered pins carry the key.
  const L = (slug, inner) => part(slug, inner, "lbl");
  s += L(SRV, T(232, 44, "Cloud", "t1", "end") + T(232, 62, "AWS, Azure, Google Cloud", "t2", "end")
    + `<path class="lead thin" d="M238 110H${st[0] - 44}V${st[1] - 14}"/>` + T(232, 104, "Servers", "t1", "end") + T(232, 122, "Windows, Linux, VMware", "t2", "end"));
  s += L(NET, T(386, 62, "Internet", "t2") + `<path class="lead thin" d="M${ct[0]} 50V${ct[1] - 18}"/>` + T(408, 24, "Router, firewall, core switch", "t1") + T(408, 42, "MikroTik, Fortinet, Cisco", "t2"));
  s += L(SW, T(934, 208, "Business software", "t1", "end") + T(934, 226, "SQL Server, MySQL, MongoDB", "t2", "end"));
  s += part(SEC, pin(SEC, sec.pin[0], sec.pin[1]));
  // Extra pins for small screens, where the labels are hidden.
  s += part(NET, pin(NET, staff.pin[0], staff.pin[1]) + pin(NET, guest.pin[0], guest.pin[1]), "monly");

  return `<svg class="dwg iso x3" viewBox="0 0 944 660" role="group" aria-label="3D-style drawing of a typical office. Each coloured zone links to the Infyta service that builds it.">${s}</svg>`;
}

// ── A service page's drawing: that service's island on its own, larger, with the labels the page has today ──
export function isoSoftwareDetail() {
  OX = 150; OY = 124;
  const W = 10.2, D = 4.25, BH = 0.4;
  let s = poly("b1", [P(0, D, 0), P(W, D, 0), P(W, D, -BH), P(0, D, -BH)]) + poly("b2", [P(W, 0, 0), P(W, D, 0), P(W, D, -BH), P(W, 0, -BH)]);
  s += poly("floor", [P(0, 0), P(W, 0), P(W, D), P(0, D)]);
  const soft = zoneSoftware(2.6, 0.45, 7.2, 2.8);
  // "Existing systems" belong to the client, not to a service: neutral, and joined by a dashed link.
  const F = fx(1.2);
  s += box(0.25, 0.9, 0, 0.95, 0.95, 1.5, "n") + [0.2, 0.62, 1.04].map((z) => frect(F, 1.0, z, 1.75, z + 0.3, "unit") + dot(F(1.12, z + 0.15), 2.1)).join("");
  s += part(SW, pline("cab dash", [P(1.2, 1.3), P(3.06, 1.3)]));
  s += part(SW, soft.floor) + part(SW, lay(3.0, 2.6, "Database") + lay(3.0, 3.0, "SQL Server, MySQL, MongoDB", "t2"), "lbl");
  s += `<g class="lbl">${lay(0.3, 3.92, "Existing systems")}</g>`;
  s += soft.objs.sort((p, q) => p.depth - q.depth).map((o) => part(SW, o.svg)).join("");
  const cx = 300, cy = 12, d1 = soft.dbTop, d2 = soft.screenTop;
  const p1 = `M${d1[0]} ${d1[1] - 6}V118Q${d1[0]} 110 ${d1[0] + 8} 110H${cx}`, p2 = `M${d2[0]} ${d2[1]}V${cy + 158}`;
  s += part(SW, `<path class="cab" d="${p1}"/>${flow(p1, 1.6)}<path class="cab" d="${p2}"/>${flow(p2, 1.1, 0.4)}` + appCard(cx, cy));
  s += part(SW, T(292, 34, "Web application", "t1", "end") + T(572, 202, "Mobile app", "t1", "end"), "lbl");
  return `<svg class="dwg iso iso--detail x3" viewBox="0 0 590 450" role="img" aria-label="Drawing: a web application and a mobile app sharing one database, linked to existing systems.">${s}</svg>`;
}
