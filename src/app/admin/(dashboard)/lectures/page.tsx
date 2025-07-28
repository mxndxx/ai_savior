"use client";

import { useState } from "react";
import { LectureWithCoach } from "@/types/lectures";
import { Edit, Trash2, Plus, Copy } from "lucide-react";
import Image from "next/image";
import LectureModal from "@/components/admin/lectures/LectureModal";
import { lecturesApi } from "@/app/api/lectures";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function LecturesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDuplicateMode, setIsDuplicateMode] = useState(false);
  const [selectedLecture, setSelectedLecture] =
    useState<LectureWithCoach | null>(null);
  const queryClient = useQueryClient();

  // 강의 목록 불러오기
  const {
    data: lectures = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery<LectureWithCoach[]>({
    queryKey: ["adminLectures"],
    queryFn: lecturesApi.getLectures,
  });

  // 강의 삭제
  const { mutate: deleteLecture } = useMutation({
    mutationFn: ({
      id,
      thumbnail,
      content_image,
    }: {
      id: string;
      thumbnail: string | null;
      content_image: string | null;
    }) => lecturesApi.deleteLecture(id, thumbnail || "", content_image || ""),
    onSuccess: () => {
      alert("강의가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["adminLectures"] });
    },
    onError: (error) => {
      console.error("강의 삭제 중 오류:", error);
      alert("강의 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteLecture = (lecture: LectureWithCoach) => {
    if (confirm("정말로 이 강의를 삭제하시겠습니까?")) {
      deleteLecture({
        id: lecture.id,
        thumbnail: lecture.thumbnail,
        content_image: lecture.content_image,
      });
    }
  };

  // 모달 열기 (생성/수정/복제 통합)
  const openModal = (lecture: LectureWithCoach | null = null, duplicate: boolean = false) => {
    if (duplicate && lecture) {
      setIsEditMode(false);
      setIsDuplicateMode(true);
      setSelectedLecture(lecture);
    } else {
      setIsEditMode(!!lecture && !duplicate);
      setIsDuplicateMode(false);
      setSelectedLecture(lecture);
    }
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setIsDuplicateMode(false);
    setSelectedLecture(null);
  };

  if (isError) {
    console.error("강의 목록을 불러오는데 실패했습니다:", error);
    return <div>오류가 발생했습니다. 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => openModal()} // null 대신 빈 호출
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
            강의 추가
          </button>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    강의
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    강의 시작일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    강사
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
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      강의 목록을 불러오는 중...
                    </td>
                  </tr>
                ) : lectures.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      등록된 강의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  lectures.map((lecture) => (
                    <tr key={lecture.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Image
                            src={lecture.thumbnail}
                            alt={lecture.title}
                            className="h-20 w-20 rounded-lg object-cover"
                            width={80}
                            height={80}
                          />
                          <div className="ml-4">
                            <div className="line-clamp-2 text-sm font-medium text-gray-900">
                              {lecture.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              가격 : {lecture.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {(() => {
                            const dateStr = lecture.start_date;
                            const date = dateStr.substring(0, 10);
                            const time = dateStr.substring(11, 16);
                            const [hour, minute] = time.split(":");
                            const hourNum = parseInt(hour);
                            const period = hourNum >= 12 ? "오후" : "오전";
                            const displayHour =
                              hourNum > 12
                                ? hourNum - 12
                                : hourNum === 0
                                  ? 12
                                  : hourNum;

                            return `${date} ${period} ${displayHour.toString().padStart(2, "0")}:${minute}`;
                          })()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {lecture.coach.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(lecture)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                            title="수정"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openModal(lecture, true)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-green-600"
                            title="복제"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLecture(lecture)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
                            title="삭제"
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

      <LectureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isEdit={isEditMode}
        isDuplicate={isDuplicateMode}
        lectureData={selectedLecture}
      />
    </div>
  );
}
