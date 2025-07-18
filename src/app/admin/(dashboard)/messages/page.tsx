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

const channels: Channel[] = ["sms", "kakaotalk", "email"];

export default function MessagesPage() {
  const messageSettings = useMessageSettings();

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
