"use client";

import { useState, useEffect } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LectureWithCoach } from "@/types/lectures";

interface MobileFloatingBarProps {
  lecture: LectureWithCoach;
  onApplyClick: () => void;
  isLoading: boolean;
}

export function MobileFloatingBar({
  lecture,
  onApplyClick,
  isLoading,
}: MobileFloatingBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 이상 스크롤했을 때 표시
      const scrollThreshold = 300;
      const shouldShow = window.scrollY > scrollThreshold;
      setIsVisible(shouldShow);
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-20 w-full p-3 transition-all duration-500 lg:hidden ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <CountdownTimer deadline={lecture.apply_deadline} />
      <div className="mx-auto mt-1 flex w-full max-w-[900px] items-center justify-between rounded-xl bg-[#121212] shadow-md md:border md:border-neutral-800 md:p-[10px] md:pl-[30px]">
        <div className="hidden items-end gap-x-5 md:flex">
          <span className="text-lg font-semibold text-red-500">무료</span>
          <div className="flex items-end gap-x-2">
            <span className="text-lg leading-tight font-semibold text-white">
              0원
            </span>
          </div>
        </div>
        <div className="w-full md:w-[300px]">
          <button
            onClick={onApplyClick}
            disabled={isLoading}
            className="inline-flex h-auto w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 p-[14px] text-[16px] font-semibold whitespace-nowrap text-white shadow-xs transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "신청하는 중..." : "무료강의 신청하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
