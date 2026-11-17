# Prompt to start (or resume) the colour and 3D drawings work in a new session

Open Claude Code in the `infyta-frontend` folder and paste everything in the block below. The
same prompt works to resume after an interruption: the plan's checkboxes show where to continue.

```text
Execute the Infyta colour and 3D drawings plan.

Project: /Users/mirzashihab/Documents/CodeLib/Infyta/infyta-frontend
Branch: colour-levels (work in this checkout; do not create a worktree or switch branch)
Plan: docs/superpowers/plans/2026-11-17-colour-and-3d-drawings.md
Spec: docs/superpowers/specs/2026-11-17-colour-and-3d-drawings-design.md

Use the superpowers:subagent-driven-development skill and run the plan task by task. Begin with
the plan's "Start Here" section and do its checks first. If some boxes are already ticked, or the
working tree has unfinished changes, resume as that section describes instead of starting over.

Models: follow the plan's model table exactly, and pass the model explicitly on every subagent you
dispatch. My rule is: optimize the token usage without compromising the quality. Use Sonnet and
Haiku where it will not impact the quality of output, and Opus where needed.

Tools, plugins and skills: use the ones listed in the plan's "Tools, plugins and skills" section.
The superpowers and frontend-design plugins must be enabled; if either is missing, tell me before
you start.

Rules:
- The design, the spec and the plan are approved. Do not redesign anything, and do not change the
  wording or the calls in spec section 13. Ask me only in the cases the plan lists.
- Checkpoint at every phase, because my device may lose power: commit, keep the plan's checkboxes
  and the status table in docs/superpowers/specs/2026-11-17-colour-levels-assets/README.md up to
  date, and keep the ledger the plan describes. Never push and never merge.
- Before calling any task done, run `npm run check` yourself and read the output.
- When all eight tasks and the whole-branch review are done, give me a short summary: what changed,
  the Lighthouse scores, anything you could not verify, and the by-hand checks that are left for me
  (including a look at the four new service-page drawings).
```
