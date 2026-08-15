# LMN Platform — Current State

*Last updated: 2026-08-15, by Claude Code (repo audit, no code changes this session).*

## Current Focus

No feature is actively in progress. The submission-flow prototype (PT-01…PT-19) reached a stopping point on 14 Aug 2026 and was committed. Homepage/site-shell work has **not** started — `app/page.tsx` is still the original scaffold placeholder.

## Where We Are

**Complete** (built, and matches `/docs` per an explicit line-by-line audit on 14 Aug 2026 — see `docs/amendments.md` AM-06/AM-07 and the Section D decision log for what that audit covered):

- `/submit` — Step 1 (About You) with full validation, conditional Country/City/SoundCloud required toggle, submission-type selector (Mix/Demo).
- Step 2 — both Mix and Demo/Track branches, full field sets, validation, character counters, consent checkboxes.
- Step transitions: browser history (`pushState`/`popstate`) and in-app Back both preserve values; Step 2 values persist across a type switch (AM-06).
- Progress indicator with named segments and completed-step tick.
- `/submit/thank-you` — real page (not a stub), verbatim copy, LMN logo, social links to the real LMN Instagram/SoundCloud.
- Accessibility baseline (AM-05): labels, keyboard access, `aria-live` errors, focus-to-first-invalid-field, and focus-to-heading on step transition.
- Mobile-first CSS throughout (375px base, enhancements at 481px and 800px); no known horizontal overflow at 375/414/768/800px (last verified live in-browser, 14 Aug 2026).
- LMN brand pass: Adobe Fonts (Podium Soft + Microgramma via Typekit project `wto5lva`), real logo asset, dark/earthy palette via CSS custom-property tokens in `app/globals.css` (`--color-*`). Palette values are explicitly **provisional design choices**, not confirmed brand hex values — see `docs/open-questions.md` OQ-13, still open.

**Not started:**

- Homepage / site shell / navigation (`app/page.tsx` is a placeholder).
- Any persistence, transactional email, spreadsheet integration, hosting, deployment — all correctly deferred per PRD §9.2/§10, not gaps.

**Needs verification:**

- Nothing currently outstanding from the last slice — lint, typecheck, and full end-to-end browser flow (both paths) were all verified 14 Aug 2026 (see Verified below). Re-verify before trusting this if significant time has passed or code has changed since.

## Verified

(as of 14 Aug 2026, in-browser and via CLI — re-check if the code has moved since)

- `npx tsc --noEmit` and `npm run lint` clean (also re-confirmed 15 Aug 2026 during this audit, no code changes in between).
- Full end-to-end flow tested live: Step 1 → Next → Step 2 Mix → Submit → lands on real `/submit/thank-you` with correct page title.
- Focus lands on the Step 2 heading after a successful step transition (AM-05 fix validated).
- No horizontal overflow at 375/414/768px (iframe-harness `scrollWidth`/`clientWidth` check) for the submission form and the thank-you page.
- Thank-you page social buttons have correct `href`/`target="_blank"`/`rel="noopener noreferrer"`.
- Working tree is clean and `main` is up to date with `origin/main` — the 14 Aug work is committed (`9e6fe56`) and pushed, not just local.

## Known Issues / Incomplete Work

None currently open from the last slice. The last work session ended cleanly with everything committed and pushed.

## Intentional Deferrals

- **OQ-13 — LMN brand tokens.** Current palette/tokens are provisional placeholders, isolated as swappable CSS custom properties, per `ux-specification.md` §9.3. Not a gap to "finish" without Mike supplying real brand values or confirming extraction from lmnuk.com.
- **Progress indicator's mobile-only text variant** (`ux-specification.md` §4.1/§9.2) — known, flagged, deliberately not built yet.
- **OQ-17 — "Mix title" field** (dropped by KAN-18, present in the older PID) — not built. Would need an explicit KAN-18-style amendment from Mike to reinstate, not a silent addition.
- Everything in PRD §9.2/§10 (datastore, transactional email, spreadsheet integration, hosting, deployment, SPF/DKIM, rate limiting, monitoring) — deferred by design, not missing.
- Several other open questions in `docs/open-questions.md` (OQ-03…OQ-08, OQ-11, OQ-12, OQ-15, OQ-18, OQ-D1…OQ-D4, OQ-10) don't block the prototype and are intentionally untouched.

## Stable / Protected Areas

- `/submit` (Step 1 + both Step 2 branches) — working, spec-verified, do not casually refactor.
- `/submit/thank-you` — working, spec-verified.
- `app/globals.css` design tokens — brand values are provisional but the *mechanism* (isolated CSS custom properties) is deliberate; don't hardcode colors/fonts elsewhere.

## Next Time

**Next direction not yet decided — ask Mike before beginning new feature work.**

(The user's own message that requested this memory system mentioned homepage/site-shell work only as a hypothetical example of what a mid-session handover might look like — it is not a confirmed instruction to start that work.)

## Resume Notes

None — no work was mid-flight when this document was written. This file itself, and the `CLAUDE.md` project-memory workflow, were added in this session as new repository infrastructure (no application code touched).
