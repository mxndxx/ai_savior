import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-black text-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/15 border-t-white/70" />
            <p className="text-sm text-white/70">로그인 화면을 불러오는 중…</p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
