"use client";

import { useCountdownTimer } from "@/hooks/useCountdownTimer";

interface CountdownTimerProps {
  deadline: string | null;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const timeLeft = useCountdownTimer(deadline);
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const TimeBox = ({ v }: { v: number }) => (
    <span
      className="inline-block min-w-[2.4ch] rounded-md bg-white/10 px-2 py-1 text-center font-mono leading-none tracking-wider text-white md:text-3xl text-2xl"
    >
      {formatNumber(v)}
    </span>
  );

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#141414] p-4 md:p-6 text-center text-white shadow-sm"
      aria-live="polite"
    >
      <p className="mb-3 text-sm font-bold text-white/80 md:text-base">
        무료 강의 시작까지 남은 시간
      </p>

      <div className="flex flex-row items-center justify-center gap-2 md:block">
        {/* Days */}
        <div className="md:mb-1">
          <TimeBox v={timeLeft.days} />
          <span className="ml-2 align-middle text-base text-white/70 md:text-xl">
            일
          </span>
          <span className="mx-2 align-middle text-white/40 md:hidden">:</span>
        </div>

        {/* HH:MM:SS */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <TimeBox v={timeLeft.hours} />
          <span className="text-white/40">:</span>
          <TimeBox v={timeLeft.minutes} />
          <span className="text-white/40">:</span>
          <TimeBox v={timeLeft.seconds} />
        </div>
      </div>

      <p className="mt-3 text-sm text-white/70">선착순 모집! 곧 마감됩니다</p>
    </div>
  );
}
