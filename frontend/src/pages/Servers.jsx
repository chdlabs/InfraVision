import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import AddServerForm from "./AddServerForm";
import ServerDetail from "./ServerDetail";

const CRIT_COLORS = { Critical: "#f87171", High: "#fb923c", Medium: "#38bdf8", Low: "#94a3b8" };

export default function Servers() {
  const [servers, setServers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [critFilter, setCritFilter] = useState("");
  const [envFilter, setEnvFilter] = useState("");
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    client.get("/api/servers")
      .then((r) => { setServers(r.data); setError(""); })
      .catch(() => { setError("Session expiree."); localStorage.removeItem("token"); navigate("/"); })
      .finally(() => setLoading(false));
  };

  useEffect(load, [navigate]);

  const del = async (e, id, hostname) => {
    e.stopPropagation();
    if (!window.confirm(`Supprimer "${hostname}" ?`)) return;
    try {
      await client.delete(`/api/servers/${id}`);
      setServers((p) => p.filter((s) => s.id !== id));
    } catch { setError("Echec de la suppression."); }
  };

  const startEdit = (e, s) => { e.stopPropagation(); setEditing(s); setSelected(null); };

  const filtered = servers.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      s.hostname?.toLowerCase().includes(q) ||
      s.ipAddress?.toLowerCase().includes(q) ||
      s.owner?.toLowerCase().includes(q) ||
      s.businessRole?.toLowerCase().includes(q);
    const matchCrit = !critFilter || s.criticality === critFilter;
    const matchEnv = !envFilter || s.environment === envFilter;
    return matchSearch && matchCrit && matchEnv;
  });

  const online = servers.filter((s) => s.isOnline).length;

  return (
    <div style={st.page}>
      <div style={st.head}>
        <div>
          <div style={st.eyebrow}>INVENTORY</div>
          <h1 style={st.title}>Parc de serveurs</h1>
        </div>
      </div>

      <div style={st.stats}>
        <Stat value={loading ? "--" : servers.length} label="TOTAL" accent="#38bdf8" />
        <Stat value={loading ? "--" : online} label="ONLINE" accent="#4ade80" />
        <Stat value={loading ? "--" : servers.length - online} label="OFFLINE" accent="#f87171" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <AddServerForm onCreated={load} editing={editing} onCancelEdit={() => setEditing(null)} />
      </div>

      <div style={st.filters}>
        <input style={st.searchIn} placeholder="Rechercher (hostname, IP, proprietaire...)"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <select style={st.filterSel} value={critFilter} onChange={(e) => setCritFilter(e.target.value)}>
          <option value="">Toutes criticites</option>
          <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select style={st.filterSel} value={envFilter} onChange={(e) => setEnvFilter(e.target.value)}>
          <option value="">Tous environnements</option>
          <option>Production</option><option>Staging</option><option>Development</option><option>Test</option>
        </select>
      </div>

      {error && <p style={st.error}>{error}</p>}

      <div style={st.tableWrap}>
        {loading ? <p style={st.muted}>Chargement...</p> : (
          <table style={st.table}>
            <thead>
              <tr>
                <th style={st.th}>ETAT</th>
                <th style={st.th}>HOSTNAME</th>
                <th style={st.th}>IP</th>
                <th style={st.th}>ROLE METIER</th>
                <th style={st.th}>CRITICITE</th>
                <th style={st.th}>PROPRIETAIRE</th>
                <th style={st.th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={st.tr} onClick={() => setSelected(s)} className="srv-row">
                  <td style={st.td}><span style={{ ...st.dot, background: s.isOnline ? "#4ade80" : "#f87171" }} /></td>
                  <td style={{ ...st.td, fontWeight: 600, color: "#e2e8f0" }}>{s.hostname}</td>
                  <td style={{ ...st.td, fontFamily: "'JetBrains Mono', monospace", color: "#94a3b8" }}>{s.ipAddress}</td>
                  <td style={st.td}>{s.businessRole || "-"}</td>
                  <td style={st.td}>
                    <span style={{ ...st.crit, color: CRIT_COLORS[s.criticality] || "#94a3b8" }}>{s.criticality || "-"}</span>
                  </td>
                  <td style={st.td}>{s.owner || "-"}</td>
                  <td style={{ ...st.td, whiteSpace: "nowrap" }}>
                    <button style={st.editBtn} onClick={(e) => startEdit(e, s)}>Modifier</button>
                    <button style={st.delBtn} onClick={(e) => del(e, s.id, s.hostname)}>Suppr.</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td style={{ ...st.td, textAlign: "center" }} colSpan={7}>Aucun serveur ne correspond.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ServerDetail server={selected} onClose={() => setSelected(null)} />
      <style>{`.srv-row:hover { background: #0f1729 !important; cursor: pointer; }`}</style>
    </div>
  );
}

function Stat({ value, label, accent }) {
  return (
    <div style={st.statCard}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 30, fontWeight: 600, color: accent }}>{value}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b" }}>{label}</div>
    </div>
  );
}

const st = {
  page: { padding: 32, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", boxSizing: "border-box" },
  head: { marginBottom: 24 },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: "#475569", marginBottom: 6 },
  title: { margin: 0, color: "#f1f5f9", fontSize: 26, fontWeight: 600 },
  stats: { display: "flex", gap: 14, marginBottom: 28 },
  statCard: { background: "#0d1424", border: "1px solid #1e293b", borderRadius: 10, padding: "16px 22px", minWidth: 120 },
  filters: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
  searchIn: { flex: 1, minWidth: 240, padding: "9px 12px", background: "#0d1424", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0", fontSize: 14 },
  filterSel: { padding: "9px 12px", background: "#0d1424", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0", fontSize: 14 },
  error: { color: "#f87171", background: "#1a0f14", border: "1px solid #7f1d1d", padding: "10px 14px", borderRadius: 8, marginBottom: 16 },
  tableWrap: { background: "#0d1424", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "14px 18px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: "#475569", borderBottom: "1px solid #1e293b" },
  tr: { borderBottom: "1px solid #141d30", transition: "background 0.12s" },
  td: { padding: "14px 18px", color: "#cbd5e1", fontSize: 14 },
  dot: { width: 9, height: 9, borderRadius: "50%", display: "inline-block", boxShadow: "0 0 6px currentColor" },
  crit: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700 },
  editBtn: { padding: "5px 12px", border: "1px solid #1e293b", background: "transparent", color: "#38bdf8", borderRadius: 6, cursor: "pointer", fontSize: 12, marginRight: 8 },
  delBtn: { padding: "5px 12px", border: "1px solid #7f1d1d", background: "transparent", color: "#f87171", borderRadius: 6, cursor: "pointer", fontSize: 12 },
  muted: { color: "#64748b", padding: 20 },
};
