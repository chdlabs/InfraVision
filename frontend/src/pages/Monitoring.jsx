export default function Monitoring() {
  const tools = [
    { name: "Grafana", url: "http://grafana.local", logo: "/grafana-logo.svg" },
    { name: "Zabbix", url: "http://zabbix.local", logo: "/zabbix-logo.png" },
  ];

  return (
    <div style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ margin: "0 0 4px", color: "#0f172a" }}>Monitoring</h1>
      <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14 }}>
        Outils de supervision de linfrastructure
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {tools.map(function (t) {
          return (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 220,
                height: 120,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
              }}
            >
              <img src={t.logo} alt={t.name} style={{ maxHeight: 56, maxWidth: 160 }} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
