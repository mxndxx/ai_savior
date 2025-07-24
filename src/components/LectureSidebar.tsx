"use client";

import { LectureWithCoach } from "@/types/lectures";
import InfoModal from "@/components/InfoModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { useLectureApply } from "@/hooks/useLectureApply";

export function LectureSidebar({ lecture }: { lecture: LectureWithCoach }) {
  const {
    modalStatus,
    setModalStatus,
    isLoading,
    handleLogin,
    handleApplyClick,
  } = useLectureApply(lecture);

  return (
    <div className="h-fit lg:sticky lg:top-28">
      <div className="flex flex-col gap-3">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-600 px-3 py-1 text-sm font-bold text-white">
              {lecture.coach.name}
            </span>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold">{lecture.title}</h3>

        <div className="space-y-1 border-b border-gray-200 pb-6">
          <p className="text-sm font-bold text-gray-600">강의정보</p>
          {/* <div className="flex justify-between">
            <span className="font-semibold text-gray-600">카테고리</span>
            <span>{lecture.category}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">강사명</span>
            <span>{lecture.coach.name}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <span className="text-gray-600">가격</span> */}
          <span className="font-bold text-red-600">무료</span>
          <span className="font-bold text-violet-600">
            0원
            {/* {course.price?.toLocaleString()}원 */}
          </span>
        </div>

        <button
          onClick={handleApplyClick}
          disabled={isLoading}
          className="w-full rounded-lg bg-violet-600 px-6 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "신청하는 중..." : "무료강의 신청하기"}
        </button>

        <CountdownTimer deadline={lecture.apply_deadline} />
      </div>

      <InfoModal
        isOpen={modalStatus !== "hidden"}
        onClose={() => setModalStatus("hidden")}
        onLogin={handleLogin}
        status={modalStatus === "success" ? "success" : "login"}
      />
    </div>
  );
}