import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

function getDb() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "이메일 주소와 비밀번호가 필요합니다." }, { status: 400 });
    }
    const emailNorm = String(email).trim().toLowerCase();
    const hash = await bcrypt.hash(String(password), 10);

    const db = getDb();
    // existe déjà ?
    const { data: exists } = await db.from("auth_users").select("id").eq("email", emailNorm).maybeSingle();
    if (exists) {
      return NextResponse.json({ message: "이 이메일 주소로 이미 계정이 생성되었습니다." }, { status: 409 });
    }

    const { error } = await db.from("auth_users").insert({
      email: emailNorm,
      password_hash: hash,
      name: name || null,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || "Error server" }, { status: 500 });
  }
}
