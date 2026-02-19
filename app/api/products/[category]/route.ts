import { NextRequest } from "next/server";
import data from "@/data/products.json";

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string } }
) {
  const cat = (params.category || "").toLowerCase();
  const items = (data as any)[cat];
  if (!items) {
    return new Response(JSON.stringify({ error: "unknown category" }), { status: 404 });
  }
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
