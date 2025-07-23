import { Edit3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { solapiApi } from "@/utils/solapi";

interface KakaoDisplayProps {
  content?: string;
  channelLabel: string;
  isEmpty: boolean;
  onEdit: () => void;
}

export const KakaoDisplay = ({
  content,
  channelLabel,
  isEmpty,
  onEdit,
}: KakaoDisplayProps) => {
  // content가 템플릿 ID인 경우 템플릿 정보 가져오기
  const { data: template } = useQuery({
    queryKey: ["solapi-template", content],
    queryFn: () => solapiApi.getTemplateById(content!),
    enabled: !!content && content !== "설정되지 않음",
  });

  console.log(template);
  const displayContent = () => {
    if (isEmpty || !content) {
      return <span className="text-gray-400">미설정</span>;
    }

    if (template) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">ID: {template.templateId}</div>
          <div className="font-medium">제목 : {template.name}</div>
          <div className="max-h-48 max-w-none space-y-1 overflow-y-auto rounded-xl bg-gray-50 p-2 text-sm whitespace-pre-wrap text-gray-600">
            <p>{template.emphasizeSubtitle}</p>
            <p className="text-lg font-bold">{template.emphasizeTitle}</p>
            <hr />
            <p>{template.content}</p>
          </div>
        </div>
      );
    }

    // 템플릿을 로드할 수 없는 경우
    return <span className="text-gray-600">템플릿 ID: {content}</span>;
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
