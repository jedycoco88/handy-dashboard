/* global React, Icon, Avatar, Button, peso, STAGE_COLOR, STAGE_GROUPS, PIPELINE_COUNTS, BOOKINGS */
// Pipeline kanban — horizontally scrolling stage columns (mirrors the GHL board).

function KanbanCard({ b, onClick }) {
  const sc = STAGE_COLOR[b.stage] || {};
  return (
    <button className="hs-kcard" onClick={() => onClick(b)}>
      <div className="hs-kcard-top">
        <span className="hs-kcard-svc">{b.service}</span>
        <span className="hs-kcard-id">#{b.id}</span>
      </div>
      <div className="hs-kcard-meta"><Icon name="map-pin" size={12} />{b.city}</div>
      <div className="hs-kcard-meta"><Icon name="calendar" size={12} />{b.when}</div>
      <div className="hs-kcard-foot">
        <span className="hs-kcard-client"><Avatar name={b.client} size={22} channel={b.channel} />{b.client.split(" ")[0]}</span>
        {b.amount > 0
          ? <span className="hs-kcard-amt">{peso(b.amount)}</span>
          : <span className="hs-kcard-amt muted">—</span>}
      </div>
    </button>
  );
}

function Pipeline({ openBooking }) {
  const [filter, setFilter] = React.useState("all");
  const groups = STAGE_GROUPS;
  const activeGroups = filter === "all" ? groups : groups.filter(g => g.key === filter);

  // map count by stage name
  const countOf = Object.fromEntries(PIPELINE_COUNTS);
  const cardsFor = (stage) => BOOKINGS.filter(b => b.stage === stage);

  return (
    <div className="hs-pipeline">
      <div className="hs-pipeline-bar">
        <div className="hs-chips">
          <button className={"hs-chip" + (filter === "all" ? " active" : "")} onClick={() => setFilter("all")}>All stages</button>
          {groups.map(g => (
            <button key={g.key} className={"hs-chip" + (filter === g.key ? " active" : "")} onClick={() => setFilter(g.key)}>
              <span className="hs-chip-dot" style={{ background: g.color }} />{g.label}
            </button>
          ))}
        </div>
        <div className="hs-pipeline-actions">
          <Button variant="ghost" icon="sliders-horizontal">Advanced filters</Button>
          <Button variant="ghost" icon="arrow-up-down">Sort</Button>
        </div>
      </div>

      <div className="hs-board">
        {activeGroups.map(g => g.stages.map(stage => {
          const cards = cardsFor(stage);
          const count = countOf[stage] ?? cards.length;
          return (
            <div className="hs-col" key={stage}>
              <div className="hs-col-h" style={{ borderTopColor: g.color }}>
                <span className="hs-col-title">{stage}</span>
                <span className="hs-col-count">{count}</span>
              </div>
              <div className="hs-col-body">
                {cards.map(b => <KanbanCard key={b.id} b={b} onClick={openBooking} />)}
                {cards.length === 0 && count > 0 && (
                  <div className="hs-col-empty">{count} {count === 1 ? "card" : "cards"}</div>
                )}
                {cards.length === 0 && count === 0 && (
                  <div className="hs-col-empty muted">Empty</div>
                )}
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}

Object.assign(window, { Pipeline });
