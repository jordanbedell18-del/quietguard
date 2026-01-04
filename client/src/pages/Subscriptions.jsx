import { Link } from "react-router-dom";

export default function Subscriptions() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Subscriptions</h1>
      <p>This is where we’ll build your subscription list.</p>

      <Link to="/">
        <button
          style={{
            padding: "10px 16px",
            marginTop: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
