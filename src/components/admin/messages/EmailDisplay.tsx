import { Edit3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { convertKitApi } from "@/utils/convertkit";

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
  // content가 broadcast ID인지 확인
  const isBroadcastId = content && /^\d+$/.test(content);

  const { data: selectedBroadcast } = useQuery({
    queryKey: ["convertkit-broadcast", content],
    queryFn: () => convertKitApi.getBroadcastById(content!),
    enabled: !!isBroadcastId,
  });

  const displayContent = () => {
    if (isEmpty || !content) {
      return <span className="text-gray-400">미설정</span>;
    }

    if (isBroadcastId && selectedBroadcast) {
      return (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">브로드캐스트 ID: {content}</div>
          <div className="font-medium">제목: {selectedBroadcast.subject || "제목 없음"}</div>
          <div
            className="prose prose-sm max-h-48 max-w-none overflow-y-auto rounded-xl bg-gray-50 p-2 text-sm text-gray-600 [&_img]:h-auto [&_img]:max-w-full"
            dangerouslySetInnerHTML={{
              __html:
                selectedBroadcast.content?.replace(
                  /src="(https?:\/\/[^"]+)"/g,
                  (match, url) => {
                    // 네이버 이미지는 프록시 통해 가져오기
                    if (url.includes("pstatic.net")) {
                      return `src="/api/proxy/image?url=${encodeURIComponent(url)}"`;
                    }
                    return match;
                  },
                ) || "",
            }}
          />
        </div>
      );
    }

    if (isBroadcastId) {
      return <span className="text-gray-600">브로드캐스트 ID: {content}</span>;
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
