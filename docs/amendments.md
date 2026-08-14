# Amendment Record — LMN Submission System V1

**Purpose:** a formal, auditable record of decisions that **change or supersede previously signed or approved content**. Amendments are recorded here rather than silently overwritten in the specification documents.

**Convention:** this mirrors how KAN-18 v1.2 handled the Artist Name change — a separate amendment document superseding the signed baseline on named points only, leaving the baseline on file.

**Authority:** every amendment below was decided by **Mike Day on 13 August 2026**. Each is category **A** from the moment it is recorded — an amendment made by the product owner carries the same authority as the document it amends.

---

## How to read an amendment

| Field | Meaning |
|---|---|
| **Supersedes** | The specific approved content that no longer applies. It is not deleted from the source documents on file. |
| **Now reads** | The current authoritative position. |
| **Closes** | Open questions this amendment resolves. |
| **Applied to** | The `/docs` files updated to reflect it. |

Amendments are **not** open questions. Do not reopen them; do not treat them as provisional.

---

## AM-01 — Mix asset links are Required, minimum 1 / maximum 3 per group

**Closes:** OQ-02, OQ-02b
**Date:** 13 August 2026 · **Decided by:** Mike Day

**Supersedes:**

1. The note inside the KAN-18 v1.1 Assets table cells: *"V1 scope decision: downgraded from required to optional to reduce form abandonment. Review for V2."*
2. KAN-20 §5.2's **Optional** status for all six asset link fields, and the Optional status in the historical KAN-20 Concepts quick-reference table.

**Now reads:**

- **Image links are Required** for Mix submissions — **minimum 1, maximum 3**.
- **Video links are Required** for Mix submissions — **minimum 1, maximum 3**.
- The KAN-18 v1.1 field-table **Required (Mix)** column stands. The contradictory in-cell note does not.

**Interpretation — stated explicitly, as instructed:**

> The two minimums are **independent**. A Mix submission requires **at least one image link AND at least one video link** — a minimum of **two URLs in total**.
>
> Three images and no videos does **not** satisfy the requirement. One image and one video does.

This is the reading of Mike's instruction of 13 Aug 2026, which stated two separate requirements each carrying its own minimum: *"Mix Image Links are REQUIRED: minimum 1 valid image URL, maximum 3"* and *"Mix Video Links are REQUIRED: minimum 1 valid video URL, maximum 3"*. The alternative reading — one asset overall across both groups — is **explicitly rejected**.

**Implementation semantics:**

- `Image Link 1` and `Video Link 1` are **required** inputs.
- `Image Link 2`, `Image Link 3`, `Video Link 2`, `Video Link 3` are **optional** inputs.
- The maximum of 3 is enforced structurally — only three inputs exist per group. No count validation is needed.
- **No new error copy is introduced.** The required-field failure uses the existing approved string `This field is required.` and the format failure uses the existing approved string `Please enter a valid URL starting with http:// or https://` — both from KAN-20 §7.2.

**Known consequence, recorded for the file:** this raises the minimum effort to complete a Mix submission by two URLs. KAN-18's superseded note attributed the original downgrade to form-abandonment risk. That trade-off has been made knowingly by the product owner and is not reopened here.

**Applied to:** `field-specification.md` §1.5, §4.3 · `ux-specification.md` §5.3, §5.4 · `workflows.md` §1, §3.5 · `submission-system.md` §7 (REQ-13, REQ-14) · `open-questions.md`

---

## AM-02 — Mix assets are a visible required section, not a collapsed accordion

**Closes:** the UX half of OQ-02
**Date:** 13 August 2026 · **Decided by:** Mike Day

**Supersedes:** KAN-20 §3.3, §4.2 and §6 — the assets accordion pattern.

**Now reads:**

- The asset fields render as a **visible section**, expanded, with no collapse control.
- The section is **not labelled optional**.
- **Section heading: `IMAGES & VIDEO`** — new approved copy, matching the ALL-CAPS pattern of `ABOUT YOU` / `YOUR MIX` / `YOUR DEMO / TRACKS`.
- The approved button label **`+ Add image / video links` is void** and must not be used. There is no accordion for it to label.

**Retained from KAN-20 unchanged:** helper text `Accepted: Valid URLs. Links preferred over uploads.`; all six links stack vertically on mobile.

**Rationale, recorded once:** a required field behind a collapse control labelled "optional" cannot be completed until the user discovers it, and would fail validation with the error out of view. AM-01 makes the fields required, so the accordion pattern becomes unworkable rather than merely inconsistent.

**Applied to:** `ux-specification.md` §5.4, §7 · `workflows.md` §3.5

---

## AM-03 — Genre validation error corrected to 20 characters

**Closes:** OQ-01
**Date:** 13 August 2026 · **Decided by:** Mike Day

**Supersedes:** KAN-20 §7.2's approved error string `Genre must be 50 characters or fewer.`

**Now reads:** `Genre must be 20 characters or fewer.`

**Unchanged:** the Genre character limit remains **20** `[KAN-18 v1.1]`. KAN-20 §5.1 #8 and §9.1 already stated 20; only the error string disagreed.

**Note:** this is the **first amendment to an approved user-facing string** in this project. It is recorded here rather than corrected in place so that the change is visible and attributable. The exact-string rule in `CLAUDE.md` §6 now applies to the new wording.

**Applied to:** `field-specification.md` §4.2 · `open-questions.md`

---

## AM-04 — The Next button remains clickable when no submission type is selected

**Closes:** OQ-16
**Date:** 13 August 2026 · **Decided by:** Mike Day

**Supersedes:** KAN-20 §2.1 step 3 — *"must be selected before Next is enabled"*.

**Now reads:** `Next: Your Submission →` is **always clickable**. Clicking it with no submission type selected shows the approved error `Please select a submission type.` below the radio group and does not advance.

**Resolves the internal tension** in the approved document, where §2.1 implied a disabled button while §7.2 specified an error message that a disabled button could never trigger. §7.2's behaviour wins.

**Applied to:** `ux-specification.md` §4.3 · `workflows.md` §1 step 3 · `open-questions.md`

---

## AM-05 — Accessibility baseline adopted for the prototype

**Closes:** OQ-09 at prototype level. The broader production programme remains deferred.
**Date:** 13 August 2026 · **Decided by:** Mike Day

**Supersedes:** nothing. This fills a gap — no accessibility requirement existed in the PID, KAN-18 or KAN-20.

**Now reads — required from the first slice, not retrofitted:**

- Semantic HTML elements throughout
- Every input has an associated `<label>`
- All controls keyboard-operable
- Focus moves to the first invalid field when validation fails
- Focus moves to the Step 2 heading after a successful step transition
- Errors programmatically associated with their fields
- Validation messages announced via an `aria-live` region

**Explicitly not adopted:** a formal WCAG 2.1 AA conformance target, an audit, or an accessibility statement. Those remain a deferred production decision.

**Applied to:** `submission-system.md` §4.1 → NFR-09 · `PRD.md` §9.1 → PT-19 · `open-questions.md`

---

## AM-06 — Step 2 values are preserved across a mid-form submission-type change

**Closes:** OQ-14
**Date:** 14 August 2026 · **Decided by:** Mike Day

**Supersedes:** nothing signed. OQ-14 noted "discarding" the abandoned path's Step 2 values as *a* safe implementation default, not an approved one, and left the actual behaviour open.

**Now reads:** if a user returns to Step 1 from Step 2 and changes the submission type, previously entered Step 2 values for **both** the Mix and Demo/Track paths are retained (not cleared), independent of which path is currently displayed. Switching back to a path restores whatever was previously entered for it.

**Rationale:** the reversible, lower-risk default — no approved document required discarding, and retaining data never surprises a user with silent data loss.

**Applied to:** `open-questions.md` (OQ-14 struck)

---

## AM-07 — Submission-type cards are side-by-side on desktop; "vertically stacked" wording superseded

**Closes:** the desktop-layout ambiguity in `ux-specification.md` §4.3
**Date:** 14 August 2026 · **Decided by:** Mike Day

**Supersedes:** `ux-specification.md` §4.3's instruction that the submission-type radio buttons are *"vertically stacked."*

**Now reads:** the Mix/Demo selector renders as two cards side by side on desktop (≥481px), stacking to a single column on mobile — matching the built and shipped layout. The "vertically stacked" wording described the mobile presentation; it did not anticipate the desktop two-column treatment introduced during the mobile-first pass and is superseded on desktop only. Mobile remains a single-column stack, consistent with the original wording.

**Applied to:** `ux-specification.md` §4.3

---

## Amendments still open

None. All amendments recorded above are decided and applied.

Unresolved items remain in `open-questions.md` and are **not** amendments — they are questions nobody has answered yet.
