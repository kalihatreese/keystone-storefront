export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>🧬 Autotrend Vault</h1>
      <p>Welcome to your mutation-grade storefront. The echo is live on port 3001.</p>
      <ul>
        <li><a href="/vault-html" target="_blank">Vault HTML Echo</a></li>
        <li><a href="/api/checkout">Checkout API</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </main>
  );
}
