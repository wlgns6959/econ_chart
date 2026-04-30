import { IndicatorMeta, IndicatorTreeNode } from "@/types/indicator";

/**
 * 지표 배열을 트리 구조로 변환합니다.
 * 구조: 출처(ECOS/KOSIS) → 카테고리 → 지표
 */
export function buildIndicatorTree(
  indicatorList: IndicatorMeta[]
): IndicatorTreeNode[] {
  // 출처별로 그룹핑
  const sourceMap = new Map<string, Map<string, IndicatorMeta[]>>();

  for (const ind of indicatorList) {
    if (!sourceMap.has(ind.source)) {
      sourceMap.set(ind.source, new Map());
    }
    const catMap = sourceMap.get(ind.source)!;
    if (!catMap.has(ind.category)) {
      catMap.set(ind.category, []);
    }
    catMap.get(ind.category)!.push(ind);
  }

  // 트리 노드 생성
  const tree: IndicatorTreeNode[] = [];

  // 출처 순서 고정: ECOS → KOSIS
  const sourceOrder: Array<"ECOS" | "KOSIS"> = ["ECOS", "KOSIS"];

  for (const source of sourceOrder) {
    const catMap = sourceMap.get(source);
    if (!catMap) continue;

    const categoryNodes: IndicatorTreeNode[] = [];

    for (const [category, items] of catMap.entries()) {
      const indicatorNodes: IndicatorTreeNode[] = items.map((ind) => ({
        id: ind.id,
        label: ind.name,
        type: "indicator" as const,
        indicator: ind,
      }));

      categoryNodes.push({
        id: `${source}_${category}`,
        label: category,
        type: "category",
        children: indicatorNodes,
      });
    }

    tree.push({
      id: source,
      label: source,
      type: "source",
      children: categoryNodes,
    });
  }

  return tree;
}
