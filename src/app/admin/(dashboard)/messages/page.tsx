"use client";

import {
  useMessageSettings,
  timings,
  type Channel,
} from "@/hooks/useMessageSettings";
import { Edit, PlusCircle, X } from "lucide-react";
import Image from "next/image";

const channelDetails: Record<Channel, { label: string }> = {
  sms: { label: "문자" },
  kakaotalk: { label: "알림톡" },
  email: { label: "메일" },
};

const channels: Channel[] = ["sms", "kakaotalk", "email"];

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

                {/* Timing Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {timings.map((timing) => (
                      <button
                        key={timing.key}
                        onClick={() => setActiveTimingKey(timing.key)}
                        className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${
                          activeTimingKey === timing.key
                            ? "border-black text-black"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {timing.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Settings for active tab */}
                <div className="mt-6">
                  <div className="space-y-4">
                    {channels.map((channel) => {
                      if (
                        editing?.timingKey === activeTimingKey &&
                        editing?.channel === channel
                      ) {
                        return (
                          // Editing View
                          <div
                            key={`${channel}-editing`}
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
                                {isUpdating || isCreating
                                  ? "저장 중..."
                                  : "저장"}
                              </button>
                            </div>
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
                                <p className="mt-1 text-sm whitespace-pre-wrap text-gray-500">
                                  {content}
                                </p>
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
                    })}
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
