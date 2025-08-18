"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "item-1",
    question: "무료 라이브 강의는 어떻게 참여하나요?",
    answer:
      "무료 라이브 강의는 홈페이지에서 사전 신청을 통해 참여하실 수 있습니다. 신청 후 강의 시작 전에 참여 링크를 이메일로 발송해드립니다. 강의는 실시간으로 진행되며, 질의응답 시간도 포함되어 있습니다.",
  },
  {
    id: "item-2",
    question: "N잡 AI는 뭐하는 곳인가요?",
    answer:
      "N잡 AI는 부업과 창업을 통한 다양한 수익 창출 방법을 연구하고 교육하는 곳입니다. 실제 성공 사례를 바탕으로 한 실무 중심의 교육을 제공하며, 수강생들의 성공적인 N잡 도전을 지원합니다.",
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (id: string) => setOpenItem(openItem === id ? null : id);

  return (
    <section id="faq" className="bg-black py-16 border-t border-white/10">
      <div className="container-xxl">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <span className="block w-fit rounded-full border border-[var(--accent)] text-[var(--accent)] px-4 py-1 text-sm font-semibold mb-3 md:mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              자주 묻는 질문
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mt-3">
              수강생분들이 가장 많이 궁금해하시는 내용을 모았습니다.
              더 궁금한 점이 있다면 웨비나에서 직접 질문하세요.
            </p>
          </div>
          <div className="lg:col-span-7 w-full space-y-4">
            {faqs.map((faq) => {
              const opened = openItem === faq.id;
              return (
                <div key={faq.id} className="space-y-2">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={opened}
                    className="flex w-full items-center justify-between rounded-[20px] border border-white/15 bg-white/[0.02] px-6 py-5 text-left text-lg md:text-2xl hover:bg-white/[0.05] transition"
                  >
                    <span className="text-white">{faq.question}</span>
                    <ChevronDown
                      className={`h-6 w-6 text-white/70 transition-transform ${opened ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      opened ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="rounded-xl border border-white/10 bg-black/60 px-6 py-4 text-base md:text-lg leading-relaxed text-white/70">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
