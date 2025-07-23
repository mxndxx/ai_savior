// TODO 컴포넌트 리팩토링 후 절대경로로 통일하기
import { MessageEditor } from "@/components/admin/messages/MessageEditor";
import { MessageDisplay } from "@/components/admin/messages/MessageDisplay";
import { EmailEditor } from "@/components/admin/messages/EmailEditor";
import { EmailDisplay } from "@/components/admin/messages/EmailDisplay";
import { KakaoEditor } from "@/components/admin/messages/KakaoEditor";
import { KakaoDisplay } from "@/components/admin/messages/KakaoDisplay";
import { useMessageSettingsContext } from "@/components/admin/messages/MessageSettingsContext";

export const ChannelSettings = () => {
  const {
    channels,
    channelDetails,
    activeTimingKey,
    editing,
    notificationSettings,
    handleOpenEditor,
    DEFAULT_MESSAGE,
  } = useMessageSettingsContext();
  return (
    <div className="relative mt-6">
      <div className="relative space-y-4">
        {channels.map((channel) => {
          const isEditing =
            editing?.timingKey === activeTimingKey &&
            editing?.channel === channel;

          if (isEditing) {
            // 이메일 채널인 경우 EmailEditor 사용
            if (channel === "email") {
              return (
                <EmailEditor
                  key={`${channel}-editing`}
                  channelLabel={channelDetails[channel].label}
                />
              );
            }

            // 카카오 채널인 경우 KakaoEditor 사용
            if (channel === "kakao") {
              return (
                <KakaoEditor
                  key={`${channel}-editing`}
                  channelLabel={channelDetails[channel].label}
                />
              );
            }

            // 다른 채널은 기본 MessageEditor 사용
            return (
              <MessageEditor
                key={`${channel}-editing`}
                channelLabel={channelDetails[channel].label}
              />
            );
          }

          const content =
            notificationSettings?.[activeTimingKey]?.[channel]?.content;

          const isEmpty = !content || content === DEFAULT_MESSAGE;

          // 이메일 채널인 경우 EmailDisplay 사용
          if (channel === "email") {
            return (
              <EmailDisplay
                key={channel}
                content={content}
                channelLabel={channelDetails[channel].label}
                isEmpty={isEmpty}
                onEdit={() =>
                  handleOpenEditor(activeTimingKey, channel, isEmpty)
                }
              />
            );
          }

          // 카카오 채널인 경우 KakaoDisplay 사용
          if (channel === "kakao") {
            return (
              <KakaoDisplay
                key={channel}
                content={content}
                channelLabel={channelDetails[channel].label}
                isEmpty={isEmpty}
                onEdit={() =>
                  handleOpenEditor(activeTimingKey, channel, isEmpty)
                }
              />
            );
          }

          // 다른 채널은 기본 MessageDisplay 사용
          return (
            <MessageDisplay
              key={channel}
              content={content}
              channelLabel={channelDetails[channel].label}
              isEmpty={isEmpty}
              onEdit={() => handleOpenEditor(activeTimingKey, channel, isEmpty)}
            />
          );
        })}
      </div>
    </div>
  );
};
