"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { LectureWithCoach } from "@/types/lectures";
import InfoModal from "@/components/InfoModal";
import { supabase } from "@/utils/supabase";
import { leadsApi } from "@/app/api/leads";
import { CountdownTimer } from "@/components/CountdownTimer";

export function LectureSidebar({ lecture }: { lecture: LectureWithCoach }) {
  const [modalStatus, setModalStatus] = useState<
    "hidden" | "login" | "success"
  >("hidden");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [applyAfterLogin, setApplyAfterLogin] = useState(false);

  // TODO 에러 처리 필요
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
    [lecture.id],
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

  return (
    <div className="h-fit lg:sticky lg:top-28">
      <div className="flex flex-col gap-3">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-600 px-3 py-1 text-sm font-bold text-white">
              {lecture.coach.name}
            </span>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold">{lecture.title}</h3>

        <div className="space-y-1 border-b border-gray-200 pb-6">
          <p className="text-sm font-bold text-gray-600">강의정보</p>
          {/* <div className="flex justify-between">
            <span className="font-semibold text-gray-600">카테고리</span>
            <span>{lecture.category}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">강사명</span>
            <span>{lecture.coach.name}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <span className="text-gray-600">가격</span> */}
          <span className="font-bold text-red-600">무료</span>
          <span className="font-bold text-violet-600">
            0원
            {/* {course.price?.toLocaleString()}원 */}
          </span>
        </div>

        <button
          onClick={handleApplyClick}
          disabled={isLoading}
          className="w-full rounded-lg bg-violet-600 px-6 py-4 text-lg font-bold text-white transition-colors duration-200 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "신청하는 중..." : "무료강의 신청하기"}
        </button>

        <CountdownTimer deadline={lecture.apply_deadline} />
      </div>

      <InfoModal
        isOpen={modalStatus !== "hidden"}
        onClose={() => setModalStatus("hidden")}
        onLogin={handleLogin}
        status={modalStatus === "success" ? "success" : "login"}
      />
    </div>
  );
}
