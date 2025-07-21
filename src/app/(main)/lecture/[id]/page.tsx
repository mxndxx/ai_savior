"use client";

import { useState, useEffect, useCallback } from "react";
import { notFound, useParams } from "next/navigation";
import LectureImage from "@/components/LectureImage";
import Image from "next/image";
import { lecturesApi } from "@/app/api/lectures";
import { LectureSidebar } from "@/components/LectureSidebar";
import { LectureWithCoach } from "@/types/lectures";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import InfoModal from "@/components/InfoModal";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { leadsApi } from "@/app/api/leads";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("intro");
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureWithCoach | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState<
    "hidden" | "login" | "success"
  >("hidden");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [applyAfterLogin, setApplyAfterLogin] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`,
      },
    });

    if (error) {
      console.error("Kakao login error:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleApply = useCallback(
    async (currentUser: User) => {
      if (!lecture) return;

      setIsLoading(true);
      setError(null);

      try {
        await leadsApi.createLead({
          name: currentUser.user_metadata?.full_name || currentUser.email || "",
          email: currentUser.email || "",
          subscribe: lecture.id,
        });
        setModalStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생하여 신청에 실패했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [lecture],
  );

  const handleApplyClick = () => {
    if (!user) {
      setApplyAfterLogin(true);
      setModalStatus("login");
      return;
    }
    handleApply(user);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (event === "SIGNED_IN" && session && applyAfterLogin) {
        setApplyAfterLogin(false);
        setModalStatus("hidden");
        handleApply(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [applyAfterLogin, handleApply]);

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

      <InfoModal
        isOpen={modalStatus !== "hidden"}
        onClose={() => setModalStatus("hidden")}
        onLogin={handleLogin}
        status={modalStatus === "success" ? "success" : "login"}
      />
    </>
  );
}
