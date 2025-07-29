"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Target,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

interface DetailedConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowProgress?: () => void;
}

interface StepContainerProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

// StepContainer 컴포넌트
function StepContainer({
  icon: Icon,
  title,
  description,
  children,
}: StepContainerProps) {
  return (
    <div className="flex h-full flex-col justify-start space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#DC2626] to-[#FF4444]">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-[#0D0D2B]">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
}

// 20가지 AI 부업 분야 리스트
const businessFields = [
  "AI 유튜브 채널 운영",
  "AI 콘텐츠 자동화",
  "AI 전자책 출판",
  "GPT 에이전시 서비스",
  "AI 이미지 생성 서비스",
  "AI 웹사이트 제작",
  "AI 카피라이팅",
  "AI 번역 서비스",
  "AI 교육 콘텐츠 제작",
  "AI 마케팅 자동화",
  "AI 데이터 분석 서비스",
  "AI 챗봇 개발",
  "AI 음성 콘텐츠 제작",
  "AI 디자인 서비스",
  "AI 프로그래밍 교육",
  "AI 컨설팅",
  "AI 앱 개발",
  "AI 온라인 쇼핑몰",
  "AI 투자 분석",
  "AI 헬스케어 서비스",
];

export default function DetailedConsultationModal({
  isOpen,
  onClose,
  onShowProgress,
}: DetailedConsultationModalProps) {
  const [name, setName] = useState("고객");

  // 모달 스크롤 잠금 적용
  useModalScrollLock(isOpen);

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
      setName(userName);
    }
  }, []);

  const [formData, setFormData] = useState({
    location: "",
    pastExperience: "",
    currentJob: "",
    selectedField: "",
    fieldReason: "",
    problem: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < totalSteps) {
      // 마지막 스텝이 아니면 다음 스텝으로 이동
      handleNext();
    } else {
      // 마지막 스텝이면 progress modal 표시
      console.log("상세 컨설팅 데이터:", formData);

      if (onShowProgress) {
        onShowProgress();
      }

      onClose(); // 현재 모달 닫기
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.location.trim() !== "";
      case 2:
        return formData.pastExperience.trim() !== "";
      case 3:
        return formData.currentJob.trim() !== "";
      case 4:
        return (
          formData.selectedField !== "" && formData.fieldReason.trim() !== ""
        );
      case 5:
        return formData.problem.trim() !== "";
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-0 sm:p-4">
        <div
          className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[85vh] sm:max-w-2xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header and Progress - Fixed at top */}
          <div className="bg-white px-4 pt-4 pb-4 sm:px-8 sm:pt-8">
            <div className="mb-6">
              <h2 className="text-2xl leading-tight font-bold text-[#0D0D2B]">
                AI 자동화로{" "}
                <span className="text-[#DC2626]">{name || "고객"}님</span>만의{" "}
                <br className="block sm:hidden" />
                <span className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] bg-clip-text text-transparent">
                  월5천 아이템
                </span>{" "}
                만들어드립니다
              </h2>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  진행상황
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {currentStep} / {totalSteps}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content - Scrollable area */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-4 py-1 sm:px-8">
              {/* Step 1: 거주 지역 */}
              {currentStep === 1 && (
                <StepContainer
                  icon={MapPin}
                  title="어디에 거주하고 계신가요?"
                  description="지역별 특성을 고려한 맞춤 전략을 제공합니다"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="예: 서울시 강남구, 부산시 해운대구"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    />
                  </div>
                </StepContainer>
              )}

              {/* Step 2: 과거 경험 */}
              {currentStep === 2 && (
                <StepContainer
                  icon={Briefcase}
                  title="지금까지 어떤 일들을 해오셨나요?"
                  description="경험과 스킬을 파악하여 최적의 방향을 제시합니다"
                >
                  <div>
                    <textarea
                      placeholder="예: 마케팅 회사에서 5년 근무, 개인 블로그 운영, 온라인 쇼핑몰 창업 경험 등 자유롭게 작성해주세요"
                      value={formData.pastExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pastExperience: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-gray-300 p-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    />
                  </div>
                </StepContainer>
              )}

              {/* Step 3: 현재 업무 */}
              {currentStep === 3 && (
                <StepContainer
                  icon={Briefcase}
                  title="현재 하고 있는 일은 무엇인가요?"
                  description="현재 상황을 고려한 현실적인 계획을 세웁니다"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="예: IT 회사 개발자, 카페 사장, 프리랜서 디자이너, 전업주부 등"
                      value={formData.currentJob}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentJob: e.target.value,
                        })
                      }
                      className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    />
                  </div>
                </StepContainer>
              )}

              {/* Step 4: 관심 분야 선택 */}
              {currentStep === 4 && (
                <StepContainer
                  icon={Target}
                  title="어떤 분야가 가장 끌리시나요?"
                  description="관심 분야와 이유를 알려주시면 맞춤 전략을 제공합니다"
                >
                  <div className="space-y-4">
                    <select
                      value={formData.selectedField}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          selectedField: e.target.value,
                        })
                      }
                      className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    >
                      <option value="">관심 분야를 선택해주세요</option>
                      {businessFields.map((field, index) => (
                        <option key={index} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>

                    <textarea
                      placeholder="선택한 분야가 끌리는 이유를 자세히 알려주세요"
                      value={formData.fieldReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fieldReason: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-gray-300 p-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    />
                  </div>
                </StepContainer>
              )}

              {/* Step 5: 현실 문제 */}
              {currentStep === 5 && (
                <StepContainer
                  icon={AlertCircle}
                  title="지금 겪고 있는 현실 문제 2가지(고통/불안/의문 등)"
                  description="문제를 정확히 파악해야 올바른 해결책을 제시할 수 있습니다"
                >
                  <div className="space-y-4">
                    <textarea
                      placeholder="예: 물가 상승으로 생활비 부족, 직장 불안정, 미래에 대한 불안 등"
                      value={formData.problem}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          problem: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-gray-300 p-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                      required
                    />
                  </div>
                </StepContainer>
              )}
            </div>

            {/* Navigation Buttons - Fixed at bottom */}
            <div className="flex items-center justify-between bg-white p-4 sm:p-8">
              <div className="flex h-12">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex h-12 items-center rounded-lg border-2 border-gray-300 px-6 text-lg font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                  >
                    이전
                  </button>
                ) : (
                  <div className="h-12"></div>
                )}
              </div>

              <div className="flex h-12">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex h-12 items-center rounded-lg bg-[#DC2626] px-6 text-lg font-bold text-white transition-all duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    다음
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid()}
                    className="flex h-12 items-center rounded-lg bg-[#DC2626] px-6 text-lg font-bold text-white transition-all duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    제출하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
