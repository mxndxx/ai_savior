import { X, ChevronDown, Check } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMessageSettingsContext } from "./MessageSettingsContext";

interface Template {
  id: string | number;
  title: string;
  content?: string;
}

interface TemplateSelectorProps {
  channelLabel: string;
  channel: "email" | "kakao";
  fetchTemplates: (cursor?: any) => Promise<{
    templates: Template[];
    nextCursor: any;
  }>;
  renderContent?: (template: Template) => React.ReactNode;
}

export const TemplateSelector = ({
  channelLabel,
  channel,
  fetchTemplates,
  renderContent,
}: TemplateSelectorProps) => {
  const {
    editText,
    setEditText,
    handleCancelClick,
    handleSaveClick,
    isUpdating,
    isCreating,
  } = useMessageSettingsContext();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isTemplatesLoading,
  } = useInfiniteQuery({
    queryKey: [`${channel}-templates`],
    queryFn: ({ pageParam }) => fetchTemplates(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const templates = data?.pages.flatMap((page) => page.templates) ?? [];

  useEffect(() => {
    // editText가 ID 형식이면 template ID로 간주
    if (editText && (channel === "email" ? /^\d+$/.test(editText) : editText)) {
      setSelectedTemplateId(editText);
    } else {
      setSelectedTemplateId("");
    }
  }, [editText, channel]);

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

  const handleTemplateSelect = (template: Template | null) => {
    if (template) {
      setSelectedTemplateId(template.id.toString());
      setEditText(template.id.toString());
    } else {
      setSelectedTemplateId("");
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

  const selectedTemplate = templates.find(
    (t) => t.id.toString() === selectedTemplateId,
  );

  const placeholderText =
    channel === "email"
      ? "컨버트킷 브로드캐스트를 선택하세요"
      : "솔라피 알림톡 템플릿을 선택하세요";

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium text-gray-900">{channelLabel}</h3>

      <div className="mt-2 space-y-2">
        <div ref={dropdownRef} className="relative">
          {/* 커스텀 셀렉트 박스 */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isTemplatesLoading}
            className="relative w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none disabled:opacity-50"
          >
            <span className="block truncate">
              {selectedTemplate
                ? `${selectedTemplate.id} - ${selectedTemplate.title}`
                : placeholderText}
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
                  onClick={() => handleTemplateSelect(null)}
                  className="relative cursor-pointer py-2 pr-9 pl-3 select-none hover:bg-gray-100"
                >
                  <span className="block truncate text-gray-500">
                    선택 안함
                  </span>
                  {!selectedTemplateId && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Check className="h-4 w-4 text-black" />
                    </span>
                  )}
                </div>

                {/* 템플릿 목록 */}
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="relative cursor-pointer py-2 pr-9 pl-3 select-none hover:bg-gray-100"
                  >
                    <div>
                      <span className="block truncate text-xs text-gray-500">
                        ID: {template.id} - {template.title}
                      </span>
                    </div>
                    {template.id.toString() === selectedTemplateId && (
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

        {selectedTemplate && (
          <div className="rounded-md bg-gray-50 p-3">
            <h4 className="mb-1 text-sm font-medium text-gray-700">내용:</h4>
            <div className="max-h-64 overflow-x-hidden overflow-y-auto rounded border border-gray-200 bg-white">
              {renderContent ? (
                renderContent(selectedTemplate)
              ) : (
                <p className="p-4 text-sm text-gray-600">
                  {selectedTemplate.content ||
                    `제목: ${selectedTemplate.title}`}
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
          onClick={handleSaveClick}
          disabled={isLoading || (!editText && !selectedTemplateId)}
          className="rounded-md border border-transparent bg-black px-3 py-1 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};
