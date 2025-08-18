"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { CoachCardProps } from "@/types/coaches";
import Link from "next/link";

export default function CoachCard({ coach, isActive, onClick }: CoachCardProps) {
  return (
    <div
      className={`group relative h-[412px] min-w-full cursor-pointer overflow-hidden rounded-[20px]
      border border-white/10 bg-white/[0.02] text-white transition-all duration-700
      xl:w-auto xl:min-w-[184px]
      ${isActive
        ? "xl:min-w-[500px] xl:flex-[3] shadow-[0_0_40px_rgba(229,9,20,0.10)]"
        : "xl:w-[184px] xl:flex-[1] opacity-70 xl:opacity-60 hover:opacity-100"}`
      }
      onClick={onClick}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.35)_45%,rgba(229,9,20,0.15))]" />

      {/* Mentor Image */}
      <div className="absolute inset-y-6 left-4 w-[60%] transition-all duration-700 sm:left-6 sm:w-[56%] md:left-8 md:w-[54%] xl:left-10 xl:w-[50%]">
        <div className="relative size-full rounded-xl ring-1 ring-white/10 bg-black/30 overflow-hidden">
          <Image
            src={coach.profile_image || ""}
            alt={coach.name}
            fill
            sizes="100vw"
            className="pointer-events-none h-full w-full select-none object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`absolute inset-y-0 right-0 z-20 px-6 py-8 md:px-10
        left-[62%] sm:left-[60%] md:left-[58%] xl:left-[54%]
        transition-all duration-700 ${isActive ? "xl:opacity-100" : "xl:opacity-0"}`}
      >
        <div className="flex h-full flex-col gap-6">
          <div className="relative w-fit">
            <h3 className="text-2xl font-semibold">{coach.name}</h3>
            <div className="absolute -bottom-px left-0 h-[3px] w-full rounded
                bg-gradient-to-r from-[var(--accent)] to-black" />
          </div>

          {/* Specialty and Achievements */}
          <div className="space-y-3 flex-1">
            <h4 className="font-semibold text-white/90">{coach.bio}</h4>
            <ul className="list-inside list-disc text-sm text-white/70">
              {coach.career.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>

          {/* Learn More Button */}
          <Link href={`/coach/${coach.id}`} className="group/btn inline-flex items-center gap-3 self-end mt-6">
            <span className="text-white/90">강사 더 알아보기</span>
            <div
              className={`flex aspect-square size-10 items-center justify-center rounded-full border p-1 transition-all duration-300
              ${isActive
                ? "border-transparent bg-[var(--accent)] group-hover/btn:scale-105"
                : "border-white/30 bg-white/10 backdrop-blur-sm group-hover/btn:scale-105"}`}
            >
              <ArrowDownRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
