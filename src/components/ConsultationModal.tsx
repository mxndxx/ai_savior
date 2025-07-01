"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("userName", formData.name);
    router.push("/detail");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
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
              <div>
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="연락처를 입력해주세요"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex h-14 w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#B91C1C] hover:to-[#991B1B] hover:shadow-xl"
              >
                AI 최대표에게 제출하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
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
