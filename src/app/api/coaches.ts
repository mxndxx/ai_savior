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
    // TODO 정렬 기준 수정 필요
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
    existingProfileImageUrl?: string | null,
  ): Promise<Coach> => {
    try {
      const updatePayload: any = { ...updateData };
      let newProfileImageUrl: string | null = null;

      // 1. 프로필 이미지 파일이 있으면 업로드
      if (profileImageFile) {
        newProfileImageUrl = await storageApi.uploadFile(
          profileImageFile,
          "coach-profiles",
        );
        updatePayload.profile_image = newProfileImageUrl;
      }

      // 2. 데이터베이스 업데이트
      const { data: updatedCoach, error: updateError } = await supabase
        .from("coaches")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        // DB 업데이트 실패 시, 방금 업로드한 파일이 있다면 삭제 (롤백)
        if (newProfileImageUrl) {
          await storageApi.deleteFile(newProfileImageUrl);
        }
        throw new Error(`강사 정보 수정 실패: ${updateError.message}`);
      }

      // 3. DB 업데이트 성공 후, 기존 이미지 삭제
      if (profileImageFile && existingProfileImageUrl) {
        await storageApi.deleteFile(existingProfileImageUrl);
      }

      if (!updatedCoach) {
        throw new Error("강사를 찾을 수 없습니다.");
      }

      return updatedCoach;
    } catch (error) {
      console.error("강사 정보 수정 중 오류:", error);
      throw error;
    }
  },

  // 강사 삭제
  deleteCoach: async (
    id: string,
    profileImageUrl: string | null,
  ): Promise<void> => {
    try {
      // 1. 데이터베이스에서 강사 삭제
      const { error: deleteError } = await supabase
        .from("coaches")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(`강사 삭제 실패: ${deleteError.message}`);
      }

      // 2. DB 삭제 성공 후, 스토리지에서 프로필 이미지 삭제
      if (profileImageUrl) {
        await storageApi.deleteFile(profileImageUrl);
      }
    } catch (error) {
      console.error("강사 삭제 중 오류:", error);
      throw error;
    }
  },
};
