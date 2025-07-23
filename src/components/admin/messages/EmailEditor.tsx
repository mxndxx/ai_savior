import { TemplateSelector } from "./TemplateSelector";
import { convertKitApi } from "@/utils/convertkit";

interface EmailEditorProps {
  channelLabel: string;
}

export const EmailEditor = ({ channelLabel }: EmailEditorProps) => {
  const fetchTemplates = async (cursor?: string) => {
    const data = await convertKitApi.getBroadcasts(cursor);
    return {
      templates: data.broadcasts.map((b) => ({
        id: b.id,
        title: b.subject,
        content: b.content,
      })),
      nextCursor: data.nextCursor,
    };
  };

  const renderContent = (template: { id: string | number; title: string; content?: string }) => {
    if (template.content) {
      return (
        <div
          className="prose prose-sm max-w-none px-4 text-gray-600 [&_img]:h-auto [&_img]:max-w-full [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0"
          dangerouslySetInnerHTML={{
            __html: template.content.replace(
              /src="(https?:\/\/[^"]+)"/g,
              (match, url) => {
                // 네이버 이미지는 프록시 통해 가져오기
                if (url.includes("pstatic.net")) {
                  return `src="/api/proxy/image?url=${encodeURIComponent(url)}"`;
                }
                return match;
              },
            ),
          }}
        />
      );
    }
    
    return (
      <p className="text-sm text-gray-600 p-4">
        제목: {template.title}
        <br />
        <br />
        (브로드캐스트 내용은 ConvertKit에서 관리됩니다)
      </p>
    );
  };

  return (
    <TemplateSelector
      channelLabel={channelLabel}
      channel="email"
      fetchTemplates={fetchTemplates}
      renderContent={renderContent}
    />
  );
};