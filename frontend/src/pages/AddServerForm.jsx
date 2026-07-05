import { useState, useEffect } from "react";
import client from "../api/client";

const EMPTY = {
  hostname: "", ipAddress: "", operatingSystem: "", osVersion: "",
  cpuCores: 1, memoryTotalGb: 0, diskTotalGb: 0, environment: "Production",
  owner: "", businessRole: "", criticality: "Medium", serverType: "",
  vendor: "", location: "", lifecycleStatus: "InService", notes: "",
  commissionedAt: "", warrantyUntil: "",
};

// Convertit une date ISO (avec heure) en "yyyy-MM-dd" pour input type=date
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export default function AddServerForm({ onCreated, editing, onCancelEdit }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = !!editing;

  // Quand un serveur à éditer arrive, pré-remplir et ouvrir
  useEffect(() => {
    if (editing) {
      setForm({
        ...EMPTY,
        ...editing,
        commissionedAt: toDateInput(editing.commissionedAt),
        warrantyUntil: toDateInput(editing.warrantyUntil),
      });
      setOpen(true);
    }
  }, [editing]);

  const upd = (f) => (e) => {
    const v = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm((p) => ({ ...p, [f]: v }));
  };

  const close = () => {
    setOpen(false); setError(""); setForm(EMPTY);
    if (isEdit && onCancelEdit) onCancelEdit();
  };

  const submit = async () => {
    setError(""); setSaving(true);
    const payload = {
      ...form,
      commissionedAt: form.commissionedAt || null,
      warrantyUntil: form.warrantyUntil || null,
    };
    try {
      if (isEdit) {
        await client.put(`/api/servers/${editing.id}`, payload);
      } else {
        await client.post("/api/servers", payload);
      }
      close();
      onCreated();
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(" ")
        : "Echec de l'enregistrement.";
      setError(msg);
    } finally { setSaving(false); }
  };

  if (!open) {
    return <button style={s.addBtn} onClick={() => setOpen(true)}>+ Ajouter un serveur</button>;
  }

  return (
    <div style={s.panel}>
      <div style={s.formTitle}>{isEdit ? `Modifier ${editing.hostname}` : "Nouveau serveur"}</div>

      <div style={s.section}>IDENTITE TECHNIQUE</div>
      <div style={s.grid}>
        <F label="Hostname"><input style={s.in} value={form.hostname} onChange={upd("hostname")} /></F>
        <F label="Adresse IP"><input style={s.in} value={form.ipAddress} onChange={upd("ipAddress")} placeholder="192.168.1.20" /></F>
        <F label="Systeme"><input style={s.in} value={form.operatingSystem} onChange={upd("operatingSystem")} placeholder="Ubuntu" /></F>
        <F label="Version OS"><input style={s.in} value={form.osVersion} onChange={upd("osVersion")} placeholder="24.04" /></F>
        <F label="Coeurs CPU"><input type="number" min="1" style={s.in} value={form.cpuCores} onChange={upd("cpuCores")} /></F>
        <F label="RAM (Go)"><input type="number" min="0" style={s.in} value={form.memoryTotalGb} onChange={upd("memoryTotalGb")} /></F>
        <F label="Disque (Go)"><input type="number" min="0" style={s.in} value={form.diskTotalGb} onChange={upd("diskTotalGb")} /></F>
        <F label="Environnement">
          <select style={s.in} value={form.environment} onChange={upd("environment")}>
            <option>Production</option><option>Staging</option><option>Development</option><option>Test</option>
          </select>
        </F>
      </div>

      <div style={s.section}>METADONNEES METIER</div>
      <div style={s.grid}>
        <F label="Proprietaire / equipe"><input style={s.in} value={form.owner} onChange={upd("owner")} placeholder="Equipe Infra" /></F>
        <F label="Role metier"><input style={s.in} value={form.businessRole} onChange={upd("businessRole")} placeholder="Serveur de facturation" /></F>
        <F label="Criticite">
          <select style={s.in} value={form.criticality} onChange={upd("criticality")}>
            <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
        </F>
        <F label="Statut cycle de vie">
          <select style={s.in} value={form.lifecycleStatus} onChange={upd("lifecycleStatus")}>
            <option value="InService">En service</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Decommissioning">Decommissionnement</option>
            <option value="Retired">Retire</option>
          </select>
        </F>
        <F label="Type de serveur">
          <select style={s.in} value={form.serverType} onChange={upd("serverType")}>
            <option value="">-</option><option>Physical</option><option>VM</option><option>Container</option>
          </select>
        </F>
        <F label="Fournisseur"><input style={s.in} value={form.vendor} onChange={upd("vendor")} placeholder="Dell, OVH..." /></F>
        <F label="Localisation"><input style={s.in} value={form.location} onChange={upd("location")} placeholder="DC Paris / Cloud" /></F>
        <F label="Mise en service"><input type="date" style={s.in} value={form.commissionedAt} onChange={upd("commissionedAt")} /></F>
        <F label="Fin de garantie"><input type="date" style={s.in} value={form.warrantyUntil} onChange={upd("warrantyUntil")} /></F>
      </div>

      <F label="Notes"><textarea style={{ ...s.in, minHeight: 60, resize: "vertical" }} value={form.notes} onChange={upd("notes")} /></F>

      {error && <p style={s.error}>{error}</p>}
      <div style={s.actions}>
        <button style={s.cancel} onClick={close}>Annuler</button>
        <button style={s.save} onClick={submit} disabled={saving}>
          {saving ? "Enregistrement..." : isEdit ? "Enregistrer" : "Creer"}
        </button>
      </div>
    </div>
  );
}

function F({ label, children }) {
  return <div><label style={s.label}>{label}</label>{children}</div>;
}

const s = {
  addBtn: { padding: "10px 16px", background: "#38bdf8", color: "#0a0f1e", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 },
  panel: { background: "#0d1424", border: "1px solid #1e293b", borderRadius: 12, padding: 22 },
  formTitle: { color: "#f1f5f9", fontSize: 16, fontWeight: 600, marginBottom: 16 },
  section: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#64748b", margin: "0 0 14px", paddingTop: 8 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 8 },
  label: { display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 5 },
  in: { width: "100%", padding: "8px 10px", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 6, fontSize: 14, color: "#e2e8f0", boxSizing: "border-box" },
  actions: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 },
  cancel: { padding: "8px 16px", background: "transparent", border: "1px solid #1e293b", borderRadius: 8, cursor: "pointer", color: "#94a3b8" },
  save: { padding: "8px 16px", background: "#38bdf8", color: "#0a0f1e", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  error: { color: "#f87171", background: "#1a0f14", border: "1px solid #7f1d1d", padding: "8px 12px", borderRadius: 6, marginTop: 12, fontSize: 13 },
};
