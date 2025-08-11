"use client";

import ModalPortal from "./ModalPortal";
import KakaoLoginButton from "./KakaoLoginButton";

type StatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  status: "login" | "success";
};

export default function InfoModal({
  isOpen,
  onClose,
  onLogin,
  status,
}: StatusModalProps) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case "login":
        return (
          <>
            <h2 className="text-xl font-bold">로그인이 필요합니다</h2>
            {/* <div className="my-4 rounded-2xl bg-violet-100 px-4 py-8">
              <span className="text-4xl font-extrabold text-gray-600">
                로고 부분
              </span>
            </div> */}
            <p className="m-4 text-gray-600">
              강의를 신청하려면 로그인이 필요합니다.
            </p>
            <KakaoLoginButton onClick={onLogin} />
          </>
        );
      case "success":
        return (
          <>
            <h2 className="text-xl font-bold">무료강의 신청 완료!</h2>
            <p className="m-4 text-gray-600">
              무료강의 신청이 정상적으로 완료되었습니다.
            </p>
            <button
              onClick={onClose}
              className="w-full cursor-pointer rounded-lg bg-violet-600 px-4 py-2 font-bold text-white"
            >
              확인
            </button>
          </>
        );
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-sm rounded-lg bg-white p-6">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="cursor-pointer text-2xl">
              &times;
            </button>
          </div>
          <div className="mt-2 text-center">{renderContent()}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
