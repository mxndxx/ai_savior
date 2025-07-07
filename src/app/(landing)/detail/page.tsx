"use client";

import type React from "react";
import { useState } from "react";
import {
  Brain,
  TrendingUp,
  Users,
  Play,
  BookOpen,
  ArrowRight,
  Star,
  CheckCircle,
  Target,
} from "lucide-react";
import DetailedConsultationModal from "@/components/DetailedConsultationModal";
import ConsultationProgressModal from "@/components/ConsultationProgressModal";

export default function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // TODO 해당 페이지에 필요한 지 확인 후 삭제
  // const userName = "고객"; // 페이지에서는 항상 "고객"으로 표시

  // DetailedConsultationModal에서 호출될 함수
  const handleShowProgress = () => {
    setIsModalOpen(false);
    setIsProgressModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative items-center overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] text-white">
        <div className="relative mx-auto space-y-4 px-4 py-10 sm:space-y-10 sm:px-6 sm:py-6 lg:px-32 lg:py-24">
          <h1 className="text-center text-4xl leading-tight font-bold lg:text-5xl">
            앞으로 <span className="text-[#DC2626]">AI 시대</span>에서{" "}
            <span className="block sm:inline">
              수익을 만드려면{" "}
              <span className="block sm:inline">
                어떻게 해야 할까요?
                <br />
              </span>{" "}
            </span>
            <span className="block sm:inline">그리고 여러분처럼 </span>
            <span className="text-[#DC2626]">
              추가수입을 원하는 사람들이
            </span>{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              줄어들까요?
            </span>{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              늘어날까요?
            </span>
          </h1>

          <p className="text-center text-xl leading-relaxed text-gray-300">
            경제 불안정과 AI 기술 발전으로{" "}
            <span className="block sm:inline">
              N잡 시장이 급성장하고 있습니다.
            </span>
          </p>

          <div className="flex flex-row items-center justify-center gap-2 text-center text-sm sm:gap-6">
            <div className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <TrendingUp className="h-5 w-5 text-[#00BFFF]" />
              <span className="break-keep">경제 불안정</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <Brain className="h-5 w-5 text-[#00BFFF]" />
              <span className="break-keep">AI 기술 발전</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <Users className="h-5 w-5 text-[#00BFFF]" />
              <span className="break-keep">N잡 트렌드 증가</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B]">
              N잡 트렌드 현황
            </h2>
            <p className="text-lg text-gray-600">데이터로 보는 부업의 미래</p>
          </div>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">73%</div>
              <div className="text-gray-600">직장인 부업 관심도</div>
              <div className="text-xs text-gray-500">전년 대비 15% 증가</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">2.3배</div>
              <div className="text-gray-600">AI 도구 사용률</div>
              <div className="text-xs text-gray-500">최근 1년간 급증</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">
                월 300만원
              </div>
              <div className="text-gray-600">평균 부업 수입</div>
              <div className="text-xs text-gray-500">성공 사례 기준</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - N잡 성공 요소 */}
      <section className="flex flex-col gap-10 py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B] lg:text-4xl">
              왜 지금이{" "}
              <span className="text-[#DC2626]">AI로 새로운 수익을 만들</span>{" "}
              최적기일까요?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              경제적 불확실성과 AI 기술 발전이 만든 새로운 기회의 시대입니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">
                경제 환경
              </h3>
              <p className="leading-relaxed text-gray-600">
                인플레이션과 고용 불안정으로 추가 수입원의 필요성이 급증.
                안정적인 부수입 확보가 필수가 된 시대입니다.
              </p>
            </div>

            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">AI 혁신</h3>
              <p className="leading-relaxed text-gray-600">
                누구나 쉽게 접근할 수 있는 AI 도구들의 대중화로 개인도 전문가
                수준의 결과물 창출이 가능합니다.
              </p>
            </div>

            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">
                시장 기회
              </h3>
              <p className="leading-relaxed text-gray-600">
                디지털 전환 가속화로 온라인 비즈니스 기회 폭증. 개인 브랜딩과
                콘텐츠 시장의 무한 성장 가능성.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B] lg:text-4xl">
              실제 AI 도구로{" "}
              <span className="block sm:inline">
                <span className="text-red-500">N잡 성공</span> 한 사례
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "김○○님",
                job: "회사원 → AI 컨텐츠 제작",
                result: "월 250만원",
                content:
                  "AI 도구로 유튜브 썸네일과 블로그 글을 만들어 월 250만원 수익을 만들었어요!",
                period: "3개월만에 첫 수익 달성",
              },
              {
                name: "박○○님",
                job: "주부 → AI 교육 컨텐츠",
                result: "월 180만원",
                content:
                  "육아 중에도 AI로 온라인 강의를 만들어 안정적인 수입을 얻고 있어요.",
                period: "시간 자유롭게 작업 가능",
              },
              {
                name: "이○○님",
                job: "대학생 → AI 디자인",
                result: "월 150만원",
                content:
                  "학비와 생활비를 AI 디자인 툴로 해결했어요. 이제는 창업도 준비 중!",
                period: "재학 중 창업 자금 마련",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
              >
                <div className="mb-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] text-sm font-bold text-white">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-[#0D0D2B]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.job}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-bold text-[#DC2626]">
                      {testimonial.result}
                    </div>
                    <div className="text-xs text-gray-500">수익</div>
                  </div>
                </div>
                <div className="mb-3 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-3 leading-relaxed text-gray-700">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="text-sm text-gray-500">
                  ✅ {testimonial.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B] lg:text-4xl">
              AI 최대표의 <span className="text-[#DC2626]">실전 노하우</span>
            </h2>
            <p className="text-lg text-gray-600">
              유튜브, 칼럼으로 검증된 전문가의 인사이트를 확인하세요
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* YouTube Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold text-[#0D0D2B]">
                🎬 AI 최대표 유튜브
              </h3>
              <div className="space-y-6">
                <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="flex h-20 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-700">
                        <Play className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
                      </div>
                      <div className="absolute -top-1 -right-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                        NEW
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-bold text-gray-800">
                        ChatGPT로 월 300만원 벌기
                      </h4>
                      <p className="mb-2 text-sm text-gray-600">
                        초보자도 따라할 수 있는 AI 부업 완전 가이드
                      </p>
                      <div className="text-xs text-gray-500">
                        조회수 1.2M • 1주일 전
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="flex h-20 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                        <Play className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
                      </div>
                      <div className="absolute -top-1 -right-1 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                        HOT
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-bold text-gray-800">
                        Midjourney 실전 활용법
                      </h4>
                      <p className="mb-2 text-sm text-gray-600">
                        AI 이미지로 수익 창출하는 7가지 방법
                      </p>
                      <div className="text-xs text-gray-500">
                        조회수 890K • 2주일 전
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold text-[#0D0D2B]">
                📝 전문가 칼럼
              </h3>
              <div className="space-y-6">
                {[
                  {
                    category: "트렌드 분석",
                    title: "2024년 AI 부업 시장 전망",
                    excerpt:
                      "경제 불확실성이 높아지는 가운데 AI를 활용한 부업이 새로운 대안으로 떠오르고 있습니다...",
                    date: "2024.01.15",
                    readTime: "5분 읽기",
                    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                  },
                  {
                    category: "실전 가이드",
                    title: "AI 도구 선택 가이드",
                    excerpt:
                      "수많은 AI 도구 중에서 내게 맞는 것을 찾는 방법과 효과적인 활용 전략을 알아보세요...",
                    date: "2024.01.10",
                    readTime: "7분 읽기",
                    icon: <Brain className="h-6 w-6 text-green-600" />,
                  },
                  {
                    category: "성공 전략",
                    title: "부업에서 본업으로",
                    excerpt:
                      "AI 부업으로 시작해서 독립 창업까지 성공한 사례들과 필요한 준비사항들을 정리했습니다...",
                    date: "2024.01.05",
                    readTime: "10분 읽기",
                    icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
                  },
                ].map((article, index) => (
                  <article
                    key={index}
                    className="rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center">
                      {article.icon}
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        {article.category}
                      </span>
                    </div>
                    <h4 className="mb-2 font-bold text-gray-800">
                      {article.title}
                    </h4>
                    <p className="mb-3 text-sm text-gray-600">
                      {article.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.date} • {article.readTime}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#DC2626]/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
            <span className="bg-gradient-to-r from-[#DC2626] to-[#FF4444] bg-clip-text text-transparent">
              맞춤 AI 부업 전략
            </span>
            을 <span className="block sm:inline">받아보세요</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
            AI 최대표가 직접 분석하는{" "}
            <span className="block sm:inline">
              개인별 맞춤 컨설팅
              <br />
            </span>
            당신의 현실 상황을 반영한{" "}
            <span className="block sm:inline">
              실전 액션 플랜을 제공합니다.
            </span>
          </p>

          <div className="mb-8 flex flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center text-white">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>1:1 맞춤 분석</span>
            </div>
            <div className="flex items-center text-white">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>실전 액션 플랜</span>
            </div>
            <div className="flex items-center text-white">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>AI 도구 추천</span>
            </div>
          </div>
          <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-center p-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative flex h-16 transform items-center justify-center rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-12 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#B91C1C] hover:to-[#991B1B] hover:shadow-xl sm:w-1/2"
            >
              <div className="flex-1 text-center">
                무료강의 전{" "}
                <span className="block sm:inline">
                  나만의 수익화 전략 확인하기
                </span>
              </div>
              <ArrowRight className="absolute right-4 h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white pt-4 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2024 월5천 아이템 생성기 by AI최대표. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Detailed Consultation Modal */}
      <DetailedConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowProgress={handleShowProgress}
      />

      {/* Consultation Progress Modal */}
      <ConsultationProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />
    </div>
  );
}
