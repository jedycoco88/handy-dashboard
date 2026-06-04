import { useState } from 'react'
import { Icon, Avatar, Button } from '../components/ui.jsx'
import { STAGE_GROUPS, STAGE_COLOR, PIPELINE_COUNTS, BOOKINGS, peso } from '../data.js'

function KanbanCard({ b, onClick }) {
  const sc = STAGE_COLOR[b.stage] || {}
  return (
    <button className="kcard" onClick={() => onClick(b)}>
      <div className="kcard-top">
        <span className="kcard-svc">{b.service}</span>
        <span className="kcard-id">#{b.id}</span>
      </div>
      <div className="kcard-meta"><Icon name="map-pin" size={12} />{b.city}</div>
      <div className="kcard-meta"><Icon name="calendar" size={12} />{b.when}</div>
      <div className="kcard-foot">
        <span className="kcard-client">
          <Avatar name={b.client} size={22} channel={b.channel} />
          {b.client.split(" ")[0]}
        </span>
        {b.amount > 0
          ? <span className="kcard-amt">{peso(b.amount)}</span>
          : <span className="kcard-amt muted">—</span>}
      </div>
    </button>
  )
}

export function Pipeline({ openBooking }) {
  const [filter, setFilter] = useState("all")
  const activeGroups = filter === "all" ? STAGE_GROUPS : STAGE_GROUPS.filter(g => g.key === filter)
  const countOf = Object.fromEntries(PIPELINE_COUNTS)
  const cardsFor = (stage) => BOOKINGS.filter(b => b.stage === stage)

  return (
    <div className="pipeline">
      <div className="pipeline-bar">
        <div className="chips">
          <button className={`chip${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>
            All stages
          </button>
          {STAGE_GROUPS.map(g => (
            <button key={g.key} className={`chip${filter === g.key ? " active" : ""}`} onClick={() => setFilter(g.key)}>
              <span className="chip-dot" style={{ background: g.color }} />{g.label}
            </button>
          ))}
        </div>
        <div className="pipeline-actions">
          <Button variant="ghost" icon="sliders-horizontal">Advanced filters</Button>
          <Button variant="ghost" icon="arrow-up-down">Sort</Button>
        </div>
      </div>

      <div className="board">
        {activeGroups.map(g => g.stages.map(stage => {
          const cards = cardsFor(stage)
          const count = countOf[stage] ?? cards.length
          return (
            <div className="col" key={stage}>
              <div className="col-head" style={{ borderTopColor: g.color }}>
                <span className="col-title">{stage}</span>
                <span className="col-count">{count}</span>
              </div>
              <div className="col-body">
                {cards.map(b => <KanbanCard key={b.id} b={b} onClick={openBooking} />)}
                {cards.length === 0 && count > 0 && (
                  <div className="col-empty">{count} {count === 1 ? "card" : "cards"}</div>
                )}
                {cards.length === 0 && count === 0 && (
                  <div className="col-empty muted">Empty</div>
                )}
              </div>
            </div>
          )
        }))}
      </div>
    </div>
  )
}
