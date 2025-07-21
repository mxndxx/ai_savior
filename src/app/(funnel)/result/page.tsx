"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { CheckCircle, ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

function ResultPageContent() {
  const [name, setName] = useState("회원");

  // sessionStorage에서 이름 가져오기
  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
      setName(userName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#DC2626]/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-6 text-3xl leading-tight font-bold lg:text-4xl">
            {name}님을 위한
            <br />
            <span className="bg-gradient-to-r from-[#DC2626] to-[#FF4444] bg-clip-text text-transparent">
              자동화 수익 전략
            </span>
            이 <span className="block sm:inline">완성되었습니다</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">
            AI 최대표가 분석한{" "}
            <span className="block sm:inline">
              개인 맞춤 N잡 아이템을 확인하세요
            </span>
          </p>
        </div>
      </section>

      {/* Analysis Result Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-xl sm:p-8">
            <div className="space-y-8">
              {/* Title */}
              <div className="text-center">
                <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
                  📌 분석 결과 요약
                </h2>
              </div>

              {/* Introduction */}
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444]">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg leading-relaxed">
                  당신의 과거 경력 (마케팅 업무),{" "}
                  <span className="block sm:inline">
                    현재 상태 (콘텐츠 제작),
                  </span>
                  그리고 선택한 관심분야를 바탕으로
                  <br />
                  <span className="font-semibold text-red-500">AI 최대표</span>
                  는 다음 전략을 추천드립니다:
                </div>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="group rounded-2xl border-2 border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl sm:p-8">
                  <div className="mb-6 flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] text-lg font-bold text-white">
                      ①
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">
                        온라인 마케팅 컨설팅
                      </h3>
                      <p className="text-sm font-medium text-red-500">
                        월500 수익형 구조
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-800">
                        <Zap className="mr-2 h-4 w-4 text-red-500" />
                        실행 이유
                      </h4>
                      <p className="text-sm">
                        <span className="font-medium text-red-500">
                          {name}님
                        </span>
                        이 겪고 있는
                        <span className="font-medium"> 수익 불안정성</span>,
                        <span className="font-medium"> 시간 부족</span> 해결에
                        직결
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-800">
                        <TrendingUp className="mr-2 h-4 w-4 text-red-500" />
                        예상 수익 범위
                      </h4>
                      <p className="text-sm font-bold text-red-500">
                        월 300~500만원 (평균 케이스 기준)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="group rounded-2xl border-2 border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-xl sm:p-8">
                  <div className="mb-6 flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444] text-lg font-bold text-white">
                      ②
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">
                        콘텐츠 제작 및 유료 강의
                      </h3>
                      <p className="text-sm font-medium text-red-500">
                        장기 확장형 구조
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-800">
                        <CheckCircle className="mr-2 h-4 w-4 text-red-500" />
                        추천 이유
                      </h4>
                      <p className="text-sm">
                        초기 리스크 적고, 자동화 구축 시 파급력 큼
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-800">
                        <Target className="mr-2 h-4 w-4 text-red-500" />
                        추가 사례
                      </h4>
                      <p className="text-sm">
                        <span className="font-medium text-red-500">
                          비슷한 배경의 이○○님
                        </span>
                        은 마케팅 노하우를 활용해 온라인 강의를 제작하여
                        <span className="font-bold text-red-500">
                          {" "}
                          월 250만원의 강의 수익
                        </span>
                        을 달성했으며, 콘텐츠를 활용한 브랜딩으로
                        <span className="font-bold text-red-500">
                          {" "}
                          추가 컨설팅 의뢰 월 150만원
                        </span>
                        의 수익을 얻고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Step Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D0D2B] via-[#1a1a3a] to-[#0D0D2B] py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#DC2626]/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="mx-auto max-w-2xl text-4xl leading-relaxed font-bold">
              해당 전략을 포함한
              <br />
              <span className="text-red-500">
                AI 자동화 월5천 전략{" "}
                <span className="block sm:inline">10가지 비법서</span>
              </span>
              <br />
              지금 무료로 받으세요.
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              이 비법서는 지금까지 3,000명 이상의{" "}
              <span className="block sm:inline">
                N잡러들이 실행한 결과입니다.
              </span>
              아래 버튼을 눌러 카카오톡방에서{" "}
              <span className="block sm:inline">바로 다운로드 받으세요.</span>
            </p>

            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="flex items-center text-white">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>실제 성공 사례</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>단계별 실행 가이드</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>AI 도구 활용법</span>
              </div>
            </div>

            <button className="inline-flex h-16 transform items-center rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-12 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#B91C1C] hover:to-[#991B1B] hover:shadow-xl">
              지금 비법서 받기
              <ArrowRight className="ml-3 h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white p-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2024 월5천 아이템 생성기 by AI최대표. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-[#DC2626]"></div>
            <p className="mt-4 text-gray-600">분석 결과를 불러오는 중...</p>
          </div>
        </div>
      }
    >
      <ResultPageContent />
    </Suspense>
  );
}
