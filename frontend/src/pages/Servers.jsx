import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import AddServerForm from "./AddServerForm";

export default function Servers() {
  const [servers, setServers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadServers = () => {
    setLoading(true);
    client
      .get("/api/servers")
      .then((res) => {
        setServers(res.data);
        setError("");
      })
      .catch(() => {
        setError("Session expirée ou accès refusé.");
        localStorage.removeItem("token");
        navigate("/");
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadServers, [navigate]);

  const handleDelete = async (id, hostname) => {
    if (!window.confirm(`Supprimer le serveur "${hostname}" ?`)) return;
    try {
      await client.delete(`/api/servers/${id}`);
      setServers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Échec de la suppression.");
    }
  };

  const onlineCount = servers.filter((s) => s.isOnline).length;

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ margin: "0 0 4px", color: "#0f172a" }}>Serveurs supervisés</h1>
      <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14 }}>
        Inventaire de l'infrastructure
      </p>

      <div style={styles.statsRow}>
        <Stat value={servers.length} label="Serveurs" color="#0f172a" />
        <Stat value={onlineCount} label="En ligne" color="#16a34a" />
        <Stat value={servers.length - onlineCount} label="Hors ligne" color="#dc2626" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <AddServerForm onCreated={loadServers} />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.card}>
        {loading ? (
          <p style={{ color: "#94a3b8", padding: 16 }}>Chargement…</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>État</th>
                <th style={styles.th}>Hostname</th>
                <th style={styles.th}>Adresse IP</th>
                <th style={styles.th}>Système</th>
                <th style={styles.th}>Environnement</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {servers.map((s) => (
                <tr key={s.id} style={styles.tr}>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: s.isOnline ? "#dcfce7" : "#fee2e2",
                        color: s.isOnline ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {s.isOnline ? "En ligne" : "Hors ligne"}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{s.hostname}</td>
                  <td style={styles.td}>{s.ipAddress}</td>
                  <td style={styles.td}>{s.operatingSystem} {s.osVersion}</td>
                  <td style={styles.td}>{s.environment}</td>
                  <td style={styles.td}>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(s.id, s.hostname)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {servers.length === 0 && (
                <tr>
                  <td style={{ ...styles.td, textAlign: "center" }} colSpan={6}>
                    Aucun serveur enregistré.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label, color }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      <div style={{ color: "#64748b", fontSize: 13 }}>{label}</div>
    </div>
  );
}

const styles = {
  statsRow: { display: "flex", gap: 16, marginBottom: 24 },
  statCard: {
    flex: 1, background: "#fff", borderRadius: 12, padding: "16px 20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  card: { background: "#fff", borderRadius: 12, padding: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "12px 16px", fontSize: 12, textTransform: "uppercase",
    color: "#94a3b8", borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px 16px", color: "#334155", fontSize: 14 },
  badge: { padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 },
  deleteBtn: {
    padding: "6px 12px", border: "1px solid #fecaca", background: "#fff",
    color: "#dc2626", borderRadius: 6, cursor: "pointer", fontSize: 13,
  },
  error: {
    color: "#dc2626", background: "#fee2e2", padding: "10px 16px",
    borderRadius: 8, marginBottom: 16,
  },
};
