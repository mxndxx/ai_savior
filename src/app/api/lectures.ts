import { supabase } from "@/utils/supabase";
import { Lecture, CreateLectureForm, LectureWithCoach } from "@/types/course";
import { storageApi } from "@/app/api/storage";

export interface CreateLectureParams {
  formData: CreateLectureForm;
  thumbnailFile: File;
  contentImageFile: File;
}

export const lecturesApi = {
  // 강의 생성
  createLecture: async ({
    formData,
    thumbnailFile,
    contentImageFile,
  }: CreateLectureParams): Promise<Lecture> => {
    try {
      // 1. 현재 사용자 인증 상태 확인
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
      }

      // 2. 이미지 파일들 업로드
      const thumbnailUrl = await storageApi.uploadFile(
        thumbnailFile,
        "lecture-thumbnails",
      );

      const contentImageUrl = await storageApi.uploadFile(
        contentImageFile,
        "lecture-content-images",
      );

      // 2. 데이터베이스에 강의 데이터 삽입
      const lectureData = {
        title: formData.title,
        description: formData.description,
        thumbnail: thumbnailUrl,
        content_image: contentImageUrl,
        url: formData.url,
        start_date: formData.start_date,
        apply_deadline: formData.apply_deadline,
        price: formData.price,
        coach_id: formData.coach_id,
      };

      const { data: insertedLecture, error } = await supabase
        .from("lectures")
        .insert([lectureData])
        .select()
        .single();

      if (error) {
        throw new Error(`데이터베이스 저장 실패: ${error.message}`);
      }

      return {
        id: insertedLecture.id,
        title: insertedLecture.title,
        description: insertedLecture.description,
        thumbnail: insertedLecture.thumbnail,
        content_image: insertedLecture.content_image,
        url: insertedLecture.url,
        start_date: insertedLecture.start_date,
        apply_deadline: insertedLecture.apply_deadline,
        price: insertedLecture.price,
        coach_id: insertedLecture.coach_id,
        updated_at: insertedLecture.updated_at,
      };
    } catch (error) {
      console.error("강의 생성 중 오류:", error);
      throw error;
    }
  },

  // 강의 목록 조회
  getLectures: async (): Promise<LectureWithCoach[]> => {
    const { data, error } = await supabase
      .from("lectures")
      .select(
        `
        *,
        coach:coaches!coach_id (name)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`강의 목록 조회 실패: ${error.message}`);
    }

    console.log("api 함수 : ", data);

    return data || [];
  },

  // 강의 수정
  updateLecture: async (
    id: string,
    updateData: Partial<CreateLectureForm>,
    thumbnailFile?: File,
    contentImageFile?: File,
  ): Promise<Lecture> => {
    try {
      const updatePayload: any = { ...updateData };

      // 2. 이미지 파일들 업로드 (createLecture와 동일한 키 이름 사용)
      if (thumbnailFile) {
        updatePayload.thumbnail = await storageApi.uploadFile(
          thumbnailFile,
          "lecture-thumbnails",
        );
      }

      if (contentImageFile) {
        updatePayload.content_image = await storageApi.uploadFile(
          contentImageFile,
          "lecture-content-images",
        );
      }

      // 3. 데이터베이스 업데이트
      const { data: updatedLecture, error } = await supabase
        .from("lectures")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`강의 수정 실패: ${error.message}`);
      }

      // 4. 일관된 반환 형식 (createLecture와 동일)
      return {
        id: updatedLecture.id,
        title: updatedLecture.title,
        description: updatedLecture.description,
        thumbnail: updatedLecture.thumbnail,
        content_image: updatedLecture.content_image,
        url: updatedLecture.url,
        start_date: updatedLecture.start_date,
        apply_deadline: updatedLecture.apply_deadline,
        price: updatedLecture.price,
        coach_id: updatedLecture.coach_id,
        updated_at: updatedLecture.updated_at,
      };
    } catch (error) {
      console.error("강의 수정 중 오류:", error);
      throw error;
    }
  },

  // 강의 삭제
  deleteLecture: async (id: string): Promise<void> => {
    const { error } = await supabase.from("lectures").delete().eq("id", id);

    if (error) {
      throw new Error(`강의 삭제 실패: ${error.message}`);
    }
  },
};
