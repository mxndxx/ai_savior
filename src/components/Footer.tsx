"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 rounded-t-4xl">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div>상호명: N잡연구소</div>
              <div>대표자: 김○○</div>
              <div>사업자등록번호: 339-87-03570</div>
              <div>통신판매업신고번호: 제2025-서울-01438호</div>
              <div>
                주소: 서울특별시 강남구 테헤란로 138, 202-2a, 202-2b(역삼동,
                아센디오타워)
              </div>
              <div>연락처: 010-9485-7624</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">바로가기</h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                N잡 연구소
              </Link>
              <Link
                href="/course"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                클래스
              </Link>
              <Link
                href="/course"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                무료 강의
              </Link>
              <Link
                href="/teachers"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                강사진
              </Link>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">고객지원</h3>
            <div className="space-y-3">
              <Link
                href="/support/notices"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                안내사항
              </Link>
              <Link
                href="/support/faqs"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                자주묻는질문
              </Link>
              <Link
                href="https://nlab.channel.io/home"
                target="_blank"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                1:1문의
              </Link>
              <Link
                href="mailto:ttacompany01@gmail.com"
                className="block text-gray-300 hover:text-teal transition-colors"
              >
                강사 신청 및 협업제안
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-300">
            <Link
              href="/privacy-policy"
              className="hover:text-teal transition-colors"
            >
              개인정보 보호방침
            </Link>
            <Link
              href="/terms-of-use"
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
