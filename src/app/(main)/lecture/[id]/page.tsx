"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import LectureImage from "@/components/LectureImage";
import Image from "next/image";
import { courseData } from "@/data/courses";
import { LectureSidebar } from "@/components/LectureSidebar";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState("intro");
  const resolvedParams = use(params);
  const course = courseData[resolvedParams.id];

  if (!course) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative flex gap-8">
            <div className="flex-3/5 space-y-4">
              <LectureImage
                src={course.thumbnail}
                alt={course.title}
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
                      <Image
                        src={course.introImage || ""}
                        alt={course.title}
                        width={760}
                        height={600}
                      />
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div className="prose min-h-96 max-w-none">
                      <h2 className="mb-4 text-2xl font-bold">강사 소개</h2>
                      <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-2 text-xl font-bold">
                          {course.instructor}
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                          {course.instructor_info}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-2/5 space-y-6">
              <LectureSidebar course={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
