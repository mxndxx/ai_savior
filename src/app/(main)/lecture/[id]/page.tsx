"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import LectureImage from "@/components/LectureImage";
import Image from "next/image";
import { lecturesApi } from "@/app/api/lectures";
import { LectureSidebar } from "@/components/LectureSidebar";
import { LectureWithCoach } from "@/types/lectures";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { useLectureApply } from "@/hooks/useLectureApply";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureWithCoach | null>(null);
  const [loading, setLoading] = useState(true);

  // 커스텀 훅 사용
  const { isLoading, handleApplyClick } = useLectureApply(lectureId);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const fetchedLecture = await lecturesApi.getLectureById(lectureId);
        if (fetchedLecture) {
          setLecture(fetchedLecture);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch lecture:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (lectureId) {
      fetchLecture();
    }
  }, [lectureId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-violet-300"></div>
          <p className="text-sm text-gray-600">강의 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!lecture) {
    return notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="mx-auto">
          <div className="relative flex flex-col gap-8 lg:flex-row">
            <div className="w-full space-y-4 lg:w-3/5">
              <LectureImage
                src={lecture.thumbnail}
                alt={lecture.title}
                width={760}
                height={600}
              />

              {/* 모바일에서만 LectureSidebar 표시 */}
              <div className="block lg:hidden">
                <LectureSidebar lecture={lecture} />
              </div>

              <div className="z-10 mt-4 bg-white">
                <nav className="sticky top-24 flex justify-center bg-white py-1 font-bold">
                  {[
                    { id: "intro", label: "강의 소개" },
                    { id: "instructor", label: "강사 소개" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 p-2 text-sm font-bold transition-all duration-500 ease-in-out hover:border-b-2 hover:border-violet-600 hover:text-violet-600 sm:text-base ${
                        activeTab === tab.id
                          ? "border-b-2 border-violet-600 text-violet-600"
                          : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-8 min-h-screen pb-12 lg:min-h-screen">
                  {activeTab === "intro" && (
                    <div className="prose max-w-none">
                      <h2 className="mb-4 text-2xl font-bold">강의 소개</h2>
                      {lecture.content_text && <p>{lecture.content_text}</p>}
                      {lecture.content_image &&
                        lecture.content_image
                          .split(",")
                          .filter((url) => url.trim())
                          .map((url, index) => (
                            <Image
                              key={index}
                              src={url.trim()}
                              alt={`${lecture.title} content image ${index + 1}`}
                              width={760}
                              height={600}
                              className="h-auto w-full"
                            />
                          ))}
                      {lecture.content_url && (
                        <iframe
                          src={lecture.content_url}
                          title="강의 소개"
                          width="100%"
                          height="800px"
                          className="min-h-[400px] lg:min-h-[800px]"
                          style={{ border: "none" }}
                        />
                      )}
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div className="prose min-h-[200px] max-w-none lg:min-h-96">
                      <h2 className="mb-4 text-2xl font-bold">강사 소개</h2>
                      <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-4 text-xl font-bold">
                          {lecture.coach.name}
                        </h3>
                        {lecture.coach.bio && (
                          <div className="mb-4">
                            <p className="leading-relaxed text-gray-700">
                              {lecture.coach.bio}
                            </p>
                          </div>
                        )}
                        {lecture.coach.career && (
                          <div>
                            <h4 className="mb-2 font-semibold">경력</h4>
                            <p className="leading-relaxed whitespace-pre-line text-gray-700">
                              {lecture.coach.career}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden w-full space-y-6 lg:block lg:w-2/5">
              <LectureSidebar lecture={lecture} />
            </div>
          </div>
        </div>
      </div>

      <MobileFloatingBar
        lecture={lecture}
        onApplyClick={handleApplyClick}
        isLoading={isLoading}
      />
    </>
  );
}
