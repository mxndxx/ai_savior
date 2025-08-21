export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email") || "";
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok:false, reason:"missing_env" }, { status:500 });
  const db = createClient(url, key);
  const { data, error } = await db.from("auth_users").select("id,password_hash").ilike("email", email).maybeSingle();
  return NextResponse.json({ ok: !error, found: !!data, has_hash: !!data?.password_hash, error });
}
