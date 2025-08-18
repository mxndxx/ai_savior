'use client';

import { notFound } from "next/navigation";
import Link from "next/link";

const AGENTS = [
  {
    "slug": "real-estate-auction",
    "title": "AI 부동산 경매 에이전트",
    "pitch": "200만원 투자로, 30일 안에 1,000만원의 첫 시세 차익을 경험하십시오.",
    "category": "수익 창출"
  },
  {
    "slug": "institutional-analyzer",
    "title": "AI 주식/코인 '기관' 정보 분석기",
    "pitch": "기관 투자자들의 움직임을 분석하는 AI와 함께 7일 안에 첫 수익 실현의 기쁨을 맛보십시오.",
    "category": "금융 자동화"
  },
  {
    "slug": "gov-bidding",
    "title": "AI 정부/기업 입찰 에이전트",
    "pitch": "AI가 발굴한 수천만원짜리 첫 정부 사업을 30일 안에 수주하는 경험을 하십시오.",
    "category": "수익 창출"
  },
  {
    "slug": "ma-startup-investor",
    "title": "AI M&A/스타트업 투자 에이전트",
    "pitch": "대기업이 인수할 가능성이 높은 비상장 스타트업 정보를 가장 먼저 얻으십시오.",
    "category": "투자"
  },
  {
    "slug": "luxury-resell",
    "title": "AI 중고 명품 리셀 에이전트",
    "pitch": "AI가 찾아낸 시세보다 50만원 이상 저렴한 첫 명품을 단 7일 안에 손에 넣으십시오.",
    "category": "리셀"
  },
  {
    "slug": "global-sourcing",
    "title": "AI 해외구매대행 '독점' 상품 발굴기",
    "pitch": "AI가 발굴하고 세팅해 준 '독점' 상품으로 당신의 스토어에서 첫 매출을 경험하십시오.",
    "category": "커머스"
  },
  {
    "slug": "yt-shorts-affiliate",
    "title": "AI 유튜브 숏폼 제휴 마케터",
    "pitch": "AI가 24시간 운영하는 당신의 채널에서 14일 안에 첫 쿠팡 커미션을 확인하십시오.",
    "category": "마케팅"
  },
  {
    "slug": "freelance-scanner",
    "title": "AI 외주/프리랜서 '고단가' 프로젝트 스캐너",
    "pitch": "AI가 당신에게 최적화된 300만원 이상의 첫 프로젝트를 14일 안에 자동으로 수주하게 하십시오.",
    "category": "수익 창출"
  },
  {
    "slug": "blog-adsense",
    "title": "AI 블로그 애드센스 자동화",
    "pitch": "60일 안에 구글 애드센스 승인을 받고, AI 블로그에서 첫 달러 수익을 경험하십시오.",
    "category": "콘텐츠"
  },
  {
    "slug": "tax-refund-finder",
    "title": "AI '세금 환급' 자동 분석기",
    "pitch": "AI가 당신의 숨겨진 환급금을 찾아, '보너스'를 안겨드립니다.",
    "category": "개인 금융"
  }
] as const;

type Agent = typeof AGENTS[number];

function getAgent(slug: string): Agent | undefined {
  // @ts-ignore
  return AGENTS.find(a => a.slug === slug);
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = getAgent(params.slug);
  if (!agent) return notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header avec hauteur fixe pour calculer la zone centrée */}
      <header className="border-b border-white/10">
        <div className="container-xxl h-16 flex items-center justify-between">
          <Link href="/" className="text-white/70 hover:text-white">← 돌아가기</Link>
          <div className="text-sm text-white/50">{agent.category}</div>
        </div>
      </header>

      {/* Zone centrée : hauteur = viewport - header (64px) */}
      <section className="container-xxl min-h-[calc(100svh-64px)] grid place-items-center py-8">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold">{agent.title}</h1>
          <p className="text-white/80 text-lg">{agent.pitch}</p>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
            <h2 className="text-xl font-semibold text-[var(--accent)]">개요</h2>
            <p className="text-white/70">
              이 에이전트는 ‘AI 자산 운용사’가 설계한 자동화 시스템의 일부입니다. 고객의 아이디어를 자율 운영되는 금융 자산으로 전환하고,
              최소한의 개입으로 수익 창출을 목표로 합니다.
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              <li>셋업: 1회 구성 이후 자동화 운영</li>
              <li>모니터링: 대시보드 기반 성과 확인 (향후 제공)</li>
              <li>리스크 관리: 데이터 기반 정책 적용</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/webinar" className="px-5 py-3 rounded-md bg-[var(--accent)] hover:opacity-90">
              무료 웨비나 신청
            </Link>
            <Link href="/#vault" className="px-5 py-3 rounded-md border border-white/15 hover:bg-white/5">
              다른 에이전트 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
