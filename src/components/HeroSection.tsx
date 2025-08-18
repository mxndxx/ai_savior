"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LectureImage from "@/components/LectureImage";
import { lecturesApi } from "@/app/api/lectures";
import { LectureWithCoach } from "@/types/lectures";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lectures, setLectures] = useState<LectureWithCoach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const data = await lecturesApi.getLectures();
        setLectures(data.slice(0, 4)); // 상위 4개만 사용
        setError(null);
      } catch (err) {
        console.error("강의 데이터 로딩 실패:", err);
        setError("강의 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  useEffect(() => {
    if (lectures.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lectures.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [lectures.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? lectures.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lectures.length);
  };

  if (loading) {
    return (
      <section className="h-full w-full">
        <div className="w-full max-w-none px-0">
          <div className="relative mb-12 overflow-hidden rounded-4xl">
            <div className="flex aspect-[16/9] w-full animate-pulse items-center justify-center rounded-4xl bg-gray-200">
              <span className="text-gray-500">강의 로딩 중...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || lectures.length === 0) {
    return (
      <section className="h-full w-full">
        <div className="w-full max-w-none px-0">
          <div className="relative mb-12 overflow-hidden rounded-4xl">
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-4xl bg-gray-100">
              <span className="text-gray-500">
                {error || "표시할 강의가 없습니다."}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-t border-white/10">
      <div className="container-xxl space-y-10">
        {/* Main Hero Carousel */}
        <div className="relative mb-12 overflow-hidden rounded-4xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {lectures.map((lecture) => (
              <div key={lecture.id} className="w-full flex-shrink-0">
                <Link href={`/lecture/${lecture.id}`}>
                  <LectureImage
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    fill={true}
                    className="aspect-[16/9] w-full rounded-4xl"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Slide Counter with Arrows */}
          <div className="bg-opacity-50 absolute right-4 bottom-4 flex items-center gap-4 rounded-full bg-white p-2 text-2xl text-black">
            <button
              onClick={handlePrevSlide}
              className="transition-colors hover:text-gray-600"
              aria-label="Previous slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span suppressHydrationWarning className="px-2">
              {currentSlide + 1} / {lectures.length}
            </span>
            <button
              onClick={handleNextSlide}
              className="transition-colors hover:text-gray-600"
              aria-label="Next slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
