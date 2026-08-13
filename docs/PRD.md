# Product Requirements Document — LMN Submission System V1

**Source:** Project Initiation Document (PID), as superseded on detail by KAN-18 v1.1/v1.2 and KAN-20 v1.0
**Status:** Implementation-agnostic. Product intent unchanged from the PID; implementation language rewritten.
**Current build target:** localhost prototype

---

## 1. Product purpose

LMN currently receives artist submissions through informal channels such as email and SoundCloud messages. This creates a messy intake process where mixes, demos/tracks, images, videos, bios, notes and contact details become scattered across different platforms. `[PID §1]`

The goal is a **structured submission system on the LMN website** that allows artists to submit either a mix or demos/tracks through a clear form, with submitted information captured consistently and prepared for review by LMN.

This project also serves as a practical AI-workflow portfolio project, demonstrating the ability to design and implement an operational system end to end — from signed specification through to a working, deployed product.

---

## 2. Problem statement `[PID §3]`

Current submission routes are inconsistent and difficult to manage. Artists may submit via email, SoundCloud messages, Instagram messages, informal DMs, or file transfer links.

This creates the following issues:

- Details are incomplete
- Links get lost
- Files are not organised
- Follow-up is manual
- It is hard to track status
- There is no standard review process
- LMN cannot easily scale submissions

---

## 3. Users

| User | Goal | Needs from the system |
|---|---|---|
| **Submitting artist** | Get their mix or demo in front of LMN, and know it was received | A short, clear, mobile-friendly form that only asks relevant questions; confidence that a human will listen; a clear expectation of when they will hear back |
| **LMN admin (Mike / LMN team)** | Review submissions efficiently without chasing missing information | Complete, consistently structured submissions; all required details captured up front; a single place to review; reduced manual admin |

---

## 4. Product objective `[PID §2]`

Build and launch a controlled LMN submission page where artists can submit mixes or tracks, with all required information captured consistently and organised for review.

The system should:

- Give artists a simple place to submit through the LMN website
- Separate submission types: **Mix Submission** or **Demo / Track Submission**
- Capture all required details in a structured format
- Store submission data in a spreadsheet
- Organise submitted links clearly *(PID reads "Organise uploaded assets or links clearly"; "assets" is dropped here because V1 is links-only with no uploads — see **OQ-03**, **OQ-04**)*
- Reduce manual admin for LMN
- Create a process Claude/Cowork can help review, summarise and manage

---

## 5. Solution overview

A submission page on lmnuk.com presenting a **two-step form**. `[KAN-20 §1.1]`

The artist first chooses what they are submitting:

1. **Mix Submission**
2. **Demo / Track Submission**

The form then shows only the fields relevant to that choice. Mix submissions require more supporting assets because they may be used for LMN content, promotion and scheduling. Demo/track submissions are simpler, focused mainly on artist details and music links. `[PID §4]`

Submissions feed into a central tracking spreadsheet.

> **Original PID wording, rewritten:** *"Create a submission page on lmnuk.com using WordPress/Oxygen and a form plugin."* → **"Create a submission page on lmnuk.com."** The platform choice has changed to a custom-coded web application; the product requirement is unchanged.

---

## 6. MVP scope `[PID §5]`

### 6.1 Website

- A **Submit** page on lmnuk.com at `/submit`
- Page styled consistently with current LMN branding
- Short intro explaining what artists can submit
- **The submission form is presented on the page itself** — the artist is never sent to a third-party form host

### 6.2 Form logic

The form includes a submission type selector:

- `Mix Submission`
- `Demo / Track Submission`

The form then shows relevant fields depending on the selected submission type. The full field set, required/optional status per type, and conditional rules are in `field-specification.md` and `workflows.md` §3.

⚠️ **The PID's own MVP field list differs from the signed KAN-18 field set.** Two PID fields — *Mix title* and *Other social/music links* — do not appear in KAN-18 v1.1 and are therefore not built. KAN-18 governs. See `open-questions.md` **OQ-17**.

### 6.3 Data capture

Each submission should be logged in a spreadsheet with: `[PID §5]`

Submission date · Submission type · Artist name · Email · Social links · Music link *(PID: "Music link/file" — no files in V1)* · Asset links · Bio · Tracklist · Notes · **Status** · **Reviewer notes** · **Recommended next action**

The final three are human-owned workflow columns, not submitted data. See `workflows.md` §6.3.

> The exact spreadsheet schema was never written (KAN-24 does not exist). See `open-questions.md` **OQ-12**.

### 6.4 Auto-reply

After submission, the artist should receive a confirmation email. The PID's draft wording: `[PID §5]`

> *"Thanks for submitting to LMN. We've received your submission and aim to review it within the next week. If it's a good fit, we'll be in touch."*

⚠️ **This draft conflicts with the drafted thank-you page copy.** That copy states a **4 week** response time, not one week. Final email copy was never written. See `open-questions.md` **OQ-11**.

### 6.5 Security and safeguards

The system must prevent abuse of uploads and storage. `[PID §5]`

The PID's original requirements were:

- Set file size limits
- Restrict accepted file types
- Avoid unlimited uploads
- Prefer links for large audio/video files where possible
- Prevent users from uploading huge files directly into cloud storage
- Include spam protection
- Test using dummy submissions before going live

**Current position:** KAN-18 and KAN-20 established a **links-only** approach with **no file uploads in V1**, which removes the upload-abuse vector entirely and makes the first five items moot. Spam protection is **honeypot only, no CAPTCHA** per KAN-20 §9.3. End-to-end test submission before go-live stands.

See `open-questions.md` **OQ-04** and **OQ-05** — both are confirm-only, not open product questions.

---

## 7. Out of scope — V1

**Do not design or build any of these, even partially.** Provenance is shown per group — do not merge these lists.

### 7.1 KAN-18 v1.1 out-of-scope list — signed `[Category A]`

Reproduced verbatim from the signed specification. *"The following are explicitly excluded from V1. Do not design or build these features."*

- Artist login portal or account system
- Automatic acceptance or rejection decisions
- Automatic posting to Instagram or other platforms
- Automatic publishing of mixes to the website
- Payment or monetisation system
- Public submission archive or artist directory
- Complex CRM or database build
- AI-generated responses sent automatically without human review

### 7.2 PID §6 exclusions not repeated in KAN-18 `[Category A]`

The PID's own out-of-scope list overlaps the above. One item appears **only** in the PID:

- **Full website rebuild**

### 7.3 KAN-20 §9.3 additions `[Category A]`

KAN-20 restates the KAN-18 list and adds two exclusions of its own:

- **No file uploads.** Links only throughout V1.
- **No CAPTCHA.** Honeypot only. ⚠️ Supersedes the PID's *"reCAPTCHA or equivalent"* — see `open-questions.md` **OQ-05**.

### 7.4 PID §11 V2 future enhancements — not on any out-of-scope list

These are **not** exclusions. They are recorded in the PID as future enhancements, which means they are simply not part of V1. The distinction matters: an exclusion was deliberately ruled out; a V2 item was deliberately postponed.

- Internal review dashboard
- Submission analytics

*(The full V2 list is in §13.)*

---

## 8. Success criteria `[PID §7]`

The project is successful when:

- A live submission page exists on lmnuk.com
- Artists can submit either a mix or demo/track
- Form logic changes depending on submission type
- Submissions are captured into a spreadsheet
- Submitted links are easy to review *(PID reads "Submitted assets or links are easy to review" — see note in §4)*
- Spam protection is active
- An automatic confirmation email is sent
- A test submission can be completed end-to-end
- Claude/Cowork can review the spreadsheet and produce summaries, bios, notes or draft replies

> The PID's *"File upload limits… are active"* criterion is superseded by the links-only decision — there are no uploads to limit. See **OQ-04**.

---

## 9. Prototype scope — current build target

**This is what Claude Code should build now.** A localhost prototype of the approved public submission experience. **Not a production or go-live build.**

### 9.1 In scope for the prototype

| # | Requirement | Reference |
|---|---|---|
| PT-01 | LMN submission page at `/submit` | `ux-specification.md` §2 |
| PT-02 | Approved intro copy, verbatim | `ux-specification.md` §3 |
| PT-03 | Exactly two form steps | `ux-specification.md` §1 |
| PT-04 | Approved step names — "About You" / "Your Submission" (Step 2 label varies by type) | `ux-specification.md` §4.1, §5.1, §6.1 |
| PT-05 | All approved fields, in approved order | `field-specification.md` §1; `ux-specification.md` §4.2, §5.3, §6.3 |
| PT-06 | Correct Mix / Demo branching | `workflows.md` §3.1 |
| PT-07 | Correct required/optional rules, including the conditional toggle on Country / City / SoundCloud | `workflows.md` §3.2 |
| PT-08 | All validation rules and error messages, verbatim | `field-specification.md` §4 |
| PT-09 | All character limits and live counters (amber 80%, red 100%) | `field-specification.md` §3, §4.1 |
| PT-10 | Progress indicator with named segments and completed-step tick | `ux-specification.md` §4.1 |
| PT-11 | Browser back behaviour — values preserved | `workflows.md` §2 |
| PT-12 | Back button on Step 2 — values preserved | `workflows.md` §2 |
| PT-13 | Responsive, mobile-first layout — 48px targets, 16px fonts, single column, tested at 375/414/768px | `ux-specification.md` §9.2 |
| PT-14 | `/submit/thank-you` route | `ux-specification.md` §2 |
| PT-15 | Thank-you page copy, verbatim as drafted (⚠️ status is *recommended, pending Mike's review* — see OQ-15) | `ux-specification.md` §8.1 |
| PT-16 | Redirect to `/submit/thank-you` on successful submission | `workflows.md` §4.1 |
| PT-17 | Consent checkboxes with exact approved wording, both required | `field-specification.md` §2 |
| PT-19 | Accessibility baseline — semantic HTML, associated labels, keyboard access, focus management, accessible error association, `aria-live` messaging | `submission-system.md` §4.1 (NFR-09), `amendments.md` **AM-05** |
| PT-18 | *(withdrawn — was "submission type pre-settable via URL parameter". No approved document requires this in V1; it belongs to the deferred Concept C work. See `ux-specification.md` §10.)* | — |

### 9.2 Explicitly NOT required for the prototype

**The prototype does not need to persist or transmit submissions externally.** Capturing the assembled payload locally is sufficient to demonstrate the flow.

Not required now: persistent datastore, transactional email, spreadsheet integration, hosting or domain routing, production spam hardening, deployment, monitoring.

**These are not cancelled — they are deferred.** See §10.

### 9.3 Prototype definition of done

- Both submission paths can be completed end to end in a browser on localhost
- Every validation rule fires with the exact approved error string
- Field sets branch correctly and no irrelevant field is ever rendered
- Country / City / SoundCloud switch required state correctly with the type selector, and remain visible in both states
- Back navigation (button and browser) preserves entered values
- Layout is single-column and usable at 375px
- Successful submit lands on `/submit/thank-you` with the drafted copy, reproduced verbatim
- Mix path requires at least one image link **and** at least one video link `[AM-01]`
- Accessibility baseline (PT-19) holds: keyboard-only completion works, errors are announced, focus moves correctly
- No item from the out-of-scope list (§7) has been built
- Every remaining `⚠️ CONFLICT` and `TBD` in this doc set is still visibly flagged, not silently resolved

---

## 10. Pre-Go-Live / Production Implementation

**Deferred out of prototype scope; must not block the prototype build.** Not all of these are product requirements — categories are shown per row and match `submission-system.md` §5.2 exactly. Full detail, including the rationale for every **E** item, is in `submission-system.md` §5 and `implementation-guidance.md` §3.

**Category key:** **A** authoritative product requirement · **B** unresolved conflict · **C** deferred product decision · **E** proposed architecture (no signed source — see `implementation-guidance.md` §3). Full definitions in `README.md` §3.1.

| # | Item | Cat | Status |
|---|---|---|---|
| PROD-01 | **Hosting and domain routing** — where the application runs, and how `/submit` is served from lmnuk.com | **C** | Decision required — **OQ-D1** |
| PROD-02 | **Production datastore** — no signed document requires one; the system-of-record model is a proposal | **C / E** | Decision required — **OQ-D2**, **OQ-18** |
| PROD-03 | **Transactional email provider** — the emails are authoritative `[PID §5]`; the provider is not specified | **C** | Decision required — **OQ-D4** |
| PROD-04 | **SPF / DKIM** on the sending domain so confirmation emails are not filtered as spam | **E** | Proposal — **E-02** |
| PROD-05 | **Spreadsheet integration** `[PID §5]`; **schema** never written | **A / C** | Deferred — **OQ-12** |
| PROD-06 | **Honeypot spam protection** `[KAN-20 §9.1]`; **rate limiting** beyond it | **A / E** | Deferred — **OQ-05**, **E-04** |
| PROD-07 | **Data retention policy** — UK GDPR obligation, never specified | **C** | Decision required — **OQ-10** |
| PROD-08 | **Server-side validation** mirroring all client-side rules — the rules are authoritative, running them server-side is a proposal | **E** | Proposal — **E-01** |
| PROD-09 | **Bulk export in an open format** (CSV/JSON, no proprietary encoding) | **E** | Proposal — **E-03**, from the retired `[KAN-19 R10]` |
| PROD-10 | **Deployment** to the production environment | **E** | Implied by `[PID §7]`; approach unspecified |
| PROD-11 | **Production monitoring and security** | **E** | Not mentioned in any signed document |
| PROD-12 | **End-to-end test submission with dummy data** before go-live | **A** | `[PID §5, §7]` — a stated success criterion |
| PROD-13 | **LMN brand values supplied and applied** — styling to brand is authoritative; tokenising the values is guidance (**D-02**) | **A / C** | Values pending — **OQ-13** |
| PROD-14 | **Accessibility beyond the prototype baseline** — formal WCAG target, audit, statement | **C** | Prototype baseline adopted `[AM-05]`; production programme still open — **OQ-09** |
| PROD-15 | **Auto-reply email copy** — the email is `[PID §5]`; its copy was never written | **C** | Decision required — **OQ-11** |
| PROD-16 | **Google Drive asset organisation** — contested scope | **B** | Conflict — **OQ-03** |

**Not a PROD item:** the internal review dashboard is out of scope for V1 entirely (§7), not deferred within it.

---

## 11. Risks

Rewritten from `[PID §9]`, with plugin-contingent risks removed as no longer applicable. The last two rows are **not** PID risks — they were inherited from the retired KAN-19 material and are labelled accordingly.

| Risk | Impact | Mitigation | Status |
|---|---|---|---|
| Upload abuse / large files | Storage issues or cost | Links only — no upload capability exists in V1 | **Retired** by the links-only decision |
| Form implementation cannot support conditional logic | Core UX unbuildable | No longer applicable — conditional logic is directly implemented | **Retired** by the move to a custom build |
| Styling mismatch | Form does not match LMN site | Form styled to LMN brand `[KAN-20 §9.2]`. *(Isolating the values as tokens is guidance — **D-02**.)* | Open — needs brand values (**OQ-13**) |
| Automation breaks | Submissions may not log properly | Test manually before launch. *(A proposal that the submit pipeline should not depend on the spreadsheet sync succeeding is category **E** — `implementation-guidance.md` **E-05**.)* | Open — production |
| Missing artist info | Review process becomes manual again | Key fields marked required per KAN-18 | Mitigated |
| Spam submissions | Noise and admin overhead | Honeypot spam protection | Open — see **OQ-05** |
| Submission data not exportable in an open format | Lock-in / migration pain | Bulk export to CSV/JSON | **Proposed (E)** — from the retired `[KAN-19 R10]`, not a signed requirement. See `implementation-guidance.md` **E-03** |
| Accessibility never specified | Excludes users; reputational and legal exposure | **Prototype baseline adopted** `[AM-05]` — semantic HTML, associated labels, keyboard access, focus management, accessible error association, `aria-live` messaging. Built in from the first slice (NFR-09 / PT-19), not retrofitted | **Mitigated for the prototype.** A formal WCAG 2.1 AA target, audit and accessibility statement remain **deferred (C)** — **OQ-09** |

---

## 12. Product principles

Carried from the PID and Mike's working instructions. These govern judgement calls during the build.

- **Simple, working proof over unnecessary complexity.** A working deployed MVP beats more polished documentation.
- **Ship V1; defer the rest.** If something blocks go-live, take the V1 compromise and move the full feature to V2.
- **Do not add V1 features without checking MVP impact.**
- **The specification is authoritative; the implementation follows it.** If the code and this documentation set diverge, the documentation is right and the code is wrong. *(This is a working practice for this project, not a requirement from a signed document. The fuller set of documentation-integrity principles it came from is category **D** — `implementation-guidance.md` §5.)*

---

## 13. Future enhancements — V2 `[PID §11]`

Recorded so they are not accidentally built into V1. All items are from PID §11 except the last, which is from KAN-20 §1.2/§9.4:

AI-generated artist summary · AI-generated acceptance/rejection draft · automatic tagging by genre/submission type · calendar scheduling for accepted mixes · artist bio generation · tracklist formatting in LMN style · status email updates · internal review dashboard · full artist CRM · submission analytics · Concept C card-selection landing page.
