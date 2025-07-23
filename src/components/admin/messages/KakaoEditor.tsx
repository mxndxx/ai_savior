// TODO 이메일 컴포넌트와 합쳐서 재사용 가능하면 컴포넌트 리팩토링
import { TemplateSelector } from "@/components/admin/messages/TemplateSelector";
import { solapiApi } from "@/utils/solapi";

interface KakaoEditorProps {
  channelLabel: string;
}

export const KakaoEditor = ({ channelLabel }: KakaoEditorProps) => {
  const fetchTemplates = async (cursor?: string) => {
    const data = await solapiApi.getTemplates(cursor);
    console.log(data);
    return {
      templates: data.templates.map((t) => ({
        id: t.templateId,
        title: t.name,
        content: t.content,
      })),
      nextCursor: data.nextCursor,
    };
  };

  const renderContent = (template: {
    id: string | number;
    title: string;
    content?: string;
  }) => {
    return (
      <div className="p-4">
        <p className="text-sm whitespace-pre-wrap text-gray-600">
          {template.content || `템플릿명: ${template.title}`}
        </p>
      </div>
    );
  };

  return (
    <TemplateSelector
      channelLabel={channelLabel}
      channel="kakao"
      fetchTemplates={fetchTemplates}
      renderContent={renderContent}
    />
  );
};
