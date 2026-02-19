const fs = require('fs'), path = require('path');
const pub = path.join(process.cwd(),'public'); if(!fs.existsSync(pub)) fs.mkdirSync(pub,{recursive:true});

// fractures.json
let fractures=[]; try{fractures=fs.readFileSync(path.join(process.cwd(),'runtime_fractures.log'),'utf-8').split('\n').filter(Boolean);}catch{}
fs.writeFileSync(path.join(pub,'fractures.json'), JSON.stringify({status:'ok',fractures},null,2));

// top-items.json
const items={
  "autotrend-001": { name:"Keystone RapidAlpha-X AI Trader", price:999 },
  "autotrend-002": { name:"Keystone MEV Hunter Pro", price:499 }
};
fs.writeFileSync(path.join(pub,'top-items.json'), JSON.stringify({items},null,2));

// top-electronics.json (if missing, seed minimal fallback)
try{
  fs.accessSync(path.join(pub,'top-electronics.json'));
}catch{
  fs.writeFileSync(path.join(pub,'top-electronics.json'), JSON.stringify({items:[
    {"name":"Apple iPhone 15 Pro Max","price":1199},
    {"name":"Sony PlayStation 5 Slim","price":499}
  ]},null,2));
}

// vault stubs
fs.writeFileSync(path.join(pub,'vault.json'), JSON.stringify({items},null,2));
fs.writeFileSync(path.join(pub,'vault.html'), `<pre>${JSON.stringify({items},null,2)}</pre>`);
console.log('[gen_static] wrote fractures.json, top-items.json, top-electronics.json, vault.{json,html}');
