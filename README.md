# LMN Submission System V1 — Documentation Set

**Status:** Implementation-agnostic source of truth
**Target:** Custom-coded web application — **localhost prototype first**
**Version:** 1.0 · 13 August 2026
**Owner:** Mike Day

---

## 1. What this documentation set is

This `/docs` set is the **single source of truth** for building the LMN Submission System V1 as a custom-coded web application.

It was produced by refactoring the original project documentation, which specified a WordPress implementation using a commercial form plugin. Implementation-specific language has been rewritten; the product itself has not been redesigned.

**What this refactor guarantees:**

1. **Signed and approved product requirements were preserved.** Every field, label, required/optional status, character limit, validation rule, consent string, error message, button label and page copy string traces to KAN-18, the approved KAN-20, or the PID, and is reproduced as written.
2. **No conflict was ever resolved silently.** Conflicts were logged in `open-questions.md` and left open until the product owner decided them. Five have since been decided and are recorded in `amendments.md` (AM-01…AM-05); the rest remain open and flagged. None was resolved in favour of whichever option was easier to build.
3. **Separate implementation guidance and architecture proposals have been added, and are labelled as such.** They live in `implementation-guidance.md`, carry no product authority, and must not be read as signed-off scope.

**What this refactor does not claim.** Point 3 means new engineering thinking exists in this set that was not in the signed documents — for example, a proposal that the application own a system of record. That thinking is useful and is deliberately retained, but it is **not** a product decision, and the product documents label every such item with its category rather than presenting it as signed scope. A corrective pass on 13 Aug 2026 moved this material out of the requirement documents after an earlier version of this set had mixed it in. **Any unlabelled engineering assertion still sitting in a product document is a defect — report it rather than building to it.**

---

## 2. Current build target: localhost prototype

The immediate objective is a **working local prototype of the approved public submission experience**. This is **not** a production or go-live build.

The prototype must implement:

- The LMN submission page with approved intro copy
- Exactly two form steps with the approved step names
- All approved fields, with correct Mix / Demo branching
- Correct required/optional rules per submission type
- All validation rules, character limits and error messages
- Progress indicator
- Browser back behaviour
- Responsive, mobile-first layout
- `/submit/thank-you` with the drafted thank-you copy

**The prototype does not need to persist or transmit submissions externally.** Storage, email, spreadsheet integration and everything else in the production layer is documented but explicitly out of prototype scope.

Every document in this set separates **Prototype Scope** from **Pre-Go-Live / Production Implementation**. Requirements in the production section are still real requirements — they are simply not needed to build the prototype and must not block it.

---

## 3. Authority hierarchy

When documents disagree, higher authority wins. **This order is not an invention of this refactor** — it is stated by the source documents themselves. KAN-20 explicitly defers to KAN-18 on field requirements: *"Source of truth for Required/Optional status is KAN-18 Field Specification v1.1. Do not change field requirements without approval."*

| Rank | Document | Date | Status | Authoritative for |
|---|---|---|---|---|
| **0** | **`amendments.md`** — decisions by the product owner that supersede signed/approved content on named points | 13 Aug 2026 | Decided (MD) | **Overrides all rows below on the points it names.** Each amendment states exactly what it supersedes. |
| **1** | **KAN-18 Field Specification v1.2 Amendment** | 30 Jun 2026 | Signed off (MD) | Artist Name character limit **only**. Supersedes v1.1 on that single field. |
| **2** | **KAN-18 Field Specification v1.1** | 29 Jun 2026 | Signed off (MD) | **All fields**: existence, labels, input types, required/optional status per submission type, character limits, accepted platforms, consent wording, out-of-scope list |
| **3** | **KAN-20 Submission Page: Final Wireframe & UX Specification v1.0 (Concept B Approved)** | 30 Jun 2026 | Approved | **UX only**: user journey, step structure, field order, layout, page copy, button copy, progress indicator, validation behaviour, error message text, responsive rules, thank-you page |
| **4** | **Project Initiation Document (PID)** | — | Baseline | Product intent, problem statement, MVP framing, out-of-scope list, success criteria — **except** where superseded by KAN-18 or KAN-20 |

### 3.1 Provenance categories

Every live requirement in this set carries one of five categories. **Do not blur them.**

| Category | Meaning | Where it lives |
|---|---|---|
| **A — Authoritative product requirement** | Traceable to KAN-18, the approved KAN-20, or the PID where not superseded | `PRD.md`, `submission-system.md`, `field-specification.md`, `workflows.md`, `ux-specification.md` |
| **B — Unresolved conflict** | Two authoritative sources disagree | Flagged inline `⚠️`, detailed in `open-questions.md` |
| **C — Deferred product decision** | A real product decision remains open — Mike's call | `open-questions.md` |
| **D — Implementation guidance** | Useful engineering or UX advice, **not** signed-off product scope | `implementation-guidance.md` |
| **E — Proposed architecture** | Needed before production, **not** inherited from the signed specification | `implementation-guidance.md` |

**Composite labels** such as `A / C`, `A / E` or `C / E` mean one line item has an authoritative core and an open or proposed part — e.g. *"the confirmation email is authoritative; the provider choice is not."* Read them as "the authoritative part is X, the rest is Y". A `—` means informational, not a requirement.

**Category labels appear in the product documents wherever a line item is not plain A**, so an implementer never has to cross-reference to find out whether something is signed scope. The full rationale for every **D** and **E** item lives in `implementation-guidance.md`.

**KAN-19, the KAN-19 Architecture Review, and the historical KAN-20 Concepts draft are retired.** Material harvested from them may appear as **D** or **E**. It may never appear as **A**. An elevation performed by a retired document — such as KAN-19 promoting browser autofill to REQ-39 — does not survive that document's retirement.

### The KAN-18 / KAN-20 boundary

This distinction matters and is applied consistently throughout this set:

- **KAN-18 decides *what* is collected and *whether it is required*.**
- **KAN-20 decides *how it is presented, ordered and worded*.**

Where KAN-20 states a required/optional status that differs from KAN-18, **KAN-18 wins** and the discrepancy is logged in `open-questions.md`. Where KAN-18 is silent on presentation, KAN-20 governs.

---

## 4. Superseded documents — do not build from these

The following documents remain on file as project history and portfolio evidence. **They must not be used as build input.**

| Document | Why superseded |
|---|---|
| `LMN Submission System V1 Field Specification.pdf` (undated draft) | Superseded by KAN-18 v1.1. Contains a *"How did you hear about LMN?"* field that does not appear in the signed v1.1 table, and required/optional values that differ. See `open-questions.md` **OQ-06**. |
| `KAN-19_Plugin_Selection_Decision_Document.docx` | **Void as a decision.** Selected a commercial WordPress form plugin. The platform decision it answers no longer exists. Its requirements traceability matrix (REQ-01…REQ-44) has been harvested into `submission-system.md` §7 — retained because the requirement *text* traces to KAN-18/KAN-20/PID, not because KAN-19 confers authority. |
| `KAN-19_Architecture_Review.docx` | **Void as a review.** Governed a WordPress Phase 1 against a future custom rebuild. That rebuild is now the current work. Its portability principles (§8.3) and system-of-record model (§9) have been harvested into `implementation-guidance.md` as **D** and **E** material — advice and proposals, **not** product requirements. |
| `KAN-20_Wireframe_Concepts.docx` | Historical. Presented three concepts; Concept B was selected and is documented in the approved KAN-20 wireframe. **Not a requirements source.** Its UX research is retained as recorded *rationale* in `ux-specification.md` §11 and is cited as `[KAN-20 Concepts §n]` to distinguish it from the approved document. One item — browser autofill support — was elevated to REQ-39 by KAN-19; since KAN-19 is itself retired, that elevation does not survive, and autofill is retained as guidance (`implementation-guidance.md` **D-01**). Its rejected Concept A design notes must not be used. |
| `claudeProjectContext.md.txt` | Working brief instructing an assistant to build on WordPress/Oxygen. Replaced by this `/docs` set. |

### What was deliberately dropped

From KAN-19 and the Architecture Review: the plugin recommendation, the four-plugin comparison, all commercial and licensing analysis, the Options A–E solution-space scoring, and risks **R1–R3, R5–R9 and R13–R15**. Every one of these was contingent on a commercial plugin dependency that no longer exists.

**Four risks were retained as live concerns:** **R4** (an integration sync can silently fail — mitigated by proposal **E-05** in `implementation-guidance.md`), **R10** (submission data should be bulk-exportable in an open format — retained as **proposal E-03**, not a signed requirement), **R11** (accessibility was never specified) and **R12** (performance — explicitly de-risked, recorded so it is not treated as a constraint). The full retired/retained breakdown is in `submission-system.md` §8.

---

## 5. Document map

| File | Contains |
|---|---|
| `README.md` | This file — provenance, authority, source-of-truth rules |
| `PRD.md` | Product purpose, users, scope, MVP, out-of-scope, success criteria, prototype vs production scope |
| `submission-system.md` | System behaviour, capability requirements, submission logic, requirements register, non-functional requirements, data architecture |
| `field-specification.md` | **Authoritative field table**, labels, input types, required/optional status, character limits, validation rules, error messages, consent wording |
| `workflows.md` | Full user journey, step transitions, conditional logic decision tables, submit flow, thank-you flow, future review lifecycle |
| `ux-specification.md` | Approved wireframe behaviour, field order, layout, page copy, button copy, progress indicator, responsive behaviour, thank-you page |
| `amendments.md` | **Decisions that supersede signed/approved content. Highest authority.** |
| `open-questions.md` | **Unresolved conflicts (B), deferred decisions (C), pre-go-live decisions** |
| `implementation-guidance.md` | **Implementation guidance (D) and proposed architecture (E). Not product authority.** |

---

## 6. Rules for anyone building from this set

1. **Do not resolve a conflict yourself.** If a requirement is marked `⚠️ CONFLICT` or `TBD — DECISION REQUIRED`, stop and ask Mike. Do not pick the more convenient option.
2. **Reproduce user-facing copy character-for-character.** Consent wording, button labels, error messages, page copy and helper text are approved strings. Do not paraphrase, re-case, re-punctuate, or "improve" them. Consent wording in particular carries UK GDPR implications.
3. **Do not add fields, and do not remove them.** The field list in `field-specification.md` is complete and closed for V1.
4. **Do not change required/optional status** to make implementation easier. This specifically includes the conditional required behaviour on Country, City and SoundCloud Link — see `open-questions.md` **OQ-08**.
5. **Do not implement anything in the out-of-scope list** in `PRD.md`, even partially, even if it seems trivial.
6. **Production-layer requirements are not prototype blockers.** If a requirement sits under *Pre-Go-Live / Production Implementation*, build around it, stub it, or skip it — do not stall on it and do not invent an implementation.
7. **Every requirement in this set cites its origin** (e.g. `[KAN-18 v1.1]`, `[KAN-20 §5.1]`). If a statement has no citation, treat it as clarifying prose, not as a new requirement.
8. **`implementation-guidance.md` is advice, not scope.** A build that ignores all of it can still satisfy every authoritative product requirement. Where it conflicts with a product document, the product document wins.

---

## 7. Provenance and traceability

Every field, rule, string and behaviour in this set is traceable to a signed or approved source document. The citation format is:

- `[KAN-18 v1.1]` — signed Field Specification, 29 Jun 2026
- `[KAN-18 v1.2]` — signed Amendment, 30 Jun 2026
- `[KAN-20 §n]` — approved Wireframe & UX Specification, 30 Jun 2026
- `[KAN-20 Concepts §n]` — the **historical** three-concept research draft. **Rationale only. No exceptions** — material sourced here is category **D** at most, never **A**. (REQ-39 browser autofill was elevated by KAN-19; since KAN-19 is retired, that elevation does not survive — see `implementation-guidance.md` §6.)
- `[PID §n]` — Project Initiation Document
- `[KAN-19-AR §n]` — harvested principle from the Architecture Review (retained content only)

The original signed documents remain in the project folder unchanged. This refactor added `/docs`; it deleted and overwrote nothing.
