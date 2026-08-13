# Workflows — LMN Submission System V1

**Authoritative sources:** KAN-20 §2 (user journey), KAN-18 v1.1 (field logic), PID (review lifecycle)
**Status:** Approved. Journey and conditional logic are in prototype scope; the review lifecycle is documented for completeness but is not built in V1.

---

## 1. Full user journey `[KAN-20 §2.1]`

The journey below is the complete end-to-end flow for the approved two-step wizard. Both Mix and Demo/Track paths are covered.

| Step | User action | System response |
|---|---|---|
| 1 | User navigates to `/submit` | Page loads. LMN intro copy and Step 1 form are displayed. Progress bar shows: Step 1 of 2 — About You (active). Step 2 of 2 — Your Submission (inactive). |
| 2 | User reads intro copy | No action required. Copy sets context: who LMN is, what they are looking for, and what happens after submission. |
| 3 | User selects submission type | Radio button pair: `Mix Submission` or `Demo / Track Submission`. Required. ✅ **`Next` remains clickable**; clicking it with no type selected shows `Please select a submission type.` and does not advance. `[AM-04]` Selection persists into Step 2 to drive conditional field display. |
| 4 | User completes Artist Details | Fields: Artist Name, Email, Country, City, SoundCloud Link (required fields vary by type — see §3). Instagram/Social, Genre, Bio are optional. Inline validation fires on blur. |
| 5 | User clicks `Next: Your Submission →` | Form validates all Step 1 required fields. **If valid:** Step 2 loads. **If invalid:** scroll to first error, highlight field in red, show error message. Progress bar advances on success. |
| 6a | **Mix path:** User sees Step 2 — Mix | Mix fields displayed only: Mix Link, Tracklist, Mix Notes, the visible `IMAGES & VIDEO` section, Consent checkboxes. `[AM-02]` |
| 6b | **Demo path:** User sees Step 2 — Demo | Demo fields displayed only: Track / Demo Links, Release Status, Demo Notes, Consent checkboxes. **No assets section.** |
| 7 | User completes submission fields | Inline validation on blur for URL fields. Character limits shown for textarea fields. Mix path: at least one image link and at least one video link are required. `[AM-01]` |
| 8 | User checks both consent boxes | Required. Exact consent wording from KAN-18 must be used. Both boxes must be checked before submit is accepted. |
| 9a | **Mix:** User clicks `Send My Mix →` | Form validates Step 2 required fields and consent checkboxes. If valid: submission sent. Redirect to `/submit/thank-you`. |
| 9b | **Demo:** User clicks `Submit My Demo →` | Form validates Step 2 required fields and consent checkboxes. If valid: submission sent. Redirect to `/submit/thank-you`. |
| 10 | User arrives on thank-you page | Confirmation message displayed. Confirms submission received, sets response expectation, encourages LMN social follow. No further action required from user. |

> **Step 6/7 note:** ✅ amended. Assets are Required (minimum 1 image AND 1 video, maximum 3 each) and render as a visible section, not a collapsed accordion. See `amendments.md` **AM-01** and **AM-02**.

---

## 2. Step transitions and error paths `[KAN-20 §2.2]`

| Behaviour | Requirement |
|---|---|
| **Back button** | Present on **Step 2 only**. Label: `← Back`. Returns the user to Step 1 **with all previously entered values preserved.** |
| **Step 1 validation failure** | User clicks Next without completing required fields. Form does **not** advance. Scroll to first error. Errors shown inline below each invalid field. |
| **Step 2 validation failure** | User clicks Submit without completing required fields or consent. Form does **not** submit. Scroll to first error. Errors shown inline. |
| **Browser back button** | Using the browser's own back control from Step 2 must return the user to Step 1 **with entered values preserved.** |
| **Type change mid-form** | If the user returns to Step 1 and changes the submission type, Step 2 must reload with the correct field set for the newly selected type. |

> **Original KAN-20 wording on browser back, rewritten implementation-agnostically.** KAN-20 §2.2 read: *"Browser back button: Should be handled by the form plugin's step management. Values should be preserved. Note for KAN-22: verify this behaviour in the chosen plugin before going live."* On a custom build this is no longer a vendor-capability gamble — it is a directly implementable and testable requirement, stated above.

> **Type change note:** KAN-20's critique of the rejected Concept A observed that *"if a user changes their type mid-form, fields clear and the experience can feel unstable depending on the plugin used."* In the approved two-step design this is a controllable behaviour. Whether Step 2 values entered under the previous type should be cleared or retained is not specified in any approved document — see `open-questions.md` **OQ-14**. Do not guess; preserve Step 1 values in all cases.

---

## 3. Conditional logic — decision tables

These tables are the implementation-independent statement of the form's conditional behaviour. They replace all references to plugin conditional-logic engines. Source: `[KAN-18 v1.1; KAN-20 §2, §3.2, §5]`

### 3.1 Rule CL-1 — Step 2 field set

**Input:** value of `Submission Type` (selected in Step 1)
**Output:** which field group renders in Step 2

| If Submission Type = | Then Step 2 displays | And Step 2 must not display |
|---|---|---|
| `Mix Submission` | Mix Link, Tracklist, Mix Notes, Image Links 1–3, Video Links 1–3, both Consent checkboxes | Track / Demo Links, Release Status, Demo Notes |
| `Demo / Track Submission` | Track / Demo Links, Release Status, Demo Notes, both Consent checkboxes | Mix Link, Tracklist, Mix Notes, all Image Links, all Video Links |

**The two sets are mutually exclusive. No irrelevant field is ever shown.**

### 3.2 Rule CL-2 — Conditional required status

**Input:** value of `Submission Type`
**Output:** required status and label suffix for three Step 1 fields

| Field | If type = `Mix Submission` | If type = `Demo / Track Submission` |
|---|---|---|
| Country | **Required** — label shows `*` | Optional — label shows `(optional)` |
| City | **Required** — label shows `*` | Optional — label shows `(optional)` |
| SoundCloud Link | **Required** — label shows `*` | Optional — label shows `(optional)` |

**These three fields remain visible in both cases.** Only the required status and the label change. They are never hidden. `[KAN-20 §3.2]`

⚠️ The KAN-19 Risk R1 fallback — "mark these three fields Required for both submission types if the conditional behaviour proves difficult" — **is void and must not be applied.** It existed solely because no evaluated form plugin confirmed native support for a conditional required toggle. On a custom build there is no such constraint. See `open-questions.md` **OQ-08**.

### 3.3 Rule CL-3 — Submit button label

**Input:** value of `Submission Type`
**Output:** Step 2 primary CTA label

| If Submission Type = | Submit button label |
|---|---|
| `Mix Submission` | `Send My Mix →` |
| `Demo / Track Submission` | `Submit My Demo →` |

### 3.4 Rule CL-4 — Step 2 progress segment label

| If Submission Type = | Step 2 segment label |
|---|---|
| `Mix Submission` | `Your Mix` |
| `Demo / Track Submission` | `Your Demo` |

Section heading follows the same rule: `YOUR MIX` / `YOUR DEMO / TRACKS`.

### 3.5 Rule CL-5 — Assets section visibility `[AM-01, AM-02]`

| Condition | Behaviour |
|---|---|
| Submission Type = `Mix Submission` | The `IMAGES & VIDEO` section renders in Step 2, **visible and expanded**. `Image Link 1` and `Video Link 1` are required; links 2 and 3 are optional. |
| Submission Type = `Demo / Track Submission` | **The assets section does not render at all.** Do not add image or video fields to the Demo path. |

---

## 4. Submit flow

### 4.1 Prototype scope

On a valid submit:

1. Validate all Step 2 required fields and both consent checkboxes.
2. If any validation fails: do not submit, scroll to first error, display inline error message. Stop.
3. If valid: redirect the user to `/submit/thank-you`.

**The prototype does not need to persist or transmit the submission.** Capturing the assembled submission payload locally (console, in-memory, or a local file) is sufficient to demonstrate the flow end to end.

### 4.2 Full production flow — Pre-Go-Live

Documented for completeness. **Not required for the localhost prototype.** See `submission-system.md` §5 for the full production requirement set.

1. *(Category **E** — proposed, not inherited)* Validate all fields server-side. Client-side validation is a UX affordance, not a security control. The validation **rules** are authoritative `[KAN-20 §7]`; running them server-side is proposal **E-01**.
2. Apply spam protection check (honeypot).
3. **Store the submission entry server-side.** `[KAN-20 §9.1 — should-have]` ⚠️ The stronger position — that this datastore is the authoritative *system of record* and the spreadsheet a downstream reporting layer — is a **proposed architecture (E)**, not an inherited requirement. See `implementation-guidance.md` §2 and **OQ-18**.
4. Send admin notification email to LMN for every new submission. `[KAN-20 §9.1 — must-have]`
5. Send auto-reply confirmation email to the submitting artist. `[PID §5; KAN-20 §9.1 — should-have]`
6. Write submission data to the submission tracking spreadsheet. `[PID §5; KAN-20 §9.1 — should-have]`
7. Redirect the user to `/submit/thank-you`.

**Ordering principle** *(category E — proposed, not inherited)*: the redirect to the thank-you page should not depend on steps 4–6 succeeding. A failed spreadsheet sync or email send should never cost the user their submission or leave them on a broken page. Derived from the `[KAN-19 R4]` mitigation; no signed document states it. See `implementation-guidance.md` **E-05**.

---

## 5. Thank-you flow

1. User is redirected to `/submit/thank-you` on successful submission.
2. Static page renders with the confirmation copy as drafted (see OQ-15 — recommended, not signed off) (see `ux-specification.md` §8.1).
3. Page sets response expectation (4 weeks), explicitly asks the user not to send a follow-up email, and offers social follow CTAs.
4. No further action required from the user. No form, no newsletter opt-in.
5. Page is `noindex, nofollow` and is not linked from site navigation — reachable only by redirect.

---

## 6. Review lifecycle — not built in V1

The submission review workflow is LMN's business process. It is documented here because it is a business rule that must outlive any implementation, **but no part of it is built in V1.** `[KAN-19-AR §8.3; PID §5]`

### 6.1 Review status values

The status enum is fixed. `[KAN-18 v1.1 Related Tickets; superseded field spec draft]`

| Status | Meaning |
|---|---|
| `New` | Submission received, not yet reviewed |
| `Reviewing` | Under active review by LMN |
| `Accepted` | Approved by LMN |
| `Scheduled` | **`TBD — DECISION REQUIRED`** — see OQ-07 |
| `Rejected` | Not proceeding |
| `Archived` | Closed and filed |

⚠️ **OQ-07:** KAN-18 explicitly states *"the meaning of 'Scheduled' must be defined in KAN-24 before implementation."* KAN-24 was never written. The meaning of `Scheduled` — and what triggers the transition into it — remains undefined. Do not infer it.

### 6.2 Documented lifecycle

From the original workflow definition, retained as business process:

1. Artist visits the LMN submission page.
2. Artist selects either **Mix Submission** or **Demo / Track Submission**.
3. The form displays the relevant fields based on that selection.
4. The artist completes the required information and submits the form.
5. Submission data is validated.
6. Submission data is written to the submission tracking spreadsheet.
7. A confirmation email is sent to the artist.
8. The submission enters the LMN review workflow.
9. Review status is updated throughout the lifecycle.

Steps 1–5 are in prototype scope. Steps 6–9 are production scope.

### 6.3 Human-owned workflow data

**Authoritative `[PID §5]`:** the tracking spreadsheet includes `Status`, `Reviewer Notes` and `Recommended Next Action` columns. These are filled in by LMN during review, not by the submitting artist.

**Proposed (E), not inherited:** that these columns are formally *human-owned* and **never written back** by the system, and that the schema should explicitly separate synced read-only columns from human-owned ones. This comes from the retired `[KAN-19-AR §9]` — see `implementation-guidance.md` §2.4 and **OQ-18**.

The schema itself was never written; see `open-questions.md` **OQ-12**.

### 6.4 Claude / Cowork review assistance

The PID's success criteria include: *"Claude/Cowork can review the spreadsheet and produce summaries, bios, notes or draft replies."* `[PID §7]`

This is a **manual, human-initiated** capability operating on the spreadsheet after the fact. It is not an automated pipeline and is not built into the application. Note the hard V1 constraint from KAN-18: **no AI-generated responses sent automatically without human review.**

---

## 7. Google Drive asset organisation — ⚠️ scope conflict

The PID includes organising submitted assets into a structured Google Drive folder as MVP scope and as a deliverable. Two later documents contradict this. **Not resolved.** See `open-questions.md` **OQ-03**.

Since V1 is links-only with no file uploads, there are no files to organise — only URLs. **Not in prototype scope under any reading.**
