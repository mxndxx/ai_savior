import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { leadsApi } from "@/app/api/leads";
import { useKakaoAuth } from "./useKakaoAuth";

export function useLectureApply(lectureId: string | null) {
  const [modalStatus, setModalStatus] = useState<
    "hidden" | "login" | "success"
  >("hidden");
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applyAfterLogin, setApplyAfterLogin] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = useCallback(async () => {
    if (!lectureId) return;

    setIsApplying(true);
    setApplyError(null);

    try {
      // 1. leads 테이블에 신청 정보 저장
      await leadsApi.createLead(lectureId);

      // 2. webhook 호출 (실패해도 신청은 성공으로 처리)
      try {
        const response = await fetch("/api/lectures/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lectureId }),
        });

        if (!response.ok) {
          console.error("Webhook 호출 실패:", await response.text());
        }
      } catch (webhookError) {
        console.error("Webhook 호출 중 오류:", webhookError);
      }

      setModalStatus("success");
      setIsApplied(true); // 신청 성공 시 상태 업데이트
    } catch (err) {
      if (err instanceof Error) {
        setApplyError(err.message);
      } else {
        setApplyError("오류가 발생하여 신청에 실패했습니다.");
      }
    } finally {
      setIsApplying(false);
    }
  }, [lectureId]);

  const onLoginSuccess = useCallback(
    (user: User) => {
      if (applyAfterLogin) {
        setApplyAfterLogin(false);
        setModalStatus("hidden");
        handleApply();
      }
    },
    [applyAfterLogin, handleApply],
  );

  const { user, handleKakaoLogin, error, isLoading } = useKakaoAuth({
    onLoginSuccess,
  });

  // 신청 여부 확인
  useEffect(() => {
    if (user && lectureId) {
      leadsApi.isApplied(lectureId).then(setIsApplied);
    }
  }, [user, lectureId]);

  const handleApplyClick = () => {
    if (isApplied) return;

    if (!user) {
      setApplyAfterLogin(true);
      setModalStatus("login");
      return;
    }
    handleApply();
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (applyError) {
      alert(applyError);
      setApplyError(null);
    }
  }, [applyError]);

  return {
    modalStatus,
    setModalStatus,
    isLoading: isLoading || isApplying,
    error: error || applyError,
    user,
    handleLogin: handleKakaoLogin,
    handleApplyClick,
    isApplied,
  };
}
