// 차트 편집 설정 타입
export type SeriesStyle = {
  label: string;
  color: string;
  lineWidth: number;
};

export type ChartSettings = {
  chartType: "line" | "bar" | "scatter";
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  showLegend: boolean;
  fontSize: number;
  xAxisTickAngle: number;
  lineWidth: number;
  yAxisMode: "single" | "dual";
  seriesStyles: {
    [seriesId: string]: SeriesStyle;
  };
};

// 기본 차트 설정값
export const DEFAULT_CHART_SETTINGS: ChartSettings = {
  chartType: "line",
  title: "경제지표 차트",
  xAxisTitle: "",
  yAxisTitle: "",
  showLegend: true,
  fontSize: 12,
  xAxisTickAngle: -45,
  lineWidth: 2,
  yAxisMode: "single",
  seriesStyles: {},
};

// 차트 색상 팔레트
export const CHART_COLORS = [
  "#2563eb", // blue
  "#dc2626", // red
  "#16a34a", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#f97316", // orange
];
