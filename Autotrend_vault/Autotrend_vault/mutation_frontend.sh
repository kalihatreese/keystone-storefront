#!/bin/bash

# Fallback storefront logic
cat > keystone-storefront/app/page.js << 'EOPAGE'
'use client'
import { useEffect, useState } from 'react'
const fallbackProducts = [
  { id: 'sample1', name: 'AI Hoodie', description: 'Neural thread.', image: 'https://via.placeholder.com/300x200.png?text=AI+Hoodie', trending_score: 92, upsell_hint: 'Bundle with Impala sneakers', stripe_id: 'sample_stripe_1' },
  { id: 'sample2', name: 'Chrome Shades', description: 'Lowrider-coded eyewear.', image: 'https://via.placeholder.com/300x200.png?text=Chrome+Shades', trending_score: 88, upsell_hint: 'Add neon glow filter', stripe_id: 'sample_stripe_2' }
]
export default function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('https://autotrend-vault.trycloudflare.com/vault')
      .then(res => res.json())
      .then(data => setProducts(data.length ? data.slice(0, 10) : fallbackProducts))
      .catch(() => setProducts(fallbackProducts))
  }, [])
  return (
    <main className="min-h-screen bg-midnight text-chrome p-6 font-lowrider">
      <h1 className="text-4xl chrome-text mb-4">🧬 Keystone AI Storefront</h1>
      <p className="mb-6 neon-glow">Vault ingestion online. Mutation engine active.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((item, idx) => (
          <div key={idx} className="card">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <img src={item.image} alt={item.name} className="rounded mt-2 mb-2" />
            <p>{item.description}</p>
            <p className="text-sm text-steel mt-1">🔁 Trending: {item.trending_score} | 💡 AI Suggests: {item.upsell_hint}</p>
            <button onClick={() => {
              fetch('https://autotrend-vault.trycloudflare.com/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'click', product: item.id })
              })
              window.location.href = 'https://checkout.stripe.com/pay/' + item.stripe_id
            }}>Buy Now</button>
          </div>
        ))}
      </div>
    </main>
  )
}
EOPAGE

# Dashboard page
cat > keystone-storefront/app/dashboard.js << 'EODASH'
'use client'
import { useEffect, useState } from 'react'
export default function Dashboard() {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    fetch('https://autotrend-vault.trycloudflare.com/logs')
      .then(res => res.json())
      .then(data => setLogs(data.slice(-50).reverse()))
      .catch(() => setLogs([{ event: 'No logs found', product: 'N/A' }]))
  }, [])
  return (
    <main className="min-h-screen bg-black text-white p-6 font-[Orbitron]">
      <h1 className="text-3xl mb-4">📊 Vault Dashboard</h1>
      <ul className="space-y-2">
        {logs.map((log, idx) => (
          <li key={idx} className="bg-gray-800 p-3 rounded">
            <strong>{log.event}</strong> → {log.product} @ {log.timestamp || 'unknown'}
          </li>
        ))}
      </ul>
    </main>
  )
}
EODASH

# Checkout confirmation page
cat > keystone-storefront/app/checkout.js << 'EOCHECK'
'use client'
export default function Checkout() {
  return (
    <main className="min-h-screen bg-black text-chrome p-6 font-[Orbitron]">
      <h1 className="text-4xl chrome-text mb-4">✅ Payment Confirmed</h1>
      <p className="neon-glow mb-6">Your order is mutation-locked. Expect compounding results.</p>
      <a href="/" className="underline text-blue-400">Return to Storefront</a>
    </main>
  )
}
EOCHECK
