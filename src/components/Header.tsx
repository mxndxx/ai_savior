"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 mx-5 my-4 rounded-full border-b border-gray-200 bg-white p-2 shadow-sm sm:mx-8 2xl:mx-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-4xl font-bold text-gray-900">N잡 AI</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 text-2xl md:flex">
            <Link
              href="/"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              홈
            </Link>
            <Link
              href="/system"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              내 시스템 찾기
            </Link>
            <Link
              href="/solution"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              솔루션
            </Link>
            <Link
              href="/success"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              성공사례
            </Link>
            <Link
              href="/tools"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              AI 도구
            </Link>
            <div className="group relative">
              <button className="text-gray-700 transition-colors hover:text-blue-600">
                고객지원
              </button>
              <div className="invisible absolute top-full left-0 z-50 mt-2 w-48 rounded-lg bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <Link
                  href="/support/notices"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  안내사항
                </Link>
                <Link
                  href="/support/faqs"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  자주묻는질문
                </Link>
                <Link
                  href="https://nlab.channel.io/home"
                  target="_blank"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  1:1문의
                </Link>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col space-y-1 md:hidden"
            >
              <span className="h-0.5 w-6 bg-gray-900 transition-all" />
              <span className="h-0.5 w-6 bg-gray-900 transition-all" />
              <span className="h-0.5 w-6 bg-gray-900 transition-all" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 border-t border-gray-200 pt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                Savior
              </Link>
              <Link
                href="/course"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                클래스
              </Link>
              <Link
                href="/support/notices"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                안내사항
              </Link>
              <Link
                href="/support/faqs"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                자주묻는질문
              </Link>
              <Link
                href="https://nlab.channel.io/home"
                target="_blank"
                className="text-gray-700 transition-colors hover:text-blue-600"
              >
                1:1문의
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
