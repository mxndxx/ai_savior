import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { formatPhoneNumberToKorean } from "@/utils/phoneNumber";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

            // 전화번호 추출 및 포맷팅
            if (kakaoData.kakao_account?.phone_number) {
              updates.phone_number = formatPhoneNumberToKorean(kakaoData.kakao_account.phone_number);
            }

            // 이름 추출
            if (kakaoData.kakao_account?.name) {
              updates.name = kakaoData.kakao_account.name;
            }

            // 필수 정보가 없으면 에러 발생
            if (!updates.name || !updates.phone_number) {
              console.error(
                "Critical: Missing required user info from Kakao:",
                {
                  kakaoAccount: kakaoData.kakao_account,
                  properties: kakaoData.properties,
                  updates: updates,
                },
              );

              // 에러 페이지로 리다이렉트
              return NextResponse.redirect(
                `${requestUrl.origin}/error?message=${encodeURIComponent("카카오 계정에서 필수 정보(이름, 전화번호)를 가져올 수 없습니다. 카카오 계정 설정을 확인해주세요.")}`,
              );
            }

            // profiles 테이블에 데이터 저장
            const profileData = {
              id: session.user.id,
              email: session.user.email || "",
              name: updates.name,
              phone_number: updates.phone_number,
              updated_at: new Date().toISOString(),
            };

            const { data: profileResult, error: profileError } = await supabase
              .from("profiles")
              .upsert(profileData)
              .select();

            // TODO 에러 핸들링 공통 분리
            if (profileError) {
              console.error("Profile upsert error:", profileError);
            } else {
              console.log(
                "Profile created/updated successfully:",
                profileResult,
              );
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
