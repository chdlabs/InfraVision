import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, Server, Activity, Newspaper, Power } from "lucide-react";
import Logo from "./Logo";

const nav = [
  { to: "/app/dashboard", label: "Overview", Icon: LayoutDashboard },
  { to: "/app/servers", label: "Serveurs", Icon: Server },
  { to: "/app/monitoring", label: "Monitoring", Icon: Activity },
  { to: "/app/veille", label: "Veille techno", Icon: Newspaper },
];

const mono = "'JetBrains Mono', ui-monospace, Menlo, monospace";
const sans = "'Inter', system-ui, sans-serif";

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); navigate("/"); };

  return (
    <div style={st.shell}>
      <aside style={st.sidebar}>
        <div style={st.brand}>
          <Logo size={38} />
          <div>
            <div style={st.brandText}>InfraVision</div>
            <div style={st.brandSub}>SUPERVISION</div>
          </div>
        </div>

        <nav style={st.nav}>
          {nav.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({ ...st.navItem, ...(isActive ? st.navItemActive : {}) })}>
              {({ isActive }) => (
                <>
                  <span style={{ ...st.activeBar, opacity: isActive ? 1 : 0 }} />
                  <Icon size={18} strokeWidth={2} color={isActive ? "#38bdf8" : "#94a3b8"} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={st.status}>
          <span style={st.statusDot} /> SYSTEM ONLINE
        </div>
        <div style={st.logoutWrap}>
          <button style={st.logout} onClick={logout}>
            <Power size={15} strokeWidth={2} />
            Deconnexion
          </button>
        </div>
      </aside>
      <main style={st.main}><Outlet /></main>
    </div>
  );
}

const st = {
  shell: { display: "flex", minHeight: "100vh", fontFamily: sans, background: "#0a0f1e" },
  sidebar: { width: 230, background: "#070b16", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", padding: "22px 0", boxSizing: "border-box" },
  brand: { display: "flex", alignItems: "center", gap: 11, padding: "0 20px 26px" },
  brandMark: { background: "#38bdf8", color: "#0a0f1e", width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, fontFamily: mono },
  brandText: { fontSize: 16, fontWeight: 700, color: "#f1f5f9", lineHeight: 1 },
  brandSub: { fontFamily: mono, fontSize: 9, letterSpacing: 3, color: "#475569", marginTop: 3 },
  nav: { display: "flex", flexDirection: "column", gap: 0, flex: 1 },
  navItem: { position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "13px 20px", color: "#94a3b8", textDecoration: "none", fontSize: 14, transition: "background 0.15s" },
  navItemActive: { background: "#0f1729", color: "#f1f5f9", fontWeight: 600 },
  activeBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" },
  status: { fontFamily: mono, fontSize: 10, letterSpacing: 1.5, color: "#4ade80", display: "flex", alignItems: "center", gap: 8, padding: "16px 20px 14px" },
  statusDot: { width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" },
  logoutWrap: { padding: "0 20px" },
  logout: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 12px", background: "transparent", border: "1px solid #1e293b", color: "#94a3b8", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  main: { flex: 1, overflow: "auto" },
};
