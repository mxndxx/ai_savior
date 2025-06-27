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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-lg bg-white p-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
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
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-6 text-gray-600">{message}</p>
          <button
            onClick={onClose}
            className="rounded-lg bg-violet-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-violet-700"
          >
            확인
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
