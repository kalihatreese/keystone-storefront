import { useState } from "react";
import { getLicenseKey, setLicenseKey, requireLicense } from "../license-request";

export default function Admin(){
  const [msg,setMsg] = useState("");
  const [val,setVal] = useState(getLicenseKey() || "");
  const check=()=>{
    try{ const k=requireLicense(); setMsg("OK: "+k); }catch(e){ setMsg("ERR: "+e.message); }
  };
  const save=()=>{ setLicenseKey(val); setMsg("Saved"); };
  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="card">
        <label>License Key</label>
        <input value={val} onChange={e=>setVal(e.target.value)} style={{width:"100%",padding:8,margin:"8px 0"}}/>
        <button className="btn" onClick={save}>Save</button>
        <button className="btn" style={{marginLeft:8}} onClick={check}>Verify</button>
        <p className="mono">{msg}</p>
      </div>
    </div>
  );
}
