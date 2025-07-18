import { X, ChevronDown, Check } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { convertKitApi, type ConvertKitBroadcast } from "@/utils/convertkit";
import { useMessageSettingsContext } from "./MessageSettingsContext";

interface EmailEditorProps {
  channelLabel: string;
}

export const EmailEditor = ({ channelLabel }: EmailEditorProps) => {
  const {
    editText,
    setEditText,
    handleCancelClick,
    handleEmailSaveClick,
    isUpdating,
    isCreating,
  } = useMessageSettingsContext();

  const [selectedBroadcastId, setSelectedBroadcastId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBroadcastsLoading,
  } = useInfiniteQuery({
    queryKey: ["convertkit-broadcasts"],
    queryFn: ({ pageParam }) => convertKitApi.getBroadcasts(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const broadcasts = data?.pages.flatMap((page) => page.broadcasts) ?? [];

  useEffect(() => {
    // editText가 숫자만 있으면 broadcast ID로 간주
    if (editText && /^\d+$/.test(editText)) {
      setSelectedBroadcastId(editText);
    } else {
      setSelectedBroadcastId("");
    }
  }, [editText]);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBroadcastSelect = (broadcast: ConvertKitBroadcast | null) => {
    if (broadcast) {
      setSelectedBroadcastId(broadcast.id.toString());
      setEditText(broadcast.id.toString()); // 숫자만 저장
    } else {
      setSelectedBroadcastId("");
      setEditText("");
    }
    setIsOpen(false);
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.target as HTMLDivElement;
      const scrollBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      if (scrollBottom < 100 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  const isLoading = isUpdating || isCreating;

  const selectedBroadcast = broadcasts.find(
    (b) => b.id.toString() === selectedBroadcastId,
  );

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium text-gray-900">{channelLabel}</h3>

      <div className="mt-2 space-y-2">
        <div ref={dropdownRef} className="relative">
          {/* <label className="mb-1 block text-sm font-medium text-gray-700">
            ConvertKit 브로드캐스트 선택
          </label> */}

          {/* 커스텀 셀렉트 박스 */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isBroadcastsLoading}
            className="relative w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:opacity-50"
          >
            <span className="block truncate">
              {selectedBroadcast
                ? `${selectedBroadcast.id} - ${selectedBroadcast.subject}`
                : "컨버트킷 브로드캐스트를 선택하세요"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>

          {/* 드롭다운 리스트 */}
          {isOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
              <div
                ref={listRef}
                onScroll={handleScroll}
                className="ring-opacity-5 max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black focus:outline-none sm:text-sm"
              >
                {/* 선택 해제 옵션 */}
                <div
                  onClick={() => handleBroadcastSelect(null)}
                  className="relative cursor-pointer py-2 pr-9 pl-3 select-none hover:bg-gray-100"
                >
                  <span className="block truncate text-gray-500"></span>
                  {!selectedBroadcastId && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Check className="h-4 w-4 text-black" />
                    </span>
                  )}
                </div>

                {/* 브로드캐스트 목록 */}
                {broadcasts.map((broadcast) => (
                  <div
                    key={broadcast.id}
                    onClick={() => handleBroadcastSelect(broadcast)}
                    className="relative cursor-pointer py-2 pr-9 pl-3 select-none hover:bg-gray-100"
                  >
                    <div>
                      <span className="block truncate text-xs text-gray-500">
                        ID: {broadcast.id} - {broadcast.subject}
                      </span>
                    </div>
                    {broadcast.id.toString() === selectedBroadcastId && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Check className="h-4 w-4 text-black" />
                      </span>
                    )}
                  </div>
                ))}

                {/* 로딩 표시 */}
                {isFetchingNextPage && (
                  <div className="py-2 text-center text-sm text-gray-500">
                    로딩 중...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedBroadcast && (
          <div className="rounded-md bg-gray-50 p-3">
            <h4 className="mb-1 text-sm font-medium text-gray-700">내용:</h4>
            <div className="max-h-64 overflow-x-hidden overflow-y-auto rounded border border-gray-200 bg-white">
              {selectedBroadcast.content ? (
                <div
                  className="prose prose-sm max-w-none px-4 text-gray-600 [&_img]:h-auto [&_img]:max-w-full [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0"
                  dangerouslySetInnerHTML={{
                    __html: selectedBroadcast.content.replace(
                      /src="(https?:\/\/[^"]+)"/g,
                      (match, url) => {
                        // 네이버 이미지는 프록시 통해 가져오기
                        if (url.includes("pstatic.net")) {
                          return `src="/api/proxy/image?url=${encodeURIComponent(url)}"`;
                        }
                        return match;
                      },
                    ),
                  }}
                />
              ) : (
                <p className="text-sm text-gray-600">
                  제목: {selectedBroadcast.subject}
                  <br />
                  <br />
                  (브로드캐스트 내용은 ConvertKit에서 관리됩니다)
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleCancelClick}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
        >
          <X size={16} />
        </button>
        <button
          onClick={handleEmailSaveClick}
          disabled={isLoading || (!editText && !selectedBroadcastId)}
          className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};
