'use client';

import { useState } from 'react';
import Link from "next/link";

export default function Webinar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('신청이 접수되었습니다. 곧 연락드리겠습니다.');
  };

  return (
    <main className="min-h-[100svh] bg-black text-white">
      {/* zone centrée (vertical + horizontal) */}
      <section className="min-h-[100svh] grid place-items-center px-4">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--accent)] text-center">
            무료 웨비나 신청
          </h1>
          <p className="text-white/70 text-center">
            AI 자산 운용 시스템의 작동 원리와 실제 데모를 확인하세요.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="pt-2 flex justify-center md:justify-start gap-3">
              <button
                type="submit"
                className="px-5 py-3 rounded-md bg-[var(--accent)] hover:opacity-90"
              >
                신청하기
              </button>
              <Link
                href="/"
                className="inline-flex items-center px-5 py-3 rounded-md border border-white/15 hover:bg-white/5"
              >
                ← 홈으로
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
