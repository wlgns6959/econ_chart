import { ChartDataPoint, IndicatorSeries } from "@/types/data";
import { IndicatorMeta } from "@/types/indicator";

type EcosRow = {
  TIME?: string;
  DATA_VALUE?: string;
};

type EcosResponse = {
  StatisticSearch?: {
    row?: EcosRow[];
  };
};

type KosisRow = {
  PRD_DE?: string;
  DT?: string;
  ITM_NM?: string;
};

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
  rawData: unknown,
  indicator: IndicatorMeta
): IndicatorSeries {
  const rows = (rawData as EcosResponse).StatisticSearch?.row ?? [];

  const data: ChartDataPoint[] = rows
    .map((row) => {
      const time: string = row.TIME ?? "";
      const val = parseFloat(row.DATA_VALUE ?? "");

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
  rawData: unknown,
  indicator: IndicatorMeta
): IndicatorSeries {
  const rows: KosisRow[] = Array.isArray(rawData) ? rawData : [];

  // KOSIS에서 itmId=ALL로 조회하면 여러 항목이 섞여 반환됨.
  // ITM_NM(항목명) 기준으로 첫 번째 항목의 데이터만 사용하거나,
  // 단일 항목이면 그대로 사용.
  const firstItemName = rows.length > 0 ? rows[0].ITM_NM : null;

  const data: ChartDataPoint[] = rows
    .filter((row) => {
      // 첫 번째 항목과 같은 항목만 필터
      if (firstItemName && row.ITM_NM !== firstItemName) return false;
      return true;
    })
    .map((row) => {
      const time: string = row.PRD_DE ?? "";
      const val = parseFloat(row.DT ?? "");

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
