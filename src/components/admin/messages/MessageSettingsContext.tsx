"use client";

import { createContext, useContext } from "react";
import {
  type Channel,
  type TimingKey,
  type LectureNotificationSettings,
} from "@/hooks/useMessageSettings";
import { type Lecture } from "@/types/lectures";

interface MessageSettingsContextType {
  // Data
  lectures: Lecture[];
  activeLecture: Lecture | undefined;
  activeLectureId: string | null;
  notificationSettings: LectureNotificationSettings | null | undefined;
  activeTimingKey: TimingKey;
  channels: Channel[];
  channelDetails: Record<Channel, { label: string }>;
  DEFAULT_MESSAGE: string;

  // Editor State
  editing: { timingKey: TimingKey; channel: Channel; isNew: boolean } | null;
  editText: string;
  isCreating: boolean;
  isUpdating: boolean;

  // Actions
  setActiveLectureId: (id: string) => void;
  setActiveTimingKey: (key: TimingKey) => void;
  setEditText: (text: string) => void;
  handleOpenEditor: (
    timingKey: TimingKey,
    channel: Channel,
    isCreating: boolean,
  ) => void;
  handleCancelClick: () => void;
  handleSaveClick: () => void;
  handleEmailSaveClick: () => void;
}

const MessageSettingsContext = createContext<MessageSettingsContextType | null>(
  null,
);

export const useMessageSettingsContext = () => {
  const context = useContext(MessageSettingsContext);
  if (!context) {
    throw new Error(
      "useMessageSettingsContext must be used within MessageSettingsProvider",
    );
  }
  return context;
};

interface MessageSettingsProviderProps {
  children: React.ReactNode;
  value: MessageSettingsContextType;
}

export const MessageSettingsProvider = ({
  children,
  value,
}: MessageSettingsProviderProps) => {
  return (
    <MessageSettingsContext.Provider value={value}>
      {children}
    </MessageSettingsContext.Provider>
  );
};
