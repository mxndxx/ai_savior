"use client";

import { useCountdownTimer } from "@/hooks/useCountdownTimer";

interface CountdownTimerProps {
  deadline: string | null;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const timeLeft = useCountdownTimer(deadline);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="rounded-lg bg-gray-100 p-4 text-center md:p-6">
      <p className="mb-2 text-sm font-bold text-black md:text-base">
        무료 강의 시작까지 남은 시간
      </p>

      <div className="flex flex-row items-center justify-center gap-1 text-xl font-bold md:block md:text-2xl">
        <div className="md:mb-1 md:text-3xl">
          <span className="inline-block rounded-lg bg-white p-1 text-violet-600">
            {formatNumber(timeLeft.days)}
          </span>
          <span className="ml-1 text-base md:text-xl">일</span>
          <span className="mx-1 text-violet-600 md:hidden">:</span>
        </div>
        <div className="flex items-center gap-1 md:justify-center md:text-3xl">
          <span className="inline-block rounded-lg bg-white p-1 text-violet-600">
            {formatNumber(timeLeft.hours)}
          </span>
          <span>:</span>
          <span className="inline-block rounded-lg bg-white p-1 text-violet-600">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span>:</span>
          <span className="inline-block rounded-lg bg-white p-1 text-violet-600">
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
      </div>

      <p className="mt-2 text-sm">선착순 모집! 곧 마감됩니다</p>
    </div>
  );
}
