import { supabase } from "@/utils/supabase";

export const leadsApi = {
  createLead: async (subscribe?: string | null): Promise<void> => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
    }

    const { error } = await supabase.from("leads").insert([
      {
        user_id: user.id,
        subscribe: subscribe,
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        throw new Error("이미 해당 강의에 신청하셨습니다.");
      }
      throw new Error(`신청 처리 중 오류가 발생했습니다: ${error.message}`);
    }
  },
};
