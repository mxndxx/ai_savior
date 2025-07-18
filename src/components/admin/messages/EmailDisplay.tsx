import { Edit, PlusCircle } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const { data } = useInfiniteQuery({
    queryKey: ["convertkit-broadcasts"],
    queryFn: ({ pageParam }) => convertKitApi.getBroadcasts(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  
  const broadcasts = data?.pages.flatMap(page => page.broadcasts) ?? [];

  // content가 broadcast ID 형식인지 확인
  const broadcastMatch = content?.match(/^broadcast:(\d+)$/);
  const selectedBroadcast = broadcastMatch 
    ? broadcasts.find(b => b.id === parseInt(broadcastMatch[1]))
    : null;

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
        {selectedBroadcast ? (
          <div className="mt-1">
            <p className="text-sm font-medium text-gray-700">
              ConvertKit 브로드캐스트: {selectedBroadcast.name}
            </p>
            <p className="text-sm text-gray-500">
              제목: {selectedBroadcast.subject}
            </p>
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