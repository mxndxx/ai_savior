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
  onTemplateSelect?: (template: Template | null) => void;
}

export const TemplateSelector = ({
  channelLabel,
  channel,
  fetchTemplates,
  renderContent,
  onTemplateSelect,
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
    onTemplateSelect?.(template);
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
      ? "컨버트킷 이메일 템플릿을 선택하세요"
      : "솔라피 알림톡 템플릿을 선택하세요";

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-medium text-gray-900">{channelLabel}</h3>

      <div className="space-y-3">
        <div ref={dropdownRef} className="relative">
          {/* 커스텀 셀렉트 박스 */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isTemplatesLoading}
            className="relative w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm transition-all hover:bg-gray-100 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="block truncate">
              {selectedTemplate
                ? `${selectedTemplate.id} - ${selectedTemplate.title}`
                : placeholderText}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>

          {/* 드롭다운 리스트 */}
          {isOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl">
              <div
                ref={listRef}
                onScroll={handleScroll}
                className="max-h-72 overflow-auto rounded-xl py-2 text-sm focus:outline-none"
              >
                {/* 선택 해제 옵션 */}
                <div
                  onClick={() => handleTemplateSelect(null)}
                  className="relative cursor-pointer px-4 py-2.5 transition-colors select-none hover:bg-gray-50"
                >
                  <span className="block truncate text-gray-500">
                    선택 안함
                  </span>
                  {!selectedTemplateId && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Check className="h-4 w-4 text-blue-500" />
                    </span>
                  )}
                </div>

                {/* 템플릿 목록 */}
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="relative cursor-pointer px-4 py-2.5 transition-colors select-none hover:bg-gray-50"
                  >
                    <div>
                      <span className="block truncate text-xs text-gray-500">
                        ID: {template.id} - {template.title}
                      </span>
                    </div>
                    {template.id.toString() === selectedTemplateId && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Check className="h-4 w-4 text-blue-500" />
                      </span>
                    )}
                  </div>
                ))}

                {/* 로딩 표시 */}
                {isFetchingNextPage && (
                  <div className="py-3 text-center text-xs text-gray-400">
                    로딩 중...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedTemplate && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">미리보기</h4>
            <div className="max-h-64 overflow-x-hidden overflow-y-auto rounded-xl border border-gray-200 bg-gray-50">
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

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleCancelClick}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <X size={16} />
          취소
        </button>
        <button
          onClick={handleSaveClick}
          disabled={isLoading || (!editText && !selectedTemplateId)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};
