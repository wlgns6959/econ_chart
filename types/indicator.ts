// 지표 메타데이터 타입 — 각 경제지표의 정보를 정의
export type IndicatorMeta = {
  id: string;
  name: string;
  source: "ECOS" | "KOSIS";
  category: string;
  unit?: string;
  frequency?: "D" | "M" | "Q" | "A";
  description?: string;

  // 트리 표시용 경로 (예: ["ECOS", "금리", "한국은행 기준금리"])
  treePath?: string[];

  // 검색용 키워드
  keywords?: string[];

  // ── ECOS 전용 필드 ──
  statCode?: string;
  itemCode1?: string;
  itemCode2?: string;
  itemCode3?: string;
  itemCode4?: string;

  // ── KOSIS 전용 필드 ──
  orgId?: string;
  tblId?: string;
  objL1?: string;
  objL2?: string;
  itmId?: string;
  prdSe?: string;
};

// 트리 노드 타입 — 지표 탐색용 트리 구조
export type IndicatorTreeNode = {
  id: string;
  label: string;
  type: "source" | "category" | "indicator";
  children?: IndicatorTreeNode[];
  indicator?: IndicatorMeta;
};
