interface ConvertKitBroadcast {
  id: number;
  name: string;
  subject: string;
  created_at: string;
  content?: string;
}

interface BroadcastsResponse {
  broadcasts: ConvertKitBroadcast[];
  nextCursor: string | null;
}

export const convertKitApi = {
  async getBroadcasts(cursor?: string): Promise<BroadcastsResponse> {
    try {
      const url = cursor 
        ? `/api/convertkit/broadcasts?cursor=${cursor}`
        : "/api/convertkit/broadcasts";
      
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const data: BroadcastsResponse = await response.json();
      console.log(`ConvertKit 브로드캐스트 데이터: `, data);
      return data;
    } catch (error) {
      console.error("ConvertKit 브로드캐스트 가져오기 실패:", error);
      throw error;
    }
  },
};

export type { ConvertKitBroadcast };
