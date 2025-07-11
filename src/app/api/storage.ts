import { supabase } from "@/utils/supabase";

export const storageApi = {
  uploadFile: async (
    file: File,
    bucket: string,
    path?: string,
  ): Promise<string> => {
    const normalizedFileName = file.name.normalize("NFC");
    const lastDotIndex = normalizedFileName.lastIndexOf(".");

    let baseName = normalizedFileName;
    let extension = "";

    if (lastDotIndex > -1) {
      baseName = normalizedFileName.substring(0, lastDotIndex);
      extension = normalizedFileName.substring(lastDotIndex);
    }

    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9_.-]/g, "_");

    const uniqueBaseName = `${Date.now()}-${sanitizedBaseName}`;
    const fileName = path || `${uniqueBaseName}${extension}`;

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

  deleteFile: async (fileUrl: string): Promise<void> => {
    if (!fileUrl) return;

    try {
      const url = new URL(fileUrl);
      const pathname = decodeURIComponent(url.pathname);

      const publicPathString = "/public/";
      const publicPathIndex = pathname.indexOf(publicPathString);

      if (publicPathIndex === -1) {
        throw new Error(
          `유효하지 않은 Supabase 스토리지 URL입니다: ${fileUrl}`,
        );
      }

      const pathAfterPublic = pathname.substring(
        publicPathIndex + publicPathString.length,
      );

      const [bucketName, ...filePathParts] = pathAfterPublic.split("/");
      const filePath = filePathParts.join("/");

      if (!bucketName || !filePath) {
        throw new Error(
          `URL에서 버킷명 또는 파일 경로를 추출할 수 없습니다: ${pathAfterPublic}`,
        );
      }

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        if (error.message.toLowerCase().includes("not found")) {
          console.warn(
            `삭제할 파일을 Storage에서 찾을 수 없습니다: ${filePath}`,
          );
          return;
        }
        throw new Error(`파일 삭제 실패: ${error.message}`);
      }
    } catch (error) {
      console.error("파일 삭제 처리 중 오류:", error);
      if (error instanceof Error) {
        throw new Error(`파일 삭제에 실패했습니다: ${error.message}`);
      }
      throw new Error("알 수 없는 이유로 파일 삭제에 실패했습니다.");
    }
  },
};
