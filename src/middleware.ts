import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/utils/supabase-middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // 세션 갱신을 위해 사용자 정보를 가져옵니다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // admin 경로에 대한 인증 체크
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 로그인 페이지는 제외
    if (request.nextUrl.pathname.startsWith("/admin/login")) {
      return response;
    }

    if (!user) {
      // 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
