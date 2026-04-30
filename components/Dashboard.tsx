"use client";

import { useState, useCallback } from "react";
import { IndicatorMeta } from "@/types/indicator";
import { IndicatorSeries } from "@/types/data";
import { ChartSettings, DEFAULT_CHART_SETTINGS } from "@/types/chart";
import { ensureSeriesStyles } from "@/lib/chartConfig";
import LeftPanel from "./LeftPanel";
import ChartEditor from "./ChartEditor";

export default function Dashboard() {
  // ── 왼쪽 패널 상태 ──
  const [selectedIndicators, setSelectedIndicators] = useState<IndicatorMeta[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"ALL" | "ECOS" | "KOSIS">(
    "ALL"
  );
  const [startDate, setStartDate] = useState("2020-01");
  const [endDate, setEndDate] = useState("2024-12");

  // ── 데이터 상태 ──
  const [seriesList, setSeriesList] = useState<IndicatorSeries[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── 차트 설정 상태 ──
  const [chartSettings, setChartSettings] =
    useState<ChartSettings>(DEFAULT_CHART_SETTINGS);

  // ── 지표 선택/제거 ──
  const handleSelectIndicator = useCallback((indicator: IndicatorMeta) => {
    setSelectedIndicators((prev) => {
      if (prev.some((ind) => ind.id === indicator.id)) return prev;
      return [...prev, indicator];
    });
  }, []);

  const handleRemoveIndicator = useCallback((id: string) => {
    setSelectedIndicators((prev) => prev.filter((ind) => ind.id !== id));
    // 데이터에서도 제거
    setSeriesList((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ── 데이터 조회 ──
  const handleFetchData = useCallback(async () => {
    if (selectedIndicators.length === 0) {
      setErrorMessage("지표를 선택해주세요.");
      return;
    }

    // 날짜 검증
    if (startDate >= endDate) {
      setErrorMessage("시작일이 종료일보다 이후입니다. 기간을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const results: IndicatorSeries[] = [];
      const errors: string[] = [];

      // 각 지표에 대해 API 호출
      for (const indicator of selectedIndicators) {
        try {
          const endpoint =
            indicator.source === "ECOS" ? "/api/ecos" : "/api/kosis";

          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              indicatorId: indicator.id,
              startDate,
              endDate,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            errors.push(`${indicator.name}: ${data.error}`);
            continue;
          }

          results.push(data as IndicatorSeries);
        } catch {
          errors.push(
            `${indicator.name}: 데이터를 불러오지 못했습니다.`
          );
        }
      }

      if (results.length > 0) {
        setSeriesList(results);

        // 차트 설정 업데이트 — 시리즈 스타일 보장
        setChartSettings((prev) => ({
          ...prev,
          seriesStyles: ensureSeriesStyles(results, prev.seriesStyles),
        }));
      }

      if (errors.length > 0) {
        setErrorMessage(errors.join("\n"));
      }

      if (results.length === 0 && errors.length === 0) {
        setErrorMessage("조회된 데이터가 없습니다.");
      }
    } catch {
      setErrorMessage(
        "데이터를 불러오지 못했습니다. API 키 또는 지표 코드를 확인해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedIndicators, startDate, endDate]);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* 왼쪽 패널 */}
      <LeftPanel
        selectedIndicators={selectedIndicators}
        onSelectIndicator={handleSelectIndicator}
        onRemoveIndicator={handleRemoveIndicator}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sourceFilter={sourceFilter}
        onSourceFilterChange={setSourceFilter}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFetchData={handleFetchData}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />

      {/* 오른쪽 메인 영역 */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
        {isLoading && seriesList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96">
            <svg
              className="w-10 h-10 text-blue-500 animate-spin mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-sm text-slate-500">
              경제지표 데이터를 불러오는 중입니다...
            </p>
          </div>
        )}

        <ChartEditor
          seriesList={seriesList}
          settings={chartSettings}
          onSettingsChange={setChartSettings}
        />
      </main>
    </div>
  );
}
