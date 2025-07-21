"use client";

import Image from "next/image";

interface LectureImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function LectureImage({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
}: LectureImageProps) {
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <Image
        src={src}
        alt={alt}
        width={width || 480}
        height={height || 400}
        className={`mx-auto block rounded-4xl object-cover ${className}`.trim()}
        style={{ aspectRatio: "16/9", maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
