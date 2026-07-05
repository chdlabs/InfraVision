export default function Placeholder({ title, description }) {
  return (
    <div style={{ padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#0f172a" }}>{title}</h1>
      <p style={{ color: "#64748b", maxWidth: 500 }}>{description}</p>
      <div
        style={{
          marginTop: 24,
          padding: 40,
          background: "#fff",
          borderRadius: 12,
          border: "2px dashed #cbd5e1",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        Module à venir
      </div>
    </div>
  );
}
