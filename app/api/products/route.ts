import { NextResponse } from "next/server";
const BASE = process.env.NEXT_PUBLIC_BASE ?? "https://kalihatreese.github.io/Autotrend_vault";
const URL  = ;
export async function GET() {
  try {
    const r = await fetch(URL, { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error:  }, { status: 502 });
    const data = await r.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "max-age=60" } });
  } catch (e:any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
