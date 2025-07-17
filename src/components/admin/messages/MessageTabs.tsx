"use client";

import { timings } from "@/hooks/useMessageSettings";

interface MessageTabsProps {
  activeTimingKey: string;
  setActiveTimingKey: (key: string) => void;
}

export default function MessageTabs({
  activeTimingKey,
  setActiveTimingKey,
}: MessageTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {timings.map((timing) => (
          <button
            key={timing.key}
            onClick={() => setActiveTimingKey(timing.key)}
            className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${
              activeTimingKey === timing.key
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {timing.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
