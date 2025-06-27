"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CourseImage from "./CourseImage";
import { featuredCourses } from "@/data/courses";
// const heroSlides = [
//   {
//     id: 1,
//     image:
//       "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-274ef5af-02f9-4a52-a105-082b7ca8ac4a-2025-06-23&w=3840&q=75",
//     title: "[CEOXN잡 연구소]28만 유튜버 옆집CEO!",
//     subtitle: "정보성 유튜브로 돈 버는 시크릿 노하우",
//     badge: "마감임박",
//     badgeColor: "bg-red-500",
//     link: "/course/ceo-youtube",
//   },
//   {
//     id: 2,
//     image:
//       "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-ad0e8f24-856f-4e3d-8812-3ca5b56973fc-2025-06-19&w=2048&q=75",
//     title: "[CEOXN잡 연구소] 4개 영상 구독자 1만!",
//     subtitle: "시니어 유튜브로 돈 버는 시크릿 노하우",
//     badge: "NEW",
//     badgeColor: "bg-blue-500",
//     link: "/course/senior-youtube",
//   },
//   {
//     id: 3,
//     image:
//       "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-16cec2af-7c6d-4f41-bedc-3e4bc0363718-2025-06-11&w=2048&q=75",
//     title: "[사뚜xN잡연구소2기] 하루 1시간 일하고 월3억",
//     subtitle: "로켓그로스 완벽가이드",
//     badge: "BEST",
//     badgeColor: "bg-yellow-500",
//     link: "/course/ecommerce",
//   },
//   {
//     id: 4,
//     image:
//       "https://www.nlab.kr/_next/image?url=https%3A%2F%2Fswsgppjaigbmxetrmygu.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-9cd879f9-7836-4f1c-80a1-f2fdbdd49d77-2025-06-17&w=2048&q=75",
//     title: "[콘텐츠농부XN잡 연구소]1년 안에 5억 버는",
//     subtitle: "AI 활용 컨텐츠 제작 방법",
//     badge: "HOT",
//     badgeColor: "bg-purple-500",
//     link: "/course/ai-content",
//   },
// ];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % featuredCourses.slice(0, 4).length,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredCourses.slice(0, 4).length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.slice(0, 4).length);
  };

  return (
    <section className="h-full w-full">
      <div className="w-full max-w-none px-0">
        {/* Main Hero Carousel */}
        <div className="relative mb-12 overflow-hidden rounded-4xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredCourses.slice(0, 4).map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <Link href={slide.link}>
                  <CourseImage
                    src={slide.thumbnail}
                    alt={slide.title}
                    fill={true}
                    className="aspect-[16/9] w-full rounded-4xl"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          {/* <div className="flex justify-center mt-6 space-x-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div> */}

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
              {currentSlide + 1} / {featuredCourses.slice(0, 4).length}
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
