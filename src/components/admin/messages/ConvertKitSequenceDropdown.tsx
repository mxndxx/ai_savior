import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ConvertKitSequence } from "@/utils/convertkit";

interface ConvertKitSequenceDropdownProps {
  sequences: ConvertKitSequence[];
  selectedSequence: ConvertKitSequence | null;
  onSequenceSelect: (sequence: ConvertKitSequence) => void;
  sequencesLoading: boolean;
  sequencesError: unknown;
}

export default function ConvertKitSequenceDropdown({
  sequences,
  selectedSequence,
  onSequenceSelect,
  sequencesLoading,
  sequencesError,
}: ConvertKitSequenceDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSequenceSelect = (sequence: ConvertKitSequence) => {
    onSequenceSelect(sequence);
    setIsDropdownOpen(false);
  };

  if (sequencesLoading) {
    return (
      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          ConvertKit 시퀀스 선택
        </label>
        <div className="text-sm text-gray-500">시퀀스 로딩 중...</div>
      </div>
    );
  }

  if (sequencesError) {
    return (
      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          ConvertKit 시퀀스 선택
        </label>
        <div className="text-sm text-red-500">
          시퀀스 로딩 실패:{" "}
          {sequencesError instanceof Error
            ? sequencesError.message
            : "알 수 없는 오류"}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        ConvertKit 시퀀스 선택
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        >
          <span
            className={selectedSequence ? "text-gray-900" : "text-gray-500"}
          >
            {selectedSequence ? selectedSequence.name : "시퀀스를 선택하세요"}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <>
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {sequences.map((sequence) => (
                <button
                  key={sequence.id}
                  type="button"
                  onClick={() => handleSequenceSelect(sequence)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-900 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="font-medium">{sequence.name}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      ID: {sequence.id} •{" "}
                      {new Date(sequence.created_at).toLocaleDateString(
                        "ko-KR",
                      )}
                    </div>
                  </div>
                  {selectedSequence?.id === sequence.id && (
                    <Check className="ml-2 h-4 w-4 flex-shrink-0 text-blue-600" />
                  )}
                </button>
              ))}
            </div>

            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsDropdownOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
