import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Servers from "./pages/Servers";
import Monitoring from "./pages/Monitoring";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="servers" element={<Servers />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route
            path="veille"
            element={<Placeholder title="Veille technologique" description="La plateforme de veille technologique sera integree ici." />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
