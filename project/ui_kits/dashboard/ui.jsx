/* global React */
// Handy Services PH — shared UI primitives for the Operations Dashboard kit.
// Exported to window at the bottom so sibling babel scripts can use them.

const { useRef, useEffect, useState } = React;

/* ---- Icon: renders a Lucide glyph imperatively (safe across re-renders) ---- */
function Icon({ name, size = 18, strokeWidth = 1.75, color, style = {}, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": strokeWidth } });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} className={"hs-icon " + className}
    style={{ display: "inline-flex", color, width: size, height: size, ...style }} />;
}

/* ---- Avatar: circular initials chip keyed to the name ---- */
const AV_COLORS = ["#7d4cdb", "#0f766e", "#2f6bff", "#c2410c", "#be185d", "#0e7490", "#4d7c0f", "#9333ea"];
function avColor(name = "") {
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AV_COLORS[h % AV_COLORS.length];
}
function initials(name = "") {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase() || "?";
}
function Avatar({ name, size = 38, channel, online, selected }) {
  const chMap = {
    Messenger: { c: "var(--ch-messenger)", i: "messages-square" },
    SMS: { c: "var(--ch-sms)", i: "message-square" },
    Instagram: { c: "var(--ch-instagram)", i: "camera" },
    Viber: { c: "var(--ch-viber)", i: "phone" },
  };
  const ch = chMap[channel];
  return (
    <span className="hs-av" style={{
      width: size, height: size, fontSize: size * 0.34, background: avColor(name),
      boxShadow: selected ? "0 0 0 2px var(--bg-1), 0 0 0 4px var(--primary)" : "none",
    }}>
      {initials(name)}
      {ch && <span className="hs-av-ch" style={{ background: ch.c }}><Icon name={ch.i} size={size * 0.26} color="#fff" strokeWidth={2.5} /></span>}
      {online && <span className="hs-av-on" />}
    </span>
  );
}

/* ---- Badge / stage chip ---- */
function Badge({ children, color = "var(--fg-2)", soft = "var(--bg-3)", dot, icon }) {
  return (
    <span className="hs-badge" style={{ color, background: soft }}>
      {dot && <span className="hs-badge-dot" style={{ background: color }} />}
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

/* ---- Button ---- */
function Button({ variant = "ghost", icon, children, onClick, style = {}, title }) {
  return (
    <button className={"hs-btn hs-btn-" + variant} onClick={onClick} style={style} title={title}>
      {icon && <Icon name={icon} size={16} />}{children}
    </button>
  );
}

/* ---- Count pill ---- */
function Count({ children, tone = "neutral" }) {
  return <span className={"hs-count hs-count-" + tone}>{children}</span>;
}

/* ---- peso formatter ---- */
const peso = (n) => "₱" + n.toLocaleString("en-PH");

Object.assign(window, { Icon, Avatar, Badge, Button, Count, avColor, initials, peso });
