import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import mockSubscriptions from "../data/mocksubscriptions";
import { sumMonthly, sumYearly, formatUSD } from "../lib/subscription-math";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  // Form state (lean)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [error, setError] = useState("");

  const monthlyTotal = useMemo(() => sumMonthly(subscriptions), [subscriptions]);
  const yearlyTotal = useMemo(() => sumYearly(subscriptions), [subscriptions]);

  function addSubscription(e) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      setError("Name is required.");
      return;
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("Price must be a number greater than 0.");
      return;
    }
    if (billingCycle !== "monthly" && billingCycle !== "yearly") {
      setError("Billing cycle must be monthly or yearly.");
      return;
    }

    const newSub = {
      id: Date.now(), // good enough for MVP
      name: trimmedName,
      price: Number(numericPrice.toFixed(2)),
      billingCycle,
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    // reset form
    setName("");
    setPrice("");
    setBillingCycle("monthly");
  }

  function removeSubscription(id) {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Subscriptions</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Add your subscriptions and see your total monthly/yearly spend.
      </p>

      {/* Totals */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 12,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>Monthly total</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {formatUSD(monthlyTotal)}
          </div>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 12,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: "#666" }}>Yearly total</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {formatUSD(yearlyTotal)}
          </div>
        </div>
      </div>

      {/* Add form */}
      <div
        style={{
          marginTop: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 18 }}>
          Add a subscription
        </h2>

        <form onSubmit={addSubscription} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, color: "#666" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Netflix"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, color: "#666" }}>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="15.49"
              inputMode="decimal"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, color: "#666" }}>Billing cycle</label>
            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {error ? (
            <div style={{ color: "crimson", fontSize: 13 }}>{error}</div>
          ) : null}

          <button
            type="submit"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Add subscription
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Your list</h2>

        {subscriptions.length === 0 ? (
          <div style={{ color: "#666" }}>
            No subscriptions yet. Add one above.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {subscriptions.map((s) => (
              <div
                key={s.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{s.name}</div>
                  <div style={{ color: "#555", fontSize: 13 }}>
                    {formatUSD(s.price)} / {s.billingCycle}
                  </div>
                </div>

                <button
                  onClick={() => removeSubscription(s.id)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 16px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
