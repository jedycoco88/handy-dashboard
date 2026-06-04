import { useState, useEffect } from 'react'
import { Icon, Avatar, Badge, Button } from '../components/ui.jsx'
import { STAGE_COLOR, BOOKINGS, peso } from '../data.js'

function CountUp({ value, money }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf, start, done = false
    const dur = 700
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) raf = requestAnimationFrame(step)
      else done = true
    }
    raf = requestAnimationFrame(step)
    const fallback = setTimeout(() => { if (!done) setN(value) }, dur + 120)
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback) }
  }, [value])
  return <span>{money ? peso(n) : n.toLocaleString("en-PH")}</span>
}

function Kpi({ label, value, money, icon, color, soft, delta, deltaTone }) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <span className="eyebrow">{label}</span>
        <span className="kpi-ic" style={{ background: soft, color }}><Icon name={icon} size={18} /></span>
      </div>
      <div className="kpi-num"><CountUp value={value} money={money} /></div>
      <div className="kpi-delta" style={{ color: deltaTone }}>{delta}</div>
    </div>
  )
}

function FunnelRow({ label, count, max, color }) {
  return (
    <div className="funnel-row">
      <span className="funnel-label">{label}</span>
      <div className="funnel-track">
        <div className="funnel-fill" style={{ width: Math.max((count / max) * 100, count ? 3 : 0) + "%", background: color }} />
      </div>
      <span className="funnel-count">{count}</span>
    </div>
  )
}

export function Overview({ openBooking, setView, liveData }) {
  const counts = liveData?.counts || {}
  const funnelStages = [
    "New Inquiry", "For Follow Up", "Assessment/Quotation (Cleaning)",
    "FaceCard / For Downpayment", "Confirmed", "Job In Progress", "Job Completed",
  ]
  const funnel = funnelStages.map(l => {
    const sc = STAGE_COLOR[l] || STAGE_COLOR["New Inquiry"]
    return { label: l, count: counts[l] ?? 0, color: sc.color, soft: sc.soft }
  })
  const max = Math.max(...funnel.map(f => f.count), 1)

  const liveBookings = liveData?.bookings || []
  const allBookings = liveBookings.length > 0 ? liveBookings : BOOKINGS
  const today = allBookings.filter(b => b.stage === "Today's Booking" || b.stage === "Job In Progress")
  const inquiries = allBookings.filter(b => b.stage === "New Inquiry" || b.stage === "Worker options sent").slice(0, 8)

  const newInquiry = counts["New Inquiry"] ?? 134
  const confirmed = (counts["Confirmed"] ?? 0) + (counts["Today's Booking"] ?? 0)
  const paymentTotal = liveData?.paymentTotal ?? 87250
  const completedMo = liveData?.completedThisMonth ?? 142

  return (
    <div className="scroll">
      <div className="overview">
        <div className="kpi-grid">
          <Kpi label="New Inquiry" value={newInquiry} icon="inbox"
            color="var(--stage-inquiry)" soft="var(--stage-inquiry-soft)"
            delta={liveData ? "live from GHL" : "sample data"} deltaTone="var(--success)" />
          <Kpi label="Confirmed" value={confirmed} icon="calendar-check"
            color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)"
            delta={`${counts["Today's Booking"] ?? 0} today`} deltaTone="var(--fg-3)" />
          <Kpi label="For Payment" value={paymentTotal} money icon="wallet"
            color="var(--stage-payment)" soft="var(--stage-payment-soft)"
            delta={`${(counts["FaceCard / For Downpayment"] ?? 0) + (counts["Downpayment verification"] ?? 0)} awaiting`} deltaTone="var(--warning)" />
          <Kpi label="Completed (mo.)" value={completedMo} icon="circle-check-big"
            color="var(--stage-completed)" soft="var(--stage-completed-soft)"
            delta={liveData ? "this month" : "sample data"} deltaTone="var(--success)" />
        </div>

        <div className="overview-cols">
          <section className="panel">
            <div className="panel-h">
              <h3>Pipeline funnel</h3>
              <Button variant="subtle" onClick={() => setView("pipeline")}>
                Open board <Icon name="arrow-right" size={14} />
              </Button>
            </div>
            <div className="funnel">
              {funnel.map(f => <FunnelRow key={f.label} {...f} max={max} />)}
            </div>
          </section>

          <section className="panel">
            <div className="panel-h">
              <h3>Today's schedule</h3>
              <Badge color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)" dot>
                {today.length} jobs
              </Badge>
            </div>
            <div className="sched-list">
              {today.map(b => (
                <button key={b.id} className="sched-row" onClick={() => openBooking(b)}>
                  <span className="sched-time">{b.when.replace("Today · ", "")}</span>
                  <span className="sched-bar" style={{ background: (STAGE_COLOR[b.stage] || {}).color }} />
                  <span className="sched-mid">
                    <b>{b.service}</b>
                    <small><Icon name="map-pin" size={12} />{b.city} · {b.hp || "Unassigned"}</small>
                  </span>
                  <Avatar name={b.client} size={30} />
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="panel">
          <div className="panel-h">
            <h3>Needs attention</h3>
            <Button variant="subtle" onClick={() => setView("pipeline")}>View all</Button>
          </div>
          <div className="attn-grid">
            {inquiries.map(b => (
              <button key={b.id} className="attn-card" onClick={() => openBooking(b)}>
                <div className="attn-top">
                  <Avatar name={b.client} size={32} channel={b.channel} />
                  <span className="attn-name">{b.client}</span>
                  <Badge
                    color={(STAGE_COLOR[b.stage] || {}).color}
                    soft={(STAGE_COLOR[b.stage] || {}).soft}
                    dot>
                    {b.stage}
                  </Badge>
                </div>
                <p className="attn-note">{b.note}</p>
                <div className="attn-foot">
                  <span><Icon name="wrench" size={13} />{b.service}</span>
                  <span><Icon name="map-pin" size={13} />{b.city}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
