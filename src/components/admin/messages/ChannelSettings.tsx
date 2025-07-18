import { MessageEditor } from "./MessageEditor";
import { MessageDisplay } from "./MessageDisplay";
import { EmailEditor } from "./EmailEditor";
import { EmailDisplay } from "./EmailDisplay";
import { useMessageSettingsContext } from "./MessageSettingsContext";

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
    <div className="mt-6 relative">
      <div className="space-y-4 relative">
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
            
            // 다른 채널은 기본 MessageEditor 사용
            return (
              <MessageEditor
                key={`${channel}-editing`}
                channelLabel={channelDetails[channel].label}
              />
            );
          }

          // 이메일 채널인 경우 timingKey_email에서 데이터 가져오기
          let content: string | undefined;
          if (channel === "email") {
            const emailTimingKey = `${activeTimingKey}_email` as keyof typeof notificationSettings;
            content = notificationSettings?.[emailTimingKey]?.[channel]?.content;
            
          } else {
            content = notificationSettings?.[activeTimingKey]?.[channel]?.content;
          }
          
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

          // 다른 채널은 기본 MessageDisplay 사용
          return (
            <MessageDisplay
              key={channel}
              content={content}
              channelLabel={channelDetails[channel].label}
              isEmpty={isEmpty}
              onEdit={() =>
                handleOpenEditor(activeTimingKey, channel, isEmpty)
              }
            />
          );
        })}
      </div>
    </div>
  );
};