# UX Specification — LMN Submission System V1

**Authoritative source:** KAN-20 Submission Page: Final Wireframe & UX Specification v1.0 — Concept B Approved (30 Jun 2026)
**Field authority:** KAN-18 (see `field-specification.md`)
**Status:** Approved, as amended. All copy in this document is approved user-facing copy and must be reproduced verbatim — **with one exception: the thank-you page copy in §8.1 is marked "recommended, pending Mike's review" in KAN-20 and has not been formally approved.** See `open-questions.md` **OQ-15**.

**Amended by:** `amendments.md` **AM-02** (assets section replaces the accordion) and **AM-04** (Next stays clickable). Amendments are authoritative.

**Citation note:** references marked `[KAN-20 §n]` are to the **approved** KAN-20 Wireframe & UX Specification v1.0. References marked `[KAN-20 Concepts §n]` are to `KAN-20_Wireframe_Concepts.docx`, the **historical** three-concept research draft. The latter is **not a source of requirements under any circumstances** — it is retained here only as recorded design rationale. See §11.

---

## 1. Approved design direction

**Concept B — Two-Step Wizard with Progress Bar.** `[KAN-20 §1.1]`

> *"The form will be built as a two-step wizard with a progress bar, conditional field display, and separate submit buttons for Mix and Demo/Track submissions."*

Reasons for selection, recorded as approved rationale — do not reopen:

- **Best completion rate.** Multi-step forms consistently outperform single-page forms in A/B tests. The sunk-cost effect from completing Step 1 drives higher completion of Step 2.
- **Logical split.** Step 1 (About You) and Step 2 (Your Submission) reflect two genuinely different cognitive tasks. The split feels natural to the user, not arbitrary.
- **Progress bar reduces anxiety.** Artists submitting a mix or demo are already self-conscious about how their work will be received. A visible progress indicator confirms they are nearly done and sets clear expectations.
- **Conditional logic is clean.** The submission type is captured in Step 1. Step 2 then loads either Mix fields or Demo/Track fields exclusively. **No irrelevant fields are ever shown.**

### 1.1 Deferred concept — not part of V1

**Concept C — Type-First Card Selection is NOT part of V1.** It is documented as a future enhancement only. **Do not design or build it.** `[KAN-20 §1.2]`

Concept C would sit upstream of the two-step form, presenting two large visual cards (Submit a Mix / Submit a Demo) before the user reaches the form itself. It offers premium brand impression and helps artists self-qualify before starting, but adds a navigation step before the form which introduces a bounce risk.

In V1.1 or V2 it can be implemented as a styled landing page that links to the same two-step form used in V1. **The form does not change.** Only a card-selection page needs to be added. See §10 below.

---

## 2. Page structure

| Route | Purpose | Notes |
|---|---|---|
| `/submit` | Submission page — intro copy + two-step form | Single URL for both steps. `[KAN-20 §2.1, §9.1]` |
| `/submit/thank-you` | Confirmation page | Static, no form embed. Reached only by redirect after successful submission. `[KAN-20 §8]` |

---

## 3. Intro section copy — approved, verbatim `[KAN-20 §3.1]`

**Page title:** `Submit Your Music`

**Intro copy (3–4 sentences max):**

```
LMN is an independent electronic music brand based in the UK. We run LMN Radio,
events, and artist releases. Our team personally listens to every submission.

We accept mix submissions for LMN Radio and demos / tracks for A&R consideration.

Complete the form below — it takes under 5 minutes.
```

**Condensed variant used in the mobile wireframe** `[KAN-20 §4.1]`:

```
Submit Your Music
We listen to every submission.
Our team responds within 4 weeks.
```

**Design intent for this section:**
- Full-width banner or hero section, background uses LMN brand colour / image
- Sets expectation: LMN listens personally
- Confirms two submission paths exist
- Time estimate builds confidence
- **No form fields in this section** — intro only

---

## 4. Step 1 — About You

Displayed to both submission types. `[KAN-20 §3.2, §5.1]`

### 4.1 Progress indicator

- Two named segments: **`About You`** and **`Your Submission`**
- Segment 1 active (filled), segment 2 inactive (grey)
- Desktop label format: `STEP 1: ABOUT YOU` / `STEP 2`
- Mobile simplifies to text only: `Step 1 of 2 — About You`

### 4.2 Field order — final `[KAN-20 §5.1]`

Order is fixed. Required/optional status is authoritative from KAN-18 — see `field-specification.md`.

| # | Field | Input type | Mix | Demo |
|---|---|---|---|---|
| 1 | **Submission Type** | Radio button | Required | Required |
| 2 | **Artist Name** | Text field | Required | Required |
| 3 | **Email Address** | Email field | Required | Required |
| 4 | **Country** | Text field | Required | Optional |
| 5 | **City** | Text field | Required | Optional |
| 6 | **SoundCloud Link** | URL field | Required | Optional |
| 7 | **Instagram / Social Link** | URL field | Optional | Optional |
| 8 | **Genre(s)** | Text field | Optional | Optional |
| 9 | **Short Artist Bio** | Textarea | Optional | Optional |

### 4.3 Layout and design notes

- **Section heading:** `ABOUT YOU`
- **Submission type selector must appear first.** It drives all Step 2 conditional logic. Radio buttons, vertically stacked, large tap targets. ✅ **`Next` remains clickable when no type is selected**; clicking it shows the approved error `Please select a submission type.` below the radio group and does not advance. `[AM-04 — supersedes KAN-20 §2.1's "must be selected before Next is enabled"]`
- **Two-column pairing on desktop only** — the approved wireframe pairs **Artist Name / Email Address** side by side. Country, City, SoundCloud Link and Instagram / Social each occupy their own full-width row. **All fields collapse to single column on mobile.** `[KAN-20 §3.2, §4]` *("No horizontal scrolling" is Concepts-draft wording; the approved requirement is the single-column mobile layout in §4.)*
  - *Note: a wider pairing (Country / City, SoundCloud / Instagram) appears in the rejected Concept A design notes only. It is not part of the approved Concept B layout and must not be applied.*
- **Country, City and SoundCloud labels swap between `*` and `(optional)`** with the type selection. Fields remain visible in both cases. See `field-specification.md` §6.
- **Genre is free text, not a dropdown.**
- **Short Artist Bio is placed last**, not first — this deliberately avoids creating a "writing barrier" before the user has started the form. Live character counter.
- **Optional fields carry an `(optional)` suffix and no asterisk.** `[KAN-20 §3.2]` *(The additional treatment "visually de-emphasised, lighter label text" comes from the historical Concepts draft, not the approved wireframe — apply it as styling preference, not as an approved requirement.)*
- *Implementation guidance, not an approved requirement:* correct HTML `name` / `autocomplete` attributes on all standard fields so mobile browsers can autofill. `[KAN-20 Concepts §1.4 — see implementation-guidance.md D-01]`

### 4.4 Step 1 action

Full-width primary CTA. Validates all Step 1 required fields before advancing.

---

## 5. Step 2A — Mix Submission

Shown only when `Mix Submission` was selected in Step 1. `[KAN-20 §3.3, §5.2]`

### 5.1 Progress indicator

- Segment 1 shows a green tick (complete): `✔ STEP 1: ABOUT YOU ✔`
- Segment 2 active (filled), labelled **`Your Mix`**
- Mobile: `Step 2 of 2 — Your Mix`

### 5.2 Section heading

`YOUR MIX`

### 5.3 Field order — final `[KAN-20 §5.2]`

✅ Asset statuses resolved by `amendments.md` **AM-01** — minimum 1, maximum 3 per group.

| # | Field | Input type | Status |
|---|---|---|---|
| 1 | **Mix Link** | URL field | Required |
| 2 | **Tracklist** | Textarea (3+ rows, no character limit) | Required |
| 3 | **Mix Notes** | Textarea | Optional |
| 4 | **Image Link 1** | URL field | **Required** `[AM-01]` |
| 5 | **Image Link 2** | URL field | Optional `[AM-01]` |
| 6 | **Image Link 3** | URL field | Optional `[AM-01]` |
| 7 | **Video Link 1** | URL field | **Required** `[AM-01]` |
| 8 | **Video Link 2** | URL field | Optional `[AM-01]` |
| 9 | **Video Link 3** | URL field | Optional `[AM-01]` |
| 10 | **Permission to Contact** | Checkbox | Required |
| 11 | **Permission to Use Assets** | Checkbox | Required |

### 5.4 Assets section — `IMAGES & VIDEO` `[AM-02]`

✅ **Amended.** The accordion pattern is superseded. The asset fields render as a **visible, expanded section** with no collapse control.

- **Section heading: `IMAGES & VIDEO`** — approved copy, matching the ALL-CAPS pattern of `ABOUT YOU` / `YOUR MIX`
- **Not labelled optional.** `Image Link 1` and `Video Link 1` carry the required asterisk; links 2 and 3 carry `(optional)`
- All six links stack vertically on mobile
- Helper text, unchanged from KAN-20: `Accepted: Valid URLs. Links preferred over uploads.`

**Superseded, recorded not deleted** `[KAN-20 §3.3, §4.2, §6]`: the collapsed-by-default accordion, its `(optional)` suffix, its ▼/▲ toggle, and the button label `+ Add image / video links` — which is now **void**, since there is no accordion for it to label. Full record in `amendments.md` **AM-02**.

### 5.5 Consent block

Both checkboxes, exact wording per `field-specification.md` §2. Large checkbox with full text on mobile. Placed last, immediately before the submit action. `[KAN-20 §5.4]`

---

## 6. Step 2B — Demo / Track Submission

Shown only when `Demo / Track Submission` was selected in Step 1. `[KAN-20 §3.4, §5.3]`

### 6.1 Progress indicator

Segment 2 labelled **`Your Demo`**. Mobile: `Step 2 of 2 — Your Demo`.

### 6.2 Section heading

`YOUR DEMO / TRACKS`

### 6.3 Field order — final `[KAN-20 §5.3]`

| # | Field | Input type | Status |
|---|---|---|---|
| 1 | **Track / Demo Links** | Textarea — **not** a single URL field | Required |
| 2 | **Release Status** | Dropdown, 3 fixed values | Optional |
| 3 | **Demo Notes** | Textarea | Optional |
| 4 | **Permission to Contact** | Checkbox | Required |
| 5 | **Permission to Use Assets** | Checkbox | Required |

### 6.4 Design notes

- **There is NO assets section in the Demo path.** Images and videos are Mix-only. **Do not add them here.** `[KAN-20 §3.4]`
- Track / Demo Links accepts multiple links, **one per line**. Each non-empty line is validated as a URL.
- Release Status uses the native mobile dropdown picker on mobile.
- Demo path is a shorter form than the Mix path — this is intended.
- All fields single column, full width on mobile.

---

## 7. Button copy — exact labels, do not change `[KAN-20 §6]`

> *"All button labels are final. Do not change without approval. Labels should use sentence case, not ALL CAPS."*

| Button | Exact label | Notes |
|---|---|---|
| Step 1 — Next | `Next: Your Submission →` | Full-width. Primary CTA. Validates Step 1 before advancing. |
| Step 2 — Back | `← Back` | Secondary. Left-aligned, less prominent than the CTA. Returns to Step 1 with values preserved. |
| Step 2 Mix — Submit | `Send My Mix →` | Full-width. Primary CTA on Mix path. Validates Step 2 before submitting. |
| Step 2 Demo — Submit | `Submit My Demo →` | Full-width. Primary CTA on Demo path. Same behaviour as Mix submit. |
| ~~Assets accordion~~ | ~~`+ Add image / video links`~~ | **VOID** `[AM-02]` — the accordion is superseded by a visible `IMAGES & VIDEO` section. Do not use this label. |

Desktop layout for Step 2: Back left-aligned and smaller, submit CTA right-aligned and bold. On narrow mobile screens Back may stack above the CTA.

---

## 8. Thank-you page — `/submit/thank-you`

Static page, no form. Reached only by redirect on successful submission. `[KAN-20 §8]`

> **Approval status — ⚠️ OQ-15.** KAN-20 §8 states: *"The copy below is **recommended**. Mike should review and adjust the tone or timeframe as needed before go-live."* §8.1 is titled *"Recommended Page Copy"* and KAN-20's own acceptance criteria record it as *"drafted and ready for Mike's review"*. **This copy is therefore reproduced verbatim but is not formally approved.** Build to it; expect it may change.

> **Note carried from KAN-20 §8:** *"'4 weeks' is used as the response timeframe below. Adjust this before going live if LMN's actual expected response time differs. Setting a realistic expectation here directly reduces follow-up emails."*

### 8.1 Recommended page copy — verbatim `[KAN-20 §8.1]`

```
Thank you for your submission.

We have received your submission and our team will review it personally.

What happens next

  • Our team reviews every submission manually — nothing is auto-rejected.
  • We aim to respond within 4 weeks.
  • If your submission is a good fit for LMN, we will be in touch via the email
    address you provided.
  • Please do not send a follow-up email. If you have not heard from us within
    4 weeks, your submission was not the right fit for us at this time — but we
    appreciate you reaching out.

Stay connected

Follow LMN on Instagram and SoundCloud to stay up to date with our events,
releases, mixes, and radio shows.

[ Follow us on Instagram ]   [ Follow us on SoundCloud ]
```

### 8.2 Page behaviour and design

- Success icon: checkmark / tick above the headline
- Headline confirms submission received
- The wireframe indicates *"We have received your [mix / demo / track]"* may be dynamically populated by submission type **if available; otherwise use the generic "submission"**. The approved §8.1 copy above uses the generic form and is the default. `[KAN-20 §3.5]`
- Social CTAs: two buttons, side by side on desktop, full-width and stacked on mobile. Open in a new tab. Brand-aligned styling.
- **No additional form on this page. No newsletter opt-in in V1** — avoid adding friction after submit.

### 8.3 SEO / meta `[KAN-20 §8.2]`

- Robots set to **noindex, nofollow** — *"no index **recommended**"* in KAN-20 (§8.2), to prevent search engines indexing the thank-you page as a standalone destination. Recommended, not mandated — see OQ-15.
- Page title tag: `Submission Received — LMN`
- **Do not link to this page from site navigation.** It should only be reachable via form redirect.

---

## 9. Layout, styling and responsive behaviour

### 9.1 General layout `[KAN-20 §9.2, restated implementation-agnostically]`

- The `/submit` page has a full-width intro/hero section above the form.
- The form is presented on the page itself — the artist is never sent to a third-party form host.
- The form is styled to LMN brand colours.
- **Progress bar:** active step uses LMN primary colour; the completed step shows a tick.
- **Buttons:** full-width on mobile; consistent with LMN CTA button style across the site.
- The thank-you page is a separate static page with static content and no form, with social follow buttons styled consistently.

### 9.2 Mobile-first requirements `[KAN-20 §4, §9.2]`

Mobile wireframes assume a narrow viewport (~375–390px).

| Requirement | Value |
|---|---|
| Layout | Single column, full width — all fields stack |
| Minimum input height | **48px** |
| Minimum font size on inputs | **16px** |
| Progress indicator | Simplified to text: `Step 1 of 2` / `Step 2 of 2` |
| Radio buttons | Large tap targets |
| Accordion label | Full-width tap target |
| CTA button | Full-width, bold text, min 48px height |
| Consent checkboxes | Large checkbox + full text |
| Tested breakpoints | **375px, 414px, 768px minimum** |

Rationale: *"Text under 16px, touch targets under 48px, or multi-column layouts all dramatically reduce completion on mobile — which is where a significant share of music artists will submit from."* `[KAN-20 Concepts §1.3 — rationale only; the 48px/16px values themselves are requirements from the approved KAN-20 §4]`

### 9.3 Brand tokens

`TBD — DECISION REQUIRED`. KAN-20 references "LMN brand colours", "LMN primary colour" and "LMN CTA button style" without specifying values. Exact hex values, font families and the logo/wordmark asset are needed. See `open-questions.md` **OQ-13**.

**Prototype guidance** *(category D — `implementation-guidance.md` **D-02**)*: use neutral placeholder styling and isolate all brand values as variables/tokens in one place so they can be swapped once confirmed. **Styling the form to LMN brand is authoritative `[KAN-20 §9.2]`; tokenising the values is engineering convenience, not a requirement.** Do not invent a brand palette and present it as approved.

---

## 10. Future enhancement — Concept C integration `[KAN-20 §9.4]`

**Not part of V1. Do not build.** Recorded so that V1 is not built in a way that blocks it.

When Concept C (Type-First Card Selection) is implemented in V1.1 or V2, the following approach avoids rebuilding the two-step form:

1. Create a new static page at `/submit` as the card landing.
2. Design two cards: **"Submit a Mix"** and **"Submit a Demo / Track"**.
3. Each card links directly to the existing two-step form with the appropriate type pre-selected via a URL parameter, e.g. `/submit-form?type=mix`.
4. The two-step form pre-selects the correct radio button based on the URL parameter and hides the type selector if a type has been passed in.
5. The existing two-step form at its current URL continues to work as a direct access URL if the card landing is bypassed.

This adds the card landing as a marketing layer without rebuilding the form.

**Implication for V1: none. Do not build the URL-parameter capability now.** KAN-20 §1.2 is explicit that *"No design or build work for Concept C should be initiated in V1."* The mechanism is recorded here so the V1 form is not architected in a way that makes it hard to add later — not as a V1 requirement.

---

## 11. Design rationale — from the KAN-20 concept research

`[KAN-20 Concepts §1.2–1.4 — historical draft, not an approved requirements source]`

These findings sit behind the decisions recorded above. They explain **why** the approved design is shaped as it is, and should not be argued against during implementation — but they are **rationale, not requirements**. Where one of them is a requirement, it appears as such elsewhere in this document with an approved citation.

**No item in this list is an approved product requirement.** Browser autofill support was elevated to REQ-39 by KAN-19 — but KAN-19 is itself retired as a decision document, so that elevation does not survive it. Autofill is retained as **implementation guidance D-01**, not as signed-off scope. See `implementation-guidance.md` §6.

- **Conditional logic** — show only fields relevant to what the user is submitting. Every irrelevant field shown increases cognitive load and abandonment risk.
- **Single-column layout** — completed faster than multi-column; the eye scans naturally top to bottom.
- **Labels above fields** — top-aligned labels require fewer visual fixations than inline or side-by-side labels.
- **Grouped sections** — grouping related fields under clear subheadings reduces perceived form length even when field count is unchanged.
- **Inline validation on blur** — error feedback when the user leaves a field (not during typing, not only on submit) reduces frustration and abandonment.
- **Positive confirmation signals** — green ticks on passing validation build confidence and momentum.
- **Multi-step forms** — outperform single-page forms for longer flows; the sunk-cost effect keeps users engaged after Step 1.
- **Progress indicators** — reduce anxiety about how much remains.
- **Browser autofill support** — correct HTML autocomplete attributes let users complete standard fields in two taps on mobile.
- **Motivational framing** — intro copy should answer "why should I spend time on this?". Emphasising that LMN listens to all submissions and responds is a significant trust signal.
- **Outcome-labelled buttons** — buttons labelled with the outcome ("Send My Mix") outperform generic "Submit".
- **No CAPTCHA** — CAPTCHAs reduce form completion by up to 30%. Honeypot preferred. *(The no-CAPTCHA decision itself is a requirement from the approved KAN-20 §9.1/§9.3; the 30% figure is research rationale from the concepts draft.)* See `open-questions.md` **OQ-05**.
- **Links not uploads** — requiring file uploads instead of streaming links is consistently cited as a major friction point.
- **Bio placed late** — placing the optional bio early signals the user must write something polished before proceeding, creating a false barrier.
