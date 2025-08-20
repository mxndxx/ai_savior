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
      <div className="relative min-h-[60vh] overflow-hidden bg-black text-white">
        {/* Netflixy background */}
        <div className="pointer-events-none absolute inset-0 -z-10 [background:linear-gradient(149deg,_#192247_0%,_#210e17_96.86%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_40%_at_50%_0%,rgba(229,9,20,0.10),transparent_65%),radial-gradient(40%_35%_at_10%_80%,rgba(121,53,200,0.14),transparent_70%)]" />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/15 border-t-white/70"></div>
              <p className="text-sm text-white/70">강의 목록을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white pt-10 pb-40">
      {/* Netflixy background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:linear-gradient(149deg,_#192247_0%,_#210e17_96.86%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:linear-gradient(180deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.82)_45%,rgba(0,0,0,0.90)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(65%_120%_at_100%_100%,rgba(229,9,20,0.18),rgba(229,9,20,0)_60%),radial-gradient(60%_120%_at_0%_100%,rgba(121,53,200,0.16),rgba(121,53,200,0)_60%)]" />

      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">클래스</h1>
        </header>

        {lectures.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-white/60">등록된 강의가 없습니다.</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getCurrentLectures().map((lecture) => (
                <div
                  key={lecture.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-sm transition hover:shadow-[0_0_30px_rgba(229,9,20,0.12)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-60 [background:linear-gradient(180deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.85)_100%)]" />
                  <div className="relative z-10">
                    <LectureCard
                      id={lecture.id}
                      title={lecture.title}
                      thumbnail={lecture.thumbnail}
                      coach={lecture.coach.name}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(lectures.length / lecturesPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
