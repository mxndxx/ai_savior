"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rounded-t-4xl bg-black py-6 text-white">
      <div className="container mx-auto p-4">
        {/* Main Footer Content */}
        <div className="mb-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div>주식회사 에이아이사스(AISAAS Inc.)</div>
              {/* <div>서비스명: N잡 AI</div> */}
              <div>대표자: 최서준 | 사업자등록번호: 878-81-03281</div>
              <div>
                주소: 경기도 김포시 김포한강8로 158, 6층 604-C121호(마산동)
              </div>
              <div>연락처: 010-4049-2009</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">바로가기</h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                N잡 AI
              </Link>
              <Link
                href="/lecture"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                클래스
              </Link>
              {/* <Link
                href="/course"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                무료 강의
              </Link>
              <Link
                href="/teachers"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                강사진
              </Link> */}
            </div>
          </div>

          {/* Support & Legal */}
          {/* <div>
            <h3 className="mb-4 text-lg font-semibold">고객지원</h3>
            <div className="space-y-3">
              <Link
                href="/support/notices"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                안내사항
              </Link>
              <Link
                href="/support/faqs"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                자주묻는질문
              </Link>
              <Link
                href="https://nlab.channel.io/home"
                target="_blank"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                1:1문의
              </Link>
              <Link
                href="mailto:ttacompany01@gmail.com"
                className="hover:text-teal block text-gray-300 transition-colors"
              >
                강사 신청 및 협업제안
              </Link>
            </div>
          </div> */}
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 md:justify-start">
            <Link
              href="/privacy-policy"
              className="hover:text-teal transition-colors"
            >
              개인정보 보호방침
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-teal transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-teal transition-colors"
            >
              환불규정
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
