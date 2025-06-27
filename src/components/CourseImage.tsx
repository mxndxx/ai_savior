"use client";

import Image from "next/image";

interface CourseImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function CourseImage({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
}: CourseImageProps) {
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
    <div className="w-full flex justify-center">
      <Image
        src={src}
        alt={alt}
        width={width || 480}
        height={height || 400}
        className={`object-contain rounded-4xl ${className}`.trim()}
      />
    </div>
  );
}
