# Implementation Guidance & Proposed Engineering Principles

> ## ⚠️ THIS DOCUMENT IS NOT PRODUCT AUTHORITY
>
> **Nothing in this file is a signed-off product requirement.** No item here is traceable to KAN-18, the approved KAN-20, or the PID. Everything is either engineering judgement, a proposal awaiting Mike's decision, or advice harvested from documents that have been retired (KAN-19, the KAN-19 Architecture Review, the historical KAN-20 Concepts draft).
>
> **If anything here conflicts with `field-specification.md`, `ux-specification.md`, `workflows.md` or the authoritative parts of `PRD.md` / `submission-system.md`, the product specification wins.**
>
> Treat this document as: *"here is what a competent engineer would probably do, and why."* Not: *"here is what LMN agreed to build."*

**Version:** 1.0 · 13 August 2026
**Created by:** the corrective governance refactor of 13 Aug 2026, to separate engineering proposals from signed product scope.

---

## 0. Category key

Used throughout this documentation set. Defined canonically in `README.md` §3.1 and repeated here for convenience.

| Category | Meaning |
|---|---|
| **A — Authoritative product requirement** | Traceable to KAN-18, the approved KAN-20, or the PID where not superseded |
| **B — Unresolved conflict** | Two authoritative sources disagree. Logged in `open-questions.md`. Never resolved unilaterally. |
| **C — Deferred product decision** | A real product decision remains open. Mike's call. |
| **D — Implementation guidance** | Useful engineering or UX advice. Not signed-off product scope. **Rationale lives here.** |
| **E — Proposed architecture** | A decision needed before production, not inherited from the signed specification. **Rationale lives here.** |

**D** and **E** items are *labelled* wherever they touch a product document — so an implementer reading `PRD.md` or `submission-system.md` can see immediately that a line is not signed scope — but their full rationale and counter-arguments live only here.

---

## 1. Why this document exists

The first refactor (13 Aug 2026) correctly rewrote WordPress-specific language into implementation-agnostic requirements. But it also carried forward material from **KAN-19** and the **KAN-19 Architecture Review** — both of which were retired as decisions — and in places presented that material alongside signed requirements without distinguishing it.

Three things went wrong, all corrected on the same day:

1. **A priority was changed.** Persistence was raised from *should-have* to *must-have* and presented in the capability table as though the change were uncontroversial. The reasoning was sound, but the source documents say *should*, and only Mike can change that.
2. **Engineering conventions became NFRs.** "Hold brand values as tokens" and "hold approved copy as data" are good practice. Neither appears in any signed document. They sat in a table headed *Non-functional requirements*.
3. **A retired document's requirement was treated as live.** Browser autofill (REQ-39) originates in the historical KAN-20 Concepts draft. KAN-19 elevated it to a numbered requirement — but KAN-19 is retired, so that elevation carries no authority under the current hierarchy.

None of that material was wrong. It was **mis-filed**. This document is where it belongs.

---

## 2. E — Proposed architecture: system of record

### 2.1 The proposal

**Proposed:** the application's own datastore is the system of record for raw submissions. The tracking spreadsheet is a downstream reporting/operational layer fed from it.

**Status: PROPOSED — requires Mike's decision.** See `open-questions.md` **OQ-D2** and **OQ-18**.

### 2.2 What the signed documents actually say

| Source | Says |
|---|---|
| **PID §5** | Submissions should be logged in a spreadsheet. Says nothing about a database. |
| **KAN-20 §9.1** | *"Entry storage in the WordPress database"* — listed as a **should-have**, described as a *"backup record"* |
| **KAN-18** | Silent — it defines what data is collected, not where it is stored |

**No signed document requires a database, and the only one that mentions storage at all calls it a should-have.**

### 2.3 The argument for raising it

From `[KAN-19-AR §9]`, generalised off WordPress. The reasoning is unchanged and, in my judgement, still correct:

- A spreadsheet is a poor system of record: no audit trail, no cell-level access control, no schema enforcement, and no protection against one edited cell silently breaking downstream automation.
- Under WordPress, storage arrived free as a side effect of the plugin. Under a custom build it does not exist unless someone builds it. A should-have that nobody builds means **no record of a submission exists anywhere except a spreadsheet row that a human can overwrite**.
- If the spreadsheet is not the system of record, a broken sync becomes a delayed-visibility inconvenience rather than a data-loss event. This is the direct mitigation for `[KAN-19 R4]`.

**Counter-argument, stated fairly:** at LMN's volume, a well-managed spreadsheet plus per-submission admin emails may be an entirely adequate record for V1. The admin notification email is itself an immutable copy of every submission. Insisting on a database is arguably exactly the *"unnecessary complexity"* the PID's own MVP philosophy warns against.

**This is a real trade-off and it is Mike's to make.** The product documents now record persistence as **should-have**, matching KAN-20.

### 2.4 If the proposal is accepted

The spreadsheet schema should distinguish two column groups:

- **Synced, read-only columns** written from the system of record — artist name, links, timestamps, all submitted data
- **Workflow, human-owned columns** that live only in the spreadsheet and are never synced back — `Status`, `Reviewer Notes`, `Recommended Next Action`

*(The column list itself is from PID §5 and is authoritative. The read-only/human-owned split is this proposal.)*

---

## 3. E — Proposed architecture: other production decisions

None of these appear in KAN-18, KAN-20 or the PID. All are engineering judgement about what a production web application needs.

| ID | Proposal | Rationale |
|---|---|---|
| **E-01** | **Server-side validation mirroring every client-side rule** in `field-specification.md` §4 | Client-side validation is a UX affordance, not a security control. A public endpoint that trusts the browser accepts anything. *The validation rules themselves are authoritative (KAN-20 §7); running them server-side is the proposal.* |
| **E-02** | **SPF / DKIM on the sending domain** | Without sender authentication, confirmation emails are filtered as spam — which defeats the anti-chase rationale behind the thank-you page copy. *The confirmation email is authoritative (PID §5); its deliverability engineering is the proposal.* |
| **E-03** | **Bulk export in an open format** (CSV/JSON, no proprietary encoding) | Carried from `[KAN-19 R10]`. Cheap insurance against future migration pain. Not requested by any signed document. |
| **E-04** | **Server-side rate limiting / abuse throttling** | Honeypot-only is the **approved** spam decision (KAN-20 §9.1/§9.3) and is not being reopened. But that decision was made when a mature plugin would also have contributed baseline hygiene. Rate limiting is invisible to users and would not change the approved experience. See `open-questions.md` **OQ-05**. |
| **E-05** | **The submit pipeline must not block the redirect** — a failed spreadsheet sync or email send must never cost the user their submission or leave them on a broken page | Derived from the `[KAN-19 R4]` mitigation. Sensible, but not stated in any signed document. |
| **E-06** | **Abstract data model** — model what a "submission" is, and how it relates to an artist and a future review outcome, rather than reverse-engineering it from spreadsheet columns | From `[KAN-19-AR §8.3]`. Good practice; not a product requirement. |

---

## 4. D — Implementation guidance

Advice, not scope. A build that ignores all of this can still satisfy every authoritative product requirement.

| ID | Guidance | Origin | Why it is worth doing |
|---|---|---|---|
| **D-01** | **Browser autofill support** — correct HTML `name` / `autocomplete` attributes on standard fields | `[KAN-20 Concepts §1.4]`, elevated to REQ-39 by the now-retired KAN-19 | Lets users complete standard fields in two taps on mobile. Cheap, and consistent with the approved mobile-first direction — but **not** an approved requirement. See §6 below. |
| **D-02** | **Hold LMN brand values (colours, fonts, logo) as variables/tokens in one place** | This refactor | Brand values are not yet confirmed (**OQ-13**). Tokenising them means swapping placeholders later is a one-file change rather than a hunt. Pure engineering convenience. |
| **D-03** | **Hold approved copy as data rather than hard-coded prose** | This refactor | Labels, helper text, error messages, page copy and consent wording are approved strings that must be reproduced exactly. Centralising them makes them auditable against `field-specification.md` without reading the whole codebase. **The strings are authoritative; where they live in the code is not.** |
| **D-04** | **Performance is not a constraint** at LMN's submission volume | `[KAN-19-AR R12 — de-risked]` | Recorded so nobody optimises for a problem LMN does not have. |
| **D-05** | **Optional-field visual de-emphasis** (lighter label text) beyond the approved `(optional)` suffix | `[KAN-20 Concepts]` — Concept A design note | The `(optional)` suffix and absence of an asterisk are approved (KAN-20 §3.2). Additional visual treatment is styling preference. |
| **D-06** | **Build so the submission type could later be pre-set from a URL parameter**, without building it now | `[KAN-20 §9.4]` — future Concept C | KAN-20 §1.2 is explicit that no Concept C work happens in V1. Recorded only so V1 is not architected in a way that makes the documented upgrade path expensive. **Do not build this.** |

---

## 5. D — Documentation-integrity principles

Harvested from `[KAN-19-AR §8.3]`. The original rule was *"never let a business rule live only inside the form plugin."* The plugin is gone; the principle still seems worth keeping — but it is a working practice, not a product requirement.

**Never let a business rule live only in the code.**

- **Business rules** — which fields are required per submission type, character limits, accepted platforms — live in `field-specification.md`. The code implements them.
- **Validation rules** live in `field-specification.md` §4, independent of implementation.
- **Conditional logic** lives in `workflows.md` §3 as decision tables — inputs to outputs — independent of how it is executed.
- **The spreadsheet schema** should be defined as a logical schema (column names, types, meaning, status enum) that outlives whatever writes to it.
- **Workflow logic** — the review-status lifecycle and what triggers each transition — is LMN's business process, not a system feature.
- **Integration contracts** — "on submit → persist → notify admin → confirm to artist → write to spreadsheet" — are documented in `workflows.md` §4.2 independent of what executes them.

**If the code and the product documentation diverge, the documentation is right and the code is wrong.**

---

## 6. Note on REQ-39 (browser autofill)

REQ-39 remains in the `submission-system.md` §7 register so that register stays complete at 44 items and traceable back to KAN-19's original matrix. **It is tagged category D and is not an authoritative product requirement.**

The chain is: the historical KAN-20 Concepts draft recommended autofill support → KAN-19 elevated it to REQ-39 → KAN-19 has since been retired as a decision document. Under the current authority hierarchy, an elevation performed by a retired document does not survive it.

Autofill is still a good idea. Build it if convenient. Do not treat it as signed-off scope, and do not let it block anything.

---

## 7. Risks retained from KAN-19 — status under this hierarchy

The full retired/retained risk table is in `submission-system.md` §8. Two retained risks are **not** product requirements and belong here:

- **R10 — exportability.** Proposal E-03 above.
- **R11 — accessibility never specified.** This is a genuine gap in the signed documents, so it is tracked as a **deferred product decision (C)** in `open-questions.md` **OQ-09**, not as guidance. Whether to adopt a WCAG 2.1 AA acceptance criterion is Mike's call — but it is worth noting it is inexpensive when built in from the start and expensive to retrofit.
