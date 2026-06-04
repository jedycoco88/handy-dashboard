import { useState, useRef, useEffect } from 'react'
import { Icon, Avatar, Badge, Button } from '../components/ui.jsx'
import { STAGE_COLOR, CONVERSATIONS, BOOKINGS, peso } from '../data.js'

function ConvRow({ c, active, onClick }) {
  const b = BOOKINGS.find(x => x.id === c.bookingId)
  const sc = b ? STAGE_COLOR[b.stage] : null
  return (
    <button className={`conv${active ? " active" : ""}`} onClick={() => onClick(c)}>
      <Avatar name={c.name} size={40} channel={c.channel} online={c.online} />
      <div className="conv-mid">
        <div className="conv-name">
          {c.name}
          {b && sc && <span className="conv-stage" style={{ color: sc.color }}>{b.stage}</span>}
        </div>
        <div className="conv-prev">{c.preview}</div>
      </div>
      <div className="conv-r">
        <span className="conv-time">{c.time}</span>
        {c.unread > 0 && <span className="unread-dot">{c.unread}</span>}
      </div>
    </button>
  )
}

function buildConvFromLive(t) {
  return {
    id: t.id,
    name: t.name,
    channel: t.channel,
    online: false,
    preview: t.lastMsg || "…",
    time: t.when,
    unread: t.unread,
    bookingId: null,
    msgs: [{ from: "them", t: t.when, body: t.lastMsg || "…" }],
  }
}

export function Inbox({ openBooking, liveData }) {
  const liveThreads = liveData?.threads || []
  const convList = liveThreads.length > 0
    ? liveThreads.map(buildConvFromLive)
    : CONVERSATIONS

  const [active, setActive] = useState(convList[0])
  const [draft, setDraft] = useState("")
  const [extra, setExtra] = useState([])
  const threadRef = useRef(null)

  const currentActive = convList.find(c => c.id === active?.id) || convList[0]
  const msgs = [...(currentActive?.msgs || []), ...extra.filter(m => m.cid === currentActive?.id)]

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [currentActive, extra])

  const send = () => {
    if (!draft.trim()) return
    setExtra(e => [...e, { cid: currentActive.id, from: "me", t: "Now", body: draft.trim() }])
    setDraft("")
  }

  const booking = BOOKINGS.find(b => b.id === currentActive?.bookingId)
  const sc = booking ? STAGE_COLOR[booking.stage] : null
  const totalUnread = liveData?.totalUnread ?? convList.reduce((s, c) => s + (c.unread || 0), 0)

  return (
    <div className="inbox">
      {/* Conversation list */}
      <div className="inbox-list">
        <div className="inbox-list-head">
          <div className="tabs">
            <button className="tab active">All</button>
            <button className="tab">Unread {totalUnread > 0 && <span className="tab-n">{totalUnread}</span>}</button>
            <button className="tab">Assigned</button>
          </div>
        </div>
        <div className="scroll">
          {convList.map(c => (
            <ConvRow key={c.id} c={c} active={currentActive?.id === c.id} onClick={setActive} />
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className="thread">
        <div className="thread-head">
          <Avatar name={currentActive?.name} size={36} channel={currentActive?.channel} online={currentActive?.online} />
          <div className="thread-who">
            <b>{currentActive?.name}</b>
            <small>{currentActive?.online ? "Active now" : "Offline"} · via {currentActive?.channel}</small>
          </div>
          <div className="thread-acts">
            <button className="icon-btn" title="Call"><Icon name="phone" size={17} /></button>
            <button className="icon-btn" title="More"><Icon name="more-horizontal" size={17} /></button>
          </div>
        </div>

        <div className="thread-body" ref={threadRef}>
          <div className="thread-day">Today</div>
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <div className="bubble">{m.body}</div>
              <span className="msg-time">{m.t}</span>
            </div>
          ))}
        </div>

        <div className="composer">
          <button className="icon-btn"><Icon name="paperclip" size={18} /></button>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a reply…  (Taglish ok)"
          />
          <button className="icon-btn"><Icon name="smile" size={18} /></button>
          <button className="btn btn-primary" onClick={send}>
            <Icon name="send" size={15} />Send
          </button>
        </div>
      </div>

      {/* Context panel */}
      <div className="context">
        {booking ? (
          <>
            <div className="ctx-head">
              <span className="eyebrow">Linked booking</span>
              <span className="ctx-id">#{booking.id}</span>
            </div>
            <Badge color={sc.color} soft={sc.soft} dot>{booking.stage}</Badge>
            <div className="ctx-svc">{booking.service}</div>
            <dl className="ctx-dl">
              <div><dt><Icon name="map-pin" size={14} />Location</dt><dd>{booking.city}</dd></div>
              <div><dt><Icon name="calendar" size={14} />Schedule</dt><dd>{booking.when}</dd></div>
              <div><dt><Icon name="hard-hat" size={14} />Handy Pro</dt><dd>{booking.hp || "Unassigned"}</dd></div>
              <div><dt><Icon name="wallet" size={14} />Amount</dt><dd>{booking.amount ? peso(booking.amount) : "To quote"}</dd></div>
            </dl>
            <p className="ctx-note">{booking.note}</p>
            <div className="ctx-actions">
              <Button variant="primary" icon="external-link" onClick={() => openBooking(booking)}>Open booking</Button>
              <Button variant="accent" icon="zap">Move stage</Button>
            </div>
          </>
        ) : (
          <div className="ctx-empty">
            <Icon name="link-2" size={22} />
            <p>No booking linked yet</p>
            <Button variant="ghost" icon="plus">Create booking</Button>
          </div>
        )}
      </div>
    </div>
  )
}
