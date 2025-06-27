"use client";

import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";
import ModalPortal from "@/components/ModalPortal";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
}: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {!showSuccess && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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

          <h2 className="text-2xl font-bold mb-2">강의 신청하기</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              신청하기
            </button>
          </form>
        </div>
      </div>
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        title="신청이 완료되었습니다!"
        message="곧 연락드리겠습니다."
      />
    </ModalPortal>
  );
}
