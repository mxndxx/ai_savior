"use client";

import ModalPortal from "@/components/ModalPortal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = "완료되었습니다!",
  message = "성공적으로 처리되었습니다.",
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg max-w-sm w-full p-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            확인
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
