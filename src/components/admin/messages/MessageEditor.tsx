import { X, Check } from "lucide-react";
import { useMessageSettingsContext } from "./MessageSettingsContext";

interface MessageEditorProps {
  channelLabel: string;
}

export const MessageEditor = ({ channelLabel }: MessageEditorProps) => {
  const {
    editText,
    setEditText,
    handleCancelClick,
    handleSaveClick,
    isUpdating,
    isCreating,
  } = useMessageSettingsContext();

  const isLoading = isUpdating || isCreating;
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-medium text-gray-900">{channelLabel}</h3>
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20 focus:outline-none"
        rows={6}
        placeholder="전송할 메시지 내용을 입력하세요."
      />
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={handleCancelClick}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <X size={16} />
          취소
        </button>
        <button
          onClick={handleSaveClick}
          disabled={isLoading || !editText.trim()}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};
