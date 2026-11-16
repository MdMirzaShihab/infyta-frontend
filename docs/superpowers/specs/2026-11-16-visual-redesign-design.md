# Infyta website: visual redesign (Design)

Date: 2026-11-16. Status: written for owner approval. Branch: `visual-redesign`.

## 1. Intent

The site works and ranks, but it looks generated. The owner asked for a professional, premium look
for a technology company, something creative that does not read as "AI slop", and said the cover
images look fake for a Bangladeshi company: stock photos picked from the internet.

The cause is that nothing on the current site is specific to Infyta: six unrelated stock images,
three unrelated colour systems, no typeface, gradient text, floating orbs, glass cards and
hover-bounce on almost everything.

The redesign follows one rule, **nothing fake**: every mark on a page is either a real fact about
Infyta or a drawing of equipment Infyta installs. The site is styled like the handover drawings a
good network engineer leaves behind.

## 2. What the owner decided

| Decision | Owner's words or choice |
| --- | --- |
| Direction | "Nothing fake" approved from the mockup: "I liked it". |
| Hero | "Liked the sheet hero": the drawing comes first and the headline sits inside its title block. |
| Themes | "For the blueprint can consider as a dark mode and paper as light mode. The whole website can follow this." |
| Content | "You can keep the contents/claims of the website. Focus on look and feel more." |
| Photos | "No real photos right now." |
| Logo | "You can recreate the logo." |
| WhatsApp | "Phone has WhatsApp." |

Everything else in this document is a design call made on the owner's behalf. The calls the owner
should check are listed in section 12.

## 3. Goals, non-goals, anti-goals

### Goals

1. All ten routes and the 404 page use one visual system, in two themes: Paper (light) and
   Blueprint (dark).
2. No stock imagery. The home hero is a drawn office network that links to the five services.
3. Existing wording, claims, URLs, titles, meta descriptions and structured data stay as they are.
4. Mobile Lighthouse stays high: Performance 0.95 or better, Accessibility 0.98 or better, on the
   home page and one service page.
5. Text contrast meets WCAG AA (4.5:1) in both themes. This fixes the teal-on-white failure noted
   in `docs/review-list.md`.
6. Every page is fully readable with JavaScript turned off.

### Non-goals

- Rewriting copy, adding claims, or adding pages.
- A contact form backend, a CMS, a blog, analytics, or a TypeScript conversion.
- A photo shoot. The design leaves room for real photos later (section 7.9) but needs none.
- Bengali translation. One place name is shown in Bengali as an accent (section 7.8).

### Anti-goals (the redesign has failed if any of these ship)

- Stock or AI-generated photos, or any image of people who are not Infyta's people.
- Invented numbers, clients, awards or guarantees. The rules in `src/content/services.js` and
  `tests/unit/content-quality.test.mjs` still apply.
- Decoration that pretends to be technical: fake coordinates, HUD rings, terminal text, "system
  online" badges. A label or number appears only if it is true and useful.
- Gradient text, glass cards, floating orbs, glows, or a different accent colour per card.
- Reveal-on-scroll animation, or any content that is invisible until a script runs.
- Hover effects that scale or bounce elements.

## 4. Constraints

- Next.js 16 App Router, React 19, `output: 'export'`, deployed to Cloudflare Pages. No server code.
- `npm run check` must pass at the end (unit tests, build, build tests, lint).
- These build and unit tests encode rules the redesign must keep:
  - One `<h1>` per page. The `<h1>`, the `<nav>` and their ancestors never carry an inline
    `opacity:0`.
  - Every `<img>` has numeric `width` and `height`.
  - The static HTML starts with `<html lang="en"`.
  - Each service page has 500 or more words, every FAQ question and answer in the HTML, one
    `<details>` per FAQ inside `<main>`, and links to its two related services inside `<main>`.
  - The home page contains the `homeIntro` paragraph word for word.
  - The About page contains the text "Infyta at a glance", the address, phone, email and hours,
    and links to all five services inside `<main>`.
  - No source file calls `Math.random()` or `Date.now()`.
- `src/content/email.js` stays server-only. Client components receive the email address as a prop.
- Two existing build tests describe the photo hero and must be replaced (section 10).
- There is no Content-Security-Policy header today (`public/_headers`), so a small inline script in
  `<head>` is allowed. Do not add one that would block it.

## 5. Approaches considered

### 5.1 Overall direction

| | Approach | Trade-off | Outcome |
| --- | --- | --- | --- |
| A | **Nothing fake.** Engineering-drawing language; a drawn network replaces photography. | Needs a bespoke set of drawings. Needs no photos, and is specific to what Infyta does. | **Picked by the owner.** |
| B | Documentary photography of real installations and the real team. | Highest ceiling, but needs a proper shoot at real sites. Phone snapshots would look worse than no photos. | Dropped: no photos exist. A leaves room for them later. |
| C | Type-only editorial look (serif display, white space). | Quick and tasteful, but it is today's default "premium" template and says nothing about infrastructure. | Dropped. |
| D | Dark glossy tech-product look (glows, bento grids). | What the current site reaches for, and what every generated site looks like. | Dropped. |

### 5.2 Hero composition

| | Approach | Trade-off | Outcome |
| --- | --- | --- | --- |
| Sheet | The hero is one object: a drawing sheet. The drawing is on top; the headline, intro and buttons sit in the title block under it. | Smaller headline. The whole hero reads as one thing and fits one laptop screen. | **Picked by the owner.** |
| Stacked | Large headline, intro and buttons first, drawing below. | Bigger headline, but it is the standard hero layout with a diagram where the photo was. | Dropped. Still viewable in the mockup. |

### 5.3 Themes

The first mockup used a navy hero on an otherwise light page. The owner replaced that with two
full-site themes: Blueprint (dark) and Paper (light). A page is never half and half. The only navy
areas on a Paper page are the inverse bands in section 6.2.

## 6. The design system

The mockup is the visual source of truth:
`docs/superpowers/specs/2026-11-16-visual-redesign-assets/mockup.html` (open it in a browser; the
bar at the bottom switches theme and page), built from `mock/css.mjs`, `mock/diagram.mjs` and
`mock/build.mjs` in the same folder. Where this document and the mockup disagree, this document
wins. Where this document is silent, the mockup decides.

The mockup shows the home page and one service page. Sections 7.3 to 7.8 describe the pages it
does not show.

### 6.1 Principles

1. One memorable thing per page: a drawing. Everything around it is quiet.
2. Left-aligned. Nothing is centred except text inside buttons and drawing labels.
3. Structure carries information. Numbers appear only as drawing callouts (1 to 5, matching a
   service) or as real steps in a sequence. No decorative numbering, no eyebrow labels above
   headings, no all-caps labels, no arrows appended to links.
4. Colour means something. Navy is ink. Teal means "on": a lit port, a status light, a hover or
   focus state, a link in dark theme. Amber means "closed". Nothing else is coloured.
5. Rules and table rows instead of shadowed cards. A filled, bordered panel is used only where one
   block must stand apart (the contact panel, the end-of-page call to action).

### 6.2 Colour tokens

Brand constants:

| Name | Value | Use |
| --- | --- | --- |
| paper | `#F4F6FA` | Light page ground |
| white | `#FFFFFF` | Sheets and panels on Paper; text on navy |
| ink | `#1F2C62` | Brand navy. Text and line on Paper; page ground on Blueprint |
| ink-deep | `#172050` | Inverse bands on Blueprint |
| ink-lift | `#27367B` | Panels on Blueprint |
| signal | `#3AC1C2` | Brand teal. Lights, fills, and text on navy |
| signal-deep | `#0B7378` | Teal that is readable as text on Paper |
| cyan | `#14B9DA` | Logo only |
| amber | `#E9A23B` | Closed status only |

Theme tokens. Components use only these, never a constant directly and never a Tailwind palette
colour:

| Token | Paper (light) | Blueprint (dark) | Inverse band |
| --- | --- | --- | --- |
| `--bg` | paper | ink | `--inv-bg` |
| `--fg` | ink | white | white |
| `--fg2` (secondary text) | ink at 76% | white at 78% | white at 78% |
| `--rule` | ink at 17% | white at 22% | white at 22% |
| `--sheet` (drawing sheets) | white | ink | `--inv-bg` |
| `--body` (device fills, tags) | white | ink | `--inv-bg` |
| `--panel` | white | ink-lift | `--inv-panel` |
| `--accent` (text-safe teal) | signal-deep | signal | signal |
| `--btn-bg` / `--btn-fg` | ink / white | white / ink | white / ink |
| `--inv-bg` | ink | ink-deep | |
| `--inv-panel` | `#243372` | ink | |

An **inverse band** is a full-width section that is navy with white line in both themes: brand
navy on Paper, the deeper navy on Blueprint. Use it for the Chief Advisor block, "Our Approach",
the About page's team call to action, the footer and the mobile menu. Nothing else is inverse.

Measured contrast: ink on paper 12:1, secondary text on paper 5.5:1, signal-deep on paper 5.2:1,
white on ink 13:1, signal on ink 6:1.

### 6.3 Theme behaviour

- The `<html>` element has no `data-theme` in the static HTML. With none, the device setting
  decides (`prefers-color-scheme`). An explicit choice sets `data-theme="light"` or
  `data-theme="dark"` and wins in both directions.
- CSS shape: light tokens on `:root`; the dark tokens once under
  `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` and again under
  `:root[data-theme="dark"] { … }`. Only tokens change between themes. Set `color-scheme` to match.
- The choice is stored in `localStorage` under `infyta-theme`. A tiny inline script in `<head>`
  reads it inside `try/catch` and sets the attribute before first paint, so there is no flash.
  `<html>` needs `suppressHydrationWarning`.
- Controls: an icon button in the desktop header, and a two-option switch labelled "Theme" with
  "Paper" and "Blueprint" in the footer and in the mobile menu. Both set an explicit choice.
- `theme-color` meta: paper for light, ink for dark, and updated when the visitor switches.

### 6.4 Type

One family, Archivo, used at three widths so that type gets wider as it gets bigger and narrower
as it gets smaller. Self-host it with `next/font` as a variable font with the width and weight
axes; no request to Google at run time.

| Role | Size | Width | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Hero headline (in the title block) | `clamp(1.95rem, 3.5vw, 3.05rem)` | 116% | 700 | 1.0 | -0.024em |
| Page headline (inner pages) | `clamp(2.2rem, 4.6vw, 3.9rem)` | 116% | 700 | 0.98 | -0.026em |
| Section heading (h2) | `clamp(1.8rem, 3.1vw, 2.7rem)` | 110% | 680 | 1.06 | -0.02em |
| Item heading (h3) | 1.3rem | 106% | 640 | 1.2 | -0.01em |
| Body | 1.0625rem | 100% | 400 | 1.6 | 0 |
| Lede | `clamp(1.0625rem, 1.3vw, 1.1875rem)` | 100% | 400 | 1.55 | 0 |
| Label (small supporting text) | 0.9rem | 80% | 540 | 1.3 | 0.012em |
| Tag (certifications) | 0.8125rem | 78% | 620 | 1 | 0.02em |
| Drawing label / sub-label / cable flag | 13.5px / 12.5px / 11px | 86% / 82% / 78% | 640 / 440 / 640 | | |

Running text is at most 62 to 66 characters wide. Headings use `text-wrap: balance`. Numbers in
tables, hours and phone numbers use tabular figures. Sentence case everywhere; existing headings
keep their existing capitalisation.

### 6.5 Layout

- Content width 1296px at most. Side gutter `clamp(20px, 4vw, 48px)`.
- Section padding `clamp(64px, 7.5vw, 112px)` top and bottom.
- Section header: heading in the left 5 of 12 columns, supporting paragraph in the right 7,
  bottom-aligned. One column below 1040px.
- Breakpoints: below 1180px the header hides the open-hours text; below 1040px the mobile header,
  the tall drawing and single-column layouts apply; below 720px tables stack into blocks.
- Radius: 3px tags, 5px buttons, 6px sheets, 8px row hover, 10px panels. Line weights: 1.5px for
  drawings and sheet frames, 1px for rules.

### 6.6 Components

| Component | Description |
| --- | --- |
| Logo | Vector redraw, two variants: reversed (white wordmark, for navy) and ink (navy wordmark, for paper). With and without the tagline line. Header uses the no-tagline version at 52px tall (44px on mobile); footer uses the tagline version at 92px. |
| Button | 48px tall (40px small). Primary is filled with a small dot that lights teal on hover and focus, like a port's link light. Secondary is outlined, no dot. Icon buttons (phone, WhatsApp) carry an icon instead of the dot. |
| Sheet | A framed drawing surface: 1.5px border in the text colour, `--sheet` fill. |
| Title block | A grid of cells divided by rules, each a small label over a value. Used under the hero drawing, for "Infyta at a glance" and as the footer. |
| Tag | Small outlined label for a certification. Looks like an equipment label, not a pill. |
| Service row | One full-width link: callout number, name and summary, a "works with" line with up to four certification tags, and the service's small drawing. Hover fills the row with `--panel` and turns the drawing teal. |
| Schedule | A real `<table>` with three columns: domain, what we work with, certifications. Stacks into blocks below 720px. |
| Status | A dot and a sentence: teal dot for open, amber for closed. |
| Week strip | Seven cells, Saturday to Friday, each with the day and "9 to 6" or "Closed". Friday is hatched. Today has a teal top edge. |
| Panel | `--panel` fill, 1px rule border, 10px radius. |
| Steps | An ordered list drawn as numbered points on a line. Only for "Our Approach", which is a real sequence. |
| FAQ | Native `<details>`, ruled, with a chevron that turns when open. The first item is open by default. |
| Portrait | The advisor photo in a 4:5 frame, shown as a navy duotone (grayscale, multiplied onto a pale ground, then screened with navy). |

### 6.7 The drawings

All drawings share one symbol set and one line style, defined in `mock/diagram.mjs`: router,
firewall, switch (two sizes), workstation, access point, recorder, dome camera, bullet camera,
door terminal, server unit, cloud, application window, database. Lines are 1.5px in the current
text colour with round caps; device bodies are filled with `--body`; status lights and active
ports are teal. Wired links are solid, the internet link and the office boundary are dashed.
Cable flags name each segment.

**Hero drawing: "Typical office network".** Two layouts of the same content: wide (1200 × 408)
from 1040px up, tall (360 × 752) below. Contents, left to right:

| Part | Labels | Callout | Links to |
| --- | --- | --- | --- |
| Cloud, outside the office | Cloud; AWS, Azure, Google Cloud | 5 | Server & Cloud Solutions |
| Internet link, router, firewall, core switch | Internet; Router, MikroTik; Firewall, Fortinet; Core switch, Cisco | 2 | Network Infrastructure |
| Staff segment and Wi-Fi segment | Staff; Staff workstations; Guest Wi-Fi; Office Wi-Fi, Guest access | 2 | Network Infrastructure |
| Camera segment and door segment | Cameras; CCTV cameras, Recorder; Doors; Access control, Biometric attendance | 4 | Security & Surveillance |
| Server segment | Servers; Windows, Linux, VMware | 5 | Server & Cloud Solutions |
| Application and database, fed from the servers | Business software; SQL Server, MySQL, MongoDB | 1 | Software Development |
| Dashed boundary around the office | Your office; IT Support & Consultancy | 3 | IT Support & Consultancy |

Callout numbers follow the order of `services` in `src/content/services.js`.

Each part is a real link (`<a href="/services/…">`) in the static HTML with an accessible name.
Hovering or focusing a part turns it teal and dims the others. Hovering a service row lights the
matching part of the drawing, and the reverse.

The strip under the drawing reads: Drawing "Typical office network"; Drawn by "Infyta, Azimpur,
Dhaka"; Scale "Not to scale"; Key "1 to 5 are our services. Select any part."

**Small drawings.** One per service (168 × 60), used in service rows. Decorative, hidden from
assistive technology.

**Service detail drawings.** One per service page, about 600 × 250, in a sheet beside the page
headline. Network Infrastructure is drawn in the mockup. The other four are for the builder to
draw with the same symbols, using only terms that appear in that service's content:

| Service | What the drawing shows |
| --- | --- |
| Software Development | A web application and a mobile app, both feeding one database (SQL Server, MySQL, MongoDB), with a dashed link to "Existing systems". Needs one new symbol: a phone. |
| IT Support & Consultancy | The dashed office boundary with a workstation, a server, an access point and a router inside it. |
| Security & Surveillance | Dome and bullet cameras into a recorder; a door terminal for access control and attendance; both on their own "Cameras" segment from a switch. |
| Server & Cloud Solutions | A rack of servers (Windows, Linux, Active Directory), a host carrying several virtual machines (VMware, Hyper-V), and a dashed link to the cloud (AWS, Azure, Google Cloud). |

### 6.8 Motion

- One load sequence, on the hero drawing only: the network "comes up". Links draw from the
  internet inward, devices appear as their link arrives, then callouts. About 2.6 seconds, once.
  It is CSS only, starts without waiting for any script, and never hides the headline.
- Everything else is still. No reveal-on-scroll.
- Interaction feedback only: colour changes on hover and focus (150ms), the FAQ chevron, the
  dropdown and the mobile menu.
- With `prefers-reduced-motion: reduce` the drawing is shown complete at once and smooth scrolling
  is off. The same complete state applies when printing.

### 6.9 Words

Existing copy is unchanged. The only new words are functional labels, all listed here so the owner
can check them:

- Drawing labels and the strip under the drawing (section 6.7).
- A "works with" line per service row, assembled from technologies the site already names:
  Software Development "Web and mobile apps, SQL Server, MySQL, MongoDB"; Network Infrastructure
  "MikroTik, Cisco, Fortinet, wireless deployments"; IT Support & Consultancy "Windows and Linux
  servers, Active Directory, office networks"; Security & Surveillance "CCTV, access control,
  biometric attendance"; Server & Cloud Solutions "VMware, Hyper-V, AWS, Azure, Google Cloud".
  Store these in `src/content/services.js`.
- Table headings: "Domain", "What we work with", "Certifications and specialists".
- Open-hours status: "Open now, until 6 PM", "Closed, opens 9 AM", "Closed, opens tomorrow 9 AM",
  "Closed, opens Saturday 9 AM", their long forms ("Open now. Closes at 6 PM."), and "Dhaka time".
- "WhatsApp", "Open in Google Maps", "Show map", "Theme", "Paper", "Blueprint", "Skip to content",
  and the breadcrumb word "Services".

Two existing lines are removed: the footer credit "Designed with ❤️ by Infyta Team", and the
"Contact Sales" button on the home page, which pointed to the same page as "Get Started" and is
replaced by WhatsApp and phone buttons.

## 7. Pages

### 7.1 Every page

**Header.** Sticky. Logo; Home, Services (opens a list of the five services), Team, About,
Contact; then open-hours status, the phone number as text, the theme button, and "Get Started"
(to `/contact`). Below 1040px: logo, a call button and a menu button. The menu is a full-screen
navy panel with the same links, the five services indented under Services, the status, the theme
switch, and "Call" and "WhatsApp" buttons.

**Footer.** An inverse band laid out as a title block of four cells: logo with tagline and
`site.tagline`; Quick Links; Services; Contact (phone, email, address linked to Google Maps,
hours). Under it: the copyright line, the open-hours status and the theme switch. Social links
render only if `site.socials` has entries.

**Open hours.** Computed in the browser in Dhaka time (`Asia/Dhaka`) from `site.hours`: open
Saturday to Thursday, 09:00 to 18:00. Until the script runs, and with JavaScript off, show
`site.hours.display` instead of a status.

### 7.2 Home (`/`): as in the mockup

1. **Sheet hero.** The drawing on top. Under it, a title block: the headline "Limitless tech
   solutions for a digital world" (`site.tagline`, this is the page's `<h1>`), the buttons "Get
   Started" (to `/contact`) and "Explore Solutions" (to `/services`), and beside them the home
   page's meta description as the intro. Then the four-cell strip. Below 1040px the headline block
   comes first and the drawing follows. In the HTML the headline block always comes first.
2. **Our Services.** The heading, the `homeIntro` paragraph, the five service rows, and "Explore
   All Services".
3. **Our Core Expertise.** The heading, its one-line intro from the Team page, and the schedule
   built from `src/content/expertise.js`.
4. **Our Chief Advisor.** Inverse band: portrait, name, role, the six highlights, the four
   certifications as tags, and "View Our Team" (to `/team`).
5. **Call to action.** "Ready to Transform Your Business?" with its sentence; buttons "Get
   Started", "WhatsApp" and the phone number; beside it a panel with the status, the week strip,
   the address, phone and email.

### 7.3 Services index (`/services`)

Page headline "Our Services" with its existing sentence. Then the five service rows. Then a panel
with "Ready to transform your business with our expertise?" and "Get a Free Consultation". No
large drawing on this page; the rows carry the small ones.

### 7.4 Service pages (`/services/[slug]`): as in the mockup

1. Breadcrumb (Services / name), page headline, `heroSubtitle`, buttons "Get Started Today" and
   the phone number; beside them the service's detail drawing in a sheet.
2. "Overview" (two paragraphs) beside "What's Included" as a ruled list.
3. "Our Approach": inverse band, four numbered steps. Where a step has a lead phrase before a
   colon, set that phrase in bold.
4. "Technologies & Certifications": schedule rows for the service's expertise keys.
5. "Frequently Asked Questions": heading on the left, `<details>` list on the right.
6. "Related Services": two service rows.
7. A panel: "Ready to discuss your project?", "Get Started Today" and "WhatsApp".

### 7.5 About (`/about`)

Same content, same order, new treatment:

1. Page headline "About Infyta" with its existing line.
2. "Our Vision" and "Our Mission" as two large plain statements side by side: no cards, no icons.
3. "Infyta at a glance" as a title block: what we do, where we are, services (links), opening
   hours, phone, email.
4. "Our Core Values": the six values as a three-by-two ruled list, title and one line each. No
   icons, no coloured borders.
5. Inverse band: "Meet Our Expert Team" with its line and "View Our Team".

### 7.6 Team (`/team`)

1. Page headline "Our Dream Team" with its existing line.
2. "Our Chief Advisor": the same inverse band as the home page, with the "Key Highlights" and
   "Certifications" sub-headings shown. The floating certification badges around the photo are
   removed; the certifications appear as tags.
3. "Our Core Expertise": its intro line and the schedule.

### 7.7 Contact (`/contact`)

1. Page headline "Get In Touch" with its existing line.
2. Two columns. Left, "Send Us A Message": First Name, Last Name, Email, Message, each with a
   visible label tied to its field, and no "John / Doe" placeholders. Right, "Contact
   Information": the status and week strip, then Our Office, Phone, WhatsApp, Email and Working
   Hours.
3. **The form must not pretend to send.** There is no backend. Submitting opens the visitor's own
   app with the message filled in: "Send on WhatsApp" (primary, `https://wa.me/8801318121558` with
   the text) and "Send by email" (secondary, `mailto:` the primary address). Both validate that
   the message is not empty. No "message sent" confirmation is ever shown, because the page cannot
   know.
4. The map loads only on request: a sheet showing the address, "Open in Google Maps" and a "Show
   map" button that inserts the existing embed.

### 7.8 404, and the Bengali accent

**404.** "Page not found", its sentence and its two links, in the system. It may carry one small
drawing made from existing symbols (for example an unplugged cable with its light off). No new
copy.

**Bengali.** "আজিমপুর, ঢাকা" appears once beside the office address in the contact panel, marked
`lang="bn"`. Do not ship a full Bengali font for it: use a subset of Anek Bangla limited to those
characters (under 10KB), or the device's Bengali font.

### 7.9 Photos, later

When real photos exist they go in sheets with the same navy duotone as the portrait, never as
full-bleed backgrounds. No layout in this design depends on them.

## 8. Accessibility

- AA contrast in both themes (section 6.2). A unit test guards it (section 10).
- Visible focus on everything interactive: 2px outline in `--accent`, 3px offset.
- A "Skip to content" link first in the page.
- The Services dropdown is a button with `aria-expanded` that works with keyboard and touch, not
  hover alone. The mobile menu is a dialog: focus moves in, is trapped, Escape closes it, and
  focus returns to the menu button.
- The hero drawing is a labelled group; each part is a link with a name such as "Network
  Infrastructure". Small drawings are hidden from assistive technology.
- The week strip is decorative; the same hours are present as text.
- Touch targets are at least 44px.
- On desktop the drawing is shown above the headline block but comes after it in the HTML, so
  keyboard focus reaches the buttons before the drawing. This is accepted.

## 9. Performance

- No hero image. Delete `public/images/hero/` and the slider code.
- Remove `swiper`, `framer-motion` and `react-icons` from `package.json`. Icons are a handful of
  inline SVGs.
- Pages are server components. Client code is limited to: the theme controls, the open-hours
  status, the header dropdown and mobile menu, the contact form and the map loader.
- One font file, preloaded, `font-display: swap`, with a size-adjusted fallback so the swap does
  not shift layout. If the two-axis file costs too much, narrow the axis ranges to those in
  section 6.4.
- Targets: mobile Lighthouse Performance 0.95 or better and Accessibility 0.98 or better on `/`
  and `/services/network-infrastructure`; less JavaScript shipped to the home page than today.

## 10. Tests

Replace in `tests/build/performance.test.mjs`:

- "home: exactly one high-priority, responsive hero image" and "home: no image other than the hero
  is loading=eager" become: the home page references nothing under `/images/hero/`; no `<img>` on
  the home page is eager; and `<main>` contains an `<svg>` with a link to each of the five service
  pages.

Add:

- Unit: contrast. From the token values, `--fg`, `--fg2` and `--accent` each reach 4.5:1 on
  `--bg` in Paper, Blueprint and the inverse band.
- Unit: open hours. A pure function taking a weekday and minutes returns the right status for:
  Monday 10:00 (open), Monday 08:00 (opens 9 AM), Thursday 19:00 (opens Saturday), Friday noon
  (opens tomorrow), Saturday 18:00 (closed, opens tomorrow).
- Build: the static HTML has no `data-theme` on `<html>`, and `<head>` contains the theme script.
- Build: `package.json` and `src/` contain no reference to `swiper`, `framer-motion` or
  `react-icons`, and `out/` has no `images/hero` directory.
- Build: no element in any page carries an inline `opacity:0`.

All other existing tests pass unchanged.

## 11. Brand assets

- **Logo.** The geometric redraw in `…-assets/logo/` was measured from the 200 × 119 raster. For
  production, convert the wordmark and tagline text to outlines (Montserrat ExtraBold and Barlow
  Semi Condensed Medium, both open licence) so the logo needs no font, and export reversed and ink
  variants, each with and without the tagline, into `public/images/`. Replace `infyta-logo.png`
  everywhere, including structured data.
- **Icons and social image.** Regenerate `src/app/icon.png`, `apple-icon.png` and
  `opengraph-image.png` with `scripts/make-brand-images.mjs` from the vector. The icon is the mark
  alone. The social image is navy with the reversed logo and the existing line "IT Solutions in
  Dhaka, Bangladesh".
- **Portrait.** Keep the existing files and responsive variants. The duotone is CSS.

## 12. Calls made for the owner to check

1. **First-visit theme.** The site follows the visitor's device setting, so many first-time
   visitors will see Paper, not Blueprint. The alternative is to show Blueprint to everyone until
   they switch.
2. **Contact form.** It now opens WhatsApp or email with the message filled in, instead of doing
   nothing.
3. **Logo.** The redraw is used as shown in the mockup.
4. **Vendor names on the hero drawing.** The router is labelled MikroTik, the firewall Fortinet
   and the switch Cisco, as an example of a typical setup.
5. **Home page additions.** Core Expertise and the Chief Advisor block are repeated from the Team
   page.
6. **Removals.** The footer credit line and the "Contact Sales" button (section 6.9).
7. **Bengali accent** beside the address (section 7.8).

## 13. Left to the builder

- How styles are written: Tailwind utilities mapped to the tokens, or plain CSS ported from
  `mock/css.mjs`. Either way the tokens are CSS variables and no Tailwind palette colour is used.
- Component and file breakdown, and whether list-to-drawing highlighting is CSS (`:has()`) or a
  small script.
- The four remaining service detail drawings and the 404 drawing, within section 6.7.
- The exact subset of the font axes, and the Bengali font choice in section 7.8.
- The icon set for phone, WhatsApp, menu, close, theme and chevron: simple inline SVGs.
- The order of work, as long as the branch ships all pages together: a half-converted site must
  not deploy.

## 14. Rollout

One branch, `visual-redesign`. When `npm run check` passes and the Lighthouse targets hold, add a
"Visible changes" section to `docs/review-list.md` for the owner, then deploy with the existing
runbook (`docs/deploy-cloudflare.md`).
