import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "N잡 AI 관리자 페이지",
  description: "N잡 AI 플랫폼 관리자 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
