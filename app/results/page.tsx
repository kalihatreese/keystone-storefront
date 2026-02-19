import fs from 'fs/promises';
export const dynamic = 'force-dynamic';
const PATHS = [
  '/data/data/com.termux/files/home/keystone-kash-store/autotrend-results/index.html',
];
async function load() {
  for (const p of PATHS) { try { return await fs.readFile(p, 'utf8'); } catch {} }
  return `<main class="p-6"><h2>No results file found</h2></main>`;
}
export default async function Results(){ const html = await load(); return <div dangerouslySetInnerHTML={{ __html: html }} />; }
