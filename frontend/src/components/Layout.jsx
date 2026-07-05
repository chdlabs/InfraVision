import { NavLink, useNavigate, Outlet } from "react-router-dom";

const nav = [
  { to: "/app/servers", label: "Serveurs", icon: "🖥️" },
  { to: "/app/monitoring", label: "Monitoring", icon: "📊" },
  { to: "/app/veille", label: "Veille techno", icon: "📰" },
];

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandMark}>IV</span>
          <span style={styles.brandText}>InfraVision</span>
        </div>
        <nav style={styles.nav}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button style={styles.logout} onClick={logout}>
          Déconnexion
        </button>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  shell: { display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" },
  sidebar: {
    width: 240,
    background: "#0f172a",
    color: "#e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    boxSizing: "border-box",
  },
  brand: { display: "flex", alignItems: "center", gap: 10, padding: "0 12px 24px" },
  brandMark: {
    background: "#2563eb",
    color: "#fff",
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    fontSize: 14,
  },
  brandText: { fontSize: 18, fontWeight: 700, color: "#fff" },
  nav: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: 14,
  },
  navItemActive: { background: "#1e293b", color: "#fff", fontWeight: 600 },
  navIcon: { fontSize: 16 },
  logout: {
    padding: "10px 12px",
    background: "transparent",
    border: "1px solid #334155",
    color: "#cbd5e1",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
  main: { flex: 1, background: "#f1f5f9", overflow: "auto" },
};
