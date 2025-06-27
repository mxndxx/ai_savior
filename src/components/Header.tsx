"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 rounded-full p-2 my-4 mx-8 2xl:mx-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-4xl font-bold text-gray-900">SAVIOR</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-2xl">
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Savior
            </Link>
            <Link
              href="/course"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              클래스
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                고객지원
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
              className="md:hidden flex flex-col space-y-1"
            >
              <span className="w-6 h-0.5 bg-gray-900 transition-all" />
              <span className="w-6 h-0.5 bg-gray-900 transition-all" />
              <span className="w-6 h-0.5 bg-gray-900 transition-all" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Savior
              </Link>
              <Link
                href="/course"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                클래스
              </Link>
              <Link
                href="/support/notices"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                안내사항
              </Link>
              <Link
                href="/support/faqs"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                자주묻는질문
              </Link>
              <Link
                href="https://nlab.channel.io/home"
                target="_blank"
                className="text-gray-700 hover:text-blue-600 transition-colors"
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
