import { Edit, PlusCircle } from "lucide-react";
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

  if (isEmpty) {
    return (
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{channelLabel}</h3>
            <p className="text-sm text-gray-400 italic">
              메시지가 설정되지 않았습니다.
            </p>
          </div>
          <button
            onClick={onEdit}
            className="flex-shrink-0 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
          >
            <PlusCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1 pr-4">
        <h3 className="font-medium text-gray-900">{channelLabel}</h3>
        {isBroadcastId ? (
          <div className="mt-1 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              브로드캐스트 ID: {content}
            </p>
            {selectedBroadcast && (
              <div>
                {/* <p className="text-sm text-gray-500">
                  {selectedBroadcast.name} - {selectedBroadcast.subject}
                </p> */}
                <div
                  className="prose prose-sm max-h-48 max-w-none overflow-y-auto rounded-md bg-gray-100 px-3 text-sm text-gray-500 [&_img]:h-auto [&_img]:max-w-full"
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
            )}
          </div>
        ) : (
          <p className="mt-1 text-sm whitespace-pre-wrap text-gray-500">
            {content}
          </p>
        )}
      </div>
      <button
        onClick={onEdit}
        className="flex-shrink-0 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
      >
        <Edit className="h-4 w-4" />
      </button>
    </div>
  );
};
