"use client";

import Link from "next/link";
import CourseImage from "@/components/CourseImage";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  badges: { text: string; color: string }[];
  category: string;
  link: string;
}

export default function CourseCard({
  id,
  title,
  instructor,
  thumbnail,
  badges,
  category,
  link,
}: CourseCardProps) {
  return (
    <Link href={link}>
      <div className="w-full transition-transform duration-300 hover:-translate-y-2">
        {/* 이미지 */}
        <CourseImage src={thumbnail} alt={title} />

        {/* 뱃지들 - 이미지 밑에 배치 */}
        <div className="py-2">
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.map((badge, index) => (
                <span
                  key={`${badge.text}-${index}`}
                  className={`rounded-full px-2 py-1 text-lg font-semibold text-white ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
          <div className="py-2 text-2xl">
            <h3 className="mb-2 line-clamp-2 leading-tight font-bold">
              {title}
            </h3>
            <p className="text-gray mb-3 text-sm">{instructor}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
