interface ConvertKitEmailTemplate {
  id: number;
  name: string;
  is_default: boolean;
  category: string;
}

interface EmailTemplatesResponse {
  email_templates: ConvertKitEmailTemplate[];
  nextCursor: string | null;
}

export const convertKitApi = {
  async getEmailTemplates(cursor?: string): Promise<EmailTemplatesResponse> {
    try {
      const url = cursor
        ? `/api/convertkit/email-templates?cursor=${cursor}`
        : "/api/convertkit/email-templates";

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const data: EmailTemplatesResponse = await response.json();

      // console.log(data);
      return data;
    } catch (error) {
      console.error("ConvertKit 이메일 템플릿 가져오기 실패:", error);
      throw error;
    }
  },

  async createTag(name: string): Promise<{ id: number; name: string }> {
    try {
      const response = await fetch("/api/convertkit/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const data: { id: number; name: string } = await response.json();
      return data;
    } catch (error) {
      console.error("ConvertKit 태그 생성 실패:", error);
      throw error;
    }
  },
};

export type { ConvertKitEmailTemplate };
