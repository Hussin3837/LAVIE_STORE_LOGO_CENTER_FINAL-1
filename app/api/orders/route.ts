import { NextResponse } from "next/server";
import { supabase } from ´@/lib/supabase´;

export async function GET() {
  const { data, error } = await supabase.from("orders").select("*").order("date", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newOrder = {
    id: Date.now().toString(),
    customer_email: body.email || 'guest@example.com',
    total: body.total,
    status: 'pending',
    items: body.items,
    date: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("orders").insert([newOrder]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
  const { id, status } = await req.json();
  const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}