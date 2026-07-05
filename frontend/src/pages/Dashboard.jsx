import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    client.get("/api/servers").then((r) => setServers(r.data)).catch(() => {}).finally(() => setLoading(false));
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const online = servers.filter((s) => s.isOnline).length;
  const offline = servers.length - online;
  const health = servers.length ? Math.round((online / servers.length) * 100) : 0;

  const modules = [
    { name: "Serveurs", code: "INVENTORY", to: "/app/servers", internal: true, accent: "#38bdf8" },
    { name: "Grafana", code: "METRICS", href: "http://grafana.local", accent: "#fb923c" },
    { name: "Zabbix", code: "ALERTING", href: "http://zabbix.local", accent: "#f87171" },
    { name: "Veille techno", code: "INTEL", to: "/app/veille", internal: true, accent: "#a78bfa" },
  ];

  return (
    <div style={st.page}>
      <div style={st.topbar}>
        <div>
          <div style={st.eyebrow}>OPERATIONS CENTER</div>
          <h1 style={st.title}>Infrastructure Overview</h1>
        </div>
        <div style={st.clock}>
          <div style={st.clockTime}>{now.toLocaleTimeString("fr-FR")}</div>
          <div style={st.clockDate}>
            {now.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>

      <div style={st.metrics}>
        <Metric label="TOTAL NODES" value={loading ? "--" : servers.length} accent="#38bdf8" />
        <Metric label="ONLINE" value={loading ? "--" : online} accent="#4ade80" dot />
        <Metric label="OFFLINE" value={loading ? "--" : offline} accent="#f87171" dot={offline > 0} critical={offline > 0} />
        <HealthMetric value={loading ? 0 : health} loading={loading} />
      </div>

      <div style={st.sectionHead}>
        <span style={st.sectionLabel}>MODULES</span>
        <span style={st.sectionRule} />
      </div>

      <div style={st.grid}>
        {modules.map((m) => {
          const inner = (
            <div style={st.mod} className="soc-mod">
              <div style={{ ...st.modAccent, background: m.accent }} />
              <div style={st.modBody}>
                <div style={{ ...st.modCode, color: m.accent }}>{m.code}</div>
                <div style={st.modName}>{m.name}</div>
              </div>
              <div style={st.modGo}>OPEN &rarr;</div>
            </div>
          );
          return m.internal ? (
            <Link key={m.name} to={m.to} style={st.link}>{inner}</Link>
          ) : (
            <a key={m.name} href={m.href} target="_blank" rel="noreferrer" style={st.link}>{inner}</a>
          );
        })}
      </div>

      <style>{`
        .soc-mod:hover { border-color: #334155 !important; background: #0f1729 !important; }
        .soc-mod:hover .soc-go { opacity: 1 !important; }
      `}</style>
    </div>
  );
}

function Metric({ label, value, accent, dot, critical }) {
  return (
    <div style={{ ...st.metric, ...(critical ? st.metricCritical : {}) }}>
      <div style={st.metricLabel}>
        {dot && <span style={{ ...st.pulse, background: accent }} />}
        {label}
      </div>
      <div style={{ ...st.metricValue, color: accent }}>{value}</div>
    </div>
  );
}

function HealthMetric({ value, loading }) {
  const accent = value >= 80 ? "#4ade80" : value >= 50 ? "#fbbf24" : "#f87171";
  return (
    <div style={st.metric}>
      <div style={st.metricLabel}>HEALTH</div>
      <div style={{ ...st.metricValue, color: accent }}>{loading ? "--" : value + "%"}</div>
      <div style={st.bar}>
        <div style={{ ...st.barFill, width: value + "%", background: accent }} />
      </div>
    </div>
  );
}

const mono = "'JetBrains Mono', 'Fira Code', ui-monospace, 'SF Mono', Menlo, monospace";
const sans = "'Inter', system-ui, sans-serif";

const st = {
  page: { minHeight: "100vh", background: "#0a0f1e", padding: "28px 36px", fontFamily: sans, boxSizing: "border-box" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, borderBottom: "1px solid #1e293b", paddingBottom: 20 },
  eyebrow: { fontFamily: mono, fontSize: 11, letterSpacing: 3, color: "#475569", marginBottom: 6 },
  title: { margin: 0, fontSize: 26, fontWeight: 600, color: "#f1f5f9", letterSpacing: -0.5 },
  clock: { textAlign: "right", fontFamily: mono },
  clockTime: { fontSize: 22, color: "#38bdf8", fontWeight: 500, letterSpacing: 1 },
  clockDate: { fontSize: 12, color: "#475569", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 },
  metrics: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 36 },
  metric: { background: "#0d1424", border: "1px solid #1e293b", borderRadius: 10, padding: "18px 20px", position: "relative", overflow: "hidden" },
  metricCritical: { borderColor: "#7f1d1d" },
  metricLabel: { fontFamily: mono, fontSize: 11, letterSpacing: 2, color: "#64748b", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
  metricValue: { fontFamily: mono, fontSize: 40, fontWeight: 600, lineHeight: 1 },
  pulse: { width: 7, height: 7, borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px currentColor" },
  bar: { height: 4, background: "#1e293b", borderRadius: 2, marginTop: 14, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 2, transition: "width 0.6s ease" },
  sectionHead: { display: "flex", alignItems: "center", gap: 16, marginBottom: 16 },
  sectionLabel: { fontFamily: mono, fontSize: 12, letterSpacing: 3, color: "#475569" },
  sectionRule: { flex: 1, height: 1, background: "#1e293b" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 },
  link: { textDecoration: "none" },
  mod: { display: "flex", alignItems: "stretch", gap: 0, background: "#0d1424", border: "1px solid #1e293b", borderRadius: 10, overflow: "hidden", transition: "all 0.2s ease", cursor: "pointer" },
  modAccent: { width: 3, flexShrink: 0 },
  modBody: { flex: 1, padding: "18px 20px" },
  modCode: { fontFamily: mono, fontSize: 10, letterSpacing: 2, marginBottom: 6 },
  modName: { fontSize: 17, fontWeight: 600, color: "#e2e8f0" },
  modGo: { fontFamily: mono, fontSize: 11, letterSpacing: 1, color: "#475569", alignSelf: "center", paddingRight: 20, opacity: 0.5, transition: "opacity 0.2s" },
};
