"use client";

import { useMessageSettings, type Channel } from "@/hooks/useMessageSettings";
import { convertKitApi, type ConvertKitSequence } from "@/utils/convertkit";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MessageTabs from "@/components/admin/messages/MessageTabs";
import LectureList from "@/components/admin/messages/LectureList";
import ChannelDisplay from "@/components/admin/messages/ChannelDisplay";
import ChannelEditor from "@/components/admin/messages/ChannelEditor";
import EmailEditor from "@/components/admin/messages/EmailEditor";

const channelDetails: Record<Channel, { label: string }> = {
  sms: { label: "문자" },
  kakaotalk: { label: "알림톡" },
  email: { label: "메일" },
};

export default function MessagesPage() {
  const {
    lectures,
    activeLectureId,
    setActiveLectureId,
    activeTimingKey,
    setActiveTimingKey,
    editing,
    editText,
    setEditText,
    notificationSettings,
    activeLecture,
    handleOpenEditor,
    handleCancelClick,
    handleSaveClick,
    isCreating,
    isUpdating,
    DEFAULT_MESSAGE,
  } = useMessageSettings();

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
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-4">
        <h1 className="mb-4 text-2xl font-bold">알림 관리</h1>
        <div
          className="flex rounded-lg bg-white shadow-sm"
          style={{ height: "calc(100vh - 120px)" }}
        >
          {/* Lecture List as Tabs */}
          <LectureList
            lectures={lectures}
            activeLectureId={activeLectureId}
            onLectureSelect={setActiveLectureId}
          />

          {/* Settings Panel */}
          <div className="w-2/3 overflow-y-auto">
            {activeLecture && activeLectureId && notificationSettings ? (
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  &quot;{activeLecture.title}&quot; 알림 설정
                </h2>

                {/* 타이밍 탭 - 분리된 컴포넌트 사용 */}
                <MessageTabs
                  activeTimingKey={activeTimingKey}
                  setActiveTimingKey={setActiveTimingKey}
                />

                {/* Settings for active tab */}
                <div className="mt-6">
                  <div className="space-y-4">
                    {(() => {
                      // activeTimingKey에 따라 보여줄 채널 결정
                      const channelsToShow =
                        activeTimingKey === "kit_sequence_id"
                          ? (["email"] as Channel[])
                          : (["sms", "kakaotalk"] as Channel[]);

                      return channelsToShow.map((channel) => {
                        const isEditing =
                          editing?.timingKey === activeTimingKey &&
                          editing?.channel === channel;

                        if (isEditing) {
                          if (channel === "email") {
                            return (
                              <EmailEditor
                                key={`${activeTimingKey}-email-editor`}
                                selectedSequence={selectedSequence}
                                onSequenceSelect={handleSequenceSelect}
                                onCancel={handleCancelClick}
                                onSave={handleSaveClick}
                                isLoading={isUpdating || isCreating}
                                sequences={sequences}
                                sequencesLoading={sequencesLoading}
                                sequencesError={sequencesError}
                              />
                            );
                          }
                          return (
                            <ChannelEditor
                              key={`${activeTimingKey}-${channel}-editing`}
                              channelLabel={channelDetails[channel].label}
                              value={editText}
                              onChange={setEditText}
                              onCancel={handleCancelClick}
                              onSave={handleSaveClick}
                              isLoading={isUpdating || isCreating}
                            />
                          );
                        }

                        const content =
                          notificationSettings?.[activeTimingKey]?.[channel]
                            ?.content;

                        return (
                          <ChannelDisplay
                            key={channel}
                            channelLabel={channelDetails[channel].label}
                            content={content}
                            defaultMessage={DEFAULT_MESSAGE}
                            onEdit={() =>
                              handleOpenEditor(
                                activeTimingKey,
                                channel,
                                !content || content === DEFAULT_MESSAGE,
                              )
                            }
                            isEmail={channel === "email"}
                            sequences={sequences}
                          />
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">
                  왼쪽에서 강의를 선택하여 알림 설정을 확인하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
