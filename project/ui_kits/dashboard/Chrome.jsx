/* global React, Icon, Count */
// Sidebar + top command bar for the Operations Dashboard.

function Logo({ collapsed }) {
  return (
    <div className="hs-logo">
      <img className="hs-logo-img" src="../../assets/handy-icon-cut.png" alt="Handy Services PH" />
      {!collapsed && (
        <span className="hs-word">
          <b>Handy<i>.</i></b>
          <small>Services PH</small>
        </span>
      )}
    </div>
  );
}

function Sidebar({ view, setView, collapsed, setCollapsed }) {
  const nav = [
    { id: "overview", icon: "layout-dashboard", label: "Overview" },
    { id: "pipeline", icon: "kanban", label: "Pipeline", badge: 134 },
    { id: "inbox", icon: "messages-square", label: "Inbox", badge: 3 },
    { id: "calendar", icon: "calendar-days", label: "Calendar" },
  ];
  const more = [
    { id: "clients", icon: "users", label: "Clients" },
    { id: "hps", icon: "hard-hat", label: "Handy Pros" },
    { id: "payments", icon: "wallet", label: "Payments" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <aside className={"hs-sidebar" + (collapsed ? " collapsed" : "")}>
      <Logo collapsed={collapsed} />
      <nav className="hs-nav">
        {nav.map(n => (
          <button key={n.id} className={"hs-navitem" + (view === n.id ? " active" : "")}
            onClick={() => setView(n.id)} title={n.label}>
            <Icon name={n.icon} size={19} />
            {!collapsed && <span className="hs-navlabel">{n.label}</span>}
            {!collapsed && n.badge != null && <Count tone={n.id === "inbox" ? "accent" : "neutral"}>{n.badge}</Count>}
          </button>
        ))}
        <div className="hs-nav-sep">{!collapsed && <span>MANAGE</span>}</div>
        {more.map(n => (
          <button key={n.id} className={"hs-navitem" + (view === n.id ? " active" : "")}
            onClick={() => setView(n.id)} title={n.label}>
            <Icon name={n.icon} size={19} />
            {!collapsed && <span className="hs-navlabel">{n.label}</span>}
          </button>
        ))}
      </nav>
      <div className="hs-sidebar-foot">
        <button className="hs-navitem" onClick={() => setCollapsed(c => !c)} title="Collapse">
          <Icon name={collapsed ? "chevrons-right" : "chevrons-left"} size={19} />
          {!collapsed && <span className="hs-navlabel">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

const VIEW_TITLES = {
  overview: "Overview", pipeline: "Pipeline", inbox: "Inbox", calendar: "Calendar",
  clients: "Clients", hps: "Handy Pros", payments: "Payments", settings: "Settings",
};

function Topbar({ view, onNewBooking }) {
  return (
    <header className="hs-topbar">
      <div className="hs-topbar-l">
        <h1 className="hs-topbar-title">{VIEW_TITLES[view] || "Overview"}</h1>
        <span className="hs-topbar-date">Tuesday, Jun 9 · 4:04 PM</span>
      </div>
      <div className="hs-search">
        <Icon name="search" size={17} />
        <input placeholder="Search bookings, clients, HPs…" />
        <kbd>⌘K</kbd>
      </div>
      <div className="hs-topbar-r">
        <button className="hs-iconbtn" title="Notifications"><Icon name="bell" size={18} /><span className="hs-iconbtn-dot" /></button>
        <button className="hs-iconbtn" title="Automations (n8n)"><Icon name="workflow" size={18} /></button>
        <button className="hs-btn hs-btn-primary" onClick={onNewBooking}><Icon name="plus" size={16} />New booking</button>
        <span className="hs-av" style={{ width: 34, height: 34, fontSize: 12, background: "var(--accent)" }}>OP</span>
      </div>
    </header>
  );
}

Object.assign(window, { Sidebar, Topbar, Logo });
