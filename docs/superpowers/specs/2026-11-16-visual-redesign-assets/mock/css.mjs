export const css = `
/* Layout: one drawing sheet as the cover, then left-aligned bands that read as its key, schedule and title block.
   Two themes of one idea: Paper (light) is a blueline print, navy ink on paper; Blueprint (dark) is white line on navy. */
:root{
  /* Brand constants */
  --paper:#F4F6FA; --white:#FFFFFF; --ink:#1F2C62; --ink-deep:#172050; --ink-lift:#27367B; --signal:#3AC1C2; --signal-deep:#0B7378; --cyan:#14B9DA; --amber:#E9A23B;
  --gut:clamp(20px,4vw,48px);
  --w-display:116%; --w-head:110%; --w-text:100%; --w-label:80%;
  /* Theme tokens: Paper (light) */
  --bg:var(--paper);--fg:var(--ink);--fg2:rgba(31,44,98,.76);--rule:rgba(31,44,98,.17);--body:var(--white);--sheet:var(--white);--panel:var(--white);--accent:var(--signal-deep);--btn-bg:var(--ink);--btn-fg:var(--white);--hatch:rgba(31,44,98,.07);--inv-bg:var(--ink);--inv-panel:#243372;--logo-rev:none;--logo-ink:block;
}
/* Theme tokens: Blueprint (dark). Same values twice so an explicit choice wins over the device setting both ways. */
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:var(--ink);--fg:var(--white);--fg2:rgba(255,255,255,.78);--rule:rgba(255,255,255,.22);--body:var(--ink);--sheet:var(--ink);--panel:var(--ink-lift);--accent:var(--signal);--btn-bg:var(--white);--btn-fg:var(--ink);--hatch:rgba(255,255,255,.08);--inv-bg:var(--ink-deep);--inv-panel:var(--ink);--logo-rev:block;--logo-ink:none;color-scheme:dark}}
:root[data-theme="dark"]{--bg:var(--ink);--fg:var(--white);--fg2:rgba(255,255,255,.78);--rule:rgba(255,255,255,.22);--body:var(--ink);--sheet:var(--ink);--panel:var(--ink-lift);--accent:var(--signal);--btn-bg:var(--white);--btn-fg:var(--ink);--hatch:rgba(255,255,255,.08);--inv-bg:var(--ink-deep);--inv-panel:var(--ink);--logo-rev:block;--logo-ink:none;color-scheme:dark}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:10;background:var(--bg)}
body{margin:0;font-family:Archivo,system-ui,sans-serif;font-size:1.0625rem;line-height:1.6;font-stretch:var(--w-text);background:var(--bg);color:var(--fg);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img,svg{display:block;max-width:100%}
a{color:inherit;text-underline-offset:.2em;text-decoration-thickness:1px}
p{margin:0;text-wrap:pretty}
h1,h2,h3,h4{margin:0;text-wrap:balance}
ul,ol{margin:0;padding:0;list-style:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
:focus-visible{outline:2px solid var(--accent,var(--signal-deep));outline-offset:3px;border-radius:3px}
.skip{position:absolute;left:12px;top:-60px;background:var(--ink);color:#fff;padding:10px 14px;border-radius:4px;z-index:100}
.skip:focus{top:12px}

/* Inverse bands (advisor, approach, footer) are always navy with white line: brand navy on Paper, a deeper navy on Blueprint. */
.blueprint,.inverse{--bg:var(--inv-bg);--fg:var(--white);--fg2:rgba(255,255,255,.78);--rule:rgba(255,255,255,.22);--body:var(--inv-bg);--sheet:var(--inv-bg);--panel:var(--inv-panel);--accent:var(--signal);--btn-bg:var(--white);--btn-fg:var(--ink);--hatch:rgba(255,255,255,.08);--logo-rev:block;--logo-ink:none}
.paper,.blueprint,.inverse,.cover{background:var(--bg);color:var(--fg)}
.wrap{max-width:1296px;margin-inline:auto;padding-left:max(var(--gut),env(safe-area-inset-left,0px));padding-right:max(var(--gut),env(safe-area-inset-right,0px))}
.band{padding-block:clamp(64px,7.5vw,112px)}

/* Type */
h1{font-stretch:var(--w-display);font-weight:700;font-size:clamp(2.35rem,5.1vw,4.25rem);line-height:.98;letter-spacing:-.026em}
h2{font-stretch:var(--w-head);font-weight:680;font-size:clamp(1.8rem,3.1vw,2.7rem);line-height:1.06;letter-spacing:-.02em}
h3{font-stretch:106%;font-weight:640;font-size:1.3rem;line-height:1.2;letter-spacing:-.01em}
.lede{font-size:clamp(1.0625rem,1.3vw,1.1875rem);line-height:1.55;color:var(--fg2);max-width:62ch}
.small{font-size:.9375rem;color:var(--fg2)}
.label{font-stretch:var(--w-label);font-weight:540;font-size:.9rem;letter-spacing:.012em;color:var(--fg2)}
.tag{display:inline-block;font-stretch:78%;font-weight:620;font-size:.8125rem;line-height:1;letter-spacing:.02em;padding:5px 7px 4px;border:1px solid currentColor;border-radius:3px;background:var(--body);white-space:nowrap}
.tags{display:flex;flex-wrap:wrap;gap:6px}

/* Buttons: a port with a link light */
.btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 20px 0 16px;border-radius:5px;background:var(--btn-bg);color:var(--btn-fg);font-stretch:104%;font-weight:620;font-size:1rem;text-decoration:none;border:1.5px solid var(--btn-bg);white-space:nowrap;transition:background-color .15s,color .15s}
.btn::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;opacity:.38;transition:all .15s}
.btn:hover::before,.btn:focus-visible::before{background:var(--signal);opacity:1;box-shadow:0 0 0 4px rgba(58,193,194,.28)}
.btn--ghost{background:transparent;color:var(--fg);border-color:var(--fg);padding-left:20px}
.btn--ghost::before{display:none}
.btn--sm{min-height:40px;padding:0 15px 0 12px;font-size:.9375rem}
.btn svg{width:18px;height:18px;margin-left:-2px}
.btn--icon::before{display:none}
.textlink{font-weight:600;text-decoration:underline}

/* Nav */
.nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:40;background:var(--bg);color:var(--fg);border-bottom:1px solid var(--rule);transition:background-color .2s,color .2s}
.nav__in{display:flex;align-items:center;gap:28px;min-height:76px}
.logo{display:block;flex:none}.logo svg{height:52px;width:auto}
.logo .l-rev{display:var(--logo-rev)}.logo .l-ink{display:var(--logo-ink)}
.nav__in>nav{margin-left:auto}
.nav__links{display:flex;gap:4px}
.nav__links a,.nav__links button{display:block;padding:10px 12px;font-weight:540;font-size:.9875rem;text-decoration:none;border-radius:4px}
.nav__links a:hover,.nav__links button:hover{text-decoration:underline;text-decoration-thickness:1.5px}
.nav__links [aria-current="page"]{font-weight:700}
.has-menu{position:relative}
.menu{position:absolute;left:-8px;top:100%;min-width:268px;padding:8px;background:var(--panel);border:1px solid var(--rule);border-radius:8px;box-shadow:0 18px 40px -18px rgba(15,22,56,.45);opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .14s,transform .14s,visibility .14s}
.has-menu:hover .menu,.has-menu:focus-within .menu{opacity:1;visibility:visible;transform:none}
.menu a{padding:9px 12px!important}
.menu a:hover{background:rgba(58,193,194,.16);text-decoration:none!important}
.nav__meta{display:flex;align-items:center;gap:20px;padding-left:22px;border-left:1px solid var(--rule)}
.status{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.dot{width:8px;height:8px;border-radius:50%;background:var(--signal);box-shadow:0 0 0 3px rgba(58,193,194,.25);flex:none}
.status.is-closed .dot{background:var(--amber);box-shadow:0 0 0 3px rgba(233,162,59,.25)}
.tel{font-weight:640;font-variant-numeric:tabular-nums;text-decoration:none;white-space:nowrap}
.tel:hover{text-decoration:underline}
.themebtn{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:6px;border:1.5px solid var(--rule);flex:none}
.themebtn:hover{border-color:var(--fg)}
.themebtn svg{width:19px;height:19px}
.themeseg{display:inline-flex;align-items:center;gap:10px}
.themeseg span{display:inline-flex;border:1px solid var(--rule);border-radius:6px;overflow:hidden}
.themeseg button{padding:6px 12px;font-size:.875rem;font-weight:560;color:var(--fg2)}
.themeseg button[aria-pressed="true"]{background:var(--fg);color:var(--bg)}
.nav__burger,.nav__call{display:none}
.num{display:inline-grid;place-items:center;width:24px;height:24px;border:1.5px solid currentColor;border-radius:50%;font-size:.78rem;font-weight:700;line-height:1;flex:none;font-variant-numeric:tabular-nums}


/* Hero */
html[data-hero="sheet"] section[data-hero="stack"],html[data-hero="stack"] section[data-hero="sheet"]{display:none}
/* Two-class selectors so the later .hero and .sheet rules cannot undo this spacing. */
.hero.hero--sheet{padding-block:clamp(14px,1.8vw,22px) clamp(44px,5vw,72px)}
.sheet.sheet--hero{margin:0;display:flex;flex-direction:column}
.sheet--hero .sheet__fig{margin:0;order:-1;border-bottom:1.5px solid var(--fg)}
.sheet--hero .titleblock{border-top:1px solid var(--rule)}
.tb{display:grid;grid-template-columns:minmax(0,7.5fr) minmax(0,4.5fr)}
.tb>div{padding:clamp(18px,2vw,28px) clamp(16px,2.2vw,30px);min-width:0}
.tb__lede{border-left:1px solid var(--rule);display:flex;align-items:center}
.tb h1{font-size:clamp(1.95rem,3.5vw,3.05rem);line-height:1;letter-spacing:-.024em}
.tb .hero__cta{margin-top:clamp(16px,1.7vw,24px)}
.tb .lede{font-size:1.0625rem}
.hero{padding-block:clamp(26px,3.4vw,46px) clamp(44px,5vw,72px)}
.hero__row{display:flex;gap:40px;align-items:flex-end;justify-content:space-between;margin-top:clamp(18px,2vw,26px)}
.hero__cta{display:flex;gap:12px;flex-wrap:wrap}
.sheet{margin:clamp(26px,2.6vw,36px) 0 0;border:1.5px solid var(--fg);border-radius:6px;background:var(--sheet);overflow:hidden}
.sheet__dwg{padding:clamp(10px,1.6vw,22px) clamp(10px,1.6vw,22px) clamp(6px,1vw,12px)}
.titleblock{display:grid;grid-template-columns:1.25fr 1.1fr .8fr 1.6fr;border-top:1.5px solid var(--fg)}
.titleblock div{padding:10px 16px 11px;border-left:1px solid var(--rule);min-width:0}
.titleblock div:first-child{border-left:0}
.titleblock dt{font-stretch:var(--w-label);font-size:.78rem;font-weight:500;color:var(--fg2);line-height:1.2}
.titleblock dd{margin:2px 0 0;font-weight:600;font-size:.95rem;line-height:1.3}
dl{margin:0}

/* Drawings */
.dwg{width:100%;height:auto;overflow:visible;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;color:var(--fg)}
*{vector-effect:non-scaling-stroke}
/* Symbol parts are cloned into <use> shadow trees, where selectors cannot reach outside the symbol: keep these ancestor-free. */
.body{fill:var(--body)}
.thin{stroke-width:1.1}
.port rect{stroke-width:1}
.port .lit,.led{fill:var(--signal)}
.led{stroke-width:1}
.dots circle,.tap{fill:currentColor;stroke:none}
.dwg .wan,.dwg .boundary{stroke-dasharray:5 5}
.dwg .boundary{stroke-width:1.2}
.dwg .hit{stroke:none;fill:transparent;pointer-events:all}
.dwg .knock{fill:var(--sheet);stroke:none}
.dwg text{stroke:none;fill:currentColor;font-family:inherit}
.dwg .t1{font-size:13.5px;font-stretch:86%;font-weight:640;letter-spacing:.004em}
.dwg .t2{font-size:12.5px;font-stretch:82%;font-weight:440;opacity:.8}
.dwg .flag rect{fill:var(--body);stroke-width:1}
.dwg .flag text{font-size:11px;font-stretch:78%;font-weight:640;letter-spacing:.02em}
.dwg .bub circle{fill:var(--body)}
.dwg .bub text{font-size:12.5px;font-weight:720;font-stretch:96%}
.dwg .svc{color:var(--fg);transition:color .16s,opacity .16s;outline-offset:6px;cursor:pointer}
.dwg .svc:hover,.dwg .svc:focus-visible,.dwg .svc.is-on{color:var(--accent)}
.dwg .svc:hover .bub circle,.dwg .svc:focus-visible .bub circle,.dwg .svc.is-on .bub circle{fill:currentColor}
.dwg .svc:hover .bub text,.dwg .svc:focus-visible .bub text,.dwg .svc.is-on .bub text{fill:var(--body)}
.dwg:has(.svc:hover) .svc:not(:hover),.dwg.has-on .svc:not(.is-on){opacity:.42}
.dwg--tall{display:none;max-width:460px}
.dwg--mini{width:168px;flex:none}
.dwg--mini,.dwg--detail{color:inherit}

/* One load sequence: the network comes up. */
@keyframes draw{to{stroke-dashoffset:1}}
@keyframes rise{from{opacity:0}to{opacity:1}}
@keyframes fade{from{opacity:0}to{opacity:1}}
/* Dash and gap are 3x the path so the reveal still completes when the drawing is scaled (strokes are non-scaling). */
.dwg--wide .wire,.dwg--tall .wire{stroke-dasharray:3 3;stroke-dashoffset:3;animation:draw 1.1s cubic-bezier(.3,0,.3,1) var(--d,0s) forwards}
.dwg .wire.quick{animation-duration:.4s}
.dwg--wide .rise,.dwg--tall .rise{opacity:0;animation:rise .34s ease-out var(--d,0s) forwards}
.dwg--wide .fade,.dwg--tall .fade{opacity:0;animation:fade .5s ease-out var(--d,0s) forwards}
@media (prefers-reduced-motion:reduce){
  .dwg .wire,.dwg .rise,.dwg .fade{animation:none!important;opacity:1!important;stroke-dasharray:none!important}
  html{scroll-behavior:auto}
}

/* Section heads */
.head{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(20px,4vw,64px);align-items:end;margin-bottom:clamp(28px,4vw,52px)}
.head p{color:var(--fg2);max-width:62ch}

/* Services: the key to the drawing */
.key{border-bottom:1px solid var(--rule)}
.key__row{display:grid;grid-template-columns:28px minmax(0,1.15fr) minmax(0,1fr) 168px;gap:clamp(16px,2.4vw,36px);align-items:center;padding:26px 14px;margin-inline:-14px;border-top:1px solid var(--rule);text-decoration:none;border-radius:8px;transition:background-color .15s}
.key__row:hover,.key__row:focus-visible{background:var(--panel);border-top-color:transparent}
.key__row:hover + .key__row,.key__row:focus-visible + .key__row{border-top-color:transparent}
.key__row:hover .num,.key__row:focus-visible .num{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.key__row:hover h3,.key__row:focus-visible h3{text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:.18em}
.key__row:hover .dwg--mini,.key__row:focus-visible .dwg--mini{color:var(--accent)}
.key__row .num{align-self:start;margin-top:3px}
.key__row p{color:var(--fg2);margin-top:6px;max-width:44ch}
.key__with{display:grid;gap:10px}
.after{margin-top:32px}

/* Expertise schedule */
.sched{width:100%;border-collapse:collapse;font-size:1rem}
.sched caption{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.sched th,.sched td{text-align:left;vertical-align:top;padding:20px 24px 20px 0;border-top:1px solid var(--rule)}
.sched thead th{border-top:0;padding-block:0 12px;font-stretch:var(--w-label);font-weight:540;font-size:.9rem;color:var(--fg2)}
.sched tbody th{font-stretch:106%;font-weight:640;font-size:1.125rem;width:25%}
.sched td:nth-child(2){color:var(--fg2);width:41%}
.sched tr:last-child>*{border-bottom:1px solid var(--rule)}
.panel{background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:clamp(20px,3vw,40px)}

/* Advisor */
.advisor{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,7fr);gap:clamp(28px,6vw,96px);align-items:center}
.portrait{position:relative;isolation:isolate;margin:0;background:#DCE9F2;border-radius:8px;overflow:hidden;aspect-ratio:4/5;max-width:420px}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:50% 12%;filter:grayscale(1) contrast(1.06);mix-blend-mode:multiply}
.portrait::after{content:"";position:absolute;inset:0;background:var(--ink);mix-blend-mode:screen;pointer-events:none}
.advisor__name{font-stretch:var(--w-display);font-weight:700;font-size:clamp(2.1rem,4.4vw,3.6rem);line-height:1;letter-spacing:-.024em;margin-top:14px}
.advisor__role{margin-top:10px;font-size:1.125rem;color:var(--accent);font-weight:560}
.ticks{display:grid;grid-template-columns:1fr 1fr;gap:12px 32px;margin-top:28px}
.ticks li{position:relative;padding-left:20px;color:var(--fg2);line-height:1.45}
.ticks li::before{content:"";position:absolute;left:0;top:.56em;width:8px;height:8px;border-radius:50%;background:var(--signal)}
.advisor .tags{margin-top:26px}
.advisor .btn{margin-top:32px}

/* Contact */
.contact{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:clamp(28px,5vw,72px);align-items:start}
.contact h2{max-width:14ch}
.contact .lede{margin-top:18px}
.contact__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.hours__state{display:flex;align-items:center;gap:10px;font-stretch:106%;font-weight:660;font-size:1.25rem;line-height:1.25}
.week{display:grid;grid-template-columns:repeat(7,1fr);gap:0;margin-top:18px;border:1px solid var(--rule);border-radius:6px;overflow:hidden}
.week div{padding:10px 4px 9px;text-align:center;border-left:1px solid var(--rule);font-size:.875rem;line-height:1.25}
.week div:first-child{border-left:0}
.week b{display:block;font-stretch:90%;font-weight:640}
.week span{display:block;font-stretch:80%;color:var(--fg2);font-variant-numeric:tabular-nums;white-space:nowrap}
.week .is-off{background:repeating-linear-gradient(135deg,transparent 0 5px,var(--hatch) 5px 6px)}
.week .is-today{box-shadow:inset 0 3px 0 var(--signal)}
.week .is-today b{color:var(--accent)}
.facts{display:grid;grid-template-columns:1fr 1fr;gap:22px 28px;margin-top:26px;padding-top:24px;border-top:1px solid var(--rule)}
.facts dt{font-stretch:var(--w-label);font-weight:540;font-size:.9rem;color:var(--fg2)}
.facts dd{margin:3px 0 0;font-weight:560;line-height:1.4}
.facts .wide{grid-column:1/-1}
.bn{font-family:'Anek Bangla',Archivo,sans-serif;font-weight:560;font-size:1.06em}

/* Footer: the title block */
.foot{padding-block:clamp(48px,6vw,80px) 28px}
.foot__grid{display:grid;grid-template-columns:1.3fr 1fr 1.25fr 1.6fr;border:1px solid var(--rule);border-radius:8px}
.foot__grid>div{padding:26px 26px 28px;border-left:1px solid var(--rule);min-width:0}
.foot__grid>div:first-child{border-left:0}
.foot .logo svg{height:92px}
.foot h4{font-stretch:var(--w-label);font-weight:540;font-size:.9rem;color:var(--fg2);margin-bottom:12px}
.foot li{margin-top:7px}
.foot li a{text-decoration:none}
.foot li a:hover{text-decoration:underline}
.foot__end{display:flex;justify-content:space-between;align-items:center;gap:16px 28px;flex-wrap:wrap;margin-top:22px;font-size:.9rem;color:var(--fg2)}

/* Service page */
.crumb{display:flex;gap:8px;font-size:.95rem;color:var(--fg2)}
.crumb a{font-weight:560}
.svc-hero{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:clamp(24px,4vw,64px);align-items:center;padding-block:clamp(28px,4vw,52px) clamp(40px,5vw,72px)}
.svc-hero h1{margin-top:18px;font-size:clamp(2.2rem,4.6vw,3.9rem)}
.svc-hero .lede{margin-top:18px}
.svc-hero .hero__cta{margin-top:28px}
.svc-hero figure{margin:0;border:1.5px solid var(--fg);border-radius:6px;background:var(--sheet);padding:clamp(14px,2vw,26px)}
.split{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(28px,5vw,80px);align-items:start}
.prose p{max-width:66ch;color:var(--fg2)}
.prose p+p{margin-top:1.1em}
.prose h2{margin-bottom:22px}
.spec h3{margin-bottom:8px}
.spec li{padding:16px 0;border-top:1px solid var(--rule)}
.spec li:last-child{border-bottom:1px solid var(--rule)}
.spec b{display:block;font-weight:640}
.spec span{display:block;color:var(--fg2);font-size:.975rem;line-height:1.5;margin-top:2px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;counter-reset:step;margin-top:clamp(24px,3vw,40px)}
.steps li{counter-increment:step;position:relative;padding:34px 24px 0 0;color:var(--fg2);line-height:1.5}
.steps li::before{content:counter(step);position:absolute;left:0;top:-13px;width:26px;height:26px;border-radius:50%;border:1.5px solid var(--fg);background:var(--bg);color:var(--fg);display:grid;place-items:center;font-size:.8rem;font-weight:700}
.steps li::after{content:"";position:absolute;left:26px;right:0;top:0;border-top:1.5px solid var(--fg)}
.steps li:last-child::after{border-top-style:dashed}
.steps b{color:var(--fg);font-weight:640}
.faq details{border-top:1px solid var(--rule)}
.faq details:last-child{border-bottom:1px solid var(--rule)}
.faq summary{display:flex;justify-content:space-between;gap:24px;align-items:center;padding:20px 0;font-stretch:104%;font-weight:620;font-size:1.125rem;cursor:pointer;list-style:none}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"";width:12px;height:12px;flex:none;border-right:1.8px solid currentColor;border-bottom:1.8px solid currentColor;transform:rotate(45deg) translate(-3px,-3px);transition:transform .18s}
.faq details[open] summary::after{transform:rotate(225deg) translate(-2px,-2px)}
.faq p{padding:0 0 22px;max-width:70ch;color:var(--fg2)}
.endcta{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}

/* Mobile menu */
.mm{position:fixed;inset:0;z-index:60;background:var(--ink);color:#fff;--logo-rev:block;--logo-ink:none;padding-top:calc(20px + env(safe-area-inset-top,0px));padding-bottom:calc(32px + env(safe-area-inset-bottom,0px));padding-left:max(var(--gut),env(safe-area-inset-left,0px));padding-right:max(var(--gut),env(safe-area-inset-right,0px));display:none;flex-direction:column;overflow:auto;--fg2:rgba(255,255,255,.78);--rule:rgba(255,255,255,.22)}
.mm.is-open{display:flex}
.mm__top{display:flex;justify-content:space-between;align-items:center;min-height:56px}
.mm nav a{display:block;padding:14px 0;border-top:1px solid var(--rule);font-stretch:108%;font-weight:640;font-size:1.5rem;text-decoration:none}
.mm nav .sub a{font-size:1.0625rem;font-weight:500;font-stretch:100%;padding:10px 0 10px 18px;border-top:0;color:var(--fg2)}
.mm__cta{display:grid;gap:10px;margin-top:auto;padding-top:28px}
.mm .btn{justify-content:center;--btn-bg:#fff;--btn-fg:var(--ink)}
.mm .btn--ghost{color:#fff;border-color:#fff}

/* Responsive */
@media (max-width:1180px){
  .nav__meta .status{display:none}
}
@media (max-width:1039px){
  .wide-only{display:none}
  .sheet--hero .sheet__fig{order:0;border-top:1.5px solid var(--fg);border-bottom:0}
  .sheet--hero .titleblock{border-top:1.5px solid var(--fg)}
  .tb{grid-template-columns:minmax(0,1fr)}
  .tb__lede{border-left:0;border-top:1px solid var(--rule)}
  .dwg--wide{display:none}.dwg--tall{display:block}
  .nav__links,.nav__meta{display:none}
  .nav__in{min-height:64px;gap:10px}
  .logo svg{height:44px}
  .nav__call,.nav__burger{display:inline-grid;place-items:center;width:44px;height:44px;border-radius:6px;border:1.5px solid var(--rule)}
  .nav__call{margin-left:auto}
  .hero__row{flex-direction:column;align-items:flex-start;gap:22px}
  .sheet{display:grid;grid-template-columns:minmax(0,1fr)}
  .sheet__dwg{display:grid;justify-items:center}
  .titleblock{grid-template-columns:1fr 1fr}
  .titleblock div:nth-child(3){border-left:0}
  .titleblock div:nth-child(n+3){border-top:1px solid var(--rule)}
  .head{grid-template-columns:1fr;align-items:start}
  .key__row{grid-template-columns:28px minmax(0,1fr) 168px}
  .key__with{grid-column:2/3}
  .key__row .dwg--mini{grid-column:3;grid-row:1/3}
  .advisor,.contact,.svc-hero,.split{grid-template-columns:1fr}
  .foot__grid{grid-template-columns:1fr 1fr}
  .foot__grid>div:nth-child(3){border-left:0}
  .foot__grid>div:nth-child(n+3){border-top:1px solid var(--rule)}
  .steps{grid-template-columns:1fr 1fr;row-gap:36px}
}
@media (max-width:719px){
  .key__row{grid-template-columns:28px minmax(0,1fr);padding-block:22px}
  .key__row .dwg--mini{display:none}
  .sched thead{display:none}
  .sched,.sched tbody,.sched tr,.sched th,.sched td{display:block;width:auto!important}
  .sched tr{padding:18px 0;border-top:1px solid var(--rule)}
  .sched tr:last-child{border-bottom:1px solid var(--rule)}
  .sched th,.sched td{border:0!important;padding:0}
  .sched td{margin-top:8px}
  .ticks{grid-template-columns:1fr}
  .facts{grid-template-columns:1fr}
  .week span{font-size:.72rem}
  .week b{font-size:.8rem}
  .foot__grid{grid-template-columns:1fr}
  .foot__grid>div{border-left:0}
  .foot__grid>div+div{border-top:1px solid var(--rule)}
  .steps{grid-template-columns:1fr}
  .steps li{padding:0 0 0 44px}
  .steps li::before{top:-2px}
  .steps li::after{left:12.5px;right:auto;top:28px;bottom:-32px;border-top:0;border-left:1.5px solid var(--fg)}
  .steps li:last-child::after{display:none}
  .titleblock{grid-template-columns:1fr}
  .titleblock div{border-left:0}
  .titleblock div+div{border-top:1px solid var(--rule)}
  .btn{min-height:50px}
  .hero__cta,.contact__cta{width:100%}
  .hero__cta .btn,.contact__cta .btn{flex:1 1 auto;justify-content:center}
}

/* Mockup-only controls (not part of the design) */
.mockbar{position:fixed;left:50%;bottom:calc(12px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:90;display:flex;flex-wrap:wrap;justify-content:center;gap:6px 8px;width:max-content;max-width:calc(100% - 20px);padding:7px;border-radius:22px;background:#0d1330;color:#fff;font:500 12.5px/1 system-ui,sans-serif;box-shadow:0 10px 30px -8px rgba(0,0,0,.5)}
.mockbar .seg{display:flex;background:rgba(255,255,255,.1);border-radius:999px;padding:3px}
.mockbar button{padding:7px 11px;border-radius:999px;color:#fff;font:inherit;white-space:nowrap}
.mockbar button[aria-pressed="true"]{background:#fff;color:#0d1330}
.mockbar button:focus-visible{outline:2px solid #3AC1C2;outline-offset:1px}
[hidden]{display:none!important}
`;
