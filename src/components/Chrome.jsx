import { Icon, Count } from './ui.jsx'
import logoImg from '/assets/handy-icon-cut.png'

export function Logo({ collapsed }) {
  return (
    <div className="logo">
      <img className="logo-img" src={logoImg} alt="Handy Services PH" />
      {!collapsed && (
        <span className="logo-word">
          <b>Handy<i>.</i></b>
          <small>Services PH</small>
        </span>
      )}
    </div>
  )
}

export function Sidebar({ view, setView, collapsed, setCollapsed }) {
  const nav = [
    { id: "overview",  icon: "layout-dashboard", label: "Overview" },
    { id: "pipeline",  icon: "kanban",            label: "Pipeline", badge: 134 },
    { id: "inbox",     icon: "messages-square",   label: "Inbox",    badge: 3 },
    { id: "calendar",  icon: "calendar-days",     label: "Calendar" },
  ]
  const more = [
    { id: "clients",  icon: "users",    label: "Clients" },
    { id: "hps",      icon: "hard-hat", label: "Handy Pros" },
    { id: "payments", icon: "wallet",   label: "Payments" },
    { id: "settings", icon: "settings", label: "Settings" },
  ]
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <Logo collapsed={collapsed} />
      <nav className="nav">
        {nav.map(n => (
          <button key={n.id} className={`nav-item${view === n.id ? " active" : ""}`}
            onClick={() => setView(n.id)} title={n.label}>
            <Icon name={n.icon} size={19} />
            {!collapsed && <span className="nav-label">{n.label}</span>}
            {!collapsed && n.badge != null && (
              <Count tone={n.id === "inbox" ? "accent" : "neutral"}>{n.badge}</Count>
            )}
          </button>
        ))}
        <div className="nav-sep">{!collapsed && <span>MANAGE</span>}</div>
        {more.map(n => (
          <button key={n.id} className={`nav-item${view === n.id ? " active" : ""}`}
            onClick={() => setView(n.id)} title={n.label}>
            <Icon name={n.icon} size={19} />
            {!collapsed && <span className="nav-label">{n.label}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        <button className="nav-item" onClick={() => setCollapsed(c => !c)} title="Collapse">
          <Icon name={collapsed ? "chevrons-right" : "chevrons-left"} size={19} />
          {!collapsed && <span className="nav-label">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}

const VIEW_TITLES = {
  overview: "Overview", pipeline: "Pipeline", inbox: "Inbox", calendar: "Calendar",
  clients: "Clients", hps: "Handy Pros", payments: "Payments", settings: "Settings",
}

export function Topbar({ view, onNewBooking }) {
  return (
    <header className="topbar">
      <div className="topbar-l">
        <h1 className="topbar-title">{VIEW_TITLES[view] || "Overview"}</h1>
        <span className="topbar-date">Tuesday, Jun 9 · 4:04 PM</span>
      </div>
      <div className="search">
        <Icon name="search" size={17} />
        <input placeholder="Search bookings, clients, HPs…" />
        <kbd>⌘K</kbd>
      </div>
      <div className="topbar-r">
        <button className="icon-btn" title="Notifications">
          <Icon name="bell" size={18} />
          <span className="icon-btn-dot" />
        </button>
        <button className="icon-btn" title="Automations (n8n)">
          <Icon name="workflow" size={18} />
        </button>
        <button className="btn btn-primary" onClick={onNewBooking}>
          <Icon name="plus" size={16} />New booking
        </button>
        <span className="avatar" style={{ width: 34, height: 34, fontSize: 12, background: "var(--accent)" }}>OP</span>
      </div>
    </header>
  )
}
