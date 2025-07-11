"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import LectureImage from "@/components/LectureImage";
import Image from "next/image";
import { lecturesApi } from "@/app/api/lectures";
import { LectureSidebar } from "@/components/LectureSidebar";
import { LectureWithCoach } from "@/types/lectures";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureWithCoach | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  if (!lecture) {
    return notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative flex gap-8">
            <div className="flex-3/5 space-y-4">
              <LectureImage
                src={lecture.thumbnail}
                alt={lecture.title}
                width={760}
                height={600}
              />
              <div className="z-10 mt-4 bg-white py-1">
                <nav className="sticky top-24 flex justify-center bg-white">
                  {[
                    { id: "intro", label: "강의 소개" },
                    { id: "instructor", label: "강사 소개" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-2 py-4 text-sm font-medium transition-all duration-500 ease-in-out hover:border-b-2 hover:border-violet-600 hover:text-violet-600 ${
                        activeTab === tab.id
                          ? "border-b-2 border-violet-600 text-violet-600"
                          : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-8 min-h-screen pb-12">
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
                            />
                          ))}
                      {lecture.content_url && (
                        <iframe
                          src={lecture.content_url}
                          title="강의 소개"
                          width="100%"
                          height="800px"
                          style={{ border: "none" }}
                        />
                      )}
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div className="prose min-h-96 max-w-none">
                      <h2 className="mb-4 text-2xl font-bold">강사 소개</h2>
                      <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-2 text-xl font-bold">
                          {lecture.coach.name}
                        </h3>
                        {/* <p className="leading-relaxed text-gray-700">
                          {lecture.coach.bio}
                        </p> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-2/5 space-y-6">
              <LectureSidebar lecture={lecture} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
