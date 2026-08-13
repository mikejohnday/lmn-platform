# Submission System — Behaviour and Capability Requirements

**Authoritative sources:** KAN-20 §9 (rewritten from plugin requirements to capability requirements), KAN-18, PID
**Status:** Implementation-agnostic. Split into **Prototype Scope** (§3–4) and **Pre-Go-Live / Production Implementation** (§5).

> **Governance note.** This document carries **authoritative product requirements only** — category **A** (traceable to KAN-18, approved KAN-20 or PID), with **B** conflicts and **C** deferred decisions flagged inline. Engineering proposals and implementation advice — categories **D** and **E** — live in `implementation-guidance.md` and are **not** product authority. See `README.md` §3.1 for the full category key.

---

## 1. System overview

A custom-coded web application serving a two-step artist submission form at `/submit`, with a static confirmation page at `/submit/thank-you`.

The system has four responsibilities:

1. **Present** the approved two-step form with correct conditional behaviour (prototype scope)
2. **Validate** submissions against the approved rules (prototype scope). *A server-side mirror of those rules is a proposal — category **E**, `implementation-guidance.md` **E-01** — not an inherited requirement.*
3. **Persist** each submission (production scope — *should-have* per KAN-20 §9.1; see CAP-12 and `implementation-guidance.md` §2)
4. **Notify** — admin email (must), artist auto-reply and spreadsheet write (should) — all production scope

The prototype implements 1 and 2. Nothing in 3 and 4 may block it.

---

## 2. Capability requirements

Rewritten from KAN-20 §9.1, which was framed as a checklist of features a form plugin had to support. **No requirement has been dropped, added or re-prioritised.** Every row below carries the priority its source document assigned it.

All rows are category **A** unless marked otherwise.

| # | Capability | Priority | Scope | Detail |
|---|---|---|---|---|
| CAP-01 | The form is presented as **exactly two steps** | Must | Prototype | Concept B. `[KAN-20 §1.1]` |
| CAP-02 | **Progress indicator** with named step labels, not numbers alone | Must | Prototype | Segments "About You" / "Your Submission". Completed step shows a tick. `[KAN-20 §3.2]` |
| CAP-03 | **Conditional field display** driven by the user's previous answer | Must | Prototype | Step 2 shows Mix fields or Demo fields exclusively. Also drives the required/optional label change on Country, City and SoundCloud Link. `[KAN-20 §9.1]` |
| CAP-04 | **Redirect on successful submission** to `/submit/thank-you` | Must | Prototype | `[KAN-20 §8, §9.1]` |
| CAP-05 | **Inline field validation** firing on blur, errors displayed below the field | Must | Prototype | `[KAN-20 §7.1]` |
| CAP-06 | **Character limit enforcement** with live counters | Must | Prototype | Artist Name 50 · Genre 20 · Bio 500 · Mix Notes 500 · Demo Notes 500. Counter amber at 80%, red at 100%. `[KAN-18; KAN-20 §7.1; AM-03]` |
| CAP-07 | **Admin notification email** to LMN on every new submission | Must | **Production** | `[KAN-20 §9.1; PID §5]` |
| CAP-08 | **Honeypot spam protection.** No CAPTCHA. | Must | **Production** | `[KAN-20 §9.1, §9.3]` — see OQ-05 |
| CAP-09 | **No file upload capability** | Exclusion | Prototype | V1 uses links only. Do not build a file upload path. `[KAN-20 §9.1, §9.3]` |
| CAP-10 | **Submission data written to the submission tracking spreadsheet** | Should | **Production** | `[PID §5; KAN-20 §9.1]` |
| CAP-11 | **Auto-reply confirmation email** to the submitting artist | Should | **Production** | `[PID §5; KAN-20 §9.1]` — copy never written, see OQ-11 |
| CAP-12 | **Submission entries stored server-side as a record of every submission** | Should | **Production** | Priority as stated in source. `[KAN-20 §9.1 — "Entry storage in the WordPress database", should-have, described as a "backup record"]` ⚠️ See §2.1 |

### 2.1 CAP-12 — priority note

**CAP-12 is recorded at the priority its source assigned: should-have.** `[KAN-20 §9.1]`

An earlier version of this document raised it to must-have on the strength of the KAN-19 Architecture Review's system-of-record argument. That was an engineering decision, not an inherited product requirement, and it has been reverted here. **No signed document requires a database**, and the only one that mentions storage at all calls it a should-have "backup record".

The argument for raising it remains on file — with the counter-argument stated fairly — as a **proposed architecture decision (E)** in `implementation-guidance.md` §2, tracked as `open-questions.md` **OQ-18**. It is worth deciding before go-live, because under WordPress storage arrived free as a side effect and under a custom build it does not exist unless someone builds it.

**Neither reading affects the prototype**, which is not required to persist anything.

---

## 3. Submission logic — prototype scope

### 3.1 Step 1 behaviour

1. Render intro copy and Step 1 fields in the approved order.
2. Submission type selector renders first and drives everything below it.
3. Country, City and SoundCloud Link render with required or optional labelling per the selected type (rule CL-2, `workflows.md` §3.2). They remain visible in both states.
4. Inline validation fires on blur; green tick on pass; red border plus specific error below the field on fail.
5. On `Next: Your Submission →`: validate all Step 1 required fields. If any fail, do not advance — scroll to the first error. If all pass, advance and update the progress indicator.

### 3.2 Step 2 behaviour

1. Render the field set determined by the Step 1 submission type (rule CL-1).
2. Section heading and progress segment label follow the selected type (rule CL-4).
3. Submit button label follows the selected type (rule CL-3).
4. `← Back` returns to Step 1 with all values preserved.
5. Consent checkboxes validate on **submit only**, never on blur.
6. On submit: validate all Step 2 required fields and both consent checkboxes. If any fail, do not submit — scroll to the first error. If all pass, complete the submission and redirect to `/submit/thank-you`.

### 3.3 State preservation

- Values entered in Step 1 survive navigation to Step 2 and back, via the Back button **or** the browser's own back control.
- The selected submission type persists across steps and drives Step 2 rendering.
- Behaviour when the user returns to Step 1 and **changes** the submission type after entering Step 2 data is unspecified in all approved sources — see `open-questions.md` **OQ-14**. Preserve Step 1 values in all cases.

### 3.4 What the prototype does on submit

Validate, then redirect. **Persisting or transmitting the submission is not required.** Assembling the submission payload and making it observable locally (console, in-memory store, or a local file) is sufficient to demonstrate the flow end to end.

---

## 4. Non-functional requirements — prototype scope

**Authoritative (A) only.** Three items previously listed here were engineering conventions with no authoritative source; they have moved to `implementation-guidance.md` — see §4.2 below.

| # | Requirement | Category | Detail |
|---|---|---|---|
| NFR-01 | **Mobile-first responsive layout** | **A** | Single column, full width. Minimum input height 48px. Minimum font size 16px on inputs. Verified at 375px, 414px and 768px. `[KAN-20 §4, §9.2]` |
| NFR-07 | **Form served by the application itself** | **A** | The artist is never sent to a third-party form host. `[PID §5 — "submission form embedded directly into the page"]` |
| NFR-08 | **Form styled to LMN brand** | **A** (values pending — **C**) | Form, progress bar and buttons match LMN branding. `[KAN-20 §9.2; PID §5]` Brand values are not yet supplied — see **OQ-13**. |

*NFR-07 and NFR-08 are new IDs. The previous NFR-02…NFR-06 IDs are retired rather than reused, so that references to the old numbering cannot silently resolve to a different requirement — see §4.2.*

### 4.1 Accessibility — NFR-09 `[AM-05]`

✅ **Resolved for the prototype.** No accessibility requirement existed in the PID, KAN-18 or KAN-20 (Architecture Review Risk R11). A baseline has been adopted and is **required from the first slice, not retrofitted**:

| # | Requirement | Category |
|---|---|---|
| NFR-09 | Semantic HTML elements throughout | **A** `[AM-05]` |
| NFR-09 | Every input has an associated `<label>` | **A** `[AM-05]` |
| NFR-09 | All controls keyboard-operable | **A** `[AM-05]` |
| NFR-09 | Focus moves to the first invalid field on validation failure | **A** `[AM-05]` |
| NFR-09 | Focus moves to the Step 2 heading after a successful transition | **A** `[AM-05]` |
| NFR-09 | Errors programmatically associated with their fields | **A** `[AM-05]` |
| NFR-09 | Validation messages announced via an `aria-live` region | **A** `[AM-05]` |

**Explicitly not adopted for the prototype:** a formal WCAG 2.1 AA conformance target, an audit, or an accessibility statement. Those remain a deferred production decision — `open-questions.md` **OQ-09**.

### 4.2 Moved to implementation guidance

Not deleted — relocated, because none is traceable to KAN-18, KAN-20 or the PID:

| Retired ID | Was | Now | Reason |
|---|---|---|---|
| ~~NFR-02~~ | *Browser autofill support* | `implementation-guidance.md` **D-01** | Originates in the historical KAN-20 Concepts draft; elevated to REQ-39 by the now-retired KAN-19 |
| ~~NFR-03~~ | *No third-party form host* | **Reissued as NFR-07** | Retained — traceable to `[PID §5]` |
| ~~NFR-04~~ | *Brand styling isolated as tokens* | `implementation-guidance.md` **D-02** | Code-organisation convention invented by the first refactor. *Styling to LMN brand is authoritative (NFR-08); tokenising it is not.* |
| ~~NFR-05~~ | *Copy held as data* | `implementation-guidance.md` **D-03** | Code-organisation convention invented by the first refactor. *The strings are authoritative; where they live in the code is not.* |
| ~~NFR-06~~ | *Performance not a constraint* | `implementation-guidance.md` **D-04** | Harvested from the retired Architecture Review |

---

## 5. Pre-Go-Live / Production Implementation

**None of this is needed to build the prototype, and none of it may block the prototype.**

Each item is categorised. **A** items are inherited product requirements. **C** items are open product decisions. **E** items are engineering proposals with no authoritative source — their full rationale is in `implementation-guidance.md` §3.

### 5.1 Data architecture — PROPOSED, not inherited

**No signed document specifies a data architecture.** PID §5 requires a tracking spreadsheet; KAN-20 §9.1 lists entry storage as a should-have "backup record"; KAN-18 is silent.

The system-of-record model previously stated here — application datastore authoritative, spreadsheet as a downstream reporting layer with synced read-only columns separated from human-owned workflow columns — is a **proposed architecture (E)**, harvested from the retired `[KAN-19-AR §9]`. It has been moved in full, with its counter-argument, to `implementation-guidance.md` §2, and is tracked as **OQ-18**.

What *is* authoritative here: the spreadsheet column list itself, including `Status`, `Reviewer Notes` and `Recommended Next Action`. `[PID §5]`

The datastore choice remains undecided — see `open-questions.md` **OQ-D2**.

### 5.2 Production requirement list

| # | Requirement | Category | Notes |
|---|---|---|---|
| PROD-01 | Hosting and domain routing | **C** | How the application is served, and how `/submit` reaches it from lmnuk.com. Note KAN-20 fixes the routes `/submit` and `/submit/thank-you`. **OQ-D1** |
| PROD-02 | Production datastore | **C / E** | No signed document requires one. See `implementation-guidance.md` §2, **OQ-D2**, **OQ-18** |
| PROD-03 | Transactional email provider | **C** | Delivery mechanism for CAP-07 (must, `[PID §5]`) and CAP-11 (should). The *emails* are authoritative; the provider choice is open. **OQ-D4** |
| PROD-04 | SPF / DKIM on the sending domain | **E** | Engineering proposal — `implementation-guidance.md` **E-02** |
| PROD-05 | Spreadsheet integration and schema | **A** (integration) / **C** (schema) | Writing to a tracking spreadsheet is `[PID §5]`. The schema was never written — **OQ-12** |
| PROD-06 | Production spam protection | **A** (honeypot) / **E** (rate limiting) | Honeypot-only is approved `[KAN-20 §9.1, §9.3]`. Rate limiting is a proposal — **E-04**, **OQ-05** |
| PROD-07 | Data retention policy | **C** | UK GDPR obligation, never specified. **OQ-10** |
| PROD-08 | Server-side validation | **E** | The validation *rules* are authoritative `[KAN-20 §7]`; running them server-side is a proposal — **E-01** |
| PROD-09 | Bulk export in an open format | **E** | Carried from `[KAN-19 R10]`. Not requested by any signed document — **E-03** |
| PROD-10 | Deployment | **E** | Implied by "a live submission page exists on lmnuk.com" `[PID §7]`; the approach is unspecified |
| PROD-11 | Monitoring and security | **E** | Not mentioned in any signed document |
| PROD-12 | End-to-end test submission with dummy data before go-live | **A** | `[PID §5, §7]` — a stated success criterion |
| PROD-13 | LMN brand values supplied and applied | **A** (styled to brand) / **C** (values) | `[KAN-20 §9.2]`. Values pending — **OQ-13** |
| PROD-14 | Accessibility acceptance criterion | **C** | Genuine gap in the signed documents. **OQ-09** |
| PROD-15 | Auto-reply email copy | **C** | The email is `[PID §5]`; its copy was never written — **OQ-11** |
| PROD-16 | Google Drive asset organisation | **B** | Contested scope. **OQ-03** |

### 5.3 Not built at go-live either

Internal review dashboard and submission analytics are recorded in the PID as **V2 future enhancements** `[PID §11]` — note they do not appear on the signed KAN-18 or PID §6 out-of-scope lists. Everything on those signed lists (`PRD.md` §7) is likewise not built.

---

## 6. Portability principles — moved

The documentation-integrity principles previously stated here (*"never let a business rule live only in the code"*) were harvested from the retired `[KAN-19-AR §8.3]`. They are a sound working practice but are **not** product requirements, and they have moved in full to `implementation-guidance.md` §5.

That principle — *"if the code and the product documentation diverge, the documentation is right and the code is wrong"* — is stated for implementers in `PRD.md` §12 as a working practice for this project, not as a requirement inherited from a signed document.

---

## 7. Requirements register

Harvested from the KAN-19 requirements traceability matrix (44 items) and restated implementation-agnostically. The original "Fully Supported / Config Only / Custom Dev" columns are dropped — they only had meaning relative to a specific commercial plugin.

**KAN-19 is retired as a decision document.** This register is retained because its *requirement text* traces back to KAN-18, KAN-20 and the PID — not because KAN-19 confers authority. Where an entry's only source is KAN-19 or the historical Concepts draft, it is tagged **D** and is not an authoritative product requirement.

**Scope key:** `P` = prototype · `PROD` = production · `—` = informational
**Category key:** `A` authoritative · `B` conflict · `C` deferred decision · `D` guidance · `E` proposed architecture

| ID | Requirement | Source | Cat | Scope |
|---|---|---|---|---|
| REQ-01 | Submission Type selector (radio, Mix / Demo-Track), must appear first, drives all conditional logic | KAN-18 v1.1 | A | P |
| REQ-02 | Artist Name — text, required both types, max 50 characters | KAN-18 v1.2 | A | P |
| REQ-03 | Email Address — required both, valid email format enforced | KAN-18 v1.1 | A | P |
| REQ-04 | Country — max 50 chars; Required (Mix) / Optional (Demo) — required status toggles with type | KAN-18 v1.1 | A | P |
| REQ-05 | City — same conditional required behaviour as Country | KAN-18 v1.1 | A | P |
| REQ-06 | SoundCloud Link — URL, same conditional required behaviour | KAN-18 v1.1 | A | P |
| REQ-07 | Instagram / Social link — URL, optional both types | KAN-18 v1.1 | A | P |
| REQ-08 | Genre(s) — free text, optional both, **max 20 characters**; error string corrected to match | KAN-18 v1.1; AM-03 | A | P |
| REQ-09 | Short Artist Bio — textarea, optional both, max 500 chars, placed last in Step 1 | KAN-18 v1.1 | A | P |
| REQ-10 | Mix Link — URL, required (Mix only), accepted-platform helper text | KAN-18 v1.1 | A | P |
| REQ-11 | Tracklist — textarea, required (Mix only), no character limit | KAN-18 v1.1 | A | P |
| REQ-12 | Mix Notes — textarea, optional, max 500 chars, Mix only | KAN-18 v1.1 | A | P |
| REQ-13 | Image links — Mix only. `Image Link 1` **Required**; links 2–3 optional. Min 1 / max 3 | KAN-18 v1.1; AM-01 | A | P |
| REQ-14 | Video links — Mix only. `Video Link 1` **Required**; links 2–3 optional. Min 1 / max 3 | KAN-18 v1.1; AM-01 | A | P |
| REQ-15 | Track / Demo Links — textarea (multi-line, not a single URL field), required (Demo only) | KAN-18 v1.1 | A | P |
| REQ-16 | Release Status — fixed 3-value dropdown, optional, Demo only | KAN-18 v1.1 | A | P |
| REQ-17 | Demo Notes — textarea, optional, max 500 chars, Demo only | KAN-18 v1.1 | A | P |
| REQ-18 | Permission to Contact — checkbox, required both, exact wording, no paraphrase | KAN-18 v1.1 | A | P |
| REQ-19 | Permission to Use Assets — checkbox, required both, exact wording | KAN-18 v1.1 | A | P |
| REQ-20 | No file uploads in V1 — links only throughout | KAN-18 / KAN-20 §9.3 | A | P |
| REQ-21 | Multi-step form, exactly two steps | KAN-20 §1.1 | A | P |
| REQ-22 | Progress indicator with named step labels, not just numbers | KAN-20 §3.2 | A | P |
| REQ-23 | Conditional logic: Step 2 shows Mix OR Demo fields exclusively; selection persists across steps | KAN-20 §2.1 | A | P |
| REQ-24 | Back button on Step 2 only, preserves entered values; browser back preserves values | KAN-20 §2.2 | A | P |
| REQ-25 | Redirect to `/submit/thank-you` on successful submission | KAN-20 §8 | A | P |
| REQ-26 | Inline validation on blur; green tick on pass; specific red-border error on fail | KAN-20 §7.1–7.3 | A | P |
| REQ-27 | Live character counters (amber 80%, red 100%) for Artist Name, Genre, Bio, Mix/Demo Notes | KAN-20 §7.2 | A | P |
| REQ-28 | URL fields validated for http/https format on blur | KAN-20 §7.2 | A | P |
| REQ-29 | Consent checkboxes validated on submit only, specific messages, both required | KAN-20 §7.2 | A | P |
| REQ-30 | Submission type required, validated on Next click | KAN-20 §7.2 | A | P |
| REQ-31 | Track/Demo Links textarea — each non-empty line validated as a URL | KAN-20 §7.2 | A | P |
| REQ-32 | Fixed button copy: `Next: Your Submission →`, `← Back`, `Send My Mix →`, `Submit My Demo →`. *(The assets accordion label `+ Add image / video links` was part of this requirement and is now void — AM-02.)* | KAN-20 §6; AM-02 | A | P |
| REQ-33 | Email notification to LMN admin on every new submission | KAN-20 §9.1; PID §5 | A | PROD |
| REQ-34 | Honeypot spam protection; explicitly no CAPTCHA | KAN-20 §9.1, §9.3 | A | PROD |
| REQ-35 | Submission data capturable into a central tracking spreadsheet | PID §5 | A | PROD |
| REQ-36 | Auto-reply confirmation email sent to the submitting artist | PID §5 | A | PROD |
| REQ-37 | Submission entries stored server-side as a record of every submission — **should-have**, priority as stated in source | KAN-20 §9.1 | A | PROD |
| REQ-38 | Mobile-first layout: single column, 48px touch targets, 16px min font, tested 375/414/768px | KAN-20 §4, §9.2 | A | P |
| REQ-39 | Correct HTML autocomplete/name attributes on standard fields for mobile autofill | KAN-20 Concepts §1.4 (via retired KAN-19) | **D** | P — *guidance, not scope. See `implementation-guidance.md` §6* |
| REQ-40 | Form styled to LMN brand, including progress bar and buttons (was: restylable via Oxygen CSS overriding plugin defaults) | KAN-20 §9.2 | A / C | P (placeholder) / PROD (real tokens) |
| REQ-41 | ~~Form must embed cleanly into an Oxygen Builder page~~ | KAN-20 §9.2 | — | **Retired** — platform-specific, no product requirement underneath beyond REQ-40 and NFR-07 |
| REQ-42 | Thank-you page: separate static page, no form, noindex/nofollow (*"recommended"* in source — see OQ-15), unlinked from nav | KAN-20 §8.2 | A / C | P |
| REQ-43 | Out-of-scope confirmations — see `PRD.md` §7 for the full lists with per-source provenance: KAN-18's 8 items (no login · no auto accept/reject · no auto posting · **no auto publishing of mixes** · no payments · no public archive · no complex CRM · no unreviewed AI replies), PID-only (no full website rebuild), KAN-20 §9.3 additions (no uploads · no CAPTCHA) | KAN-18; PID §6; KAN-20 §9.3 | — | — |
| REQ-44 | End-to-end test submission with dummy data completed before go-live | PID §5, §7 | A | PROD |

**Register integrity:** 44 requirements in, 44 out. One retired with its rationale stated (REQ-41). One reclassified from requirement to guidance (REQ-39 — its only source is a historical draft elevated by a now-retired document). Three carry conflict flags (REQ-08, REQ-13, REQ-14). REQ-37 carries the should-have priority its source assigned — an earlier version of this document raised it to must-have; that change has been reverted and moved to `implementation-guidance.md` §2. **No requirement was silently dropped, added or re-prioritised.**

---

## 8. Retired risks

Recorded so nobody reintroduces mitigations for problems that no longer exist. All were contingent on a commercial form plugin.

| ID | Risk | Why retired |
|---|---|---|
| R1 | Conditional required-status toggle may not be natively supported | No plugin constraint exists. **The R1 fallback of making Country/City/SoundCloud required for both types must not be applied.** |
| R2 | Vendor has a shorter public track record | No vendor |
| R3 | Page builder has a smaller plugin ecosystem | No page builder |
| R5 | Vendor pricing and feature-gating change frequently | No licence |
| R6 | Desk-based evaluation with no hands-on prototype | Superseded — a prototype is now the immediate deliverable |
| R7 | A competitor plugin's honeypot behaviour was sourced indirectly | No plugin |
| R8 | Vendor lock-in / exit cost | No vendor to be locked into |
| R9 | Plugin abandonment / vendor risk | No plugin |
| R13 | No migration plan exists for the custom rebuild | The rebuild is the current work |
| R14 | Technical debt from plugin-specific workarounds | No plugin workarounds will be created |
| R15 | "The custom rebuild never happens" | It is happening |

**Retained as live, with their current category:** **R4** (integration sync can silently fail — mitigated by proposal **E-05**), **R10** (data should be bulk-exportable — proposal **E-03** / PROD-09, **not** a signed requirement), **R11** (accessibility never specified — deferred product decision **OQ-09**), **R12** (performance — de-risked, recorded as guidance **D-04**).
