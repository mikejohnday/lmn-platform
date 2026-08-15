# LMN Platform — Current State

*Last updated: 2026-08-15, by Claude Code (homepage photo-led refinement checkpoint).*

## Current Focus

Homepage/site-shell has gone through two passes on `feature/homepage`, not merged to `main`: a structural V1, then a creative/art-direction refinement using real LMN event photography. It is a strong first version, not a final design freeze — see Intentional Deferrals. The submission-flow prototype remains stable and was re-verified (not modified) after both passes.

## Where We Are

**Complete — submission flow** (built 14 Aug 2026, audited against `/docs`, unchanged since):

- `/submit` (Step 1 + both Step 2 branches), `/submit/thank-you`, accessibility baseline (AM-05), mobile-first CSS, LMN brand pass (Adobe Fonts, logo, provisional dark/earthy palette — see OQ-13).
- Full detail in git history (`9e6fe56`, `6db06ef`) — not repeated here.

**Complete — homepage, photo-led refinement** (built 15 Aug 2026, on `feature/homepage`, not merged to `main`):

- Shared site shell unchanged from V1: `app/components/SiteHeader.tsx` (sticky header, logo → `/`, "Radio"/"Submit" nav, mobile hamburger menu), wired into `app/layout.tsx` on every route.
- `/` (`app/page.tsx`) rebuilt again from the V1 structural version into a photo-led, editorial homepage using real LMN event photography supplied by Mike under `public/brand/images/` (10 photos added; 4 curated and used, the rest left available but not forced into the page):
  - **Hero** — `IMG_4430.jpg` (the real LMN neon sign glowing on brick, crowd silhouettes below), near-full-viewport-height, full-bleed, content anchored bottom-left (not centered). The redundant "LMN" text heading below the logo from V1 was removed — just the small logo mark, a tagline, and two understated text-link CTAs (no filled buttons).
  - **Radio** (`id="radio"`) — `CNV000022.jpg` (crowd with hands raised at the DJ booth) as a full-bleed backdrop; the SoundCloud embed (same live `soundcloud.com/lmnuk` oEmbed as V1, functionality unchanged) now sits inside a small translucent/blurred frame instead of a plain white box.
  - **Atmosphere break** — `IMG_4305.jpg` (golden backlit crowd), a short wordless full-bleed strip between Radio and Submit for scroll rhythm/negative space.
  - **Submit** — `CNV00016.JPG` (candid smiling portrait) paired asymmetrically with the copy (image + text side by side on desktop, stacked on mobile); reduced to a single text-link CTA, no repeated buttons.
  - The heavy rounded-card panel treatment from V1 (bordered boxes for Radio/Submit/Connect) is gone — these are now full-bleed photography sections.
- "Stay Connected" is no longer a standalone section — folded into `app/components/SiteFooter.tsx` as a small "Stay connected" label above the existing Instagram/SoundCloud/Linktree links (`app/components/SiteFooter.module.css` updated accordingly).
- New design token from V1, unchanged: `--color-signal: #ff3d6e` (provisional neon accent, OQ-13).
- One real issue hit and fixed during this pass, not a lingering bug: the hero photo initially rendered near-solid-black because `IMG_4430.jpg` is a very dark, low-key night shot and the wide hero crop landed on mostly-black wall/ceiling. Fixed with a `brightness(1.4)` CSS filter on the image, a lighter scrim gradient, and a retuned `object-position` — confirmed visually at mobile and desktop after the fix.

**Not started:**

- Any persistence, transactional email, spreadsheet integration, hosting, deployment — correctly deferred per PRD §9.2/§10, not gaps.
- No further homepage content sections beyond what's listed above (still no Events section — no real event data existed to show honestly).

**Needs verification:**

- Nothing currently outstanding. See Verified below; re-check if code has moved since 15 Aug 2026.

## Verified

(15 Aug 2026, in-browser and via CLI, after the photo-led refinement)

- `npx tsc --noEmit` and `npm run lint` clean.
- No horizontal overflow at 375/414/768/800px (iframe-harness check) across all homepage sections including the full-bleed image sections.
- Hero, Radio, Atmosphere, and Submit sections all visually checked at both mobile (375×812) and desktop widths — photography displays correctly, no broken crops, SoundCloud embed frame renders and lists LMN's live track feed.
- Regression check with the new homepage present: `/submit` renders and functions identically (validation, conditional required toggle, step transition); `/submit/thank-you` and the footer at the bottom of both routes render correctly with the updated `SiteFooter`.
- `npm run build` (production build) was verified clean after the earlier V1 pass; not re-run after this photo-led pass specifically — worth a build check before the next production-adjacent step given `public/brand/images/` adds ~42MB of source photography (served through Next's image optimizer, not shipped raw, but worth knowing for repo size).

## Known Issues / Incomplete Work

None currently open.

## Intentional Deferrals

- **Homepage is a strong first version, not a design freeze.** Structure, identity, navigation, and now art direction are in place; further visual refinement is expected later and should not be read as unfinished/broken.
- **6 of the 10 supplied photos in `public/brand/images/` are unused** (`CNV000016.jpg`, `CNV000017.jpg`, `CNV00004 (1).JPG`, `CNV00006 (1).JPG`, `CNV00009.JPG`, `IMG_4455.jpg`) — deliberately curated out rather than forced onto the page. Available for a future pass if wanted.
- **No Events section on the homepage.** Real upcoming event data wasn't available from the public LMN site/SoundCloud at build time — skipped rather than inventing placeholder dates.
- **OQ-13 — LMN brand tokens**, including `--color-signal`, remain provisional placeholders, not confirmed brand hex values.
- **Progress indicator's mobile-only text variant** (`ux-specification.md` §4.1/§9.2) — known, flagged, deliberately not built yet.
- **OQ-17 — "Mix title" field** — not built; would need an explicit KAN-18-style amendment from Mike to reinstate.
- Everything in PRD §9.2/§10 (datastore, transactional email, spreadsheet integration, hosting, deployment, SPF/DKIM, rate limiting, monitoring) — deferred by design.
- Several other open questions in `docs/open-questions.md` (OQ-03…OQ-08, OQ-11, OQ-12, OQ-15, OQ-18, OQ-D1…OQ-D4, OQ-10) don't block either the prototype or the homepage and are intentionally untouched.

## Stable / Protected Areas

- `/submit` (Step 1 + both Step 2 branches) — working, spec-verified, re-verified compatible with the homepage/site shell. Do not casually refactor.
- `/submit/thank-you` — working, spec-verified, re-verified compatible with the updated footer.
- `app/globals.css` design tokens — brand values are provisional but the *mechanism* (isolated CSS custom properties) is deliberate; don't hardcode colors/fonts elsewhere.
- `app/components/SiteHeader.tsx` — unchanged in this pass, shared across every route via `app/layout.tsx`.
- `app/components/SiteFooter.tsx` / `SiteFooter.module.css` — now carries the "Stay connected" social messaging; shared across every route, so changes here affect `/submit` and `/submit/thank-you` too.

## Next Time

**Next direction not yet decided — ask Mike before beginning new feature work.**

## Resume Notes

- Work is on branch `feature/homepage`, not merged to `main`. This checkpoint commits and pushes that branch only.
- Local dev server was run on port 3002 during this session (port 3000 was occupied by an unrelated, pre-existing process — left alone). Running `npm run build` while `next dev` is active against the same `.next` directory corrupts the dev server's cache — stop `next dev` first, or use a separate build check.
