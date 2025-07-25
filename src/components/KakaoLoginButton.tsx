"use client";

interface KakaoLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function KakaoLoginButton({
  onClick,
  isLoading = false,
  className = "",
  children = "카카오톡으로 3초만에 시작하기",
}: KakaoLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#FEE500] p-4 font-bold text-black transition-all hover:bg-[#FDD835] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <span>로그인 중...</span>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 32 32"
            className="mr-2"
            fill="#000000"
          >
            <path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.24 6.64 5.44 8.48l-1.84 6.88 7.04-3.68c.64.08 1.28.16 2 .16 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z" />
          </svg>
          {children}
        </>
      )}
    </button>
  );
}