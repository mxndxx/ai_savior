"use client";

import Image from "next/image";
import Link from "next/link";

const youtubeVideos = [
  {
    id: "1",
    title: "옆집CEO가 알려주는 100만 수익의 3가지 비법!",
    thumbnail: "https://ext.same-assets.com/3372314287/1690544399.jpeg",
    views: "21만",
    videoUrl: "https://www.youtube.com/watch?v=wQXpnSQMm8I",
  },
  {
    id: "2",
    title: "정보성 유튜브가 돈이 되는 이유. 99%가 놓치는 핵심 포인트",
    thumbnail: "https://ext.same-assets.com/3372314287/2229945928.jpeg",
    views: "42만",
    videoUrl: "https://www.youtube.com/watch?v=k5xNCJaQx74",
  },
  {
    id: "3",
    title: "부업, 투잡 고민이라면 무조건 이것부터",
    thumbnail: "https://ext.same-assets.com/3372314287/3102924284.jpeg",
    views: "101만",
    videoUrl: "https://www.youtube.com/watch?v=BB-CcjepgYc",
  },
];

export default function MarketingSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
            Marketing
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            11만 구독자, 누적 조회수 CEO - 옆집CEO 유튜브 채널
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
            11만 구독자와 함께하는 CEO 성장 스토리를 경험해보세요!
          </p>

          {/* YouTube Channel Link */}
          <Link
            href="https://www.youtube.com/@ceo-nextdoor"
            target="_blank"
            className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a2.998 2.998 0 0 0-2.108-2.133C19.513 3.5 12 3.5 12 3.5s-7.513 0-9.39.553A2.998 2.998 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.998 2.998 0 0 0 2.108 2.133C4.487 20.5 12 20.5 12 20.5s7.513 0 9.39-.553a2.998 2.998 0 0 0 2.108-2.133C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              <path d="M9.75 15.02l6.22-3.02L9.75 8.98v6.04z" fill="white" />
            </svg>
            유튜브 바로가기
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={video.videoUrl} target="_blank">
                <div className="relative">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Play Button Overlay */}
                    <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                        <svg
                          className="ml-1 h-6 w-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* View Count */}
                    <div className="bg-opacity-75 absolute right-3 bottom-3 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                      조회수 {video.views}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-gray-900">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Channel Stats */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-500">11만+</div>
              <div className="text-gray-600">구독자 수</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-purple-500">
                500만+
              </div>
              <div className="text-gray-600">누적 조회수</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-yellow-500">
                200+
              </div>
              <div className="text-gray-600">업로드 영상</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
