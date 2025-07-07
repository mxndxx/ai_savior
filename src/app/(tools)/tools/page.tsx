"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, toolsData } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const navigationItems = [
    { name: "홈", href: "/", isActive: false },
    { name: "내 시스템 찾기", href: "/system", isActive: false },
    { name: "솔루션", href: "/solution", isActive: false },
    { name: "성공사례", href: "/success", isActive: false },
    { name: "AI 도구", href: "/tools", isActive: true },
  ];

  const scrollToSection = (category: string) => {
    setActiveCategory(category);
    if (category !== "전체") {
      const element = document.getElementById(`section-${category}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderAllTools = () => {
    return Object.entries(toolsData).map(([key, section]) => (
      <section key={key} id={`section-${key}`} className="mb-12">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {section.title}
          </h2>
          <p className="text-gray-600">{section.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </section>
    ));
  };

  const renderCategoryTools = () => {
    const section = toolsData[activeCategory as keyof typeof toolsData];
    if (!section) return null;

    return (
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {section.title}
          </h2>
          <p className="text-gray-600">{section.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black">
                N잡 AI
              </Link>
            </div>

            {/* Navigation Items */}
            <nav className="hidden items-center space-x-8 md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    item.isActive
                      ? "border-b-2 border-black text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Login Button */}
            <div className="flex items-center">
              <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                로그인
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="my-2">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            AI 도구 목록
          </h1>
          <p className="text-gray-600">
            당신의 모든 상황을 해결할 AI 도구들입니다. 지금 바로 경험해보세요.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToSection(category)}
                className={`flex-shrink-0 rounded-full border-1 p-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Tools Content */}
        {activeCategory === "전체" ? renderAllTools() : renderCategoryTools()}
      </main>
    </div>
  );
}
