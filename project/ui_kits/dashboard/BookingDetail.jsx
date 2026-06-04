/* global React, Icon, Avatar, Badge, Button, peso, STAGE_COLOR, STAGE_GROUPS */
// Booking detail — slide-in drawer with stage timeline + actions.

function StageTimeline({ current }) {
  // collapse groups into a linear journey
  const flow = ["Inquiry", "Matching", "Quotation", "Payment", "Confirmed", "In Progress", "Completed"];
  const groupOf = (STAGE_COLOR[current] || {}).group;
  const groupLabel = (STAGE_GROUPS.find(g => g.key === groupOf) || {}).label;
  const curIdx = flow.indexOf(groupLabel);
  return (
    <div className="hs-timeline">
      {flow.map((f, i) => {
        const state = i < curIdx ? "done" : i === curIdx ? "current" : "todo";
        return (
          <div key={f} className={"hs-tl-step " + state}>
            <span className="hs-tl-dot">{state === "done" ? <Icon name="check" size={11} color="#fff" strokeWidth={3} /> : null}</span>
            <span className="hs-tl-label">{f}</span>
            {i < flow.length - 1 && <span className="hs-tl-line" />}
          </div>
        );
      })}
    </div>
  );
}

function BookingDetail({ booking, onClose }) {
  if (!booking) return null;
  const sc = STAGE_COLOR[booking.stage] || {};
  const paid = booking.amount > 0 && ["Confirmed", "Today's Booking", "Job In Progress", "Job Completed", "E-Receipt Sent"].includes(booking.stage);
  const down = booking.amount ? Math.round(booking.amount * 0.5) : 0;

  return (
    <div className="hs-drawer-scrim" onClick={onClose}>
      <div className="hs-drawer" onClick={e => e.stopPropagation()}>
        <div className="hs-drawer-h">
          <div>
            <span className="hs-eyebrow">Booking</span>
            <div className="hs-drawer-id">#{booking.id}</div>
          </div>
          <button className="hs-iconbtn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="hs-scroll hs-drawer-body">
          <div className="hs-drawer-title">
            <h2>{booking.service}</h2>
            <Badge color={sc.color} soft={sc.soft} dot>{booking.stage}</Badge>
          </div>

          <StageTimeline current={booking.stage} />

          <div className="hs-drawer-grid">
            <div className="hs-party">
              <span className="hs-eyebrow">Client</span>
              <div className="hs-party-row"><Avatar name={booking.client} size={40} channel={booking.channel} />
                <div><b>{booking.client}</b><small>{booking.city}</small></div>
                {booking.vip && <Badge color="var(--accent)" soft="var(--accent-soft)" icon="star">VIP</Badge>}
              </div>
            </div>
            <div className="hs-party">
              <span className="hs-eyebrow">Handy Pro</span>
              {booking.hp ? (
                <div className="hs-party-row"><Avatar name={booking.hp} size={40} />
                  <div><b>{booking.hp}</b><small>Assigned</small></div></div>
              ) : (
                <div className="hs-party-row">
                  <span className="hs-av hs-av-ph" style={{ width: 40, height: 40 }}><Icon name="user-plus" size={18} /></span>
                  <Button variant="ghost" icon="zap">Match HP</Button>
                </div>
              )}
            </div>
          </div>

          <dl className="hs-ctx-dl wide">
            <div><dt><Icon name="calendar" size={14} />Schedule</dt><dd>{booking.when}</dd></div>
            <div><dt><Icon name="wrench" size={14} />Service</dt><dd>{booking.service}</dd></div>
            <div><dt><Icon name="message-circle" size={14} />Channel</dt><dd>{booking.channel}</dd></div>
          </dl>

          <div className="hs-pay">
            <span className="hs-eyebrow">Payment</span>
            <div className="hs-pay-rows">
              <div className="hs-pay-row"><span>Total</span><b>{booking.amount ? peso(booking.amount) : "To be quoted"}</b></div>
              {booking.amount > 0 && <div className="hs-pay-row"><span>Downpayment (50%)</span><b className={paid ? "ok" : ""}>{peso(down)} {paid ? "✓ received" : "· pending"}</b></div>}
              {booking.amount > 0 && <div className="hs-pay-row"><span>Balance on completion</span><b>{peso(booking.amount - down)}</b></div>}
            </div>
          </div>

          <div className="hs-note-box">
            <span className="hs-eyebrow">Notes</span>
            <p>{booking.note}</p>
          </div>
        </div>

        <div className="hs-drawer-foot">
          <Button variant="ghost" icon="message-square">Message client</Button>
          <Button variant="accent" icon="arrow-right">Advance stage</Button>
          <Button variant="primary" icon="check">Confirm booking</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BookingDetail });
