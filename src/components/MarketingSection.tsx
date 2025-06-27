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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Marketing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            11만 구독자, 누적 조회수 CEO - 옆집CEO 유튜브 채널
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            11만 구독자와 함께하는 CEO 성장 스토리를 경험해보세요!
          </p>

          {/* YouTube Channel Link */}
          <Link
            href="https://www.youtube.com/@ceo-nextdoor"
            target="_blank"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* View Count */}
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold">
                      조회수 {video.views}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Channel Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">11만+</div>
              <div className="text-gray-600">구독자 수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">
                500만+
              </div>
              <div className="text-gray-600">누적 조회수</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">
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
