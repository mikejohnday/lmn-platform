# CLAUDE.md — LMN Submission System V1

How to work on this repository. **This file is process, not product.** Every product fact — fields, copy, validation, layout, journey — lives in `/docs`. Nothing is duplicated here.

**Current build target: a localhost prototype.** Not production, not go-live.

---

## 1. `/docs` is the source of truth

`/docs` is the authoritative product specification for this build. Read it before writing code; follow it while writing code.

| File | Read it for |
|---|---|
| `docs/README.md` | Governance, authority hierarchy, provenance categories **A–E**. **Read this first.** |
| `docs/PRD.md` | Scope, out-of-scope, prototype scope (§9), definition of done (§9.3) |
| `docs/field-specification.md` | Fields, labels, types, required/optional, character limits, validation rules, error strings, consent wording |
| `docs/ux-specification.md` | Page copy, field order, layout, button copy, progress indicator, responsive rules, thank-you page |
| `docs/workflows.md` | User journey, step transitions, conditional-logic decision tables, submit flow |
| `docs/submission-system.md` | Capability requirements, submission logic, requirements register, non-functional requirements |
| `docs/open-questions.md` | **Every unresolved conflict and open decision. Check before building anything it touches.** |
| `docs/amendments.md` | **Decisions superseding signed content. Highest authority — read alongside README.** |
| `docs/implementation-guidance.md` | Engineering advice and proposals — **not product authority** |

**Before implementing any feature, read the relevant docs first.** Do not work from memory of an earlier turn, and do not work from the original KAN-18/KAN-19/KAN-20 source files — `/docs` supersedes them for build purposes.

---

## 2. Do not change the specification

- **Authoritative product requirements (category A) must not be changed, softened or reinterpreted without Mike's explicit approval.** That includes fields, required/optional status, character limits, validation rules, conditional logic, copy and journey.
- **Do not invent** new fields, behaviours, copy, requirements or features. If something seems missing, it is either deliberately out of scope or an open question — check `docs/PRD.md` §7 and `docs/open-questions.md` before assuming.
- **Do not build anything on the out-of-scope list** (`docs/PRD.md` §7), even partially, even if it looks trivial.
- **When the code and the docs disagree, the docs are right.** Flag the discrepancy and ask — do not edit `/docs` to match the code.

---

## 3. Never silently resolve a conflict or TBD

Items marked `⚠️ CONFLICT`, `TBD — DECISION REQUIRED`, or carrying an `OQ-nn` reference are **unresolved on purpose**.

When you hit one: **stop, state the options, and ask Mike.** Do not pick the option that is easier to implement. Do not resolve it in code and mention it afterwards.

**If the conflict blocks the current slice, do not continue that slice until Mike decides. Work may continue only on unrelated areas.**

**Resolved items are not open questions.** `docs/amendments.md` records decisions that supersede signed content — AM-01…AM-05 are settled and must not be reopened or re-litigated. Only unstruck items in `docs/open-questions.md` are live.

---

## 4. `implementation-guidance.md` is advice, not authority

It holds category **D** (implementation guidance) and **E** (proposed architecture) material — useful engineering thinking with no signed product source.

- It is safe to follow. It is not binding.
- **Never promote a D or E item into a product requirement**, and never cite it as justification for changing an A requirement.
- If it conflicts with a product document, the product document wins.

---

## 5. Keep prototype and production scope separate

- **Build only `docs/PRD.md` §9.1 (PT-01…PT-17).** Done is defined in §9.3.
- **Production concerns must never block the prototype.** Datastore, transactional email, spreadsheet integration, hosting, deployment, SPF/DKIM, rate limiting, monitoring — all deferred (`docs/PRD.md` §10). Do not build them, do not stub elaborate versions of them, do not stall on them.
- The prototype does not need to persist or transmit submissions. Assembling the payload and making it observable locally is enough.
- Do not quietly pull a production item forward because it seemed convenient.

---

## 6. Reproduce exact strings exactly

Consent wording, error messages, button labels, helper text, intro copy and thank-you copy are approved strings. Where the docs say verbatim, they mean it.

**Copy and paste them. Do not retype, rephrase, re-case, re-punctuate, fix apparent typos, or "improve" them.** Consent wording carries UK GDPR implications.

If a string looks wrong, that is a finding to raise — not a licence to change it. Approved copy has been amended exactly once, on the record: see `docs/amendments.md` **AM-03**.

---

## 7. How to build

- **Small vertical slices.** One thin, working path at a time — e.g. Step 1 rendering, then Step 1 validation, then the step transition. Prefer something demonstrable end to end over several half-finished layers.
- **Minimal dependencies.** Prefer the platform and the standard library. Before adding any dependency, say what it is for and what it replaces. No UI kit, form library, state manager or CSS framework without asking first.
- **Least complexity that satisfies the spec.** The governing product principle is *"simple, working proof over unnecessary complexity"* (`docs/PRD.md` §12). No abstraction layers this build does not need.
- **The tech stack has not been chosen.** No document specifies one. Propose it and get agreement before scaffolding — do not assume a framework.

---

## 8. Verify after significant changes

After each slice, run whatever checks exist — build, typecheck, lint, tests — and fix what breaks before moving on. Add tests where behaviour is easy to get subtly wrong: conditional branching, the required/optional toggle, validation triggers, state preservation across steps.

Manually check the things automated tests will not catch: the flow works end to end in a browser at 375px, and every visible string still matches the docs.

Do not report a feature or slice as complete while checks are failing or work remains unfinished. Unfinished work may still be checkpointed and handed over accurately via docs/current-state.md.

---

## 9. Git

- Commit at sensible milestones — a working slice, a completed section — not every file save and not one giant commit at the end.
- Write messages that say what changed and why, and reference the requirement (`PT-07`, `CL-2`, `AM-01`) where it helps.
- Do not commit secrets, `.env` files, build output or dependency directories.
- Prefer a feature branch for substantial implementation work. Do not let branch setup block a local prototype.

---

## 10. When in doubt

Ask. An unanswered question costs a message; a wrong assumption baked into the build costs a rewrite and quietly corrupts a specification that took real effort to sign off.

---

## 11. Project memory (`docs/current-state.md`)

`docs/current-state.md` is a short, current-only handover card — not a changelog, diary, or roadmap. Git history is authoritative for the past; this file describes *now*. Full behaviour is documented in its own header comment-equivalent — in short:

**Start of a fresh session:** ask "Want me to refresh from the LMN project state before we start?" before consuming context. If yes: read `current-state.md`, the relevant `/docs` files it points to, `git status`, and recent commits if needed — then give a short orientation (where things are, what's unverified, what Mike said to do next, if anything) and wait. Never start on a recorded "Next Time" item just because it's written down — it's context, not permission. If no, skip the refresh.

**End of session / checkpoint** (triggered by "checkpoint", "handover", "I'm done for today", "we're stopping here", or similar): inspect git status/diff and actual completed vs. unfinished work, run proportionate checks, rewrite `current-state.md` to match reality exactly (replace stale content, don't append), then offer a git checkpoint. If Mike hasn't said what's next, record "Next direction not yet decided — ask Mike" — never invent one.

**Git checkpoint offer:** confirm the correct branch, stage the relevant changes, commit with an honest message (`wip: ...` if incomplete), and offer to push the current feature branch. A checkpoint means "recoverable state," not "finished." Never merge to `main`, deploy, or tag a release just because a session ended, and never do those things without Mike explicitly asking. If work turns out to be sitting directly on `main`, flag it before committing and ask how to proceed.

Do not update `current-state.md` on every small edit — only at an explicit checkpoint or when a major state change makes it materially wrong. Do not auto-commit without approval; offer first.
