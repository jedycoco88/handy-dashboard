import { useState } from 'react'
import { Sidebar, Topbar } from './components/Chrome.jsx'
import { Overview } from './views/Overview.jsx'
import { Pipeline } from './views/Pipeline.jsx'
import { Inbox } from './views/Inbox.jsx'
import { Calendar } from './views/Calendar.jsx'
import { BookingDetail } from './views/BookingDetail.jsx'
import { Icon, Badge } from './components/ui.jsx'

const STUB_SCREENS = {
  clients:  ["users",    "Clients",    "A unified CRM of every client — contact details, booking history, and lifetime value."],
  hps:      ["hard-hat", "Handy Pros", "Your roster of vetted workers — skills, ratings, availability, and payout status."],
  payments: ["wallet",   "Payments",   "Downpayments, balances, HP payouts, and e-receipts in one ledger."],
  settings: ["settings", "Settings",   "Pipeline stages, automations (n8n), channels, and team access."],
}

function ComingSoon({ view }) {
  const [icon, title, body] = STUB_SCREENS[view] || ["circle-dashed", "Coming soon", ""]
  return (
    <div className="scroll" style={{ flex: 1 }}>
      <div className="coming-soon">
        <span className="kpi-ic" style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg-2)", color: "var(--fg-2)" }}>
          <Icon name={icon} size={26} />
        </span>
        <h2 style={{ margin: 0, color: "var(--fg-1)" }}>{title}</h2>
        <p style={{ maxWidth: 380, margin: 0, lineHeight: 1.55, color: "var(--fg-3)" }}>{body}</p>
        <Badge color="var(--accent)" soft="var(--accent-soft)">Not in this kit yet</Badge>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState("overview")
  const [collapsed, setCollapsed] = useState(false)
  const [booking, setBooking] = useState(null)

  let main
  if (view === "overview")  main = <Overview openBooking={setBooking} setView={setView} />
  else if (view === "pipeline") main = <Pipeline openBooking={setBooking} />
  else if (view === "inbox")    main = <Inbox openBooking={setBooking} />
  else if (view === "calendar") main = <Calendar openBooking={setBooking} />
  else main = <ComingSoon view={view} />

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main">
        <Topbar view={view} onNewBooking={() => setView("pipeline")} />
        <div className="view">{main}</div>
      </div>
      {booking && <BookingDetail booking={booking} onClose={() => setBooking(null)} />}
    </div>
  )
}
