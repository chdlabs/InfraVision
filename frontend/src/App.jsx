import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Servers from "./pages/Servers";
import Placeholder from "./pages/Placeholder";
import Monitoring from "./pages/Monitoring";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/servers" replace />} />
          <Route path="servers" element={<Servers />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route
            path="veille"
            element={<Placeholder title="Veille technologique" description="La plateforme de veille technologique de l'entreprise sera intégrée ici." />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
