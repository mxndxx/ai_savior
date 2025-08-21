// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/utils/supabase-middleware";

export async function middleware(request: NextRequest) {
  // instancie supabase + réponse (pour que les cookies soient propagés)
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // 세션 갱신 (유저 정보 로드)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin 보호 (단, /admin/login 은 허용)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname.startsWith("/admin/login")) {
      return response;
    }
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      // après login, on peut renvoyer vers la page d’origine
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // protège tout sauf:
    // - /api
    // - /_next/static
    // - /_next/image
    // - /favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
