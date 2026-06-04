---
name: handy-services-ph-design
description: Use this skill to generate well-branded interfaces and assets for Handy Services PH (a home & handyman services marketplace in the Philippines), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark-first operations dashboard.
user-invocable: true
---

Read the `README.md` file within this skill first — it covers the business (a two-sided
marketplace connecting Clients with Handy Pros / "HPs"), the real booking pipeline, content
voice, visual foundations, and iconography. Then explore the other files:

- `colors_and_type.css` — import this in every artifact. Dark surface ramp, blue primary +
  amber accent, semantic + pipeline-stage + channel colors, type scale, spacing, radii, shadows.
- `fonts/` — Plus Jakarta Sans (UI) + JetBrains Mono (data). Loaded from Google Fonts CDN.
- `assets/logo-wordmark.html` — placeholder wordmark (swap for the official logo when available).
- `preview/` — small specimen cards for every token group; good reference for component looks.
- `ui_kits/dashboard/` — the interactive Operations Dashboard kit (overview, pipeline kanban,
  unified inbox, calendar, booking drawer). Reusable JSX components, each exported to `window`.

When creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need
out of this skill and produce static HTML files for the user to view. When working on production
code, copy assets and read the rules here to design as an expert in this brand.

If the user invokes this skill without other guidance, ask what they want to build, ask a few
focused questions (surface, audience, fidelity, variations), then act as an expert designer who
outputs HTML artifacts _or_ production code as the need dictates.

Brand quick-reference:
- Voice: operations co-pilot — calm, concrete, warm Filipino tone; address the operator as "you".
- Channels: Messenger, SMS, Instagram, Viber (no WhatsApp/Email).
- Money: ₱ + en-PH grouping, monospace tabular. Use the term "HP" for Handy Pro.
- Default to dark UI; color carries meaning (stage/channel/status), not decoration.

Flags / open items: official logo, brand typeface, and exact brand hex are provisional stand-ins
— confirm with the client before shipping production work.
