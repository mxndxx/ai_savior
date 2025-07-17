import { X } from "lucide-react";
import { ConvertKitSequence } from "@/utils/convertkit";
import ConvertKitSequenceDropdown from "./ConvertKitSequenceDropdown";

interface EmailEditorProps {
  selectedSequence: ConvertKitSequence | null;
  onSequenceSelect: (sequence: ConvertKitSequence) => void;
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
  sequences: ConvertKitSequence[];
  sequencesLoading: boolean;
  sequencesError: unknown;
}

export default function EmailEditor({
  selectedSequence,
  onSequenceSelect,
  onCancel,
  onSave,
  isLoading,
  sequences,
  sequencesLoading,
  sequencesError,
}: EmailEditorProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-3 font-medium text-gray-900">메일</h3>

      <ConvertKitSequenceDropdown
        sequences={sequences}
        selectedSequence={selectedSequence}
        onSequenceSelect={onSequenceSelect}
        sequencesLoading={sequencesLoading}
        sequencesError={sequencesError}
      />

      {selectedSequence && (
        <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 p-3">
          <div className="text-sm text-blue-800">
            <strong>선택된 시퀀스:</strong> {selectedSequence.name}
          </div>
          <div className="mt-1 text-xs text-blue-600">
            ID: {selectedSequence.id} | 생성일:{" "}
            {new Date(selectedSequence.created_at).toLocaleDateString("ko-KR")}
          </div>
        </div>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
        >
          <X size={16} />
        </button>
        <button
          onClick={onSave}
          disabled={isLoading || !selectedSequence}
          className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
