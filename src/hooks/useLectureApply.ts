import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { leadsApi } from "@/app/api/leads";
import { getKakaoUserInfo, updateUserMetadata } from "@/utils/kakao-auth";
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          scope: "name account_email phone_number",
        },
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
        // 카카오 사용자 정보 업데이트 체크
        if (
          user.app_metadata?.provider === "kakao" &&
          user.user_metadata?.provider_token
        ) {
          const kakaoInfo = await getKakaoUserInfo(
            user.user_metadata.provider_token,
          );
          if (kakaoInfo && (kakaoInfo.name || kakaoInfo.phoneNumber)) {
            const needsUpdate =
              (kakaoInfo.phoneNumber &&
                kakaoInfo.phoneNumber !== user.user_metadata?.phone_number) ||
              (kakaoInfo.name && kakaoInfo.name !== user.user_metadata?.name);

            if (needsUpdate) {
              await updateUserMetadata(kakaoInfo.phoneNumber, kakaoInfo.name);
            }
          }
        }
        setUser(user);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);

        // 카카오 로그인 시 추가 사용자 정보 가져오기
        if (
          event === "SIGNED_IN" &&
          session.user.app_metadata?.provider === "kakao"
        ) {
          const providerToken =
            session.provider_token ||
            session.user.user_metadata?.provider_token;
          if (providerToken) {
            const kakaoInfo = await getKakaoUserInfo(providerToken);
            if (kakaoInfo && (kakaoInfo.name || kakaoInfo.phoneNumber)) {
              const needsUpdate =
                (kakaoInfo.phoneNumber &&
                  kakaoInfo.phoneNumber !==
                    session.user.user_metadata?.phone_number) ||
                (kakaoInfo.name &&
                  kakaoInfo.name !== session.user.user_metadata?.name);

              if (needsUpdate) {
                await updateUserMetadata(kakaoInfo.phoneNumber, kakaoInfo.name);
              }
            }
          }
        }

        // 로그인 후 자동 신청
        if (event === "SIGNED_IN" && applyAfterLogin) {
          setApplyAfterLogin(false);
          setModalStatus("hidden");
          handleApply(session.user);
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
