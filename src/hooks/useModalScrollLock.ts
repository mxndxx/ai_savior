import { useEffect } from 'react';

/**
 * 모달이 열렸을 때 배경 스크롤을 방지하는 커스텀 훅
 * @param isOpen - 모달의 열림/닫힘 상태
 */
export function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 body 스크롤 방지
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // 클린업 함수에서 원래 overflow 값으로 복원
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);
}