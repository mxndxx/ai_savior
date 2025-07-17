"use client";

import { useForm } from "react-hook-form";
import { Coach, CreateCoachForm } from "@/types/coaches";
import { X, Image as ImageIcon, Upload } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import { coachesApi } from "@/app/api/coaches";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  coachData?: Coach | null;
}

export default function CoachModal({
  isOpen,
  onClose,
  isEdit = false,
  coachData = null,
}: CoachModalProps) {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCoachForm>();

  useEffect(() => {
    if (isOpen) {
      if (isEdit && coachData) {
        setValue("name", coachData.name);
        setValue("bio", coachData.bio);
        setValue("career", coachData.career);
        if (coachData.profile_image) {
          setProfileImagePreview(coachData.profile_image);
        }
      } else {
        reset({
          name: "",
          bio: "",
          career: "",
        });
        setProfileImageFile(null);
        setProfileImagePreview("");
      }
    }
  }, [isEdit, coachData, isOpen, setValue, reset]);

  useEffect(() => {
    return () => {
      if (profileImagePreview && profileImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);
    }
  };

  const onSubmit = async (data: CreateCoachForm) => {
    if (!isEdit && !profileImageFile) {
      alert("프로필 이미지는 필수입니다.");
      return;
    }

    try {
      if (isEdit && coachData) {
        await coachesApi.updateCoach(
          coachData.id,
          data,
          profileImageFile || undefined,
          coachData.profile_image,
        );
        alert("강사 정보가 성공적으로 수정되었습니다!");
      } else {
        await coachesApi.createCoach({
          formData: data,
          profileImageFile: profileImageFile!,
        });
        alert("강사가 성공적으로 추가되었습니다!");
      }
      handleClose();
    } catch (error) {
      console.error("강사 처리 중 오류:", error);
      alert(
        error instanceof Error
          ? error.message
          : "강사 처리 중 오류가 발생했습니다.",
      );
    }
  };

  const handleClose = () => {
    reset();
    setProfileImageFile(null);
    setProfileImagePreview("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {isEdit ? "강사 정보 수정" : "새 강사 추가"}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                프로필 이미지 *
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-300 bg-gray-50">
                  {profileImagePreview ? (
                    <Image
                      src={profileImagePreview}
                      alt="프로필 미리보기"
                      width={96}
                      height={96}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  이미지 업로드
                  <input
                    id="profile-upload"
                    name="profile-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
              {!isEdit && (
                <p className="mt-1 text-xs text-gray-500">
                  새 강사 등록 시 프로필 이미지는 필수입니다.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                이름 *
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "이름은 필수입니다." })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="강사 이름을 입력하세요"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                소개 *
              </label>
              <textarea
                id="bio"
                rows={4}
                {...register("bio", { required: "소개는 필수입니다." })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="강사 소개를 입력하세요"
              />
              {errors.bio && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="career"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                주요 경력 *
              </label>
              <textarea
                id="career"
                rows={4}
                {...register("career", { required: "경력은 필수입니다." })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="주요 경력을 입력하세요"
              />
              {errors.career && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.career.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "저장 중..." : isEdit ? "수정하기" : "추가하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
