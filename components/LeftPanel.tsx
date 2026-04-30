"use client";

import { useMemo } from "react";
import { IndicatorMeta } from "@/types/indicator";
import { IndicatorTreeNode } from "@/types/indicator";
import { indicators } from "@/lib/indicators";
import { buildIndicatorTree } from "@/lib/indicatorTree";
import { searchIndicators } from "@/lib/searchIndicators";
import IndicatorSearch from "./IndicatorSearch";
import IndicatorTree from "./IndicatorTree";
import SelectedIndicators from "./SelectedIndicators";
import DateRangePicker from "./DateRangePicker";

const MAX_INDICATORS = 4;

interface LeftPanelProps {
  selectedIndicators: IndicatorMeta[];
  onSelectIndicator: (indicator: IndicatorMeta) => void;
  onRemoveIndicator: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sourceFilter: "ALL" | "ECOS" | "KOSIS";
  onSourceFilterChange: (filter: "ALL" | "ECOS" | "KOSIS") => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFetchData: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export default function LeftPanel({
  selectedIndicators,
  onSelectIndicator,
  onRemoveIndicator,
  searchQuery,
  onSearchChange,
  sourceFilter,
  onSourceFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFetchData,
  isLoading,
  errorMessage,
}: LeftPanelProps) {
  // 출처 필터 적용
  const filteredIndicators = useMemo(() => {
    if (sourceFilter === "ALL") return indicators;
    return indicators.filter((ind) => ind.source === sourceFilter);
  }, [sourceFilter]);

  // 트리 구조
  const tree: IndicatorTreeNode[] = useMemo(
    () => buildIndicatorTree(filteredIndicators),
    [filteredIndicators]
  );

  // 검색 결과
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchIndicators(filteredIndicators, searchQuery);
  }, [searchQuery, filteredIndicators]);

  // 선택 처리
  const selectedIds = new Set(selectedIndicators.map((ind) => ind.id));

  const handleSelect = (indicator: IndicatorMeta) => {
    if (selectedIds.has(indicator.id)) return;
    if (selectedIndicators.length >= MAX_INDICATORS) {
      alert(`MVP에서는 최대 ${MAX_INDICATORS}개의 지표까지 선택할 수 있습니다.`);
      return;
    }
    onSelectIndicator(indicator);
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* 검색 영역 */}
      <div className="p-4 border-b border-slate-100">
        <IndicatorSearch
          onSearch={onSearchChange}
          sourceFilter={sourceFilter}
          onSourceFilterChange={onSourceFilterChange}
        />
      </div>

      {/* 트리 / 검색 결과 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <IndicatorTree
          tree={tree}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          searchResults={searchResults}
        />
      </div>

      {/* 선택된 지표 + 날짜 + 조회 */}
      <div className="border-t border-slate-200 p-4 space-y-4 bg-slate-50/50">
        <SelectedIndicators
          selected={selectedIndicators}
          onRemove={onRemoveIndicator}
        />

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={onStartDateChange}
          onEndChange={onEndDateChange}
          onSubmit={onFetchData}
          isLoading={isLoading}
          hasSelected={selectedIndicators.length > 0}
        />

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {errorMessage}
          </div>
        )}
      </div>
    </aside>
  );
}
