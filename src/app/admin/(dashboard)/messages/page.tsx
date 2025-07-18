"use client";

import { useMessageSettings, type Channel } from "@/hooks/useMessageSettings";
import { MessageSettingsProvider } from "@/components/admin/messages/MessageSettingsContext";
import { LectureList } from "@/components/admin/messages/LectureList";
import { SettingsPanel } from "@/components/admin/messages/SettingsPanel";

const channelDetails: Record<Channel, { label: string }> = {
  sms: { label: "문자" },
  kakaotalk: { label: "알림톡" },
  email: { label: "메일" },
};

export default function MessagesPage() {
  const messageSettings = useMessageSettings();

  const [selectedSequence, setSelectedSequence] =
    useState<ConvertKitSequence | null>(null);

  // ConvertKit 시퀀스 목록 가져오기
  const {
    data: sequences = [],
    isLoading: sequencesLoading,
    error: sequencesError,
  } = useQuery({
    queryKey: ["convertkit-sequences"],
    queryFn: convertKitApi.getSequences,
  });

  // 저장된 시퀀스 ID가 있을 때 기본 선택 상태로 설정
  useEffect(() => {
    // 편집 중이 아닐 때만 자동 재설정
    if (
      sequences.length > 0 &&
      notificationSettings &&
      activeTimingKey === "kit_sequence_id" &&
      !editing // 편집 중이 아닐 때만 실행
    ) {
      const savedSequenceId =
        notificationSettings?.kit_sequence_id?.email?.content;

      if (savedSequenceId && savedSequenceId !== DEFAULT_MESSAGE) {
        const matchingSequence = sequences.find(
          (seq) => seq.id.toString() === savedSequenceId,
        );

        if (matchingSequence) {
          setSelectedSequence(matchingSequence);
          setEditText(matchingSequence.id.toString());
        }
      } else {
        // 저장된 시퀀스 ID가 없으면 선택 해제
        setSelectedSequence(null);
        setEditText("");
      }
    }
  }, [
    sequences,
    notificationSettings,
    activeTimingKey,
    editing, // editing 상태 추가
    DEFAULT_MESSAGE,
    setEditText,
    // selectedSequence 제거 - 무한 루프 방지
  ]);

  // 탭이 변경될 때 선택 상태 초기화 (kit_sequence_id가 아닌 경우)
  useEffect(() => {
    if (activeTimingKey !== "kit_sequence_id") {
      setSelectedSequence(null);
    }
  }, [activeTimingKey]);

  const handleSequenceSelect = (sequence: ConvertKitSequence) => {
    console.log("시퀀스 데이터 : ", sequence);
    setSelectedSequence(sequence);
    setEditText(sequence.id.toString());
  };

  return (
    <MessageSettingsProvider
      value={{
        ...messageSettings,
        channels,
        channelDetails,
      }}
    >
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <main className="flex-1 overflow-hidden p-4">
          <h1 className="mb-4 text-2xl font-bold">알림 관리</h1>
          <div
            className="flex overflow-hidden rounded-lg bg-white shadow-sm"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <LectureList />
            <div className="w-2/3 min-w-0 overflow-y-auto">
              <SettingsPanel />
            </div>
          </div>
        </main>
      </div>
    </MessageSettingsProvider>
  );
}
