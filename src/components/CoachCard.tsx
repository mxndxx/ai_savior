"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { CoachCardProps } from "@/types/coaches";
import Link from "next/link";

export default function CoachCard({
  coach,
  isActive,
  onClick,
}: CoachCardProps) {
  return (
    <div
      className={`relative h-[412px] min-w-full cursor-pointer overflow-hidden rounded-[20px] bg-neutral-900 text-white saturate-100 transition-all duration-800 xl:w-auto xl:min-w-[184px] ${
        isActive
          ? "xl:min-w-[500px] xl:flex-[3] xl:saturate-100"
          : "xl:w-[184px] xl:flex-[1] xl:saturate-[0.1]"
      }`}
      onClick={onClick}
    >
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[50%] w-full bg-gradient-to-b from-transparent to-violet-400/40" />

      {/* Mentor Image */}
      <div
        className={`absolute top-10 aspect-[3/4] w-[312px] transition-all duration-800 ${isActive ? "-left-16 md:-left-5" : "-left-16"} `}
      >
        <div className="relative size-full">
          <Image
            src={coach.profile_image || ""}
            alt={coach.name}
            fill
            className="pointer-events-none h-full object-cover select-none"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`absolute inset-y-0 right-0 left-[40%] p-10 opacity-100 transition-all duration-800 md:left-[50%] xl:right-auto xl:left-[40%] ${
          isActive ? "xl:opacity-100" : "xl:opacity-0"
        } `}
      >
        <div className="flex flex-col items-start gap-3">
          {/* Name with underline */}
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold">{coach.name}</h3>
            <div className="absolute -bottom-px left-0 -z-10 h-3 w-full bg-violet-700" />
          </div>

          {/* Specialty and Achievements */}
          <h4 className="font-semibold">{coach.bio}</h4>
          <div className="space-y-2 text-sm">
            <ul className="list-inside list-disc">
              {coach.career.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Learn More Button */}
      <div
        className={`absolute bottom-12 left-[40%] whitespace-nowrap transition-all duration-800 ${
          isActive ? "xl:left-[60%]" : "xl:left-5"
        } `}
      >
        <Link href={`/coach/${coach.id}`} className="flex items-center gap-3">
          <span
            className={`w-[100px] opacity-100 transition-all duration-800 ${
              isActive ? "xl:opacity-100" : "xl:w-0 xl:opacity-0"
            } `}
          >
            강사 더 알아보기
          </span>
          <div
            className={`flex aspect-square size-10 items-center justify-center rounded-full border stroke-1 p-1 transition-all duration-800 ${
              isActive
                ? "rotate-[270deg] border-slate-700 bg-slate-700"
                : "border-white bg-transparent"
            } `}
          >
            <ArrowDownRight className="h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
