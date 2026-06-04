# Handy Services PH — Design System

A dark-first **operations dashboard** design system for Handy Services PH, a home & handyman
services marketplace operating in the Philippines. This system exists to replace a sprawling
GoHighLevel (GHL) pipeline view + scattered n8n automations with **one window**: live inquiry
counts, the booking pipeline, a unified conversation inbox, and customer/booking detail — all
branded, all in one place.

> **Status:** Foundations + Operations Dashboard UI kit. Built from the client's real GHL
> pipeline (see Sources). Brand identity is **provisional** — see Caveats at the bottom.

---

## What the business is

Handy Services PH connects **Clients** (people who need home work done) with **Handy Pros (HPs)** —
vetted workers. It is a **two-sided marketplace** with a human-in-the-loop ops team that triages
inquiries, matches HPs, quotes jobs, collects downpayment, confirms the booking, and follows the
job through to completion, receipt, and payout.

**Key vocabulary** (use these terms verbatim in copy):
- **HP** = *Handy Pro* — the worker/service provider. ("HP Applications", "HP Matching", "HP Payment".)
- **Client** — the customer booking a service.
- **Opportunity / Booking** — a single job moving through the pipeline.
- **Downpayment / Full Payment / E-Receipt** — the money flow.
- **NCNS** = *No Call No Show*. **Rework** = a complaint that requires redoing the job.

### Service catalog (used for realistic sample content)
- **Cleaning** — regular, deep, special, post-reno (all grouped as "Cleaning")
- **Skilled services** — Plumbing, Electrical, Carpentry, Masonry, Painting, Welding
- **House-related** — Laundry, Ironing, Cooking, Gardening, Driver

### The real pipeline (read from the client's GHL board)
In board order, with the dashboard groupings this system uses:

| Group | Stages (verbatim labels) |
|---|---|
| **Inquiry** | New Inquiry · For Follow Up · Info Incomplete · Out of Service Area – Waitlist |
| **Intake (HP supply)** | HP Applications |
| **Matching** | For HP Matching (House R…) · Worker options sent · Worker assigned · For HP Matching (Skilled) · No HP Match |
| **Quotation** | Assessment/Quotation (Cleaning) · Assessment/Quotation (Skilled) |
| **Payment** | FaceCard / For Downpayment · Downpayment verification · HP Payment · Full Payment Confirmation · E-Receipt Sent |
| **Confirmed & Scheduled** | Confirmed · Today's Booking |
| **In Progress** | Job In Progress |
| **Completed** | Job Completed |
| **Issues / Tail** | Cancelled by Client · Cancelled by HP · Complaint_Rework · For Reschedule · NCNS · Dump |

The dashboard **groups** these for KPIs and a swimlane kanban; the full granular stages remain
selectable as kanban columns so it stays faithful to the team's existing workflow.

---

## Sources

The system was reverse-engineered from these client-provided sources. Reader may not have
access; stored here for traceability:

1. **GHL "Open opportunities" pipeline** — two screenshots (`uploads/pasted-1780560242720-0.png`,
   `uploads/pasted-1780560251390-0.png`) showing all 27 pipeline stages and live counts as of capture.
2. **Verbal brief** — current stack is GoHighLevel (CRM) + n8n (automation); the ask is a single
   unified dashboard for inquiries, confirmed bookings, payment status, conversations, and bookings.
3. **Stated brand direction** — trustworthy & professional + friendly & approachable + local
   Filipino warmth; **dark** dashboard; **orange + navy** palette (from the official logo); PHP currency, PH locale.

**Brand colors (sampled from the logo):** orange `#ff6000`, navy `#003090`.

**Provided:** official logo (`assets/handy-icon.png` mark + `assets/handy-logo.png` wordmark).
**Not provided (flagged):** brand typeface, vector (SVG) logo, brand color codes (sampled from PNG). These are
substituted with documented stand-ins — see Caveats.

---

## CONTENT FUNDAMENTALS

How copy is written across the dashboard. The voice is an **operations co-pilot**: calm,
concrete, and respectful of a busy ops team's time. Trustworthy-professional in structure,
warm-Filipino in tone — never stiff, never cutesy.

- **Person:** Address the operator as **you** ("You have 12 inquiries waiting"). Refer to the
  marketplace sides by role — **Client** and **HP** — never "user" or "customer #".
- **Casing:**
  - UI labels & buttons → **Sentence case** ("Assign HP", "Send quote", "Mark as confirmed").
  - Section eyebrows & table headers → **UPPERCASE** with wide tracking ("PIPELINE", "TODAY").
  - Pipeline stage names → preserve the team's **existing capitalization** exactly
    (e.g. "Job Completed", "HP Payment", "NCNS") so it matches their muscle memory.
- **Numbers & money:** Always **monospace, tabular** figures. Money is **₱** with thousands
  separators and no decimals for whole pesos ("₱2,500", "₱18,750"). Counts are bare integers.
- **Time:** Relative for recency ("4m ago", "2h ago", "Yesterday"), absolute for schedule
  ("Tue, Jun 9 · 9:00 AM"). 12-hour clock with AM/PM (PH convention).
- **Tone examples:**
  - Empty state: *"All caught up — no inquiries waiting. Nice."*
  - Confirmation: *"Booking confirmed. We've notified the Client and the assigned HP."*
  - Warning: *"Downpayment not yet verified. Confirm only after it clears."*
  - Nudge: *"3 inquiries have been waiting over 24h. Worth a follow-up?"*
- **Language:** Primary English; light **Taglish** is welcome in *sample conversation content*
  to feel local ("Sige po, book na po tayo for Tuesday"), but **never in UI chrome** (labels,
  buttons, system messages stay clean English).
- **Emoji:** **Not** used in UI chrome. Allowed only inside sample chat messages where a real
  customer would use them. Status is communicated with color + icon, never emoji.
- **Vibe:** Like a sharp dispatcher who has your back — short sentences, active voice, leads
  with the number or the action, ends with a clear next step.

---

## VISUAL FOUNDATIONS

The look: a **calm, dark control room** carrying the brand's **orange + navy** identity. Energetic
orange drives action; navy grounds the surfaces; a lighter brand blue handles structure & chat.
High legibility, generous spacing, restrained color — color earns its place by carrying meaning
(pipeline stage, channel, status), not decoration.

- **Color usage:** Dark navy-tinted surface ramp (`--bg-0…4`) drawn from the logo's navy. **Orange**
  `#ff6000` (`--primary`) is the brand action color — primary buttons, active nav, focus, brand
  mark — used with intent, not as large fills. **Brand blue** `#4d82e8` (`--accent`, lightened
  navy) carries information, structure, selected/sent-message states. Stage/channel hues are muted
  and only appear as small chips,
  left-borders on kanban columns, and dots.
- **Background:** Flat dark surfaces, **no photographic backgrounds**, **no busy patterns**.
  At most a single very-subtle radial sheen behind the top of the app canvas. Depth comes from
  the surface ramp + hairline borders, not gradients. (One restrained brand gradient — orange→navy
  — is permitted on marketing/empty-hero moments only.)
- **Type:** Plus Jakarta Sans for everything UI; JetBrains Mono for any number that can be
  counted, summed, or copied (counts, money, IDs, timestamps). Big KPI numerals are the loudest
  thing on the dashboard.
- **Spacing:** 4px base scale. Dashboard density is **comfortable, not cramped** — 16–24px
  panel padding, 8–12px between related controls. Kanban columns are tight (8px gaps) since they
  hold many cards.
- **Corner radii:** Soft but not bubbly. Buttons/inputs/cards `--r-md` (10px); large panels
  `--r-lg` (14px); chips/avatars pill or circle. Nothing sharp (0px) except table cell edges.
- **Cards:** `--bg-1` or `--bg-2` fill, 1px `--border-2` edge, `--r-lg` corners, `--shadow-md`.
  No heavy borders, no colored left-accent-bar gimmick **except** kanban columns, where a 3px
  top/left stage-colored bar is the intentional system motif. KPI cards add a faint inner top
  highlight (`inset 0 1px 0 rgba(255,255,255,0.04)`) to read as raised glass.
- **Borders:** Hairlines only — `--border-1` for internal separators, `--border-2` for card and
  input edges. Focus uses a 2px `--primary-ring` glow, not a thick border.
- **Shadows:** Soft, dark, diffuse (tuned for dark UI). Popovers/menus get `--shadow-pop`;
  cards `--shadow-md`; the only "glow" is the primary focus ring (`--glow-primary`).
- **Transparency & blur:** Used for **overlays** (modal scrim `rgba(0,0,0,0.55)` + 2px backdrop
  blur) and **sticky headers** (panel bg at 80% + 8px blur). Soft fade gradients ("protection
  gradients") mask the top/bottom of scrolling lists so content fades rather than hard-cuts.
- **Imagery:** Avatars are circular, warm-toned; if no photo, a colored initials chip keyed to
  the name. Service thumbnails (if any) are square `--r-md`. Imagery skews **warm and natural**,
  not cold/corporate stock.
- **Animation:** Quick and physical. `--ease-out` for enters (120–200ms), gentle. Cards lift
  1px and brighten one surface step on hover. Press shrinks to `scale(0.98)`. Counts can
  count-up on load. **No** bouncy/springy overshoot, **no** infinite looping decoration.
  Respect `prefers-reduced-motion`.
- **Hover states:** Surfaces step **lighter** by one ramp level (`--bg-1`→`--bg-2`); primary
  buttons go to `--primary-hover`; text links go from `--fg-2`→`--fg-1`. Cursor pointer on
  anything actionable.
- **Press states:** `scale(0.98)` + `--primary-press` for primary; brief.
- **Layout rules:** Fixed left **sidebar** (collapsible), fixed top **command bar** (search +
  filters + new-booking). Content scrolls within panels, chrome stays put. Max content width is
  unconstrained (this is an internal ops tool — use the screen), but text columns cap ~72ch.

---

## ICONOGRAPHY

- **Icon set:** **Lucide** (https://lucide.dev) — clean 1.5–2px stroke, rounded line caps, 24px
  grid. It matches the friendly-but-professional voice and pairs well with Plus Jakarta Sans.
  Loaded from CDN (`lucide@latest`) and rendered as inline SVG via `data-lucide` attributes.
  **SUBSTITUTION FLAG:** the client's GHL uses its own column-header glyphs; Lucide is the
  closest open stand-in until a brand icon decision is made.
- **Weight & size:** Default 18–20px in toolbars/nav, 16px inline with text, 14px in chips.
  Stroke 1.75px. Icons inherit `currentColor`; tint with stage/semantic vars when meaningful.
- **Channel icons:** Glyphs for the live inquiry channels — **Messenger / SMS / Instagram /
  Viber** — each tinted with its `--ch-*` color. (WhatsApp and Email are not used by Handy
  Services PH.) These are the one place brand-colored icons appear.
  **SUBSTITUTION FLAG:** Lucide removed its brand logos (Facebook/Instagram) for licensing, so
  channels use generic chat/camera/phone glyphs carried by the channel's brand *color*.
  If true brand logos are required, drop official SVGs into `assets/channels/`.
- **SVG vs PNG:** All icons are **SVG** (Lucide inline). No PNG icon sprites.
- **Emoji as icons:** **Never** in UI chrome. (Only inside sample chat content.)
- **Unicode as icons:** Only `₱` (peso, via `.ds-money`) and arrow/chevron glyphs are acceptable
  as text; everything else is a Lucide SVG.
- **Logo:** The **official Handy Services PH logo** — a roof + handshake forming an "H" in orange
  & navy. Files: `assets/handy-icon.png` (mark, white ground), `assets/handy-logo.png` (wordmark),
  and `assets/handy-icon-cut.png` — a **background-knocked-out** version (white flood-filled to
  transparent) that floats cleanly on the dark UI; this is what the sidebar uses. The white-ground
  PNG inside a white rounded chip is the fallback. **FLAG:** a true vector **SVG** would still be
  ideal for crisp scaling at any size — the cut PNG is raster (225×225).

---

## File index (manifest)

Root:
- **README.md** — this file. Company context, content & visual foundations, iconography, index.
- **colors_and_type.css** — all design tokens: dark color ramp, brand/semantic/stage/channel
  colors, type scale, spacing, radii, shadows, motion. Import this in every artifact.
- **SKILL.md** — Agent-Skill manifest so this folder works as a downloadable Claude skill.
- **fonts/** — webfont notes & (when finalized) self-hosted `.woff2` files.
- **assets/** — `handy-icon.png` (mark, white bg), `handy-icon-cut.png` (transparent, for dark UI),
  `handy-logo.png` (wordmark), `logo-wordmark.html` (usage sheet) + future brand imagery.
- **preview/** — small HTML specimen cards that populate the Design System tab
  (type, colors, spacing, components, brand).

UI kits:
- **ui_kits/dashboard/** — the Operations Dashboard kit. `index.html` is an interactive
  click-through (overview → kanban → inbox → calendar → booking detail). JSX components are
  modular and reusable. See its own `README.md`.

> No slide template was provided, so `slides/` is intentionally omitted.

---

## Caveats / open items
- **Logo:** official logo received as **white-background PNG** (confirmed: no transparent source).
  I generated `handy-icon-cut.png` (background knocked out) for the dark UI. A true **vector SVG**
  would still be ideal for crisp scaling — send one if it ever exists.
- **Typeface:** Plus Jakarta Sans + JetBrains Mono are documented stand-ins. Confirm or replace.
- **Brand colors:** orange `#ff6000` + navy `#003090` — **confirmed correct** by the client.
- **Pipeline groupings** are my interpretation of the 27 GHL stages — tell me if any stage
  belongs in a different group.
