"use client";

import { useMessageSettings, type Channel } from "@/hooks/useMessageSettings";
import { convertKitApi, type ConvertKitSequence } from "@/utils/convertkit";
import { Edit, PlusCircle, X, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MessageTabs from "@/components/admin/messages/MessageTabs";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      setIsDropdownOpen(false);
    }
  }, [activeTimingKey]);

  const handleSequenceSelect = (sequence: ConvertKitSequence) => {
    console.log("시퀀스 데이터 : ", sequence);
    setSelectedSequence(sequence);
    setEditText(sequence.id.toString());
    setIsDropdownOpen(false);
  };

  const renderEmailEditor = () => {
    if (editing?.channel !== "email") return null;

    return (
      <div
        key={`${editing.timingKey}-email-editor`}
        className="rounded-lg border p-4"
      >
        <h3 className="mb-3 font-medium text-gray-900">
          {channelDetails.email.label}
        </h3>

        {/* ConvertKit 시퀀스 선택 - 커스텀 드롭다운 */}
        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            ConvertKit 시퀀스 선택
          </label>
          {sequencesLoading ? (
            <div className="text-sm text-gray-500">시퀀스 로딩 중...</div>
          ) : sequencesError ? (
            <div className="text-sm text-red-500">
              시퀀스 로딩 실패:{" "}
              {sequencesError instanceof Error
                ? sequencesError.message
                : "알 수 없는 오류"}
            </div>
          ) : (
            <div className="relative">
              {/* 드롭다운 버튼 */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <span
                  className={
                    selectedSequence ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {selectedSequence
                    ? selectedSequence.name
                    : "시퀀스를 선택하세요"}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* 드롭다운 옵션들 */}
              {isDropdownOpen && (
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
              )}

              {/* 배경 클릭시 드롭다운 닫기 */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </div>
          )}
        </div>

        {/* 선택된 시퀀스 정보 */}
        {selectedSequence && (
          <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 p-3">
            <div className="text-sm text-blue-800">
              <strong>선택된 시퀀스:</strong> {selectedSequence.name}
            </div>
            <div className="mt-1 text-xs text-blue-600">
              ID: {selectedSequence.id} | 생성일:{" "}
              {new Date(selectedSequence.created_at).toLocaleDateString(
                "ko-KR",
              )}
            </div>
          </div>
        )}

        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={handleCancelClick}
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isUpdating || isCreating || !selectedSequence}
            className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isUpdating || isCreating ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    );
  };

  const renderChannelEditor = (channel: Channel) => {
    if (editing?.channel === channel) {
      if (channel === "email") {
        return renderEmailEditor();
      }

      return (
        <div
          key={`${editing.timingKey}-${channel}-editing`}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium text-gray-900">
            {channelDetails[channel].label}
          </h3>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="mt-2 block w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
            rows={4}
            placeholder="전송할 메시지 내용을 입력하세요."
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={handleCancelClick}
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isUpdating || isCreating}
              className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isUpdating || isCreating ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      );
    }

    return null;
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
          <div className="w-1/3 overflow-y-auto border-r border-gray-200">
            <nav className="space-y-1 p-2">
              {lectures.map((lecture) => (
                <button
                  key={lecture.id}
                  onClick={() => setActiveLectureId(lecture.id)}
                  className={`group flex w-full items-center rounded-md p-2 text-sm font-medium ${
                    activeLectureId === lecture.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Image
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    className="mr-3 h-10 w-16 flex-shrink-0 rounded-md object-cover"
                    width={64}
                    height={40}
                  />
                  <span className="line-clamp-2 flex-1 text-left">
                    {lecture.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

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
                          return (
                            <div key={`${activeTimingKey}-${channel}-editor`}>
                              {renderChannelEditor(channel)}
                            </div>
                          );
                        }

                        const content =
                          notificationSettings?.[activeTimingKey]?.[channel]
                            ?.content;
                        const isMessageEmpty =
                          !content || content === DEFAULT_MESSAGE;

                        return (
                          // Display View
                          <div
                            key={channel}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            {isMessageEmpty ? (
                              <div className="flex w-full items-center justify-between">
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {channelDetails[channel].label}
                                  </h3>
                                  <p className="text-sm text-gray-400 italic">
                                    메시지가 설정되지 않았습니다.
                                  </p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleOpenEditor(
                                      activeTimingKey,
                                      channel,
                                      true,
                                    )
                                  }
                                  className="flex-shrink-0 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                                >
                                  <PlusCircle className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex-1 pr-4">
                                  <h3 className="font-medium text-gray-900">
                                    {channelDetails[channel].label}
                                  </h3>
                                  {channel === "email" &&
                                  sequences.length > 0 ? (
                                    // 이메일의 경우 시퀀스 정보 표시
                                    (() => {
                                      const sequence = sequences.find(
                                        (seq) => seq.id.toString() === content,
                                      );
                                      return sequence ? (
                                        <div className="mt-1">
                                          <p className="text-sm font-medium text-gray-700">
                                            {sequence.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            ID: {sequence.id} • 생성일:{" "}
                                            {new Date(
                                              sequence.created_at,
                                            ).toLocaleDateString("ko-KR")}
                                          </p>
                                        </div>
                                      ) : (
                                        <p className="mt-1 text-sm text-gray-500">
                                          시퀀스 ID: {content}
                                        </p>
                                      );
                                    })()
                                  ) : (
                                    // 다른 채널의 경우 기존 방식
                                    <p className="mt-1 text-sm whitespace-pre-wrap text-gray-500">
                                      {content}
                                    </p>
                                  )}
                                </div>

                                <button
                                  onClick={() =>
                                    handleOpenEditor(
                                      activeTimingKey,
                                      channel,
                                      false,
                                    )
                                  }
                                  className="flex-shrink-0 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
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
