import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function topItemsPath() {
  const home = process.env.HOME || '/data/data/com.termux/files/home';
  return path.join(home, 'keystone-kash-store', 'top-items.json');
}

function fallbackItems(): any[] {
  // 50 general + 50 electronics
  const out: any[] = [];
  for (let i = 0; i < 50; i++) out.push({ sku:`GEN-${i}`,  title:`GENERAL_${i}`,     price: +(10 + i*0.17).toFixed(2), category:'general' });
  for (let i = 0; i < 50; i++) out.push({ sku:`ELEC-${i}`, title:`ELECTRONICS_${i}`, price: +(25 + i*0.33).toFixed(2), category:'electronics' });
  return out;
}

export async function GET() {
  const p = topItemsPath();
  let items: any[] = [];
  let date = new Date().toISOString().slice(0,10);

  try {
    const text = await fs.readFile(p, 'utf8');
    const data = JSON.parse(text);
    date = (data.forDateET || date);
    const g = Array.isArray(data.general) ? data.general : [];
    const e = Array.isArray(data.electronics) ? data.electronics : [];
    // map to a normalized item list; if not enough, pad with fallback
    items = [
      ...g.slice(0,50).map((r:any, i:number)=>({ sku:r.sku||`GEN-${i}`,  title:r.name||r.title||`GENERAL_${i}`,     price:+(r.price||10+i*0.11).toFixed(2), category:'general'})),
      ...e.slice(0,50).map((r:any, i:number)=>({ sku:r.sku||`ELEC-${i}`, title:r.name||r.title||`ELECTRONICS_${i}`, price:+(r.price||25+i*0.21).toFixed(2), category:'electronics'})),
    ];
    if (items.length < 100) items = (items.concat(fallbackItems())).slice(0,100);
  } catch {
    items = fallbackItems();
  }

  return NextResponse.json({ date, items });
}
