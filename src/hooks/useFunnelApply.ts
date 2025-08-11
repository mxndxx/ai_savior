import { useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useKakaoAuth } from "./useKakaoAuth";
import { supabase } from "@/utils/supabase";

const SESSION_STORAGE_KEY = "funnelKakaoLoginAttempt";

export function useFunnelApply() {

  const onLoginSuccess = useCallback(
    async (user: User) => {
      const loginAttempt = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (loginAttempt && user.app_metadata?.provider === "kakao") {
        // 로그인 시도가 있었고, 카카오로 로그인한 경우

        // profiles 테이블에서 사용자 정보 가져오기
        // TODO api 함수 분리
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, email, phone_number")
          .eq("id", user.id)
          .single();

        const userName = profile?.name || user.email?.split("@")[0] || "사용자";
        sessionStorage.setItem("userName", userName);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);

        // n8n 웹훅 트리거
        if (profile?.name && profile?.email && profile?.phone_number) {
          try {
            await fetch("/api/webinar-noti", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: profile.name,
                email: profile.email,
                phone_number: profile.phone_number,
              }),
            });
          } catch (error) {
            // 웹훅 호출 실패는 무시 (사용자 경험에 영향 없음)
          }
        }
      }
    },
    [],
  );

  const { isLoading, error, user, handleKakaoLogin } = useKakaoAuth({
    additionalParams: { next: "/detail" },
    sessionStorageKey: SESSION_STORAGE_KEY,
    onLoginSuccess,
  });

  return {
    isLoading,
    error,
    user,
    handleKakaoLogin,
  };
}
