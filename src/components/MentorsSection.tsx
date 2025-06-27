"use client";

import Image from "next/image";
import Link from "next/link";

const mentors = [
  {
    id: "1",
    name: "옆집CEO",
    title: "28만 유튜버",
    image: "https://ext.same-assets.com/3372314287/1245325020.png",
    achievements: [
      "100% 실전형, 바로 써먹는 콘텐츠!",
      "정보성 유튜브로 구독자와 수익 동시에",
      "월급보다 높은 '부수입' 만들기",
      "콘텐츠 하나로 다양한 수익원 연결하기",
      "구독자 30만, 월 40대 수익 달성",
      "정보성 유튜브 업계 최고 수준",
    ],
    link: "/teachers/ceo-nextdoor",
  },
  {
    id: "2",
    name: "사업하는 뚜벅이",
    title: "이커머스 전문가",
    image: "https://ext.same-assets.com/3372314287/3021574298.png",
    achievements: [
      "온라인 쇼핑몰 운영 (현재진행형)",
      "다양한 브랜드 운영 (현재진행형)",
      "아마존 코리아 TV 출연",
      "이커머스 관련 강연 다수 진행",
    ],
    link: "/teachers/ttaek-business",
  },
  {
    id: "3",
    name: "콘텐츠농부",
    title: "콘텐츠 제작 전문가",
    image: "https://ext.same-assets.com/3372314287/4246638891.png",
    achievements: [
      '유튜브, 블로그에서 월매출 "억단위"',
      "브랜딩과 마케팅으로 단가 80% 상승",
      "협찬 및 제휴 40여개 브랜드 진행",
      "콘텐츠 하나로 모든 수익 연결 완료!",
    ],
    link: "/teachers/content-farmer",
  },
  {
    id: "4",
    name: "토리맘",
    title: "육아맘 유튜버",
    image: "https://ext.same-assets.com/3372314287/3672951248.png",
    achievements: [
      "45세 2024년도 50대 진입 (현재진행형)",
      "월 수익 천만원 2년 유지",
      "구독자 10만 채널 운영",
    ],
    link: "/teachers/tori-mom",
  },
];

export default function MentorsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-gray-900">
            Mentors
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            검증된 멘토
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            N잡연구소의 각 분야별 전문가들을 만나보세요!
          </p>

          <Link
            href="/teachers"
            className="hover:bg-opacity-90 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors"
          >
            강사 이력 확인하기
            <svg
              className="ml-2 h-5 w-5"
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
          </Link>
        </div>

        {/* Mentors Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="transform rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={mentor.link}>
                <div className="flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                  {/* Profile Image */}
                  <div className="mx-auto flex-shrink-0 md:mx-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="mb-1 text-xl font-bold text-gray-900">
                      {mentor.name}
                    </h3>
                    <h4 className="mb-4 font-semibold text-blue-500">
                      {mentor.title}
                    </h4>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <li
                          key={`${mentor.id}-achievement-${index}`}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <span className="mr-2 flex-shrink-0 text-blue-500">
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-semibold text-blue-500">
                        강사 더 알아보기
                        <svg
                          className="ml-1 h-4 w-4"
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
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
