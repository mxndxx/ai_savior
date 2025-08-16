"use client";

import LectureImage from "@/components/LectureImage";

const proxied = (url: string) =>
  `/api/proxy/image?url=${encodeURIComponent(url)}`;

type Story = { src: string; title?: string };

export default function SuccessStories() {
  const items: Story[] = [
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfMjE2/MDAxNjk3NzkwOTEzMDMx.swlRTIIkjUZ0eAIqLBrSjZts9zGTEcQ639u91jmwVdIg.Kc_POTQ3Dq0jZXyV_KqxqGHjbQOq2Uu7XPvriIfqvm0g.PNG/%EC%A0%9C%EB%AA%A9%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001_%2865%29.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfNjcg/MDAxNjk3NzkyNzMxNDAx.zc3HKvqx8cQEk5UmqjjjMSqcZjijbX_vi1mkbAUThPQg.NUL6XKY7IDZn800_aLe__aX68O97v2NZImj-3M7_9LEg.PNG/003.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfMTM2/MDAxNjk3NzkyNzMxNzky.WtxvQ80UHb5Di56MQuLlbzaHqZAStFOWYLfGDY96ZJcg.dqN5WYx8MMUcMPrIBCPlzI5R6Pw_MXvTrsZNsoP3pFIg.PNG/004.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEyMTJfMjQ3/MDAxNzAyMzM0NDQzOTQ5.37XQa4TsmjX--cVkyqf9i7mnEGBOZqjObmwpUAyKppMg.PX2aHCeRniUyUGiKH76enMVQHdy7lcFdQ8gQQxu9V6Eg.PNG/%EC%A0%9C%EB%AA%A9%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-005.png?type=w1080" },
  ];

  return (
    <section className="py-10 md:py-[100px]">
      <div className="w-full space-y-6 md:space-y-10 lg:space-y-12">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border-2 border-purple-600 px-4 py-1 text-sm font-semibold text-purple-600 md:text-[20px]">
              Success Stories
            </span>
            <h2 className="text-3xl leading-[1.2] font-semibold whitespace-pre-line md:text-4xl lg:text-5xl">
              Success Stories
            </h2>
          </div>
        </div>

        {/* GRID: 2 colonnes en mobile, 4 colonnes (même niveau) dès md */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <li key={i}>
              {/* Wrapper contrôlé par nous → pas de w-full sur <img/> */}
              <LectureImage
                src={proxied(it.src)}
                alt={it.title || `Success story ${i + 1}`}
                fill
                className="aspect-[16/9] rounded-4xl"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
