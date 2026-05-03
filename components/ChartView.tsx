"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { IndicatorSeries } from "@/types/data";
import { ChartSettings } from "@/types/chart";
import { buildPlotlyConfig } from "@/lib/chartConfig";

// Plotly는 SSR에서 window 객체 때문에 에러 발생 → 클라이언트에서만 로드
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-slate-50 rounded-xl">
      <div className="text-sm text-slate-400">차트 로딩 중...</div>
    </div>
  ),
});

interface ChartViewProps {
  seriesList: IndicatorSeries[];
  settings: ChartSettings;
}

export default function ChartView({
  seriesList,
  settings,
}: ChartViewProps) {
  const { traces, layout } = useMemo(
    () => buildPlotlyConfig(seriesList, settings),
    [seriesList, settings]
  );

  if (seriesList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border-2 border-dashed border-slate-200">
        <svg
          className="w-16 h-16 text-slate-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-slate-400 text-sm">
          왼쪽에서 지표를 선택하고 데이터를 조회하세요
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <Plot
        divId="economic-indicator-plot"
        data={traces}
        layout={{
          ...layout,
          autosize: true,
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ["lasso2d", "select2d"],
        }}
        useResizeHandler
        style={{ width: "100%", height: "420px" }}
      />
    </div>
  );
}
