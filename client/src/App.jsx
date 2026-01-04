import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Subscriptions from "./pages/Subscriptions";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Simple top nav */}
      <header
        style={{
          display: "flex",
          gap: 12,
          padding: 16,
          borderBottom: "1px solid #e5e5e5",
          alignItems: "center",
        }}
      >
        <strong>QuietGuard</strong>

        <nav style={{ display: "flex", gap: 10 }}>
          <Link to="/">Home</Link>
          <Link to="/subscriptions">Subscriptions</Link>
        </nav>
      </header>

      {/* Page content */}
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
