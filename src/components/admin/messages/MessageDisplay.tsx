import { Edit3 } from "lucide-react";

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
  const displayContent = () => {
    if (isEmpty || !content) {
      return <span className="text-gray-400">미설정</span>;
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
        isEmpty ? "border-gray-200 bg-[#202020]" : "border-gray-300 bg-[#202020]"
      }`}
      onClick={onEdit}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <h3 className="font-medium text-gray-500">{channelLabel}</h3>
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
