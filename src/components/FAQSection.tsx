"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    id: "1",
    question: "강의는 어떻게 수강할 수 있나요?",
    answer:
      "회원가입 후 원하는 강의를 선택하여 결제하시면 바로 수강이 가능합니다. 모든 강의는 온라인으로 제공되며, 언제 어디서나 학습할 수 있습니다.",
  },
  {
    id: "2",
    question: "무료 강의와 유료 강의의 차이점은 무엇인가요?",
    answer:
      "무료 강의는 N잡에 대한 기본적인 정보와 시작 방법을 제공하며, 유료 강의는 더 구체적이고 실전적인 노하우와 1:1 피드백, 커뮤니티 참여 등의 혜택이 포함됩니다.",
  },
  {
    id: "3",
    question: "강의 수강 기간은 얼마나 되나요?",
    answer:
      "강의마다 다르지만, 대부분의 강의는 구매 후 6개월 동안 무제한으로 시청할 수 있습니다. 일부 프리미엄 강의는 평생 수강이 가능합니다.",
  },
  {
    id: "4",
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "강의 구매 후 7일 이내, 진도율 30% 미만일 경우 100% 환불이 가능합니다. 자세한 환불 정책은 이용약관에서 확인하실 수 있습니다.",
  },
  {
    id: "5",
    question: "1:1 멘토링은 어떻게 받을 수 있나요?",
    answer:
      "프리미엄 강의 수강생에게는 강사와의 1:1 멘토링 기회가 제공됩니다. 별도의 멘토링 프로그램도 운영하고 있으니 고객센터로 문의해주세요.",
  },
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-purple text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto mb-8">
            N잡연구소에서 가장 많이 받는 질문들을 모았습니다.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-lightgray rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-80 transition-colors"
                >
                  <h3 className="font-semibold text-navy text-lg">
                    {faq.question}
                  </h3>
                  <div
                    className={`transform transition-transform duration-200 ${
                      openFAQ === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-borderColor pt-4">
                      <p className="text-gray leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View All FAQs Button */}
        <div className="text-center mt-12">
          <Link
            href="/support/faqs"
            className="inline-flex items-center bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            모든 질문 확인하기
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
