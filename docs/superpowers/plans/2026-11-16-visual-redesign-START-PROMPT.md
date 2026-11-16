# Prompt to start (or resume) the visual redesign in a new session

Open Claude Code in the `infyta-frontend` folder and paste everything in the block below. The
same prompt works to resume after an interruption: the plan's checkboxes show where to continue.

```text
Execute the Infyta visual redesign plan.

Project: /Users/mirzashihab/Documents/CodeLib/Infyta/infyta-frontend
Branch: visual-redesign (work in this checkout; do not create a worktree or switch branch)
Plan: docs/superpowers/plans/2026-11-16-visual-redesign.md
Spec: docs/superpowers/specs/2026-11-16-visual-redesign-design.md

Use the superpowers:subagent-driven-development skill and run the plan task by task. Begin with
the plan's "Start Here" section and do its checks first. If some boxes are already ticked, or the
working tree has unfinished changes, resume as that section describes instead of starting over.

Models: follow the plan's model table exactly, and pass the model explicitly on every subagent you
dispatch. My rule is: optimize the token usage without compromising the quality. Where you can use
the less expensive models like Sonnet or lower without compromising any quality, use them. Where
using them may affect the quality, use Opus to keep the best possible quality outcome.

Tools, plugins and skills: use the ones listed in the plan's "Tools, plugins and skills" section.
The superpowers and frontend-design plugins must be enabled; if either is missing, tell me before
you start.

Rules:
- The design, the spec and the plan are approved. Do not redesign anything, and do not change the
  wording or the decisions in spec section 12. Ask me only in the cases the plan lists.
- Commit after every task, and keep the plan's checkboxes and the status table in
  docs/superpowers/specs/2026-11-16-visual-redesign-assets/README.md up to date, so I can resume
  after a power cut. Never push and never merge.
- Before calling any task done, run `npm run check` yourself and read the output.
- When all nine tasks and the whole-branch review are done, give me a short summary: what changed,
  the Lighthouse scores, anything you could not verify, and the by-hand checks that are left for me.
```
