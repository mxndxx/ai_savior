import LectureCarousel from "@/components/LectureCarousel";

export default function LectureSection() {
  return (
    <section className="flex flex-col gap-16 py-16">
      <div className="mb-8">
        <div className="mb-10 flex flex-col">
          <h2 className="text-3xl font-bold text-black md:text-4xl">
            얼리버드 할인 중
          </h2>
          <p className="max-w-2xl text-lg text-black">
            마감임박! 곧 신청 마감될 강의
          </p>
        </div>
        <LectureCarousel
          itemsPerSlide={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>
      <div className="mb-8">
        <div className="mb-10 flex flex-col">
          <h2 className="text-3xl font-bold text-black md:text-4xl">
            매일 배우는, 무료강의
          </h2>
          <p className="max-w-2xl text-lg text-black">
            하나라도 더 얻어가세요!
          </p>
        </div>
        <LectureCarousel
          itemsPerSlide={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>
    </section>
  );
}
