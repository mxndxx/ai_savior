"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const j = await res.json();
    if (!res.ok) {
      alert(j.message || "Inscription impossible");
      return;
    }
    const login = await signIn("credentials", { email, password, redirect: false });
    if (login?.ok) router.push("/");
    else router.push("/login");
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Backdrop / gradient Netflix-like */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(229,9,20,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" aria-hidden />

      {/* Top bar logo */}
      <header className="relative z-10 flex items-center justify-center py-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src="/mooncheonmaker_w_ribbon_icon.svg" alt="Logo" width={36} height={36} />
          <span className="text-xl font-semibold tracking-wide">월천메이커 AI</span>
        </Link>
      </header>

      {/* Card */}
      <section className="relative z-10 mx-auto w-full max-w-md px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur">
          <h1 className="mb-6 text-3xl font-bold">계정 생성</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 outline-none placeholder-white/50 focus:border-white/30 focus:ring-2 focus:ring-red-600/70"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
            <input
              className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 outline-none placeholder-white/50 focus:border-white/30 focus:ring-2 focus:ring-red-600/70"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <input
              className="w-full rounded-md border border-white/20 bg-black/40 px-4 py-3 outline-none placeholder-white/50 focus:border-white/30 focus:ring-2 focus:ring-red-600/70"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
            />

            <button className="w-full rounded-md bg-red-600 py-3 font-semibold transition hover:bg-red-700">
              계정 만들기
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            이미 등록하셨나요?{" "}
            <Link href="/login" className="text-white hover:underline">
              로그인
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          비밀번호는 최소 6자 이상을 권장합니다.
        </p>
      </section>
    </main>
  );
}
