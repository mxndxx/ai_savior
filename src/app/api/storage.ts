import { supabase } from "@/utils/supabase";

export const storageApi = {
  uploadFile: async (
    file: File,
    bucket: string,
    path?: string,
  ): Promise<string> => {
    const fileName = path || `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw new Error(`파일 업로드 실패: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrl;
  },
};
