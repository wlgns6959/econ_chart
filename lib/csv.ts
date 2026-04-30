import { IndicatorSeries } from "@/types/data";

/**
 * 여러 IndicatorSeries를 날짜 기준 CSV 문자열로 변환합니다.
 *
 * 결과 예시:
 * date,소비자물가지수,석유류 CPI
 * 2024-01,113.2,105.4
 * 2024-02,113.8,108.1
 */
export function generateCsv(seriesList: IndicatorSeries[]): string {
  if (seriesList.length === 0) return "";

  // 모든 날짜 수집 & 정렬
  const dateSet = new Set<string>();
  for (const s of seriesList) {
    for (const d of s.data) {
      dateSet.add(d.date);
    }
  }
  const dates = Array.from(dateSet).sort();

  // 각 시리즈를 date → value 맵으로
  const seriesMaps = seriesList.map((s) => {
    const map = new Map<string, number>();
    for (const d of s.data) {
      map.set(d.date, d.value);
    }
    return map;
  });

  // 헤더
  const header = ["date", ...seriesList.map((s) => s.name)].join(",");

  // 행 생성
  const rows = dates.map((date) => {
    const values = seriesMaps.map((m) => {
      const v = m.get(date);
      return v !== undefined ? v.toString() : "";
    });
    return [date, ...values].join(",");
  });

  return [header, ...rows].join("\n");
}

/**
 * CSV 문자열을 파일로 다운로드합니다.
 */
export function downloadCsv(csv: string, filename: string) {
  // UTF-8 BOM 추가 (엑셀에서 한글 깨짐 방지)
  const bom = "\uFEFF";
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
