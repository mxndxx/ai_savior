import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
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
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      },
    );

    const { data: sessionData, error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (!error && sessionData?.session) {
      const { session } = sessionData;

      // 카카오 로그인인 경우 사용자 정보 가져오기
      if (
        session.user.app_metadata?.provider === "kakao" &&
        session.provider_token
      ) {
        try {
          // 카카오 사용자 정보 가져오기
          const kakaoResponse = await fetch(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${session.provider_token}`,
              },
            },
          );

          if (kakaoResponse.ok) {
            const kakaoData = await kakaoResponse.json();

            const updates: { phone_number?: string; name?: string } = {};

            // 전화번호 추출
            if (kakaoData.kakao_account?.phone_number) {
              updates.phone_number = kakaoData.kakao_account.phone_number;
            }

            // 이름 추출
            if (kakaoData.kakao_account?.name) {
              updates.name = kakaoData.kakao_account.name;
            }

            // 메타데이터 업데이트
            if (Object.keys(updates).length > 0) {
              await supabase.auth.updateUser({
                data: updates,
              });
            }
          }
        } catch (error) {
          console.error("Failed to fetch Kakao user info:", error);
        }
      }
    }
  }

  // 로그인 후 리디렉션될 URL
  if (next) {
    return NextResponse.redirect(requestUrl.origin + next);
  }
  return NextResponse.redirect(requestUrl.origin);
}
