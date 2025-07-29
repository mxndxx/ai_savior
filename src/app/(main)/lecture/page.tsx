"use client";

import { useState, useEffect } from "react";
import LectureCard from "@/components/LectureCard";
import { Pagination } from "@/components/Pagination";
import { lecturesApi } from "@/app/api/lectures";
import { LectureWithCoach } from "@/types/lectures";

export default function LecturePage() {
  const [lectures, setLectures] = useState<LectureWithCoach[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 9;

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const fetchedLectures = await lecturesApi.getLectures();
        setLectures(fetchedLectures);
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const getCurrentLectures = () => {
    const startIndex = (currentPage - 1) * lecturesPerPage;
    const endIndex = startIndex + lecturesPerPage;
    return lectures.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-violet-300"></div>
            <p className="text-sm text-gray-600">강의 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-8 pb-40">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black md:text-4xl">클래스</h1>
        {/* <p className="mt-2 text-lg text-gray-600">
          모든 무료 강의를 확인하세요
        </p> */}
      </div>

      {lectures.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">등록된 강의가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getCurrentLectures().map((lecture) => (
              <LectureCard
                key={lecture.id}
                id={lecture.id}
                title={lecture.title}
                thumbnail={lecture.thumbnail}
                coach={lecture.coach.name}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(lectures.length / lecturesPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
