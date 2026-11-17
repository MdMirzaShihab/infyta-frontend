// Builds the colour mockup from the real exported site (out/): the home page and one service page, each as one
// standalone file, with a bar that switches between today's look and three colour levels, in both themes.
// Usage (from the repository root, after `npm run build`):
//   node docs/superpowers/specs/2026-11-17-colour-levels-assets/build.mjs "$PWD" <out dir> [home name] [service name] [link prefix]
// The two files link to each other as <link prefix><name>.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isoScene, isoSoftwareDetail, SW, NET, IT, SEC, SRV } from "./iso.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const [root, outDir, homeName = "mockup-colour-levels.html", serviceName = "mockup-service-page.html", prefix = ""] = process.argv.slice(2);
if (!root || !outDir) throw new Error("usage: build.mjs <repo root> <out dir> [home name] [service name] [link prefix]");
const out = path.join(root, "out");
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
const SLUGS = [SW, NET, IT, SEC, SRV];

// The page is readable without scripts, so drop them all; then inline the stylesheet, fonts and portrait.
function standalone(file, title) {
  let html = fs.readFileSync(path.join(out, file), "utf8");
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link rel="preload"[^>]*>/g, "").replace(/<link rel="(?:icon|apple-touch-icon|canonical)"[^>]*>/g, "");
  html = html.replace(/<link rel="stylesheet" href="\/(_next\/static\/chunks\/[^"]+\.css)"[^>]*>/g, (_, href) => {
    const cssFile = path.join(out, href);
    const css = fs.readFileSync(cssFile, "utf8").replace(/url\((\.\.\/media\/[^)]+\.woff2)\)/g, (_m, rel) => `url(${dataUri(path.resolve(path.dirname(cssFile), rel), "font/woff2")})`);
    return `<style>${css}</style>`;
  });
  html = html.replace(/<img src="(\/images\/team\/[^"]+\.webp)" srcSet="[^"]*" sizes="[^"]*"/g, (_, src) => `<img src="${dataUri(path.join(out, src), "image/webp")}"`);
  return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
}

// ── Home ──
function home() {
  let html = standalone("index.html", "Infyta colour levels: home (mockup)");
  // One word of the headline can take a colour.
  html = html.replace("<h1>Infyta – Limitless Tech Solutions</h1>", '<h1>Infyta – <span class="hl">Limitless</span> Tech Solutions</h1>');

  // Level 2 additions to the flat drawing: a tint per zone, moving data, and software redrawn large.
  const zone = (slug, x, y, w, h) => `<rect class="zone" data-svc="${slug}" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/>`;
  const zones = `<g class="x2">${[
    zone(SRV, 22, 26, 150, 134), zone(NET, 240, 42, 652, 96), zone(NET, 240, 190, 122, 118), zone(NET, 412, 190, 118, 132),
    zone(SEC, 598, 190, 112, 162), zone(SEC, 722, 190, 128, 138), zone(SRV, 858, 190, 126, 156), zone(SW, 1010, 46, 164, 300),
  ].join("")}</g>`;
  const flow = (slug, d, dur, begin = 0) => `<circle class="flow" data-svc="${slug}" r="3.6" opacity="0"><set attributeName="opacity" to="1" begin="${2.8 + begin}s" fill="freeze"/><animateMotion dur="${dur}s" begin="${2.8 + begin}s" repeatCount="indefinite" path="${d}"/></circle>`;
  const flows = `<g class="x2">${[
    flow(NET, "M132 76H252", 1.6), flow(NET, "M332 76H404", 1.1, 0.3), flow(NET, "M484 76H560", 1.1, 0.6),
    flow(NET, "M604 100V142Q604 150 596 150H308Q300 150 300 158V236", 2.6), flow(NET, "M628 100V164Q628 172 620 172H478Q470 172 470 180V241", 2.2, 0.5),
    flow(SEC, "M652 236V100", 1.8, 0.2), flow(SEC, "M676 100V164Q676 172 684 172H782Q790 172 790 180V236", 2.1, 0.9),
    flow(SRV, "M700 100V142Q700 150 708 150H912Q920 150 920 158V236", 2.4, 0.4), flow(SW, "M964 271H1072", 1.4, 0.2), flow(SW, "M1094 250V174", 1.2, 0.8),
  ].join("")}</g>`;
  const d = (s) => ` style="--d:${s}s"`;
  const software = `<a class="svc x2" data-svc="${SW}" aria-label="Software Development" href="/services/${SW}">`
    + `<rect class="hit" x="1010" y="46" width="164" height="300"/>`
    + `<path class="wire quick" pathLength="1"${d(1.9)} d="M964 271H1072"/><path class="wire quick" pathLength="1"${d(2.1)} d="M1094 250V174"/>`
    + `<g class="rise"${d(2.0)} transform="translate(1022 70)"><rect class="screen" width="144" height="104" rx="6"/>`
    + `<path class="solid" d="M0 17V6a6 6 0 0 1 6-6h132a6 6 0 0 1 6 6v11z"/><path d="M0 17h144"/><rect width="144" height="104" rx="6"/>`
    + `<circle class="ondark" cx="10" cy="8.5" r="2.1"/><circle class="ondark" cx="18" cy="8.5" r="2.1"/><circle class="ondark" cx="26" cy="8.5" r="2.1"/>`
    + `<path class="thin" d="M36 17v87"/>`
    + [26, 36, 46, 56].map((y, i) => `<rect class="${i ? "soft" : "solid"}" x="7" y="${y}" width="${[22, 18, 21, 15][i]}" height="5" rx="2.5"/>`).join("")
    + [42, 76, 110].map((x) => `<rect class="soft" x="${x}" y="24" width="28" height="20" rx="3"/><rect class="solid" x="${x + 5}" y="29" width="11" height="4" rx="2"/><rect class="ondark" x="${x + 5}" y="36" width="18" height="4" rx="2"/>`).join("")
    + [14, 22, 18, 30, 24, 36, 32].map((h, i) => `<rect class="solid" x="${44 + i * 13.5}" y="${95 - h}" width="8.5" height="${h}" rx="1.5"/>`).join("")
    + `<path class="thin" d="M41 95h97"/></g>`
    + `<g class="rise"${d(2.15)} transform="translate(1134 124)"><rect class="screen" width="36" height="64" rx="6"/><rect class="solid" x="5" y="7" width="26" height="10" rx="2.5"/>`
    + `<path class="thin" d="M6 25h23M6 32h17M6 39h20"/><rect class="solid" x="7" y="46" width="22" height="8" rx="4"/><path class="thin" d="M14 59h8"/></g>`
    + `<use href="#d-db" class="rise"${d(2.05)} transform="translate(1072 250) scale(1.25)"/>`
    + `<g class="rise"${d(2.2)}><text x="1094" y="318" class="t1" text-anchor="middle">Business software</text><text x="1094" y="333" class="t2" text-anchor="middle">SQL Server, MySQL, MongoDB</text></g>`
    + `<g class="bub rise"${d(2.45)} transform="translate(1166 70)"><circle r="11.5"/><text text-anchor="middle" dy="4.4">1</text></g></a>`;

  const wideOpen = html.indexOf('<svg class="dwg dwg--wide"');
  const wideTagEnd = html.indexOf(">", wideOpen) + 1;
  const wideClose = html.indexOf("</svg>", wideOpen);
  if (wideOpen < 0 || wideClose < 0) throw new Error("hero drawing not found in out/index.html");
  const wide = html.slice(wideTagEnd, wideClose);
  const marked = wide.replace(`<a class="svc" data-svc="${SW}"`, `<a class="svc x1" data-svc="${SW}"`);
  if (marked === wide) throw new Error("software part not found in the hero drawing");
  html = html.slice(0, wideTagEnd) + zones + marked + software + flows + html.slice(wideClose);

  // Level 3: the 3D-style hero drawing sits beside the flat ones and is shown instead of them.
  const tallOpen = html.indexOf('<svg class="dwg dwg--tall"');
  const tallClose = html.indexOf("</svg>", tallOpen) + "</svg>".length;
  return html.slice(0, tallClose) + isoScene() + html.slice(tallClose);
}

// ── One service page: Software Development ──
function service() {
  let html = standalone(`services/${SW}.html`, "Infyta colour levels: service page (mockup)");
  // The page takes its service's colour as its accent.
  html = html.replace('<main id="main">', `<main id="main" data-svc="${SW}">`);
  const open = html.indexOf('<svg class="dwg dwg--detail"');
  const close = html.indexOf("</svg>", open) + "</svg>".length;
  if (open < 0) throw new Error("detail drawing not found in the service page");
  return html.slice(0, close) + isoSoftwareDetail() + html.slice(close);
}

// ── Styles, the bar and its script, shared by both pages ──
const NOTES = {
  home: {
    0: "Today’s site, as it is live now.",
    1: "Level 1, colour pass. Same drawings. Amber main buttons, a navy title block, filled numbers and tags, tinted sections, a teal call-to-action band, flat colour slabs behind the hero, the portrait and the contact card.",
    2: "Level 2, coloured drawings. Level 1, plus: every service has one colour (in the drawing, its number and its row), devices are filled in, cables are coloured and carry moving data, and Software is redrawn large in the one warm colour.",
    3: "Level 3, illustrated (version 2). Each service is one colour and sits on its own island; IT Support is the navy base under the whole office. Hover any part, number or label, or a row in the list below: the whole service lights and the rest dims.",
  },
  service: {
    0: "Today’s Software Development page, as it is live now.",
    1: "Level 1, colour pass, on a service page.",
    2: "Level 2. The page takes its service’s colour (amber for Software) for its accents, and the drawing is filled in.",
    3: "Level 3. The drawing is this service’s island from the home page, shown larger, with the labels the page has today.",
  },
};
// Group highlight for the 3D drawing: hovering any piece, pin or label of a service (or its row in the list) keeps
// that whole service bright and dims the other four. #h=<slug> holds one service lit, for screenshots.
const groupCss = SLUGS.map((s) =>
  `html.l3 .iso:has(.svc[data-svc="${s}"]:is(:hover,:focus-visible)) .svc:not([data-svc="${s}"]){opacity:.24}`
  + `html.l3 main:has(.key__row[data-svc="${s}"]:is(:hover,:focus-visible)) .iso .svc[data-svc="${s}"]{opacity:1;color:var(--fg)}`
  + `html.l3[data-hl="${s}"] .iso .svc:not([data-svc="${s}"]){opacity:.24}`).join("")
  + `html.l3 main:has(.key__row:is(:hover,:focus-visible)) .iso .svc{opacity:.24}`;

function finish(html, page) {
  const other = page === "home" ? serviceName : homeName;
  const bar = `<div class="lvbar" role="group" aria-label="Mockup controls"><div class="lvbar__row"><span class="lvbar__t">Colour level</span>`
    + `<button type="button" data-level="0" data-choice="${page}-level-0-today">Today</button><button type="button" data-level="1" data-choice="${page}-level-1-colour-pass">1 Colour pass</button>`
    + `<button type="button" data-level="2" data-choice="${page}-level-2-coloured-drawings">2 Coloured drawings</button><button type="button" data-level="3" data-choice="${page}-level-3-illustrated">3 Illustrated</button>`
    + `<span class="lvbar__sep"></span><span class="lvbar__t">Theme</span><button type="button" data-th="light" data-choice="${page}-theme-paper">Paper</button><button type="button" data-th="dark" data-choice="${page}-theme-blueprint">Blueprint</button>`
    + `<span class="lvbar__sep"></span><span class="lvbar__t">Page</span><button type="button" aria-pressed="${page === "home"}" data-go="${page === "home" ? "" : prefix + other}" data-choice="page-home">Home</button>`
    + `<button type="button" aria-pressed="${page === "service"}" data-go="${page === "service" ? "" : prefix + other}" data-choice="page-service">Service page</button></div>`
    + `<p class="lvbar__note" id="lvnote"></p></div>`;
  const script = `<script>(function(){
var NOTES=${JSON.stringify(NOTES[page])},root=document.documentElement,q=new URLSearchParams(location.hash.slice(1));
var level=+(q.get("l")||3),theme=q.get("t")||"light";if(q.get("h"))root.setAttribute("data-hl",q.get("h"));
function apply(){
  for(var i=1;i<=3;i++)root.classList.toggle("l"+i,level>=i);
  root.setAttribute("data-theme",theme);
  document.querySelectorAll(".lvbar [data-level]").forEach(function(b){b.setAttribute("aria-pressed",String(+b.dataset.level===level))});
  document.querySelectorAll(".lvbar [data-th]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.th===theme))});
  document.querySelectorAll("[data-set-theme]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.setTheme===theme))});
  document.getElementById("lvnote").textContent=NOTES[level];
  try{history.replaceState(null,"","#l="+level+"&t="+theme)}catch(e){}
}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-level],[data-th],[data-set-theme],[data-theme-toggle],[data-go]");
  if(b){
    if(b.dataset.go!==undefined){if(b.dataset.go)setTimeout(function(){location.href=b.dataset.go+"#l="+level+"&t="+theme},60);return}
    if(b.dataset.level!==undefined)level=+b.dataset.level;
    else if(b.dataset.th)theme=b.dataset.th;
    else if(b.dataset.setTheme)theme=b.dataset.setTheme;
    else theme=theme==="dark"?"light":"dark";
    apply();return;
  }
  var a=e.target.closest("a[href]");
  if(a&&!/^(#|tel:|mailto:)/.test(a.getAttribute("href")))e.preventDefault();
});
// The real page works out "open now" in the browser. The mockup has none of the site's scripts, so show the open state as a sample.
document.querySelectorAll("[data-open-status]").forEach(function(el){
  el.classList.remove("is-unknown");
  el.lastElementChild.textContent=el.closest(".hours__state")?"Open now. Closes at 6 PM.":"Open now, until 6 PM";
});
var tue=document.querySelector(".week div:nth-child(4)");if(tue)tue.className="is-today";
document.addEventListener("keydown",function(e){if(/^[0-3]$/.test(e.key)&&!e.metaKey&&!e.ctrlKey){level=+e.key;apply()}});
apply();
})();</script>`;
  html = html.replace("</head>", `<style>${fs.readFileSync(path.join(here, "levels.css"), "utf8")}${groupCss}</style></head>`);
  return html.replace("</body>", `${bar}${script}</body>`);
}

fs.mkdirSync(outDir, { recursive: true });
for (const [name, html] of [[homeName, finish(home(), "home")], [serviceName, finish(service(), "service")]]) {
  fs.writeFileSync(path.join(outDir, name), html);
  console.log(`wrote ${path.join(outDir, name)} (${(html.length / 1024).toFixed(0)} KB)`);
}
