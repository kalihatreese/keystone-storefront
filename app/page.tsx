import fs from 'fs';
import path from 'path';

function readJSON(p: string){ try{ return JSON.parse(fs.readFileSync(p,'utf-8')); } catch { return {}; } }

export default function Home(){
  const pub = path.join(process.cwd(),'public');
  const topItems = readJSON(path.join(pub,'top-items.json'));
  const topElec  = readJSON(path.join(pub,'top-electronics.json'));
  const models   = readJSON(path.join(pub,'keystone-models.json'));

  const itemsA = Array.isArray(topItems.items) ? topItems.items : Object.values(topItems.items||{});
  const itemsB = Array.isArray(topElec.items) ? topElec.items : [];
  const itemsC = Array.isArray(models.items) ? models.items : [];

  const Item = ({name,price}:{name:string;price:number}) => (
    <li><strong>{name}</strong> — ${Number(price||0)}</li>
  );

  return (
    <main style={{maxWidth:900,margin:'40px auto',fontFamily:'ui-sans-serif'}}>
      <h1>Keystone Storefront</h1>
      <p>We sell Keystone AI models & MEV bots — plus the hottest electronics. We run what we sell.</p>

      <h2 style={{marginTop:24}}>Top 50 Items (Today/Yesterday)</h2>
      <ul>{itemsA.slice(0,50).map((it:any,i:number)=><Item key={i} name={it.name} price={it.price} />)}</ul>

      <h2 style={{marginTop:24}}>Top 50 Electronics (Today/Yesterday)</h2>
      <ul>{itemsB.slice(0,50).map((it:any,i:number)=><Item key={i} name={it.name} price={it.price} />)}</ul>

      <h2 style={{marginTop:24}}>Keystone Models & Bots</h2>
      <ul>{itemsC.slice(0,50).map((it:any,i:number)=><Item key={i} name={it.name} price={it.price} />)}</ul>

      <p style={{marginTop:24}}>
        <a href="/top-items">View Items JSON</a> · <a href="/vault-json">Vault JSON</a> · <a href="/vault.html">Vault HTML</a>
      </p>
    </main>
  );
}
