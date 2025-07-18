import { Edit, PlusCircle } from "lucide-react";

interface MessageDisplayProps {
  content: string | undefined;
  channelLabel: string;
  isEmpty: boolean;
  onEdit: () => void;
}

export const MessageDisplay = ({
  content,
  channelLabel,
  isEmpty,
  onEdit,
}: MessageDisplayProps) => {
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
        <div className="mt-1 max-h-24 overflow-y-auto rounded-md bg-gray-100 p-3 text-sm text-gray-500">
          <p className="text-sm whitespace-pre-wrap text-gray-500">{content}</p>
        </div>
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
