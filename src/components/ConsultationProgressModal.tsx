"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

interface ConsultationProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationProgressModal({
  isOpen,
  onClose,
}: ConsultationProgressModalProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // 모달 스크롤 잠금 적용
  useModalScrollLock(isOpen);

  const steps = [
    `📌 당신의 경력과 관심사를 분석 중입니다…`,
    `📊 17가지 수익모델 중 당신에게 맞는 조합을 찾는 중...`,
    `📈 당신에게 가장 실행력 높은 전략을 추출 중입니다...`,
  ];

  useEffect(() => {
    if (!isOpen) return;

    // 프로그레스 바 애니메이션과 메시지 표시
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;

        // 각 단계별 메시지 표시 (33%, 66%, 100% 지점)
        if (newProgress === 33 && currentStep === 0) {
          setCurrentStep(1);
        } else if (newProgress === 66 && currentStep === 1) {
          setCurrentStep(2);
        } else if (newProgress === 90 && currentStep === 2) {
          setCurrentStep(3);
          setShowFinalMessage(true);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        return newProgress;
      });
    }, 60); // 약 6초 정도 소요

    return () => clearInterval(progressInterval);
  }, [isOpen, currentStep]);

  // 카운트다운
  useEffect(() => {
    if (!showFinalMessage) return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showFinalMessage]);

  // 카운트다운이 0이 되면 페이지 이동
  useEffect(() => {
    if (countdown === 0 && showFinalMessage) {
      router.push("/result");
    }
  }, [countdown, showFinalMessage, router]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      >
        <div
          className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
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

          <div className="space-y-8">
            {/* 헤더 */}
            <div className="text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#DC2626]/30 bg-[#DC2626]/20 px-4 py-2 text-sm font-medium text-[#DC2626]">
                <Sparkles className="mr-2 h-4 w-4" />
                AI최대표의 맞춤형 수익 시스템
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#0D0D2B]">
                전략 설계 중입니다…
              </h3>
            </div>

            {/* 프로그레스 바 */}
            <div className="space-y-4">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute top-0 right-0 h-full w-2 animate-pulse bg-white/30"></div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                {progress}% 완료
              </div>
            </div>

            {/* 단계별 메시지 */}
            <div className="min-h-[120px] space-y-3">
              {steps.slice(0, currentStep).map((step, index) => (
                <div
                  key={index}
                  className="animate-fadeIn rounded-lg bg-gray-50 p-4 text-left text-gray-700"
                >
                  {step}
                </div>
              ))}

              {/* 최종 메시지 */}
              {showFinalMessage && (
                <div className="animate-fadeIn rounded-lg bg-[#DC2626]/10 p-4 text-center font-medium text-[#DC2626]">
                  {countdown}초 후 결과 페이지로 이동합니다.
                </div>
              )}
            </div>

            {/* 하단 정보 */}
            <div className="rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-600">
              🔄 AI가 당신의 정보를 분석하고 있습니다...
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
