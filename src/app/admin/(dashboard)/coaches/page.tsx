"use client";

import { useState, useEffect } from "react";
import { Coach } from "@/types/coaches";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import CoachModal from "@/components/admin/coaches/CoachModal";
import { coachesApi } from "@/app/api/coaches";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);

  // 강사 목록 불러오기
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const coachData = await coachesApi.getCoaches();
        setCoaches(coachData);
      } catch (error) {
        console.error("강사 목록을 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    // 모달이 닫힐 때마다 강사 목록을 새로고침합니다.
    if (!isModalOpen) {
      fetchCoaches();
    }
  }, [isModalOpen]);

  // 강사 삭제
  const handleDeleteCoach = async (
    id: string,
    profileImageUrl: string | null,
  ) => {
    if (confirm("정말로 이 강사를 삭제하시겠습니까?")) {
      try {
        await coachesApi.deleteCoach(id, profileImageUrl);
        setCoaches(coaches.filter((coach) => coach.id !== id));
      } catch (error) {
        console.error("강사 삭제 중 오류:", error);
        alert("강사 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 모달 열기 (생성/수정 통합)
  const openModal = (coach: Coach | null = null) => {
    setIsEditMode(!!coach); // coach가 있으면 수정 모드, 없으면 생성 모드
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedCoach(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
            강사 추가
          </button>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    강사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    소개
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    경력
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      강사 목록을 불러오는 중...
                    </td>
                  </tr>
                ) : coaches.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      등록된 강사가 없습니다.
                    </td>
                  </tr>
                ) : (
                  coaches.map((coach) => (
                    <tr key={coach.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Image
                            src={coach.profile_image}
                            alt={coach.name}
                            className="h-20 w-20 rounded-lg object-cover"
                            width={80}
                            height={80}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {coach.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="line-clamp-3 text-sm text-gray-900">
                          {coach.bio}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="line-clamp-3 text-sm text-gray-900">
                          {coach.career}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(coach)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCoach(coach.id, coach.profile_image)
                            }
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {
        <CoachModal
          isOpen={isModalOpen}
          onClose={closeModal}
          isEdit={isEditMode}
          coachData={selectedCoach}
        />
      }
    </div>
  );
}
