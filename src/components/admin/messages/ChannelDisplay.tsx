import { Edit, PlusCircle } from "lucide-react";
import { ConvertKitSequence } from "@/utils/convertkit";

interface ChannelDisplayProps {
  channelLabel: string;
  content: string | undefined;
  defaultMessage: string;
  onEdit: () => void;
  isEmail?: boolean;
  sequences?: ConvertKitSequence[];
}

export default function ChannelDisplay({
  channelLabel,
  content,
  defaultMessage,
  onEdit,
  isEmail = false,
  sequences = [],
}: ChannelDisplayProps) {
  const isMessageEmpty = !content || content === defaultMessage;

  if (isMessageEmpty) {
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
        {isEmail && sequences.length > 0 ? (
          <EmailSequenceInfo sequences={sequences} sequenceId={content} />
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
}

function EmailSequenceInfo({
  sequences,
  sequenceId,
}: {
  sequences: ConvertKitSequence[];
  sequenceId: string;
}) {
  const sequence = sequences.find((seq) => seq.id.toString() === sequenceId);

  if (!sequence) {
    return (
      <p className="mt-1 text-sm text-gray-500">시퀀스 ID: {sequenceId}</p>
    );
  }

  return (
    <div className="mt-1">
      <p className="text-sm font-medium text-gray-700">{sequence.name}</p>
      <p className="text-xs text-gray-500">
        ID: {sequence.id} • 생성일:{" "}
        {new Date(sequence.created_at).toLocaleDateString("ko-KR")}
      </p>
    </div>
  );
}
