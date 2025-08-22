export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

function db() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { data: user, error } = await db()
    .from("auth_users")
    .select("id, email, password_hash")
    .eq("email", String(email).trim().toLowerCase())
    .maybeSingle();

  if (error || !user) return NextResponse.json({ ok:false, reason:"not_found", error }, { status: 200 });
  const ok = await bcrypt.compare(password ?? "", user.password_hash ?? "");
  return NextResponse.json({ ok, found: true });
}
