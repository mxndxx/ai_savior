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

  const handleApply = useCallback(async () => {
    if (!lectureId) return;

    setIsApplying(true);
    setApplyError(null);

    try {
      await leadsApi.createLead(lectureId);
      setModalStatus("success");
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

  const onLoginSuccess = useCallback((user: User) => {
    if (applyAfterLogin) {
      setApplyAfterLogin(false);
      setModalStatus("hidden");
      handleApply();
    }
  }, [applyAfterLogin, handleApply]);

  const { user, handleKakaoLogin, error, isLoading } = useKakaoAuth({
    onLoginSuccess,
  });

  const handleApplyClick = () => {
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
  };
}
