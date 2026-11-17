# Colour and 3D-Style Drawings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the live Infyta site its approved colour system and replace the flat hero and service-page drawings with 3D-style (isometric) drawings in which each service has one colour and its own island, without changing content, URLs or SEO output.

**Architecture:** The approved mockup is ported, not redesigned. Colours become fixed tokens in `tokens.css`, mapped per service through `data-svc`. The colour pass is plain CSS plus a few class names in the views. The 3D drawings are server-rendered SVG built from a small pure geometry module (`src/lib/iso.js`) and JSX parts; they ship no client JavaScript. Highlight and motion are CSS only.

**Tech Stack:** Next.js 16 App Router (static export), React 19, plain CSS with custom properties, `node:test`, `node-html-parser`. No new dependency.

**Spec:** `docs/superpowers/specs/2026-11-17-colour-and-3d-drawings-design.md`. Read it first. It builds on `docs/superpowers/specs/2026-11-16-visual-redesign-design.md` ("the first design"). The mockup it names is the visual source of truth: `docs/superpowers/specs/2026-11-17-colour-levels-assets/` (`mockup-colour-levels.html`, `mockup-service-page.html`, `iso.mjs`, `levels.css`, `build.mjs`). Below, "the mock" means those files, viewed at level 3.

## Start Here

Read this section first, whether you are starting at Task 1 or resuming after an interruption.

### 1. Check the starting state

Run from the repository root (`infyta-frontend`):

```bash
git branch --show-current     # must print: colour-levels
git status --short            # before Task 1: nothing, or only "?? .superpowers/"
git log --oneline -15         # shows which task commits already exist
node -v                       # v22 or newer
[ -d node_modules ] || npm ci
npm run check                 # must pass before you change anything
```

- Work in this checkout, on this branch. Do not create a worktree and do not switch branches: the owner resumes from this folder.
- **Where to resume:** the first unticked `- [ ]` box below is the next step. If the working tree is dirty, a task was interrupted: do not discard anything. Read `git diff --stat`, finish that task from where it stopped, and run its tests.
- **Expected baseline** (measured 2026-11-17 on this branch): 82 unit tests pass, the build exports 18 pages, 249 build tests pass, lint prints no errors and no warnings.

### 2. How to run the plan

1. The session that runs this plan is the **controller**. It uses the skill `superpowers:subagent-driven-development` and does not write product code itself.
2. Tasks run strictly in order, 1 to 8, one at a time. They share one working tree, so never run two implementers at once.
3. For each task: dispatch one implementer with the brief described below; then a spec-compliance reviewer; then a quality reviewer; send findings back to an implementer until both pass. Where the table gives both reviewers the same model, one reviewer may cover both parts.
4. Then the controller itself runs `npm run check`, reads the output, and only if it passes: ticks the task's boxes in this file, updates the status table in `docs/superpowers/specs/2026-11-17-colour-levels-assets/README.md`, and commits.
5. Keep a ledger at `.superpowers/sdd/2026-11-17-colour-and-3d-drawings/progress.md` (git-ignored): one line per dispatch, review result, fix round and task completion.
6. **Checkpoint at every phase**, because the owner's device may lose power: ledger line, status table and commit after each dispatch result, review result and fix round. Commit a checkpoint before dispatching an implementer, never while one is working.
7. After Task 8, dispatch one whole-branch reviewer (`git diff master...colour-levels -- src tests`), fix what it finds, then use `superpowers:finishing-a-development-branch`. Do not merge or push unless the owner asks in so many words.

Stop and ask the owner only when: a task would need a change to approved wording or to a call in spec section 13; `npm run check` cannot be made to pass without weakening a test this plan does not tell you to replace; or a tool this plan needs is missing.

### 3. Models

The owner's instruction, to be followed for every dispatch:

> Optimize the token usage without compromising the quality. Use Sonnet and Haiku where it will not impact the quality of output, and Opus where needed.

Always pass `model` explicitly when dispatching; never let a subagent inherit the session's model.

| Task | Implementer | Spec-compliance reviewer | Quality reviewer | Why |
| --- | --- | --- | --- | --- |
| 1. Colour tokens | sonnet | sonnet | sonnet | Exact values and full tests are given. |
| 2. Colour pass: components and home | sonnet | sonnet | opus | Rules are spelled out; the review compares the home page with the mock by eye. |
| 3. Colour pass: inner pages | sonnet | sonnet | opus | No mock exists for About, Team and Contact, so the review needs a designer's eye. |
| 4. Geometry and parts | sonnet | sonnet | sonnet | Pure functions pinned by numbers. |
| 5. Hero scene and layout | opus | sonnet | opus | A port plus a new structure (five links, hit shapes) that the mock does not have. |
| 6. Highlight, motion, small screens | opus | sonnet | opus | `:has()` specificity, motion limits and keyboard focus are easy to get subtly wrong. |
| 7. Service page drawings | opus | sonnet | opus | Four new drawings need design judgement. |
| 8. Cleanup, docs, verification | sonnet | sonnet | sonnet | Mechanical. |
| Whole-branch review at the end | | | opus | The last gate before the owner sees it. |

- Use `haiku` only for pure look-ups (finding a string, listing files, checking that a class name is unused).
- **Escalate:** if a Sonnet implementer fails the same review twice, or says it is unsure, give that fix to Opus. If Lighthouse misses its target in Task 8, give the diagnosis to Opus.
- **Do not downgrade** an Opus row to save tokens.

Ways to save tokens that do not cost quality:

- The controller never reads `iso.mjs`, `levels.css`, `build.mjs` or the views itself. It hands each subagent paths and the "Read first" list for its task.
- An implementer's brief is: the Global Constraints and Port Rules sections of this plan, word for word; the full text of its task; and its "Read first" list. Tell it not to explore beyond those unless a test forces it to.
- A reviewer's brief is: the task text, the named spec sections, and the commit range to review (`git diff <before>..HEAD`). Not the whole repository.
- While working, an implementer runs only its own test files. The full `npm run check` runs once, at the end of the task.
- A visual check is at most six screenshots per task.

| Task | Read first |
| --- | --- |
| 1 | Spec 6.2, 6.3, 6.4. `src/styles/tokens.css`. `tests/unit/tokens.test.mjs`. |
| 2 | Spec 6.5, 8.2, 9, 9.1. `levels.css` from `/* Level 1` to the end of the `/* The service list` block. `src/styles/base.css`, `shell.css`, `sections.css`. `src/views/HomeView.jsx`. |
| 3 | Spec 6.5, 9, 9.2. The `/* Service page */` block of `levels.css`. The six views in `src/views/`. `src/components/EndCta.jsx`. |
| 4 | Spec 7.2. `iso.mjs` from the top to the `PH` line. |
| 5 | Spec 7.1 to 7.5. All of `iso.mjs` except `isoSoftwareDetail`. The `/* Level 3` block of `levels.css`. `src/views/HomeView.jsx`, `src/components/drawing/OfficeNetwork.jsx` (for how links and names are written today). |
| 6 | Spec 7.5, 7.6, 7.7. `src/styles/drawing.css`. `tests/unit/drawing-css.test.mjs`. |
| 7 | Spec 8.1. `isoSoftwareDetail` in `iso.mjs`. `src/components/drawing/ServiceDetail.jsx`. The `DETAIL` table in `tests/build/services.test.mjs`. |
| 8 | Spec 10, 12, 13, 16. `docs/review-list.md` section 4. |

### 4. Tools, plugins and skills

Plugins that must be enabled in the session: **superpowers** and **frontend-design**.

| Skill | Who uses it, and when |
| --- | --- |
| `superpowers:subagent-driven-development` | The controller, for the whole plan. Required. |
| `superpowers:test-driven-development` | Every implementer: write the task's tests first and watch them fail. |
| `superpowers:verification-before-completion` | Every implementer and the controller, before calling a task done. |
| `superpowers:systematic-debugging` | Anyone, as soon as a test, build or lint failure is not obvious. |
| `frontend-design:frontend-design` | The implementer and quality reviewer of Task 7, and the quality reviewer of Task 3, where no mock exists. It must not be used to restyle anything the mock already defines. |
| `superpowers:finishing-a-development-branch` | The controller, after the whole-branch review. |
| A browser skill (`claude-in-chrome`, or the built-in browser) | For the by-hand checks in Task 6 (hover, keyboard, phone). If none is available, list those checks for the owner instead of skipping them silently. |

Tools on this machine:

| Tool | Use |
| --- | --- |
| Node 22 and npm | Everything. `npm run check` is the gate. |
| `npx wrangler pages dev out --port 8788` (`npm run preview`) | Serves the static export with clean URLs. |
| Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` | Headless screenshots: `--headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,1000 --virtual-time-budget=9000 --screenshot=<file.png> <url>`. |
| `npx lighthouse` | Task 8 scores. |

No connector (Supabase, Atlassian, Hugging Face, Google Drive) is needed. Do not use one.

### 5. Facts already checked, so nobody has to check them again

- The only files under `src/` that contain a hex colour today are `src/styles/tokens.css`, `src/lib/theme-script.js` and `src/components/Logo.jsx`.
- CSS `offset-path: path("…")` with `offset-distance` moves an SVG `<circle>` along a path in this Chrome. A paused animation with a negative `animation-delay` shows a dot mid-path in a screenshot.
- Headless Chrome will not lay a page out narrower than 500px. For a phone screenshot, write a wrapper page holding `<iframe src="…" style="width:390px;height:1700px;border:0">` and screenshot the wrapper.
- This Mac is in dark appearance, so headless Chrome renders Blueprint by default. `--blink-settings=preferredColorScheme=1` forces Paper and `--blink-settings=preferredColorScheme=0` forces Blueprint.
- The mock opens at a chosen state with a hash: `mockup-colour-levels.html#l=3&t=light` (`t=dark` for Blueprint; `&h=<slug>` holds one service lit).
- React writes `<!-- -->` between a text node and a neighbouring element in exported HTML. `textContent` is not affected.
- A custom property declared with `var()` is worked out on the element that declares it. So `[data-svc]{--svc:var(--sw)}` picks up `.inverse`'s value of `--sw` when the element is `.inverse` itself or sits inside one.
- The small drawings use these symbols: `d-app`, `d-bullet`, `d-cloud`, `d-db`, `d-dome`, `d-firewall`, `d-nvr`, `d-pc`, `d-router`, `d-server`. After Tasks 5 and 7 nothing uses `d-switch`, `d-switch-s`, `d-ap`, `d-door` or `d-phone`.
- The mock's 3D hero is 29.4KB of markup.
- ESLint ignores `docs/**`.

## Global Constraints

- Branch `colour-levels`. Commit at the end of every task and at every checkpoint. Never push, never merge. End commit messages with a `Co-Authored-By:` line naming the model the session runs on.
- `npm run check` (unit tests, build, build tests, lint) passes at the end of every task.
- Existing copy is unchanged. No new visible words. The only changed words are the ones in spec section 12.
- Where the spec and the mock disagree, the spec wins. Where the spec is silent, the mock at level 3 decides. Do not restyle: keep the mock's values and drawing coordinates.
- New colours go in `src/styles/tokens.css` as `#RRGGBB`, `rgba(r,g,b,a)` or `var(--x)`. Components and other stylesheets use tokens only. `color-mix(` appears nowhere under `src/`.
- Every token redefined for dark or inverse exists on `:root`, has the same value in the dark media query and under `:root[data-theme="dark"]`, and is reset to its `:root` value in the print block.
- A service colour is used only for its service. Amber is also the primary button and the closed dot. Teal is also the site accent.
- No soft shadow, blur or gradient. A slab is `box-shadow` with zero blur.
- No new client JavaScript, font, image or dependency. The drawings are server components.
- One `<h1>` per page, text unchanged. No element carries an inline `opacity:0`. No Tailwind palette class.
- Do not wrap a page's sections in an extra element: `shell.css` reads `<main>`'s direct children.
- `tel:` links are exactly `tel:+8801318121558`. `src/content/email.js` stays server-only.

## Port Rules

The mock was built for speed. These are its shortcuts; do not port them.

| In the mock | In the site |
| --- | --- |
| `html.l1`, `html.l2`, `html.l3` prefixes; `.x1`, `.x2`, `.x3` | The site is always level 3. Drop the prefixes and write the rules into the site's own stylesheets. Level 2's additions to the flat hero drawing (`build.mjs`, `home()`) are not built: the flat hero is deleted. |
| `color-mix(in srgb, var(--svc) N%, …)` | A token from the table below. |
| Every piece of the 3D drawing wrapped in its own `<a>` | Five links only (Task 5). |
| Dots that loop forever (`animateMotion`); no fade-in | The timings in spec 7.7, in CSS (Task 6). |
| The bar, its script, `data-hl`, the sample "Open now" status | Not built. |
| `main[data-svc]` | `data-svc` on each `<section>` of a service page. |

Class to token, for everything ported from `levels.css` and `iso.mjs`:

| Mock class or mix | Site rule |
| --- | --- |
| `.ft`, `.fl`, `.fr` (equipment faces) | `fill: var(--svc-top)`, `var(--svc-left)`, `var(--svc-right)` |
| `.pt`, `.pl`, `.pr` (island faces) | `fill: var(--svc-floor)`, `var(--svc-left)`, `var(--svc-right)` |
| `.nt`, `.nl`, `.nr` | `fill: var(--dw-n-top)`, `var(--dw-n-left)`, `var(--dw-n-right)` |
| `.wa`, `.wb`, `.floor` | `fill: var(--dw-wall-a)`, `var(--dw-wall-b)`, `var(--dw-floor)` |
| `.b1`, `.b2` (base faces) | `fill: var(--fg)`, `var(--dw-base-b)` |
| `.unit`, `.card` | `fill: var(--sheet)` |
| `.solid`, `.slab` (inside a drawing) | `fill: var(--svc); stroke: none` |
| `.soft` | `fill: var(--svc-floor); stroke: none` |
| `.ondark` | `fill: var(--ink); stroke: none` |
| `.cab` | `stroke: var(--svc-line); stroke-width: 2.6; fill: none`; `.cab--dash` adds `stroke-dasharray: 6 5` |
| `.flow` | `fill: var(--svc-line); stroke: var(--sheet); stroke-width: 1.5` |
| `.bub circle`, `.bub text` | `fill: var(--svc-chip)`, `fill: var(--svc-chip-fg)` |
| `.bub.inv` | class `bub--inv`: circle `fill: var(--sheet)`, text `fill: var(--fg)` |
| `.basetext` | `fill: var(--sheet); stroke: none; font-size: 16.5px; font-weight: 660; font-stretch: 98%` |
| Zone, tile and row washes (`var(--zonepct)`) | `var(--svc-wash)` |
| Tile on hover (`var(--p-top)`) | `var(--svc-floor)` |
| Flat device fill in small drawings (`var(--i-left)`) | `--body: var(--svc-left)` |
| `--band-alt`, `--c-amber`, `#FFB83D` | `var(--band-alt)`, `var(--amber)`, `var(--amber-hover)` |

## Review Focus

Conditions the spec implies but no feature test would otherwise exercise. Each has a test or check in the task named.

1. **A browser without `:has()`** (older Android): the drawing must be complete, undimmed, and every link must work. Task 6: every rule that sets `opacity:.24` has `:has(` in its selector.
2. **Keyboard only:** Tab reaches exactly five stops in the drawing, in service order, each visibly focused. Task 5: five `<a>`, no `tabindex`. Task 6: a focus rule exists, and a by-hand check.
3. **A 320px phone:** no sideways scroll from the slabs, and the enlarged pins stay inside the sheet. Task 6: screenshot at 320px.
4. **Content edited later:** a headline without the word "Limitless" still renders whole, and a service added to `services.js` without a colour block fails a test instead of rendering black. Task 5: `splitHeadline`. Task 1: a mapping block for every slug.
5. **Printing from Blueprint:** slabs do not print and the teal band's text stays navy. Task 2: print rule test.

## File Structure

| File | Responsibility | Task |
| --- | --- | --- |
| `src/styles/tokens.css` (modify) | Every colour value | 1 |
| `src/styles/services.css` (create) | Maps `data-svc` to `--svc-*` | 1 |
| `src/styles/base.css`, `shell.css`, `sections.css` (modify) | The colour pass | 2, 3, 5 |
| `src/lib/headline.js` (create) | `splitHeadline` | 5 |
| `src/lib/iso.js` (create) | Projection and face geometry, pure | 4 |
| `src/components/drawing/iso/parts.jsx` (create) | `Box`, `FaceRect`, `Dot`, `Cyl`, `Pin`, `Lay`, `Cable` | 4 |
| `src/components/drawing/iso/zones.jsx` (create) | The six zone builders | 5 |
| `src/components/drawing/iso/AppCard.jsx` (create) | The flat app window and phone | 5 |
| `src/components/drawing/OfficeIso.jsx` (create) | The hero scene | 5 |
| `src/components/drawing/OfficeNetwork.jsx` (delete) | The flat hero | 5 |
| `src/styles/drawing.css` (modify) | Drawing styles, highlight, motion | 5, 6, 8 |
| `src/components/drawing/ServiceDetail.jsx` (rewrite) | Five service-page drawings | 7 |
| `src/components/drawing/Symbols.jsx` (modify) | Flat symbols still in use | 8 |
| `src/views/*.jsx`, `src/components/EndCta.jsx`, `ContactPanel.jsx`, `AdvisorBand.jsx` (modify) | Band classes, slabs, `data-svc` | 2, 3, 5 |
| `tests/unit/tokens.test.mjs`, `drawing-css.test.mjs` (modify); `colour-rules.test.mjs`, `iso.test.mjs`, `headline.test.mjs` (create) | Unit tests | 1, 4, 5, 6 |
| `tests/build/home.test.mjs`, `services.test.mjs` (modify); `colour.test.mjs` (create) | Build tests | 2, 3, 5, 7 |

---

### Task 1: Colour tokens

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/shell.css:25`, `src/app/layout.jsx`
- Create: `src/styles/services.css`, `tests/unit/colour-rules.test.mjs`
- Test: `tests/unit/tokens.test.mjs`

**Interfaces:**
- Produces, on `:root`: `--amber`, `--amber-hover`, `--amber-halo`, `--btn-hover`, `--btn-halo`, `--band-alt`, `--band-tint`, `--tag-bg`, `--tag-line`, `--cta-fg2`, `--cta-rule`, `--it-wash`, `--dw-floor`, `--dw-wall-a`, `--dw-wall-b`, `--dw-n-top`, `--dw-n-left`, `--dw-n-right`, `--dw-base-b`, and for each prefix `sw`, `net`, `sec`, `srv`: `--P`, `--P-line`, `--P-wash`, `--P-floor`, `--P-top`, `--P-left`, `--P-right`, `--P-chip`.
- Produces: class `.paper-card` (Paper tokens on one element, in any theme).
- Produces, on any element with `data-svc`: `--svc`, `--svc-line`, `--svc-wash`, `--svc-floor`, `--svc-top`, `--svc-left`, `--svc-right`, `--svc-chip`, `--svc-chip-fg`.

- [x] **Step 1: Write the failing token tests** in `tests/unit/tokens.test.mjs`

Change the `brand constants` test: `'--amber': '#F5A623'`, and add `'--amber-hover': '#FFB83D'`. Then add:

```js
const SERVICES = {
  Paper: {
    sw:  ['#F5A623', '#C27500', '#FEF3E2', '#FDEDD3', '#FCE7C4', '#FAD391', '#F8BD5C', '#FAD391'],
    net: ['#3AC1C2', '#0E8F93', '#E5F7F7', '#D8F3F3', '#CAEEEF', '#9DE0E1', '#6DD1D2', '#9DE0E1'],
    sec: ['#8A70F2', '#5E45CC', '#F0ECFD', '#E8E2FC', '#DFD8FB', '#C5B8F9', '#A895F5', '#C5B8F9'],
    srv: ['#4D8EF7', '#2563DB', '#E8F0FE', '#DBE8FD', '#CFE0FD', '#A6C7FB', '#7BABF9', '#A6C7FB'],
  },
  Blueprint: {
    sw:  ['#F5A623', '#F5A623', '#464257', '#6D5C5D', '#E09A29', '#AC7D38', '#7D6246', '#F5A623'],
    net: ['#3AC1C2', '#3AC1C2', '#244773', '#2D6593', '#37B2B8', '#318EA1', '#2B6E8C', '#3AC1C2'],
    sec: ['#A996FF', '#A996FF', '#383F7E', '#5357A8', '#9B8BEF', '#7A72CA', '#5C5BA7', '#A996FF'],
    srv: ['#6EA4FF', '#6EA4FF', '#2D427E', '#3F5BA8', '#6698EF', '#537BCA', '#4261A7', '#6EA4FF'],
  },
};
const PARTS = ['', '-line', '-wash', '-floor', '-top', '-left', '-right', '-chip'];
const OTHER = {
  Paper:     { '--band-alt': '#FFFFFF', '--it-wash': '#E2E4EB', '--dw-floor': '#FFFFFF', '--dw-wall-a': '#EEF1F8', '--dw-wall-b': '#E0E6F2', '--dw-n-top': '#FFFFFF', '--dw-n-left': '#E4E9F4', '--dw-n-right': '#CCD4E7', '--dw-base-b': '#4C5681' },
  Blueprint: { '--band-alt': '#1A2556', '--it-wash': '#47527E', '--dw-floor': '#27367B', '--dw-wall-a': '#243270', '--dw-wall-b': '#1C2860', '--dw-n-top': '#3A4A96', '--dw-n-left': '#2B3A80', '--dw-n-right': '#1B2759', '--dw-base-b': '#D2D5E0' },
};
const hexOf = (scope, name) => value(scope, name).toUpperCase();
for (const theme of ['Paper', 'Blueprint']) {
  test(`service and drawing tokens: ${theme}`, () => {
    for (const [p, vals] of Object.entries(SERVICES[theme])) PARTS.forEach((part, i) => assert.equal(hexOf(themes[theme], `--${p}${part}`), vals[i], `--${p}${part}`));
    for (const [k, v] of Object.entries(OTHER[theme])) assert.equal(hexOf(themes[theme], k), v, k);
  });
}
test('inside an inverse band, service tokens take their Blueprint values in both themes', () => {
  for (const name of ['inverse band on Paper', 'inverse band on Blueprint']) {
    for (const [p, vals] of Object.entries(SERVICES.Blueprint)) PARTS.forEach((part, i) => assert.equal(hexOf(themes[name], `--${p}${part}`), vals[i], `${name} --${p}${part}`));
    assert.equal(hexOf(themes[name], '--it-wash'), '#47527E');
  }
});
test('translucent tokens', () => {
  const want = { '--band-tint': 'rgba(58,193,194,.11)', '--tag-bg': 'rgba(58,193,194,.17)', '--tag-line': 'rgba(58,193,194,.62)', '--cta-fg2': 'rgba(31,44,98,.88)', '--cta-rule': 'rgba(31,44,98,.28)', '--amber-halo': 'rgba(245,166,35,.25)', '--btn-halo': 'rgba(31,44,98,.2)' };
  for (const [k, v] of Object.entries(want)) assert.equal(root[k].replace(/\s+/g, ''), v, k);
});
test('contrast: navy on every chip, on amber and on teal is at least 4.5:1', () => {
  const ink = rgba(root['--ink']).slice(0, 3);
  for (const [name, scope] of Object.entries(themes)) for (const p of ['sw', 'net', 'sec', 'srv']) {
    const r = ratio(ink, rgba(value(scope, `--${p}-chip`)).slice(0, 3));
    assert.ok(r >= 4.5, `${name} --${p}-chip: ${r.toFixed(2)}`);
  }
  for (const k of ['--amber', '--amber-hover', '--signal']) assert.ok(ratio(ink, rgba(root[k]).slice(0, 3)) >= 4.5, k);
  const teal = rgba(root['--signal']).slice(0, 3);
  assert.ok(ratio(over(rgba(root['--cta-fg2']), teal), teal) >= 4.5, '--cta-fg2 on --signal');
});
test('contrast: every service line on the sheet is at least 3:1', () => {
  for (const theme of ['Paper', 'Blueprint']) for (const p of ['sw', 'net', 'sec', 'srv']) {
    const r = ratio(rgba(value(themes[theme], `--${p}-line`)).slice(0, 3), rgba(value(themes[theme], '--sheet')).slice(0, 3));
    assert.ok(r >= 3, `${theme} --${p}-line: ${r.toFixed(2)}`);
  }
});
```

- [x] **Step 2: Write the failing rule tests** in `tests/unit/colour-rules.test.mjs`

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { services } from '../../src/content/services.js';

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : /\.(js|jsx|css)$/.test(e.name) ? [join(dir, e.name)] : []));
const HEX_OK = ['src/styles/tokens.css', 'src/lib/theme-script.js', 'src/components/Logo.jsx'];

test('no colour value outside the token file, and no color-mix anywhere', () => {
  for (const f of files('src')) {
    const text = readFileSync(f, 'utf8');
    assert.ok(!text.includes('color-mix('), `${f} uses color-mix`);
    if (!HEX_OK.includes(f)) assert.doesNotMatch(text, /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/, `${f} has a hex colour`);
  }
});
test('every service has a block that maps its colour', () => {
  const css = readFileSync('src/styles/services.css', 'utf8');
  for (const { slug } of services) {
    const m = css.match(new RegExp(`\\[data-svc="${slug}"\\]\\s*\\{([^}]*)\\}`));
    assert.ok(m, `no block for ${slug}`);
    for (const t of ['--svc:', '--svc-line:', '--svc-wash:', '--svc-floor:', '--svc-top:', '--svc-left:', '--svc-right:', '--svc-chip:', '--svc-chip-fg:']) assert.ok(m[1].includes(t), `${slug} lacks ${t}`);
  }
});
```

- [x] **Step 3: Run both files and watch them fail**

Run: `node --test tests/unit/tokens.test.mjs tests/unit/colour-rules.test.mjs`
Expected: FAIL (`--amber` is `#E9A23B`; `--sw is not defined`; no `services.css`).

- [x] **Step 4: Add the tokens to `src/styles/tokens.css`**

- `:root`: change `--amber`; add every token in the Interfaces list with its Paper value from the tests. `--btn-hover: var(--amber-hover)`. Each `--P-chip` is written as its own hex (the test reads values, not aliases, so either form passes; hex keeps the dark and inverse blocks simple).
- Both dark blocks (the media query and `:root[data-theme="dark"]`, identical): the Blueprint values of the 32 service tokens, `--it-wash`, `--band-alt` and the seven `--dw-*` tokens.
- `.inverse`: the Blueprint values of the 32 service tokens and `--it-wash`.
- The print block: reset every token added to a dark block or to `.inverse` to its `:root` value.
- Add after `.inverse`:

```css
/* A white card with navy text in any theme (the contact card inside the teal band). */
.paper-card {
  --bg: var(--white); --fg: var(--ink); --fg2: rgba(31,44,98,.76); --rule: rgba(31,44,98,.17);
  --panel: var(--white); --accent: var(--signal-deep); --hatch: rgba(31,44,98,.07);
  background: var(--white); color: var(--ink);
}
```

- [x] **Step 5: Create `src/styles/services.css`** and import it in `src/app/layout.jsx` right after `tokens.css`

Five blocks, one per slug. The four coloured services map straight through, for example:

```css
[data-svc="software-development"] {
  --svc: var(--sw); --svc-line: var(--sw-line); --svc-wash: var(--sw-wash); --svc-floor: var(--sw-floor);
  --svc-top: var(--sw-top); --svc-left: var(--sw-left); --svc-right: var(--sw-right);
  --svc-chip: var(--sw-chip); --svc-chip-fg: var(--ink);
}
```

`network-infrastructure` uses `net`, `security-surveillance` uses `sec`, `server-cloud-solutions` uses `srv`. IT Support has no hue:

```css
[data-svc="it-support-consultancy"] {
  --svc: var(--fg); --svc-line: var(--fg); --svc-wash: var(--it-wash); --svc-floor: var(--dw-n-right);
  --svc-top: var(--sheet); --svc-left: var(--sheet); --svc-right: var(--dw-n-right);
  --svc-chip: var(--fg); --svc-chip-fg: var(--bg);
}
```

- [x] **Step 6: Point the closed dot's halo at the token** in `src/styles/shell.css:25`: `box-shadow: 0 0 0 3px var(--amber-halo)`.

- [x] **Step 7: Run the tests**

Run: `node --test tests/unit/tokens.test.mjs tests/unit/colour-rules.test.mjs`
Expected: PASS, including the existing dark-equality and print tests.

- [x] **Step 8: Commit**

```bash
git add src/styles/tokens.css src/styles/services.css src/styles/shell.css src/app/layout.jsx tests/unit/tokens.test.mjs tests/unit/colour-rules.test.mjs
git commit -m "feat: colour tokens for services, bands and drawings"
```

---

### Task 2: Colour pass: components and home

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/shell.css`, `src/styles/sections.css`, `src/styles/drawing.css`, `src/views/HomeView.jsx`, `src/components/ContactPanel.jsx`, `src/components/AdvisorBand.jsx`
- Create: `tests/build/colour.test.mjs`
- Test: `tests/unit/colour-rules.test.mjs`

**Interfaces:**
- Consumes: Task 1's tokens.
- Produces: classes `.band--alt`, `.band--tint`, `.band--cta`, `.on-slab` (12px), `.on-slab--lg` (16px, used with `.on-slab`), and the custom property `--slab` (a slab's colour; default `--signal`).
- Produces: `ContactPanel({ email, className })`, where `className` is added after `panel`.

- [x] **Step 1: Write the failing build test** `tests/build/colour.test.mjs`

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPage } from './helpers.mjs';

const has = (el, ...cls) => cls.every((c) => el.classList.contains(c));

test('home: band grounds and slabs', () => {
  const main = loadPage('/').doc.querySelector('main');
  assert.ok(has(main.querySelector('section#services'), 'band', 'band--alt'));
  const expertise = main.querySelector('section#expertise');
  assert.ok(has(expertise, 'band', 'band--tint') && !has(expertise, 'band--flush'));
  const cta = main.querySelector('section#contact');
  assert.ok(has(cta, 'band', 'band--cta'));
  assert.ok(has(cta.querySelector('.panel'), 'paper-card', 'on-slab'));
  assert.ok(has(main.querySelector('.portrait'), 'on-slab', 'on-slab--lg'));
  assert.ok(has(main.querySelector('.sheet--hero'), 'on-slab'));
});
```

- [x] **Step 2: Write the failing print test** in `tests/unit/colour-rules.test.mjs`

```js
test('slabs do not print, and the teal band keeps navy text', () => {
  const base = readFileSync('src/styles/base.css', 'utf8');
  assert.match(base.slice(base.indexOf('@media print')), /\.on-slab[^{]*\{[^}]*box-shadow:\s*none/);
  const sections = readFileSync('src/styles/sections.css', 'utf8');
  const cta = sections.match(/\.band--cta\s*\{([^}]*)\}/);
  assert.ok(cta && /color:\s*var\(--ink\)/.test(cta[1]) && /--fg:\s*var\(--ink\)/.test(cta[1]));
});
```

- [x] **Step 3: Run and watch them fail**

Run: `npm run build && node --test tests/build/colour.test.mjs tests/unit/colour-rules.test.mjs`
Expected: FAIL (no `band--alt` class; no `.on-slab` rule).

- [x] **Step 4: Buttons.** In `tokens.css` set `--btn-bg: var(--amber); --btn-fg: var(--ink)` on `:root` and delete `--btn-bg` and `--btn-fg` from both dark blocks, `.inverse` and the print block. In `shell.css` delete the two custom properties from `.mm .btn` (keep `justify-content`). In `base.css`:

```css
.btn::before{opacity:.6}                                  /* was .38 */
.btn:hover::before,.btn:focus-visible::before{background:var(--ink);opacity:1;box-shadow:0 0 0 4px var(--btn-halo)}
.btn:not(.btn--ghost):hover{background:var(--btn-hover);border-color:var(--btn-hover)}
```

- [x] **Step 5: Small components** in `base.css` and `shell.css`

```css
.tag{background:var(--tag-bg);border-color:var(--tag-line)}
.num{width:28px;height:28px;font-size:.85rem;background:var(--svc-chip,var(--signal));border-color:var(--svc-chip,var(--signal));color:var(--svc-chip-fg,var(--ink))}
.textlink{color:var(--accent)}
.on-slab{box-shadow:12px 12px 0 var(--slab,var(--signal))}
.on-slab--lg{box-shadow:16px 16px 0 var(--slab,var(--signal))}
@media print{.on-slab,.on-slab--lg{box-shadow:none}}
.nav{box-shadow:inset 0 4px 0 var(--signal)}              /* shell.css */
```

Merge each into its existing rule; keep every other declaration.

- [x] **Step 6: Bands, heading bars, advisor and the call to action** in `sections.css`

```css
.band--alt{background:var(--band-alt)}
.band--tint{background:var(--band-tint)}
.band--cta{background:var(--signal);color:var(--ink);--fg:var(--ink);--fg2:var(--cta-fg2);--rule:var(--cta-rule);--accent:var(--ink);--btn-bg:var(--ink);--btn-fg:var(--white);--btn-hover:var(--ink-lift);--slab:var(--ink)}
.band--cta .btn:not(.btn--ghost):hover::before{background:var(--signal)}
.band--cta .panel{border:1.5px solid var(--ink)}
.head h2::before,.contact h2::before,.prose h2::before,.split--faq>h2::before,.band.inverse>.wrap>h2::before{content:"";display:block;width:52px;height:7px;margin-bottom:20px;background:var(--svc,var(--signal))}
.band--cta h2::before{background:var(--ink)}
.advisor__role{color:var(--signal)}
```

- [x] **Step 7: Service rows and their small drawings** (spec 8.2). In `sections.css`: `.key__row` first column `32px` and last column `196px` in all three of its `grid-template-columns` rules; row hover ground `var(--svc-wash)`. In `drawing.css`: `.dwg--mini` is `width:196px; padding:12px 14px; border-radius:10px; background:var(--svc-wash); --body:var(--svc-left)`; on row hover or focus its ground is `var(--svc-floor)` and its colour stays `var(--fg)` (delete the rule that turns it `--accent`); `.dwg--mini .wan{stroke:var(--svc-line)}`.

- [x] **Step 8: Classes in the views.** `HomeView.jsx`: `#services` is `band band--alt`; `#expertise` is `band band--tint`; `#contact` is `band band--cta`; the hero sheet is `sheet sheet--hero on-slab`; `<ContactPanel email={email} className="paper-card on-slab" />`. `ContactPanel.jsx`: accept `className`. `AdvisorBand.jsx`: the figure is `portrait on-slab on-slab--lg`.

- [x] **Step 9: Run the tests**

Run: `npm run build && node --test tests/build/colour.test.mjs tests/build/home.test.mjs tests/unit/colour-rules.test.mjs tests/unit/tokens.test.mjs`
Expected: PASS.

- [x] **Step 10: Visual check.** Serve `out/`, screenshot `/` at 1440 wide in Paper and Blueprint, and compare with `mockup-colour-levels.html#l=3&t=light` and `#l=3&t=dark` from "Our Services" down. The hero is not expected to match yet. Everything below it must: grounds, badges, tiles, tags, the portrait slab, the teal band and its white card.

- [x] **Step 11: Commit**

```bash
git add src tests
git commit -m "feat: colour pass on shared components and the home page"
```

---

### Task 3: Colour pass: inner pages

**Files:**
- Modify: `src/views/ServicesIndexView.jsx`, `ServicePageView.jsx`, `AboutView.jsx`, `TeamView.jsx`, `ContactView.jsx`, `src/components/EndCta.jsx`, `src/styles/sections.css`
- Test: `tests/build/colour.test.mjs`

**Interfaces:**
- Consumes: Task 2's classes.
- Produces: `EndCta({ title, children, flush = true, svc })`. `flush={false}` gives the band full top padding (class `band` without `band--flush`); `svc` is written as `data-svc` on its `<section>`. Its panel is `panel endcta on-slab`.

- [x] **Step 1: Write the failing tests** in `tests/build/colour.test.mjs`

```js
import { services } from '../../src/content/services.js';

for (const s of services) {
  test(`${s.slug}: the page carries its colour`, () => {
    const main = loadPage(`/services/${s.slug}`).doc.querySelector('main');
    const sections = main.querySelectorAll('section').filter((el) => el.parentNode === main);
    assert.ok(sections.length >= 7);
    for (const el of sections) assert.equal(el.getAttribute('data-svc'), s.slug);
    assert.ok(has(sections[1], 'band', 'band--alt') && !has(sections[1], 'band--snug'));
    assert.ok(has(main.querySelector('.svc-hero figure'), 'on-slab'));
    assert.ok(has(main.querySelector('.panel.endcta'), 'on-slab'));
  });
}
test('services index, about, team, contact: grounds and slabs', () => {
  const idx = loadPage('/services').doc.querySelector('main');
  assert.ok(has(idx.querySelector('.key').closest('section'), 'band', 'band--alt'));
  const end = idx.querySelector('.panel.endcta');
  assert.ok(has(end, 'on-slab') && !has(end.closest('section'), 'band--flush'));
  const about = loadPage('/about').doc.querySelector('main');
  assert.ok(has(about.querySelector('.statements').closest('section'), 'band--alt'));
  assert.ok(has(about.querySelector('.values').closest('section'), 'band--tint'));
  assert.ok(!has(about.querySelector('.titleblock--facts').closest('section'), 'band--flush'));
  const team = loadPage('/team').doc.querySelector('main');
  assert.ok(has(team.querySelector('section#expertise'), 'band--tint'));
  const contact = loadPage('/contact').doc.querySelector('main');
  assert.ok(has(contact.querySelector('section.cpage'), 'band', 'band--alt'));
  assert.ok(has(contact.querySelector('.cpage .panel'), 'on-slab'));
});
```

- [x] **Step 2: Run and watch them fail**

Run: `npm run build && node --test tests/build/colour.test.mjs`
Expected: FAIL on every new test.

- [x] **Step 3: `EndCta.jsx`**: add `flush` and `svc` as in Interfaces; panel class `panel endcta on-slab`.

- [x] **Step 4: The views** (spec section 9)

| View | Change |
| --- | --- |
| `ServicesIndexView` | Rows section: `band band--alt`. `<EndCta flush={false} …>`. |
| `ServicePageView` | `data-svc={service.slug}` on all six `<section>` elements and `svc={service.slug}` on `EndCta`. Overview section: `band band--alt`. `<figure className="on-slab">`. |
| `AboutView` | Vision and Mission section: `band band--alt`. "Infyta at a glance" section: `band`. Core Values section: `band band--tint`. |
| `TeamView` | `#expertise`: `band band--tint`. |
| `ContactView` | Section: `band band--alt cpage`. The information panel: `panel on-slab`. |

- [x] **Step 5: Rules in `sections.css`**

```css
section[data-svc] .on-slab{--slab:var(--svc)}
.endcta.on-slab{border:1.5px solid var(--fg)}
.steps li::before{background:var(--svc-chip);border-color:var(--svc-chip);color:var(--svc-chip-fg)}
```

Delete `.cpage{padding-top:0}` so the contact band has full padding on its new ground.

- [x] **Step 6: Run the tests**

Run: `npm run build && node --test tests/build/colour.test.mjs tests/build/services.test.mjs tests/build/about-team.test.mjs tests/build/contact.test.mjs`
Expected: PASS.

- [x] **Step 7: Visual check, six screenshots at 1440 wide:** `/services/software-development` in Paper against `mockup-service-page.html#l=3&t=light` (the drawing is not expected to match yet); `/services/security-surveillance` and `/services/it-support-consultancy` in Paper (step numbers readable: navy on violet, navy on white); `/about`, `/team` and `/contact` in Blueprint. The quality reviewer judges the three pages that have no mock against spec 6.5 and 9.

- [x] **Step 8: Commit**

```bash
git add src tests
git commit -m "feat: colour pass on the services, about, team and contact pages"
```

---

### Task 4: Geometry and parts

**Files:**
- Create: `src/lib/iso.js`, `src/components/drawing/iso/parts.jsx`, `tests/unit/iso.test.mjs`

**Interfaces:**
- Produces, from `src/lib/iso.js` (no React, no DOM):
  - `K = 40`, `PH = 0.14` (island height)
  - `projector(ox, oy)` returns `P(x, y, z = 0) => [sx, sy]`, each rounded to one decimal: `sx = ox + (x - y) * K * Math.sqrt(3) / 2`, `sy = oy + (x + y) * K / 2 - z * K`
  - `pts(points) => "x,y x,y …"`; `pathD(points) => "Mx yLx y…"`
  - `boxFaces(P, x, y, z, w, d, h) => { left, right, top, hull }`, each an array of `[sx, sy]`: `left` is the +y face, `right` the +x face, `hull` the six-point outline
  - `faceY(P, Y) => (x, z) => P(x, Y, z)`; `faceX(P, X) => (y, z) => P(X, y, z)`
  - `cylinder(P, x, y, z, r, h) => { cx, cy, rx, ry, ty, body, bands, hull }`, with `rx = r * K * 1.2247`, `ry = r * K * 0.7071`, `ty = cy - h * K` (all rounded to one decimal), `body` and `bands` path strings as in the mock's `cylinder`, `hull` a four-point box around it
- Produces, from `parts.jsx` (server components; `P` is a projector):
  - `<Box P x y z w d h kind="c" />`: three polygons, classes by kind: `c` `fl fr ft`, `p` `fl fr pt`, `n` `nl nr nt`, drawn left, right, top
  - `<FaceRect F a0 b0 a1 b1 className />`: one polygon on a face
  - `<Dot at={[sx, sy]} r={2.6} className="led" />`
  - `<Cyl P x y z r h />`
  - `<Pin n x y inv monly />`: `<g class="pin [monly]" transform="translate(x y)"><g class="bub [bub--inv]"><circle class="ring" r="17"/><circle r="12.5"/><text text-anchor="middle" dy="4.8">n</text></g></g>`
  - `<Lay P x y className="t1">text</Lay>`: text lying on an island top, `transform="matrix(.866 .5 -.866 .5 sx sy)"` at `P(x, y, PH)`, classes `lay` plus `className`
  - `<Cable P points flow />`: `<polyline class="cab">` through the projected 3D points; with `flow`, also `<circle class="flow" r="3.8" style={{ offsetPath: 'path("…")' }} />` on the same path

- [x] **Step 1: Write the failing test** `tests/unit/iso.test.mjs`

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { projector, pts, pathD, boxFaces, faceX, faceY, cylinder, K, PH } from '../../src/lib/iso.js';

const P = projector(440, 168);
test('projection', () => {
  assert.deepEqual([P(0, 0), P(12, 0), P(0, 10), P(12, 10), P(0, 0, 2.6), P(12, 10, -0.78)], [[440, 168], [855.7, 408], [93.6, 368], [509.3, 608], [440, 64], [509.3, 639.2]]);
  assert.equal(K, 40); assert.equal(PH, 0.14);
});
test('box faces and outline', () => {
  const b = boxFaces(P, 0.95, 0.35, 0.14, 1.6, 1, 2.45);
  assert.deepEqual(b.left, [[426.1, 110.4], [481.6, 142.4], [481.6, 240.4], [426.1, 208.4]]);
  assert.deepEqual(b.right, [[516.2, 122.4], [481.6, 142.4], [481.6, 240.4], [516.2, 220.4]]);
  assert.deepEqual(b.top, [[460.8, 90.4], [516.2, 122.4], [481.6, 142.4], [426.1, 110.4]]);
  assert.deepEqual(b.hull, [[460.8, 90.4], [516.2, 122.4], [516.2, 220.4], [481.6, 240.4], [426.1, 208.4], [426.1, 110.4]]);
});
test('faces, strings and cylinder', () => {
  assert.deepEqual(faceY(P, 0)(12, 2.6), P(12, 0, 2.6));
  assert.deepEqual(faceX(P, 0)(10, 2.6), P(0, 10, 2.6));
  assert.equal(pts([[1, 2], [3.5, 4]]), '1,2 3.5,4');
  assert.equal(pathD([[1, 2], [3.5, 4]]), 'M1 2L3.5 4');
  const c = cylinder(P, 5.1, 1.0, 0.14, 0.44, 1.05);
  assert.deepEqual([c.cx, c.cy, c.rx, c.ry, c.ty], [582, 284.4, 21.6, 12.4, 242.4]);
  assert.match(c.body, /^M560\.4 242\.4V284\.4A21\.6 12\.4 0 0 0 603\.6 284\.4V242\.4Z$/);
  assert.equal(c.hull.length, 4);
});
```

- [x] **Step 2: Run it and watch it fail**

Run: `node --test tests/unit/iso.test.mjs`
Expected: FAIL (module not found).

- [x] **Step 3: Write `src/lib/iso.js`** to the Interfaces. Port `box` and `cylinder` from `iso.mjs`, returning points and path strings instead of markup.

- [x] **Step 4: Run the test**

Run: `node --test tests/unit/iso.test.mjs`
Expected: PASS.

- [x] **Step 5: Write `src/components/drawing/iso/parts.jsx`** to the Interfaces, porting the mock's `box`, `frect`, `dot`, `cylinder`, `pin`, `lay` and `cable` markup. Nothing renders them yet; `npm run lint` and `npm run build` must pass.

- [x] **Step 6: Commit**

```bash
git add src/lib/iso.js src/components/drawing/iso/parts.jsx tests/unit/iso.test.mjs
git commit -m "feat: isometric geometry and drawing parts"
```

---

### Task 5: Hero scene and layout

**Files:**
- Create: `src/lib/headline.js`, `src/components/drawing/iso/zones.jsx`, `src/components/drawing/iso/AppCard.jsx`, `src/components/drawing/OfficeIso.jsx`, `tests/unit/headline.test.mjs`
- Modify: `src/views/HomeView.jsx`, `src/styles/sections.css`, `src/styles/drawing.css`, `tests/build/home.test.mjs`, `tests/unit/drawing-css.test.mjs`
- Delete: `src/components/drawing/OfficeNetwork.jsx`

**Interfaces:**
- Consumes: Task 4's lib and parts.
- Produces: `splitHeadline(heading, word) => { before, word, after } | null` (null when `word` is not in `heading`).
- Produces, from `zones.jsx`: `zoneCore(P, x0, y0)`, `zoneSoftware(P, x0, y0, w = 7.4, d = 2.4)`, `zoneServers(P, x0, y0)`, `zoneStaff(P, x0, y0, w = 7.4)`, `zoneSecurity(P, x0, y0, w = 5.2)`, `zoneGuest(P, x0, y0, w = 5.2)`. Each returns `{ floor, label, objs, hits, anchors }`: `floor` the island (a node), `label` its painted label (a node, or `null`), `objs` an array of `{ depth, node }`, `hits` an array of point arrays (the island's outline and every box's `hull`), and `anchors` the screen points the scene needs (`top`; `dbTop`, `screenTop`; `top`; `taps`, `pin`; `rec`, `pin`; `ap`, `pin`, as the mock's zone functions return them).
- Produces: `AppCard({ x, y, w = 250, h = 158 })`, and `appCardHits(x, y, w, h)` returning the window's and the phone's rectangles as point arrays.
- Produces: `OfficeIso()` renders `svg.dwg.dwg--iso.dwg--hero`. Task 6 styles these class names: `piece` (a visible group with `data-svc`), `svc` (a link), `hit`, `hit--line`, `lbl`, `lay`, `basetext`, `pin`, `bub`, `bub--inv`, `ring`, `monly`, `cab`, `cab--dash`, `flow`, `rise`.

- [x] **Step 1: Write the failing headline test** `tests/unit/headline.test.mjs`

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { splitHeadline } from '../../src/lib/headline.js';

test('splits the headline around one word', () => {
  assert.deepEqual(splitHeadline('Infyta – Limitless Tech Solutions', 'Limitless'), { before: 'Infyta – ', word: 'Limitless', after: ' Tech Solutions' });
});
test('returns null when the word is missing, so the caller prints the headline whole', () => {
  assert.equal(splitHeadline('Infyta Tech Solutions', 'Limitless'), null);
  assert.equal(splitHeadline('', 'Limitless'), null);
});
```

- [x] **Step 2: Replace the hero drawing test** in `tests/build/home.test.mjs` (the test named "hero drawing links to every service, in both layouts") with:

```js
const WORDS = ['Cloud', 'AWS, Azure, Google Cloud', 'Servers', 'Windows, Linux, VMware', 'Internet', 'Router, firewall, core switch', 'MikroTik, Fortinet, Cisco', 'Business software', 'SQL Server, MySQL, MongoDB', 'Staff workstations', 'CCTV cameras', 'Recorder', 'Access control', 'Biometric attendance', 'Office Wi-Fi', 'Guest access', 'Your office', 'IT Support & Consultancy', '1', '2', '3', '4', '5'];
const svg = main.querySelector('svg.dwg--hero');

test('hero drawing: exactly five links, one per service, in order', () => {
  assert.ok(svg.getAttribute('aria-label'));
  const links = svg.querySelectorAll('a');
  assert.deepEqual(links.map((a) => a.getAttribute('href')), services.map((s) => `/services/${s.slug}`));
  links.forEach((a, i) => {
    assert.ok(a.getAttribute('aria-label').startsWith(services[i].name));
    assert.equal(a.getAttribute('data-svc'), services[i].slug);
    assert.ok(a.querySelectorAll('.hit').length > 0, `${services[i].slug} has no hit shape`);
    assert.ok(a.querySelector('.pin'), `${services[i].slug} has no pin`);
  });
  assert.equal(svg.querySelectorAll('[tabindex]').length, 0);
  assert.equal(main.querySelector('svg.dwg--wide, svg.dwg--tall'), null);
});
test('hero drawing: every service has visible pieces, hidden from assistive technology', () => {
  const pieces = svg.querySelector('g[aria-hidden="true"]');
  for (const s of services) assert.ok(pieces.querySelector(`.piece[data-svc="${s.slug}"]`), s.slug);
  assert.equal(pieces.querySelectorAll('a').length, 0);
});
test('hero drawing: only approved words', () => {
  const words = svg.querySelectorAll('text').map((t) => t.textContent.trim());
  for (const w of words) assert.ok(WORDS.includes(w), `unexpected "${w}"`);
  for (const w of WORDS) assert.ok(words.includes(w), `missing "${w}"`);
});
test('headline: one word is marked, the words are unchanged', () => {
  assert.equal(main.querySelector('h1 .hl').textContent, 'Limitless');
});
```

- [x] **Step 3: Run and watch them fail**

Run: `node --test tests/unit/headline.test.mjs && npm run build && node --test tests/build/home.test.mjs`
Expected: FAIL (no `headline.js`; no `svg.dwg--hero`).

- [x] **Step 4: Write `src/lib/headline.js`.**

- [x] **Step 5: Write `zones.jsx` and `AppCard.jsx`** by porting `zoneCore`, `zoneServers`, `zoneSoftware`, `zoneStaff`, `zoneGuest`, `zoneSecurity` and `appCard` from `iso.mjs`, coordinate for coordinate, onto the parts. Each zone also collects `hits`. Every zone's equipment is `kind="c"`; islands are `kind="p"`.

- [x] **Step 6: Write `OfficeIso.jsx`**, porting `isoScene` (origin `projector(440, 168)`, `viewBox="0 0 944 660"`) into this structure:

```jsx
<svg className="dwg dwg--iso dwg--hero" viewBox="0 0 944 660" role="group" aria-label={ARIA}>
  <g aria-hidden="true">
    {/* in paint order: base; walls and floor; cables; islands with painted labels; equipment by depth; cloud, links, app window */}
  </g>
  {services.map((s) => (
    <Link key={s.slug} className="svc rise" style={{ "--d": "1.5s" }} data-svc={s.slug} href={`/services/${s.slug}`} aria-label={NAME[s.slug]}>
      {/* hit shapes, then upright labels in <g className="lbl">, then pins */}
    </Link>
  ))}
</svg>
```

- `ARIA` is `"3D-style drawing of a typical office. Each coloured zone links to the Infyta service that builds it."` `NAME[slug]` is the service's name, and for IT Support `"IT Support & Consultancy: the whole office"`.
- Each visible group that belongs to a service is `<g className="piece rise" data-svc={slug} style={{ "--d": … }}>`. Walls and floor have no `piece` class and no `data-svc`. Fade delays: network core `0s`; servers, software, the cloud and the app window `0.3s`; staff `0.6s`; security and guest Wi-Fi `0.9s`; cables and the base `1.2s`; links `1.5s`.
- A link's hit shapes: `<polygon className="hit">` for each entry of its zones' `hits`, for `appCardHits` (software), the cloud's outline (servers) and the base's two faces (IT Support); and `<polyline className="hit hit--line">` along each of its cables and links.
- Upright labels and pins: the words, positions and sizes in the mock's `isoScene`, with pin 3 as `inv` and the two extra network pins as `monly`. The base text is `<text className="basetext">` inside the IT Support piece.
- Pin numbers come from `CALLOUT` in `src/components/drawing/callouts.js`.

- [x] **Step 7: `HomeView.jsx`.** Render `<OfficeIso />` in place of `<OfficeNetwork />`. Headline: `const h = splitHeadline(pages.home.heading, "Limitless")` and `<h1>{h ? <>{h.before}<span className="hl">{h.word}</span>{h.after}</> : pages.home.heading}</h1>`. The title block is `tb inverse`; the strip is `<TitleBlock items={DRAWING_NOTES} className="inverse" />`. Delete `OfficeNetwork.jsx`.

- [x] **Step 8: Drawing styles** in `drawing.css`: the class-to-token table in Port Rules, plus from `levels.css`: `.dwg--iso{overflow:visible}`, upright label sizes `.dwg--iso .t1{font-size:17.5px}` and `.t2{font-size:15.5px}`, painted `.lay.t1{font-size:18.5px}` and `.lay.t2{font-size:16px;opacity:.86}`, `.bub text{font-size:13.5px}`, `.lead{stroke-width:1.1}`. Add `.dwg--iso .hit{fill:transparent;stroke:none;pointer-events:all}`, `.dwg--iso .hit--line{fill:none;stroke:transparent;stroke-width:14;pointer-events:stroke}`, `.dwg--iso .ring{fill:none;stroke:none}`, `.dwg--iso .monly{display:none}` and `.dwg--hero .rise{animation:rise .3s ease-out var(--d,0s) backwards}`. Use `backwards`, not `forwards`, and set no base `opacity:0`: a finished `forwards` animation would keep overriding Task 6's dimming, and with `backwards` the drawing is simply visible wherever animation does not run. Delete the rules that only served `.dwg--wide` and `.dwg--tall`, including the old row-and-drawing highlight block; in the reduced-motion and print blocks keep `.dwg .rise{animation:none!important;opacity:1!important}`.

- [x] **Step 8b: Cut `tests/unit/drawing-css.test.mjs` down** to what is still true, so the full check passes at the end of this task: keep the `mediaBlock` helper and one test per media query (`@media (prefers-reduced-motion: reduce)` and `@media print`) asserting `/\.dwg \.rise\s*\{[^}]*animation:\s*none[^}]*opacity:\s*1/`. Delete its other tests; Task 6 adds the new ones.

- [x] **Step 9: Hero layout** in `sections.css` (spec 7.1), ported from the `/* Level 3` block of `levels.css`:

```css
h1 .hl{color:var(--signal)}
.sheet--hero .dwg--hero{max-width:944px;margin-inline:auto}
@media (min-width:1040px) and (max-width:1179px){
  .sheet--hero .sheet__fig{order:0;border-bottom:0;border-top:1.5px solid var(--fg)}
}
@media (min-width:1180px){
  .sheet.sheet--hero{display:grid;grid-template-columns:minmax(0,4.8fr) minmax(0,7.2fr);grid-template-rows:1fr auto}
  .sheet--hero .tb{grid-column:1;grid-row:1;display:flex;flex-direction:column;justify-content:center;gap:clamp(18px,2vw,26px);padding:clamp(24px,3vw,44px)}
  .sheet--hero .tb>div{padding:0}
  .sheet--hero .tb__title{display:contents}
  .sheet--hero .tb h1{order:1;font-size:clamp(2.1rem,3.3vw,2.95rem)}
  .sheet--hero h1 .hl{display:block}
  .sheet--hero .tb__lede{order:2;border:0}
  .sheet--hero .tb .hero__cta{order:3;margin-top:4px}
  .sheet--hero .tb .lede{font-size:1.125rem}
  .sheet--hero .sheet__fig{grid-column:2;grid-row:1;order:0;border-bottom:0;border-left:1.5px solid var(--fg);display:flex;align-items:center}
  .sheet--hero .sheet__dwg{width:100%;padding:clamp(10px,1.4vw,20px)}
  .sheet--hero .titleblock{grid-column:1/-1;grid-row:2;border-top:1.5px solid var(--fg)}
}
```

Below 1040px the existing rules already put the title block first.

- [x] **Step 10: Run the tests**

Run: `node --test tests/unit/headline.test.mjs tests/unit/iso.test.mjs tests/unit/drawing-css.test.mjs && npm run build && node --test tests/build/home.test.mjs tests/build/performance.test.mjs tests/build/colour.test.mjs`
Expected: PASS.

- [x] **Step 11: Visual check, four screenshots:** `/` at 1440 wide in Paper and Blueprint against the mock at the same size; `/` at 1100 wide (stacked: title block, then drawing); the mock's hero and the site's hero cropped side by side. The drawing must match the mock piece for piece. Differences allowed: none visible, except that hover is not styled yet.

- [x] **Step 12: Commit**

```bash
git add -A src tests
git commit -m "feat: 3D-style hero drawing with one island per service"
```

---

### Task 6: Highlight, motion and small screens

**Files:**
- Modify: `src/styles/drawing.css`, `tests/unit/drawing-css.test.mjs`

**Interfaces:**
- Consumes: Task 5's class names.

- [x] **Step 1: Extend `tests/unit/drawing-css.test.mjs`.** Keep its `mediaBlock` helper and replace the two tests Task 5 left with:

```js
const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').split('}').map((r) => r.split('{')).filter((r) => r.length === 2).map(([s, b]) => [s.trim(), b.trim()]);

test('every service has a group highlight from the drawing and from its row, and marks its row', () => {
  for (const { slug: s } of services) {
    for (const sel of [
      `.dwg--hero:has(.svc[data-svc="${s}"]:is(:hover,:focus-visible)) :is(.piece,.svc):not([data-svc="${s}"])`,
      `main:has(.key__row[data-svc="${s}"]:is(:hover,:focus-visible)) .dwg--hero :is(.piece,.svc):not([data-svc="${s}"])`,
      `main:has(.dwg--hero .svc[data-svc="${s}"]:is(:hover,:focus-visible)) .key__row[data-svc="${s}"]`,
    ]) assert.ok(css.includes(sel), sel);
  }
});
test('nothing is dimmed without :has(), so the drawing is whole where :has() is missing', () => {
  const dim = rules.filter(([, body]) => /opacity:\s*\.24/.test(body));
  assert.ok(dim.length > 0);
  for (const [selector] of dim) assert.ok(selector.includes(':has('), selector);
});
test('keyboard focus shows on the pin', () => {
  assert.ok(rules.some(([s, b]) => s.includes('.svc:focus-visible') && s.includes('.ring') && /stroke:\s*var\(--accent\)/.test(b)));
});
test('dots travel twice on load, 1.5s a pass, after the fade', () => {
  const flow = rules.find(([s]) => s === '.dwg--hero .flow');
  assert.ok(flow);
  assert.match(flow[1], /opacity:\s*0/);
  assert.match(flow[1], /animation:\s*travel 1\.5s linear 1\.8s 2\b/);
});
for (const query of ['@media (prefers-reduced-motion: reduce)', '@media print']) {
  test(`${query}: the drawing is complete and still`, () => {
    const block = mediaBlock(query);
    assert.match(block, /\.dwg \.rise\s*\{[^}]*animation:\s*none[^}]*opacity:\s*1/);
    assert.match(block, /\.dwg \.flow\s*\{[^}]*display:\s*none/);
  });
}
test('below 720px the labels go and the pins grow', () => {
  const block = mediaBlock('@media (max-width:719px)');
  for (const cls of ['.lbl', '.lay', '.basetext']) assert.ok(block.includes(cls), cls);
  assert.match(block, /\.bub\s*\{[^}]*transform:\s*scale\(2\.3\)/);
  assert.match(block, /\.monly\s*\{[^}]*display:\s*inline/);
});
```

- [x] **Step 2: Run it and watch it fail**

Run: `node --test tests/unit/drawing-css.test.mjs`
Expected: FAIL on every test except the two "complete and still" ones' `.rise` half.

- [x] **Step 3: Write the rules** in `drawing.css`

```css
.dwg--hero :is(.piece,.svc){transition:opacity .16s}
.dwg--hero .svc{color:var(--fg);cursor:pointer;outline:none}
.dwg--hero .svc:focus-visible .ring{stroke:var(--accent);stroke-width:2}
@keyframes travel{0%{offset-distance:0%;opacity:1}100%{offset-distance:100%;opacity:1}}
.dwg--hero .flow{opacity:0;animation:travel 1.5s linear 1.8s 2}
```

Then, once per service slug `S` (five times each):

```css
.dwg--hero:has(.svc[data-svc="S"]:is(:hover,:focus-visible)) :is(.piece,.svc):not([data-svc="S"]),
main:has(.key__row[data-svc="S"]:is(:hover,:focus-visible)) .dwg--hero :is(.piece,.svc):not([data-svc="S"]){opacity:.24}
.dwg--hero:has(.svc[data-svc="S"]:is(:hover,:focus-visible)) .piece[data-svc="S"] .flow,
main:has(.key__row[data-svc="S"]:is(:hover,:focus-visible)) .dwg--hero .piece[data-svc="S"] .flow{opacity:1;animation:travel 1.5s linear infinite}
main:has(.dwg--hero .svc[data-svc="S"]:is(:hover,:focus-visible)) .key__row[data-svc="S"]{background:var(--svc-wash);border-top-color:transparent}
main:has(.dwg--hero .svc[data-svc="S"]:is(:hover,:focus-visible)) .key__row[data-svc="S"] .dwg--mini{background:var(--svc-floor)}
main:has(.dwg--hero .svc[data-svc="S"]:is(:hover,:focus-visible)) .key__row[data-svc="S"] .num{background:var(--fg);border-color:var(--fg);color:var(--bg)}
```

And the two media blocks and the small-screen block:

```css
@media (prefers-reduced-motion: reduce){
  .dwg .rise{animation:none!important;opacity:1!important}
  .dwg .flow{display:none}
}
@media print{
  .dwg .rise{animation:none!important;opacity:1!important}
  .dwg .flow{display:none}
}
@media (max-width:719px){
  .dwg--hero .lbl,.dwg--hero .lay,.dwg--hero .basetext{display:none}
  .dwg--hero .bub{transform:scale(2.3)}
  .dwg--hero .monly{display:inline}
}
```

The dimming rules must win over nothing else: check that no other rule sets `opacity` on `.piece` or `.svc`.

- [x] **Step 4: Run the tests**

Run: `node --test tests/unit/drawing-css.test.mjs && npm run build && node --test tests/build/home.test.mjs`
Expected: PASS.

- [x] **Step 5: By-hand checks in a browser** on the served `out/` (a browser skill, or list them for the owner):

1. Hover the app window, a desk, a cable, pin 4 and the base in turn: each time the whole service stays bright, the other four dim, and that service's dots travel. Walls and floor never dim.
2. Hover each row of "Our Services": the same service lights in the drawing. Hover a zone: its row takes its wash, a darker tile and a filled number.
3. Press Tab from the "Explore Solutions" button: five stops in the drawing, in the order 1 to 5, each with a ring round its pin, each dimming the others. Enter follows the link.
4. Reload: zones fade in within two seconds, each dot travels twice, then everything is still.
5. Turn on "reduce motion" in the system settings and reload: the drawing is complete at once, no dots.

- [x] **Step 6: Visual check, four screenshots:** phone widths 390px and 320px in Paper using the iframe wrapper (labels gone, pins large and inside the sheet, no part of the page wider than the screen); 768px (all labels showing); 1440px in Blueprint.

- [x] **Step 7: Commit**

```bash
git add src/styles/drawing.css tests/unit/drawing-css.test.mjs
git commit -m "feat: group highlight, load motion and small-screen pins for the hero drawing"
```

---

### Task 7: Service page drawings

**Files:**
- Rewrite: `src/components/drawing/ServiceDetail.jsx`
- Modify: `src/styles/drawing.css`, `src/styles/sections.css`
- Test: `tests/build/services.test.mjs`

**Interfaces:**
- Consumes: Task 4's lib and parts, Task 5's zones and `AppCard`.
- Produces: `ServiceDetail({ slug })`, unchanged for its caller: an `<svg className="dwg dwg--detail dwg--iso" role="img">` with today's `aria-label` for that slug.

- [x] **Step 1: Add the failing tests** inside the `for (const s of services)` loop in `tests/build/services.test.mjs`

```js
  test(`${s.slug}: the drawing is the 3D kit, a picture with no links`, () => {
    const svg = main.querySelector('figure svg.dwg--detail');
    assert.ok(svg.classList.contains('dwg--iso'));
    assert.equal(svg.querySelectorAll('a, use, [tabindex]').length, 0);
    assert.ok(svg.querySelectorAll('polygon').length >= 12);
    // IT Support has no colour of its own: its equipment is drawn in the neutral faces.
    if (s.slug !== 'it-support-consultancy') assert.ok(svg.querySelectorAll(`[data-svc="${s.slug}"]`).length > 0, 'the page\'s own service is drawn in its colour');
  });
  test(`${s.slug}: the drawing uses every approved label`, () => {
    const words = main.querySelectorAll('figure svg.dwg--detail text').map((t) => t.textContent.trim());
    for (const w of DETAIL[s.slug].words) assert.ok(words.includes(w), `missing "${w}"`);
  });
```

The existing tests in that loop (same class, role, label, and only approved words) stay as they are and must keep passing.

- [x] **Step 2: Run and watch them fail**

Run: `npm run build && node --test tests/build/services.test.mjs`
Expected: FAIL (`dwg--iso` missing; `<use>` present).

- [x] **Step 3: Software Development.** Port `isoSoftwareDetail` from `iso.mjs` (`projector(150, 124)`, `viewBox="0 0 590 450"`): a floor 10.2 × 4.25 on a base 0.4 high, `zoneSoftware(P, 2.6, 0.45, 7.2, 2.8)`, the neutral "Existing systems" rack with its dashed amber link, the app window and phone above, and the five labels. Pieces are `<g data-svc="software-development">`; the rack is neutral and has no `data-svc`. No links, no pins, no `rise`, and no travelling dots (`<Cable>` without `flow`).

- [x] **Step 4: The other four drawings**, each to spec 8.1's table and to the software drawing's pattern: a small floor on a 0.4 base, islands from the zone builders or built from parts, upright labels above and painted labels on islands, a `viewBox` about 590 wide.

| Slug | Build from | Labels, exactly |
| --- | --- | --- |
| `network-infrastructure` | `zoneCore`, with a dashed teal line coming in; three small islands built from parts: two desks (teal), an access point on a pole (teal), a camera on a pole (violet island, `data-svc="security-surveillance"`); a cable to each in the island's colour | Internet; Router; MikroTik; Firewall; Fortinet; Cameras; Guest Wi-Fi; Staff; CCTV; Office Wi-Fi; Workstations |
| `it-support-consultancy` | A floor on the navy base with "Your office" on the base's left face; a rack, two desks, an access point and a server rack, all `kind="n"`, standing on the floor with no islands | Your office; Router; Workstations; Office Wi-Fi; Servers |
| `security-surveillance` | `zoneSecurity`, fed by a violet cable from a small teal box (`data-svc="network-infrastructure"`) | Switch; Cameras; CCTV cameras; Recorder; Access control; Biometric attendance |
| `server-cloud-solutions` | `zoneServers`; above the second rack, three small flat cards (azure, like the app window's tiles); the cloud above the first rack on a dashed azure link | Servers; Windows, Linux, Active Directory; Virtual machines; VMware, Hyper-V; Cloud; AWS, Azure, Google Cloud |

Rules for all four: a colour always means its service; nothing overlaps a label; tall things stand at the back; every label is one of that page's approved words, written exactly as listed, and all of them are used. Use the `frontend-design` skill for composition only, inside this kit.

- [x] **Step 5: Styles.** In `drawing.css`: `.dwg--detail.dwg--iso .t1{font-size:15px}`, `.t2{font-size:13.5px}`, `.lay.t1{font-size:16px}`, `.lay.t2{font-size:14px}`. The figure keeps its frame, padding and slab from Task 3.

- [x] **Step 6: Run the tests**

Run: `npm run build && node --test tests/build/services.test.mjs tests/build/colour.test.mjs`
Expected: PASS.

- [x] **Step 7: Visual check, six screenshots:** the software page's hero in Paper against `mockup-service-page.html#l=3&t=light`; the other four pages' heroes in Paper; one of them in Blueprint. The quality reviewer checks each new drawing against spec 8.1 and against the software drawing for weight, spacing and colour discipline, and checks that each fits its column at 1440px and at 390px without clipping.

- [x] **Step 8: Commit**

```bash
git add src tests
git commit -m "feat: 3D-style drawings on the five service pages"
```

---

### Task 8: Cleanup, docs and verification

**Files:**
- Modify: `src/components/drawing/Symbols.jsx`, `src/styles/drawing.css`, `tests/unit/colour-rules.test.mjs`, `docs/review-list.md`, `docs/superpowers/specs/2026-11-17-colour-and-3d-drawings-design.md` (status line), `docs/superpowers/specs/2026-11-17-colour-levels-assets/README.md`

- [ ] **Step 1: Write the failing test** in `tests/unit/colour-rules.test.mjs`

```js
test('every flat symbol is used by a small drawing, and nothing uses a missing one', () => {
  const ids = (file, re) => [...readFileSync(file, 'utf8').matchAll(re)].map((m) => m[1]);
  const defined = new Set(ids('src/components/drawing/Symbols.jsx', /id="(d-[a-z-]+)"/g));
  const used = new Set(files('src/components').flatMap((f) => ids(f, /href="#(d-[a-z-]+)"/g)));
  assert.deepEqual([...defined].sort(), [...used].sort());
});
test('no style is left for the flat hero', () => {
  const css = readFileSync('src/styles/drawing.css', 'utf8');
  for (const dead of ['.dwg--wide', '.dwg--tall', '.wire', '.knock', '.flag', '.svc-line']) assert.ok(!css.includes(dead), dead);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `node --test tests/unit/colour-rules.test.mjs`
Expected: FAIL (five unused symbols; leftover selectors, if any remain).

- [ ] **Step 3: Delete** the symbols `d-switch`, `d-switch-s`, `d-ap`, `d-door` and `d-phone` from `Symbols.jsx`, and any rule in `drawing.css` that the test names or that no element uses any more. Keep `.boundary` and `.wan`: the small drawings use them.

- [ ] **Step 4: Run the full check**

Run: `npm run check`
Expected: every unit test passes, the build exports 18 pages, every build test passes, lint prints no errors.

- [ ] **Step 5: Lighthouse**, mobile, on the served `out/`, for `/` and `/services/software-development`:

```bash
npx lighthouse http://localhost:8788/ --only-categories=performance,accessibility --form-factor=mobile --quiet --chrome-flags="--headless=new" --output=json --output-path=./.superpowers/lh-home.json
```

Expected: Performance 0.95 or better and Accessibility 0.98 or better on both. If either misses, stop and give the report to Opus to diagnose; do not lower the target.

- [ ] **Step 6: Final screenshots** for the record, saved under the ledger folder: every route at 1440 wide in Paper, `/` in Blueprint, `/` at 390px.

- [ ] **Step 7: Docs.** In `docs/review-list.md` section 4 add a part "Colour and 3D drawings" with: what a visitor will notice, in plain words; the fourteen calls from spec section 13; the word changes from spec section 12; and a line asking the owner to look at the four service drawings made in Task 7. In the spec, add "; implemented" to the Status line. Update the status table in the assets README.

- [ ] **Step 8: Commit**

```bash
git add -A src tests docs
git commit -m "chore: remove the flat hero's leftovers; review list and status for colour and 3D drawings"
```

---

## After Task 8

1. Dispatch the whole-branch reviewer (Opus) on `git diff master...colour-levels -- src tests`, with the spec and this plan's Global Constraints and Review Focus. Fix what it finds, with a review of the fixes.
2. Run `npm run check` once more and read the output.
3. Use `superpowers:finishing-a-development-branch`. Give the owner a short summary: what changed, the Lighthouse scores, anything that could not be verified, and the by-hand checks that are left. Merge and push only when the owner asks.
