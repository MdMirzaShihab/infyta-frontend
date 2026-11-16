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
| Implementation | Not started. Nothing in `src/` has changed |

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
