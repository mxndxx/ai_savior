"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lecturesApi } from "@/app/api/lectures";
import { messagesApi } from "@/app/api/messages";
import { type LectureWithCoach } from "@/types/lectures";

const DEFAULT_MESSAGE = "설정된 메시지가 없습니다.";

export type TimingKey = "immediate" | "after_6" | "before_24" | "before_8" | "before_1" | "start";

export const timings: Array<{ key: TimingKey; label: string }> = [
  { key: "immediate", label: "신청 즉시" },
  { key: "after_6", label: "신청 6시간 후" },
  { key: "before_24", label: "강의 24시간 전" },
  { key: "before_8", label: "강의 8시간 전" },
  { key: "before_1", label: "강의 1시간 전" },
  { key: "start", label: "강의 시작" },
];

interface NotificationChannelSetting {
  content: string;
}

export type Channel = "sms" | "kakaotalk" | "email";

interface NotificationTimingSetting {
  sms: NotificationChannelSetting;
  kakaotalk: NotificationChannelSetting;
  email: NotificationChannelSetting;
}

export interface LectureNotificationSettings {
  [timingKey: string]: NotificationTimingSetting;
}

const transformMessagesToSettings = (
  messages: any[],
): LectureNotificationSettings => {
  const newSettings: Partial<LectureNotificationSettings> = {};

  timings.forEach((timing) => {
    newSettings[timing.key] = {
      sms: { content: DEFAULT_MESSAGE },
      kakaotalk: { content: DEFAULT_MESSAGE },
      email: { content: DEFAULT_MESSAGE },
    };
  });

  if (messages && messages.length > 0) {
    const messageData = messages[0];

    timings.forEach(({ key }) => {
      if (messageData[key] && newSettings[key]) {
        const content = messageData[key];
        const setting = newSettings[key] as NotificationTimingSetting;
        setting.sms.content = content;
      }
    });
  }

  return newSettings as LectureNotificationSettings;
};

export const useMessageSettings = () => {
  const queryClient = useQueryClient();
  const [activeLectureId, setActiveLectureId] = useState<string | null>(null);
  const [activeTimingKey, setActiveTimingKey] = useState<TimingKey>(
    timings[0].key,
  );
  const [editing, setEditing] = useState<{
    timingKey: TimingKey;
    channel: Channel;
    isNew: boolean;
  } | null>(null);
  const [editText, setEditText] = useState("");

  const { data: lectures = [] } = useQuery<LectureWithCoach[]>({
    queryKey: ["lectures"],
    queryFn: lecturesApi.getLectures,
  });

  useEffect(() => {
    if (lectures.length > 0 && !activeLectureId) {
      setActiveLectureId(lectures[0].id);
    }
  }, [lectures, activeLectureId]);

  const { data: notificationSettings } = useQuery({
    queryKey: ["messages", activeLectureId],
    queryFn: async () => {
      if (!activeLectureId) return null;
      const messages =
        await messagesApi.getMessagesByLectureId(activeLectureId);
      return transformMessagesToSettings(messages);
    },
    enabled: !!activeLectureId,
  });

  const createMessageMutation = useMutation({
    mutationFn: ({
      lectureId,
      timingKey,
      content,
    }: {
      lectureId: string;
      timingKey: string;
      content: string;
    }) => messagesApi.createMessage(lectureId, timingKey, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.lectureId],
      });
      setEditing(null);
      setEditText("");
    },
    onError: (error) => {
      console.error("메시지 생성에 실패했습니다:", error);
      alert("메시지 생성에 실패했습니다.");
    },
  });

  const updateMessageMutation = useMutation({
    mutationFn: ({
      lectureId,
      timingKey,
      content,
    }: {
      lectureId: string;
      timingKey: string;
      content: string;
    }) => messagesApi.updateMessage(lectureId, timingKey, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.lectureId],
      });
      setEditing(null);
      setEditText("");
    },
    onError: (error) => {
      console.error("메시지 저장에 실패했습니다:", error);
      alert("메시지 업데이트에 실패했습니다.");
    },
  });

  useEffect(() => {
    if (activeLectureId) {
      setActiveTimingKey(timings[0].key);
    }
  }, [activeLectureId]);

  const activeLecture = lectures.find(
    (lecture) => lecture.id === activeLectureId,
  );

  const handleOpenEditor = (
    timingKey: TimingKey,
    channel: Channel,
    isNew: boolean,
  ) => {
    if (!activeLectureId) return;
    setEditing({ timingKey, channel, isNew });

    if (isNew) {
      setEditText("");
    } else {
      if (!notificationSettings) return;
      const content = notificationSettings[timingKey]?.[channel]?.content;
      setEditText(content === DEFAULT_MESSAGE ? "" : (content ?? ""));
    }
  };

  const handleCancelClick = () => {
    setEditing(null);
    setEditText("");
  };

  const handleSaveClick = async () => {
    if (!editing || !activeLectureId) return;
    const { timingKey, isNew } = editing;

    const mutation = isNew ? createMessageMutation : updateMessageMutation;

    mutation.mutate({
      lectureId: activeLectureId,
      timingKey,
      content: editText,
    });
  };

  return {
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
    isCreating: createMessageMutation.isPending,
    isUpdating: updateMessageMutation.isPending,
    DEFAULT_MESSAGE,
  };
};
