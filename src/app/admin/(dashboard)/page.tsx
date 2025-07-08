import { BookOpen, Users, UserCheck, TrendingUp } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-6">
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">총 강의 수</h3>
            <BookOpen className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">245</div>
          <p className="mt-1 text-xs text-gray-500">+12% from last month</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">강사 수</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">89</div>
          <p className="mt-1 text-xs text-gray-500">+5% from last month</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">총 회원 수</h3>
            <UserCheck className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">12,847</div>
          <p className="mt-1 text-xs text-gray-500">+18% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <div className="rounded-lg border bg-white shadow-sm lg:col-span-4">
          <div className="border-b p-6">
            <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
            <p className="mt-1 text-sm text-gray-600">
              최근 7일간의 주요 활동 내역입니다.
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-black"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">새로운 강의 등록</p>
                  <p className="text-xs text-gray-500">
                    React 기초 강의가 등록되었습니다.
                  </p>
                </div>
                <div className="text-xs text-gray-500">2시간 전</div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">강사 승인 완료</p>
                  <p className="text-xs text-gray-500">
                    김강사님의 강사 신청이 승인되었습니다.
                  </p>
                </div>
                <div className="text-xs text-gray-500">4시간 전</div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-black"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">회원 가입 증가</p>
                  <p className="text-xs text-gray-500">
                    오늘 새로운 회원 25명이 가입했습니다.
                  </p>
                </div>
                <div className="text-xs text-gray-500">6시간 전</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white shadow-sm lg:col-span-3">
          <div className="border-b p-6">
            <h3 className="text-lg font-semibold text-gray-900">빠른 작업</h3>
            <p className="mt-1 text-sm text-gray-600">
              자주 사용하는 관리 기능들입니다.
            </p>
          </div>
          <div className="space-y-3 p-6">
            <button className="flex w-full items-center justify-start gap-3 rounded-lg border border-gray-200 p-3 text-left text-sm transition-colors hover:bg-gray-50">
              <BookOpen className="h-4 w-4" />새 강의 등록
            </button>
            <button className="flex w-full items-center justify-start gap-3 rounded-lg border border-gray-200 p-3 text-left text-sm transition-colors hover:bg-gray-50">
              <Users className="h-4 w-4" />
              강사 승인 대기 목록
            </button>
            <button className="flex w-full items-center justify-start gap-3 rounded-lg border border-gray-200 p-3 text-left text-sm transition-colors hover:bg-gray-50">
              <UserCheck className="h-4 w-4" />
              회원 관리
            </button>
            <button className="flex w-full items-center justify-start gap-3 rounded-lg border border-gray-200 p-3 text-left text-sm transition-colors hover:bg-gray-50">
              <TrendingUp className="h-4 w-4" />
              통계 보고서
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
