export function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function sumMonthly(subscriptions) {
  return subscriptions.reduce((sum, s) => {
    if (s.billingCycle === "monthly") return sum + Number(s.price || 0);
    if (s.billingCycle === "yearly") return sum + Number(s.price || 0) / 12;
    return sum;
  }, 0);
}

export function sumYearly(subscriptions) {
  return subscriptions.reduce((sum, s) => {
    if (s.billingCycle === "yearly") return sum + Number(s.price || 0);
    if (s.billingCycle === "monthly") return sum + Number(s.price || 0) * 12;
    return sum;
  }, 0);
}
