"use client";

import { useState } from "react";
import { CircleChevronRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "item-1",
    question: "무료 라이브 강의는 어떻게 참여하나요?",
    answer:
      "무료 라이브 강의는 홈페이지에서 사전 신청을 통해 참여하실 수 있습니다. 신청 후 강의 시작 전에 참여 링크를 이메일로 발송해드립니다. 강의는 실시간으로 진행되며, 질의응답 시간도 포함되어 있습니다.",
  },
  {
    id: "item-2",
    question: "N잡 연구소는 뭐하는 곳인가요?",
    answer:
      "N잡 연구소는 부업과 창업을 통한 다양한 수익 창출 방법을 연구하고 교육하는 곳입니다. 실제 성공 사례를 바탕으로 한 실무 중심의 교육을 제공하며, 수강생들의 성공적인 N잡 도전을 지원합니다.",
  },
  {
    id: "item-3",
    question: "문의는 어디서 가능한가요?",
    answer:
      "문의는 홈페이지의 고객지원 페이지를 통해 가능합니다. 이메일, 전화, 온라인 채팅을 통해 언제든지 문의하실 수 있으며, 평일 오전 9시부터 오후 6시까지 실시간 상담이 가능합니다.",
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="space-y-5 bg-white py-10 md:space-y-10 md:py-[100px] lg:space-y-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 lg:flex-row">
        {/* Left Content */}
        <div className="space-y-10">
          <div className="flex w-full flex-col items-start gap-3 md:gap-4">
            <span className="rounded-full border-2 border-purple-600 px-4 py-1 text-sm font-semibold text-purple-600 md:text-[20px]">
              FaQ
            </span>
            <h2 className="text-3xl leading-[1.2] font-semibold whitespace-pre-line md:text-4xl lg:text-5xl">
              자주 묻는 질문
            </h2>
            <p className="text-lg leading-[1.3] text-gray-700 md:text-xl lg:text-[28px]">
              N잡 연구소에게 수강생 여러분들께서{"\n"}
              가장 궁금해 하시는 질문들을 안내드립니다.
            </p>
          </div>
          <a
            href="/support/faqs"
            className="flex items-center gap-4 text-lg text-gray-600 transition-colors hover:text-purple-600 md:text-2xl"
          >
            모든 질문 확인하기
            <CircleChevronRight className="size-7 stroke-1" />
          </a>
        </div>

        {/* Right Content - FAQ Accordion */}
        <div className="w-full max-w-[800px]">
          <div className="space-y-2 lg:space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="space-y-2 border-none lg:space-y-3">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex w-full items-center justify-between rounded-[20px] border border-gray-200 px-5 py-5 text-left text-lg transition-colors hover:bg-slate-100 md:text-2xl lg:px-10 lg:py-7"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-6 w-6 transition-transform ${
                      openItem === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openItem === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="rounded-xl border-2 border-violet-400 px-5 py-4 text-base leading-relaxed text-gray-600 md:text-lg lg:px-10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
