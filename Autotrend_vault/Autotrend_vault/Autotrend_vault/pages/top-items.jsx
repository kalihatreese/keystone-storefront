import { useEffect, useState } from "react";

export default function TopItems(){
  const [data,setData]=useState({items:[],date:""});
  useEffect(()=>{
    fetch("/Autotrend_vault/api/top-items.json").then(r=>r.json()).then(setData).catch(()=>{});
  },[]);
  return (
    <div className="container">
      <h1>Top Items</h1>
      <p className="mono">date: {data.date} · mutation: {data.mutation || "n/a"}</p>
      <div className="grid">
        {data.items.map((it,idx)=>(
          <div className="card" key={idx}>
            <div className="badge">{it.category}</div>
            <h3>{it.title}</h3>
            <img src={it.image} alt={it.title} style={{width:"100%",borderRadius:12}}/>
            <p>{it.description}</p>
            <p className="mono">SKU {it.sku}</p>
            <p><b>${Number(it.price).toFixed(2)}</b></p>
            <button className="btn" onClick={()=>alert("Checkout demo: static page")}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
