"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        id="hero"
        className="relative items-center overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] text-white"
      >
        <div className="relative mx-auto space-y-4 px-4 py-10 sm:space-y-10 sm:px-6 sm:py-6 lg:px-32 lg:py-24">
          <div className="mx-auto inline-flex items-center rounded-full border border-[#DC2626]/30 bg-[#DC2626]/20 px-4 py-2 text-sm font-medium text-[#DC2626] backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            AI최대표의 맞춤형 수익 시스템
          </div>
          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            딱 1분.
            <br />
            당신의 현재 상황을{" "}
            <span className="block sm:inline">
              AI 최대표에게 전달해 주세요.
              <br />
            </span>
            당신에게만 적용되는{" "}
            <span className="block text-[#DC2626] sm:inline">
              월5천 자동화 전략을{" "}
            </span>
            <span className="block sm:inline">무료로 설계해드립니다.</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-300">
            경험 없음, 기술 없음 괜찮습니다.
            <span className="sm:hidden">
              <br />
            </span>
            당신의 일과 삶을 바탕으로 지금 가장 빠르게 자동화 수익을 만들 수
            있는 전략을 A 최대표가 직접 제안해드립니다.
          </p>
          <div className="flex flex-row items-center justify-center gap-2 text-sm sm:gap-6">
            <div className="flex items-center rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <Target className="mr-2 h-5 w-5 text-[#00BFFF]" />
              <span>PRODUCT 아이템 생성</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <Zap className="mr-2 h-5 w-5 text-[#00BFFF]" />
              <span>AUTOMATE 자동화 설계</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-2 py-2 backdrop-blur-sm sm:px-4">
              <ArrowRight className="mr-2 h-5 w-5 text-[#00BFFF]" />
              <span>TRAFFIC 유입 전략</span>
            </div>
          </div>
          <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-center p-2">
            <button
              onClick={openModal}
              className="inline-flex h-16 transform items-center justify-center rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-12 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#B91C1C] hover:to-[#991B1B] hover:shadow-xl sm:w-1/2"
            >
              나만의 월5천 전략 받기
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - 새로 추가 */}
      {/* <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">1,200+</div>
              <div className="text-gray-600">누적 이용자</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">324만원</div>
              <div className="text-gray-600">평균 월수익</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">98%</div>
              <div className="text-gray-600">만족도</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#DC2626]">3분</div>
              <div className="text-gray-600">진단 소요시간</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section - 개선 */}
      <section className="flex flex-col gap-10 px-4 py-20 sm:px-6 sm:py-6 lg:px-32 lg:py-24">
        <div className="mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B] lg:text-4xl">
              왜 <span className="text-[#DC2626]">월5천 아이템 생성기</span>
              인가?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              단순한 아이템 제안이 아닌, 당신의 현실 상황을 반영한 맞춤형 수익
              시스템을 설계합니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">PRODUCT</h3>
              <p className="leading-relaxed text-gray-600">
                당신의 경험과 관심사를 바탕으로 한 개인 맞춤형 수익 아이템 생성.
                콘텐츠 없이도 가능한 200만원 자동화 수입 구조 설계.
              </p>
            </div>

            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">
                AUTOMATE
              </h3>
              <p className="leading-relaxed text-gray-600">
                AI 자동화 툴 기반 설득형 페이지 구축. 시간 없는 직장인도 가능한
                자동화 루틴과 브랜드 설계까지.
              </p>
            </div>

            <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#0D0D2B]">TRAFFIC</h3>
              <p className="leading-relaxed text-gray-600">
                인스타그램, 유튜브 유입 전략 설계. 인플루언서처럼 수익 내는 채널
                성장 밀착 컨설팅.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "👤", text: "딱 1명, 당신에게만 맞는 전략입니다" },
            { icon: "💼", text: "지금까지 해온 일을 기반으로만 설계됩니다" },
            { icon: "⚡", text: "신청 즉시 분석 시작 + 결과 리포트 제공" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-full rounded-full border-1 border-gray-400 bg-white px-6 py-3 text-center">
                <span className="mr-2 text-xl">{item.icon}</span>
                <span className="font-bold text-[#0D0D2B]">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section - 새로 추가 */}
      <section className="bg-white py-20 sm:px-6 sm:py-6 lg:px-32 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0D0D2B] lg:text-4xl">
              실제 이용자들의 <span className="text-[#DC2626]">성공 후기</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "김○○님",
                job: "회사원",
                result: "월 450만원",
                content:
                  "정말 3페이지만 작성했는데 맞춤형 아이템이 나왔어요. 지금은 본업 수익을 넘어섰습니다!",
              },
              {
                name: "박○○님",
                job: "마케터",
                result: "월 320만원",
                content:
                  "AI 자동화 시스템 덕분에 거의 손 안 대고도 수익이 나와요. 강력 추천합니다.",
              },
              {
                name: "이○○님",
                job: "디자이너",
                result: "월 280만원",
                content:
                  "처음엔 반신반의했는데, 정말 제 상황에 딱 맞는 아이템을 제안해줘서 놀랐어요.",
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
                    <div className="text-xs text-gray-500">달성</div>
                  </div>
                </div>
                <p className="leading-relaxed text-gray-700">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 개선 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] py-10 text-white">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
            &quot;AI최대표&quot;와 함께라면
            <br />
            <span className="bg-gradient-to-r from-[#DC2626] to-[#FF4444] bg-clip-text text-transparent">
              월5천 아이템 로드맵
            </span>{" "}
            확보까지
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">
            본업 외 수익을 꿈꾸는
            <span className="block sm:inline">
              MZ세대를 위한 현실적인 솔루션.
              <br />
            </span>
            AI가 당신만의 최적화된 수익 시스템을
            <span className="block sm:inline">3페이지 만에 제안합니다.</span>
          </p>
        </div>
      </section>

      {/* Footer - 개선 */}
      <footer className="border-t border-gray-200 bg-white pt-4 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2024 월5천 아이템 생성기 by AI최대표. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
