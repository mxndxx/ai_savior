interface ConvertKitSequence {
  id: number;
  name: string;
  hold: boolean;
  repeat: boolean;
  created_at: string;
}

export const convertKitApi = {
  async getSequences(): Promise<ConvertKitSequence[]> {
    try {
      const response = await fetch("/api/convertkit/sequences");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const sequences: ConvertKitSequence[] = await response.json();
      console.log("ConvertKit 시퀀스 데이터 : ", sequences);
      return sequences;
    } catch (error) {
      console.error("ConvertKit 시퀀스 가져오기 실패:", error);
      throw error;
    }
  },
};

export type { ConvertKitSequence };
