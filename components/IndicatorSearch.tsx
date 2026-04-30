"use client";

import { useState } from "react";

interface IndicatorSearchProps {
  onSearch: (query: string) => void;
  sourceFilter: "ALL" | "ECOS" | "KOSIS";
  onSourceFilterChange: (filter: "ALL" | "ECOS" | "KOSIS") => void;
}

export default function IndicatorSearch({
  onSearch,
  sourceFilter,
  onSourceFilterChange,
}: IndicatorSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="space-y-3">
      {/* 검색창 */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="indicator-search-input"
          type="text"
          placeholder="지표명을 검색하세요"
          value={query}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
        />
      </div>

      {/* 출처 필터 */}
      <div className="flex gap-1">
        {(["ALL", "ECOS", "KOSIS"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => onSourceFilterChange(filter)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              sourceFilter === filter
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {filter === "ALL" ? "전체" : filter}
          </button>
        ))}
      </div>
    </div>
  );
}
