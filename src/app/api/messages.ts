import { supabase } from "@/utils/supabase";

// TODO: 에러 핸들링 공통으로 빼서 처리하기
export const messagesApi = {
  // 강의별 메시지 목록 조회
  // TODO: 함수명 변경
  getMessagesByLectureId: async (id: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from("lecture_messages")
      .select("*")
      .eq("id", id)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`메시지 목록 조회 실패: ${error.message}`);
    }
    // TODO: 콘솔 제거
    // console.log("messages api 호출 : ", data);

    return data || [];
  },

  createMessage: async (
    lectureId: string,
    timingKey: string,
    content: string,
  ) => {
    const { data, error } = await supabase
      .from("lecture_messages")
      .upsert({ id: lectureId, [timingKey]: content })
      .select();

    if (error) {
      console.error("Error creating message:", error);
      throw error;
    }

    return data;
  },

  updateMessage: async (id: string, column: string, content: string) => {
    const { data, error } = await supabase
      .from("lecture_messages")
      .update({ [column]: content })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating message:", error);
      throw error;
    }

    return data;
  },
};
