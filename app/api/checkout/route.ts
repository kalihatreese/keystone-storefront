import { NextResponse } from "next/server";
export async function POST(req: Request){
  try {
    const body = await req.json().catch(()=>({}));
    const ok = Array.isArray(body?.items) && body.items.length>0;
    return NextResponse.json({ ok, message: ok ? "Checkout session created (stub)" : "No items" }, { status: ok?200:400 });
  } catch (e:any){
    return NextResponse.json({ error:String(e) }, { status: 500 });
  }
}
