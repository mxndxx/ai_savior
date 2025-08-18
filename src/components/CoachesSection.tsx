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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [coaches.length]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % coaches.length);
    }, 5000);
  };

  return (
    <section className="coaches-section bg-black py-16 border-t border-white/10">
      <div className="container-xxl">
        <div className="space-y-10 md:space-y-12 lg:space-y-16">
          {/* Header */}
          <div className="flex flex-wrap justify-between gap-6 md:flex-nowrap md:gap-8">
            <div className="flex w-full flex-col items-start gap-3 md:gap-4">
              <span className="rounded-full border px-4 py-1 text-sm font-semibold text-[var(--accent)] border-[var(--accent)]">
                Mentors
              </span>
              <h2 className="text-3xl leading-[1.2] font-semibold whitespace-pre-line md:text-4xl lg:text-5xl">
                최고의 강사진
              </h2>
            </div>
            <div className="flex w-full max-w-[480px] flex-col items-start justify-end gap-4">
              <p className="text-white/60">
                N잡 AI와 함께한 실제 수강생들의 생생한 수익화 여정 이야기가 가득
                담겨있는 명예의 전당을 지금 확인해보세요!
              </p>
            </div>
          </div>

          {/* Mobile Swiper View */}
          <div className="coaches-mobile overflow-hidden xl:hidden relative">
            <div
              className="coaches-track flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
          <div className="coaches-grid hidden w-full gap-6 xl:flex">
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
