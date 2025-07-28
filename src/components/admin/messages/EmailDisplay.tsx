import { Edit3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { emailTemplatesApi } from "@/app/api/email-templates";

interface EmailDisplayProps {
  content: string | undefined;
  channelLabel: string;
  isEmpty: boolean;
  onEdit: () => void;
}

export const EmailDisplay = ({
  content,
  channelLabel,
  isEmpty,
  onEdit,
}: EmailDisplayProps) => {
  // content가 email template ID인지 확인
  const isTemplateId = content && /^\d+$/.test(content);

  const { data: selectedTemplate } = useQuery({
    queryKey: ["email-template", content],
    queryFn: () => emailTemplatesApi.getEmailTemplateById(parseInt(content!)),
    enabled: !!isTemplateId,
  });

  const displayContent = () => {
    if (isEmpty || !content) {
      return <span className="text-gray-400">미설정</span>;
    }

    if (isTemplateId && selectedTemplate) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">ID: {content}</div>
          <div className="font-medium">
            템플릿: {selectedTemplate.name || "이름 없음"}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            (이메일 템플릿 내용은 ConvertKit에서 관리됩니다)
          </div>
        </div>
      );
    }

    if (isTemplateId) {
      return <span className="text-gray-600">ID: {content}</span>;
    }

    return (
      <div className="max-h-48 max-w-none overflow-y-auto rounded-xl bg-gray-50 p-2 text-sm whitespace-pre-wrap text-gray-600">
        <p>{content}</p>
      </div>
    );
  };

  return (
    <div
      className={`group cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
        isEmpty ? "border-gray-200 bg-gray-50" : "border-gray-300 bg-white"
      }`}
      onClick={onEdit}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <h3 className="font-medium text-gray-900">{channelLabel}</h3>
          <div className="mt-1">{displayContent()}</div>
        </div>
        <Edit3
          size={16}
          className="mt-0.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </div>
  );
};
