"use client";
import { useEffect, useState } from "react";
type Prod = { sku?:string; title?:string; category?:string; price?:string; image?:string; affiliate?:string; };
export default function ProductList() {
  const [items,setItems] = useState<Prod[]>([]);
  const [err,setErr] = useState<string>("");
  useEffect(()=>{ fetch("/api/products").then(r=>r.json()).then(d=>setItems(d?.products??[])).catch(e=>setErr(String(e))); },[]);
  if (err) return <p className="text-red-600">Error: {err}</p>;
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.slice(0,100).map((p,i)=>(
        <li key={i} className="border rounded-xl p-4">
          <div className="font-semibold">{p.title}</div>
          <div className="text-xs opacity-70">{p.category} • {p.sku}</div>
          {p.price && <div className="text-sm mt-1">Price: {p.price}</div>}
          <div className="mt-2 flex gap-2">
            {p.affiliate && <a className="text-blue-600 underline" href={p.affiliate} target="_blank" rel="noreferrer">Buy</a>}
          </div>
        </li>
      ))}
    </ul>
  );
}
