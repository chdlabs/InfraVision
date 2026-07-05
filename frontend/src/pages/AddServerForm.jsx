import { useState } from "react";
import client from "../api/client";

const EMPTY = {
  hostname: "",
  ipAddress: "",
  operatingSystem: "",
  osVersion: "",
  cpuCores: 1,
  memoryTotalGb: 0,
  diskTotalGb: 0,
  environment: "Production",
};

export default function AddServerForm({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field) => (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    setError("");
    setSaving(true);
    try {
      await client.post("/api/servers", form);
      setForm(EMPTY);
      setOpen(false);
      onCreated();
    } catch (err) {
      const msg =
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(" ")
          : "Échec de la création.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button style={styles.addBtn} onClick={() => setOpen(true)}>
        + Ajouter un serveur
      </button>
    );
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.panelTitle}>Nouveau serveur</h3>
      <div style={styles.grid}>
        <Field label="Hostname">
          <input style={styles.input} value={form.hostname} onChange={update("hostname")} />
        </Field>
        <Field label="Adresse IP">
          <input style={styles.input} value={form.ipAddress} onChange={update("ipAddress")} placeholder="192.168.1.20" />
        </Field>
        <Field label="Système">
          <input style={styles.input} value={form.operatingSystem} onChange={update("operatingSystem")} placeholder="Ubuntu" />
        </Field>
        <Field label="Version OS">
          <input style={styles.input} value={form.osVersion} onChange={update("osVersion")} placeholder="24.04" />
        </Field>
        <Field label="Cœurs CPU">
          <input type="number" min="1" style={styles.input} value={form.cpuCores} onChange={update("cpuCores")} />
        </Field>
        <Field label="RAM (Go)">
          <input type="number" min="0" style={styles.input} value={form.memoryTotalGb} onChange={update("memoryTotalGb")} />
        </Field>
        <Field label="Disque (Go)">
          <input type="number" min="0" style={styles.input} value={form.diskTotalGb} onChange={update("diskTotalGb")} />
        </Field>
        <Field label="Environnement">
          <select style={styles.input} value={form.environment} onChange={update("environment")}>
            <option>Production</option>
            <option>Staging</option>
            <option>Development</option>
            <option>Test</option>
          </select>
        </Field>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.actions}>
        <button style={styles.cancelBtn} onClick={() => { setOpen(false); setError(""); }}>
          Annuler
        </button>
        <button style={styles.saveBtn} onClick={submit} disabled={saving}>
          {saving ? "Enregistrement…" : "Créer"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  addBtn: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  },
  panel: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },
  panelTitle: { margin: "0 0 16px", color: "#0f172a" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
  },
  label: { display: "block", fontSize: 12, color: "#64748b", marginBottom: 4 },
  input: {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 6,
    fontSize: 14,
    boxSizing: "border-box",
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 },
  cancelBtn: {
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    cursor: "pointer",
    color: "#334155",
  },
  saveBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    color: "#dc2626",
    background: "#fee2e2",
    padding: "8px 12px",
    borderRadius: 6,
    marginTop: 12,
    fontSize: 13,
  },
};
