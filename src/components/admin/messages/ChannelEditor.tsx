import { X } from "lucide-react";

interface ChannelEditorProps {
  channelLabel: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export default function ChannelEditor({
  channelLabel,
  value,
  onChange,
  onCancel,
  onSave,
  isLoading,
}: ChannelEditorProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium text-gray-900">{channelLabel}</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
        rows={4}
        placeholder="전송할 메시지 내용을 입력하세요."
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
        >
          <X size={16} />
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
