# Visual redesign: mockup and logo sources

Reference material for the Infyta visual redesign. The mockup is the visual source of truth for the
design spec; nothing here ships with the site.

## Where things stand

| Step | Status |
| --- | --- |
| Design audit and direction ("Nothing fake": a drawn office network replaces the stock photo slider) | Done, approved by the owner on 2026-11-16 |
| Clickable mockup (home page and one service page) | Done |
| Owner decisions | Sheet hero approved. Blueprint (navy) is the site-wide dark theme, Paper is the light theme. |
| Mockup converted to site-wide light and dark themes (Paper and Blueprint), republished | Done |
| Design spec (`docs/superpowers/specs/2026-11-16-visual-redesign-design.md`) | Approved by the owner on 2026-11-16, including all nine calls in section 12 |
| Implementation plan (`docs/superpowers/plans/2026-11-16-visual-redesign.md`) | Approved by the owner on 2026-11-16. Nine tasks, to be run with subagent-driven development in a new session |
| Prompt to start or resume | `docs/superpowers/plans/2026-11-16-visual-redesign-START-PROMPT.md` |
| Implementation | In progress, see below |

## Implementation progress

Updated by the controller session at every checkpoint (task dispatched, task committed, review
passed, fix round committed), so work can resume after a power cut. Resume with the start prompt;
the controller's ledger is `.superpowers/sdd/2026-11-16-visual-redesign/progress.md` (git-ignored,
on disk). If that file is lost, this table and `git log` are the record.

| Task | Status | Commits |
| --- | --- | --- |
| 1. Foundation | Implemented, in review | 6d9d24b |
| 2. Logic and content | Not started | |
| 3. Logo and brand images | Not started | |
| 4. Site shell | Not started | |
| 5. Home and hero drawing | Not started | |
| 6. Services and detail drawings | Not started | |
| 7. About and Team | Not started | |
| 8. Contact and 404 | Not started | |
| 9. Cleanup, docs, verification | Not started | |
| Whole-branch review | Not started | |

Execution rulings (made by the controller where the plan was silent or disagreed with the spec):

- Commit trailer is `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` (the session's model).
- Tasks 1, 2 and 9 get one Sonnet reviewer for spec and quality; Tasks 3 to 8 get a Sonnet spec
  reviewer and a quality reviewer on the model in the plan's table.
- The "no hex colour" rule binds components and stylesheets; `src/lib/theme-script.js` and `scripts/`
  are exempt.
- Task 3 also writes the no-tagline logo variants that spec section 11 asks for:
  `infyta-logo-notagline.svg` and `infyta-logo-reversed-notagline.svg`.
- Body order in the layout: skip link, the hidden drawing symbols, header, main, footer.
- `TitleBlock` renders `<dl class="titleblock">` with a `<dt>`/`<dd>` pair per cell, so Task 7 can reuse it.

Published mockup (private artifact): https://claude.ai/artifact/CRwP51kC15zT6pDpGCDqMA

## Owner's constraints

- Keep the existing content and claims. Focus on look and feel.
- No real photos are available. No stock photos.
- The logo may be recreated as a vector.
- The phone number is on WhatsApp.

## Files

- `mockup.html`: the mockup as a standalone page. Open it in a browser.
- `mockup-artifact.html`: the same page in the format the Artifact tool publishes.
- `mock/build.mjs`: builds both files from the site's real content in `src/content/`.
- `mock/css.mjs`: all mockup styles (tokens, type, layout, drawing styles).
- `mock/diagram.mjs`: the device symbols and the network drawings (wide, tall, small details).
- `logo/build-logo.mjs`: geometric redraw of the logo, measured from the 200 x 119 px raster.
- `logo/infyta-logo-reversed.svg`, `logo/infyta-logo-ink.svg`: the redraw for navy and for light grounds.
  The wordmark is live text in Montserrat 800; convert it to outlines for production.

## Rebuild

Run from the repository root:

```sh
A=docs/superpowers/specs/2026-11-16-visual-redesign-assets
node $A/mock/build.mjs "$PWD" $A/mockup.html
node $A/mock/build.mjs "$PWD" $A/mockup-artifact.html artifact
node $A/logo/build-logo.mjs $A/logo
```
