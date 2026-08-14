# Open Questions, Conflicts and Deferred Decisions

**Status:** Live tracking document.
**Resolved items are struck through and marked ✅** — they are closed, recorded in `amendments.md`, and must not be reopened. Everything not struck through is genuinely open.
**Owner:** Mike Day — all decisions below are his.
**Last updated:** 13 August 2026

---

## How to use this document

Every entry is an **unresolved conflict between authoritative documents (B)**, a **deferred product decision (C)**, a **gap** where a required specification was never written, or a **proposed architecture decision (E)** that no signed document mandates. Categories are defined in `README.md` §3.1.

**Rules for anyone building from this documentation set:**

1. **Do not resolve any of these yourself.** Do not pick the more convenient option because it is easier to implement.
2. Where a conflict exists, the **authoritative source wording is preserved** in the specification documents. Build to that.
3. Where a specification is missing, the affected item is marked `TBD — DECISION REQUIRED`. Stop and ask; do not invent content.
4. Items marked **Prototype blocker: No** must not stall the prototype build.

**Severity key:** 🔴 blocks the prototype · 🟠 must be resolved before go-live · 🟡 should be resolved, low urgency

**On the numbering:** `OQ-nn` identifiers are **stable references**, cited from the other documents in this set. They are not a reading order and are not renumbered when items are added. Section C mixes `OQ-09/10` with `OQ-D1–D4` for this reason.

---

## Section A — Conflicts and unresolved points within the authoritative documents

*Includes both direct contradictions between signed/approved documents and points those documents left ambiguous or unsigned.*

### ~~OQ-01 — Genre character limit: 20 or 50? 🟠~~ ✅ RESOLVED

> **CLOSED 13 Aug 2026 by `amendments.md` AM-03.** Limit stays **20**; the error string is corrected to `Genre must be 20 characters or fewer.`
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** No — build to 20, flag the mismatched error string.

| Source | States |
|---|---|
| **KAN-18 v1.1** (signed, authoritative for field constraints) | Genre(s) — **Max 20 characters** |
| **KAN-20 §5.1 #8** (approved) | `Max 20 chars` — **agrees with KAN-18** |
| **KAN-20 §9.1** (approved, character-limit enforcement) | `Genre (20)` — **agrees with KAN-18** |
| **KAN-20 §7.2** (approved, validation error text) | `"Genre must be 50 characters or fewer."` |

**The conflict is narrow.** Three of the four references say 20. Only the validation *error message string* says 50, which suggests it may be a copy-paste from the Artist Name error immediately above it in the same table. But the error string is approved user-facing copy, so it has not been altered.

**Current state in the docs:** `field-specification.md` implements a **20-character limit** (KAN-18 authoritative) and reproduces the approved error string **verbatim as written** — meaning a user who exceeds 20 characters currently sees a message telling them the limit is 50. This is deliberately left inconsistent rather than silently patched.

**Previously raised** as KAN-19 §13 Open Question 3 and §14 Recommendation 1. Never answered.

**Decision needed:** either (a) confirm 20 and approve a corrected error string, or (b) raise the limit to 50 via a KAN-18 amendment, as was done for Artist Name in v1.2. Option (b) note: 20 characters is tight for entries like "Melodic Techno / Progressive".

---

### ~~OQ-02 — Mix image and video links: Required or Optional? 🔴~~ ✅ RESOLVED

> **CLOSED 13 Aug 2026 by `amendments.md` AM-01.** **Required.** Minimum 1, maximum 3 per group. Image and video minimums are independent.
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** Partially — the required status is decided (KAN-18 stands), but the accordion behaviour and the missing error message are unresolved.

**Mike's instruction of 13 Aug 2026:** *"Do NOT change Mix image/video links to optional. Treat the KAN-18 requirement as authoritative unless I explicitly approve a product change."* This is applied throughout the documentation set. The conflict below is recorded because it remains a genuine contradiction that will surface during the build.

| Source | States |
|---|---|
| **KAN-18 v1.1 field table, Required (Mix) column** | **Required** — for both Image links (up to 3) and Video links (up to 3) |
| **KAN-18 v1.1, note inside those same table cells** | *"V1 scope decision: downgraded from required to optional to reduce form abandonment. Review for V2."* |
| **KAN-20 §5.2 field order table** | **Optional** for all six link fields |
| **KAN-20 Concepts (historical) §2 quick-reference table** | **Optional** |
| **KAN-20 §5.2 assets note** | *"Image links and Video links were downgraded from Required to Optional in v1.1 specifically to reduce form abandonment."* |
| **KAN-20 §3.3 / §4.2 accordion design** | Fields sit inside an accordion **collapsed by default**, labelled `+ Add image / video links` with an `(optional)` suffix |

**The signed KAN-18 table contradicts its own note.** Everything downstream followed the note rather than the column.

**Consequence if unresolved:** a **required** field hidden behind a **collapsed** accordion labelled **optional** cannot be completed unless the user first discovers it. On submit, validation would fail against a field that is not visible, with the error message out of view. This is not a build problem to engineer around — it is a product contradiction.

**Current state in the docs:** required status is **Required** per KAN-18. The KAN-20 accordion design is preserved exactly as approved. Both are flagged inline in `field-specification.md` §1.5 and `ux-specification.md` §5.4. Neither has been altered to agree with the other.

**Decision needed — three coherent outcomes:**

| Option | Required status | Accordion |
|---|---|---|
| (a) Confirm **Required** | Required | Accordion must open by default, or be removed, and the `(optional)` label corrected |
| (b) Confirm **Optional** | Optional — requires a KAN-18 amendment, as done for Artist Name in v1.2 | Unchanged, as approved |
| (c) Split | e.g. Image links required, Video links optional | Adjust accordingly |

---

### ~~OQ-02b — If Required, does that mean all three links, or at least one? 🔴~~ ✅ RESOLVED

> **CLOSED 13 Aug 2026 by `amendments.md` AM-01.** **At least one per group.** `Image Link 1` and `Video Link 1` are required inputs; links 2–3 are optional.
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** Yes, if OQ-02 resolves to Required.

KAN-18 lists the field as *"Image links (up to 3)"* with input type *"URL (x3)"* and a Required status. *"Up to 3"* implies a maximum, not a minimum. But three separate required URL inputs would mean an artist must supply exactly three images and three videos — six URLs — to submit a mix.

No approved document addresses this. **Do not infer it.**

**Decision needed:** if OQ-02 resolves to Required, specify whether the requirement is (a) all three, (b) at least one of three, or (c) some other minimum.

---

### OQ-03 — Google Drive asset organisation: V1 or V2? 🟠

**Prototype blocker:** No — not in prototype scope under any reading.

| Source | States |
|---|---|
| **PID §2, §5** | Organise submitted assets into a structured Google Drive folder — part of MVP scope |
| **PID §8** | *"Google Drive folder structure created"* — deliverable 7 |
| **PID §7** | *"Submitted assets or links are easy to review"* — success criterion |
| **Field spec draft (superseded), workflow step 10** | *"**Future enhancement:** create/link a dedicated Google Drive folder for accepted submissions"* |
| **Programme Roadmap** | Drive automation is *"your main delivery risk… time-box it to ~1 week; if it fights back, ship V1 with links-only capture and move folder automation to V2"* |

Three documents, three positions. Note also that V1 is **links-only with no file uploads** — so there are no files to organise, only URLs. It is unclear what a Drive folder would contain.

**Decision needed:** in V1, or deferred to V2?

---

### OQ-04 — File upload safeguards: live requirement or dead letter? 🟡

**Prototype blocker:** No. **Confirm-only.**

| Source | States |
|---|---|
| **PID §5** | Set file size limits · restrict accepted file types · avoid unlimited uploads · prevent users uploading huge files into cloud storage |
| **PID §7** | *"File upload limits and spam protection are active"* — success criterion |
| **KAN-18 v1.1** | All music and asset fields typed as URL — no upload field exists |
| **KAN-20 §9.1, §9.3** | *"No file uploads. Links only throughout V1."* |

KAN-19 §12 treated the PID language as *"resolved, not open"* — uploads are excluded, so upload restrictions have nothing to restrict.

**Current state in the docs:** documented as links-only, no uploads. PID §5 safeguard language recorded as superseded rather than deleted, in `PRD.md` §6.5.

**Decision needed:** confirm the PID safeguard requirements are formally retired for V1, or say if upload capability should return to the roadmap.

---

### OQ-05 — Spam protection: honeypot only? 🟠

**Prototype blocker:** No — spam protection is production scope.

| Source | States |
|---|---|
| **PID §5** | *"Include spam protection such as reCAPTCHA or equivalent"* |
| **KAN-20 §9.1, §9.3** | *"Honeypot spam protection. No CAPTCHA."* — justified by CRO research from the historical KAN-20 Concepts draft (CAPTCHAs reduce form completion by up to 30%) |

KAN-19 §12 treated the PID suggestion as superseded by KAN-20's explicit, evidence-backed decision.

**The UX decision is not being reopened.** One consequence is worth surfacing: the honeypot-only decision was made when a mature commercial plugin was also going to contribute baseline hygiene around it — submission throttling, rate limiting, known-bot filtering. A custom public endpoint has none of that by default. Rate limiting is invisible to users and would not change the approved experience, but it is an addition, so it is flagged rather than added.

**Decision needed:** confirm honeypot-only stands, and say whether server-side rate limiting should be added before go-live.

---

### OQ-06 — "How did you hear about LMN?" 🟡

**Prototype blocker:** No.

Present in the undated Field Specification draft (Artist Details, optional both types, *"Marketing insight"*). **Absent** from the signed KAN-18 v1.1 table and every document after it.

KAN-19 §12 assumed this was an intentional removal during the v1.1 review, since v1.1 was reviewed and signed off after that draft — not an oversight. That assumption has never been confirmed.

**Current state in the docs:** the field is **not** included.

**Decision needed:** confirm the removal was deliberate.

---

### OQ-07 — What does review status "Scheduled" mean? 🟡

**Prototype blocker:** No — the review lifecycle is not built in V1.

KAN-18 v1.1 Related Tickets states explicitly: *"the meaning of 'Scheduled' must be defined in KAN-24 before implementation."*

**KAN-24 was never written.** The status enum exists (`New`, `Reviewing`, `Accepted`, `Scheduled`, `Rejected`, `Archived`) but the meaning of `Scheduled`, and what triggers the transition into it, is undefined.

**Current state in the docs:** carried in `workflows.md` §6.1 as `TBD — DECISION REQUIRED`.

**Decision needed:** define `Scheduled`, or confirm it should be dropped from the V1 enum.

---

### OQ-08 — The Country / City / SoundCloud conditional required fallback 🟡

**Prototype blocker:** No. **Recorded to prevent a wrong turn, not to ask a question.**

This is **not** a conflict — KAN-18 and KAN-20 agree that Country, City and SoundCloud Link are Required for Mix and Optional for Demo, remaining visible in both cases.

It is recorded because a documented **fallback** exists that must not be applied. KAN-19 Risk R1 proposed: *"Fallback: mark these three fields Required for both submission types… if no clean native or lightweight-JS solution is found."*

That fallback existed solely because no evaluated commercial form plugin confirmed native support for a conditional required-status toggle, as opposed to simple show/hide. **On a custom build there is no such constraint.** The fallback is void.

**Action:** none required from Mike. Do not apply the R1 fallback. Flagged in `field-specification.md` §6 and `workflows.md` §3.2.

---

### ~~OQ-14 — Changing submission type after entering Step 2 data 🟡~~ ✅ RESOLVED

> **CLOSED 14 Aug 2026 by `amendments.md` AM-06.** Step 2 values for both the Mix and Demo/Track paths are **preserved**, not cleared, across a mid-form submission-type change.
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** No — a reasonable default is stated below.

No approved document specifies what happens if a user reaches Step 2, goes Back to Step 1, and **changes the submission type**. Step 2 must obviously re-render with the other field set, but whether previously entered Step 2 values are cleared or retained is unspecified.

KAN-20's critique of the rejected Concept A noted the risk: *"if a user changes their type mid-form, fields clear and the experience can feel unstable."*

**Current state in the docs:** `workflows.md` §2 states Step 1 values are preserved in all cases, and flags the Step 2 behaviour as unspecified.

**Decision needed:** low priority. Discarding the abandoned path's Step 2 values is the conventional behaviour and is a safe prototype default, but it has not been approved.

---

### OQ-15 — Thank-you page copy is "recommended", not approved 🟠

**Prototype blocker:** No — build to the drafted copy.

The thank-you page copy is the only user-facing copy in the set that was never formally signed off.

| Source | States |
|---|---|
| **KAN-20 §8** | *"The copy below is **recommended**. Mike should review and adjust the tone or timeframe as needed before go-live."* |
| **KAN-20 §8.1** | Section title: *"**Recommended** Page Copy"* |
| **KAN-20 §10** acceptance criteria | *"Thank-you page copy is **drafted and ready for Mike's review**"* |
| **KAN-20 §8** timeframe note | *"'4 weeks' is used as the response timeframe below. **Adjust this before going live** if LMN's actual expected response time differs."* |
| **KAN-20 §8.2** | *"no index **recommended**"* |

Every other approved string in this set — consent wording, button copy, error messages, field labels — carries explicit "do not change" language. This one does not.

**Current state in the docs:** reproduced verbatim in `ux-specification.md` §8.1, clearly labelled as recommended rather than approved. The `noindex, nofollow` instruction is likewise marked as recommended.

**Decision needed:** approve the copy as written, or amend it — in particular the **4 week** response timeframe, which also governs the auto-reply email (see OQ-11) and is the single number most likely to change before go-live.

---

### ~~OQ-16 — Is the Next button disabled, or does it error? 🟡~~ ✅ RESOLVED

> **CLOSED 13 Aug 2026 by `amendments.md` AM-04.** **Next stays clickable** and shows `Please select a submission type.` on click.
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** No — but the two behaviours are visibly different to a user.

An internal tension inside the approved KAN-20 document:

| Source | States |
|---|---|
| **KAN-20 §2.1** step 3 | Submission type *"must be selected before Next is **enabled**"* — implying the button is disabled until a type is chosen |
| **KAN-20 §7.2** | Defines an error message shown *"on Next click"* when no submission type is selected: `Please select a submission type.` — which is only reachable if Next **is** clickable |

Both cannot be true. If Next is disabled, the error can never fire; if the error can fire, Next was never disabled.

**Current state in the docs:** both statements preserved as written, in `ux-specification.md` §4.3 and `workflows.md` §1. Neither has been smoothed over.

**Decision needed:** which behaviour? A disabled button with no explanation is generally the weaker pattern — users can be left unsure why they cannot proceed — but this is your call, not an implementation detail.

---

## Section B — Specifications never written, and deltas from earlier sources

### OQ-11 — Auto-reply confirmation email copy 🟠

**Prototype blocker:** No — email is production scope.

**KAN-26 does not exist.** The confirmation email content and trigger were assigned to it by KAN-18's Related Tickets section. What exists instead:

- **PID §5 draft:** *"Thanks for submitting to LMN. We've received your submission and aim to review it within the next week. If it's a good fit, we'll be in touch."*
- **KAN-20 §8.1** thank-you page copy — itself only *recommended*, see **OQ-15** — which KAN-19 §10 flagged as *"a ready starting point"* for the email

⚠️ **These two conflict on response time.** The PID draft says *"within the next week"*. The drafted thank-you page copy says *"within 4 weeks"*, twice, and explicitly asks the artist not to follow up before then. Sending an email promising one week while the page promises four would directly cause the chase emails the design is meant to prevent.

**Decision needed:** approve final email copy. I can draft it from the drafted thank-you copy for your review — it is not written yet because writing user-facing copy unprompted would be a product decision.

---

### OQ-12 — Submission tracking spreadsheet schema 🟠

**Prototype blocker:** No — spreadsheet integration is production scope.

**KAN-24 does not exist.** It was assigned ownership of the spreadsheet schema, column structure and review status values. What exists:

- **PID §5** lists the intended columns: Submission date · Submission type · Artist name · Email · Social links · Music link/file · Asset links · Bio · Tracklist · Notes · Status · Reviewer notes · Recommended next action
- **KAN-19-AR §9** establishes the design principle: synced read-only columns must be explicitly separated from human-owned workflow columns
- **KAN-20 §10.1** notes *"All fields from Section 5 become columns in the tracking spreadsheet"*

**Decision needed:** the schema needs writing before the spreadsheet integration is built. Not urgent for the prototype.

---

### OQ-13 — LMN brand tokens 🟡

**Prototype blocker:** No — placeholders are acceptable and are specified.

KAN-20 references *"LMN brand colours"*, *"LMN primary colour"* and *"LMN CTA button style"* without specifying values. The build needs hex values, font families, and the logo/wordmark asset.

**Current state in the docs:** `ux-specification.md` §9.3 instructs the prototype to use neutral placeholders isolated as swappable tokens, and explicitly not to invent a palette and present it as approved.

**Decision needed:** supply the brand values, or confirm they should be extracted from lmnuk.com.

---

### OQ-17 — PID fields that KAN-18 dropped 🟡

**Prototype blocker:** No — KAN-18 governs, so they are simply not built.

The PID's MVP Mix Submission field list `[PID §5]` includes two fields that do **not** appear in the signed KAN-18 v1.1 table and appear in no document after it:

| PID field | Status in KAN-18 v1.1 | Notes |
|---|---|---|
| **Mix title** | Absent | A mix has a name; the form currently captures only the Mix Link and Tracklist. Nothing in the field set records what the mix is called. |
| **Other social/music links** | Absent | KAN-18 retains Instagram / social link and SoundCloud link, but not a general "other links" catch-all. |

By the authority hierarchy, KAN-18 supersedes the PID on fields, so neither is built. But unlike the *"How did you hear about LMN?"* removal (OQ-06), these two were never explicitly noted as deliberate.

**"Mix title" is the one worth a second look.** Its absence means an accepted mix arrives with no title attached, which has obvious downstream consequences for radio scheduling and promotion — the exact use case the Mix path exists to serve.

**Decision needed:** confirm both removals were deliberate, or raise a KAN-18 amendment (as was done for Artist Name in v1.2) to reinstate Mix title.

---

## Section C — Pre-Go-Live decisions

None of these block the localhost prototype. All are required before go-live.

### OQ-18 — Should the application own a system of record? 🟠

**Prototype blocker:** No — the prototype persists nothing.
**Category: E — proposed architecture. Not inherited from any signed document.**

An earlier version of this documentation set raised persistence from **should-have** to **must-have** and presented it in the capability table as an ordinary requirement. That was an engineering decision, not a product one, and it has been reverted. `submission-system.md` CAP-12 / REQ-37 now carry the **should-have** priority KAN-20 §9.1 assigned.

| Source | Says |
|---|---|
| **PID §5** | Submissions logged in a spreadsheet. Silent on a database. |
| **KAN-20 §9.1** | *"Entry storage in the WordPress database"* — **should-have**, a *"backup record"* |
| **KAN-18** | Silent — defines what is collected, not where it is stored |
| **KAN-19 Architecture Review §9** *(retired)* | Database is the system of record; spreadsheet is a reporting layer only |

**The proposal, with both sides, is in `implementation-guidance.md` §2.** In short: under WordPress, storage arrived free as a side effect of the plugin; under a custom build it does not exist unless someone builds it, so an unbuilt should-have means the only record of a submission is a spreadsheet row a human can overwrite. Against that: at LMN's volume a spreadsheet plus per-submission admin emails may be an entirely adequate V1 record, and insisting on a database is arguably the *"unnecessary complexity"* the PID's MVP philosophy warns against.

**Decision needed:** confirm should-have and accept the spreadsheet as the practical record, or adopt the system-of-record model. Related: **OQ-D2** (what the datastore actually is) and **OQ-12** (the spreadsheet schema).

---

### OQ-D1 — Where does the application run? 🟠

WordPress previously provided hosting on lmnuk.com. A custom application needs somewhere to run. Broadly:

- **(a)** Same domain, path-based — `lmnuk.com/submit` — requires a reverse proxy or routing rule on the existing site
- **(b)** Subdomain — `submit.lmnuk.com` — cleanest to deploy, slightly weaker brand continuity
- **(c)** Separate host, with the existing site linking out

**Note:** KAN-20 fixes the routes `/submit` and `/submit/thank-you`. Option (b) would change these to `submit.lmnuk.com/` and `submit.lmnuk.com/thank-you`. That is a change to an approved specification, so it needs recording if chosen.

No product impact. The prototype uses local routes `/submit` and `/submit/thank-you` regardless.

---

### OQ-D2 — What is the system of record? 🟠

The KAN-19 Architecture Review §9 made a deliberate, well-argued decision: the database — **not** Google Sheets — is the system of record, because a spreadsheet has no audit trail, no schema enforcement, no cell-level access control, and one edited cell can silently break downstream automation.

That reasoning is unchanged and still applies. But the WordPress database it referred to no longer exists.

**Decision needed:** what replaces it. This is a genuine architectural decision and has not been made on your behalf.

---

### OQ-D3 — How does LMN view submissions in V1? 🟠

WordPress admin previously provided a free UI for browsing submission entries. That disappears with the platform.

The PID records an internal review dashboard as a **V2 future enhancement** `[PID §11]` — note it does not appear on the signed KAN-18 or PID §6 out-of-scope lists, so this is an inference from its V2 placement rather than an explicit V1 exclusion. Either way it is not built in V1, so LMN's only view of a submission would be **the admin notification email plus the tracking spreadsheet**.

That may well be fine — the spreadsheet was always the intended review surface. But it is a real capability loss relative to the previous plan.

**Decision needed:** confirm the spreadsheet plus admin email is sufficient for V1.

---

### OQ-D4 — Transactional email provider 🟠

Admin notification (must-have, REQ-33) and artist auto-reply (should-have, REQ-36) were both going to be handled by the form plugin. A custom application needs an email provider, plus a sending address on the lmnuk.com domain with SPF/DKIM configured.

Without correct sender authentication, confirmation emails are filtered as spam — which quietly defeats the entire anti-chase rationale behind the thank-you page copy.

**Decision needed:** choose a provider and confirm domain sending setup.

---

### ~~OQ-09 — Accessibility requirement 🟠~~ ✅ RESOLVED

> **CLOSED 13 Aug 2026 by `amendments.md` AM-05.** **Prototype baseline adopted** (semantic HTML, labels, keyboard, focus management, accessible errors, `aria-live`). Production programme still deferred.
>
> This is no longer an open question. Do not reopen it. The record below is retained for audit only.

**Prototype blocker:** No, but cheap to get right early and expensive to retrofit.

The Architecture Review recorded this as **Risk R11**: *"No accessibility requirement was captured anywhere in the PID, KAN-18, or KAN-20."* Its recommendation was to add an explicit acceptance criterion rather than assume defaults are sufficient.

On a custom build there are no defaults at all. Label association, focus states, ARIA attributes, keyboard navigation and error announcement are all deliberate choices that someone has to make.

**Decision needed:** add a WCAG 2.1 AA acceptance criterion, or explicitly accept the gap for V1. This is a new requirement, so it has not been added unasked. Worth noting for the portfolio angle: it is inexpensive to build in from the start and demonstrates well.

---

### OQ-10 — Data retention policy 🟠

Raised as KAN-19 §13 Open Question 5. Never answered.

UK GDPR is already invoked for the consent checkbox wording. Once LMN owns the datastore outright, "how long are submissions kept, and how are they deleted on request" becomes a direct obligation rather than something a plugin vendor's defaults quietly handled.

**Decision needed:** define the policy, or record it as a pre-go-live task with an owner.

---

## Section D — Decision log

Decisions confirmed during this refactor, recorded so they are not relitigated.

| Date | Decision | Source |
|---|---|---|
| 13 Aug 2026 | Platform moves from WordPress + commercial form plugin to a custom-coded web application | Mike |
| 13 Aug 2026 | Immediate build target is a **localhost prototype** of the approved public experience, not a production build | Mike |
| 13 Aug 2026 | **Mix image and video links remain Required per KAN-18.** Later documents conflicting with KAN-18 are to be flagged, not followed | Mike |
| 13 Aug 2026 | Production concerns (hosting, datastore, email, spreadsheet, retention, deployment, monitoring) are documented but deferred, and must not block the prototype | Mike |
| 13 Aug 2026 | KAN-19 (plugin selection) and the KAN-19 Architecture Review are retired as decisions; their requirements register and portability/data-architecture principles are harvested | This refactor |
| 13 Aug 2026 | ~~CAP-12 / REQ-37 (persistence) raised from should-have to must-have~~ — **REVERTED** the same day. Persistence carries the should-have priority KAN-20 §9.1 assigned. The stronger position is now a proposed architecture decision (**OQ-18**), not a requirement | Corrective governance pass |
| 13 Aug 2026 | Engineering conventions, architecture proposals and advice harvested from retired documents moved out of the product documents into `implementation-guidance.md`, under a five-category provenance scheme (A–E) | Corrective governance pass |
| 13 Aug 2026 | **AM-01** — Mix image and video links **Required**, min 1 / max 3 per group, minimums independent. Closes OQ-02, OQ-02b | Mike |
| 13 Aug 2026 | **AM-02** — assets render as a visible `IMAGES & VIDEO` section; accordion and its `+ Add image / video links` label superseded | Mike |
| 13 Aug 2026 | **AM-03** — Genre error string corrected 50 → 20. Closes OQ-01 | Mike |
| 13 Aug 2026 | **AM-04** — Next stays clickable, errors on click. Closes OQ-16 | Mike |
| 13 Aug 2026 | **AM-05** — accessibility baseline adopted for the prototype. Closes OQ-09 at prototype level | Mike |
| 13 Aug 2026 | Stack approved: Next.js App Router · React · strict TypeScript · CSS Modules · Playwright + `node:test`. No form/state/UI/validation libraries | Mike |
| 13 Aug 2026 | REQ-39 (browser autofill) reclassified from requirement to guidance — its only source is the historical Concepts draft, elevated by the since-retired KAN-19 | Corrective governance pass |
| 14 Aug 2026 | Final Step 2 submit redirects via `router.replace`, not `router.push` — thank-you is a clean history dead-end rather than leaving the filled Step 2 form reachable via browser-forward. No document addresses push vs. replace; not a numbered OQ/AM since none was ever raised | Mike |
| 14 Aug 2026 | **AM-06** — Step 2 values preserved across a mid-form submission-type change. Closes OQ-14 | Mike |
| 14 Aug 2026 | **AM-07** — submission-type cards confirmed side-by-side on desktop; §4.3's "vertically stacked" wording superseded on desktop only | Mike |
