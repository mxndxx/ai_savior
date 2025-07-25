import { useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useKakaoAuth } from "./useKakaoAuth";
import { supabase } from "@/utils/supabase";

const SESSION_STORAGE_KEY = "funnelKakaoLoginAttempt";

export function useFunnelApply() {
  const router = useRouter();

  const onLoginSuccess = useCallback(
    async (user: User) => {
      const loginAttempt = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (loginAttempt && user.app_metadata?.provider === "kakao") {
        // 로그인 시도가 있었고, 카카오로 로그인한 경우

        // profiles 테이블에서 사용자 정보 가져오기
        // TODO api 함수 분리
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", user.id)
          .single();

        const userName = profile?.name || user.email?.split("@")[0] || "사용자";
        sessionStorage.setItem("userName", userName);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);

        // /detail 페이지로 리다이렉트
        router.push("/detail");
      }
    },
    [router],
  );

  const { isLoading, error, user, handleKakaoLogin } = useKakaoAuth({
    additionalParams: { funnel: "true" },
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
