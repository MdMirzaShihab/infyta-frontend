// Builds the design-direction mockup from the site's real content files.
// Usage: node build.mjs <projectDir> <outFile>
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { css } from './css.mjs';
import { symbols, wideDrawing, tallDrawing, minis, networkDetail, NUM } from './diagram.mjs';
import { logoSvg } from '../logo/build-logo.mjs';

const [, , project, outFile] = process.argv;
const load = (p) => import(pathToFileURL(`${project}/src/content/${p}`).href);
const { site } = await load('site.js');
const { services } = await load('services.js');
const { expertise } = await load('expertise.js');
const { chiefAdvisor } = await load('team.js');
const { pages, homeIntro } = await load('pages.js');
const { primaryEmail } = await load('email.js');
const email = primaryEmail();
const portrait = readFileSync(`${project}/public/images/team/chief-advisor-640.webp`).toString('base64');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Short "works with" lines, assembled only from technologies already named in the site content.
const worksWith = {
  'software-development': 'Web and mobile apps, SQL Server, MySQL, MongoDB',
  'network-infrastructure': 'MikroTik, Cisco, Fortinet, wireless deployments',
  'it-support-consultancy': 'Windows and Linux servers, Active Directory, office networks',
  'security-surveillance': 'CCTV, access control, biometric attendance',
  'server-cloud-solutions': 'VMware, Hyper-V, AWS, Azure, Google Cloud',
};
const certsFor = (s) => [...new Set(expertise.filter((e) => s.expertiseKeys.includes(e.key)).flatMap((e) => e.certs))].slice(0, 4);
const tags = (list) => `<div class="tags">${list.map((c) => `<span class="tag">${esc(c)}</span>`).join('')}</div>`;

const logo = (id, tagline = false) => `<span class="l-rev">${logoSvg({ variant: 'reversed', tagline, id: id + 'r' })}</span><span class="l-ink">${logoSvg({ variant: 'ink', tagline, id: id + 'k' })}</span>`;
const icon = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z"/><path d="M9.3 8.2c-.5.9-.2 2.4 1.5 4.1s3.200 2 4.1 1.500l.6-1.100-1.700-1-.800.700c-.600-.300-1.700-1.400-2-2l.700-.800-1-1.700z" fill="currentColor" stroke="none"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};
const tel = `tel:${site.phone.e164}`;
const wa = `https://wa.me/${site.phone.e164.replace('+', '')}`;

const keyRow = (s) => `<a class="key__row" href="#" data-goto="service" data-svc="${s.slug}">
  <span class="num">${NUM[s.slug]}</span>
  <div><h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p></div>
  <div class="key__with"><span class="label">${esc(worksWith[s.slug])}</span>${tags(certsFor(s))}</div>
  ${minis[s.slug]}
</a>`;

const week = `<div class="week" aria-hidden="true">${[['Sat', 6], ['Sun', 0], ['Mon', 1], ['Tue', 2], ['Wed', 3], ['Thu', 4]].map(([d, n]) => `<div data-day="${n}"><b>${d}</b><span>9 to 6</span></div>`).join('')}<div class="is-off" data-day="5"><b>Fri</b><span>Closed</span></div></div>`;

const nav = `<header class="nav cover" id="nav"><div class="wrap nav__in">
  <a class="logo" href="#top" data-goto="home" aria-label="Infyta, home">${logo('n')}</a>
  <nav aria-label="Main"><ul class="nav__links">
    <li><a href="#top" data-goto="home" data-nav="home" aria-current="page">Home</a></li>
    <li class="has-menu"><a href="#services" data-goto="home" data-hash="#services" aria-haspopup="true">Services</a>
      <div class="menu">${services.map((s) => `<a href="#" data-goto="service">${esc(s.name)}</a>`).join('')}</div></li>
    <li><a href="#advisor" data-goto="home" data-hash="#advisor">Team</a></li>
    <li><a href="#expertise" data-goto="home" data-hash="#expertise">About</a></li>
    <li><a href="#contact" data-goto="home" data-hash="#contact">Contact</a></li>
  </ul></nav>
  <div class="nav__meta">
    <span class="status label" data-status><i class="dot"></i><span data-status-short>Sat to Thu, 9 AM to 6 PM</span></span>
    <a class="tel" href="${tel}">${site.phone.display}</a>
    <a class="btn btn--sm" href="#contact" data-goto="home" data-hash="#contact">Get Started</a>
  </div>
  <a class="nav__call" href="${tel}" aria-label="Call ${site.phone.display}"><span style="width:20px;height:20px;display:block">${icon.phone}</span></a>
  <button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mm">${icon.menu}</button>
</div></header>`;

const metaCells = `<div><dt>Drawing</dt><dd>Typical office network</dd></div>
      <div><dt>Drawn by</dt><dd>Infyta, Azimpur, Dhaka</dd></div>
      <div><dt>Scale</dt><dd>Not to scale</dd></div>
      <div><dt>Key</dt><dd>1 to 5 are our services. Select any part.</dd></div>`;
const heroCta = `<div class="hero__cta"><a class="btn" href="#contact">Get Started</a><a class="btn btn--ghost" href="#services">Explore Solutions</a></div>`;

// A: the hero is one object, a drawing sheet whose title block carries the headline.
const heroSheet = `<section class="hero hero--sheet cover" data-hero="sheet"><div class="wrap">
  <div class="sheet sheet--hero">
    <div class="tb">
      <div class="tb__title"><h1>Limitless tech solutions for a digital world</h1>${heroCta}</div>
      <div class="tb__lede"><p class="lede">${esc(pages.home.description)}</p></div>
    </div>
    <figure class="sheet__fig"><div class="sheet__dwg">${wideDrawing()}${tallDrawing()}</div></figure>
    <dl class="titleblock">${metaCells}</dl>
  </div>
</div></section>`;

// B: headline first, drawing below (the first mockup).
const heroStack = `<section class="hero cover" data-hero="stack"><div class="wrap">
  <h1>Limitless tech solutions <br class="wide-only">for a digital world</h1>
  <div class="hero__row">
    <p class="lede">${esc(pages.home.description)}</p>
    ${heroCta}
  </div>
  <figure class="sheet">
    <div class="sheet__dwg">${wideDrawing()}${tallDrawing()}</div>
    <figcaption><dl class="titleblock">${metaCells}</dl></figcaption>
  </figure>
</div></section>`;
const hero = `<div id="top">${heroSheet}${heroStack}</div>`;

const servicesBand = `<section class="band paper" id="services"><div class="wrap">
  <div class="head"><h2>Our Services</h2><p>${esc(homeIntro)}</p></div>
  <div class="key">${services.map(keyRow).join('')}</div>
  <div class="after"><a class="btn btn--ghost" href="#" data-goto="service">Explore All Services</a></div>
</div></section>`;

const expertiseBand = `<section class="band paper" id="expertise" style="padding-top:0"><div class="wrap">
  <div class="head"><h2>Our Core Expertise</h2><p>Comprehensive IT solutions across multiple domains, delivered by certified professionals</p></div>
  <table class="sched"><caption>Core expertise, technologies and certifications</caption>
    <thead><tr><th scope="col">Domain</th><th scope="col">What we work with</th><th scope="col">Certifications and specialists</th></tr></thead>
    <tbody>${expertise.map((e) => `<tr><th scope="row">${esc(e.title)}</th><td>${esc(e.description)}</td><td>${tags(e.certs)}</td></tr>`).join('')}</tbody>
  </table>
</div></section>`;

const advisorBand = `<section class="band blueprint" id="advisor"><div class="wrap advisor">
  <figure class="portrait"><img src="data:image/webp;base64,${portrait}" width="640" height="640" alt="${esc(chiefAdvisor.name)}, Chief Advisor at Infyta" loading="lazy"></figure>
  <div>
    <h2 class="label" style="font-size:1rem">Our Chief Advisor</h2>
    <p class="advisor__name">${esc(chiefAdvisor.name)}</p>
    <p class="advisor__role">${esc(chiefAdvisor.role)}</p>
    <ul class="ticks">${chiefAdvisor.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    ${tags(chiefAdvisor.certifications)}
    <a class="btn" href="#advisor">View Our Team</a>
  </div>
</div></section>`;

const contactPanel = `<div class="panel">
  <div class="hours__state"><i class="dot" data-status-dot></i><span data-status-long>Saturday to Thursday, 9 AM to 6 PM</span></div>
  <p class="label" style="margin-top:4px">Dhaka time</p>
  ${week}
  <dl class="facts">
    <div class="wide"><dt>Our office</dt><dd><address style="font-style:normal">${esc(site.address.display)}</address><span class="bn" lang="bn">আজিমপুর, ঢাকা</span> &nbsp; <a class="textlink" href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></dd></div>
    <div><dt>Phone</dt><dd><a class="tel" href="${tel}">${site.phone.display}</a></dd></div>
    <div><dt>Email</dt><dd><a href="mailto:${email}">${email}</a></dd></div>
  </dl>
</div>`;

const contactBand = `<section class="band paper" id="contact"><div class="wrap contact">
  <div>
    <h2>Ready to Transform Your Business?</h2>
    <p class="lede">Let’s discuss how Infyta can help you achieve your technology goals.</p>
    <div class="contact__cta">
      <a class="btn" href="#contact">Get Started</a>
      <a class="btn btn--ghost btn--icon" href="${wa}" target="_blank" rel="noopener noreferrer">${icon.wa}WhatsApp</a>
      <a class="btn btn--ghost btn--icon" href="${tel}">${icon.phone}${site.phone.display}</a>
    </div>
  </div>
  ${contactPanel}
</div></section>`;

// ---- Service page (Network Infrastructure as the example) ----
const svc = services.find((s) => s.slug === 'network-infrastructure');
const step = (t) => { const i = t.indexOf(': '); return i > 0 ? `<b>${esc(t.slice(0, i))}.</b> ${esc(t.slice(i + 2, i + 3).toUpperCase() + t.slice(i + 3))}` : esc(t); };
const serviceView = `<div data-view="service" hidden>
  <section class="paper"><div class="wrap svc-hero">
    <div>
      <nav class="crumb" aria-label="Breadcrumb"><a href="#" data-goto="home" data-hash="#services">Services</a><span aria-hidden="true">/</span><span>${esc(svc.name)}</span></nav>
      <h1>${esc(svc.name)}</h1>
      <p class="lede">${esc(svc.heroSubtitle)}</p>
      <div class="hero__cta"><a class="btn" href="#" data-goto="home" data-hash="#contact">Get Started Today</a><a class="btn btn--ghost btn--icon" href="${tel}">${icon.phone}${site.phone.display}</a></div>
    </div>
    <figure>${networkDetail()}</figure>
  </div></section>
  <section class="band paper" style="padding-top:clamp(24px,3vw,40px)"><div class="wrap split">
    <div class="prose"><h2>Overview</h2>${svc.overview.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    <aside class="spec"><h3>What’s Included</h3><ul style="margin-top:16px">${svc.included.map((i) => `<li><b>${esc(i.title)}</b><span>${esc(i.description)}</span></li>`).join('')}</ul></aside>
  </div></section>
  <section class="band blueprint"><div class="wrap">
    <h2>Our Approach</h2>
    <ol class="steps">${svc.approach.map((a) => `<li>${step(a)}</li>`).join('')}</ol>
  </div></section>
  <section class="band paper"><div class="wrap">
    <div class="head"><h2>Technologies &amp; Certifications</h2><p></p></div>
    <table class="sched"><caption>Technologies and certifications</caption><tbody>${expertise.filter((e) => svc.expertiseKeys.includes(e.key)).map((e) => `<tr><th scope="row">${esc(e.title)}</th><td>${esc(e.description)}</td><td>${tags(e.certs)}</td></tr>`).join('')}</tbody></table>
  </div></section>
  <section class="band paper" style="padding-top:0"><div class="wrap split" style="grid-template-columns:minmax(0,4fr) minmax(0,8fr)">
    <h2>Frequently Asked Questions</h2>
    <div class="faq">${svc.faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}</div>
  </div></section>
  <section class="band paper" style="padding-top:0"><div class="wrap">
    <div class="head"><h2>Related Services</h2><p></p></div>
    <div class="key">${svc.related.map((r) => keyRow(services.find((s) => s.slug === r))).join('')}</div>
  </div></section>
  <section class="band paper" style="padding-top:0"><div class="wrap"><div class="panel endcta">
    <h2>Ready to discuss your project?</h2>
    <div class="hero__cta"><a class="btn" href="#" data-goto="home" data-hash="#contact">Get Started Today</a><a class="btn btn--ghost btn--icon" href="${wa}" target="_blank" rel="noopener noreferrer">${icon.wa}WhatsApp</a></div>
  </div></div></section>
</div>`;

const footer = `<footer class="foot blueprint"><div class="wrap">
  <div class="foot__grid">
    <div><a class="logo" href="#top" data-goto="home" aria-label="Infyta, home">${logo('f', true)}</a><p class="small" style="margin-top:16px;max-width:26ch">${esc(site.tagline)}</p></div>
    <div><h4>Quick Links</h4><ul><li><a href="#top" data-goto="home">Home</a></li><li><a href="#services" data-goto="home" data-hash="#services">Services</a></li><li><a href="#advisor" data-goto="home" data-hash="#advisor">Team</a></li><li><a href="#expertise" data-goto="home" data-hash="#expertise">About Us</a></li><li><a href="#contact" data-goto="home" data-hash="#contact">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul>${services.map((s) => `<li><a href="#" data-goto="service">${esc(s.name)}</a></li>`).join('')}</ul></div>
    <div><h4>Contact</h4><ul>
      <li><a class="tel" href="${tel}">${site.phone.display}</a></li>
      <li><a href="mailto:${email}">${email}</a></li>
      <li><a href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer">${esc(site.address.display)}</a></li>
      ${site.hours.display.map((h) => `<li class="small">${esc(h)}</li>`).join('')}
    </ul></div>
  </div>
  <div class="foot__end"><span>© 2026 Infyta. All rights reserved.</span><span class="status" data-status><i class="dot"></i><span data-status-short></span></span></div>
</div></footer>`;

const mobileMenu = `<div class="mm" id="mm" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="mm__top"><a class="logo" href="#top" data-goto="home" aria-label="Infyta, home">${logo('m')}</a><button class="nav__burger" id="mmClose" aria-label="Close menu" style="display:inline-grid">${icon.close}</button></div>
  <nav aria-label="Mobile" style="margin-top:18px">
    <a href="#top" data-goto="home">Home</a>
    <a href="#services" data-goto="home" data-hash="#services">Services</a>
    <div class="sub">${services.map((s) => `<a href="#" data-goto="service">${esc(s.name)}</a>`).join('')}</div>
    <a href="#advisor" data-goto="home" data-hash="#advisor">Team</a>
    <a href="#expertise" data-goto="home" data-hash="#expertise">About</a>
    <a href="#contact" data-goto="home" data-hash="#contact">Contact</a>
  </nav>
  <div class="mm__cta"><span class="status" data-status><i class="dot"></i><span data-status-short></span></span>
    <a class="btn btn--icon" href="${tel}">${icon.phone}Call ${site.phone.display}</a>
    <a class="btn btn--ghost btn--icon" href="${wa}">${icon.wa}WhatsApp</a></div>
</div>`;

const mockbar = `<div class="mockbar" role="group" aria-label="Mockup controls">
  <div class="seg" aria-label="Hero layout"><button data-set-hero="sheet" data-choice="hero-sheet">Sheet hero</button><button data-set-hero="stack" data-choice="hero-stack">Stacked hero</button></div>
  <div class="seg" aria-label="Cover colour"><button data-set-cover="blueprint" data-choice="cover-blueprint">Blueprint</button><button data-set-cover="paper" data-choice="cover-paper">Paper</button></div>
  <div class="seg" aria-label="Page"><button data-goto="home" data-page="home">Home</button><button data-goto="service" data-page="service">Service page</button></div>
</div>`;

const js = `(function(){
  var root=document.documentElement, nav=document.getElementById('nav'), mm=document.getElementById('mm'), burger=document.getElementById('burger');
  var views=[].slice.call(document.querySelectorAll('main [data-view]'));
  var params={}; location.hash.replace(/^#/,'').split('&').forEach(function(kv){var p=kv.split('=');if(p[1])params[p[0]]=p[1];});
  function pressed(){
    document.querySelectorAll('[data-set-cover]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.setCover===root.dataset.cover));});
    document.querySelectorAll('[data-set-hero]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.setHero===root.dataset.hero));});
    document.querySelectorAll('[data-page]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.page===root.dataset.view));});
  }
  function syncNav(){
    var hero=document.getElementById('top');
    var paper=root.dataset.cover==='paper'||root.dataset.view!=='home'||window.scrollY>hero.offsetHeight-70;
    nav.classList.toggle('is-paper',paper);
  }
  function show(name,hash){
    views.forEach(function(v){v.hidden=v.dataset.view!==name;});
    root.dataset.view=name; pressed();
    var home=document.querySelector('[data-nav="home"]'); if(home){ if(name==='home') home.setAttribute('aria-current','page'); else home.removeAttribute('aria-current'); }
    var el=hash&&document.querySelector(hash);
    if(el) el.scrollIntoView({behavior:'instant',block:'start'}); else window.scrollTo(0,0);
    syncNav();
  }
  function closeMenu(){mm.classList.remove('is-open');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}
  document.addEventListener('click',function(e){
    var c=e.target.closest('[data-set-cover]'); if(c){root.dataset.cover=c.dataset.setCover;pressed();syncNav();return;}
    var h=e.target.closest('[data-set-hero]'); if(h){root.dataset.hero=h.dataset.setHero;pressed();syncNav();window.scrollTo(0,0);return;}
    var a=e.target.closest('[data-goto]'); if(a){e.preventDefault();closeMenu();show(a.dataset.goto,a.dataset.hash);return;}
    if(e.target.closest('.mm a')) closeMenu();
  });
  burger.addEventListener('click',function(){mm.classList.add('is-open');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';document.getElementById('mmClose').focus();});
  document.getElementById('mmClose').addEventListener('click',function(){closeMenu();burger.focus();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
  window.addEventListener('scroll',syncNav,{passive:true});

  // Opening hours, always in Dhaka time (Saturday to Thursday, 9 AM to 6 PM).
  function dhaka(){
    var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dhaka',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    var get=function(t){return parts.filter(function(p){return p.type===t;})[0].value;};
    return {day:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[get('weekday')],mins:(parseInt(get('hour'),10)%24)*60+parseInt(get('minute'),10)};
  }
  var names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function status(){
    var now=dhaka(), open=function(d){return d!==5;}, O=540, C=1080;
    if(open(now.day)&&now.mins>=O&&now.mins<C) return {open:true,day:now.day,short:'Open now, until 6 PM',long:'Open now. Closes at 6 PM.'};
    if(open(now.day)&&now.mins<O) return {open:false,day:now.day,short:'Closed, opens 9 AM',long:'Closed now. Opens today at 9 AM.'};
    var n=(now.day+1)%7,k=1; while(!open(n)){n=(n+1)%7;k++;}
    var when=k===1?'tomorrow':names[n];
    return {open:false,day:now.day,short:'Closed, opens '+when+' 9 AM',long:'Closed now. Opens '+when+' at 9 AM.'};
  }
  function paint(){
    var s=status();
    document.querySelectorAll('[data-status]').forEach(function(el){el.classList.toggle('is-closed',!s.open);});
    document.querySelectorAll('[data-status-short]').forEach(function(el){el.textContent=s.short;});
    document.querySelectorAll('[data-status-long]').forEach(function(el){el.textContent=s.long;});
    document.querySelectorAll('[data-status-dot]').forEach(function(el){el.style.background=s.open?'':'var(--amber)';el.style.boxShadow=s.open?'':'0 0 0 3px rgba(233,162,59,.25)';});
    document.querySelectorAll('.week [data-day]').forEach(function(el){el.classList.toggle('is-today',Number(el.dataset.day)===s.day);});
  }
  paint(); setInterval(paint,60000);

  // The services list and the drawing light each other up.
  function light(slug,on){
    document.querySelectorAll('.dwg--wide,.dwg--tall').forEach(function(svg){
      svg.classList.toggle('has-on',on);
      svg.querySelectorAll('.svc').forEach(function(g){g.classList.toggle('is-on',on&&g.dataset.svc===slug);});
    });
  }
  document.querySelectorAll('.key__row[data-svc]').forEach(function(row){
    row.addEventListener('mouseenter',function(){light(row.dataset.svc,true);});
    row.addEventListener('mouseleave',function(){light(row.dataset.svc,false);});
    row.addEventListener('focus',function(){light(row.dataset.svc,true);});
    row.addEventListener('blur',function(){light(row.dataset.svc,false);});
  });

  root.dataset.cover=params.cover||root.dataset.cover||'blueprint'; root.dataset.hero=params.hero||root.dataset.hero||'sheet'; show(params.view||'home');
  if(params.on) light(params.on,true);
  if(params.y) window.scrollTo(0,Number(params.y));
})();`;

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Anek+Bangla:wght@400..700&family=Montserrat:wght@800&family=Barlow+Semi+Condensed:wght@500&display=swap" rel="stylesheet">`;
const style = `<style>${css}</style>`;
// Set the mockup's state before first paint (an artifact page cannot write its own <html> tag).
const boot = `<script>(function(r){r.lang='en';r.dataset.cover=r.dataset.cover||'blueprint';r.dataset.hero=r.dataset.hero||'sheet';r.dataset.view='home';})(document.documentElement);</script>`;
const bodyHtml = `<a class="skip" href="#main">Skip to content</a>
${symbols}
${nav}
<main id="main">
<div data-view="home">
${hero}
${servicesBand}
${expertiseBand}
${advisorBand}
${contactBand}
</div>
${serviceView}
</main>
${footer}
${mobileMenu}
${mockbar}
<script>${js}</script>`;

const asArtifact = process.argv[4] === 'artifact';
const html = asArtifact
  ? `<title>Infyta Design Direction</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fonts}
${style}
${boot}
${bodyHtml}
`
  : `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Infyta Design Direction</title>
${fonts}
${style}
${boot}
</head>
<body>
${bodyHtml}
</body>
</html>`;

writeFileSync(outFile, html);
console.log('wrote', outFile, (html.length / 1024).toFixed(0) + ' KB');
