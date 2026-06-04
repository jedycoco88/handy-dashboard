/* global React, Icon, Avatar, Badge, Button, peso, STAGE_COLOR, BOOKINGS, PIPELINE_COUNTS */
// Overview / dashboard home.

function CountUp({ value, money }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf, start, done = false;
    const dur = 700;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(step); else done = true;
    };
    raf = requestAnimationFrame(step);
    // Guarantee the final value lands even if rAF is throttled (e.g. background tab).
    const fallback = setTimeout(() => { if (!done) setN(value); }, dur + 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); };
  }, [value]);
  return <span>{money ? peso(n) : n.toLocaleString("en-PH")}</span>;
}

function Kpi({ label, value, money, icon, color, soft, delta, deltaTone }) {
  return (
    <div className="hs-kpi">
      <div className="hs-kpi-top">
        <span className="hs-eyebrow">{label}</span>
        <span className="hs-kpi-ic" style={{ background: soft, color }}><Icon name={icon} size={18} /></span>
      </div>
      <div className="hs-kpi-num"><CountUp value={value} money={money} /></div>
      <div className="hs-kpi-delta" style={{ color: deltaTone }}>{delta}</div>
    </div>
  );
}

function FunnelRow({ label, count, max, color, soft }) {
  return (
    <div className="hs-funnel-row">
      <span className="hs-funnel-label">{label}</span>
      <div className="hs-funnel-track">
        <div className="hs-funnel-fill" style={{ width: Math.max((count / max) * 100, count ? 3 : 0) + "%", background: color }} />
      </div>
      <span className="hs-funnel-count">{count}</span>
    </div>
  );
}

function Overview({ openBooking, setView }) {
  const funnel = [
    ["New Inquiry", 134], ["For Follow Up", 672], ["Quotation", 48], ["For Downpayment", 6],
    ["Confirmed", 9], ["Job In Progress", 0], ["Job Completed", 14],
  ].map(([l, c]) => {
    const sc = STAGE_COLOR[l] || STAGE_COLOR["New Inquiry"];
    return { label: l, count: c, color: sc.color, soft: sc.soft };
  });
  const max = Math.max(...funnel.map(f => f.count));
  const today = BOOKINGS.filter(b => b.when.startsWith("Today") || b.stage === "Today's Booking");
  const inquiries = BOOKINGS.filter(b => b.stage === "New Inquiry" || b.stage === "Worker options sent");

  return (
    <div className="hs-scroll">
      <div className="hs-overview">
        <div className="hs-kpi-grid">
          <Kpi label="New Inquiry" value={134} icon="inbox" color="var(--stage-inquiry)" soft="var(--stage-inquiry-soft)"
            delta="+12 today" deltaTone="var(--success)" />
          <Kpi label="Confirmed" value={31} icon="calendar-check" color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)"
            delta="8 today · 23 upcoming" deltaTone="var(--fg-3)" />
          <Kpi label="For Payment" value={87250} money icon="wallet" color="var(--stage-payment)" soft="var(--stage-payment-soft)"
            delta="6 awaiting downpayment" deltaTone="var(--warning)" />
          <Kpi label="Completed (mo.)" value={142} icon="circle-check-big" color="var(--stage-completed)" soft="var(--stage-completed-soft)"
            delta="₱428,500 collected" deltaTone="var(--success)" />
        </div>

        <div className="hs-overview-cols">
          <section className="hs-panel">
            <div className="hs-panel-h">
              <h3>Pipeline funnel</h3>
              <Button variant="subtle" onClick={() => setView("pipeline")}>Open board <Icon name="arrow-right" size={14} /></Button>
            </div>
            <div className="hs-funnel">
              {funnel.map(f => <FunnelRow key={f.label} {...f} max={max} />)}
            </div>
          </section>

          <section className="hs-panel">
            <div className="hs-panel-h">
              <h3>Today's schedule</h3>
              <Badge color="var(--stage-confirmed)" soft="var(--stage-confirmed-soft)" dot>{today.length} jobs</Badge>
            </div>
            <div className="hs-list">
              {today.map(b => (
                <button key={b.id} className="hs-sched" onClick={() => openBooking(b)}>
                  <span className="hs-sched-time">{b.when.replace("Today · ", "")}</span>
                  <span className="hs-sched-bar" style={{ background: (STAGE_COLOR[b.stage] || {}).color }} />
                  <span className="hs-sched-mid">
                    <b>{b.service}</b>
                    <small><Icon name="map-pin" size={12} />{b.city} · {b.hp || "Unassigned"}</small>
                  </span>
                  <Avatar name={b.client} size={30} />
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="hs-panel">
          <div className="hs-panel-h">
            <h3>Needs attention</h3>
            <Button variant="subtle" onClick={() => setView("pipeline")}>View all</Button>
          </div>
          <div className="hs-attn">
            {inquiries.map(b => (
              <button key={b.id} className="hs-attn-card" onClick={() => openBooking(b)}>
                <div className="hs-attn-top">
                  <Avatar name={b.client} size={32} channel={b.channel} />
                  <span className="hs-attn-name">{b.client}</span>
                  <Badge color={(STAGE_COLOR[b.stage] || {}).color} soft={(STAGE_COLOR[b.stage] || {}).soft} dot>{b.stage}</Badge>
                </div>
                <p className="hs-attn-note">{b.note}</p>
                <div className="hs-attn-foot">
                  <span><Icon name="wrench" size={13} />{b.service}</span>
                  <span><Icon name="map-pin" size={13} />{b.city}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { Overview });
