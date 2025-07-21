"use client";

import Link from "next/link";
import LectureImage from "@/components/LectureImage";

interface LectureCardProps {
  id: string;
  title: string;
  thumbnail: string;
  coach: string;
}

export default function LectureCard({
  id,
  title,
  thumbnail,
  coach,
}: LectureCardProps) {
  return (
    <Link href={`/lecture/${id}`}>
      <div className="w-full transition-transform duration-300 hover:-translate-y-2">
        {/* 이미지 */}
        <LectureImage src={thumbnail} alt={title} />

        {/* 뱃지들 - 이미지 밑에 배치 */}
        <div className="py-2 text-2xl">
          <h3 className="mb-2 line-clamp-2 leading-tight font-bold">{title}</h3>
          <p className="text-gray mb-3 text-sm">{coach}</p>
        </div>
      </div>
    </Link>
  );
}
