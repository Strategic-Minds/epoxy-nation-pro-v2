"use client";

// Inline SVG icon helper
const Icon = ({ d, size = 18, color = "currentColor" }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);

// Icon paths
const IC = {
  grid:     "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  trend:    "M22 12h-4l-3 9L9 3l-3 9H2",
  palette:  "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  file:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
  message:  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  wa:       "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
  dollar:   "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  tool:     "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  check:    "M20 6L9 17l-5-5",
  camera:   "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  clip:     "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrow:    "M5 12h14 M12 5l7 7-7 7",
};

// Default nav for each role
const DEFAULT_NAV: Record<string, { label: string; href?: string; id?: string; icon: string }[]> = {
  customer: [
    { id: "overview",  label: "My Dashboard",    icon: IC.grid },
    { id: "status",    label: "Project Status",  icon: IC.trend },
    { id: "colors",    label: "Color Charts",    icon: IC.palette },
    { id: "design",    label: "Floor Design",    icon: IC.eye },
    { id: "documents", label: "Documents",       icon: IC.file },
    { id: "messages",  label: "Messages",        icon: IC.message },
    { href: "https://wa.me/16025550100", label: "WhatsApp", icon: IC.wa },
  ],
  admin: [
    { id: "overview",  label: "Overview",    icon: IC.grid },
    { id: "leads",     label: "Lead Queue",  icon: IC.users },
    { id: "projects",  label: "All Projects",icon: IC.clip },
    { id: "crew",      label: "Crew",        icon: IC.tool },
    { id: "revenue",   label: "Revenue",     icon: IC.dollar },
  ],
  owner: [
    { id: "overview",  label: "Owner View",   icon: IC.grid },
    { id: "kpis",      label: "Revenue KPIs", icon: IC.dollar },
    { id: "pipeline",  label: "Pipeline",     icon: IC.trend },
    { id: "team",      label: "Team",         icon: IC.users },
  ],
  crew: [
    { id: "jobs",      label: "My Jobs",       icon: IC.clip },
    { id: "today",     label: "Today",         icon: IC.check },
    { id: "changes",   label: "Change Orders", icon: IC.file },
    { id: "photos",    label: "Photos",        icon: IC.camera },
  ],
  installer: [
    { id: "board",     label: "Job Board",  icon: IC.grid },
    { id: "active",    label: "Active Job", icon: IC.check },
    { id: "checklist", label: "Checklist",  icon: IC.tool },
    { id: "signoff",   label: "Sign-off",   icon: IC.star },
  ],
  ops: [
    { id: "command",   label: "Command",   icon: IC.map },
    { id: "live",      label: "Live Jobs", icon: IC.trend },
    { id: "sched",     label: "Schedule",  icon: IC.tool },
    { id: "mats",      label: "Materials", icon: IC.clip },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  customer: "CUSTOMER", admin: "ADMIN", owner: "OWNER",
  crew: "CREW", installer: "INSTALLER", ops: "OPS",
};

interface NavTab { id?: string; href?: string; label: string; icon: string; }
interface Props {
  children: React.ReactNode;
  role: string;
  title: string;
  subtitle?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  navTabs?: NavTab[];
}

export function DashShell({ children, role, title, subtitle, activeTab, onTabChange, navTabs }: Props) {
  const tabs = navTabs || DEFAULT_NAV[role] || [];

  return (
    <div className="dash">
      {/* ── SIDEBAR ──────────────────────────────────────── */}
      <aside className="dside">
        {/* Brand header */}
        <div style={{ padding: "18px 16px", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 4 }}>EPOXY NATION PRO</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#F6B800", letterSpacing: "0.08em", textTransform: "uppercase" }}>{ROLE_LABELS[role] || role.toUpperCase()} PORTAL</div>
        </div>

        {/* Nav items */}
        <p className="dsec" style={{ fontSize: 10, marginTop: 12 }}>{ROLE_LABELS[role] || role.toUpperCase()}</p>
        {tabs.map((item) => {
          const isActive = item.id ? activeTab === item.id : false;
          if (item.href) {
            return (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                className="dlink" style={{ fontSize: 14 }}>
                <Icon d={item.icon} size={18} color={isActive ? "#F6B800" : "rgba(255,255,255,.6)"} />
                {item.label}
              </a>
            );
          }
          return (
            <button key={item.id}
              onClick={() => item.id && onTabChange?.(item.id)}
              className={"dlink" + (isActive ? " active" : "")}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
            >
              <Icon d={item.icon} size={18} color={isActive ? "#F6B800" : "rgba(255,255,255,.6)"} />
              {item.label}
            </button>
          );
        })}

        {/* Back to site */}
        <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #1a1a1a" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.4)", fontSize: 13, fontWeight: 600 }}>
            <Icon d={IC.home} size={16} color="rgba(255,255,255,.4)" />
            Back to Site
          </a>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <main className="dmain">
        <div className="dhd">
          <div>
            <div className="dtitle" style={{ fontSize: 24 }}>{title}</div>
            {subtitle && <div className="dsub" style={{ fontSize: 15 }}>{subtitle}</div>}
          </div>
          <a href="/digital-bid"
            style={{ background: "#F6B800", color: "#000", fontWeight: 800, fontSize: 14, padding: "10px 20px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={IC.arrow} size={16} color="#000" />
            + New Bid
          </a>
        </div>
        {children}
      </main>
    </div>
  );
}
