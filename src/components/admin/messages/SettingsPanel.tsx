import { TimingTabs } from "./TimingTabs";
import { ChannelSettings } from "./ChannelSettings";
import { useMessageSettingsContext } from "./MessageSettingsContext";

export const SettingsPanel = () => {
  const { activeLecture, activeLectureId, notificationSettings } = useMessageSettingsContext();
  if (!activeLecture || !activeLectureId || !notificationSettings) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">
          왼쪽에서 강의를 선택하여 알림 설정을 확인하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-white truncate">
        &quot;{activeLecture.title}&quot; 알림 설정
      </h2>

      <TimingTabs />
      <ChannelSettings />
    </div>
  );
};