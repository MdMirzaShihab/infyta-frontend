# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the look of all ten routes and the 404 page as the approved "Nothing fake" design, in two themes (Paper and Blueprint), without changing content, URLs or SEO output.

**Architecture:** The approved mockup is ported, not redesigned: its CSS becomes plain CSS files under `src/styles/`, its markup becomes server components, its drawings become JSX. Client code is limited to five small islands (theme controls, open-hours status, header menus, contact form, map loader). Pure logic (hours, enquiry text, tokens) lives in plain `.js` modules that `node --test` can import. Tailwind, Swiper, framer-motion and react-icons are removed in the last task.

**Tech Stack:** Next.js 16 App Router (static export), React 19, plain CSS with custom properties, `next/font/google` (Archivo, width and weight axes), `node:test`, `node-html-parser`, `sharp`, `opentype.js` (dev only, for outlining the logo).

**Spec:** `docs/superpowers/specs/2026-11-16-visual-redesign-design.md`. Read it first. The mockup it names is the visual source of truth: `docs/superpowers/specs/2026-11-16-visual-redesign-assets/` (`mockup.html`, `mock/css.mjs`, `mock/build.mjs`, `mock/diagram.mjs`, `logo/build-logo.mjs`). Below, "the mock" means those files.

## Start Here

Read this section first, whether you are starting at Task 1 or resuming after an interruption.

### 1. Check the starting state

Run from the repository root (`infyta-frontend`):

```bash
git branch --show-current     # must print: visual-redesign
git status --short            # before Task 1: only "?? .superpowers/"
git log --oneline -15         # shows which task commits already exist
node -v                       # v22 or newer
[ -d node_modules ] || npm ci
npm run check                 # must pass before you change anything
```

- Work in this checkout, on this branch. Do not create a worktree and do not switch branches: the owner resumes from this folder.
- **Where to resume:** the first unticked `- [ ]` box below is the next step. If the working tree is dirty, a task was interrupted: do not discard anything. Read `git diff --stat`, finish that task from where it stopped, and run its tests.
- **Expected baseline** (measured 2026-11-16 on this branch): 43 unit tests pass, the build succeeds, 86 build tests pass, lint has 0 errors and 3 `<img>` warnings in files this plan rewrites or deletes.

### 2. How to run the plan

1. The session that runs this plan is the **controller**. It uses the skill `superpowers:subagent-driven-development` and does not write product code itself.
2. Tasks run strictly in order, 1 to 9, one at a time. They share one working tree, so never run two implementers at once.
3. For each task: dispatch one implementer with the brief described below; then a spec-compliance reviewer; then a quality reviewer; send findings back to an implementer until both reviewers pass.
4. Then the controller itself runs `npm run check`, reads the output, and only if it passes: commits the task, ticks its boxes in this file, updates the status table in `docs/superpowers/specs/2026-11-16-visual-redesign-assets/README.md`, and commits that.
5. After Task 9, dispatch one whole-branch reviewer (`git diff master...visual-redesign`), fix what it finds, then use `superpowers:finishing-a-development-branch`. Do not merge or push unless the owner asks.

Stop and ask the owner only when: a task would need a change to approved wording or to a decision in spec section 12; `npm run check` cannot be made to pass without weakening an existing test; or a tool this plan needs is missing.

### 3. Models

The owner's instruction, to be followed for every dispatch:

> Optimize the token usage without compromising the quality. Where you can use the less expensive models like Sonnet or lower without compromising any quality, use them. Where using them may affect the quality, use Opus to keep the best possible quality outcome.

Always pass `model` explicitly when dispatching; never let a subagent inherit the session's model.

| Task | Implementer | Spec-compliance reviewer | Quality reviewer | Why |
| --- | --- | --- | --- | --- |
| 1. Foundation | sonnet | sonnet | sonnet | Exact values and full tests are given. |
| 2. Logic and content | sonnet | sonnet | sonnet | Pure functions pinned by tests. |
| 3. Logo and brand images | opus | sonnet | opus | A brand asset: geometry and letter shapes must match by eye. |
| 4. Site shell | opus | sonnet | opus | Focus handling, state that must survive hydration, theme sync. |
| 5. Home and hero drawing | sonnet | sonnet | opus | A faithful port with given coordinates; the review compares it with the mockup by eye. |
| 6. Services and detail drawings | opus | sonnet | opus | Four new drawings need design judgement. |
| 7. About and Team | sonnet | sonnet | opus | Layout rules are spelled out, but no mockup exists, so the review needs a designer's eye. |
| 8. Contact and 404 | sonnet | sonnet | opus | The logic is already tested in Task 2; the review checks behaviour and accessibility. |
| 9. Cleanup, docs, verification | sonnet | sonnet | sonnet | Mechanical. |
| Whole-branch review at the end | | | opus | The last gate before the owner sees it. |

- Use `haiku` only for pure look-ups (finding a string, listing files).
- **Escalate:** if a Sonnet implementer fails the same review twice, or says it is unsure, give that fix to Opus. If Lighthouse misses its target in Task 9, give the diagnosis to Opus.
- **Do not downgrade** an Opus row to save tokens.

Ways to save tokens that do not cost quality:

- The controller never reads `mock/css.mjs`, `mock/diagram.mjs`, `mock/build.mjs` or the views itself. It hands each subagent paths and the "Read first" list for its task.
- An implementer's brief is: the Global Constraints and Port Rules sections of this plan, word for word; the full text of its task; and its "Read first" list. Tell it not to explore beyond those unless a test forces it to.
- A reviewer's brief is: the task text, the named spec sections, and the commit range to review (`git diff <before>..HEAD`). Not the whole repository.
- While working, an implementer runs only its own test files. The full `npm run check` runs once, at the end of the task.
- A visual check is at most six screenshots per task (light, dark and narrow, for at most two pages).

| Task | Read first |
| --- | --- |
| 1 | Spec 6.2, 6.3, 6.4. `mock/css.mjs` from the top through the `/* Buttons */` block. `src/app/layout.jsx`. |
| 2 | Spec 6.9, 7.1 ("Open hours"), 7.7. `src/content/site.js`, `services.js`, `expertise.js`, `pages.js`. |
| 3 | Spec 6.6 (Logo row), 11. `…-assets/logo/build-logo.mjs`. `scripts/make-brand-images.mjs`. |
| 4 | Spec 6.3, 7.1, 8. In `mock/build.mjs`: `icon`, `nav`, `mobileMenu`, `footer` and the menu parts of `js`. In `mock/css.mjs`: Nav, Footer, Mobile menu blocks. `tests/build/routes.test.mjs`. |
| 5 | Spec 6.7, 6.8, 7.2. `mock/diagram.mjs` except `networkDetail`. In `mock/build.mjs`: `heroSheet`, `servicesBand`, `expertiseBand`, `advisorBand`, `contactPanel`, `contactBand`. The matching blocks in `mock/css.mjs`. |
| 6 | Spec 6.7 (detail drawings), 7.3, 7.4. `networkDetail` in `mock/diagram.mjs`; `serviceView` in `mock/build.mjs`; the Service page block in `mock/css.mjs`. Current `ServicePageView.jsx` and `ServicesIndexView.jsx` for their strings. |
| 7 | Spec 6.1, 6.6, 7.5, 7.6. Current `AboutView.jsx` and `TeamView.jsx` for their strings. |
| 8 | Spec 7.7, 7.8, 8. Current `ContactView.jsx` and `not-found.jsx` for their strings. `src/lib/enquiry.js`. |
| 9 | Spec 9, 10, 14. `docs/review-list.md`, `docs/deploy-cloudflare.md`. |

### 4. Tools, plugins and skills

Plugins that must be enabled in the session: **superpowers** and **frontend-design**.

| Skill | Who uses it, and when |
| --- | --- |
| `superpowers:subagent-driven-development` | The controller, for the whole plan. Required. |
| `superpowers:test-driven-development` | Every implementer: write the task's tests first and watch them fail. |
| `superpowers:verification-before-completion` | Every implementer and the controller, before calling a task done. |
| `superpowers:systematic-debugging` | Anyone, as soon as a test, build or lint failure is not obvious. |
| `superpowers:requesting-code-review` and `superpowers:receiving-code-review` | The controller, for the per-task and whole-branch reviews. |
| `frontend-design:frontend-design` | The implementers and quality reviewers of Tasks 6 and 7, where no mockup exists and design judgement is needed. It must not be used to restyle anything the mockup already defines. |
| `superpowers:finishing-a-development-branch` | The controller, after the whole-branch review. |
| `code-review` (`/code-review high`) | Optional extra pass on the finished branch. |
| A browser skill (`claude-in-chrome`, or the built-in browser) | For the by-hand checks in Tasks 4, 8 and 9 (theme switch, mobile menu, contact form). If none is available, list those checks for the owner to do instead of skipping them silently. |

Tools on this machine:

| Tool | Use |
| --- | --- |
| Node 22 and npm | Everything. `npm run check` is the gate. |
| Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | Headless screenshots for the Visual check. |
| `npx wrangler pages dev out --port 8788` (`npm run preview`) | Serves the static export with clean URLs. |
| `npx lighthouse` | Task 9 scores. Needs network the first time. |
| `sharp` (already a dev dependency) | Brand images, image-size tests. |
| `opentype.js@2.0.0` and three `@fontsource` packages | Installed in Task 3 to outline the logo text. |
| Network access | `npm install`, and the build's one-time Archivo download. |

No connector (Supabase, Atlassian, Hugging Face, Google Drive) is needed. Do not use one.

### 5. Facts already checked, so nobody has to check them again

- `next/font/google` in the installed Next.js 16.4.6 knows Archivo with a width axis 62 to 125 and a weight axis 100 to 900.
- `@fontsource/montserrat/files/montserrat-latin-800-normal.woff`, `@fontsource/barlow-semi-condensed/files/barlow-semi-condensed-latin-500-normal.woff` and `@fontsource/archivo/files/archivo-latin-600-normal.woff` exist, and opentype.js 2.0.0 reads them.
- In opentype.js 2.0.0, `font.getPath(text, …)` **throws** on Archivo ("lookupType: 6 - substFormat: 2 is not yet supported"). Laying text out one glyph at a time works for all three fonts (Task 3).
- Montserrat 800 at size 42.5 on baseline 98, with each glyph's left edge on its target, gives these boxes: `ı` 63.0 to 71.1 (top 75.0); `n` 79.0 to 103.5; `f` 108.0 to 126.3; `y` 127.0 to 154.3; `t` 156.0 to 174.3; `a` 178.0 to 200.9. The tagline at 9.8px is 136.6 wide before fitting.
- This Mac is in dark appearance, so headless Chrome renders Blueprint by default. `--blink-settings=preferredColorScheme=1` forces Paper and `--blink-settings=preferredColorScheme=0` forces Blueprint.
- Before the redesign the home page references 745,092 bytes of script and 36,264 bytes of CSS.
- ESLint ignores `docs/**`, so the mockup sources do not affect lint.

## Global Constraints

- Branch `visual-redesign`. Commit at the end of every task. Never push. End commit messages with `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.
- `npm run check` (unit tests, build, build tests, lint) passes at the end of every task. The build needs network access once, to fetch Archivo.
- Existing copy is unchanged. The only new words are those listed in spec section 6.9. Keep every visible string of a view you rewrite word for word, including capitalisation.
- Where the spec and the mock disagree, the spec wins. Where the spec is silent, the mock decides. Do not restyle: keep the mock's class names, values and drawing coordinates.
- Components use theme tokens only. No Tailwind palette colour, no hex colour outside `src/styles/tokens.css` and the logo.
- New code never imports `swiper`, `framer-motion` or `react-icons`.
- One `<h1>` per page. No element carries an inline `opacity:0`. Every `<img>` has numeric `width` and `height`.
- Static HTML starts with `<html lang="en"` and has no `data-theme` attribute.
- `tel:` links are exactly `tel:+8801318121558`. `mailto:` links in static HTML are exactly `mailto:` plus a published address, with no query string.
- `src/content/email.js` is server-only. Client components receive the email as a prop. The string `info@infyta.com` must not appear in any output file.
- No source file contains `Math.random(` or `Date.now(`.
- No `<button>` wraps an `<a>`. Every page's visible text includes the address and the phone number.
- Breakpoints: 1180px, 1040px, 720px. Content width 1296px. Gutter `clamp(20px, 4vw, 48px)`.
- Test snippets below leave out their imports. Use `node:test`, `node:assert/strict`, `node:fs`, `node:path`, the helpers in `tests/build/helpers.mjs` (`OUT`, `loadPage`, `allHtmlFiles`, `parse` from `node-html-parser`) and the modules in `src/content/`, as the existing tests do. `assert` is strict: a missing attribute is `undefined`, not `null`.
- After each task's commit, tick its boxes in this file and update the status table in `docs/superpowers/specs/2026-11-16-visual-redesign-assets/README.md`, then commit that too. The owner's device may lose power; nothing may live only in a temp folder.

## Port Rules

These apply to every task that ports from the mock.

| In the mock | In the site |
| --- | --- |
| `.mockbar`, `data-goto`, `data-hash`, `data-view`, `data-hero`, the "stack" hero, the `show()`/`params` script | Not ported |
| `.cover`, `.paper`, `.blueprint` classes | Dropped. Inverse bands use `.inverse` only |
| `env(safe-area-inset-*)` paddings and `body::before` | Dropped. Use `padding-inline: var(--gut)` and `top: 0` |
| `--logo-rev`, `--logo-ink` tokens and the two logo variants | Dropped. One inline `<Logo>` whose wordmark is `currentColor` |
| `font-family: Archivo` | `font-family: var(--font-archivo), system-ui, sans-serif` |
| `.bn { font-family: 'Anek Bangla' … }` | `.bn { font-family: 'Noto Sans Bengali', 'Kohinoor Bangla', 'Nirmala UI', var(--font-archivo), sans-serif }` (device font, no download) |
| `href="#…"` placeholders | Real routes, with `next/link` `<Link>` for every internal link, including inside SVG |
| Script-driven list-to-drawing highlight (`light()`) | CSS `:has()`, one rule pair per service slug |
| Status and week strip text set by script | Static fallback in HTML, live value after mount (Task 4) |

If `<Link>` inside `<svg>` causes a hydration warning or a missing `href` in the built HTML, use a plain `<a href>` there with `// eslint-disable-next-line @next/next/no-html-link-for-pages`.

**Visual check** (used by Tasks 4 to 8). Build, serve, and screenshot with headless Chrome, then compare with the same shot of `mockup.html`:

```bash
npm run build && (npx wrangler pages dev out --port 8788 >/dev/null 2>&1 &) && sleep 6
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
LIGHT="--blink-settings=preferredColorScheme=1"; DARK="--blink-settings=preferredColorScheme=0"
"$CH" --headless=new --hide-scrollbars $LIGHT --window-size=1440,4400 --virtual-time-budget=9000 --screenshot=/tmp/page-light.png http://localhost:8788/
"$CH" --headless=new --hide-scrollbars $DARK --window-size=1440,4400 --virtual-time-budget=9000 --screenshot=/tmp/page-dark.png http://localhost:8788/
"$CH" --headless=new --hide-scrollbars $LIGHT --window-size=500,5000 --virtual-time-budget=9000 --screenshot=/tmp/page-narrow.png http://localhost:8788/
# The same shots of the mockup, to compare against (add #view=service for its service page):
"$CH" --headless=new --hide-scrollbars $LIGHT --window-size=1440,4400 --virtual-time-budget=9000 --screenshot=/tmp/mock-light.png "file://$PWD/docs/superpowers/specs/2026-11-16-visual-redesign-assets/mockup.html"
```

Headless Chrome cannot go narrower than 500px. The two colour-scheme flags were checked on this machine; always pass one of them, because the Mac itself is in dark appearance. The mockup takes `#theme=dark` or `#theme=light` and `#view=service` in its URL as well. Stop the server with `pkill -f "wrangler pages dev"` afterwards. A page passes when layout, spacing, type and colours match the mock in both themes and nothing overflows sideways.

## Review Focus

1. **Storage is unavailable or throws** (private window, blocked site data): the page must still load, follow the device theme, and the theme controls must still switch for the current page view. Pinned in Task 1 (script) and Task 4 (controls).
2. **The visitor is in another time zone, or the date is a listed closed date, or closed dates run back to back**: the status is always worked out in Dhaka time and never says "Open now" on a closed date. Pinned in Task 2.
3. **A message with `&`, `#`, line breaks or Bengali text**: it must arrive intact in WhatsApp and in email. Pinned in Task 2.
4. **JavaScript is off**: hours show as plain text, the drawing is complete, the Services list opens on keyboard focus, and the footer links reach every top-level page. Pinned in Tasks 4 and 5.
5. **Reduced motion or print**: the hero drawing is shown complete, with no animation. Pinned in Task 5.

## File Structure

```
src/styles/tokens.css        Brand constants, theme tokens (Paper, Blueprint), .inverse
src/styles/base.css          Reset, type, .wrap/.band, buttons, tags, labels, focus, skip link
src/styles/shell.css         Header, menus, mobile menu, footer, status, theme controls
src/styles/drawing.css       Drawing line styles, hover/focus states, load sequence
src/styles/sections.css      Hero sheet, title block, section head, service rows, schedule, panel,
                             advisor, contact, week strip, service page, about, team, 404
src/lib/theme-script.js      THEME_KEY, THEME_COLORS, themeScript (inline head script as a string)
src/lib/hours.js             dhakaNow, openStatus, weekCells (pure)
src/lib/enquiry.js           buildEnquiry, whatsappUrl, mailtoUrl (pure)
src/lib/certs.js             certsFor (pure)
src/lib/steps.js             splitStep (pure)
src/content/about.js         Vision, mission, values, team call to action (moved out of AboutView)
src/components/Logo.jsx, logo-paths.js (generated)
src/components/Icons.jsx     Phone, WhatsApp, Menu, Close, Theme icons
src/components/Nav.jsx (server), NavMenus.jsx (client), Footer.jsx (server)
src/components/ThemeControls.jsx (client), OpenStatus.jsx (client)
src/components/ServiceRow.jsx, Tags.jsx, Schedule.jsx, TitleBlock.jsx, AdvisorBand.jsx,
                ContactPanel.jsx, PageHeader.jsx, EndCta.jsx
src/components/ContactForm.jsx (client), MapLoader.jsx (client)
src/components/drawing/Symbols.jsx, OfficeNetwork.jsx, ServiceMini.jsx, ServiceDetail.jsx, callouts.js
scripts/make-logo.mjs, scripts/lib/text-path.mjs
```

Deleted by the end: `src/sections/`, `src/components/{Navbar,FloatingOrbs,MotionProvider,ServiceCard,ServiceIcon}.jsx`, `public/images/hero/`, `tailwind.config.js`, `postcss.config.mjs`.

---

### Task 1: Tokens, base styles, font and theme foundation

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/lib/theme-script.js`
- Modify: `src/app/layout.jsx`, `.gitignore` (add a line `.superpowers/`)
- Test: `tests/unit/tokens.test.mjs`, `tests/unit/theme-script.test.mjs`, `tests/build/theme.test.mjs`

**Interfaces:**
- Produces: the custom properties in `tokens.css` and the class `.inverse`; from `src/lib/theme-script.js`: `THEME_KEY = 'infyta-theme'`, `THEME_COLORS = { light: '#F4F6FA', dark: '#1F2C62' }`, `themeScript` (string), and `saveTheme(theme, getStorage = () => window.localStorage) -> boolean`, which stores the choice and returns `false` instead of throwing; the CSS variable `--font-archivo` on `<html>`.

- [x] **Step 1: Write `tests/unit/tokens.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/tokens.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function decls(selector) {
  const m = css.match(new RegExp(esc(selector) + '\\s*\\{([^}]*)\\}'));
  assert.ok(m, `no block for ${selector}`);
  return Object.fromEntries([...m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((d) => [d[1], d[2].trim()]));
}
const root = decls(':root');
const darkAttr = decls(':root[data-theme="dark"]');
const darkMedia = decls(':root:not([data-theme="light"])');
const inverse = decls('.inverse');
const themes = {
  Paper: root,
  Blueprint: { ...root, ...darkAttr },
  'inverse band on Paper': { ...root, ...inverse },
  'inverse band on Blueprint': { ...root, ...darkAttr, ...inverse },
};
function value(scope, name, depth = 0) {
  assert.ok(depth < 8, `var() loop at ${name}`);
  const raw = scope[name];
  assert.ok(raw, `${name} is not defined`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? value(scope, ref[1], depth + 1) : raw;
}
function rgba(str) {
  const hex = str.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const m = str.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/);
  assert.ok(m, `unsupported colour: ${str}`);
  return [+m[1], +m[2], +m[3], +m[4]];
}
const over = ([r, g, b, a], [R, G, B]) => [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)];
const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

test('brand constants', () => {
  const want = { '--paper': '#F4F6FA', '--ink': '#1F2C62', '--ink-deep': '#172050', '--ink-lift': '#27367B', '--signal': '#3AC1C2', '--signal-deep': '#0B7378', '--amber': '#E9A23B' };
  for (const [k, v] of Object.entries(want)) assert.equal(root[k].toUpperCase(), v, k);
});
test('dark tokens are the same in the media query and under data-theme', () => {
  assert.deepEqual(darkMedia, darkAttr);
});
test('every token redefined for dark or inverse is first defined on :root', () => {
  for (const k of [...Object.keys(darkAttr), ...Object.keys(inverse)]) assert.ok(k in root, `${k} missing on :root`);
});
for (const [name, scope] of Object.entries(themes)) {
  test(`text contrast is at least 4.5:1: ${name}`, () => {
    const bg = rgba(value(scope, '--bg')).slice(0, 3);
    for (const token of ['--fg', '--fg2', '--accent']) {
      const r = ratio(over(rgba(value(scope, token)), bg), bg);
      assert.ok(r >= 4.5, `${token} on --bg is ${r.toFixed(2)}:1`);
    }
  });
}
```

- [x] **Step 2: Write `tests/unit/theme-script.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { themeScript, saveTheme, THEME_KEY, THEME_COLORS } from '../../src/lib/theme-script.js';

function run(extra) {
  const root = { dataset: {} };
  const metas = [{ content: '' }, { content: '' }];
  const context = { document: { documentElement: root, querySelectorAll: () => metas }, ...extra };
  assert.doesNotThrow(() => vm.runInNewContext(themeScript, context));
  return { root, metas };
}
const storage = (v) => ({ localStorage: { getItem: (k) => (k === THEME_KEY ? v : null) } });

test('constants', () => {
  assert.equal(THEME_KEY, 'infyta-theme');
  assert.deepEqual(THEME_COLORS, { light: '#F4F6FA', dark: '#1F2C62' });
});
test('a stored choice sets data-theme and both theme-color metas', () => {
  for (const t of ['light', 'dark']) {
    const { root, metas } = run(storage(t));
    assert.equal(root.dataset.theme, t);
    assert.deepEqual(metas.map((m) => m.content), [THEME_COLORS[t], THEME_COLORS[t]]);
  }
});
test('nothing stored, or a junk value, leaves the device setting in charge', () => {
  for (const v of [null, '', 'blue', 'DARK']) assert.equal(run(storage(v)).root.dataset.theme, undefined);
});
test('storage that throws, or does not exist, changes nothing and does not throw', () => {
  assert.equal(run({ localStorage: { getItem() { throw new Error('denied'); } } }).root.dataset.theme, undefined);
  assert.equal(run({}).root.dataset.theme, undefined);
});
test('saveTheme stores the choice, and reports failure instead of throwing', () => {
  const kept = {};
  assert.equal(saveTheme('dark', () => ({ setItem: (k, v) => { kept[k] = v; } })), true);
  assert.deepEqual(kept, { [THEME_KEY]: 'dark' });
  assert.equal(saveTheme('dark', () => { throw new Error('storage is blocked'); }), false);
  assert.equal(saveTheme('dark', () => ({ setItem() { throw new Error('quota'); } })), false);
});
```

- [x] **Step 3: Write `tests/build/theme.test.mjs`**

```js
for (const file of allHtmlFiles()) {
  const name = relative(OUT, file);
  const html = readFileSync(file, 'utf8');
  const doc = parse(html, { blockTextElements: { script: true, style: false } });
  test(`${name}: the theme is the visitor's choice, never hard-coded`, () => {
    assert.doesNotMatch(html, /<html[^>]*data-theme/);
    assert.match(html, /<html lang="en" class="[^"]+"/);
    assert.ok(doc.querySelectorAll('head script').some((s) => s.rawText.includes('infyta-theme')));
    const metas = doc.querySelectorAll('meta[name="theme-color"]').map((m) => [m.getAttribute('media'), m.getAttribute('content').toUpperCase()]);
    assert.deepEqual(metas.sort(), [['(prefers-color-scheme: dark)', '#1F2C62'], ['(prefers-color-scheme: light)', '#F4F6FA']]);
  });
}
```

- [x] **Step 4: Run the three tests and see them fail**

Run: `node --test tests/unit/tokens.test.mjs tests/unit/theme-script.test.mjs`
Expected: FAIL (files not found).

- [x] **Step 5: Create `src/styles/tokens.css` with exactly these values**

```css
/* Paper (light) is a blueline print: navy ink on paper. Blueprint (dark) is white line on navy. */
:root {
  --paper: #F4F6FA; --white: #FFFFFF; --ink: #1F2C62; --ink-deep: #172050; --ink-lift: #27367B;
  --signal: #3AC1C2; --signal-deep: #0B7378; --cyan: #14B9DA; --amber: #E9A23B;
  --gut: clamp(20px, 4vw, 48px);
  --w-display: 116%; --w-head: 110%; --w-text: 100%; --w-label: 80%;
  --bg: var(--paper); --fg: var(--ink); --fg2: rgba(31,44,98,.76); --rule: rgba(31,44,98,.17);
  --body: var(--white); --sheet: var(--white); --panel: var(--white); --accent: var(--signal-deep);
  --btn-bg: var(--ink); --btn-fg: var(--white); --hatch: rgba(31,44,98,.07);
  --inv-bg: var(--ink); --inv-panel: #243372;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: var(--ink); --fg: var(--white); --fg2: rgba(255,255,255,.78); --rule: rgba(255,255,255,.22);
    --body: var(--ink); --sheet: var(--ink); --panel: var(--ink-lift); --accent: var(--signal);
    --btn-bg: var(--white); --btn-fg: var(--ink); --hatch: rgba(255,255,255,.08);
    --inv-bg: var(--ink-deep); --inv-panel: var(--ink);
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: var(--ink); --fg: var(--white); --fg2: rgba(255,255,255,.78); --rule: rgba(255,255,255,.22);
  --body: var(--ink); --sheet: var(--ink); --panel: var(--ink-lift); --accent: var(--signal);
  --btn-bg: var(--white); --btn-fg: var(--ink); --hatch: rgba(255,255,255,.08);
  --inv-bg: var(--ink-deep); --inv-panel: var(--ink);
  color-scheme: dark;
}
/* Inverse bands are navy with white line in both themes. */
.inverse {
  --bg: var(--inv-bg); --fg: var(--white); --fg2: rgba(255,255,255,.78); --rule: rgba(255,255,255,.22);
  --body: var(--inv-bg); --sheet: var(--inv-bg); --panel: var(--inv-panel); --accent: var(--signal);
  --btn-bg: var(--white); --btn-fg: var(--ink); --hatch: rgba(255,255,255,.08);
  background: var(--bg); color: var(--fg);
}
```

- [x] **Step 6: Create `src/styles/base.css`**

Port from `mock/css.mjs`, applying the Port Rules: the reset block (from `*,*::before,*::after` to `.skip:focus`), `.wrap`, `.band`, the `/* Type */` block, `.tag`, `.tags`, the `/* Buttons */` block, `.textlink`, `.num`, `.panel`, `.bn`, and the `prefers-reduced-motion` rule that turns off smooth scrolling. `body` uses `background: var(--bg); color: var(--fg)`.

- [x] **Step 7: Create `src/lib/theme-script.js`**

Export `THEME_KEY`, `THEME_COLORS`, `saveTheme` and `themeScript`. `themeScript` is a self-contained string of plain ES5 that: reads `localStorage.getItem(THEME_KEY)` inside `try/catch`; only if the value is exactly `'light'` or `'dark'`, sets `document.documentElement.dataset.theme` to it and sets `content` of every `meta[name="theme-color"]` to the matching `THEME_COLORS` value; otherwise does nothing.

- [x] **Step 8: Wire `src/app/layout.jsx`**

- `import { Archivo } from "next/font/google"` with `{ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-archivo" }`.
- Import, after `./globals.css` and in this order: `@/styles/tokens.css`, `@/styles/base.css`.
- `<html lang="en" className={archivo.variable} suppressHydrationWarning>`. `lang` stays the first attribute.
- Inside `<html>`, before `<body>`: `<head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>`.
- `export const viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: THEME_COLORS.light }, { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark }] }`.

If ESLint rejects `<head>` in the layout, use `next/script` instead: `<Script id="theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />`, which Next.js also places in `<head>`.

- [x] **Step 9: Run everything**

Run: `npm run check`
Expected: PASS. Old pages still render with their Tailwind classes; they will look half-converted until their task.

- [x] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add theme tokens, base styles, Archivo and theme script"
```

---

### Task 2: Pure logic and content fields

**Files:**
- Create: `src/lib/hours.js`, `src/lib/enquiry.js`, `src/lib/certs.js`, `src/lib/steps.js`
- Modify: `src/content/site.js` (add `closedDates`, `whatsappUrl`), `src/content/services.js` (add `worksWith`), `src/content/pages.js` (add `pages.home.heading`)
- Test: `tests/unit/hours.test.mjs`, `tests/unit/enquiry.test.mjs`, `tests/unit/small-libs.test.mjs`, and additions to `tests/unit/site.test.mjs`

**Interfaces:**
- Produces:
  - `dhakaNow(d = new Date()) -> { date: 'YYYY-MM-DD', day: 0..6 (0 is Sunday), minutes: 0..1439 }`, always in `Asia/Dhaka`.
  - `openStatus(now, hours = site.hours, closedDates = site.closedDates) -> { open: boolean, short: string, long: string }`.
  - `weekCells(now, hours = site.hours, closedDates = site.closedDates) -> Array<{ day, label, text, off, today }>`, seven cells starting Saturday. `now` may be `null`, which marks no cell as today and ignores closed dates.
  - `buildEnquiry({ firstName, lastName, email, message }) -> { ok: boolean, text: string, subject: string }`, `whatsappUrl(e164, text) -> string`, `mailtoUrl(to, subject, text) -> string`.
  - `certsFor(expertiseKeys, limit = 4) -> string[]`, `splitStep(text) -> { lead: string | null, rest: string }`.
  - `site.closedDates: string[]` (empty), `site.whatsappUrl: 'https://wa.me/8801318121558'`, `service.worksWith: string`, `pages.home.heading: 'Infyta – Limitless Tech Solutions'` (en dash, U+2013).

- [x] **Step 1: Write `tests/unit/hours.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { dhakaNow, openStatus, weekCells } from '../../src/lib/hours.js';

const HOURS = { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' };
// 2026-11-16 is a Monday. day: 0 Sunday … 6 Saturday.
const at = (date, day, hhmm) => ({ date, day, minutes: +hhmm.slice(0, 2) * 60 + +hhmm.slice(3) });
const status = (now, closed = []) => openStatus(now, HOURS, closed);

test('dhakaNow converts any instant to Dhaka time (UTC+6)', () => {
  assert.deepEqual(dhakaNow(new Date('2026-11-16T10:30:00Z')), { date: '2026-11-16', day: 1, minutes: 990 });
  assert.deepEqual(dhakaNow(new Date('2026-11-16T19:00:00Z')), { date: '2026-11-17', day: 2, minutes: 60 });
});
test('open during working hours', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '10:00')), { open: true, short: 'Open now, until 6 PM', long: 'Open now. Closes at 6 PM.' });
  assert.equal(status(at('2026-11-16', 1, '09:00')).open, true);
  assert.equal(status(at('2026-11-16', 1, '17:59')).open, true);
});
test('before opening on a working day', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '08:00')), { open: false, short: 'Closed, opens 9 AM', long: 'Closed now. Opens today at 9 AM.' });
});
test('after closing, next working day is tomorrow', () => {
  assert.deepEqual(status(at('2026-11-16', 1, '18:00')), { open: false, short: 'Closed, opens tomorrow 9 AM', long: 'Closed now. Opens tomorrow at 9 AM.' });
  assert.equal(status(at('2026-11-21', 6, '18:00')).short, 'Closed, opens tomorrow 9 AM');
});
test('Thursday evening and Friday', () => {
  assert.deepEqual(status(at('2026-11-19', 4, '19:00')), { open: false, short: 'Closed, opens Saturday 9 AM', long: 'Closed now. Opens Saturday at 9 AM.' });
  assert.equal(status(at('2026-11-20', 5, '12:00')).short, 'Closed, opens tomorrow 9 AM');
});
test('a listed closed date is never open', () => {
  const s = status(at('2026-11-16', 1, '10:00'), ['2026-11-16']);
  assert.deepEqual(s, { open: false, short: 'Closed today', long: 'Closed today. Opens tomorrow at 9 AM.' });
});
test('closed dates back to back, running into Friday', () => {
  const closed = ['2026-11-18', '2026-11-19'];
  assert.equal(status(at('2026-11-18', 3, '10:00'), closed).long, 'Closed today. Opens Saturday at 9 AM.');
  assert.equal(status(at('2026-11-17', 2, '19:00'), closed).long, 'Closed now. Opens Saturday at 9 AM.');
});
test('week strip starts on Saturday and marks today and closures', () => {
  const cells = weekCells(at('2026-11-16', 1, '10:00'), HOURS, ['2026-11-17']);
  assert.deepEqual(cells.map((c) => c.label), ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  assert.deepEqual(cells.map((c) => c.text), ['9 to 6', '9 to 6', '9 to 6', 'Closed', '9 to 6', '9 to 6', 'Closed']);
  assert.deepEqual(cells.filter((c) => c.today).map((c) => c.label), ['Mon']);
  assert.deepEqual(cells.filter((c) => c.off).map((c) => c.label), ['Tue', 'Fri']);
  assert.equal(weekCells(null, HOURS, ['2026-11-17']).filter((c) => c.today || c.text === 'Closed').length, 1);
});
```

The week strip shows the current Saturday-to-Friday week that contains `now.date`.

- [x] **Step 2: Write `tests/unit/enquiry.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEnquiry, whatsappUrl, mailtoUrl } from '../../src/lib/enquiry.js';

test('full enquiry', () => {
  const e = buildEnquiry({ firstName: ' Rahim ', lastName: 'Uddin', email: 'rahim@example.com', message: 'We need office Wi-Fi.\n' });
  assert.deepEqual(e, {
    ok: true,
    subject: 'Website enquiry from Rahim Uddin',
    text: 'Hello Infyta, this is Rahim Uddin.\n\nWe need office Wi-Fi.\n\nEmail: rahim@example.com',
  });
});
test('lines for empty fields are left out', () => {
  assert.deepEqual(buildEnquiry({ message: 'Hi' }), { ok: true, subject: 'Website enquiry', text: 'Hi' });
  assert.equal(buildEnquiry({ firstName: 'Rahim', message: 'Hi' }).text, 'Hello Infyta, this is Rahim.\n\nHi');
  assert.equal(buildEnquiry({ email: 'a@b.co', message: 'Hi' }).text, 'Hi\n\nEmail: a@b.co');
});
test('an empty or blank message is not ok', () => {
  for (const message of ['', '   ', '\n\t']) assert.equal(buildEnquiry({ firstName: 'Rahim', message }).ok, false);
  assert.equal(buildEnquiry({}).ok, false);
});
test('special characters survive the round trip', () => {
  const text = 'Rack & cabling #2\nঅফিসের নেটওয়ার্ক? 100% + more';
  const wa = new URL(whatsappUrl('+8801318121558', text));
  assert.equal(wa.origin + wa.pathname, 'https://wa.me/8801318121558');
  assert.equal(wa.searchParams.get('text'), text);
  const mail = mailtoUrl('infytaofficial@gmail.com', 'Website enquiry from R & D', text);
  assert.ok(mail.startsWith('mailto:infytaofficial@gmail.com?subject='));
  const q = new URLSearchParams(mail.split('?')[1].replace(/\+/g, '%2B'));
  assert.equal(q.get('subject'), 'Website enquiry from R & D');
  assert.equal(q.get('body'), text);
  assert.doesNotMatch(mail.split('?')[1], /[ \n#]/);
});
```

Use `encodeURIComponent` for every value in both URLs.

- [x] **Step 3: Write `tests/unit/small-libs.test.mjs` and extend `tests/unit/site.test.mjs`**

```js
// small-libs.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { certsFor } from '../../src/lib/certs.js';
import { splitStep } from '../../src/lib/steps.js';
import { services } from '../../src/content/services.js';
import { pages } from '../../src/content/pages.js';

test('certsFor: unique certifications for expertise keys, in order, capped', () => {
  assert.deepEqual(certsFor(['server', 'network']), ['MCITP', 'RHCSA', 'VMware Certified', 'CCNA']);
  assert.deepEqual(certsFor(['cloud']), ['AWS Specialist']);
  assert.equal(certsFor(['software', 'database'], 10).length, 5);
});
test('splitStep keeps the words and only separates a lead phrase', () => {
  assert.deepEqual(splitStep('Network design: we plan the cabling.'), { lead: 'Network design:', rest: ' we plan the cabling.' });
  assert.deepEqual(splitStep('Testing and handover, followed by ongoing maintenance.'), { lead: null, rest: 'Testing and handover, followed by ongoing maintenance.' });
});
test('worksWith lines are exactly the approved ones', () => {
  assert.deepEqual(Object.fromEntries(services.map((s) => [s.slug, s.worksWith])), {
    'software-development': 'Web and mobile apps, SQL Server, MySQL, MongoDB',
    'network-infrastructure': 'MikroTik, Cisco, Fortinet, wireless deployments',
    'it-support-consultancy': 'Windows and Linux servers, Active Directory, office networks',
    'security-surveillance': 'CCTV, access control, biometric attendance',
    'server-cloud-solutions': 'VMware, Hyper-V, AWS, Azure, Google Cloud',
  });
});
test('home heading keeps today\'s words', () => {
  assert.equal(pages.home.heading, 'Infyta – Limitless Tech Solutions');
});
```

```js
// added to site.test.mjs
test('closed dates and WhatsApp link', () => {
  assert.ok(Array.isArray(site.closedDates));
  for (const d of site.closedDates) assert.match(d, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(site.whatsappUrl, 'https://wa.me/' + site.phone.e164.slice(1));
});
```

- [x] **Step 4: Run the tests and see them fail**

Run: `npm test`
Expected: FAIL (modules not found).

- [x] **Step 5: Implement the four modules and the content fields**

- `hours.js`: read the time with `Intl.DateTimeFormat` and `timeZone: 'Asia/Dhaka'`. Format `'09:00'` as `9 AM`, `'18:00'` as `6 PM`, `'09:30'` as `9:30 AM`. Find the next open day by stepping the date forward one day at a time (use `Date.UTC` arithmetic on the date string, never the local clock), skipping non-working weekdays and listed dates. Say "tomorrow" when it is the very next date, otherwise the weekday name. Week strip text is opening and closing hour on a 12-hour clock joined by " to ".
- `site.js`: add `closedDates: []` with a comment: dates the office is closed, as `'YYYY-MM-DD'` in Dhaka time, for example public holidays.

- [x] **Step 6: Run everything and commit**

Run: `npm run check`
Expected: PASS.

```bash
git add -A && git commit -m "feat: add open-hours, enquiry and small content helpers"
```

---

### Task 3: Vector logo and brand images

**Files:**
- Create: `scripts/lib/text-path.mjs`, `scripts/make-logo.mjs`, `src/components/logo-paths.js` (generated, committed), `src/components/Logo.jsx`, `public/images/infyta-logo.svg`, `public/images/infyta-logo-reversed.svg`
- Modify: `scripts/make-brand-images.mjs`, `package.json` (dev dependencies), `README.md` (scripts table)
- Regenerate: `public/images/infyta-logo.png`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`
- Test: `tests/unit/logo.test.mjs`

**Interfaces:**
- Produces: `logoPaths = { wall, floor, tiles: [d, d, d], word: [{ d, accent }] (six glyphs), tagline }` (all path-data strings); `<Logo tagline={false} className />`, a server component rendering one inline `<svg role="img" aria-label="Infyta">` with `viewBox="-2 -4 205 112"` (or `205 125` with `tagline`), wordmark, floor and dot ring in `currentColor`.

- [x] **Step 1: Install dev dependencies**

Run: `npm i -D --save-exact opentype.js@2.0.0 && npm i -D @fontsource/montserrat @fontsource/barlow-semi-condensed @fontsource/archivo`

- [x] **Step 2: Write `tests/unit/logo.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { logoPaths } from '../../src/components/logo-paths.js';

const ink = readFileSync('public/images/infyta-logo.svg', 'utf8');
const reversed = readFileSync('public/images/infyta-logo-reversed.svg', 'utf8');

test('logo files are outlines and need no font', () => {
  for (const svg of [ink, reversed]) {
    assert.doesNotMatch(svg, /<text|font-family|<style/);
    assert.match(svg, /viewBox="-2 -4 205 125"/);
  }
  assert.match(ink, /fill="#1F2C62"/i);
  assert.match(reversed, /fill="#FFFFFF"/i);
});
test('path data', () => {
  assert.equal(logoPaths.word.length, 6);
  assert.deepEqual(logoPaths.word.map((g) => g.accent), [false, false, false, true, false, false]);
  assert.equal(logoPaths.tiles.length, 3);
  for (const d of [logoPaths.wall, logoPaths.floor, logoPaths.tagline, ...logoPaths.tiles, ...logoPaths.word.map((g) => g.d)]) assert.match(d, /^M[\d\s.,MLQCZHV-]+$/i);
});
test('brand images', async () => {
  const size = async (f) => { const m = await sharp(f).metadata(); return [m.width, m.height]; };
  assert.deepEqual(await size('src/app/icon.png'), [512, 512]);
  assert.deepEqual(await size('src/app/apple-icon.png'), [180, 180]);
  assert.deepEqual(await size('src/app/opengraph-image.png'), [1200, 630]);
  assert.equal((await size('public/images/infyta-logo.png'))[0], 1200);
});
```

- [x] **Step 3: Run it and see it fail**

Run: `node --test tests/unit/logo.test.mjs`
Expected: FAIL.

- [x] **Step 4: Create `scripts/lib/text-path.mjs`**

- `loadFont(file) -> opentype.Font` (`file` is a path under `node_modules/@fontsource/…/files/`, the `.woff` static file).
- `glyphAt(font, char, leftEdge, baseline, size) -> { d, box }`: the glyph outline positioned so the left edge of its bounding box is exactly `leftEdge`.
- `lineAt(font, text, x, baseline, size, fitWidth) -> { d, width }`: the text as one path starting at `x`; when `fitWidth` is given, scale horizontally about `x` so the line is exactly that wide.

Never call `font.getPath(text, …)`, `font.stringToGlyphs` or `font.forEachGlyph`: in opentype.js 2.0.0 they throw on Archivo. Lay a line out one character at a time: `font.charToGlyph(ch)`, add `font.getKerningValue(previous, glyph)`, draw with `glyph.getPath(x, baseline, size)`, then advance by `glyph.advanceWidth * size / font.unitsPerEm`. Read a `.woff` with `opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))`.

- [x] **Step 5: Create `scripts/make-logo.mjs`**

Copy the geometry (`rounded`, `tile`, `shapes`, gradients, the floor mask, dot circles) from the mock's `logo/build-logo.mjs`; after this task that script is no longer the source. Replace its two `<text>` elements with outlines:

| Item | Font file | Size | Baseline | Placement |
| --- | --- | --- | --- | --- |
| Wordmark glyphs `ı n f y t a` (dotless i, U+0131) | `@fontsource/montserrat/files/montserrat-latin-800-normal.woff` | 42.5 | 98 | Left edges at x = 63, 79, 108, 127, 156, 178 |
| Tagline "Engineering Tomorrow’s Tech Today" (U+2019) | `@fontsource/barlow-semi-condensed/files/barlow-semi-condensed-latin-500-normal.woff` | 9.8 | 117.2 | Starts at x = 63, fitted to width 136, opacity 0.88 |

The `y` is `#14B9DA`; the other glyphs take the wordmark colour. The script must fail with a clear message unless the top of the `ı` is between y = 74 and y = 77 and the right edge of the `a` is between x = 199.5 and x = 202 (the checked values are 75.0 and 200.9; see Start Here, section 5). It writes `src/components/logo-paths.js` and the two SVG files (ink wordmark `#1F2C62`, reversed `#FFFFFF`), each with the tagline, and prints `logo ok`.

- [x] **Step 6: Create `src/components/Logo.jsx`**

Render from `logoPaths`. Gradient and mask ids must be unique per instance: derive them from `useId()` with every character outside `[A-Za-z0-9_-]` removed.

- [x] **Step 7: Update `scripts/make-brand-images.mjs`**

Render from the new SVG files instead of the PNG: `infyta-logo.png` is the ink logo with tagline, 1200px wide, transparent ground; `icon.png` is the mark alone (the logo cropped to x from -2 to 78) centred with 40px padding on a transparent 512 square; `apple-icon.png` is the same mark with 24px padding on `#1F2C62`; `opengraph-image.png` is a flat `#1F2C62` ground, the reversed logo with tagline 480px wide centred in the upper part, and the line "IT Solutions in Dhaka, Bangladesh" outlined with `lineAt` in `@fontsource/archivo/files/archivo-latin-600-normal.woff` at 40px, white, centred near the bottom. Keep writing `opengraph-image.alt.txt` unchanged.

- [x] **Step 8: Generate, test, look**

Run: `node scripts/make-logo.mjs && node scripts/make-brand-images.mjs && node --test tests/unit/logo.test.mjs`
Expected: `logo ok`, then PASS. Open `public/images/infyta-logo-reversed.svg` and the mock's `logo/infyta-logo-reversed.svg` side by side in a browser: letter positions and shapes must match.

- [x] **Step 9: Run everything and commit**

Run: `npm run check`. Add `make-logo` to the scripts table in `README.md`.

```bash
git add -A && git commit -m "feat: add outlined vector logo and regenerate brand images"
```

---

### Task 4: Site shell: header, footer, theme controls, open-hours status

**Files:**
- Create: `src/styles/shell.css`, `src/components/Icons.jsx`, `src/components/Nav.jsx`, `src/components/NavMenus.jsx`, `src/components/ThemeControls.jsx`, `src/components/OpenStatus.jsx`
- Modify: `src/components/Footer.jsx` (rewrite as a server component), `src/app/layout.jsx`
- Delete: `src/components/Navbar.jsx`
- Test: `tests/build/shell.test.mjs`

**Interfaces:**
- Consumes: `Logo`; `openStatus`, `weekCells`, `dhakaNow`; `saveTheme`, `THEME_COLORS`; `site.whatsappUrl`.
- Produces:
  - `Icons.jsx`: `PhoneIcon`, `WhatsAppIcon`, `MenuIcon`, `CloseIcon`, `ThemeIcon` (the SVGs in the mock's `icon` object in `mock/build.mjs`), all `aria-hidden`.
  - `ThemeControls.jsx` (client): `ThemeButton()` renders `<button class="themebtn" data-theme-toggle aria-label="Switch between Paper (light) and Blueprint (dark) theme">`; `ThemeSwitch()` renders `<div class="themeseg">` with the label "Theme" and two buttons, `data-set-theme="light"` "Paper" and `data-set-theme="dark"` "Blueprint", each with `aria-pressed`.
  - `OpenStatus.jsx` (client): `OpenStatus({ variant = 'short', className })` renders `<span class="status" data-open-status>` with a dot and text; `WeekStrip()` renders `<div class="week" aria-hidden="true">` with seven cells.
  - `Nav()` (server) and `Footer({ email })` (server). `NavMenus.jsx` (client): `MainLinks()` and `MobileMenu()`.

- [x] **Step 1: Write `tests/build/shell.test.mjs`**

For every file from `allHtmlFiles()`, with `doc` parsed as in `routes.test.mjs`:

```js
const TOP = ['/', '/services', '/team', '/about', '/contact'];
const SERVICE_PATHS = services.map((s) => `/services/${s.slug}`);

test(`${name}: skip link and main landmark`, () => {
  assert.ok(doc.querySelector('body a.skip[href="#main"]'));
  assert.ok(doc.querySelector('main#main'));
});
test(`${name}: header navigation`, () => {
  const nav = doc.querySelector('nav');
  assert.equal(nav.getAttribute('aria-label'), 'Main');
  for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(nav.querySelector(`a[href="${p}"]`), `nav lacks ${p}`);
  const button = nav.querySelector('button[aria-expanded="false"][aria-controls]');
  assert.equal(button.textContent.trim(), 'Services');
  const list = nav.querySelector('#' + button.getAttribute('aria-controls'));
  assert.equal(list.querySelector('a[href="/services"]').textContent.trim(), 'All Services');
  assert.equal(list.querySelectorAll('a').length, 6);
  const header = doc.querySelector('header');
  assert.equal(header.querySelector('a[href="tel:+8801318121558"]').textContent.trim(), site.phone.display);
  assert.equal(header.querySelector('a.btn[href="/contact"]').textContent.trim(), 'Get Started');
  assert.ok(header.querySelector('svg[role="img"][aria-label="Infyta"]'));
  assert.equal(doc.querySelectorAll('img[src*="infyta-logo"]').length, 0);
});
test(`${name}: open-hours text is readable before any script runs`, () => {
  const spots = doc.querySelectorAll('[data-open-status]');
  assert.ok(spots.length >= 2);
  for (const s of spots) assert.ok(s.textContent.includes(site.hours.display[0]), s.textContent);
});
test(`${name}: theme controls`, () => {
  assert.equal(doc.querySelectorAll('button[data-theme-toggle]').length, 1);
  const paper = doc.querySelectorAll('button[data-set-theme="light"]');
  const blueprint = doc.querySelectorAll('button[data-set-theme="dark"]');
  assert.ok(paper.length >= 2 && blueprint.length === paper.length);
  for (const b of paper) assert.equal(b.textContent.trim(), 'Paper');
  for (const b of blueprint) assert.equal(b.textContent.trim(), 'Blueprint');
});
test(`${name}: mobile menu`, () => {
  const menu = doc.querySelector('#mobile-menu[role="dialog"][aria-modal="true"]');
  assert.ok(doc.querySelector('button[aria-controls="mobile-menu"][aria-expanded="false"]'));
  for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(menu.querySelector(`a[href="${p}"]`), `menu lacks ${p}`);
  assert.ok(menu.querySelector(`a[href="${site.whatsappUrl}"]`));
  assert.ok(menu.querySelector('a[href="tel:+8801318121558"]'));
});
test(`${name}: footer`, () => {
  const foot = doc.querySelector('footer');
  assert.ok(foot.classList.contains('inverse'));
  const text = foot.textContent.replace(/\s+/g, ' ');
  for (const needle of [site.tagline, site.address.display, site.phone.display, primaryEmail(), ...site.hours.display, 'Infyta. All rights reserved.']) assert.ok(text.includes(needle), needle);
  assert.ok(!text.includes('Designed with'));
  for (const p of [...TOP, ...SERVICE_PATHS]) assert.ok(foot.querySelector(`a[href="${p}"]`), `footer lacks ${p}`);
  assert.ok(foot.querySelector(`a[href="${site.mapsUrl}"]`));
  assert.ok(foot.querySelector(`a[href="mailto:${primaryEmail()}"]`));
});
```

Also one test outside the loop: `src/styles/shell.css` contains the selector `.has-menu:focus-within .menu` (the Services list opens on keyboard focus with JavaScript off).

- [x] **Step 2: Build and see it fail**

Run: `npm run build && node --test tests/build/shell.test.mjs`
Expected: FAIL.

- [x] **Step 3: Create `src/styles/shell.css` and import it in `layout.jsx` after `base.css`**

Port from `mock/css.mjs`: the `/* Nav */` block (including `.menu`, `.has-menu`, `.nav__meta`, `.status`, `.dot`, `.tel`, `.themebtn`, `.themeseg`), the `/* Footer */` block, the `/* Mobile menu */` block, and the nav, logo and footer rules from the three responsive blocks. Add: `.status.is-unknown .dot { display: none }`.

- [x] **Step 4: Create `Icons.jsx`, `ThemeControls.jsx`, `OpenStatus.jsx`**

- Theme controls share one hook. Server render and first client render have no theme state (`aria-pressed="false"` on both). After mount the effective theme is `document.documentElement.dataset.theme`, else the device setting. Choosing a theme sets the attribute, calls `saveTheme` (the switch still works for this page view when it returns `false`), sets both `theme-color` metas, and tells the other instances through a `window` event named `infyta-theme`. While no explicit choice exists, follow `prefers-color-scheme` changes.
- `OpenStatus`: server render shows `site.hours.display[0]` for `short` and both display lines joined by a space for `long`, with class `is-unknown`. After mount it shows `openStatus(dhakaNow())`, toggles `is-closed`, and refreshes every 60 seconds.
- `WeekStrip`: server render is `weekCells(null)`; after mount `weekCells(dhakaNow())`. Classes `is-off` and `is-today` as in the mock.

- [x] **Step 5: Create `Nav.jsx`, `NavMenus.jsx`; rewrite `Footer.jsx`; update `layout.jsx`**

Port the mock's `nav`, `mobileMenu` and `footer` templates from `mock/build.mjs`.

- `layout.jsx` body order: `<a class="skip" href="#main">Skip to content</a>`, `<Nav />`, `<main id="main">`, `<Footer email={primaryEmail()} />`. Remove `MotionProvider` and `Navbar`.
- `MainLinks` marks the current route with `aria-current="page"` using `usePathname()`. "Services" is a `<button aria-expanded aria-controls="services-menu">`; the list `<div class="menu" id="services-menu">` holds "All Services" then the five services and is always rendered. Clicking toggles class `is-open` on the `<li>`; Escape and an outside click close it.
- `MobileMenu`: the menu button (`aria-controls="mobile-menu"`) and the dialog `<div class="mm inverse" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">`. On open: focus the close button, keep Tab inside the dialog, lock body scroll. Escape, the close button, a link click, a route change and the viewport reaching 1040px all close it; focus returns to the menu button.
- Footer: an `inverse` band. Four cells: `<Logo tagline />` with `site.tagline`; "Quick Links" (Home, Services, Team, About Us, Contact); "Services"; "Contact" (phone, email, address linked to `site.mapsUrl`, hours lines). Then the copyright line with the build year, `<OpenStatus />` and `<ThemeSwitch />`. Render `site.socials` as text links only when the array is not empty.

- [x] **Step 6: Run everything, do the Visual check on `/`, commit**

Run: `npm run check`
Expected: PASS, including the existing `routes.test.mjs`. Compare header, mobile header and footer with the mock in both themes.

```bash
git add -A && git commit -m "feat: add new header, footer, theme controls and open-hours status"
```

---

### Task 5: Home page and the hero drawing

**Files:**
- Create: `src/styles/drawing.css`, `src/styles/sections.css`, `src/components/drawing/{Symbols,OfficeNetwork,ServiceMini}.jsx`, `src/components/drawing/callouts.js`, `src/components/{ServiceRow,Tags,Schedule,TitleBlock,AdvisorBand,ContactPanel}.jsx`
- Modify: `src/views/HomeView.jsx`, `src/app/page.jsx` (pass `email={primaryEmail()}`), `src/app/layout.jsx` (render `<DrawingSymbols />` once at the start of `<body>`; import the two CSS files)
- Delete: `src/sections/` (all five files)
- Test: `tests/build/home.test.mjs`, `tests/unit/drawing-css.test.mjs`; modify `tests/build/performance.test.mjs`

**Interfaces:**
- Consumes: `certsFor`, `OpenStatus`, `WeekStrip`, icons, `pages.home.heading`, `service.worksWith`.
- Produces: `CALLOUT` (`{ [slug]: 1..5 }`, in `services` order); `DrawingSymbols()`; `OfficeNetwork()`; `ServiceMini({ slug })`; `ServiceRow({ service })`; `Tags({ items })`; `Schedule({ rows, caption, headings = true })` where a row is an entry of `expertise`; `TitleBlock({ items: [{ label, value }] })`; `AdvisorBand({ headings = false, cta = true })`; `ContactPanel({ email })`.

- [ ] **Step 1: Replace the two hero tests in `tests/build/performance.test.mjs`**

Delete `home: exactly one high-priority, responsive hero image` and `home: no image other than the hero is loading="eager"`. Add:

```js
test('home: no hero photo, no eager image', () => {
  const { html, doc } = loadPage('/');
  assert.ok(!html.includes('/images/hero/'));
  assert.equal(doc.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]').length, 0);
});
```

- [ ] **Step 2: Write `tests/build/home.test.mjs`**

```js
const { html, doc } = loadPage('/');
const main = doc.querySelector('main');
const text = main.textContent.replace(/\s+/g, ' ');

test('headline keeps today\'s words', () => {
  assert.equal(main.querySelector('h1').textContent.trim(), 'Infyta – Limitless Tech Solutions');
});
test('hero drawing links to every service, in both layouts', () => {
  for (const cls of ['dwg--wide', 'dwg--tall']) {
    const svg = main.querySelector(`svg.${cls}`);
    assert.ok(svg.getAttribute('aria-label'));
    for (const s of services) {
      const a = svg.querySelector(`a[href="/services/${s.slug}"]`);
      assert.ok(a && a.getAttribute('aria-label'), `${cls}: ${s.slug}`);
    }
  }
});
test('hero text', () => {
  for (const needle of [pages.home.description, 'Typical office network', 'Infyta, Azimpur, Dhaka', 'Not to scale', '1 to 5 are our services. Select any part.']) assert.ok(text.includes(needle), needle);
  assert.equal(main.querySelector('a.btn[href="/contact"]').textContent.trim(), 'Get Started');
  assert.ok(main.querySelectorAll('a[href="/services"]').some((a) => a.textContent.trim() === 'Explore Solutions'));
});
test('service rows', () => {
  const rows = main.querySelectorAll('a.key__row');
  assert.deepEqual(rows.map((r) => r.getAttribute('href')), services.map((s) => `/services/${s.slug}`));
  rows.forEach((row, i) => {
    assert.equal(row.querySelector('.num').textContent.trim(), String(i + 1));
    assert.ok(row.textContent.includes(services[i].summary) && row.textContent.includes(services[i].worksWith));
    assert.equal(row.querySelector('svg').getAttribute('aria-hidden'), 'true');
  });
  assert.ok(main.querySelectorAll('a[href="/services"]').some((a) => a.textContent.trim() === 'Explore All Services'));
});
test('expertise schedule', () => {
  const table = main.querySelector('table.sched');
  assert.deepEqual(table.querySelectorAll('thead th').map((th) => th.textContent.trim()), ['Domain', 'What we work with', 'Certifications and specialists']);
  assert.deepEqual(table.querySelectorAll('tbody th').map((th) => th.textContent.trim()), expertise.map((e) => e.title));
});
test('chief advisor band', () => {
  const band = main.querySelector('section.inverse#advisor');
  assert.equal(band.querySelector('img').getAttribute('alt'), 'Md. Arif, Chief Advisor at Infyta');
  for (const h of chiefAdvisor.highlights) assert.ok(band.textContent.includes(h), h);
  assert.equal(band.querySelector('a[href="/team"]').textContent.trim(), 'View Our Team');
});
test('call to action and contact panel', () => {
  for (const needle of ['Ready to Transform Your Business?', 'Dhaka time', 'আজিমপুর, ঢাকা', 'Open in Google Maps']) assert.ok(text.includes(needle), needle);
  assert.ok(main.querySelector(`a[href="${site.whatsappUrl}"]`));
  assert.equal(main.querySelector('[lang="bn"]').textContent.trim(), 'আজিমপুর, ঢাকা');
  assert.equal(main.querySelectorAll('.week > div').length, 7);
  assert.ok(!text.includes('Contact Sales'));
});
test('nothing in the page is hidden by an inline style', () => {
  assert.doesNotMatch(html, /style="[^"]*opacity:\s*0(?![.\d])/);
});
```

- [ ] **Step 3: Write `tests/unit/drawing-css.test.mjs`**

```js
const css = readFileSync('src/styles/drawing.css', 'utf8');
// Returns the text inside the first block opened by `@media <query> {`.
function mediaBlock(query) {
  const start = css.indexOf(query);
  assert.ok(start >= 0, `no ${query} block`);
  let depth = 0, i = css.indexOf('{', start);
  const from = i + 1;
  for (; i < css.length; i++) { if (css[i] === '{') depth++; if (css[i] === '}' && --depth === 0) break; }
  return css.slice(from, i);
}
for (const query of ['@media (prefers-reduced-motion: reduce)', '@media print']) {
  test(`${query}: the drawing is complete and still`, () => {
    const block = mediaBlock(query);
    for (const cls of ['.wire', '.rise', '.fade']) assert.ok(block.includes(cls), cls);
    assert.match(block, /animation:\s*none/);
    assert.match(block, /opacity:\s*1/);
    assert.match(block, /stroke-dasharray:\s*none/);
  });
}
```

- [ ] **Step 4: Build and see the tests fail**

Run: `npm run build; node --test tests/build/home.test.mjs tests/unit/drawing-css.test.mjs`
Expected: FAIL.

- [ ] **Step 5: Create `drawing.css` and `sections.css`**

- `drawing.css`: port the `/* Drawings */` and `/* One load sequence */` blocks. Add an `@media print` block with the same resets as the reduced-motion block. Add the list-to-drawing highlight: for each of the five slugs, a rule that gives `.dwg .svc[data-svc="<slug>"]` the hover colour and filled callout when `main:has(.key__row[data-svc="<slug>"]:is(:hover, :focus-visible))`, and one rule that dims the other parts while any row is hovered or focused.
- `sections.css`: port `/* Hero */` (only the sheet variant: `.hero`, `.sheet`, `.sheet--hero`, `.sheet__fig`, `.sheet__dwg`, `.tb`, `.titleblock`), `/* Section heads */`, `/* Services: the key to the drawing */`, `/* Expertise schedule */`, `/* Advisor */`, `/* Contact */`, and their rules from the three responsive blocks. Keep the two-class selectors `.hero.hero--sheet` and `.sheet.sheet--hero`.

- [ ] **Step 6: Create the drawing components**

Port `mock/diagram.mjs` to JSX without changing a coordinate, label or timing: `symbols` becomes `DrawingSymbols`, `wideDrawing()` and `tallDrawing()` become the two `<svg>` elements of `OfficeNetwork`, `minis` becomes `ServiceMini`. Callout numbers come from `CALLOUT`. Each service group is `<Link class="svc" data-svc={slug} href={'/services/' + slug} aria-label={…}>` with the mock's labels.

- [ ] **Step 7: Create the section components and rewrite `HomeView.jsx` as a server component**

Port the mock's `heroSheet`, `servicesBand`, `expertiseBand`, `advisorBand`, `contactPanel` and `contactBand` templates. Section ids: `services`, `expertise`, `advisor`, `contact`. The headline is `pages.home.heading`. "Get Started" goes to `/contact`; "Explore Solutions" and "Explore All Services" go to `/services`; "View Our Team" goes to `/team`. The advisor image keeps its `srcSet`, `sizes`, `width={1200}`, `height={1200}`, `loading="lazy"` and `alt` from the current `TeamView.jsx`.

- [ ] **Step 8: Run everything, do the Visual check on `/`, commit**

Run: `npm run check`
Expected: PASS. Compare the whole home page with the mock in both themes and at 500px. Check that hovering a service row lights its part of the drawing.

```bash
git add -A && git commit -m "feat: rebuild home page around the office network drawing"
```

---

### Task 6: Services index and service pages

**Files:**
- Create: `src/components/drawing/ServiceDetail.jsx`, `src/components/PageHeader.jsx`, `src/components/EndCta.jsx`
- Modify: `src/views/ServicesIndexView.jsx`, `src/views/ServicePageView.jsx`, `src/components/drawing/Symbols.jsx` (add `d-phone`), `src/styles/sections.css`
- Delete: `src/components/ServiceCard.jsx`, `src/components/ServiceIcon.jsx`
- Test: `tests/build/services.test.mjs`

**Interfaces:**
- Consumes: `ServiceRow`, `Schedule`, `Tags`, `splitStep`, icons, `site.whatsappUrl`.
- Produces: `ServiceDetail({ slug })`, one `<svg class="dwg dwg--detail" viewBox="0 0 600 250" role="img" aria-label>`; `PageHeader({ title, lede, children })` rendering the page's `<h1>` and lede; `EndCta({ title, children })`, a `.panel.endcta`.

- [ ] **Step 1: Write `tests/build/services.test.mjs`**

```js
const DETAIL = {
  'software-development': { label: 'Drawing: a web application and a mobile app sharing one database, linked to existing systems.', words: ['Web application', 'Mobile app', 'Database', 'SQL Server, MySQL, MongoDB', 'Existing systems'] },
  'network-infrastructure': { label: 'Drawing: internet link, router, firewall and switch feeding separate segments for cameras, guest Wi-Fi and staff.', words: ['Internet', 'Router', 'MikroTik', 'Firewall', 'Fortinet', 'Cameras', 'Guest Wi-Fi', 'Staff', 'CCTV', 'Office Wi-Fi', 'Workstations'] },
  'it-support-consultancy': { label: 'Drawing: an office with workstations, a server, an access point and a router inside one boundary.', words: ['Your office', 'Workstations', 'Servers', 'Office Wi-Fi', 'Router'] },
  'security-surveillance': { label: 'Drawing: cameras and a recorder, and a door terminal for access control and attendance, on their own network segment.', words: ['Switch', 'Cameras', 'CCTV cameras', 'Recorder', 'Access control', 'Biometric attendance'] },
  'server-cloud-solutions': { label: 'Drawing: a rack of servers, a host running virtual machines, and a link to the cloud.', words: ['Servers', 'Windows, Linux, Active Directory', 'Virtual machines', 'VMware, Hyper-V', 'Cloud', 'AWS, Azure, Google Cloud'] },
};

for (const s of services) {
  const { doc } = loadPage(`/services/${s.slug}`);
  const main = doc.querySelector('main');
  test(`${s.slug}: header`, () => {
    assert.equal(main.querySelector('h1').textContent.trim(), s.name);
    assert.ok(main.textContent.includes(s.heroSubtitle));
    assert.ok(main.querySelector('nav[aria-label="Breadcrumb"] a[href="/services"]'));
    assert.ok(main.querySelectorAll('a.btn[href="/contact"]').some((a) => a.textContent.trim() === 'Get Started Today'));
    assert.ok(main.querySelector('a[href="tel:+8801318121558"]') && main.querySelector(`a[href="${site.whatsappUrl}"]`));
  });
  test(`${s.slug}: detail drawing uses only approved labels`, () => {
    const svg = main.querySelector('figure svg.dwg--detail[role="img"]');
    assert.equal(svg.getAttribute('aria-label'), DETAIL[s.slug].label);
    const words = svg.querySelectorAll('text').map((t) => t.textContent.trim());
    assert.ok(words.length > 0);
    for (const w of words) assert.ok(DETAIL[s.slug].words.includes(w), `unexpected label "${w}"`);
  });
  test(`${s.slug}: body sections`, () => {
    assert.equal(main.querySelectorAll('.spec li').length, s.included.length);
    const steps = main.querySelectorAll('section.inverse ol.steps > li');
    assert.equal(steps.length, 4);
    steps.forEach((li, i) => assert.equal(li.textContent.trim(), s.approach[i]));
    assert.equal(main.querySelectorAll('table.sched tbody tr').length, s.expertiseKeys.length);
    const faqs = main.querySelectorAll('details');
    assert.ok(faqs[0].hasAttribute('open'));
    assert.equal(faqs.filter((d) => d.hasAttribute('open')).length, 1);
    assert.deepEqual(main.querySelectorAll('a.key__row').map((a) => a.getAttribute('href')), s.related.map((r) => `/services/${r}`));
    assert.ok(main.textContent.includes('Ready to discuss your project?'));
  });
}

test('services index', () => {
  const main = loadPage('/services').doc.querySelector('main');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Our Services');
  assert.ok(main.textContent.includes('Cutting-edge IT solutions designed to drive your business forward in the digital age.'));
  assert.deepEqual(main.querySelectorAll('a.key__row').map((a) => a.getAttribute('href')), services.map((s) => `/services/${s.slug}`));
  assert.ok(main.textContent.includes('Ready to transform your business with our expertise?'));
  assert.equal(main.querySelector('.endcta a.btn[href="/contact"]').textContent.trim(), 'Get a Free Consultation');
});
```

- [ ] **Step 2: Build and see it fail**

Run: `npm run build; node --test tests/build/services.test.mjs`
Expected: FAIL.

- [ ] **Step 3: Create `ServiceDetail.jsx`**

Network Infrastructure is a port of `networkDetail()` in `mock/diagram.mjs`. Draw the other four in the same 600 × 250 frame with the existing symbols, the same line style, sub-labels in class `t2`, and cable flags for segments. Visible labels are exactly the `words` lists in the test; nothing else may be written in a drawing.

| Slug | Composition, left to right |
| --- | --- |
| `software-development` | An application window labelled "Web application" above a phone (`d-phone`, new: a 26 × 46 rounded rectangle with a short line near the bottom) labelled "Mobile app"; both wired to one database cylinder labelled "Database" with sub-label "SQL Server, MySQL, MongoDB"; a dashed link from the database to a server unit labelled "Existing systems". |
| `it-support-consultancy` | The dashed office boundary labelled "Your office" on its top edge; inside it a router, two workstations, an access point and a server unit, joined by solid links, labelled "Router", "Workstations", "Office Wi-Fi", "Servers". |
| `security-surveillance` | A small switch labelled "Switch"; one cable with the flag "Cameras" to a recorder labelled "Recorder", which feeds a dome and a bullet camera labelled "CCTV cameras"; a second cable to a door terminal labelled "Access control" with sub-label "Biometric attendance". |
| `server-cloud-solutions` | Three stacked server units labelled "Servers" with sub-label "Windows, Linux, Active Directory"; beside them a larger rounded host box containing three small boxes, labelled "Virtual machines" with sub-label "VMware, Hyper-V"; a dashed link to the cloud labelled "Cloud" with sub-label "AWS, Azure, Google Cloud". |

- [ ] **Step 4: Rewrite the two views as server components**

Port the mock's `serviceView` template and add its styles (`/* Service page */` block and its responsive rules) to `sections.css`. In "Our Approach", `splitStep` gives the bold lead; the words and punctuation of each step are unchanged. Keep every heading of the current `ServicePageView.jsx` ("Overview", "What's Included", "Our Approach", "Technologies & Certifications", "Frequently Asked Questions", "Related Services", "Ready to discuss your project?", "Get Started Today"). The services index is `PageHeader`, the five `ServiceRow`s, and an `EndCta`.

- [ ] **Step 5: Run everything, do the Visual check, commit**

Run: `npm run check`
Expected: PASS, including the existing word-count, FAQ and related-link tests. Visual check `/services` and `/services/network-infrastructure` against the mock, then look at the other four detail drawings in both themes: no label overlaps a line, nothing touches the sheet edge.

```bash
git add -A && git commit -m "feat: rebuild services index and service pages with detail drawings"
```

---

### Task 7: About and Team pages

**Files:**
- Create: `src/content/about.js`
- Modify: `src/views/AboutView.jsx`, `src/views/TeamView.jsx`, `src/styles/sections.css`
- Test: `tests/build/about-team.test.mjs`

**Interfaces:**
- Consumes: `PageHeader`, `TitleBlock`, `AdvisorBand`, `Schedule`, `site`, `services`.
- Produces: `about = { vision, mission, values: [{ title, desc }], teamCta: { title, text, button } }`, every string copied character for character from the current `AboutView.jsx` (the vision and mission keep their surrounding quotation marks).

- [ ] **Step 1: Write `tests/build/about-team.test.mjs`**

```js
test('about', () => {
  const main = loadPage('/about').doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'About Infyta');
  for (const needle of [site.slogan, 'Our Vision', 'Our Mission', about.vision, about.mission, 'Infyta at a glance', 'Our Core Values', 'Meet Our Expert Team', 'The brilliant minds behind our innovative solutions']) assert.ok(text.includes(needle), needle);
  assert.deepEqual(about.values.map((v) => v.title), ['Collaboration', 'Global Mindset', 'Innovation', 'Agility', 'Integrity', 'Partnership']);
  for (const v of about.values) assert.ok(text.includes(v.title) && text.includes(v.desc), v.title);
  const glance = main.querySelector('dl.titleblock');
  assert.deepEqual(glance.querySelectorAll('dt').map((d) => d.textContent.trim()), ['What we do', 'Where we are', 'Services', 'Opening hours', 'Phone', 'Email']);
  assert.equal(main.querySelector('section.inverse a.btn[href="/team"]').textContent.trim(), 'View Our Team');
  assert.equal(main.querySelectorAll('svg, img').length, 0);
});
test('team', () => {
  const main = loadPage('/team').doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Our Dream Team');
  for (const needle of ["The brilliant minds powering Infyta's innovative solutions", 'Our Chief Advisor', chiefAdvisor.name, chiefAdvisor.role, 'Key Highlights', 'Certifications', 'Our Core Expertise', 'Comprehensive IT solutions across multiple domains, delivered by certified professionals', ...chiefAdvisor.highlights, ...chiefAdvisor.certifications]) assert.ok(text.includes(needle), needle);
  assert.equal(main.querySelectorAll('table.sched tbody tr').length, 6);
  assert.equal(main.querySelector('section.inverse img').getAttribute('alt'), 'Md. Arif, Chief Advisor at Infyta');
  assert.equal(main.querySelector('section.inverse a[href="/team"]'), null);
});
```

- [ ] **Step 2: Build and see it fail**

Run: `npm run build; node --test tests/build/about-team.test.mjs`
Expected: FAIL.

- [ ] **Step 3: Implement**

Follow spec sections 7.5 and 7.6. About, in order: `PageHeader` ("About Infyta", `site.slogan`); "Our Vision" and "Our Mission" as two large statements side by side (class `statements`, each an `<h2>` and a paragraph set at the h3 size, one column below 1040px); "Infyta at a glance" as an `<h2>` and a `TitleBlock` rendered as `<dl class="titleblock">` with three columns on desktop; "Our Core Values" as an `<h2>` and a three-by-two list (class `values`) of title and one line, divided by rules; an `inverse` band with the team call to action. Team: `PageHeader`; `AdvisorBand` with `headings` on and `cta` off; "Our Core Expertise" with its line and the `Schedule`. No icons, no drawings, no floating badges on either page. Add to `sections.css`:

- `.statements`: grid, two equal columns, gap `clamp(28px, 5vw, 72px)`; one column below 1040px. Its headings use the item-heading role (1.3rem, width 106%, weight 640). Its paragraphs are `clamp(1.25rem, 1.9vw, 1.6rem)`, width 104%, weight 500, line height 1.35, colour `--fg`, at most `40ch` wide.
- `.titleblock--facts`: the title block as a sheet (1.5px border in `--fg`, 6px radius, `--sheet` fill), three columns; two below 1040px, one below 720px; cells divided by 1px `--rule` lines; cell padding 18px 20px.
- `.values`: grid, three columns, a 1px `--rule` line on top; two columns below 1040px, one below 720px. Each item has padding `24px 24px 24px 0` and a 1px `--rule` line below; the title is an `<h3>`, the line under it is `--fg2`.

- [ ] **Step 4: Run everything, do the Visual check on both pages, commit**

Run: `npm run check`
Expected: PASS, including the existing "Infyta at a glance" test. These pages are not in the mock: check them against spec sections 6 and 7 in both themes and at 500px.

```bash
git add -A && git commit -m "feat: rebuild About and Team pages"
```

---

### Task 8: Contact page and 404

**Files:**
- Create: `src/components/ContactForm.jsx`, `src/components/MapLoader.jsx`
- Modify: `src/views/ContactView.jsx`, `src/app/not-found.jsx`, `src/styles/sections.css`
- Test: `tests/build/contact.test.mjs`

**Interfaces:**
- Consumes: `buildEnquiry`, `whatsappUrl`, `mailtoUrl`, `OpenStatus`, `WeekStrip`, `PageHeader`, icons.
- Produces: `ContactForm({ phoneE164, email })` (client); `MapLoader({ src, title, mapsUrl, address })` (client).

- [ ] **Step 1: Write `tests/build/contact.test.mjs`**

```js
test('contact page', () => {
  const { html, doc } = loadPage('/contact');
  const main = doc.querySelector('main');
  const text = main.textContent.replace(/\s+/g, ' ');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Get In Touch');
  for (const needle of ["Let's discuss how we can transform your business with our tech solutions", 'Send Us A Message', 'Contact Information', 'Our Office', 'Phone', 'WhatsApp', 'Email', 'Working Hours', ...site.hours.display, 'আজিমপুর, ঢাকা']) assert.ok(text.includes(needle), needle);

  const form = main.querySelector('form');
  assert.ok(!form.hasAttribute('action'));
  const fields = { 'cf-first': 'First Name', 'cf-last': 'Last Name', 'cf-email': 'Email', 'cf-message': 'Message' };
  for (const [id, label] of Object.entries(fields)) {
    assert.ok(form.querySelector('#' + id), id);
    assert.equal(form.querySelector(`label[for="${id}"]`).textContent.trim(), label);
  }
  assert.ok(!/placeholder="(John|Doe)"/.test(html));
  assert.deepEqual(form.querySelectorAll('button[type="submit"]').map((b) => [b.getAttribute('value'), b.textContent.trim()]), [['whatsapp', 'Send on WhatsApp'], ['email', 'Send by email']]);

  assert.equal(main.querySelectorAll('iframe').length, 0);
  assert.ok(main.querySelectorAll('button').some((b) => b.textContent.trim() === 'Show map'));
  assert.equal(main.querySelector(`a[href="${site.mapsUrl}"]`).textContent.trim(), 'Open in Google Maps');
  assert.equal(main.querySelectorAll('.week > div').length, 7);
  assert.ok(main.querySelector(`a[href="${site.whatsappUrl}"]`));
  for (const e of publicEmails()) assert.ok(main.querySelector(`a[href="mailto:${e}"]`), e);
});
test('404 page', () => {
  const doc = parse(readFileSync(join(OUT, '404.html'), 'utf8'));
  const main = doc.querySelector('main');
  assert.equal(main.querySelector('h1').textContent.trim(), 'Page not found');
  assert.ok(main.textContent.includes('The page you are looking for does not exist or has moved.'));
  assert.equal(main.querySelector('a.btn[href="/"]').textContent.trim(), 'Go to Home');
  assert.equal(main.querySelector('a.btn[href="/services"]').textContent.trim(), 'View Our Services');
});
```

- [ ] **Step 2: Build and see it fail**

Run: `npm run build; node --test tests/build/contact.test.mjs`
Expected: FAIL.

- [ ] **Step 3: Implement `ContactForm`**

Four fields with visible labels: `cf-first`, `cf-last`, `cf-email` (type `email`, placeholder `your@email.com`), `cf-message` (textarea, 5 rows, placeholder `Tell us about your project...`). Layout: a grid with an 18px gap; First Name and Last Name share a row from 720px up. Labels use weight 560 and sit 6px above their field. Fields are full width with padding 12px 14px, a 1.5px border in `--rule`, `--panel` fill, 5px radius, the text colour `--fg` and the standard focus outline. The two buttons sit in one row and wrap on narrow screens. On submit, prevent the default, read which button was used from the submitter's `value`, and call `buildEnquiry`. If it is not ok: show `<p id="cf-error" role="alert">Write a message first.</p>` under the message field, set `aria-invalid="true"` and `aria-describedby="cf-error"` on it, focus it, and open nothing. Otherwise open `whatsappUrl(phoneE164, text)` in a new tab, or set `window.location.href` to `mailtoUrl(email, subject, text)`. Never show a "sent" message.

- [ ] **Step 4: Implement `MapLoader`, `ContactView`, `not-found.jsx`**

- `MapLoader`: a `.sheet` showing the address, the link "Open in Google Maps" and the button "Show map". Clicking the button replaces it with the existing `<iframe>` (same `src`, `title="Infyta Office Location"`, `loading="lazy"`) at the current height (256px, 320px from 720px up).
- `ContactView` (server): `PageHeader`; two columns that become one below 1040px. Left: the `<h2>` "Send Us A Message" and `ContactForm`. Right: the `<h2>` "Contact Information"; a `.panel` with `<OpenStatus variant="long" />`, the label "Dhaka time", `<WeekStrip />` and a facts list: Our Office (address, the `lang="bn"` place name, "Open in Google Maps"), Phone, WhatsApp (link text is the phone number), Email (every address from the `emails` prop), Working Hours (`site.hours.display`). Then `MapLoader`.
- `not-found.jsx`: one `.band` with the existing heading, sentence and two links, styled as `.btn` and `.btn.btn--ghost`. Keep its `metadata`. No drawing on this page.

- [ ] **Step 5: Run everything, do the Visual check, try the form by hand**

Run: `npm run check`
Expected: PASS. Then `npm run preview`, open `/contact`, and confirm: an empty message shows "Write a message first." and opens nothing; a filled form opens WhatsApp with the text; "Send by email" opens the mail app with subject and body; "Show map" loads the map.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: rebuild Contact page with a hand-off form, and 404"
```

---

### Task 9: Remove the old system, update the docs, verify

**Files:**
- Modify: `package.json`, `src/app/layout.jsx`, `scripts/resize-images.mjs`, `docs/review-list.md`, `docs/deploy-cloudflare.md`, `README.md`
- Delete: `tailwind.config.js`, `postcss.config.mjs`, `src/app/globals.css`, `src/components/FloatingOrbs.jsx`, `src/components/MotionProvider.jsx`, `public/images/hero/`
- Test: `tests/build/cleanup.test.mjs`

**Interfaces:**
- Consumes: everything above. Produces nothing new.

- [ ] **Step 1: Write `tests/build/cleanup.test.mjs`**

```js
const GONE = ['swiper', 'framer-motion', 'react-icons', 'tailwindcss', 'autoprefixer'];
test('old dependencies are gone', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const name of GONE) assert.ok(!(name in { ...pkg.dependencies, ...pkg.devDependencies }), name);
  for (const file of sourceFiles('src')) {
    const src = readFileSync(file, 'utf8');
    for (const name of [...GONE, '@tailwind']) assert.ok(!src.includes(name), `${file} mentions ${name}`);
  }
  for (const f of ['tailwind.config.js', 'postcss.config.mjs', 'src/sections', 'public/images/hero', join(OUT, 'images/hero')]) assert.ok(!existsSync(f), f);
});
test('no page hides content with an inline style or uses a Tailwind palette class', () => {
  for (const file of allHtmlFiles()) {
    const html = readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /style="[^"]*opacity:\s*0(?![.\d])/, file);
    assert.doesNotMatch(html, /class="[^"]*\b(?:bg|text|from|to|via|border)-(?:blue|purple|red|pink|green|yellow|orange|indigo|gray|teal)-\d{2,3}\b/, file);
  }
});
test('home ships less JavaScript than before the redesign', () => {
  const { html } = loadPage('/');
  const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1].split('?')[0]))];
  const bytes = srcs.reduce((n, s) => n + statSync(join(OUT, s)).size, 0);
  assert.ok(bytes < 745092, `home references ${bytes} bytes of script; it was 745092 before`);
});
```

`sourceFiles` walks `.js`, `.jsx` and `.css` files, as in `tests/unit/render-purity.test.mjs`.

- [ ] **Step 2: Build and see it fail**

Run: `npm run build; node --test tests/build/cleanup.test.mjs`
Expected: FAIL on the dependency test.

- [ ] **Step 3: Remove the old system**

Run: `npm uninstall swiper framer-motion react-icons tailwindcss autoprefixer postcss`

Delete the files listed above. Delete `src/app/globals.css` and its import in `layout.jsx`; add it to the delete list above. Remove the hero entries from `scripts/resize-images.mjs`, keeping the advisor photo job. Search `src/` for any leftover `"use client"` in a view and remove it where the file no longer needs it.

- [ ] **Step 4: Update the documents**

- `docs/review-list.md`: add a section "4. Visible changes in the redesign" listing, for the owner to read: the new look and two themes; the home page's new sections; the nine calls from spec section 12; every new label from spec section 6.9, including each drawing's labels; and the two removed lines.
- `docs/deploy-cloudflare.md`: in the preview steps replace the branch name `nextjs-seo-migration` with `visual-redesign`; replace the "Visual" check that says the preview should match the old site with: compare the preview with `docs/superpowers/specs/2026-11-16-visual-redesign-assets/mockup.html` in both themes; raise the Lighthouse line to Performance 95 or more and Accessibility 98 or more.
- `README.md`: update anything that names Tailwind, Swiper or the hero images.

- [ ] **Step 5: Run everything**

Run: `npm run check`
Expected: PASS, every test file.

- [ ] **Step 6: Measure with Lighthouse**

```bash
(npx wrangler pages dev out --port 8788 >/dev/null 2>&1 &) && sleep 6
for p in "" "services/network-infrastructure"; do
  npx lighthouse "http://localhost:8788/$p" --only-categories=performance,accessibility --quiet --chrome-flags="--headless=new" --output=json --output-path=/tmp/lh.json
  node -e "const c=require('/tmp/lh.json').categories;console.log('/$p',c.performance.score,c.accessibility.score)"
done
pkill -f "wrangler pages dev"
```

Expected: Performance 0.95 or more and Accessibility 0.98 or more on both. If Performance is short, first narrow the font: build Archivo with only the ranges the design uses (width 78 to 116, weight 400 to 720). If Accessibility is short, fix what the report lists. Record the four scores in the new section of `docs/review-list.md`. If Lighthouse cannot run here, say so in that section instead of leaving it blank.

- [ ] **Step 7: Final look at every route**

Run the Visual check for all ten routes and `/404.html`, in both themes and at 500px. Confirm on the home page that the drawing draws itself once on load, and with reduced motion turned on in the OS that it appears complete at once.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: remove Tailwind, Swiper, framer-motion and react-icons; update docs"
```
