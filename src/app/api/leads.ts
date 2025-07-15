import { supabase } from "@/utils/supabase";

interface LeadData {
  name: string;
  email: string;
  phone_number?: string;
  subscribe: string;
}

export const leadsApi = {
  createLead: async (leadData: LeadData): Promise<void> => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
    }

    if (user.email !== leadData.email) {
      console.warn(
        "Lead email does not match authenticated user email.",
        `Authenticated: ${user.email}, Lead: ${leadData.email}`,
      );
    }

    const { error } = await supabase.from("leads").insert([
      {
        name: leadData.name,
        email: leadData.email,
        phone_number: leadData.phone_number,
        subscribe: leadData.subscribe,
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
