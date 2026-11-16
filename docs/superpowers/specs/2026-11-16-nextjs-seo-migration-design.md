# Infyta website: Next.js migration for local and AI search (Design)

Date: 2026-11-16
Status: Approved by owner 2026-11-16
Repo: `infyta-frontend` (currently Vite 6 + React 19 + react-router-dom 7, ~2,500 lines JSX)

## 1. Intent

Infyta is an IT solutions company in Azimpur, Dhaka. The site exists so that
businesses in Dhaka looking for IT services find Infyta and get in touch.

Today the site cannot do that job:

- It is a client-rendered SPA. Every URL returns an empty `<div id="root">` and the title
  `infyta`. Google has to execute JS to see anything, and the AI crawlers behind ChatGPT,
  Claude and Perplexity mostly do not execute JS, so to them the site is blank.
- `https://infyta.com` currently serves an "Index of /" directory listing from another host,
  not this site.
- 5 of 7 service pages are placeholders (they render the component name and nothing else).

The owner wants the site migrated to Next.js, deployed on Cloudflare Pages, and optimized for
(a) local search in Dhaka on Google and (b) being understood and recommended by AI assistants
(Gemini, ChatGPT, Claude and similar).

## 2. Goals, non-goals, anti-goals

### Goals
1. Every page is served as complete, pre-rendered HTML: unique title, meta description,
   canonical URL, Open Graph tags, one `<h1>`, and all body text present without JavaScript.
2. Strong local signals for Dhaka: consistent business name, address, phone and hours on every
   page, plus `LocalBusiness` structured data.
3. Machine-readable site for AI tools: JSON-LD on every page, `robots.txt` that explicitly allows
   AI crawlers, `sitemap.xml`, `llms.txt`, and plain factual copy that answers "who/what/where".
4. Real content on all 5 service pages, with FAQs written as direct answers.
5. Good Core Web Vitals on mobile (LCP < 2.5 s, CLS < 0.1, Lighthouse SEO = 100,
   Performance >= 90 on a preview deploy).
6. The site keeps its current look and feel. **Where look and speed conflict, speed wins**
   (owner decision); the allowed trade-offs are listed in section 5.9.

### Non-goals (this migration)
- Bangla language version.
- Making the contact form send messages (it does nothing today; stays visual-only; follow-up).
- Blog, CMS, analytics, TypeScript conversion, visual redesign.

### Anti-goals (failure even if it "works")
- Any page whose main text only appears after JavaScript runs.
- Invented facts: client counts, years in business, testimonials, prices, awards. Only use facts
  already on the site or supplied by the owner. (The "28+ years" on the Team page belongs to
  Md. Arif, not to the company.) Being in the code is not proof: the commented-out
  `src/sections/Stats.jsx` placeholder numbers must not be used. The Stats section is deleted.
  The owner has confirmed that Infyta's team includes certified engineers and instructors, so the
  technologies and certifications in the Team page's "Core Expertise" data may be presented as
  the team's. No individual other than Md. Arif may be named.
- Keyword stuffing, hidden text, doorway pages.
- Breaking existing URLs without a 301 redirect.
- Cloudflare settings that block or challenge Googlebot, Bingbot or AI crawlers.
- Hydration errors in the browser console.

## 3. Constraints

- **Hosting: Cloudflare Pages, static files only.** No server runtime. (Decided by owner.)
- **Framework: Next.js App Router** with `output: 'export'`. (Next.js decided by owner; static
  export is the consequence of Pages, see Approaches.)
- **Language: JavaScript/JSX**, as today.
- **Keep existing URL paths** (see section 5.2).
- Node 22 locally and in the Pages build.

## 4. Approaches considered

| # | Approach | Trade-offs | Verdict |
|---|----------|-----------|---------|
| 1 | **Next.js static export (`output: 'export'`) on Cloudflare Pages** | Pure HTML on Cloudflare's CDN: fastest TTFB, nothing for crawlers to execute, no runtime to maintain. Loses on-demand `next/image` resizing and server code (server actions, route handlers at request time). | **Picked.** The site is 10 pages of fixed content; it needs nothing a server provides. |
| 2 | Next.js on Cloudflare Workers via OpenNext | Full Next.js features (SSR, ISR, image optimization, server actions). More moving parts and cost; targets Workers, not Pages. `@cloudflare/next-on-pages` was archived Sept 2025. | Rejected: owner chose Pages, and no server features are needed. |
| 3 | Keep Vite; React Router v7 framework mode with prerender | Smallest diff. Sitemap, metadata, JSON-LD plumbing all DIY. | Rejected: owner asked for Next.js. |
| 4 | Next.js on Vercel (full runtime) | Simplest Next.js hosting. | Rejected: owner chose Cloudflare Pages. |

## 5. Design

### 5.1 Stack and build output

- Latest stable Next.js (App Router), React 19, `output: 'export'`, `images: { unoptimized: true }`,
  `trailingSlash: false`. Check that major version's static-export docs for unsupported features
  before starting.
- Keep: `framer-motion`, `swiper`, `react-icons`, Tailwind **v3** with PostCSS (class names
  unchanged, lowest risk). Remove the unused `@tailwindcss/vite` (v4) package.
- Remove: `vite`, `@vitejs/plugin-react-swc`, `react-router-dom`, `eslint-plugin-react-refresh`,
  `index.html`, `src/main.jsx`, `src/App.jsx`, `vite.config.js`, `vercel.json`,
  `public/vite.svg`. Switch ESLint to `eslint-config-next`.
- `package.json` scripts: `dev: next dev`, `build: next build`, `lint: next lint` or `eslint .`,
  `preview: npx wrangler pages dev out` (or any static server on `out/`).
- `tailwind.config.js` `content` globs must cover `src/app/**` and `src/content/**`.
  Use `.mjs` for PostCSS/Tailwind config if Next complains about ESM with `"type": "module"`.
- Build output `out/` contains one HTML file per route, `404.html`, `sitemap.xml`, `robots.txt`,
  `llms.txt`, icons and the OG image.

### 5.2 Routes and URLs

Canonical origin: **`https://infyta.com`** (apex, no `www`, no trailing slash).

| Path | Source | Notes |
|------|--------|-------|
| `/` | `src/app/page.jsx` | |
| `/services` | `src/app/services/page.jsx` | |
| `/services/[slug]` | `src/app/services/[slug]/page.jsx` | `generateStaticParams` from `services.js`, `dynamicParams = false` |
| `/about` | `src/app/about/page.jsx` | |
| `/team` | `src/app/team/page.jsx` | |
| `/contact` | `src/app/contact/page.jsx` | |
| 404 | `src/app/not-found.jsx` | Exported as `404.html`. Required: without it Cloudflare Pages treats the site as an SPA and returns `index.html` with 200 for every unknown path. |

**Final service list (5):**

| Slug | Name | Absorbs |
|------|------|---------|
| `software-development` | Software Development | Mobile Applications |
| `network-infrastructure` | Network Infrastructure | |
| `it-support-consultancy` | IT Support & Consultancy | |
| `security-surveillance` | Security & Surveillance | |
| `server-cloud-solutions` | Server & Cloud Solutions | Cloud Services |

Training & Certification is removed (owner removed it from the nav in commit `0075bd2`; the
route and the `/services` card remained by mistake).

**301 redirects** (`public/_redirects`):

```
/services/training-certification  /services                          301
/services/mobile-applications     /services/software-development     301
/services/cloud-services          /services/server-cloud-solutions   301
```

### 5.3 Single source of truth for business data

Create `src/content/site.js` (name, legal/alt name, canonical URL, tagline, address parts,
phones in display and E.164 form, emails, opening hours, geo coordinates, social profile URLs,
logo path) and `src/content/services.js` (per service: slug, name, short description, meta title,
meta description, icon, page content, FAQs, related slugs).

Navbar, footer, home service cards, `/services` grid, service pages, sitemap, JSON-LD and
`llms.txt` all read from these. Business name, address and phone must be **character-for-character
identical** everywhere (this is the "NAP consistency" local search depends on), and must match
the Google Business Profile.

Known values:
- Name: `Infyta`
- Address (owner-supplied 2026-11-16; **replaces** the `184/5/3 Lalbagh Road, Rasulbagh,
  Dhaka-1211` address currently in `Contact.jsx`, `Footer.jsx` and the Contact map embed):
  `4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh`
  (street `4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur`, locality `Dhaka`, country `BD`;
  postal code: see open items). Use this exact spelling everywhere, including the Google
  Business Profile. The Contact page map embed must point at this address (or at the Business
  Profile once it exists).
- Phone (owner-supplied 2026-11-16; the **only** published number): display `+880 1318 121558`,
  `tel:`/JSON-LD form `+8801318121558`. It **replaces** both `+880 1869 976843` and
  `+880 1720 331586`, currently in `Contact.jsx` and `Footer.jsx`; neither old number may appear
  anywhere.
- Emails: **`infytaofficial@gmail.com` is the primary, published address** (owner decision).
  `info@infyta.com` is kept in `site.js` behind a flag (e.g. `domainEmailActive: false`) and is
  not shown anywhere (page text, `mailto:`, JSON-LD, `llms.txt`) until the owner confirms it
  receives mail. Flipping the flag makes it the primary address everywhere in one change.
- Hours: Saturday–Thursday 09:00–18:00, Friday closed
- Tagline: "Limitless Tech Solutions for a Digital World"

### 5.4 Server and client components

- Every `page.jsx` and `layout.jsx` is a **server component**: it exports `metadata` (or
  `generateMetadata`), renders JSON-LD, and renders the page body.
- Anything using `framer-motion`, Swiper, `useState`/`useEffect` or event handlers goes in a
  `"use client"` component. Client components are still pre-rendered to HTML at build time, so
  their text is in the HTML.
- Root layout (`src/app/layout.jsx`): `<html lang="en">`, Navbar, `<main>`, Footer, global CSS,
  site-wide JSON-LD.
- `react-router-dom` `Link to=` becomes `next/link` `Link href=`.

**Hydration-safety rules (must hold, or static export produces console errors):**
- No `Math.random()`, `Date.now()` or `window` reads during render. The floating-orb backgrounds
  in Footer, About, Contact and Team become one shared `FloatingOrbs` client component driven
  by a fixed array of positions/sizes/durations.
- Delete the unused `AbstractAvatar` component and commented-out co-founder block in Team.
- Footer year: render the build year with `suppressHydrationWarning` on that element.

**Above-the-fold visibility rule:** the hero `<h1>` and intro paragraph on each page must not
start at `opacity: 0`. Today they animate in from `opacity: 0`, which puts `style="opacity:0"`
into the static HTML and delays LCP until JS runs. Animate position only (e.g. `y`), or use a
CSS-only fade that does not hide content when JS is absent. Below-the-fold `whileInView`
animations can stay as they are.

### 5.5 Metadata

Root layout `metadata`:
- `metadataBase: new URL('https://infyta.com')`
- `title: { default: <home title>, template: '%s | Infyta' }`
- `openGraph`: `siteName: 'Infyta'`, `type: 'website'`, `locale: 'en_US'`, default image
- `twitter: { card: 'summary_large_image' }`
- `robots: { index: true, follow: true }`
- `icons` from `src/app/icon.png` and `src/app/apple-icon.png` (generated from
  `src/assets/logo/infyta-logo.png`; today's favicon link points at a `/src/...` path that 404s
  in production)
- Theme colour `#1f2c62` via `viewport` export.

Every page sets `title`, `description`, `alternates.canonical` (its own path) and
`openGraph.url`/`title`/`description`. Shared OG image: a static 1200×630
`src/app/opengraph-image.png` (logo, "IT Solutions in Dhaka", brand colours `#1f2c62`,
`#3ac1c2`).

Titles and descriptions (builder may polish wording; keep "Dhaka", keep under ~60 / ~160 chars):

| Path | Title | Description |
|------|-------|-------------|
| `/` | Infyta – IT Solutions Company in Dhaka, Bangladesh (absolute, no template) | Infyta is an IT solutions company in Dhaka offering software development, network setup, servers and cloud, CCTV and IT support for businesses in Bangladesh. |
| `/services` | IT Services in Dhaka | IT services in Dhaka from Infyta: custom software, network infrastructure, IT support, CCTV and access control, and server and cloud solutions. |
| `/services/software-development` | Software Development Company in Dhaka | Custom software, web and mobile app development in Dhaka. Infyta builds secure, scalable applications, databases and integrations for businesses in Bangladesh. |
| `/services/network-infrastructure` | Network Infrastructure & Setup in Dhaka | Network design and installation in Dhaka: cabling, Wi-Fi, MikroTik, Cisco and Fortinet setups by certified engineers (CCNA, MTCNA). |
| `/services/it-support-consultancy` | IT Support & Consultancy in Dhaka | IT support and consultancy for businesses in Dhaka: troubleshooting, maintenance, IT planning and expert advice from Infyta's certified engineers. |
| `/services/security-surveillance` | CCTV, Access Control & Attendance Systems in Dhaka | CCTV installation, access control and biometric attendance systems in Dhaka. Infyta designs and installs security and surveillance systems for businesses. |
| `/services/server-cloud-solutions` | Server & Cloud Solutions in Dhaka | Windows and Linux servers, virtualization (VMware, Hyper-V) and cloud migration to AWS, Azure and Google Cloud for businesses in Dhaka. |
| `/about` | About Infyta – IT Company in Dhaka | Infyta is a Dhaka-based IT company delivering secure, scalable software and infrastructure solutions. Our mission, vision and values. |
| `/team` | Our Team – Certified IT Experts | Meet Infyta's IT experts in Dhaka, led by Chief Advisor Md. Arif: 28+ years in ICT infrastructure, CCNA, MTCNA, MTCRE and MTCSE certified. |
| `/contact` | Contact Infyta – Azimpur, Dhaka | Visit Infyta at Swarnolota, Bottola, Azimpur, Dhaka, or call +880 1318 121558. Open Saturday–Thursday, 9 AM–6 PM. Get a free IT consultation. |

### 5.6 Structured data (JSON-LD)

Render with a small server component `JsonLd` that outputs
`<script type="application/ld+json">` with `JSON.stringify(data).replace(/</g, '\\u003c')`.
Use `@id` references so the entities form one graph.

**Site-wide (root layout), one `@graph`:**
- `LocalBusiness` with `@id: https://infyta.com/#business`: `name`, `url`, `logo`, `image`,
  `description`, `telephone` (primary, E.164), `email`, `address` (`PostalAddress`), `geo`
  (`GeoCoordinates`, see open items), `openingHoursSpecification`
  (`Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday` 09:00–18:00), `areaServed`
  (`City` Dhaka, `Country` Bangladesh), `contactPoint` (the phone, `contactType:
  "customer service"`, `areaServed: "BD"`, `availableLanguage: ["en", "bn"]`), `sameAs` (real
  profile URLs only; omit the property if none), `hasOfferCatalog` listing the 5 services by
  `@id`.
- `WebSite` with `@id: https://infyta.com/#website`, `publisher: {@id: #business}`.

**Per page:**
- Every page: `WebPage` (or `AboutPage` / `ContactPage`) with `url`, `name`, `isPartOf: #website`,
  `about: #business`; `BreadcrumbList` on every page except home.
- Service pages: `Service` with `@id: https://infyta.com/services/<slug>#service`, `name`,
  `serviceType`, `description`, `provider: {@id: #business}`, `areaServed` (Dhaka, Bangladesh),
  `url`; plus `FAQPage` built from the same FAQ data that renders on the page.
- `/services`: `ItemList` of the 5 services.
- `/team`: `Person` for Md. Arif (`jobTitle`, `worksFor: #business`, `knowsAbout`, `image`),
  using only facts already on the page.

FAQ markup will not earn Google rich results (Google limited those to government/health sites in
2023), but it stays valid schema and gives AI tools clean question/answer pairs.

### 5.7 Crawler files

- **`src/app/sitemap.js`**: the 10 canonical URLs with `lastModified` = build date.
- **`src/app/robots.js`**: allow everything for `*`; add explicit allow groups for `Googlebot`,
  `Bingbot`, `Google-Extended`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`,
  `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Applebot`,
  `Applebot-Extended`; `sitemap: https://infyta.com/sitemap.xml`; `host: https://infyta.com`.
- **`llms.txt`** at `/llms.txt`, generated from `site.js` and `services.js` (a static route
  handler with `export const dynamic = 'force-static'`, or a build step that writes
  `public/llms.txt`). Format: `# Infyta`, a one-paragraph blockquote summary (what, where, who
  for), a "Key facts" list (address, phones, email, hours, area served), then `## Services`,
  `## Company` and `## Contact` sections, each a list of `[Page](absolute URL): one line`.

### 5.8 Content work

All copy uses only facts already on the site (services, technologies and certifications listed
on the Team page, contact details) unless the owner supplies more. The builder collects anything
they wanted to say but could not source into a review list for the owner (see section 7).

**Service page template** (one shared client/server template driven by `services.js`, based on
the existing `SoftwareDevelopment.jsx` layout and colours):
1. Hero: `<h1>` = service name; subtitle naming Dhaka/Bangladesh.
2. Overview: 2 short paragraphs (~120–180 words) saying plainly what Infyta does in this area and
   for whom.
3. What's included: 4–6 concrete items (e.g. Network: structured cabling, router/firewall setup
   on MikroTik, Cisco, Fortinet, wireless deployments, VLAN and segmentation, monitoring).
4. Our approach: 4 steps.
5. Technologies & certifications: from the Team page "Core Expertise" data.
6. FAQs: 4–6 questions a Dhaka business would ask, each answered in 2–4 sentences that make sense
   on their own (e.g. "Do you install CCTV for offices in Dhaka?"). Rendered as visible
   `<details>`/accordion content, present in HTML even when collapsed.
7. Related services (2 links) and a CTA linking to `/contact`.

Target 500–800 words per service page.

**Home:** add a short, plain paragraph near the top of the services section that defines the
entity: "Infyta is an IT solutions company in Azimpur, Dhaka, Bangladesh. We provide…". The home
service cards (`src/sections/Services.jsx`) become links to the 5 service pages (today they are
not links, and include a duplicate "Cloud Services" card).

**About:** add an "Infyta at a glance" block of plain facts (what, where, services, hours,
contact).

**Contact:** phones as `tel:` links, emails as `mailto:` links, address in `<address>`, hours as
text. Keep the map embed.

**Footer:** list all 5 services (IT Support is missing today); contact items become `tel:`,
`mailto:` and a Google Maps link instead of `Link to="#"`; social icons use real profile URLs
from `site.js`, or are removed if none exist.

**Navbar:** submenu gets an "All Services" link to `/services` (the index is unreachable from
the nav today); submenu lists exactly the 5 services; "Get Started" and mobile "Contact Us"
become links to `/contact`. Keep the desktop submenu rendered in the HTML (it already is) so
crawlers see the links.

**Buttons that navigate become links:** every "Get Started", "Explore Solutions", "Explore All
Services", "Get a Free Consultation", "Contact Sales", "Get Started Today" and "View Our Team"
becomes a `next/link` to `/contact`, `/services` or `/team` as appropriate (no `<button>`
wrapping a `<Link>`).

**Semantics:** exactly one `<h1>` per page; headings in order; `<header>`/`<nav>`/`<main>`/
`<footer>`; descriptive `alt` text. Fix the `clNoassName` typo in `Team.jsx`.

### 5.9 Images and performance

**Speed wins over visual fidelity (owner decision).** Allowed trade-offs, in the order to try
them until mobile Performance ≥ 90:
1. Hero shows the first slide as a static image; Swiper and the other 5 slides load and start
   only after the page has loaded (e.g. after `load` / `requestIdleCallback`).
2. Floating-orb backgrounds are not rendered below the `md` breakpoint or when
   `prefers-reduced-motion: reduce`; desktop keeps them.
3. All looping animations respect `prefers-reduced-motion`.
4. Trim framer-motion cost (`LazyMotion` + `m` components, or replace simple entrance fades with
   CSS).
5. Simplify or drop individual entrance animations that still cost too much.
Brand colours, layout, typography and section order do not change. Desktop should look the same
as today unless a step above requires otherwise; list every visible change in the review list.

- Hero slider: only the first slide image is high priority (`fetchpriority="high"`,
  `loading="eager"`, preloaded); slides 2–6 `loading="lazy"`. Provide responsive `srcset`
  (e.g. 640/1280/1920 widths) and explicit `width`/`height`. Builder chooses the pipeline:
  pre-generated sizes committed to the repo via a one-off `sharp` script, or
  `next-image-export-optimizer`.
- All other images get explicit dimensions (no CLS).
- Import Swiper CSS once (it is imported in both `index.css` and `Hero.jsx` today).
- Replace `document.querySelector('.swiper').swiper` pagination with a Swiper instance ref.
- No web fonts are used today; keep it that way.

### 5.10 Cloudflare Pages setup

**Who does what:** the owner deploys (decided by owner). The builder delivers the migrated code,
a verified `out/`, and a step-by-step runbook at `docs/deploy-cloudflare.md` covering everything
in this section and the post-launch checks in section 6. The builder runs every check that works
locally (build inspection, Lighthouse against `npx wrangler pages dev out`, schema validation by
pasting built HTML into validator.schema.org); the owner runs the dashboard steps and the
post-deploy checks from the runbook. The owner reviews the new copy (section 7 review list)
before go-live.

**Project:** connect the GitHub repo; production branch `master`; build command `npm run build`;
output directory `out`; env `NODE_VERSION=22`.

**`public/_headers`:**
```
https://:project.pages.dev/*
  X-Robots-Tag: noindex

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```
The `noindex` rule keeps the `*.pages.dev` copy (and preview deploys) out of Google so it
doesn't compete with infyta.com.

**Domain** (public DNS checked 2026-11-16):
- `infyta.com` is **already a Cloudflare zone** (nameservers `jamie`/`nolan.ns.cloudflare.com`),
  so no nameserver move is needed.
- Apex and `www` currently have A records to `103.65.138.26` (the host serving "Index of /").
  Adding `infyta.com` and `www.infyta.com` as Pages custom domains replaces these.
- There is **no MX record**, so `info@infyta.com` most likely does not receive mail today. The
  site publishes `infytaofficial@gmail.com` instead (section 5.3). The runbook includes an
  optional step: enable **Cloudflare Email Routing** on the zone (free; it adds the MX records)
  to forward `info@infyta.com` to `infytaofficial@gmail.com`, send a test message, then flip
  `domainEmailActive` to `true` and redeploy.
- If a Vercel project is still connected to this repo (`vercel.json` suggests one existed),
  delete it or disconnect Git after launch so no client-rendered copy stays live on
  `*.vercel.app`.
- `www.infyta.com` → `https://infyta.com` 301 via a Cloudflare Redirect Rule (path and query
  preserved). `_redirects` cannot do host-level redirects.
- "Always Use HTTPS" on.

**Bot and AI settings (critical for the AI goal):**
- AI crawler blocking ("Block AI bots" / AI Crawl Control): set to allow / do not block.
- Cloudflare-managed `robots.txt` (which prepends AI-bot `Disallow` rules and content signals):
  **off**, so `/robots.txt` serves exactly the file from section 5.7.
- Bot Fight Mode: off. No WAF or challenge rules on the site.
- Crawler Hints: on (sends IndexNow pings to Bing and others when content changes).

URL behaviour to confirm on the preview deploy: `/about` → 200; `/about.html` and `/about/` →
redirect to `/about`; unknown path → `404.html` with status 404.

### 5.11 Off-site checklist (owner tasks, outside the code)

These matter as much as the code for "IT company in Dhaka" searches:

1. **Google Business Profile:** create or claim; exact same name, address, phones and hours as
   `site.js`; website `https://infyta.com`; primary category chosen by the owner (e.g. IT
   services or software company); photos; ask clients for reviews. Then copy the profile's map
   pin coordinates into `site.js` `geo` and add the profile URL to `sameAs`.
2. **Google Search Console:** domain property verified by DNS TXT in Cloudflare; submit
   `sitemap.xml`; request indexing of the home and service pages.
3. **Bing Webmaster Tools:** import from Search Console; submit the sitemap. Bing's index feeds
   ChatGPT search and Copilot.
4. **Consistent listings:** same name/address/phone on Facebook page, LinkedIn page and Bangladeshi
   business directories.

## 6. Acceptance checks

Build (`npm run build`, then inspect `out/`):
- One HTML file per route plus `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt`.
- For each HTML file (script it with `grep`/a small Node script): unique `<title>`, meta
  description, canonical link matching the page URL, exactly one `<h1>`, the page's main body
  text present, at least one `application/ld+json` block that parses as JSON.
- No `opacity:0` inline style on any page's `<h1>`.
- `grep -rE "Lalbagh|1869|976843|1720|331586|info@infyta.com" out/` returns nothing (old
  address, old phones, and the domain email while `domainEmailActive` is `false`). The new
  address and `+880 1318 121558` appear on every page (footer).
- `npm run lint` passes.

Browser (dev and preview):
- No hydration warnings or errors in the console on any page.
- Site looks and animates as before (side-by-side check against the current Vite build), apart
  from the speed trade-offs in section 5.9, each of which is listed in the review list.
- Every nav, footer, card and CTA link resolves; no `<button>` used for navigation.

Preview deploy on Cloudflare Pages:
- Lighthouse mobile: SEO 100, Performance ≥ 90, Accessibility ≥ 90.
- Rich Results Test and validator.schema.org: no errors for `LocalBusiness`, `Service`,
  `BreadcrumbList`, `FAQPage`, `Person`.
- `*.pages.dev` responses carry `X-Robots-Tag: noindex`.
- The 3 redirects return 301; unknown path returns 404.

After go-live on infyta.com:
- `curl -A "GPTBot" https://infyta.com/`, and the same for `ClaudeBot`, `PerplexityBot`,
  `Googlebot`: 200 with page content, no challenge page.
- `curl https://infyta.com/robots.txt` matches section 5.7 exactly (no Cloudflare-managed
  prefix).
- `www` → apex 301; `http` → `https` 301.

## 7. Decisions record

**Decided by the owner:** migrate to Next.js; host on Cloudflare Pages; target local search in
Dhaka; optimize for Google and AI assistants; plan in one session and build in another; the
owner deploys; speed wins over visual fidelity; Infyta's team includes certified engineers and
instructors; `infytaofficial@gmail.com` is the published email until `info@infyta.com` works.

**Calls made in planning (proposed to the owner, not objected to; change if wrong):**
- Static export rather than a server runtime (only fit for Pages).
- English only.
- Draft real content for the 5 placeholder service pages for owner review.
- Consolidate to 5 services; drop Training; fold Mobile Apps into Software Development and Cloud
  Services into Server & Cloud Solutions; 301 the old paths.
- Contact form stays non-functional (follow-up).
- Canonical domain `https://infyta.com`, apex, no trailing slash.
- Stay on JavaScript and Tailwind v3.
- One data-driven service page template.

**Left to the builder:** image pipeline (5.9), component breakdown, exact copy within the rules in
5.8, OG image design within brand colours, whether to use `LazyMotion` to trim framer-motion,
visual treatment of FAQs and the "at a glance" block (must match the existing style).

**Before launch, the builder hands the owner a review list** containing: all new service-page
copy and FAQs, the home/About fact blocks, and any claim the builder wanted to make but could not
source from the site.

## 8. Open items (none block the build)

| Item | Default until the owner supplies it |
|------|-------------------------------------|
| Postal code for the Azimpur address | Omit `postalCode` from JSON-LD and the displayed address. Do not guess it. |
| Office map coordinates (`geo`) | Omit `geo` from JSON-LD; add it from the Google Business Profile pin later. |
| Real social profile URLs (Facebook, LinkedIn, etc.) | Remove the footer social icons and omit `sameAs`. |
| Google Business Profile URL | Omit; add to `sameAs` once it exists. |
| `info@infyta.com` working | Keep `domainEmailActive: false` (section 5.3). |
