import { useEffect, useState } from "react";

export default function Dashboard(){
  const [a,setA]=useState(null);
  useEffect(()=>{ fetch("/Autotrend_vault/api/analytics.json").then(r=>r.json()).then(setA); },[]);
  return (
    <div className="container">
      <h1>Analytics</h1>
      <div className="card">
        <pre className="mono" style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(a,null,2)}</pre>
      </div>
      <div className="card">
        <h3>Mutation Log (last build)</h3>
        <p className="mono">Static only. Write-time increment executed during build.</p>
      </div>
    </div>
  );
}
