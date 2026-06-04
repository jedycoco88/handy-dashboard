import * as LucideIcons from 'lucide-react'

const AV_COLORS = ["#7d4cdb","#0f766e","#2f6bff","#c2410c","#be185d","#0e7490","#4d7c0f","#9333ea"]

function avColor(name = "") {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return AV_COLORS[h % AV_COLORS.length]
}

export function initials(name = "") {
  const p = name.trim().split(/\s+/)
  return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase() || "?"
}

function toPascalCase(str) {
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")
}

export function Icon({ name, size = 18, strokeWidth = 1.75, color, style = {}, className = "" }) {
  const pascalName = toPascalCase(name)
  const LucideIcon = LucideIcons[pascalName]
  if (!LucideIcon) return <span style={{ width: size, height: size, display: "inline-block" }} />
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={className}
      style={{ display: "inline-block", flexShrink: 0, ...style }}
    />
  )
}

const CH_MAP = {
  Messenger: { c: "var(--ch-messenger)", icon: "messages-square" },
  SMS:       { c: "var(--ch-sms)",       icon: "message-square" },
  Instagram: { c: "var(--ch-instagram)", icon: "camera" },
  Viber:     { c: "var(--ch-viber)",     icon: "phone" },
}

export function Avatar({ name, size = 38, channel, online, selected }) {
  const ch = CH_MAP[channel]
  return (
    <span className="avatar" style={{
      width: size, height: size, fontSize: size * 0.34, background: avColor(name),
      boxShadow: selected ? "0 0 0 2px var(--bg-1), 0 0 0 4px var(--primary)" : "none",
    }}>
      {initials(name)}
      {ch && (
        <span className="avatar-ch" style={{ background: ch.c }}>
          <Icon name={ch.icon} size={Math.round(size * 0.26)} color="#fff" strokeWidth={2.5} />
        </span>
      )}
      {online && <span className="avatar-on" />}
    </span>
  )
}

export function Badge({ children, color = "var(--fg-2)", soft = "var(--bg-3)", dot, icon }) {
  return (
    <span className="badge" style={{ color, background: soft }}>
      {dot && <span className="badge-dot" style={{ background: color }} />}
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  )
}

export function Button({ variant = "ghost", icon, children, onClick, style = {}, title }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} style={style} title={title}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  )
}

export function Count({ children, tone = "neutral" }) {
  return <span className={`count count-${tone}`}>{children}</span>
}
