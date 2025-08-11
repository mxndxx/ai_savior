"use client";

import { useEffect, useRef, useState } from "react";
import LectureCard from "@/components/LectureCard";
import { lecturesApi } from "@/app/api/lectures";
import { LectureWithCoach } from "@/types/lectures";

interface LectureCarouselProps {
  itemsPerSlide?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function LectureCarousel({
  itemsPerSlide = { mobile: 1, tablet: 2, desktop: 3 },
  autoPlay = true,
  autoPlayInterval = 4000,
  className = "",
}: LectureCarouselProps) {
  const [lectures, setLectures] = useState<LectureWithCoach[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      const fetchedLectures = await lecturesApi.getLectures();
      setLectures(fetchedLectures);
    };
    fetchLectures();
  }, []);

  useEffect(() => {
    setIsClient(true);

    // 반응형 아이템 개수 계산
    const getItemsPerSlide = () => {
      if (window.innerWidth >= 1024) return itemsPerSlide.desktop;
      if (window.innerWidth >= 768) return itemsPerSlide.tablet;
      return itemsPerSlide.mobile;
    };

    setCurrentItemsPerSlide(getItemsPerSlide());

    const handleResize = () => {
      setCurrentItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerSlide.desktop, itemsPerSlide.tablet, itemsPerSlide.mobile]);

  const totalSlides = Math.max(1, lectures.length - currentItemsPerSlide + 1);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoPlay || isUserInteracting) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [totalSlides, isUserInteracting, autoPlay, autoPlayInterval]);

  // 슬라이드 이동
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX - x) / 100;

    if (Math.abs(walk) > 0.5) {
      if (walk > 0 && currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1);
        setIsDragging(false);
      } else if (walk < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsUserInteracting(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        nextSlide();
      } else if (diff < 0 && currentSlide > 0) {
        prevSlide();
      }
      setStartX(0);
    }
  };

  const handleTouchEnd = () => {
    setStartX(0);
  };

  if (!isClient) {
    return <div className="h-64 animate-pulse rounded-lg bg-gray-200" />;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-hidden pt-2"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="-mx-2 flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentSlide * 100) / currentItemsPerSlide
            }%)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / currentItemsPerSlide}%`,
              }}
            >
              <LectureCard
                id={lecture.id}
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                coach={lecture.coach.name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="group absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all duration-200 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentSlide === 0}
          >
            <svg
              className="group-hover:text-teal h-6 w-6 text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="group absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all duration-200 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentSlide === totalSlides - 1}
          >
            <svg
              className="group-hover:text-teal h-6 w-6 text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )} */}

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? "scale-110 bg-black"
                  : "bg-gray-300 hover:bg-black"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
