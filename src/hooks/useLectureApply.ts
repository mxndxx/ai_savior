import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { leadsApi } from "@/app/api/leads";
import { LectureWithCoach } from "@/types/lectures";

export function useLectureApply(lecture: LectureWithCoach | null) {
  const [modalStatus, setModalStatus] = useState<
    "hidden" | "login" | "success"
  >("hidden");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [applyAfterLogin, setApplyAfterLogin] = useState(false);

  const handleLogin = async () => {
    // 현재 페이지 경로를 저장
    const currentPath = window.location.pathname + window.location.search;

    // 브라우저의 현재 origin을 사용하여 더 안전하게 처리
    const baseURL = window.location.origin;
    const redirectTo = `${baseURL}/api/auth/callback?next=${encodeURIComponent(currentPath)}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          scope: "name account_email phone_number",
        },
        redirectTo: redirectTo,
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
          name: currentUser.user_metadata?.name || "",
          email: currentUser.email || "",
          phone_number: currentUser.user_metadata?.phone_number || "",
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
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);

        // 로그인 후 자동 신청
        if (event === "SIGNED_IN" && applyAfterLogin) {
          // 서버에서 사용자 정보를 업데이트한 후 최신 정보 가져오기
          const {
            data: { user: updatedUser },
          } = await supabase.auth.getUser();

          if (updatedUser) {
            setUser(updatedUser);
            setApplyAfterLogin(false);
            setModalStatus("hidden");
            handleApply(updatedUser);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [applyAfterLogin, handleApply]);

  return {
    modalStatus,
    setModalStatus,
    isLoading,
    error,
    user,
    handleLogin,
    handleApplyClick,
  };
}
