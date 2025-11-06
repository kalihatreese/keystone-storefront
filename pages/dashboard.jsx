import useSWR from "swr";
const fetcher = (u)=>fetch(u).then(r=>r.json());
export default function Dashboard(){
  const {data}=useSWR("/data/analytics-dashboard.json", fetcher, {refreshInterval:10000});
  const t = data?.totals || {};
  return (
    <main style={{fontFamily:'sans-serif',padding:20}}>
      <h1>📊 Dashboard</h1>
      <p>Date: {data?.date}</p>
      <ul>
        <li>Total Items: {t.count}</li>
        <li>Electronics: {t.electronics}</li>
        <li>General: {t.general}</li>
        <li>Mutations: {data?.mutations}</li>
      </ul>
    </main>
  );
}
