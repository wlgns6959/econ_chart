import { ChartDataPoint, IndicatorSeries } from "@/types/data";
import { IndicatorMeta } from "@/types/indicator";

/**
 * ECOS API 응답을 IndicatorSeries로 변환합니다.
 *
 * ECOS StatisticSearch JSON 응답 구조:
 * {
 *   StatisticSearch: {
 *     row: [
 *       { TIME: "202401", DATA_VALUE: "3.5", ... },
 *       ...
 *     ]
 *   }
 * }
 */
export function normalizeEcosResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData: any,
  indicator: IndicatorMeta
): IndicatorSeries {
  const rows = rawData?.StatisticSearch?.row ?? [];

  const data: ChartDataPoint[] = rows
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((row: any) => {
      const time: string = row.TIME ?? "";
      const val = parseFloat(row.DATA_VALUE);

      // 날짜 포맷 정규화: "202401" → "2024-01"
      let date = time;
      if (time.length === 6) {
        date = `${time.slice(0, 4)}-${time.slice(4, 6)}`;
      } else if (time.length === 4) {
        date = time; // 연간 데이터
      } else if (time.length === 8) {
        date = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`;
      }

      return { date, value: val };
    })
    .filter((d: ChartDataPoint) => !isNaN(d.value));

  return {
    id: indicator.id,
    name: indicator.name,
    source: "ECOS",
    unit: indicator.unit,
    data,
  };
}

/**
 * KOSIS API 응답을 IndicatorSeries로 변환합니다.
 *
 * KOSIS statisticsParameterData 응답 구조:
 * [
 *   { PRD_DE: "202401", DT: "113.2", ... },
 *   ...
 * ]
 */
export function normalizeKosisResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData: any,
  indicator: IndicatorMeta
): IndicatorSeries {
  const rows = Array.isArray(rawData) ? rawData : [];

  const data: ChartDataPoint[] = rows
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((row: any) => {
      const time: string = row.PRD_DE ?? "";
      const val = parseFloat(row.DT);

      // 날짜 포맷 정규화: "202401" → "2024-01"
      let date = time;
      if (time.length === 6) {
        date = `${time.slice(0, 4)}-${time.slice(4, 6)}`;
      } else if (time.length === 4) {
        date = time;
      }

      return { date, value: val };
    })
    .filter((d: ChartDataPoint) => !isNaN(d.value));

  return {
    id: indicator.id,
    name: indicator.name,
    source: "KOSIS",
    unit: indicator.unit,
    data,
  };
}
