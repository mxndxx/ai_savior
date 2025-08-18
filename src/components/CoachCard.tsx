"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { CoachCardProps } from "@/types/coaches";
import Link from "next/link";

export default function CoachCard({ coach, isActive, onClick }: CoachCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative min-w-full cursor-pointer overflow-hidden rounded-[20px]
      border border-white/10 bg-white/[0.02] text-white transition-all duration-700
      xl:w-auto xl:min-w-[184px]
      ${
        isActive
          ? "xl:min-w-[560px] xl:flex-[3] shadow-[0_0_40px_rgba(229,9,20,0.10)]"
          : "xl:w-[184px] xl:flex-[1] opacity-70 xl:opacity-60 hover:opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(149deg,_#192247_0%,_#210e17_96.86%)]" />
      <div className="relative my-6 ml-4 w-[66%] z-10 transition-all duration-700 sm:ml-6 sm:w-[62%] md:ml-8 md:w-[60%] xl:ml-10 xl:w-[56%]">
        <div className="relative w-full aspect-[16/9] rounded-xl ring-1 ring-white/10 bg-black/30 overflow-hidden">
          <Image
            src={coach.profile_image || ""}
            alt={coach.name}
            fill
            sizes="100vw"
            className="pointer-events-none h-full w-full select-none object-cover"
          />
        </div>
      </div>
      <div
        className={`absolute inset-y-0 right-0 z-20 px-6 py-8 md:px-10
        left-[68%] sm:left-[64%] md:left-[62%] xl:left-[58%]
        transition-all duration-700 ${isActive ? "xl:opacity-100" : "xl:opacity-0"}`}
      >
        <div className="flex h-full flex-col gap-6">
          <div className="relative w-fit">
            <h3 className="text-2xl font-semibold">{coach.name}</h3>
            <div className="absolute -bottom-px left-0 h-[3px] w-full rounded bg-gradient-to-r from-[var(--accent)] to-black" />
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white/90">{coach.bio}</h4>
            <ul className="list-inside list-disc text-sm text-white/70">
              {coach.career.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <Link href={`/coach/${coach.id}`} className="group/btn mt-6 inline-flex items-center gap-3 self-end">
            <span className="text-white/90">강사 더 알아보기</span>
            <div
              className={`flex aspect-square size-10 items-center justify-center rounded-full border p-1 transition-all duration-300
              ${
                isActive
                  ? "border-transparent bg-[var(--accent)] group-hover/btn:scale-105"
                  : "border-white/30 bg-white/10 backdrop-blur-sm group-hover/btn:scale-105"
              }`}
            >
              <ArrowDownRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
