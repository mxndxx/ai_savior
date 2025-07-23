interface SolapiTemplate {
  id: string;
  templateId: string;
  name: string;
  emphasizeTitle: string;
  emphasizeSubtitle: string;
  content: string;
  dateCreated: string;
  dateUpdated: string;
}

interface TemplatesResponse {
  templates: SolapiTemplate[];
  nextCursor: string | null;
}

export const solapiApi = {
  async getTemplates(cursor?: string): Promise<TemplatesResponse> {
    try {
      const url = cursor
        ? `/api/solapi/templates?cursor=${cursor}`
        : "/api/solapi/templates";

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const data: TemplatesResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Solapi 알림톡 템플릿 가져오기 실패:", error);
      throw error;
    }
  },

  async getTemplateById(id: string): Promise<SolapiTemplate> {
    try {
      const response = await fetch(`/api/solapi/templates/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API 오류: ${response.status}`);
      }

      const data: SolapiTemplate = await response.json();
      console.log("솔라피 api 단일 호출 : ", data);
      return data;
    } catch (error) {
      console.error("Solapi 알림톡 템플릿 가져오기 실패:", error);
      throw error;
    }
  },
};

export type { SolapiTemplate };
