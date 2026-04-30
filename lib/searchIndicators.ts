import { IndicatorMeta } from "@/types/indicator";

/**
 * 지표 목록에서 검색어에 맞는 지표를 필터링합니다.
 *
 * 검색 대상: name, source, category, description, unit, keywords
 * 대소문자 무시, 공백 무시, 부분 일치
 *
 * 나중에 서버 검색 또는 DB 검색으로 교체할 수 있도록
 * 이 파일에 검색 로직을 분리합니다.
 */
export function searchIndicators(
  indicatorList: IndicatorMeta[],
  query: string
): IndicatorMeta[] {
  if (!query || query.trim() === "") {
    return indicatorList;
  }

  const normalizedQuery = query.trim().toLowerCase().replace(/\s+/g, "");

  return indicatorList.filter((ind) => {
    const searchableFields = [
      ind.name,
      ind.source,
      ind.category,
      ind.description ?? "",
      ind.unit ?? "",
      ...(ind.keywords ?? []),
    ];

    return searchableFields.some((field) => {
      const normalizedField = field.toLowerCase().replace(/\s+/g, "");
      return normalizedField.includes(normalizedQuery);
    });
  });
}
