/* global React, Icon, Avatar, Badge, Button, peso, STAGE_COLOR, CONVERSATIONS, BOOKINGS */
// Unified inbox: conversation list + message thread + booking context.

function ConvRow({ c, active, onClick }) {
  const sc = c.bookingId ? STAGE_COLOR[(BOOKINGS.find(b => b.id === c.bookingId) || {}).stage] : null;
  const b = BOOKINGS.find(x => x.id === c.bookingId);
  return (
    <button className={"hs-conv" + (active ? " active" : "")} onClick={() => onClick(c)}>
      <Avatar name={c.name} size={40} channel={c.channel} online={c.online} />
      <div className="hs-conv-mid">
        <div className="hs-conv-name">
          {c.name}
          {b && sc && <span className="hs-conv-stage" style={{ color: sc.color }}>{b.stage}</span>}
        </div>
        <div className="hs-conv-prev">{c.preview}</div>
      </div>
      <div className="hs-conv-r">
        <span className="hs-conv-time">{c.time}</span>
        {c.unread > 0 && <span className="hs-unread">{c.unread}</span>}
      </div>
    </button>
  );
}

function Inbox({ openBooking }) {
  const [active, setActive] = React.useState(CONVERSATIONS[0]);
  const [draft, setDraft] = React.useState("");
  const [extra, setExtra] = React.useState([]);
  const threadRef = React.useRef(null);

  const msgs = [...active.msgs, ...extra.filter(m => m.cid === active.id)];

  React.useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [active, extra]);

  const send = () => {
    if (!draft.trim()) return;
    setExtra(e => [...e, { cid: active.id, from: "me", t: "Now", body: draft.trim() }]);
    setDraft("");
  };

  const booking = BOOKINGS.find(b => b.id === active.bookingId);
  const sc = booking ? STAGE_COLOR[booking.stage] : null;

  return (
    <div className="hs-inbox">
      {/* list */}
      <div className="hs-inbox-list">
        <div className="hs-inbox-listh">
          <div className="hs-tabs">
            <button className="hs-tab active">All</button>
            <button className="hs-tab">Unread <span className="hs-tab-n">3</span></button>
            <button className="hs-tab">Assigned</button>
          </div>
        </div>
        <div className="hs-scroll">
          {CONVERSATIONS.map(c => <ConvRow key={c.id} c={c} active={active.id === c.id} onClick={setActive} />)}
        </div>
      </div>

      {/* thread */}
      <div className="hs-thread">
        <div className="hs-thread-h">
          <Avatar name={active.name} size={36} channel={active.channel} online={active.online} />
          <div className="hs-thread-who">
            <b>{active.name}</b>
            <small>{active.online ? "Active now" : "Offline"} · via {active.channel}</small>
          </div>
          <div className="hs-thread-acts">
            <button className="hs-iconbtn" title="Call"><Icon name="phone" size={17} /></button>
            <button className="hs-iconbtn" title="More"><Icon name="more-horizontal" size={17} /></button>
          </div>
        </div>

        <div className="hs-thread-body" ref={threadRef}>
          <div className="hs-thread-day">Today</div>
          {msgs.map((m, i) => (
            <div key={i} className={"hs-msg " + m.from}>
              <div className="hs-bubble">{m.body}</div>
              <span className="hs-msg-t">{m.t}</span>
            </div>
          ))}
        </div>

        <div className="hs-composer">
          <button className="hs-iconbtn"><Icon name="paperclip" size={18} /></button>
          <input value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a reply…  (Taglish ok)" />
          <button className="hs-iconbtn"><Icon name="smile" size={18} /></button>
          <button className="hs-btn hs-btn-primary" onClick={send}><Icon name="send" size={15} />Send</button>
        </div>
      </div>

      {/* context */}
      <div className="hs-context">
        {booking ? (
          <>
            <div className="hs-ctx-head">
              <span className="hs-eyebrow">Linked booking</span>
              <span className="hs-ctx-id">#{booking.id}</span>
            </div>
            <Badge color={sc.color} soft={sc.soft} dot>{booking.stage}</Badge>
            <div className="hs-ctx-svc">{booking.service}</div>
            <dl className="hs-ctx-dl">
              <div><dt><Icon name="map-pin" size={14} />Location</dt><dd>{booking.city}</dd></div>
              <div><dt><Icon name="calendar" size={14} />Schedule</dt><dd>{booking.when}</dd></div>
              <div><dt><Icon name="hard-hat" size={14} />Handy Pro</dt><dd>{booking.hp || "Unassigned"}</dd></div>
              <div><dt><Icon name="wallet" size={14} />Amount</dt><dd>{booking.amount ? peso(booking.amount) : "To quote"}</dd></div>
            </dl>
            <p className="hs-ctx-note">{booking.note}</p>
            <div className="hs-ctx-actions">
              <Button variant="primary" icon="external-link" onClick={() => openBooking(booking)}>Open booking</Button>
              <Button variant="accent" icon="zap">Move stage</Button>
            </div>
          </>
        ) : (
          <div className="hs-ctx-empty">
            <Icon name="link-2" size={22} />
            <p>No booking linked yet</p>
            <Button variant="ghost" icon="plus">Create booking</Button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Inbox });
