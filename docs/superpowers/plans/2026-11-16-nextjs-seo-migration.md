# Infyta Next.js SEO Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Vite SPA with a statically exported Next.js site whose every page ships complete, SEO- and AI-readable HTML for Dhaka local search, deployable to Cloudflare Pages.

**Architecture:** Next.js App Router with `output: 'export'` builds one HTML file per route into `out/`. All business facts and page/service data live in plain-JS modules under `src/content/`; pure helpers in `src/lib/` turn them into Next metadata, JSON-LD and `llms.txt`. Server `page.jsx` files own metadata and JSON-LD and render client "view" components that keep the existing framer-motion/Swiper visuals.

**Tech Stack:** Next.js (latest stable, App Router), React 19, Tailwind CSS v3 + PostCSS, framer-motion, Swiper, react-icons, Node 22 `node:test`, `node-html-parser` (dev), `sharp` (dev), Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-16-nextjs-seo-migration-design.md` (approved). Read it before starting; this plan argues from it and cites its sections as "spec §N".

**Branch:** `nextjs-seo-migration` (already exists; the spec is committed on it). Commit after every task.

## Global Constraints

- Static export only: `next.config.mjs` has `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: false`. No server actions, no request-time route handlers, no middleware.
- Canonical origin `https://infyta.com` (apex, no `www`, no trailing slash).
- JavaScript/JSX only. Tailwind **v3** with PostCSS. Node 22.
- There must be **no `src/pages/` directory** (Next would treat it as the Pages Router). Current `src/pages/*` moves to `src/views/*`.
- Files under `src/content/` and `src/lib/` are plain JS: no JSX, no `@/` alias, relative imports with `.js` extensions, so `node --test` can import them directly.
- Business name `Infyta`.
- Address, exact spelling everywhere: `4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh` (street `4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur`, locality `Dhaka`, country `BD`, no postal code).
- Phone: display `+880 1318 121558`, link/JSON-LD `+8801318121558`. The only published number.
- Email: `infytaofficial@gmail.com` is published. `info@infyta.com` is published nowhere while `site.domainEmailActive === false`.
- Hours: Saturday–Thursday 09:00–18:00, Friday closed.
- These strings must never appear in any built `.html`, `.xml` or `.txt` file (`_redirects` legitimately contains the old paths): `Lalbagh`, `Rasulbagh`, `976843`, `331586`, `training-certification`, `Training & Certification`, and `info@infyta.com` (while the flag is false).
- No invented facts (spec §2 anti-goals). Copy may use only: the services, technologies and certifications already on the site; Md. Arif's highlights (as his, not the company's); the NAP and hours above; "Infyta's team includes certified engineers and instructors" (owner-confirmed). Never: client/project counts, company years in business, prices, guarantees, response-time promises, awards, named clients, superlatives ("the best", "#1", "leading"), or the placeholder numbers in `src/sections/Stats.jsx`.
- Brand colours `#3ac1c2` (primary), `#14b9da` (secondary), `#1f2c62` (dark); layout, typography and section order stay as today. Where look and speed conflict, speed wins, using only the ordered trade-offs in spec §5.9.
- Every page: exactly one `<h1>`, `<html lang="en">`, body text present in the HTML without JS.

## Review Focus

1. **Hydration mismatches** (randomness, dates or `window` reads during render) show up only in a browser console, never in the build. Expected: zero hydration warnings on every route. Pinned by `tests/unit/render-purity.test.mjs` (Task 2) plus the browser check in Task 2 and Task 5.
2. **Old and variant URLs** (`/services/training-certification`, `/services/mobile-applications`, `/services/cloud-services`, `/about.html`, `/about/`) must land on the right page with a redirect, not a 404 or a duplicate. Pinned by the `_redirects` test and the `wrangler pages dev` curl checks in Task 6.
3. **Unknown URLs** must return a real 404, not the home page with 200 (Cloudflare Pages' SPA fallback kicks in if `404.html` is missing). Pinned by `404.html exists` (Task 2) and the curl check (Task 6).
4. **Collapsed or hidden content** (FAQ answers, nav dropdown links, mobile menu) must still be in the HTML for crawlers. Pinned by the nav-links test (Task 2) and the FAQ-answers-in-HTML test (Task 4).
5. **Flipping `domainEmailActive` to `true`** must switch every email occurrence (page text, `mailto:`, JSON-LD, `llms.txt`) at once. Pinned by flag-state unit tests in Task 1 and the forbidden-strings build test in Task 2.

---

## File Structure

```
next.config.mjs, jsconfig.json, postcss.config.mjs, tailwind.config.js, eslint.config.mjs
public/_headers, public/_redirects
public/images/infyta-logo.png, public/images/hero/*.webp, public/images/team/chief-advisor.webp
scripts/make-brand-images.mjs     # icons + OG image from the logo (sharp)
scripts/resize-images.mjs         # responsive hero/team variants (sharp)
src/content/site.js               # NAP, hours, email flag, socials, URLs
src/content/pages.js              # static-page meta, home intro, allPaths()
src/content/services.js           # 5 services: meta + page content + FAQs
src/content/expertise.js          # Team "Core Expertise" data (shared with service pages)
src/content/team.js               # Md. Arif data
src/lib/seo/metadata.js           # rootMetadata, pageMetadata()
src/lib/seo/jsonld.js             # schema builders + serializeJsonLd()
src/lib/seo/crawlers.js           # ALLOWED_CRAWLERS
src/lib/llms.js                   # buildLlmsTxt()
src/app/layout.jsx, globals.css, page.jsx, not-found.jsx
src/app/{about,team,contact,services}/page.jsx, src/app/services/[slug]/page.jsx
src/app/sitemap.js, robots.js, llms.txt/route.js
src/app/icon.png, apple-icon.png, opengraph-image.png, opengraph-image.alt.txt
src/components/{Navbar,Footer,FloatingOrbs,ServiceCard,ServiceIcon,JsonLd,MotionProvider}.jsx
src/sections/{Hero,Services,CTA}.jsx  # Stats.jsx deleted
src/views/{HomeView,AboutView,TeamView,ContactView,ServicesIndexView,ServicePageView}.jsx
tests/unit/*.test.mjs             # node:test, no build needed
tests/build/helpers.mjs, tests/build/*.test.mjs   # read out/ after `npm run build`
docs/review-list.md, docs/deploy-cloudflare.md, README.md
```

`package.json` scripts (final): `"dev": "next dev"`, `"build": "next build"`, `"lint": "eslint ."`, `"test": "node --test \"tests/unit/**/*.test.mjs\""`, `"test:build": "node --test \"tests/build/**/*.test.mjs\""`, `"check": "npm test && npm run build && npm run test:build && npm run lint"`, `"preview": "npx wrangler pages dev out"`.

---

### Task 1: Content data and SEO helpers

Pure JS, no Next.js yet; runs alongside the existing Vite app.

**Files:**
- Create: `src/content/site.js`, `src/content/pages.js`, `src/content/services.js`, `src/content/expertise.js`, `src/content/team.js`, `src/lib/seo/metadata.js`, `src/lib/seo/jsonld.js`, `src/lib/seo/crawlers.js`, `src/lib/llms.js`
- Test: `tests/unit/site.test.mjs`, `tests/unit/content.test.mjs`, `tests/unit/jsonld.test.mjs`, `tests/unit/metadata.test.mjs`, `tests/unit/llms.test.mjs`
- Modify: `package.json` (add `test` script)

**Interfaces (Produces):**
- `site.js`: `export const SITE_URL = 'https://infyta.com'`; `export const site` with keys `name`, `url`, `tagline` ("Limitless Tech Solutions for a Digital World"), `slogan` ("Engineering Tomorrow's Tech Today"), `logo` (`'/images/infyta-logo.png'`), `address {display, streetAddress, addressLocality, addressCountry}`, `phone {display, e164}`, `domainEmailActive: false`, `emails {domain: 'info@infyta.com', fallback: 'infytaofficial@gmail.com'}`, `hours {display: ['Saturday – Thursday: 9 AM – 6 PM', 'Friday: Closed'], days: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '18:00'}`, `geo: null`, `socials: []` (items `{name, url}`), `mapsUrl`, `mapEmbedUrl` (both built from `address.display` with `encodeURIComponent`); `export function absoluteUrl(path: string): string` (`'/'` → `SITE_URL`, else `SITE_URL + path`); `export function primaryEmail(s = site): string`; `export function publicEmails(s = site): string[]` (flag true → `[domain, fallback]`, false → `[fallback]`).
- `pages.js`: `export const pages = { home, services, about, team, contact }`, each `{path, title, description, absoluteTitle}`, values from spec §5.5, with `absoluteTitle: true` for `home`, `about` and `contact` (they already contain "Infyta"; the template would double it). `/contact` description is exactly: `Visit Infyta at Swarnolota, Bottola, Azimpur, Dhaka, or call +880 1318 121558. Open Saturday–Thursday, 9 AM–6 PM. Get a free IT consultation.` Also `export const homeIntro = ''` (filled in Task 4). `export function allPaths(): string[]` returns exactly `['/', '/services', '/services/software-development', '/services/network-infrastructure', '/services/it-support-consultancy', '/services/security-surveillance', '/services/server-cloud-solutions', '/about', '/team', '/contact']`.
- `services.js`: `export const services` (array, order as in `allPaths`), each `{slug, name, summary, color, metaTitle, metaDescription, heroSubtitle, overview: string[], included: {title, description}[], approach: string[], expertiseKeys: string[], faqs: {question, answer}[], related: string[]}`. Names: Software Development, Network Infrastructure, IT Support & Consultancy, Security & Surveillance, Server & Cloud Solutions. `metaTitle`/`metaDescription` verbatim from spec §5.5. `summary` and `color` (Tailwind gradient classes, e.g. `'from-blue-500 to-purple-500'`) = the card text and gradient in today's `src/pages/Services/index.jsx`. `expertiseKeys`: software-development `['software','database']`, network-infrastructure `['network']`, it-support-consultancy `['server','network']`, security-surveillance `['security']`, server-cloud-solutions `['server','cloud','database']`. For `software-development`, fill `overview`/`included`/`approach` from today's `SoftwareDevelopment.jsx`; for the other four, `heroSubtitle` plus one-sentence `overview` from today's descriptions. `faqs: []` and `related: []` for all (Task 4 fills them). `export function getService(slug): service | undefined`.
- `expertise.js`: `export const expertise` = today's Team "Core Expertise" array with `key` added (`server`, `network`, `software`, `security`, `cloud`, `database`) and `icon` removed; fields `{key, title, description, certs}`.
- `team.js`: `export const chiefAdvisor = {name: 'Md. Arif', role: 'Chief Advisor & Senior Instructor', image: '/images/team/chief-advisor.webp', highlights, certifications, knowsAbout}`, with highlights and certifications copied from `Team.jsx`; `knowsAbout: ['Windows Server','Linux Server','Network Administration','IT Security','Cloud Solutions','Data Centers','Disaster Recovery']`.
- `metadata.js`: `export const rootMetadata` and `export function pageMetadata({path, title, description, absoluteTitle = false})` (shapes in Step 3).
- `jsonld.js`: `export const BUSINESS_ID = 'https://infyta.com/#business'`, `export const WEBSITE_ID = 'https://infyta.com/#website'`, `businessGraph(s = site, svc = services)`, `webPage({path, name, description, type = 'WebPage'})`, `breadcrumbList(items: {name, path}[])`, `serviceSchema(service)`, `serviceItemList(svc = services)`, `faqPage(faqs)`, `personSchema(person)`, `serializeJsonLd(data): string`. Every builder except `businessGraph` returns an object with `'@context': 'https://schema.org'`; `businessGraph` returns `{'@context', '@graph': [localBusiness, website]}`.
- `crawlers.js`: `export const ALLOWED_CRAWLERS = ['Googlebot','Bingbot','Google-Extended','GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User','Applebot','Applebot-Extended']`.
- `llms.js`: `export function buildLlmsTxt(s = site, svc = services): string`.

- [ ] **Step 1: Write the failing unit tests**

`tests/unit/site.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { site, absoluteUrl, primaryEmail, publicEmails } from '../../src/content/site.js';

test('NAP is exact', () => {
  assert.equal(site.address.display, '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh');
  assert.equal(site.address.streetAddress, '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur');
  assert.equal(site.phone.display, '+880 1318 121558');
  assert.equal(site.phone.e164, '+8801318121558');
});
test('email follows the domainEmailActive flag', () => {
  assert.equal(site.domainEmailActive, false);
  assert.equal(primaryEmail(), 'infytaofficial@gmail.com');
  assert.deepEqual(publicEmails(), ['infytaofficial@gmail.com']);
  const on = { ...site, domainEmailActive: true };
  assert.equal(primaryEmail(on), 'info@infyta.com');
  assert.deepEqual(publicEmails(on), ['info@infyta.com', 'infytaofficial@gmail.com']);
});
test('absoluteUrl', () => {
  assert.equal(absoluteUrl('/'), 'https://infyta.com');
  assert.equal(absoluteUrl('/team'), 'https://infyta.com/team');
});
```

`tests/unit/content.test.mjs`:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { pages, allPaths } from '../../src/content/pages.js';
import { services, getService } from '../../src/content/services.js';

const fullTitle = (t, abs) => (abs ? t : `${t} | Infyta`);
test('allPaths lists the 10 routes', () => {
  assert.deepEqual(allPaths(), ['/', '/services', ...services.map(s => `/services/${s.slug}`), '/about', '/team', '/contact']);
  assert.equal(allPaths().length, 10);
});
test('five services with the agreed slugs', () => {
  assert.deepEqual(services.map(s => s.slug), ['software-development','network-infrastructure','it-support-consultancy','security-surveillance','server-cloud-solutions']);
  assert.equal(getService('network-infrastructure').name, 'Network Infrastructure');
  assert.equal(getService('training-certification'), undefined);
});
test('titles <= 65 chars and descriptions 70-160 chars', () => {
  const entries = [
    ...Object.values(pages).map(p => [fullTitle(p.title, p.absoluteTitle), p.description]),
    ...services.map(s => [fullTitle(s.metaTitle, false), s.metaDescription]),
  ];
  for (const [title, desc] of entries) {
    assert.ok(title.length <= 65, title);
    assert.ok(desc.length >= 70 && desc.length <= 160, desc);
  }
});
```

`tests/unit/jsonld.test.mjs`: assert on `businessGraph()`:
- The `LocalBusiness` node has `'@id'` `BUSINESS_ID`, `telephone` `'+8801318121558'` and `email` `'infytaofficial@gmail.com'`.
- `address` deep-equals `{'@type':'PostalAddress', streetAddress: '4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur', addressLocality: 'Dhaka', addressCountry: 'BD'}`.
- `openingHoursSpecification` deep-equals `[{'@type':'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '18:00'}]`.
- `areaServed` contains `{'@type':'City', name:'Dhaka'}` and `{'@type':'Country', name:'Bangladesh'}`.
- `hasOfferCatalog.itemListElement.length === 5`.
- No `geo` key and no `sameAs` key.
- With `{...site, geo: {latitude: 23.7, longitude: 90.38}, socials: [{name:'Facebook', url:'https://facebook.com/x'}], domainEmailActive: true}`, `geo` is a `GeoCoordinates` object, `sameAs` is `['https://facebook.com/x']` and `email` is `'info@infyta.com'`.
- The `WebSite` node has `'@id'` `WEBSITE_ID` and `publisher` `{'@id': BUSINESS_ID}`.

Assert on the other builders:
- `breadcrumbList([{name:'Home',path:'/'},{name:'Services',path:'/services'}]).itemListElement[1]` deep-equals `{'@type':'ListItem', position: 2, name: 'Services', item: 'https://infyta.com/services'}`.
- For `serviceSchema(getService('security-surveillance'))`:
  - `'@id'` is `'https://infyta.com/services/security-surveillance#service'`.
  - `provider` is `{'@id': BUSINESS_ID}`.
  - `url` is `'https://infyta.com/services/security-surveillance'`.
- `faqPage([{question:'Q?', answer:'A.'}]).mainEntity[0]` deep-equals `{'@type':'Question', name:'Q?', acceptedAnswer:{'@type':'Answer', text:'A.'}}`.
- `personSchema(chiefAdvisor).worksFor` is `{'@id': BUSINESS_ID}`, and `image` is `'https://infyta.com/images/team/chief-advisor.webp'`.
- `webPage({path:'/about', name:'x', description:'y', type:'AboutPage'})` has `'@type'` `'AboutPage'`, `url` `'https://infyta.com/about'` and `isPartOf` `{'@id': WEBSITE_ID}`.
- `serializeJsonLd({a:'</script><script>'})` does not include `'</script>'` and `JSON.parse` of it round-trips.

`tests/unit/metadata.test.mjs`:
- `pageMetadata({path:'/team', title:'Our Team – Certified IT Experts', description:'d'})` gives `title === 'Our Team – Certified IT Experts'`, `alternates.canonical === '/team'`, `openGraph.url === '/team'`, `openGraph.title === 'Our Team – Certified IT Experts | Infyta'`, `openGraph.siteName === 'Infyta'`, `openGraph.type === 'website'`, `openGraph.locale === 'en_US'` and `twitter.card === 'summary_large_image'`.
- With `absoluteTitle: true`, `title` deep-equals `{absolute: <title>}` and `openGraph.title === <title>`.
- `rootMetadata.metadataBase.href === 'https://infyta.com/'` and `rootMetadata.title.template === '%s | Infyta'`.

`tests/unit/llms.test.mjs`:
- `buildLlmsTxt()` matches `/^# Infyta\n\n> /`.
- It includes `site.address.display`, `site.phone.display`, `'infytaofficial@gmail.com'`, `'## Services'`, `'## Company'` and `'## Contact'`, plus ``[${s.name}](https://infyta.com/services/${s.slug})`` for each service.
- It does not include `'info@infyta.com'`.

- [ ] **Step 2: Add `"test": "node --test \"tests/unit/**/*.test.mjs\""` to `package.json`, run `npm test`**

Expected: FAIL, modules not found.

- [ ] **Step 3: Implement the modules listed under Interfaces**

`metadata.js` shapes:
- `rootMetadata = { metadataBase: new URL(SITE_URL), title: { default: pages.home.title, template: '%s | Infyta' }, description: pages.home.description, applicationName: 'Infyta', openGraph: { siteName: 'Infyta', type: 'website', locale: 'en_US' }, twitter: { card: 'summary_large_image' }, robots: { index: true, follow: true } }`.
- `pageMetadata` repeats `siteName`, `type`, `locale` and `card` in every return. Next.js merges `openGraph`/`twitter` shallowly, so a page-level object replaces the layout's.

`jsonld.js` LocalBusiness contents:
- `name`, `url`, `logo` and `image` (both `absoluteUrl(site.logo)`), `description` (home description), `telephone`, `email` (`primaryEmail(s)`), `address`, `openingHoursSpecification` and `areaServed`.
- `contactPoint`: `[{'@type':'ContactPoint', telephone, email, contactType:'customer service', areaServed:'BD', availableLanguage:['en','bn']}]`.
- `hasOfferCatalog`: `{'@type':'OfferCatalog', name:'IT services', itemListElement: svc.map(x => ({'@type':'Offer', itemOffered: {'@id': `${SITE_URL}/services/${x.slug}#service`}}))}`.
- `geo` only when `s.geo`; `sameAs` only when `s.socials.length`.

`serviceSchema` adds `serviceType: name` and `areaServed` (same as business). `serializeJsonLd` = `JSON.stringify(data).replace(/</g, '\\u003c')`.

`llms.txt` layout follows spec §5.7:
- The summary blockquote uses `pages.home.description`.
- "Key facts" lists address, phone, email(s), hours and area served (Dhaka, Bangladesh).
- `## Services` has one line per service, using `summary`.
- `## Company` links About and Team; `## Contact` links Contact.

- [ ] **Step 4: Run `npm test`**

Expected: all unit tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content src/lib tests/unit package.json
git commit -m "feat: add site content data and SEO helpers"
```

---

### Task 2: Replace Vite with Next.js static export

All routes render with today's visuals, real links, the new NAP, and hydration-safe components.

**Files:**
- Delete: `index.html`, `vite.config.js`, `vercel.json`, `public/vite.svg`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/sections/Stats.jsx`, `src/pages/` (all), `src/assets/` (after moving images)
- Create: `next.config.mjs`, `jsconfig.json` (`{"compilerOptions":{"baseUrl":".","paths":{"@/*":["src/*"]}}}`), `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.jsx`, `src/app/globals.css`, `src/app/page.jsx`, `src/app/not-found.jsx`, `src/app/about/page.jsx`, `src/app/team/page.jsx`, `src/app/contact/page.jsx`, `src/app/services/page.jsx`, `src/app/services/[slug]/page.jsx`, `src/views/*.jsx` (6 views), `src/components/FloatingOrbs.jsx`, `src/components/ServiceIcon.jsx`, `public/images/...` (moved images)
- Modify: `package.json`, `tailwind.config.js` (content glob `./src/**/*.{js,jsx}`), `.gitignore` (add `.next/`, `out/`), `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/ServiceCard.jsx`, `src/sections/Hero.jsx`, `src/sections/Services.jsx`, `src/sections/CTA.jsx`
- Test: `tests/build/helpers.mjs`, `tests/build/routes.test.mjs`, `tests/unit/render-purity.test.mjs`

**Interfaces:**
- Consumes: everything from Task 1.
- Produces:
  - `tests/build/helpers.mjs` exports `OUT` (absolute path of `out/`), `fileForPath(path)` (`'/'` → `out/index.html`, else `out/<path>.html`), `loadPage(path) → {html, doc}`, `allHtmlFiles() → string[]`, `jsonLdBlocks(doc) → object[]`, and `textOf(doc) → string` (decoded text of `<main>`). Parse with `parse(html, { blockTextElements: { script: true, style: false } })` so script text survives.
  - `ServicePageView({ service })` is the client template, laid out like today's `SoftwareDevelopment.jsx`. Its sections are hero (`<h1>` = `service.name`, subtitle `heroSubtitle`), overview paragraphs, included list, approach list, "Technologies & Certifications" from `expertise` filtered by `expertiseKeys`, FAQs, related links and a CTA. Empty arrays render nothing.
  - `FloatingOrbs({ count, opacityClass })` is a client component with a fixed, module-level array of 8 `{size, left, top, duration}` entries and no randomness.
  - `ServiceIcon({ slug, className })` maps slug to react-icon: `FaCode`, `FaNetworkWired`, `FaHeadset`, `FaVideo`, `FaServer`.
  - `ServiceCard({ service })` keeps today's card look and is the whole card as a `next/link` to `/services/<slug>`. It shows the gradient bar from `service.color`, the `ServiceIcon`, `service.name`, `service.summary` and "Learn more". The services index (Task 2) and the related services (Task 4) use it.

- [ ] **Step 1: Write the failing tests**

`tests/unit/render-purity.test.mjs`: walk `src/**/*.{js,jsx}` and assert no file contains `Math.random(` or `Date.now(`. Also assert `existsSync('src/pages') === false`.

`tests/build/routes.test.mjs`:
```js
// for every path in allPaths(): existsSync(fileForPath(path))
// existsSync(join(OUT, '404.html'))
// every <a href^="/"> in every out/*.html (strip #/?): allPaths() includes it OR existsSync(join(OUT, href))
// every tel: href === 'tel:+8801318121558'; every mailto: href is in publicEmails().map(e => 'mailto:' + e)
// on '/', the <nav> element contains a[href="/services"] and a[href="/services/<slug>"] for all 5 slugs
// on '/', a[href="/contact"] whose text includes 'Get Started' exists
// no <button> in any page contains an <a>
// every page's decoded text (doc.textContent) includes site.address.display and site.phone.display
// no page html/text includes any of: 'Lalbagh','Rasulbagh','976843','331586','training-certification','Training & Certification'
// if (!site.domainEmailActive) no out/ file (html, txt, xml) includes 'info@infyta.com'
```
Write these as real assertions with descriptive test names, one `test()` per comment line group.

- [ ] **Step 2: Run `npm test`**

Expected: `render-purity` FAILS (Math.random in Footer/About/Contact/Team; `src/pages` exists).

- [ ] **Step 3: Swap the toolchain**

- `npm uninstall vite @vitejs/plugin-react-swc react-router-dom @tailwindcss/vite eslint-plugin-react-refresh`.
- `npm install next@latest react@latest react-dom@latest`.
- `npm install -D eslint-config-next@latest node-html-parser`.
- Write `next.config.mjs` with exactly `{ output: 'export', images: { unoptimized: true }, trailingSlash: false, reactStrictMode: true }`.
- Write `postcss.config.mjs` (`tailwindcss`, `autoprefixer`).
- For `eslint.config.mjs`, use the flat config that `create-next-app` generates for the installed Next version. Ignore `out/` and `.next/`.
- Set the scripts listed in "File Structure".

- [ ] **Step 4: Move files and images**

- `git mv` the logo to `public/images/infyta-logo.png`.
- Move the hero images to `public/images/hero/{team,data,developer,network,padlock,holographic}.webp`.
- Move the advisor photo to `public/images/team/chief-advisor.webp`.
- Move `src/index.css` to `src/app/globals.css` and keep the Swiper CSS imports only there. Remove the duplicate imports from `Hero.jsx`.
- Delete the files listed above.

- [ ] **Step 5: Build the app shell and routes**

`layout.jsx` is a server component:
- `<html lang="en"><body>`, then `<Navbar/>`, `<main>{children}</main>`, `<Footer/>`.
- Imports `globals.css`.
- Placeholder `export const metadata = rootMetadata`.

Each `page.jsx` is a server component that renders its view.

`services/[slug]/page.jsx`:
- `export const dynamicParams = false`.
- `export function generateStaticParams() { return services.map(s => ({ slug: s.slug })) }`.
- The page is `async` and awaits `params`, because `params` is a Promise in current Next.

Views and components:
- **Views:** `src/pages/*.jsx` move to `src/views/*View.jsx` with `"use client"`. The services index view renders `services` through `ServiceCard` and `ServiceIcon`.
- **Client directive:** add `"use client"` to every component that uses framer-motion, Swiper, hooks or handlers.
- **Links:** replace `react-router-dom` `Link to=` with `next/link` `Link href=`.

- [ ] **Step 6: Apply the link, NAP and hydration fixes from spec §5.4 and §5.8**

Navbar:
- The submenu shows "All Services" (`/services`) followed by the 5 services from `services.js`.
- "Get Started" and the mobile "Contact Us" become `<Link href="/contact">`.
- The logo is `<img src="/images/infyta-logo.png" width height alt="Infyta">` wrapped in a Link to `/`.

Footer:
- The services column lists all 5 services.
- Contact items: `tel:` (site phone), `mailto:` (`primaryEmail()`), the address linking to `site.mapsUrl`, and hours.
- Social icons render only from `site.socials`; none today.
- The year is in `<span suppressHydrationWarning>`.
- Orbs come from `<FloatingOrbs>`.

Home `sections/Services.jsx`:
- 5 cards from `services.js`, each a `Link` to `/services/<slug>`.
- "Explore All Services" becomes `<Link href="/services">`.

CTA buttons become links:
- Hero: "Get Started" → `/contact`, "Explore Solutions" → `/services`.
- CTA section: both buttons → `/contact`.
- About: "View Our Team" → `/team`. Remove the `<button>` wrapper.
- Services index: "Get a Free Consultation" → `/contact`.
- Service template: "Get Started Today" → `/contact`.

Keep the existing classes on these links, and wrap them in `motion.div` where hover effects need it.

ContactView:
- Address in `<address>`.
- Phone as a `tel:` link.
- Emails from `publicEmails()` as `mailto:` links.
- Hours from `site.hours.display`.
- Map iframe `src={site.mapEmbedUrl}`.

TeamView:
- Data from `team.js` and `expertise.js`.
- Delete `AbstractAvatar` and the commented-out co-founder block.
- Fix `clNoassName`.

Background orbs in About, Contact and Team use `<FloatingOrbs>`.

`not-found.jsx` shows a heading "Page not found" and links to `/` and `/services`, in site styling.

- [ ] **Step 7: Run the checks**

Run `npm test`. Expected: PASS.

Run `npm run build && npm run test:build`. Expected: build succeeds; `out/` holds 10 route files plus `404.html`; all build tests PASS.

Run `npm run lint`. Expected: no errors.

- [ ] **Step 8: Browser check**

Run `npm run build && npx wrangler pages dev out`. Open every route with the DevTools console open.

Expected:
- Zero hydration warnings or errors.
- Pages look like the current Vite build (run `git stash`/a second checkout of `master` with `npm run dev` for side-by-side if needed).
- The nav dropdown and mobile menu work.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: migrate from Vite SPA to Next.js static export"
```

---

### Task 3: Metadata, JSON-LD and crawler files

**Files:**
- Create: `src/components/JsonLd.jsx`, `src/app/sitemap.js`, `src/app/robots.js`, `src/app/llms.txt/route.js`, `scripts/make-brand-images.mjs`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`, `src/app/opengraph-image.alt.txt`
- Modify: `src/app/layout.jsx`, every `src/app/**/page.jsx`, `src/app/not-found.jsx`
- Test: `tests/build/seo.test.mjs`

**Interfaces:**
- Consumes: `rootMetadata`, `pageMetadata`, all `jsonld.js` builders, `ALLOWED_CRAWLERS`, `buildLlmsTxt`, `pages`, `services`, `allPaths`, `absoluteUrl`.
- Produces: `JsonLd({ data })` (server component). `data` is an object or an array; it renders one `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }} />` per item.

- [ ] **Step 1: Write the failing build test `tests/build/seo.test.mjs`**

Expected title for each page: `p.absoluteTitle ? p.title : `${p.title} | Infyta``. For services, the title is `${s.metaTitle} | Infyta` and the description is `s.metaDescription`.

On every route in `allPaths()`, assert:
- `<html lang="en">` and exactly one `<h1>`.
- The `<title>` text equals the expected title.
- `meta[name=description]` equals the expected description.
- `link[rel=canonical]` normalizes (`new URL(x).href`) to `new URL(absoluteUrl(path)).href`.
- `og:url` matches the canonical, and `og:title` is present.
- `og:site_name` is `Infyta`.
- `og:image` exists and starts with `https://infyta.com/`.
- `twitter:card` is `summary_large_image`.
- `link[rel=icon]` exists.
- Every ld+json block parses.
- One block has `@graph` containing `LocalBusiness` with `telephone === '+8801318121558'`.

Per route, assert:
- **Every route except `/`:** a `BreadcrumbList` whose last item `item` equals `absoluteUrl(path)`.
- **Each service route:** a `Service` with `@id === absoluteUrl(path) + '#service'`.
- **`/services`:** an `ItemList` with 5 elements.
- **`/team`:** a `Person` named `Md. Arif`.
- **`/about`:** an `AboutPage`.
- **`/contact`:** a `ContactPage`.

Crawler and 404 files:
- `out/404.html` has `meta[name=robots]` content including `noindex`.
- `out/sitemap.xml` has exactly 10 `<loc>`, whose normalized set equals `allPaths().map(absoluteUrl)` normalized.
- `out/robots.txt`:
  - has a `User-Agent: <ua>` line, case-insensitive, for each `ALLOWED_CRAWLERS` entry, plus `User-Agent: *`;
  - has no line matching `/^Disallow:\s*\/\s*$/m`;
  - contains `Sitemap: https://infyta.com/sitemap.xml`.
- `out/llms.txt` equals `buildLlmsTxt()`.

- [ ] **Step 2: Run `npm run build && npm run test:build`**

Expected: `seo.test.mjs` FAILS (titles, canonical, JSON-LD and files missing).

- [ ] **Step 3: Wire the metadata**

Layout:
- `export const metadata = rootMetadata`.
- `export const viewport = { themeColor: '#1f2c62' }`.
- `<JsonLd data={businessGraph()} />` inside `<body>`.

Each static page exports `metadata = pageMetadata(pages.<key>)`.

`services/[slug]/page.jsx`:
- `export async function generateMetadata({ params })` awaits `params`, then returns `pageMetadata({ path, title: s.metaTitle, description: s.metaDescription })`.

`not-found.jsx`:
- `export const metadata = { title: 'Page not found', robots: { index: false, follow: true } }`.

- [ ] **Step 4: Add the per-page JSON-LD**

Place a `<JsonLd data={[...]}/>` in each page as follows.

| Route | `data` array |
|-------|--------------|
| `/` | `webPage` |
| `/services` | `webPage`, `breadcrumbList(Home, Services)`, `serviceItemList()` |
| Service pages | `webPage`, `breadcrumbList(Home, Services, name)`, `serviceSchema(s)`, plus `faqPage(s.faqs)` only when `s.faqs.length` |
| `/about` | `webPage` with `type: 'AboutPage'`, breadcrumb |
| `/team` | `webPage`, breadcrumb, `personSchema(chiefAdvisor)` |
| `/contact` | `webPage` with `type: 'ContactPage'`, breadcrumb |

- [ ] **Step 5: Add the crawler files**

Each of `sitemap.js`, `robots.js` and `llms.txt/route.js` starts with `export const dynamic = 'force-static'`.

- **`sitemap.js`:** returns `allPaths().map(p => ({ url: absoluteUrl(p), lastModified: new Date() }))`.
- **`robots.js`:** `rules` is `[{ userAgent: '*', allow: '/' }, ...ALLOWED_CRAWLERS.map(ua => ({ userAgent: ua, allow: '/' }))]`, with `sitemap: 'https://infyta.com/sitemap.xml'` and `host: 'https://infyta.com'`.
- **`llms.txt/route.js`:** `export function GET()` returns `new Response(buildLlmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })`.

- [ ] **Step 6: Write `scripts/make-brand-images.mjs` (sharp; `npm install -D sharp`) and run it once**

Outputs:
- `src/app/icon.png`: 512×512, the logo centred on a transparent background.
- `src/app/apple-icon.png`: 180×180, the logo on `#1f2c62`.
- `src/app/opengraph-image.png`: 1200×630. Gradient from `#1f2c62` to `#3ac1c2`, the logo, the text "Infyta" and "IT Solutions in Dhaka, Bangladesh" in white, rendered from an SVG overlay.
- `opengraph-image.alt.txt` contains `Infyta – IT Solutions in Dhaka, Bangladesh`.

Commit the generated images.

- [ ] **Step 7: Run the checks**

Run `npm test && npm run build && npm run test:build && npm run lint`. Expected: all PASS.

Paste the built HTML of `/`, one service page and `/team` into https://validator.schema.org. Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add metadata, JSON-LD, sitemap, robots.txt, llms.txt and brand images"
```

---

### Task 4: Service, home and About content

**Files:**
- Modify: `src/content/services.js`, `src/content/pages.js` (`homeIntro`), `src/sections/Services.jsx` (render `homeIntro`), `src/views/AboutView.jsx` ("Infyta at a glance"), `src/views/ServicePageView.jsx` (FAQ markup)
- Create: `docs/review-list.md`
- Test: `tests/unit/content-quality.test.mjs`, `tests/build/content.test.mjs`

**Interfaces:**
- Consumes: the `services` shape (Task 1), `ServicePageView` (Task 2), `faqPage` wiring (Task 3).
- Produces: `homeIntro` (string) and filled `services[].{overview, included, approach, faqs, related}`.

- [ ] **Step 1: Write the failing tests**

`tests/unit/content-quality.test.mjs`. For each service:
- `overview.length === 2`; `included.length` is between 4 and 6; `approach.length === 4`; `faqs.length` is between 4 and 6.
- Every FAQ answer is 2–4 sentences (count `/[.!?](\s|$)/g` matches).
- `related` is 2 distinct valid slugs, not its own.

`homeIntro` starts with `'Infyta is an IT solutions company in Azimpur, Dhaka, Bangladesh.'`.

Across all string values in `services.js` plus `homeIntro`, none matches either of these:
- `/\b\d+\s*\+/`
- `/\b(the best|#1|number one|award|leading|guarantee[ds]?|24\/7|clients served|projects completed|years of experience)\b/i`

`tests/build/content.test.mjs`:
- Each service page's `textOf(doc)` has ≥ 500 words.
- Each page's HTML text includes every FAQ question and answer for that service. This proves collapsed `<details>` content is in the HTML.
- The `/` text includes `homeIntro`.
- The `/about` text includes `Infyta at a glance`, `site.address.display`, `site.phone.display` and `primaryEmail()`.
- Each service page has `a[href="/services/<related slug>"]` for both related slugs.

- [ ] **Step 2: Run `npm test`**

Expected: `content-quality` FAILS (empty FAQs, related and intro).

- [ ] **Step 3: Write the content in `services.js` and `homeIntro`**

Follow spec §5.8 and the Global Constraints sourcing rules:
- Each service needs 2 overview paragraphs (~120–180 words total), 4–6 included items, 4 approach steps, 4–6 FAQs a Dhaka business would ask, and 2 related slugs.
- Draw technologies and certifications from `expertise.js`.
- Answers must stand alone. Example question: "Do you install CCTV for offices in Dhaka?"
- `homeIntro` is 2–3 sentences: what Infyta is, where (Azimpur, Dhaka), the 5 services, and who it serves.

Record anything you wanted to claim but could not source in `docs/review-list.md` under "Wanted but unsourced".

- [ ] **Step 4: Render the new content**

- `ServicePageView`: FAQs render as `<details><summary>{question}</summary><p>{answer}</p></details>`, styled to match the page. Related services render as two `ServiceCard`s.
- `Services.jsx` (home): `homeIntro` goes in a `<p>` under the section heading.
- `AboutView`: add an "Infyta at a glance" block between Mission/Vision and Values, in the existing card style. It lists what Infyta does, the address, the 5 services as links, hours, phone and email.

- [ ] **Step 5: Create `docs/review-list.md`**

It has three sections:
1. "Content to review": links to each service page section, `homeIntro` and the About block.
2. "Wanted but unsourced".
3. "Visible speed changes" (left empty for Task 5).

- [ ] **Step 6: Run `npm run check`**

Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add service page content, FAQs, home intro and About facts"
```

---

### Task 5: Performance and image delivery

**Files:**
- Create: `scripts/resize-images.mjs`, `src/components/MotionProvider.jsx`, `public/images/hero/*-{640,1280,1920}.webp`, `public/images/team/chief-advisor-{320,640}.webp`
- Modify: `src/sections/Hero.jsx`, `src/components/FloatingOrbs.jsx`, `src/app/layout.jsx`, every view/section whose `<h1>` (or an ancestor) starts at `opacity: 0`, any `<img>` missing dimensions, `docs/review-list.md`
- Test: `tests/build/performance.test.mjs`

**Interfaces:**
- Consumes: `FloatingOrbs` (Task 2), the views.
- Produces: `MotionProvider({ children })`, a client component that wraps children in framer-motion `<MotionConfig reducedMotion="user">`, used in `layout.jsx` around `<main>`.

- [ ] **Step 1: Write the failing build test `tests/build/performance.test.mjs`**

On every route:
- Walk from the `<h1>` up through all its ancestors. None has a `style` matching `/opacity:\s*0(?![.\d])/`.
- Every `<img>` has numeric `width` and `height` attributes.

On `/`:
- Exactly one `img[fetchpriority="high"]`.
- Its `srcset` contains `640w`, `1280w` and `1920w`.
- It has a `sizes` attribute.
- No other `<img>` on the page has `loading="eager"`.

- [ ] **Step 2: Run `npm run build && npm run test:build`**

Expected: `performance.test.mjs` FAILS.

- [ ] **Step 3: Generate the image variants**

Write `scripts/resize-images.mjs` (sharp) and run it:
- Each hero image → widths 640, 1280 and 1920, WebP quality 75.
- Advisor photo → widths 320 and 640.
- Never upscale; print each output's dimensions.

Commit the outputs.

- [ ] **Step 4: Rework the hero (trade-off 1)**

- The server HTML renders only the first slide as a static `<img>`:
  - `srcSet` with the 3 widths, `sizes="100vw"`, `fetchPriority="high"`, `loading="eager"`;
  - explicit `width`/`height`.
- After `window` `load` plus `requestIdleCallback` (fall back to `setTimeout(…, 200)`), mount the Swiper with all 6 slides. Slides 2–6 use `loading="lazy"`.
- Pagination uses the Swiper instance from `onSwiper`, not `document.querySelector`.
- The hero heading animates `y` only.

- [ ] **Step 5: Orbs and reduced motion (trade-offs 2–3)**

- The `FloatingOrbs` wrapper gets `hidden md:block motion-reduce:hidden`.
- Add `MotionProvider` to the layout.

- [ ] **Step 6: Make every page's `<h1>` visible in the HTML**

Remove `opacity: 0` from the `initial` prop of every page's `<h1>` and its ancestors. Keep the `y` motion.

Add `width`/`height` to any image that is missing them. Team uses a `srcSet` of the advisor variants.

- [ ] **Step 7: Run the checks**

Run `npm run check`. Expected: all PASS.

- [ ] **Step 8: Lighthouse**

Run `npx wrangler pages dev out --port 8788`, then for each of `/`, `/services/network-infrastructure` and `/contact` run:

```bash
npx lighthouse http://localhost:8788<path> --form-factor=mobile --only-categories=performance,seo,accessibility --quiet --chrome-flags="--headless" --output=json --output-path=./lh.json
```

Read `categories.*.score` from `lh.json`. Expected: performance ≥ 0.90, seo = 1.00, accessibility ≥ 0.90.

If performance is below 0.90, apply spec §5.9 trade-off 4 (`LazyMotion` + `m`, or CSS for simple entrance fades), then trade-off 5, re-running after each. Fix accessibility failures that Lighthouse names. Delete `lh.json`.

- [ ] **Step 9: Browser check and record the changes**

Do the same console and hydration check as Task 2 Step 8. Also check the home page at 390 px width and at 1440 px.

Append every visible change to `docs/review-list.md` under "Visible speed changes".

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "perf: responsive hero images, deferred slider, reduced motion"
```

---

### Task 6: Cloudflare Pages files, runbook and final verification

**Files:**
- Create: `public/_redirects`, `public/_headers`, `docs/deploy-cloudflare.md`
- Modify: `README.md` (replace the Vite template text)
- Test: `tests/build/cloudflare.test.mjs`

**Interfaces:**
- Consumes: the complete `out/` from Tasks 2–5.
- Produces: the deployable site and the owner's runbook.

- [ ] **Step 1: Write the failing build test `tests/build/cloudflare.test.mjs`**

`out/_redirects`, with whitespace collapsed, has exactly these 3 lines:
```
/services/training-certification /services 301
/services/mobile-applications /services/software-development 301
/services/cloud-services /services/server-cloud-solutions 301
```

`out/_headers` contains each of these blocks verbatim:
- `https://:project.pages.dev/*` with `X-Robots-Tag: noindex`
- `/_next/static/*` with `Cache-Control: public, max-age=31536000, immutable`
- `/*` with `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`

Also assert every redirect target is in `allPaths()`.

- [ ] **Step 2: Run `npm run build && npm run test:build`**

Expected: `cloudflare.test.mjs` FAILS.

- [ ] **Step 3: Add `public/_redirects` and `public/_headers`**

Use exactly the content from spec §5.2 and §5.10.

- [ ] **Step 4: Run `npm run check`**

Expected: all PASS.

- [ ] **Step 5: Local Cloudflare checks**

Run `npx wrangler pages dev out --port 8788`, then check each URL with `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" <url>`:

| URL | Expected |
|-----|----------|
| `/about` | 200 |
| `/about.html` | 30x to `/about` |
| `/about/` | 30x to `/about` |
| `/services/training-certification` | 301 to `/services` |
| `/services/mobile-applications` | 301 to `/services/software-development` |
| `/services/cloud-services` | 301 to `/services/server-cloud-solutions` |
| `/does-not-exist` | 404, and the body contains "Page not found" |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | 200 |

`curl -sI /_next/static/<any built file>` shows `cache-control: public, max-age=31536000, immutable`.

- [ ] **Step 6: Write `docs/deploy-cloudflare.md`**

Write it as numbered owner steps with exact values, covering spec §5.10, §5.11 and the post-launch checks in §6:

1. Create the Pages project:
   - Connect GitHub `MdMirzaShihab/infyta-frontend`, production branch `master`, build command `npm run build`.
   - Output directory `out`, env `NODE_VERSION=22`.
   - Deploy from `nextjs-seo-migration` as a preview first.
2. Preview checks: the curl checks above against the `*.pages.dev` URL, plus `curl -sI <pages.dev URL>` showing `x-robots-tag: noindex`.
3. Owner content review using `docs/review-list.md`, then merge to `master`.
4. Custom domains: add `infyta.com` and `www.infyta.com` in the Pages project. These replace the A records pointing to `103.65.138.26`; the zone is already on Cloudflare.
5. Domain rules:
   - A Redirect Rule sends `www.infyta.com/*` → `https://infyta.com/${1}` with 301, preserving the query string.
   - Turn on "Always Use HTTPS".
6. Bot and AI settings:
   - Set AI crawler blocking / AI Crawl Control to allow.
   - Turn off the Cloudflare-managed robots.txt, Bot Fight Mode and any WAF/challenge rules.
   - Turn on Crawler Hints.
7. Optional: enable Email Routing to forward `info@infyta.com` → `infytaofficial@gmail.com`. Send a test email. Then set `domainEmailActive: true` in `src/content/site.js`, run `npm run check`, commit and push.
8. If a Vercel project exists for this repo, delete it or disconnect its Git integration.
9. Post-launch checks:
   - `curl -A "<UA>" https://infyta.com/` returns 200 with page content for each of `GPTBot`, `ClaudeBot`, `PerplexityBot` and `Googlebot`.
   - `curl https://infyta.com/robots.txt` matches the built file exactly.
   - `www` → apex and `http` → `https` both return 301.
10. Search setup:
    - Google Search Console: domain property via DNS TXT, submit `https://infyta.com/sitemap.xml`, request indexing for `/` and the 5 service pages.
    - Bing Webmaster Tools: import from Search Console and submit the sitemap.
11. Google Business Profile:
    - Use the exact NAP and hours, with website `https://infyta.com`.
    - Afterwards, add the pin coordinates to `site.geo`, the profile URL and real social URLs to `site.socials`, and the postal code if known. Then rebuild.
12. Keep the same NAP on Facebook, LinkedIn and directories.

- [ ] **Step 7: Rewrite `README.md`**

Cover:
- What the site is.
- Scripts: `dev`, `build`, `test`, `test:build`, `check`, `preview`.
- Where content lives (`src/content/`).
- That `out/` is deployed to Cloudflare Pages (link `docs/deploy-cloudflare.md`).
- The `domainEmailActive` switch.

- [ ] **Step 8: Final run of `npm run check`**

Expected: all PASS. Run `git status`. Expected: clean apart from the files in this task.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Cloudflare Pages redirects, headers and deploy runbook"
```
