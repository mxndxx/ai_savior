"use client";

import Link from "next/link";
import CourseImage from "./CourseImage";

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
      <div className="w-full hover:-translate-y-2 transition-transform duration-300">
        {/* 이미지 */}
        <CourseImage src={thumbnail} alt={title} />

        {/* 뱃지들 - 이미지 밑에 배치 */}
        <div className="py-2">
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.map((badge, index) => (
                <span
                  key={`${badge.text}-${index}`}
                  className={`px-2 py-1 rounded-full text-lg font-semibold text-white ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
          <div className="py-2 text-2xl">
            <h3 className="font-bold mb-2 line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-gray text-sm mb-3">{instructor}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
