"use client";

import { useState, useEffect } from "react";
import { CourseDetail } from "@/types/course";
import EnrollmentModal from "@/components/EnrollmentModal";

export function CourseSidebar({ course }: { course: CourseDetail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 강의의 deadline을 사용하거나 기본값 설정
    const deadlineString = course.deadline || "2026-01-01T00:00:00";
    const targetDate = new Date(deadlineString);

    console.log("Course deadline:", course.deadline);
    console.log("Target date:", targetDate);
    console.log("Current date:", new Date());

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [course.deadline]);

  return (
    <div className="sticky top-28 h-fit">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex flex-wrap gap-2">
            {course.badges.map((badge: any, index: number) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-bold text-white ${badge.color}`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3">
          [콘텐츠농부X시장 연구소] 1년 안에 5억 버는 AI 활용 컨텐츠 제작 방법
        </h3>

        <div className="space-y-1 pb-6 border-b border-gray-200">
          <p className="text-gray-600 text-sm font-bold">강의정보</p>
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">카테고리</span>
            <span>{course.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">강사명</span>
            <span>{course.instructor}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <span className="text-gray-600">가격</span> */}
          <span className="text-red-600 font-bold">무료</span>
          <span className="text-violet-600 font-bold">
            0원
            {/* {course.price?.toLocaleString()}원 */}
          </span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
        >
          강의 신청하기
        </button>

        <div className="text-center bg-gray-100 rounded-lg p-6">
          <p className="text-gray-600 mb-2">강의 시작까지 남은 시간</p>
          <div className="font-bold mb-1">
            <p className="text-3xl bg-white inline-block p-1 rounded-lg text-violet-600">
              {String(timeLeft.days).padStart(2, "0")}
            </p>
            일
          </div>
          <div className="font-bold flex justify-center items-center gap-1 text-3xl">
            <p className="bg-white inline-block p-1 rounded-lg text-violet-600">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            :{" "}
            <p className="bg-white inline-block p-1 rounded-lg text-violet-600">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            :{" "}
            <p className="bg-white inline-block p-1 rounded-lg text-violet-600">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
          </div>
          <p className="text-sm mt-2">선착순 모집! 곧 마감됩니다</p>
        </div>
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
