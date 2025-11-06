import useSWR from "swr";
const fetcher = (u)=>fetch(u).then(r=>r.text());
export default function AuditDashboard(){
  const {data}=useSWR("/data/audit.log", fetcher, {refreshInterval:10000});
  return (
    <main style={{fontFamily:'monospace',padding:20}}>
      <h1>📜 Steward Audit Log</h1>
      <pre>{data}</pre>
    </main>
  );
}
