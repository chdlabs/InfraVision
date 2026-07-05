const CRIT_COLORS = {
  Critical: "#f87171", High: "#fb923c", Medium: "#38bdf8", Low: "#94a3b8",
};
const LIFECYCLE_LABELS = {
  InService: "En service", Maintenance: "Maintenance",
  Decommissioning: "Decommissionnement", Retired: "Retire",
};

export default function ServerDetail({ server, onClose }) {
  if (!server) return null;

  const zabbixUrl = "http://zabbix.local";
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("fr-FR") : "-");
  const v = (x) => (x && x !== "" ? x : "-");

  return (
    <>
      <div style={st.overlay} onClick={onClose} />
      <aside style={st.drawer}>
        <div style={st.header}>
          <div>
            <div style={{ ...st.critBadge, background: (CRIT_COLORS[server.criticality] || "#94a3b8") + "22", color: CRIT_COLORS[server.criticality] || "#94a3b8" }}>
              {server.criticality || "Medium"}
            </div>
            <h2 style={st.title}>{server.hostname}</h2>
            <div style={st.subtitle}>{v(server.businessRole)}</div>
          </div>
          <button style={st.close} onClick={onClose}>&times;</button>
        </div>

        <div style={st.statusRow}>
          <span style={{ ...st.dot, background: server.isOnline ? "#4ade80" : "#f87171", boxShadow: `0 0 8px ${server.isOnline ? "#4ade80" : "#f87171"}` }} />
          {server.isOnline ? "En ligne" : "Hors ligne"}
          <span style={st.lifecycle}>{LIFECYCLE_LABELS[server.lifecycleStatus] || server.lifecycleStatus}</span>
        </div>

        <Section title="IDENTITE TECHNIQUE">
          <Row label="Adresse IP" value={v(server.ipAddress)} mono />
          <Row label="Systeme" value={`${v(server.operatingSystem)} ${server.osVersion || ""}`} />
          <Row label="CPU" value={`${server.cpuCores} coeurs`} />
          <Row label="RAM" value={`${server.memoryTotalGb} Go`} />
          <Row label="Disque" value={`${server.diskTotalGb} Go`} />
          <Row label="Environnement" value={v(server.environment)} />
          <Row label="Type" value={v(server.serverType)} />
        </Section>

        <Section title="INVENTAIRE METIER">
          <Row label="Proprietaire" value={v(server.owner)} />
          <Row label="Role metier" value={v(server.businessRole)} />
          <Row label="Fournisseur" value={v(server.vendor)} />
          <Row label="Localisation" value={v(server.location)} />
          <Row label="Mise en service" value={fmtDate(server.commissionedAt)} />
          <Row label="Fin de garantie" value={fmtDate(server.warrantyUntil)} />
        </Section>

        {server.notes && (
          <Section title="NOTES">
            <div style={st.notes}>{server.notes}</div>
          </Section>
        )}

        <a href={zabbixUrl} target="_blank" rel="noreferrer" style={st.zabbixBtn}>
          Voir la supervision temps reel (Zabbix) &rarr;
        </a>
      </aside>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div style={st.section}>
      <div style={st.sectionTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div style={st.row}>
      <span style={st.rowLabel}>{label}</span>
      <span style={{ ...st.rowValue, fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit" }}>{value}</span>
    </div>
  );
}

const st = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 },
  drawer: { position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "90vw", background: "#0d1424", borderLeft: "1px solid #1e293b", zIndex: 50, padding: 28, overflowY: "auto", fontFamily: "'Inter', system-ui, sans-serif", boxSizing: "border-box" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 },
  critBadge: { display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, padding: "3px 8px", borderRadius: 5, marginBottom: 10, fontWeight: 700 },
  title: { margin: 0, color: "#f1f5f9", fontSize: 22 },
  subtitle: { color: "#64748b", fontSize: 13, marginTop: 4 },
  close: { background: "transparent", border: "none", color: "#64748b", fontSize: 28, cursor: "pointer", lineHeight: 1 },
  statusRow: { display: "flex", alignItems: "center", gap: 8, color: "#cbd5e1", fontSize: 13, marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid #1e293b" },
  dot: { width: 8, height: 8, borderRadius: "50%" },
  lifecycle: { marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b", letterSpacing: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#475569", marginBottom: 10 },
  row: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #141d30" },
  rowLabel: { color: "#64748b", fontSize: 13 },
  rowValue: { color: "#e2e8f0", fontSize: 13, textAlign: "right" },
  notes: { color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, background: "#0a0f1e", padding: 12, borderRadius: 8, border: "1px solid #1e293b" },
  zabbixBtn: { display: "block", textAlign: "center", padding: "12px", background: "#d40000", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14, marginTop: 8 },
};
