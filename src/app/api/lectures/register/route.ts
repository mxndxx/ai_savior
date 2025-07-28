import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Server Component에서 호출됨 - 무시 가능
            }
          },
        },
      },
    );
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 },
      );
    }

    const { lectureId } = await request.json();

    if (!lectureId) {
      return NextResponse.json(
        { error: "강의 ID가 필요합니다." },
        { status: 400 },
      );
    }

    // 클라이언트의 데이터 조작을 방지를 위해 서버에서 조회
    // profiles 조회는 단일 행 조회라 빠르고, id에 인덱스가 있어 성능 문제도 없음
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("name, phone_number")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "사용자 정보를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const webhookData = {
      name: profile.name,
      email: user.email,
      phone_number: profile.phone_number,
      lectureId: lectureId,
    };

    const webhookResponse = await fetch(
      "https://aiinfrafs.app.n8n.cloud/webhook/lecture-register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      },
    );

    const result = await webhookResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Webhook 호출 오류:", error);
    return NextResponse.json(
      { error: "Webhook 호출 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
