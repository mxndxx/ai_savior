"use client";

import { useCountdownTimer } from "@/hooks/useCountdownTimer";

interface CountdownTimerProps {
  deadline: string | null;
  variant?: "desktop" | "mobile";
}

export function CountdownTimer({ deadline, variant = "desktop" }: CountdownTimerProps) {
  const timeLeft = useCountdownTimer(deadline);

  if (variant === "mobile") {
    return (
      <div className="flex flex-row items-center justify-center gap-2 rounded-[10px] bg-[#F3F4F6] p-2 w-full flex-wrap md:p-4">
        <div className="hidden text-[20px] font-bold md:block">
          무료강의 시작까지 남은 시간
        </div>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 flex-nowrap">
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.days).padStart(2, "0")[0]}
            </span>
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.days).padStart(2, "0")[1]}
            </span>
            <span className="text-sm font-bold text-gray-500 md:text-lg">
              일
            </span>
          </span>
          <span className="font-bold text-violet-600 md:text-[32px]"> : </span>
          <span className="flex items-center gap-1 flex-nowrap">
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.hours).padStart(2, "0")[0]}
            </span>
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.hours).padStart(2, "0")[1]}
            </span>
            <span className="text-sm font-bold text-gray-500 md:text-lg">
              시
            </span>
          </span>
          <span className="font-bold text-violet-600 md:text-[32px]"> : </span>
          <span className="flex items-center gap-1 flex-nowrap">
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.minutes).padStart(2, "0")[0]}
            </span>
            <span className="aspect-square size-8 flex shrink-0 items-center justify-center rounded-sm bg-white p-1 text-violet-600 font-bold md:size-10 md:rounded-md md:text-2xl">
              {String(timeLeft.minutes).padStart(2, "0")[1]}
            </span>
            <span className="text-sm font-bold text-gray-500 md:text-lg">
              분
            </span>
          </span>
        </div>
        <div className="text-sm">선착순 모집! 공 마감됩니다</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-100 p-6 text-center">
      <p className="mb-2 text-gray-600">강의 시작까지 남은 시간</p>
      <div className="mb-1 font-bold">
        <p className="inline-block rounded-lg bg-white p-1 text-3xl text-violet-600">
          {String(timeLeft.days).padStart(2, "0")}
        </p>
        일
      </div>
      <div className="flex items-center justify-center gap-1 text-3xl font-bold">
        <p className="inline-block rounded-lg bg-white p-1 text-violet-600">
          {String(timeLeft.hours).padStart(2, "0")}
        </p>
        :{" "}
        <p className="inline-block rounded-lg bg-white p-1 text-violet-600">
          {String(timeLeft.minutes).padStart(2, "0")}
        </p>
        :{" "}
        <p className="inline-block rounded-lg bg-white p-1 text-violet-600">
          {String(timeLeft.seconds).padStart(2, "0")}
        </p>
      </div>
      <p className="mt-2 text-sm">선착순 모집! 곱 마감됩니다</p>
    </div>
  );
}