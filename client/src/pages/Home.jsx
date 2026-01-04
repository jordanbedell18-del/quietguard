import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>QuietGuard</h1>
      <p>Track subscriptions. Catch price increases. Protect your budget.</p>

      <Link to="/subscriptions">
        <button
          style={{
            padding: "10px 16px",
            marginTop: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Go to Subscriptions
        </button>
      </Link>
    </div>
  );
}
