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

export function Overview({ openBooking, setView }) {
  const funnel = [
    ["New Inquiry", 134], ["For Follow Up", 672], ["Quotation", 48],
    ["For Downpayment", 6], ["Confirmed", 9], ["Job In Progress", 0], ["Job Completed", 14],
  ].map(([l, c]) => {
    const sc = STAGE_COLOR[l] || STAGE_COLOR["New Inquiry"]
    return { label: l, count: c, color: sc.color, soft: sc.soft }
  })
  const max = Math.max(...funnel.map(f => f.count))
  const today = BOOKINGS.filter(b => b.when.startsWith("Today") || b.stage === "Today's Booking")
  const inquiries = BOOKINGS.filter(b => b.stage === "New Inquiry" || b.stage === "Worker options sent")

  return (
    <div className="scroll">
      <div className="overview">
        <div className="kpi-grid">
          <Kpi label="New Inquiry" value={134} icon="inbox"
            color="var(--stage-inquiry)" soft="var(--stage-inquiry-soft)"
            delta="+12 today" deltaTone="var(--success)" />
          <Kpi label="Confirmed" value={31} icon="calendar-check"
            color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)"
            delta="8 today · 23 upcoming" deltaTone="var(--fg-3)" />
          <Kpi label="For Payment" value={87250} money icon="wallet"
            color="var(--stage-payment)" soft="var(--stage-payment-soft)"
            delta="6 awaiting downpayment" deltaTone="var(--warning)" />
          <Kpi label="Completed (mo.)" value={142} icon="circle-check-big"
            color="var(--stage-completed)" soft="var(--stage-completed-soft)"
            delta="₱428,500 collected" deltaTone="var(--success)" />
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
