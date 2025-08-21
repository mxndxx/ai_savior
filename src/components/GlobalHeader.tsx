"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { Menu, Search, X } from "lucide-react";

const AuthButton = dynamic(() => import("@/components/AuthButton"), { ssr: false });

type Props = {
  /** Liste des catégories à afficher (facultatif) */
  categories?: string[];
  /** Catégorie par défaut (facultatif) */
  defaultCategory?: string;
  /** Callback quand une catégorie est choisie (facultatif) */
  onCategoryChange?: (cat: string) => void;
  /** Callback à chaque changement de recherche (facultatif) */
  onSearchChange?: (q: string) => void;
};

export default function GlobalHeader({
  categories,
  defaultCategory,
  onCategoryChange,
  onSearchChange,
}: Props) {
  // État interne
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const CATEGORIES = useMemo(
    () => categories ?? ["전체", "창업", "마케팅", "AI", "타로/사주", "커리어"],
    [categories]
  );
  const [cat, setCat] = useState<string>(defaultCategory ?? CATEGORIES[0] ?? "전체");
  const [query, setQuery] = useState("");

  // Propagation vers parent si souhaité
  function handleCatChange(next: string) {
    setCat(next);
    onCategoryChange?.(next);
  }
  function handleQueryChange(next: string) {
    setQuery(next);
    onSearchChange?.(next);
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
        <div className="container-xxl flex items-center gap-3 py-3">
          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/80 hover:bg-white/5"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2" aria-label="월천메이커 AI 홈">
            <NextImage
              src="/mooncheonmaker_w_ribbon_icon.svg"
              alt="월천메이커 AI 로고"
              width={28}
              height={28}
              priority
              className="h-7 w-7"
            />
          </Link>

          <div className="hidden lg:flex min-w-0 flex-1 items-center gap-3">
            <div className="masked-overflow relative flex-1 overflow-x-auto">
              <div className="flex flex-nowrap gap-1 pr-4">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCatChange(c)}
                    className={`inline-flex shrink-0 items-center justify-center px-4 py-1.5 rounded-full text-sm border border-white/15 transition ${
                      cat === c ? "bg-white/10" : "bg-transparent hover:bg-white/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                placeholder="어떤 목표를 찾고 계신가요? (예: 애드센스, 경매)"
                className="pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-md placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-64 xl:w-72"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
              />
            </div>
          </div>

          {/* Bouton search (mobile) */}
          <button
            className="lg:hidden ml-auto inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/80 hover:bg-white/5"
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* CTA */}
          <Link
            href="#final-offer"
            className="shrink-0 hidden sm:inline-flex cta-pulse px-3 py-1.5 rounded-md text-sm bg-[var(--accent)] hover:opacity-90 transition"
          >
            무료 웨비나 신청
          </Link>

          {/* Auth */}
          <AuthButton />
        </div>

        {/* Search bar behind the header (mobile) */}
        {showSearch && (
          <div className="lg:hidden border-t border-white/10 px-3 pb-3">
            <div className="relative mt-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                placeholder="목표 검색…"
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-md placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Drawer Menu (mobile) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-[#0a0a0a] border-r border-white/10 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
                aria-label="월천메이커 AI 홈"
              >
                <NextImage
                  src="/mooncheonmaker_w_ribbon_icon.svg"
                  alt="월천메이커 AI 로고"
                  width={28}
                  height={28}
                  priority
                  className="h-7 w-7"
                />
              </Link>
              <button
                className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/80 hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search (mobile drawer) */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                placeholder="목표 검색…"
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-md placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    handleCatChange(c);
                    setMenuOpen(false);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm border border-white/15 ${
                    cat === c ? "bg-white/10" : "bg-transparent hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <Link
              href="#final-offer"
              onClick={() => setMenuOpen(false)}
              className="mt-auto inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-3 font-medium hover:opacity-90"
            >
              무료 웨비나 신청
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
