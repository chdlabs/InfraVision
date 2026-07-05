import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await client.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/app/servers");
    } catch {
      setError("Identifiants invalides.");
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "80px auto", fontFamily: "sans-serif" }}>
      <h2>InfraVision — Connexion</h2>
      <input
        placeholder="Utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button onClick={handleSubmit} style={{ width: "100%", padding: 8 }}>
        Se connecter
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
