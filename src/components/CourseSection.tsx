"use client";

import CourseCarousel from "@/components/CourseCarousel";

export default function CourseSection() {
  return (
    <section className="py-16 flex flex-col gap-16">
      <div className="mb-8">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            얼리버드 할인 중
          </h2>
          <p className="text-black text-lg max-w-2xl">
            마감임박! 곧 신청 마감될 강의
          </p>
        </div>
        <CourseCarousel
          itemsPerSlide={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>
      <div className="mb-8">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            매일 배우는, 무료강의
          </h2>
          <p className="text-black text-lg max-w-2xl">
            하나라도 더 얻어가세요!
          </p>
        </div>
        <CourseCarousel
          itemsPerSlide={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>
    </section>
  );
}
