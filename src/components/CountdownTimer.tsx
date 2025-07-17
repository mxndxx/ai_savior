"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 1);
      targetDate.setHours(0, 0, 0, 0);

      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="mb-8 text-center">
        <p className="mb-4 text-gray-400">무료 시크릿 특강 신청 마감까지</p>
        <div className="flex items-center justify-center gap-4 text-4xl font-bold">
          <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
            <span className="animate-pulse-slow text-blue-500">--</span>
            <p className="mt-1 text-sm text-gray-400">시간</p>
          </div>
          <span className="animate-pulse-slow text-2xl">:</span>
          <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
            <span className="animate-pulse-slow text-blue-500">--</span>
            <p className="mt-1 text-sm text-gray-400">분</p>
          </div>
          <span className="animate-pulse-slow text-2xl">:</span>
          <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
            <span className="animate-pulse-slow text-blue-500">--</span>
            <p className="mt-1 text-sm text-gray-400">초</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 text-center">
      <p className="mb-4 text-gray-400">무료 시크릿 특강 신청 마감까지</p>
      <div className="flex items-center justify-center gap-4 text-4xl font-bold">
        <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
          <span className="animate-pulse-slow text-blue-500">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <p className="mt-1 text-sm text-gray-400">시간</p>
        </div>
        <span className="animate-pulse-slow text-2xl">:</span>
        <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
          <span className="animate-pulse-slow text-blue-500">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <p className="mt-1 text-sm text-gray-400">분</p>
        </div>
        <span className="animate-pulse-slow text-2xl">:</span>
        <div className="min-w-[80px] rounded-lg bg-gray-900 p-4 transition-all hover:bg-gray-800">
          <span className="animate-pulse-slow text-blue-500">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <p className="mt-1 text-sm text-gray-400">초</p>
        </div>
      </div>
    </div>
  );
}
