import { supabase } from "@/utils/supabase";
import { Coach, CreateCoachForm } from "@/types/coaches";
import { storageApi } from "@/app/api/storage";

export interface CreateCoachParams {
  formData: CreateCoachForm;
  profileImageFile: File;
}

export const coachesApi = {
  // 강사 생성
  createCoach: async ({
    formData,
    profileImageFile,
  }: CreateCoachParams): Promise<Coach> => {
    try {
      // 1. 현재 사용자 인증 상태 확인
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("인증이 필요합니다. 로그인 후 다시 시도해주세요.");
      }

      // 2. 프로필 이미지 업로드
      const profileImageUrl = await storageApi.uploadFile(
        profileImageFile,
        "coach-profiles",
      );

      // 3. 데이터베이스에 강사 데이터 삽입
      const coachData = {
        name: formData.name,
        bio: formData.bio,
        career: formData.career,
        profile_image: profileImageUrl,
      };

      const { data: insertedCoach, error } = await supabase
        .from("coaches")
        .insert([coachData])
        .select()
        .single();

      if (error) {
        throw new Error(`데이터베이스 저장 실패: ${error.message}`);
      }

      return {
        id: insertedCoach.id,
        name: insertedCoach.name,
        bio: insertedCoach.bio,
        career: insertedCoach.career,
        profile_image: insertedCoach.profile_image,
        created_at: insertedCoach.created_at,
        updated_at: insertedCoach.updated_at,
      };
    } catch (error) {
      console.error("강사 생성 중 오류:", error);
      throw error;
    }
  },

  // 강사 목록 조회
  getCoaches: async (): Promise<Coach[]> => {
    const { data, error } = await supabase
      .from("coaches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`강사 목록 조회 실패: ${error.message}`);
    }

    return data || [];
  },

  // 특정 강사 조회
  getCoachById: async (id: string): Promise<Coach> => {
    const { data, error } = await supabase
      .from("coaches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`강사 조회 실패: ${error.message}`);
    }

    if (!data) {
      throw new Error("강사를 찾을 수 없습니다.");
    }

    return data;
  },

  getCoachOptions: async (): Promise<{ id: string; name: string }[]> => {
    const { data, error } = await supabase
      .from("coaches")
      .select("id, name") // 필요한 컬럼만 선택
      .order("name", { ascending: true }); // 이름순 정렬이 더 적합

    if (error) {
      throw new Error(`강사 목록 조회 실패: ${error.message}`);
    }

    return data || [];
  },

  // 강사 정보 수정
  updateCoach: async (
    id: string,
    updateData: Partial<CreateCoachForm>,
    profileImageFile?: File,
  ): Promise<Coach> => {
    try {
      const updatePayload: any = { ...updateData };

      // 프로필 이미지 파일이 있으면 업로드
      if (profileImageFile) {
        updatePayload.profile_image = await storageApi.uploadFile(
          profileImageFile,
          "coach-profiles",
        );
      }

      const { data, error } = await supabase
        .from("coaches")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`강사 정보 수정 실패: ${error.message}`);
      }

      if (!data) {
        throw new Error("강사를 찾을 수 없습니다.");
      }

      return data;
    } catch (error) {
      console.error("강사 정보 수정 중 오류:", error);
      throw error;
    }
  },

  // 강사 삭제
  //   deleteCoach: async (id: string): Promise<void> => {
  //     try {
  //       // 1. 강사 정보 조회 (프로필 이미지 삭제를 위해)
  //       const coach = await coachesApi.getCoachById(id);

  //       // 2. 프로필 이미지 삭제 (선택사항)
  //       if (coach.profile_image) {
  //         try {
  //           await storageApi.deleteFile(coach.profile_image, "coach-profiles");
  //         } catch (error) {
  //           console.warn("프로필 이미지 삭제 실패:", error);
  //           // 이미지 삭제 실패해도 강사 삭제는 진행
  //         }
  //       }

  //       // 3. 데이터베이스에서 강사 삭제
  //       const { error } = await supabase.from("coaches").delete().eq("id", id);

  //       if (error) {
  //         throw new Error(`강사 삭제 실패: ${error.message}`);
  //       }
  //     } catch (error) {
  //       console.error("강사 삭제 중 오류:", error);
  //       throw error;
  //     }
  //   },
};
