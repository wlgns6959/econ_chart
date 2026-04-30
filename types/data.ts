// 차트 데이터 포인트 (날짜 + 값)
export type ChartDataPoint = {
  date: string;   // "2024-01" 형식
  value: number;
};

// 정규화된 지표 시계열 데이터
export type IndicatorSeries = {
  id: string;
  name: string;
  source: "ECOS" | "KOSIS";
  unit?: string;
  data: ChartDataPoint[];
};
