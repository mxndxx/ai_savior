"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import { categories } from "@/data/tools";

interface ToolRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

export default function ToolRequestModal({
  isOpen,
  onClose,
  toolName,
}: ToolRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 폼 데이터를 처리할 수 있습니다
    console.log("도구 요청:", { ...formData, toolName });
    onClose();
    // 폼 초기화
    setFormData({ name: "", phone: "", interest: "" });
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
                AI 시스템 사용을 위해 간단히 입력해주세요.
              </h3>
              <p className="text-gray-600">
                입력해주신 정보를 바탕으로 최적의 솔루션을 제공해 드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <label htmlFor="name" className="w-1/4 text-gray-500">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:ring-1 focus:ring-black/20"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="phone" className="w-1/4 text-gray-500">
                  연락처
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="연락처를 입력해주세요"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:ring-1 focus:ring-black/20"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="interest" className="w-1/4 text-gray-500">
                  관심 분야
                </label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="h-12 w-full rounded-lg border-2 border-gray-300 px-4 text-lg transition-all duration-200 outline-none focus:ring-1 focus:ring-black/20"
                  required
                >
                  <option value="">관심분야를 선택해주세요</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center rounded-lg bg-black text-lg font-bold text-white"
              >
                AI 시스템 사용 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
