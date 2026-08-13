# Field Specification — LMN Submission System V1

**Authoritative source:** KAN-18 Field Specification v1.1 (signed off 29 Jun 2026) as amended by v1.2 (signed off 30 Jun 2026)
**Presentation source:** KAN-20 Wireframe & UX Specification v1.0 (approved 30 Jun 2026)
**Status:** Authoritative. This document defines **what data is collected and whether it is required.**

---

## 0. How to read this document

- **KAN-18 decides existence, label, input type, required/optional status and character limits.**
- **KAN-20 decides field order, helper text and error message wording.**
- Where the two disagree on required/optional status, **KAN-18 wins** and the disagreement is logged in `open-questions.md`.

**Do not change any value in this document to make implementation easier.** Every required/optional status, character limit and string here is signed off.

✅ **The two conflicts this document previously carried (OQ-01, OQ-02) are now resolved** by `amendments.md` **AM-01** and **AM-03**. Amendments are authoritative — do not reopen them. Any remaining `⚠️` or `TBD` marker in this set is still genuinely unresolved and must not be resolved unilaterally.

---

## 1. Field table — authoritative

The Required (Mix) and Required (Demo) columns are **independent**. A field may be required in one submission type and optional in the other. `[KAN-18 v1.1]`

### 1.1 Submission Details

| Field | Label | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|---|
| Submission type | *What are you submitting?* | Yes | Yes | **Required** | **Required** | Radio button | Values: `Mix Submission` / `Demo / Track Submission`. **Must appear first.** Drives all conditional form logic. `[KAN-18 v1.1]` |

### 1.2 Artist Details

| Field | Label | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|---|
| Artist name | *Artist Name* | Yes | Yes | **Required** | **Required** | Text | **Max 50 characters.** Main artist or DJ name. `[KAN-18 v1.2 — amended from 20 characters in v1.1]` |
| Email address | *Email Address* | Yes | Yes | **Required** | **Required** | Email | Valid email format enforced. Used for auto-reply confirmation and follow-up contact. `[KAN-18 v1.1]` |
| Country | *Country* | Yes | Yes | **Required** | Optional | Text | Max 50 characters. Useful for artist profile and radio context. Applied consistently across both form types. **Field remains visible for both types — only the required status and label change.** `[KAN-18 v1.1; KAN-20 §3.2]` |
| City | *City* | Yes | Yes | **Required** | Optional | Text | Max 50 characters. Useful for local/radio context. Same conditional required behaviour as Country. `[KAN-18 v1.1; KAN-20 §3.2]` |
| SoundCloud link | *SoundCloud Link* | Yes | Yes | **Required** | Optional | URL | Valid URL. Primary platform for reviewing submitted music. Same conditional required behaviour as Country. `[KAN-18 v1.1; KAN-20 §3.2]` |
| Instagram / social link | *Instagram / Social* | Yes | Yes | Optional | Optional | URL | Valid URL. Useful for promo and research. `[KAN-18 v1.1]` |
| Genre(s) | *Genre(s)* | Yes | Yes | Optional | Optional | Text | **Max 20 characters.** Free text. Examples: Techno, House, Minimal. `[KAN-18 v1.1; error string corrected by AM-03]` |
| Short artist bio | *Short Artist Bio* | Yes | Yes | Optional | Optional | Textarea | Max 500 characters. Used for artist promotion and radio introductions. Must be placed **last** in Step 1 — avoids creating a writing barrier before the form is started. `[KAN-18 v1.1; KAN-20 §5.1]` |

### 1.3 Mix Details — Mix submissions only

| Field | Label | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|---|
| Mix link | *Mix Link* | Yes | No | **Required** | N/A | URL | Valid URL required. Accepted: SoundCloud, Mixcloud, Dropbox, Google Drive, WeTransfer. `[KAN-18 v1.1]` |
| Tracklist | *Tracklist* | Yes | No | **Required** | N/A | Textarea | **No character limit.** Artist pastes full tracklist. `[KAN-18 v1.1]` |
| Mix notes | *Mix Notes* | Yes | No | Optional | N/A | Textarea | Max 500 characters. Style, concept, or release notes. `[KAN-18 v1.1]` |

### 1.4 Demo Details — Demo / Track submissions only

| Field | Label | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|---|
| Track / demo links | *Track / Demo Links* | No | Yes | N/A | **Required** | Textarea | Valid URLs required. **Multiple links accepted, one per line.** Must be a multi-line textarea, **not** a single URL field. Accepted: SoundCloud, Dropbox, Google Drive, WeTransfer, private links. `[KAN-18 v1.1; KAN-20 §5.3]` |
| Release status | *Release Status* | No | Yes | N/A | Optional | Dropdown | Fixed list only. Values: `Unreleased`, `Forthcoming`, `Self-released`. `[KAN-18 v1.1]` |
| Demo notes | *Demo Notes* | No | Yes | N/A | Optional | Textarea | Max 500 characters. Any context about the music. `[KAN-18 v1.1]` |

### 1.5 Assets — Mix submissions only

✅ **RESOLVED by `amendments.md` AM-01.** OQ-02 and OQ-02b are closed. Image and video links are **Required** for Mix submissions — **minimum 1, maximum 3 per group**.

| Field | Label | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|---|
| Image link 1 | *Image Link 1* | Yes | No | **Required** | N/A | URL | Valid URL. At least one image link must be supplied. `[KAN-18 v1.1; AM-01]` |
| Image link 2 | *Image Link 2* | Yes | No | Optional | N/A | URL | Valid URL if supplied. `[AM-01]` |
| Image link 3 | *Image Link 3* | Yes | No | Optional | N/A | URL | Valid URL if supplied. `[AM-01]` |
| Video link 1 | *Video Link 1* | Yes | No | **Required** | N/A | URL | Valid URL. At least one video link must be supplied. `[KAN-18 v1.1; AM-01]` |
| Video link 2 | *Video Link 2* | Yes | No | Optional | N/A | URL | Valid URL if supplied. `[AM-01]` |
| Video link 3 | *Video Link 3* | Yes | No | Optional | N/A | URL | Valid URL if supplied. `[AM-01]` |

> **Interpretation, explicit:** the two minimums are **independent**. A Mix submission requires **at least one image link AND at least one video link** — two URLs minimum. Three images and no videos does **not** satisfy the requirement. `[AM-01]`

**Maximum of 3 per group is structural** — only three inputs exist per group. No count validation is required.

**Superseded, recorded not deleted:** the KAN-18 v1.1 in-cell note (*"downgraded from required to optional to reduce form abandonment"*) and KAN-20 §5.2's Optional status. Both are on file in `amendments.md` **AM-01**.

**Assets appear in the Mix form only. They must not be added to the Demo form.** `[KAN-18 v1.1; KAN-20 §5.2]`

### 1.6 Consent — both submission types

| Field | Mix | Demo | Req (Mix) | Req (Demo) | Input type | Constraints & notes |
|---|---|---|---|---|---|---|
| Permission to contact | Yes | Yes | **Required** | **Required** | Checkbox | Exact wording below. Must be checked to submit. `[KAN-18 v1.1]` |
| Permission to use assets for promotion | Yes | Yes | **Required** | **Required** | Checkbox | Exact wording below. Must be checked to submit. `[KAN-18 v1.1]` |

---

## 2. Consent field wording — exact text, do not paraphrase

> **The following exact wording must be used for the consent checkboxes. Do not paraphrase.** lmnuk.com operates in the UK — consent must comply with UK GDPR (informed, specific, freely given, unambiguous). Seek legal review if in doubt before the form goes live. `[KAN-18 v1.1]`

**Checkbox 1 — Permission to contact:**

```
I confirm that LMN may contact me about this submission via the email address provided.
```

**Checkbox 2 — Permission to use assets for promotion:**

```
I give LMN permission to use my submitted bio, images, videos, and music links for promotional purposes including social media, website, and radio.
```

These two strings are reproduced verbatim from KAN-18 v1.1 and confirmed verbatim in KAN-20 §5.4. **Do not re-case, re-punctuate, truncate, or split them across lines in a way that changes the reading.**

---

## 3. Character limits — consolidated

| Field | Limit | Source |
|---|---|---|
| Artist Name | 50 characters | `[KAN-18 v1.2]` |
| Country | 50 characters | `[KAN-18 v1.1]` |
| City | 50 characters | `[KAN-18 v1.1]` |
| Genre(s) | **20 characters** | `[KAN-18 v1.1; AM-03]` |
| Short Artist Bio | 500 characters | `[KAN-18 v1.1]` |
| Mix Notes | 500 characters | `[KAN-18 v1.1]` |
| Demo Notes | 500 characters | `[KAN-18 v1.1]` |
| Tracklist | **No limit** | `[KAN-18 v1.1]` |

---

## 4. Validation rules

Source: `[KAN-20 §7]`. These are product/UX rules and apply in full to the localhost prototype.

### 4.1 General validation principles `[KAN-20 §7.1]`

- **Inline validation fires on blur** (when a user leaves a field), **not** in real-time while typing.
- **Positive confirmation:** a green tick (✔) appears when a field passes validation. This builds confidence and momentum.
- **Error state:** red border on the field **plus** an error message displayed immediately below the field.
- **Error messages are specific and actionable** — not generic "This field is invalid".
- **On Next or Submit click with errors present:** scroll to the first error field; do not advance or submit.
- **Optional fields:** never show an error for an empty optional field.
- **Character limit fields:** show a live counter (e.g. `0 / 500 characters`). Counter turns **amber at 80%** used, **red at 100%**.

> Note on §7.3: *"When a field passes validation on blur, display a green tick (✔) to the right of the field or as a border state change. This is a deliberate positive reinforcement pattern. Do not skip this — it measurably improves completion rates."* `[KAN-20 §7.3]`

### 4.2 Validation rules by trigger `[KAN-20 §7.2]`

| Trigger | Behaviour | Error / feedback message (exact string) |
|---|---|---|
| Required field left empty — Step 1 Next clicked | Scroll to first empty required field. Highlight with red border. Do not advance to Step 2. | `This field is required.` |
| Required field left empty — Step 2 Submit clicked | Scroll to first empty required field. Highlight with red border. Do not submit. | `This field is required.` |
| Email — invalid format | Fires on blur. Red border + error below field. | `Please enter a valid email address.` |
| URL field — invalid format | Fires on blur. URL must begin with `http://` or `https://`. Red border + error below field. | `Please enter a valid URL starting with http:// or https://` |
| Artist Name — character limit exceeded | Inline: character counter turns red. Field does not accept further input beyond 50 chars (hard limit preferred) OR shows error on blur. | `Artist name must be 50 characters or fewer.` |
| Genre — character limit exceeded | Same as Artist Name, max 20 characters. | `Genre must be 20 characters or fewer.` ✅ `[AM-03 — corrected from "50"]` |
| Mix Notes / Demo Notes — character limit exceeded | Counter turns red at 500. Hard limit OR error on blur. | `Notes must be 500 characters or fewer.` |
| Bio — character limit exceeded | Counter turns red at 500. Hard limit or error on blur. | `Bio must be 500 characters or fewer.` |
| Consent checkbox 1 — unchecked on submit | Fires on **Submit only**. Error appears below the checkbox. Do not submit. | `Please confirm that LMN may contact you.` |
| Consent checkbox 2 — unchecked on submit | Fires on **Submit only**. Error appears below the checkbox. Do not submit. | `Please give permission for LMN to use your submitted assets.` |
| Submission type — not selected on Next click | Error appears below the radio group. Do not advance. | `Please select a submission type.` |
| Track / Demo Links — valid URL check | Textarea contains multiple lines. Validate **each non-empty line** as a URL, on blur or on submit. | `One or more links does not appear to be a valid URL. Please check each link is correct.` |

**All error strings above are approved copy and must be reproduced verbatim.** One has been amended: the Genre string was corrected from *"50 characters or fewer"* to *"20 characters or fewer"* to match the authoritative limit — see `amendments.md` **AM-03**. Every other string is unchanged from KAN-20 §7.2.

### 4.3 Assets validation `[AM-01]`

| Trigger | Behaviour | Error / feedback message (exact string) |
|---|---|---|
| `Image Link 1` empty — Step 2 Submit clicked | Scroll to field, red border, do not submit | `This field is required.` |
| `Video Link 1` empty — Step 2 Submit clicked | Scroll to field, red border, do not submit | `This field is required.` |
| Any asset link — invalid URL format | Fires on blur. Red border + error below field. | `Please enter a valid URL starting with http:// or https://` |
| `Image Link 2/3`, `Video Link 2/3` left empty | No error — these are optional | — |

**No new error copy was introduced.** Both strings above are existing approved copy from KAN-20 §7.2.

---

## 5. Helper text — exact strings `[KAN-20 §3, §4]`

| Field | Helper text |
|---|---|
| Artist Name | `Max 50 characters` |
| Email Address | `Valid email required` |
| Country | `Max 50 characters` |
| City | `Max 50 characters` |
| SoundCloud Link | `Valid URL required (https://soundcloud.com/...)` — mobile variant: `e.g. soundcloud.com/yourname` |
| Instagram / Social | `Valid URL` |
| Genre(s) | `e.g. Techno, House, Minimal` |
| Short Artist Bio | `Used for promotion and radio introductions.` + live counter `0 / 500 characters` |
| Mix Link | `Accepted: SoundCloud, Mixcloud, Dropbox, Google Drive, WeTransfer. Valid URL required.` |
| Tracklist | `Paste your full tracklist here. No character limit.` |
| Mix Notes | `Style, concept, or release context.` + live counter `0 / 500 characters` |
| Track / Demo Links | `One link per line. Accepted: SoundCloud, Dropbox, Google Drive, WeTransfer, private links.` |
| Release Status | Dropdown placeholder: `Select` |
| Demo Notes | `Any context about the music.` + live counter `0 / 500 characters` |
| Image / Video links | `Accepted: Valid URLs. Links preferred over uploads.` |

---

## 6. Required / optional labelling behaviour `[KAN-20 §3.2]`

- Required fields display a **required asterisk (`*`)** next to the label.
- Optional fields display an **`(optional)` suffix** and **no asterisk**. `[KAN-20 §3.2]` *(Additional visual de-emphasis — lighter label text — is Concepts-draft wording, not an approved requirement.)*
- **Country, City and SoundCloud Link switch between the two states** based on the selected submission type: asterisk when `Mix Submission` is selected, `(optional)` when `Demo / Track Submission` is selected.
- **These three fields remain visible in both cases.** Only the required status and label change. They are never hidden.

> Original KAN-20 design note, restated implementation-agnostically: *"Country, City, and SoundCloud are 'Required' for Mix and 'Optional' for Demo (per KAN-18). In Step 1, the type selection drives which label and asterisk is shown… The fields remain visible in both cases — only the required status changes. This is not a change to KAN-18 — it is an implementation note."*

⚠️ A fallback was once proposed (KAN-19 Risk R1) to mark these three fields Required for **both** types if the behaviour proved hard to implement in a form plugin. **That fallback is void and must not be applied.** It existed only because of a plugin limitation. See `open-questions.md` **OQ-08**.

---

## 7. No file uploads

**V1 accepts links only.** No field in this specification accepts a file upload. All music, image and video fields are URL or textarea inputs. `[KAN-18 v1.1 — all asset/music fields typed as URL; KAN-20 §9.3]`

This supersedes the PID's original file-size and file-type safeguard language, which no longer applies once uploads are excluded. See `open-questions.md` **OQ-04**.

---

## 8. Out of scope — V1 `[KAN-18 v1.1]`

The following are explicitly excluded from V1. **Do not design or build these features.**

- Artist login portal or account system
- Automatic acceptance or rejection decisions
- Automatic posting to Instagram or other platforms
- Automatic publishing of mixes to the website
- Payment or monetisation system
- Public submission archive or artist directory
- Complex CRM or database build
- AI-generated responses sent automatically without human review

KAN-20 §9.3 adds two further exclusions, both consistent with the above:

- **No file uploads.** Links only throughout V1.
- **No CAPTCHA.** Honeypot only. See `open-questions.md` **OQ-05**.

---

## 9. Field count

Two different counts are correct depending on what is being counted. Both are stated here because the earlier single figure of "19 discrete fields" was ambiguous and did not reconcile with the per-path figures.

### 9.1 Specification rows — **19**

The number of rows in the KAN-18 v1.1 field table. Two of those rows describe three inputs each.

| Section | Rows |
|---|---|
| Submission Details | 1 |
| Artist Details | 8 |
| Mix Details | 3 |
| Demo Details | 3 |
| Assets | 2 — *"Image links (up to 3)"* and *"Video links (up to 3)"* |
| Consent | 2 |
| **Total** | **19** |

This is the figure KAN-19 used (*"19 discrete fields"*). It counts specification entries, not controls.

### 9.2 User input controls — **23**

The number of individual inputs a developer builds, expanding the two asset rows into three inputs each.

19 rows − 2 asset rows + 6 asset inputs = **23 controls**

### 9.3 Per submission path

No single user ever sees all 19 rows or all 23 controls — Mix and Demo fields are mutually exclusive.

| | Step 1 | Step 2 | Total rows | Total controls |
|---|---|---|---|---|
| **Mix Submission** | 9 controls (1 type + 8 artist details) | 3 Mix Details + 2 asset rows (6 controls) + 2 consent | **16 rows** | **20 controls** |
| **Demo / Track Submission** | 9 controls (1 type + 8 artist details) | 3 Demo Details + 2 consent | **14 rows** | **14 controls** |

*The Demo path has no multi-control rows, so its row and control counts are identical.*

**Use 23 (or 20 / 14 per path) when building. Use 19 when cross-referencing KAN-18 or KAN-19.**
