"use client";

import LectureImage from "@/components/LectureImage";

const proxied = (url: string) => `/api/proxy/image?url=${encodeURIComponent(url)}`;

type Story = { src: string; title?: string };

export default function SuccessStories() {
  const items: Story[] = [
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfMjE2/MDAxNjk3NzkwOTEzMDMx.swlRTIIkjUZ0eAIqLBrSjZts9zGTEcQ639u91jmwVdIg.Kc_POTQ3Dq0jZXyV_KqxqGHjbQOq2Uu7XPvriIfqvm0g.PNG/%EC%A0%9C%EB%AA%A9%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-001_%2865%29.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfNjcg/MDAxNjk3NzkyNzMxNDAx.zc3HKvqx8cQEk5UmqjjjMSqcZjijbX_vi1mkbAUThPQg.NUL6XKY7IDZn800_aLe__aX68O97v2NZImj-3M7_9LEg.PNG/003.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEwMjBfMTM2/MDAxNjk3NzkyNzMxNzky.WtxvQ80UHb5Di56MQuLlbzaHqZAStFOWYLfGDY96ZJcg.dqN5WYx8MMUcMPrIBCPlzI5R6Pw_MXvTrsZNsoP3pFIg.PNG/004.png?type=w1080" },
    { src: "https://cafeskthumb-phinf.pstatic.net/MjAyMzEyMTJfMjQ3/MDAxNzAyMzM0NDQzOTQ5.37XQa4TsmjX--cVkyqf9i7mnEGBOZqjObmwpUAyKppMg.PX2aHCeRniUyUGiKH76enMVQHdy7lcFdQ8gQQxu9V6Eg.PNG/%EC%A0%9C%EB%AA%A9%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-005.png?type=w1080" },
  ];

  return (
    <section className="py-16 border-t border-white/10 bg-black">
      <div className="container-xxl space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border border-[var(--accent)] text-[var(--accent)] px-4 py-1 text-sm font-semibold">
              성공 사례
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Success Stories
            </h2>
          </div>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <li key={i} className="group">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <div className="absolute inset-0">
                  <LectureImage
                    src={proxied(it.src)}
                    alt={it.title || `Success story ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
