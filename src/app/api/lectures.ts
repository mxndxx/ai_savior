import { supabase } from "@/utils/supabase";
import { Lecture, CreateLectureForm, LectureWithCoach } from "@/types/lectures";
import { storageApi } from "@/app/api/storage";

export interface CreateLectureParams {
  formData: CreateLectureForm;
  thumbnailFile: File;
  contentImageFiles?: File[];
}

export const lecturesApi = {
  // 강의 생성
  createLecture: async ({
    formData,
    thumbnailFile,
    contentImageFiles,
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

      let contentImagesUrl: string | null = null;
      if (contentImageFiles && contentImageFiles.length > 0) {
        const uploadPromises = contentImageFiles.map((file) =>
          storageApi.uploadFile(file, "lecture-content-images"),
        );
        const urls = await Promise.all(uploadPromises);
        contentImagesUrl = urls.join(",");
      }

      // 2. 데이터베이스에 강의 데이터 삽입
      const lectureData = {
        title: formData.title,
        description: formData.description,
        thumbnail: thumbnailUrl,
        content_image: contentImagesUrl,
        content_text: formData.content_text,
        content_url: formData.content_url,
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
        content_text: insertedLecture.content_text,
        content_url: insertedLecture.content_url,
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

    // TODO: 콘솔 제거
    // console.log("api 함수 : ", data);

    return data || [];
  },

  // 강의 상세 정보 조회
  getLectureById: async (id: string): Promise<LectureWithCoach | null> => {
    const { data, error } = await supabase
      .from("lectures")
      .select(
        `
        *,
        coach:coaches!coach_id (id, name)
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      // PostgREST 'PGRST116' 에러는 찾는 행이 없을 때 발생합니다.
      // 이 경우 null을 반환하여 데이터가 없음을 알립니다.
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`강의 정보 조회 실패: ${error.message}`);
    }

    return data as LectureWithCoach;
  },

  // 강의 수정
  updateLecture: async (
    id: string,
    updateData: Partial<CreateLectureForm>,
    thumbnailFile?: File,
    contentImageFiles?: File[],
    existingThumbnailUrl?: string | null,
    existingContentImageUrls?: string[],
    deletedContentImageUrls?: string[],
  ): Promise<Lecture> => {
    try {
      const updatePayload: any = { ...updateData };
      let newThumbnailUrl: string | undefined;
      let newUploadedImageUrls: string[] = [];

      // 1. 썸네일 이미지 처리
      if (thumbnailFile) {
        newThumbnailUrl = await storageApi.uploadFile(
          thumbnailFile,
          "lecture-thumbnails",
        );
        updatePayload.thumbnail = newThumbnailUrl;
      } else if (updateData.thumbnail === null) {
        updatePayload.thumbnail = null;
      }

      // 2. 내용 이미지 처리 (업로드 및 URL 조합)
      if (contentImageFiles && contentImageFiles.length > 0) {
        const uploadPromises = contentImageFiles.map((file) =>
          storageApi.uploadFile(file, "lecture-content-images"),
        );
        newUploadedImageUrls = await Promise.all(uploadPromises);
      }

      // 삭제되지 않은 기존 이미지와 새로 업로드된 이미지를 합쳐서 최종 URL 목록 생성
      const finalImageUrls = [
        ...(existingContentImageUrls || []),
        ...newUploadedImageUrls,
      ];
      updatePayload.content_image = finalImageUrls.join(",");

      // 3. 데이터베이스 업데이트
      const { data: updatedLecture, error: updateError } = await supabase
        .from("lectures")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        // DB 업데이트 실패 시, 방금 업로드한 파일이 있다면 삭제 (롤백)
        if (newThumbnailUrl) {
          await storageApi.deleteFile(newThumbnailUrl);
        }
        if (newUploadedImageUrls.length > 0) {
          const deletePromises = newUploadedImageUrls.map((url) =>
            storageApi.deleteFile(url),
          );
          await Promise.all(deletePromises);
        }
        throw new Error(`강의 수정 실패: ${updateError.message}`);
      }

      // 4. DB 업데이트 성공 후, 기존 이미지 삭제
      // 4-1. 썸네일 삭제
      if (
        (thumbnailFile || updateData.thumbnail === null) &&
        existingThumbnailUrl
      ) {
        await storageApi.deleteFile(existingThumbnailUrl);
      }

      // 4-2. 내용 이미지 삭제
      if (deletedContentImageUrls && deletedContentImageUrls.length > 0) {
        const deletePromises = deletedContentImageUrls.map((url) =>
          storageApi.deleteFile(url),
        );
        await Promise.all(deletePromises);
      }

      // 5. 일관된 반환 형식 (createLecture와 동일)
      return {
        id: updatedLecture.id,
        title: updatedLecture.title,
        description: updatedLecture.description,
        thumbnail: updatedLecture.thumbnail,
        content_image: updatedLecture.content_image,
        content_text: updatedLecture.content_text,
        content_url: updatedLecture.content_url,
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
  deleteLecture: async (
    id: string,
    thumbnailUrl: string,
    contentImageUrl: string,
  ): Promise<void> => {
    try {
      // 1. 데이터베이스에서 강의 삭제
      const { error: deleteError } = await supabase
        .from("lectures")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(`강의 삭제 실패: ${deleteError.message}`);
      }

      // 2. DB 삭제 성공 시, 스토리지에서 이미지 파일들 삭제
      try {
        if (thumbnailUrl) {
          await storageApi.deleteFile(thumbnailUrl);
        }
        if (contentImageUrl) {
          const imageUrls = contentImageUrl.split(",");
          const deletePromises = imageUrls.map((url) =>
            storageApi.deleteFile(url),
          );
          await Promise.all(deletePromises);
        }
      } catch (storageError) {
        // 스토리지 파일 삭제 실패 시 에러를 로깅하지만, 전체 프로세스를 중단시키지는 않습니다.
        // DB에서는 이미 삭제되었으므로, 사용자 경험상으로는 삭제가 성공한 것처럼 보입니다.
        console.error("스토리지 파일 삭제 중 오류 발생:", storageError);
      }
    } catch (error) {
      console.error("강의 삭제 처리 중 오류:", error);
      // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
      throw error;
    }
  },
};
