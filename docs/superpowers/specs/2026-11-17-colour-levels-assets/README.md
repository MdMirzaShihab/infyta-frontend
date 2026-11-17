# Colour and 3D drawings: mockup sources and status

Reference material for the second design phase of the Infyta site. The mockup is the visual source of
truth for the design spec; nothing here ships with the site.

## Where things stand

| Step | Status |
| --- | --- |
| Three colour levels shown in a mockup (colour pass; coloured drawings; illustrated) | Done. The owner picked level 3 on 2026-11-17 |
| Mockup version 2 (one island per service, group highlight, a service page) | Done |
| Design spec (`docs/superpowers/specs/2026-11-17-colour-and-3d-drawings-design.md`) | Approved by the owner on 2026-11-17 |
| Implementation plan (`docs/superpowers/plans/2026-11-17-colour-and-3d-drawings.md`) | Approved by the owner on 2026-11-17. Eight tasks, to be run with subagent-driven development in a new session |
| Prompt to start or resume | `docs/superpowers/plans/2026-11-17-colour-and-3d-drawings-START-PROMPT.md` |
| Implementation | In progress since 2026-11-17 (see the table below) |

## Implementation progress

Updated by the controller session at every checkpoint (task dispatched, task committed, review
passed, fix round committed), so work can resume after a power cut. The controller's ledger is
`.superpowers/sdd/2026-11-17-colour-and-3d-drawings/progress.md` (git-ignored, on disk). If that file
is lost, this table and `git log` are the record.

| Task | Status | Commits |
| --- | --- | --- |
| 1. Colour tokens | Implemented, in review | a13880a |
| 2. Colour pass: components and home | Not started | |
| 3. Colour pass: inner pages | Not started | |
| 4. Geometry and parts | Not started | |
| 5. Hero scene and layout | Not started | |
| 6. Highlight, motion, small screens | Not started | |
| 7. Service page drawings | Not started | |
| 8. Cleanup, docs, verification | Not started | |
| Whole-branch review | Not started | |

## Owner's decisions

- Level 3: a 3D-style hero drawing with the headline beside it.
- Software must lead the hero drawing.
- Every service clearly separated and colour-coded; pointing at any part lights the whole service.
- Content and claims stay as they are. No photos.

## Files

- `mockup-colour-levels.html`: the home page mockup. Open it in a browser. The bar at the bottom
  switches level, theme and page. `#l=3&t=light` in the address opens level 3 in Paper; `t=dark` is
  Blueprint; `&h=<service slug>` holds one service lit.
- `mockup-service-page.html`: the Software Development page mockup.
- `build.mjs`: builds both files from the site's real export in `out/`.
- `levels.css`: all mockup styles, written as layers over the live site's styles.
- `iso.mjs`: the 3D drawing kit: projection, parts, the six zones, the hero scene and the software
  page's drawing. Its coordinates are the ones to port.

## Rebuild

Run from the repository root, after `npm run build`:

```sh
A=docs/superpowers/specs/2026-11-17-colour-levels-assets
node $A/build.mjs "$PWD" $A
```

Note: `build.mjs` reads the live site's markup. Once the implementation changes that markup (from
Task 2 on), the script may no longer run; the two built `.html` files stay as the reference.
