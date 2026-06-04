import { useState, useEffect } from 'react'
import { Icon } from '../components/ui.jsx'
import { STAGE_COLOR } from '../data.js'

function CountUp({ value, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf, start
    const dur = 800
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / dur, 1)
      setN(parseFloat(((1 - Math.pow(1 - p, 3)) * value).toFixed(1)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <span>{typeof value === 'number' && !Number.isInteger(value) ? n.toFixed(1) : Math.round(n).toLocaleString('en-PH')}{suffix}</span>
}

function Stat({ label, value, sub, icon, color, soft, suffix = '' }) {
  return (
    <div className="ceo-stat">
      <div className="ceo-stat-top">
        <span className="eyebrow">{label}</span>
        <span className="kpi-ic" style={{ background: soft, color }}><Icon name={icon} size={18} /></span>
      </div>
      <div className="ceo-num"><CountUp value={value} suffix={suffix} /></div>
      <div className="ceo-sub">{sub}</div>
    </div>
  )
}

function FunnelStep({ label, value, max, color }) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 4 : 0) : 0
  return (
    <div className="ceo-funnel-row">
      <span className="ceo-funnel-label">{label}</span>
      <div className="ceo-funnel-track">
        <div className="ceo-funnel-fill" style={{ width: pct + '%', background: color }} />
      </div>
      <span className="ceo-funnel-n">{value}</span>
    </div>
  )
}

export function Overview({ openBooking, setView, liveData }) {
  const d = liveData || {}
  const counts = d.counts || {}

  const todayInquiries  = d.todayInquiries  ?? 0
  const weekConfirmed   = d.weekConfirmed   ?? 0
  const todayScheduled  = d.todayScheduled  ?? 0
  const completedMonth  = d.completedThisMonth ?? 0
  const conversionRate  = parseFloat(d.conversionRate || '0')
  const monthInquiries  = d.monthInquiries  ?? 0
  const isLive          = !!liveData

  const funnelSteps = [
    { label: 'New Inquiry',    key: 'New Inquiry',    color: STAGE_COLOR['New Inquiry']?.color },
    { label: 'For Follow Up',  key: 'For Follow Up',  color: STAGE_COLOR['For Follow Up']?.color },
    { label: 'Confirmed',      key: 'Confirmed',      color: STAGE_COLOR['Confirmed']?.color },
    { label: 'Job In Progress',key: 'Job In Progress',color: STAGE_COLOR['Job In Progress']?.color },
    { label: 'Completed',      key: 'Job Completed',  color: STAGE_COLOR['Job Completed']?.color },
  ].map(s => ({ ...s, value: counts[s.key] || 0 }))
  const funnelMax = Math.max(...funnelSteps.map(s => s.value), 1)

  return (
    <div className="scroll">
      <div className="ceo-dash">
        <div className="ceo-live-tag">
          <span className={`live-dot ${isLive ? 'on' : 'off'}`} />
          {isLive ? 'Live · refreshes every 60s' : 'Sample data · n8n not connected'}
        </div>

        <div className="ceo-grid">
          <Stat label="New Inquiries Today"    value={todayInquiries} icon="inbox"
            color="var(--stage-inquiry)" soft="var(--stage-inquiry-soft)"
            sub="from GHL pipeline" />
          <Stat label="Confirmed This Week"    value={weekConfirmed} icon="calendar-check"
            color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)"
            sub="moved to confirmed or beyond" />
          <Stat label="Scheduled Today"        value={todayScheduled} icon="clock"
            color="var(--accent)" soft="var(--accent-soft)"
            sub="Today's Booking stage" />
          <Stat label="Completed This Month"   value={completedMonth} icon="circle-check-big"
            color="var(--stage-completed)" soft="var(--stage-completed-soft)"
            sub="Job Completed stage" />
          <Stat label="Conversion Rate MTD"    value={conversionRate} suffix="%"
            icon="trending-up"
            color="var(--success)" soft="rgba(34,197,94,0.12)"
            sub={`${completedMonth} completed / ${monthInquiries} inquiries`} />
        </div>

        <div className="ceo-funnel-panel">
          <div className="panel-h"><h3>Pipeline snapshot</h3></div>
          <div className="ceo-funnel">
            {funnelSteps.map(s => (
              <FunnelStep key={s.label} label={s.label} value={s.value} max={funnelMax} color={s.color || 'var(--fg-3)'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
