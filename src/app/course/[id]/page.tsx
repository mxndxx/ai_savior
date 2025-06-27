"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import CourseImage from "@/components/CourseImage";
import Image from "next/image";
import { courseData } from "@/data/courses";
import { CourseSidebar } from "@/components/CourseSidebar";

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
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8 relative">
            <div className="space-y-4 flex-3/5">
              <CourseImage
                src={course.thumbnail}
                alt={course.title}
                width={760}
                height={600}
              />
              <div className="mt-4 bg-white py-1 z-10">
                <nav className="flex justify-center sticky top-24 bg-white">
                  {[
                    { id: "intro", label: "강의 소개" },
                    { id: "instructor", label: "강사 소개" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 font-medium text-sm transition-all duration-500 ease-in-out flex-1 hover:text-violet-600 hover:border-b-2 hover:border-violet-600 ${
                        activeTab === tab.id
                          ? "text-violet-600 border-b-2 border-violet-600"
                          : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-8 pb-12 min-h-screen">
                  {activeTab === "intro" && (
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold mb-4">강의 소개</h2>
                      <Image
                        src={course.introImage || ""}
                        alt={course.title}
                        width={760}
                        height={600}
                      />
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div className="prose max-w-none min-h-96">
                      <h2 className="text-2xl font-bold mb-4">강사 소개</h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {course.instructor}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {course.instructor_info}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 flex-2/5">
              <CourseSidebar course={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
