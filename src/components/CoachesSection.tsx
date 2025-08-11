"use client";

import { useState, useEffect, useRef } from "react";
import { CircleChevronRight } from "lucide-react";
import { coachesApi } from "@/app/api/coaches";
import { Coach } from "@/types/coaches";
import CoachCard from "@/components/CoachCard";

export default function CoachesSection() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); // 첫 번째 아이템부터 시작
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const fetchedCoaches = await coachesApi.getCoaches();
        setCoaches(fetchedCoaches);
      } catch (error) {
        console.error("강사 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchCoaches();
  }, []);

  // 자동 애니메이션 효과
  useEffect(() => {
    if (coaches.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % coaches.length);
      }, 3000); // 3초마다 변경
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [coaches.length]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);

    // 클릭 시 기존 타이머 클리어하고 새로운 타이머 시작 (더 긴 간격으로)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 클릭 후 5초 뒤에 다음 카드로 넘어가도록 설정
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % coaches.length);
    }, 5000);
  };

  return (
    <section className="bg-white py-10 md:py-[100px]">
      <div className="w-full">
        <div className="space-y-5 md:space-y-10 lg:space-y-16">
          {/* Header */}
          <div className="flex flex-wrap justify-between gap-5 md:flex-nowrap md:gap-8">
            <div className="flex w-full flex-col items-start gap-3 md:gap-4">
              <span className="rounded-full border-2 border-purple-600 px-4 py-1 text-sm font-semibold text-purple-600 md:text-[20px]">
                Mentors
              </span>
              <h2 className="text-3xl leading-[1.2] font-semibold whitespace-pre-line md:text-4xl lg:text-5xl">
                최고의 강사진
              </h2>
            </div>
            <div className="flex w-full max-w-[400px] flex-col items-start justify-end gap-4">
              <p className="text-gray-500">
                N잡 AI와 함께한 실제 수강생들의 생생한 수익화 여정 이야기가 가득
                담겨있는 명예의 전당을 지금 확인해보세요!
              </p>
              {/* <a
                href="/teachers"
                className="flex items-center gap-4 text-lg text-gray-700 transition-colors hover:text-purple-600 md:text-2xl"
              >
                강사 이력 확인하기
                <CircleChevronRight className="size-7 stroke-1" />
              </a> */}
            </div>
          </div>

          {/* Mobile Swiper View */}
          <div className="overflow-hidden xl:hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {coaches.map((coach, index) => (
                <CoachCard
                  key={coach.id}
                  coach={coach}
                  isActive={index === activeIndex}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden w-full gap-4 xl:flex">
            {coaches.map((coach, index) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                isActive={index === activeIndex}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
