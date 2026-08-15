# LMN Platform — Current State

*Last updated: 2026-08-15, by Claude Code (homepage V1 checkpoint).*

## Current Focus

Homepage/site-shell V1 has just been built on `feature/homepage` and is being checkpointed now. It is a first working version, not a final design — see Intentional Deferrals. The submission-flow prototype remains stable and was re-verified (not modified) as part of this work.

## Where We Are

**Complete — submission flow** (built 14 Aug 2026, audited against `/docs`, unchanged since):

- `/submit` (Step 1 + both Step 2 branches), `/submit/thank-you`, accessibility baseline (AM-05), mobile-first CSS, LMN brand pass (Adobe Fonts, logo, provisional dark/earthy palette — see OQ-13).
- Full detail in git history (`9e6fe56`, `6db06ef`) — not repeated here.

**Complete — homepage V1** (built 15 Aug 2026, on `feature/homepage`, not merged to `main`):

- Shared site shell: `app/components/SiteHeader.tsx` (sticky header, logo → `/`, "Radio"/"Submit" nav, mobile hamburger menu) and `app/components/SiteFooter.tsx` (brand line, nav repeat, social links). Both wired into `app/layout.tsx`, so they render on every route including `/submit` and `/submit/thank-you`.
- `/` (`app/page.tsx`) rebuilt from the scaffold placeholder into a real homepage: hero (logo, "LMN" headline, identity line reused verbatim from the existing `/submit` intro copy, Submit + SoundCloud CTAs), an `id="radio"` section with a **live SoundCloud oEmbed iframe** of the real `soundcloud.com/lmnuk` profile (no API/auth/backend — just the public embed URL), a submissions CTA section, and a "Stay Connected" section (Instagram / SoundCloud / Linktree links).
- Content and visual direction were sourced from a live in-browser visit to `lmnuk.com`, its Linktree, and the real LMN SoundCloud profile on 15 Aug 2026 (not the earlier text-only fetch, which returned almost nothing useful — the real site is a minimal atmospheric teaser page). This is where the dark/botanical/neon-glow direction, the numbered-mix-series framing of "LMN Radio", and the "Demos / Mixes" nav pattern (confirmed on LMN's own SoundCloud sidebar) came from.
- New design token `--color-signal: #ff3d6e` added to `app/globals.css` — a neon pink/magenta accent evidenced from the real site/SoundCloud avatar glow, used only as a subtle homepage hero glow. Provisional, like the rest of the palette (OQ-13), not a confirmed brand hex.

**Not started:**

- Any persistence, transactional email, spreadsheet integration, hosting, deployment — correctly deferred per PRD §9.2/§10, not gaps.
- No further homepage content sections beyond what's listed above (e.g. no events section — deliberately skipped, no real current event data existed to show honestly).

**Needs verification:**

- Nothing currently outstanding. See Verified below; re-check if code has moved since 15 Aug 2026.

## Verified

(15 Aug 2026, in-browser and via CLI)

- `npx tsc --noEmit`, `npm run lint`, and `npm run build` (production build) all clean.
- Homepage: no horizontal overflow at 375/414/768/800px (iframe-harness check); mobile hamburger menu opens/closes correctly and shows Radio/Submit links; SoundCloud embed renders and lists LMN's live track feed.
- Regression check on the protected submission flow with the new header/footer present: `/submit` and `/submit/thank-you` render correctly; conditional Country/City/SoundCloud required-toggle still fires; "Please select a submission type" (AM-04) still fires; focus-to-first-invalid-field (AM-05) still works. No regressions found.
- One incident during this session, resolved, not a code issue: running `npm run build` while `next dev` was still running corrupted the dev server's `.next` cache (stale webpack chunk error, blank `/submit` page). Fixed by stopping only the dev-server process bound to port 3002 (left an unrelated node process on port 3000 alone — it predates this session and wasn't touched) and restarting clean. Confirmed all three routes healthy afterward. No app code was at fault.

## Known Issues / Incomplete Work

None currently open.

## Intentional Deferrals

- **Homepage V1 is a first working version, not a design freeze.** Structure, identity, and navigation are in place; further visual refinement is expected later and should not be read as unfinished/broken.
- **No Events section on the homepage.** Real upcoming event data wasn't available from the public LMN site/SoundCloud at build time — skipped rather than inventing placeholder dates.
- **OQ-13 — LMN brand tokens**, including the new `--color-signal` token, remain provisional placeholders, not confirmed brand hex values.
- **Progress indicator's mobile-only text variant** (`ux-specification.md` §4.1/§9.2) — known, flagged, deliberately not built yet.
- **OQ-17 — "Mix title" field** — not built; would need an explicit KAN-18-style amendment from Mike to reinstate.
- Everything in PRD §9.2/§10 (datastore, transactional email, spreadsheet integration, hosting, deployment, SPF/DKIM, rate limiting, monitoring) — deferred by design.
- Several other open questions in `docs/open-questions.md` (OQ-03…OQ-08, OQ-11, OQ-12, OQ-15, OQ-18, OQ-D1…OQ-D4, OQ-10) don't block either the prototype or the homepage and are intentionally untouched.

## Stable / Protected Areas

- `/submit` (Step 1 + both Step 2 branches) — working, spec-verified, re-verified compatible with the new site shell. Do not casually refactor.
- `/submit/thank-you` — working, spec-verified, re-verified compatible with the new site shell.
- `app/globals.css` design tokens — brand values are provisional but the *mechanism* (isolated CSS custom properties) is deliberate; don't hardcode colors/fonts elsewhere.
- `app/components/SiteHeader.tsx` / `SiteFooter.tsx` — now shared across every route via `app/layout.tsx`; changes here affect `/submit` and `/submit/thank-you` too, so check both when editing.

## Next Time

**Next direction not yet decided — ask Mike before beginning new feature work.**

## Resume Notes

- Work is on branch `feature/homepage`, not merged to `main`. This checkpoint commits and pushes that branch only.
- Local dev server was run on port 3002 during this session (port 3000 was occupied by an unrelated, pre-existing process — left alone).
