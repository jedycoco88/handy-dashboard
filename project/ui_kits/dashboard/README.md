# Operations Dashboard — UI Kit

A high-fidelity, interactive recreation of the **one-window operations dashboard** for Handy
Services PH: the tool that replaces scattered GHL pipeline views + n8n alerts with a single
branded workspace. Dark-first, blue + amber, PH locale.

> This is a **UI kit** (cosmetic, click-through fidelity), not production code. Components are
> simplified but pixel-faithful to the system's foundations.

## Run it
Open `index.html`. Everything is interactive:
- **Sidebar** — switch between Overview / Pipeline / Inbox / Calendar (collapsible).
- **Overview** — animated KPI cards, pipeline funnel, today's schedule, "needs attention" cards.
  Click any schedule row or attention card → opens the **booking drawer**.
- **Pipeline** — horizontally-scrolling kanban that mirrors the real 27-stage GHL board, with
  group filter chips. Click a card → booking drawer.
- **Inbox** — unified conversations (Messenger / WhatsApp / SMS / Instagram / Viber), live
  message thread you can type into, and a linked-booking context panel.
- **Calendar** — week view with scheduled jobs colored by stage. Click an event → drawer.
- **Booking drawer** — stage timeline, client + HP, payment breakdown, notes, actions.

## Files
| File | Purpose |
|---|---|
| `index.html` | App shell + `App` component; loads React/Babel/Lucide and all parts. |
| `styles.css` | All kit styles (depends on `../../colors_and_type.css` tokens). |
| `ui.jsx` | Primitives: `Icon`, `Avatar`, `Badge`, `Button`, `Count`, `peso()`. |
| `data.jsx` | Mock data: pipeline stages/groups, GHL counts, bookings, conversations. |
| `Chrome.jsx` | `Sidebar`, `Topbar`, `Logo`. |
| `Overview.jsx` | `Overview`, KPI cards (count-up), funnel, schedule, attention grid. |
| `Pipeline.jsx` | `Pipeline` kanban + `KanbanCard`. |
| `Inbox.jsx` | `Inbox`, conversation rows, thread, composer, context panel. |
| `Calendar.jsx` | `Calendar` week grid + events. |
| `BookingDetail.jsx` | `BookingDetail` drawer + `StageTimeline`. |

## Conventions (so parts compose cleanly)
- Each `.jsx` is a separate Babel script with its own scope; every component is exported to
  `window` at the bottom (`Object.assign(window, {…})`). Add new parts the same way and load
  them before the inline `App` script in `index.html`.
- Icons render via the `Icon` component (imperative Lucide) — safe across React re-renders.
- Pipeline stage colors come from `STAGE_COLOR[stageName]` → `{ color, soft, group }`.
- Money is always `peso(n)` (₱ + en-PH grouping) in JetBrains Mono.

## Coverage & gaps
Covered: Overview, Pipeline, Inbox, Calendar, Booking detail, sidebar/topbar chrome, buttons,
badges, avatars, KPI cards, kanban cards, conversation rows, message bubbles, composer.

Intentionally stubbed (empty states only — not designed yet, no source to copy): **Clients**,
**Handy Pros**, **Payments**, **Settings**. These show a "Not in this kit yet" placeholder so
navigation stays coherent. Say the word and I'll build any of them out.
