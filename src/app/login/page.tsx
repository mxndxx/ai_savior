"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const callbackUrl = params.get("callbackUrl") || "/";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    if (res?.ok) router.push(callbackUrl);
    else alert(res?.error || "Connexion impossible");
  }

  function signInKakao() {
    signIn("kakao", { callbackUrl });
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Backdrop / gradient Netflix-like */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(229,9,20,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" aria-hidden />

      {/* Top bar logo (optionnel) */}
      <header className="relative z-10 flex items-center justify-center py-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src="/mooncheonmaker_w_ribbon_icon.svg" alt="Logo" width={36} height={36} />
          <span className="text-xl font-semibold tracking-wide">월천메이커 AI</span>
        </Link>
      </header>

      {/* Card */}
      <section className="relative z-10 mx-auto w-full max-w-md px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur">
          <h1 className="mb-6 text-3xl font-bold">로그인</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 outline-none placeholder-white/50 focus:border-white/30 focus:ring-2 focus:ring-red-600/70"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <input
                className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 outline-none placeholder-white/50 focus:border-white/30 focus:ring-2 focus:ring-red-600/70"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              className="w-full rounded-md bg-red-600 py-3 font-semibold transition hover:bg-red-700"
              type="submit"
            >
              연결
            </button>
          </form>

          <div className="my-5 h-px w-full bg-white/10" />

          <button
            onClick={signInKakao}
            className="w-full rounded-md bg-[#FEE500] py-3 font-medium text-black transition hover:brightness-95"
          >
            KakaoTalk로 계속하기
          </button>

          <p className="mt-6 text-center text-sm text-white/70">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-white hover:underline">
              계정 만들기
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          본 서비스 사용 시 약관 및 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </section>
    </main>
  );
}
