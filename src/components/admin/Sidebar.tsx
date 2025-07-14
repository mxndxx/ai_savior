"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Bell } from "lucide-react";

const sidebarItems = [
  {
    name: "대시보드",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "강의 관리",
    href: "/admin/lectures",
    icon: BookOpen,
  },
  {
    name: "알림 관리",
    href: "/admin/messages",
    icon: Bell,
  },
  {
    name: "강사 관리",
    href: "/admin/coaches",
    icon: Users,
  },
  {
    name: "회원 관리",
    href: "/admin/members",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="text-xl font-bold text-black">
          N잡 AI 백오피스
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-4">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
