"use client";

import { useEffect } from "react";
import ModalPortal from "@/components/ModalPortal";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import { useFunnelApply } from "@/hooks/useFunnelApply";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const { handleKakaoLogin, isLoading, error } = useFunnelApply();
  
  // 모달 스크롤 잠금 적용
  useModalScrollLock(isOpen);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleKakaoLogin();
  };

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

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold text-[#0D0D2B]">
                무료 진단 시작하기
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <KakaoLoginButton
                onClick={handleKakaoLogin}
                isLoading={isLoading}
              >
                카카오로 3초 만에 시작하기
              </KakaoLoginButton>
            </form>

            <div className="rounded-lg bg-gray-50 p-3 text-center text-sm text-gray-500">
              ✅ 100% 무료 진단 ✅ 개인정보 보호 ✅ 즉시 결과 확인
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
