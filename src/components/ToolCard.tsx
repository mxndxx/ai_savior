"use client";

import { useState } from "react";
import { Tool } from "@/data/tools";
import ToolRequestModal from "@/components/ToolRequestModal";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4 flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-black">
            <span className="text-lg font-bold text-white">AI</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-600">{tool.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">무료</span>
          <button
            className="cursor-pointer text-sm font-medium text-black hover:text-gray-700"
            onClick={handleButtonClick}
          >
            사용해보기
          </button>
        </div>
      </div>

      <ToolRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        toolName={tool.name}
      />
    </>
  );
}
