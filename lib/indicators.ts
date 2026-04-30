import { IndicatorMeta } from "@/types/indicator";

/**
 * 지표 메타데이터 목록
 *
 * 새 지표를 추가하려면 이 배열에 객체를 추가하세요.
 * - ECOS 지표: statCode, itemCode1 등을 ECOS 통계코드검색에서 확인 후 입력
 *   (https://ecos.bok.or.kr/api/#/ → 개발가이드 → 통계코드검색)
 * - KOSIS 지표: orgId, tblId, objL1, itmId 등을 KOSIS 공유서비스에서 확인 후 입력
 *   (https://kosis.kr/openapi/index.do → 개발가이드 → 통계자료 → URL 생성)
 */
export const indicators: IndicatorMeta[] = [
  // ═══════════════════════════════════════
  // ECOS — 금리
  // ═══════════════════════════════════════
  {
    id: "ecos_base_rate",
    name: "한국은행 기준금리",
    source: "ECOS",
    category: "금리",
    unit: "% 연",
    frequency: "M",
    description: "한국은행 기준금리 (월평균)",
    treePath: ["ECOS", "금리", "한국은행 기준금리"],
    keywords: ["기준금리", "한은", "금리", "BOK", "base rate"],
    // ✅ 실제 코드 — ECOS 통계코드검색에서 확인
    // 한국은행 기준금리: 통계표 722Y001, 항목 0101000
    statCode: "722Y001",
    itemCode1: "0101000",
  },
  {
    id: "ecos_gov_bond_3y",
    name: "국고채 3년 금리",
    source: "ECOS",
    category: "금리",
    unit: "% 연",
    frequency: "M",
    description: "국고채 3년물 유통수익률 (월평균)",
    treePath: ["ECOS", "금리", "국고채 3년 금리"],
    keywords: ["국고채", "3년", "금리", "국채", "government bond"],
    // 주요 시장금리: 통계표 817Y002, 항목 010200000 (확인 필요)
    statCode: "817Y002",
    itemCode1: "010200000",
  },
  {
    id: "ecos_corp_bond",
    name: "회사채 금리 (AA-)",
    source: "ECOS",
    category: "금리",
    unit: "% 연",
    frequency: "M",
    description: "회사채 AA- 등급 유통수익률 (월평균)",
    treePath: ["ECOS", "금리", "회사채 금리 (AA-)"],
    keywords: ["회사채", "AA", "금리", "corporate bond"],
    // 주요 시장금리: 통계표 817Y002, 항목 010300000 (확인 필요)
    statCode: "817Y002",
    itemCode1: "010300000",
  },

  // ═══════════════════════════════════════
  // ECOS — 금융
  // ═══════════════════════════════════════
  {
    id: "ecos_m2",
    name: "통화량 M2",
    source: "ECOS",
    category: "금융",
    unit: "십억원",
    frequency: "M",
    description: "광의통화 M2 (평잔, 원계열)",
    treePath: ["ECOS", "금융", "통화량 M2"],
    keywords: ["통화량", "M2", "광의통화", "money supply"],
    // TODO: ECOS에서 정확한 statCode, itemCode 확인 후 교체
    statCode: "101Y003",
    itemCode1: "BBGA00",
  },
  {
    id: "ecos_household_loan",
    name: "가계대출",
    source: "ECOS",
    category: "금융",
    unit: "십억원",
    frequency: "M",
    description: "예금취급기관 가계대출 잔액",
    treePath: ["ECOS", "금융", "가계대출"],
    keywords: ["가계대출", "가계", "대출", "household loan"],
    // TODO: ECOS에서 정확한 statCode, itemCode 확인 후 교체
    statCode: "008Y001",
    itemCode1: "BBLA00",
  },

  // ═══════════════════════════════════════
  // ECOS — 환율
  // ═══════════════════════════════════════
  {
    id: "ecos_usd_krw",
    name: "원/달러 환율",
    source: "ECOS",
    category: "환율",
    unit: "원",
    frequency: "M",
    description: "원/달러 환율 (매매기준율, 월평균)",
    treePath: ["ECOS", "환율", "원/달러 환율"],
    keywords: ["환율", "달러", "USD", "KRW", "exchange rate"],
    // 주요국 통화의 대원화 환율: 통계표 036Y001, 항목 0000001 (확인 필요)
    statCode: "036Y001",
    itemCode1: "0000001",
  },

  // ═══════════════════════════════════════
  // KOSIS — 물가
  // ═══════════════════════════════════════
  {
    id: "kosis_cpi",
    name: "소비자물가지수",
    source: "KOSIS",
    category: "물가",
    unit: "2020=100",
    frequency: "M",
    description: "소비자물가지수 (총지수)",
    treePath: ["KOSIS", "물가", "소비자물가지수"],
    keywords: ["CPI", "소비자물가", "물가", "consumer price"],
    // KOSIS 코드 — 공유서비스에서 URL 생성으로 확인
    orgId: "101",
    tblId: "DT_1J04001",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },
  {
    id: "kosis_core_cpi",
    name: "근원 소비자물가지수",
    source: "KOSIS",
    category: "물가",
    unit: "2020=100",
    frequency: "M",
    description: "근원 소비자물가지수 (식료품 및 에너지 제외)",
    treePath: ["KOSIS", "물가", "근원 소비자물가지수"],
    keywords: ["근원물가", "core CPI", "근원", "core inflation"],
    // TODO: KOSIS에서 정확한 코드 확인 후 교체
    orgId: "101",
    tblId: "DT_1J04001",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },
  {
    id: "kosis_oil_cpi",
    name: "석유류 CPI",
    source: "KOSIS",
    category: "물가",
    unit: "2020=100",
    frequency: "M",
    description: "석유류 소비자물가지수",
    treePath: ["KOSIS", "물가", "석유류 CPI"],
    keywords: ["석유류", "유류", "oil", "에너지", "energy"],
    // TODO: KOSIS에서 정확한 코드 확인 후 교체
    orgId: "101",
    tblId: "DT_1J04001",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },

  // ═══════════════════════════════════════
  // KOSIS — 고용
  // ═══════════════════════════════════════
  {
    id: "kosis_employment_rate",
    name: "고용률",
    source: "KOSIS",
    category: "고용",
    unit: "%",
    frequency: "M",
    description: "15세 이상 고용률",
    treePath: ["KOSIS", "고용", "고용률"],
    keywords: ["고용률", "고용", "employment rate", "취업"],
    orgId: "101",
    tblId: "DT_1DA7001S",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },
  {
    id: "kosis_unemployment_rate",
    name: "실업률",
    source: "KOSIS",
    category: "고용",
    unit: "%",
    frequency: "M",
    description: "15세 이상 실업률",
    treePath: ["KOSIS", "고용", "실업률"],
    keywords: ["실업률", "실업", "unemployment", "미취업"],
    orgId: "101",
    tblId: "DT_1DA7001S",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },

  // ═══════════════════════════════════════
  // KOSIS — 경기
  // ═══════════════════════════════════════
  {
    id: "kosis_industrial_production",
    name: "산업생산지수",
    source: "KOSIS",
    category: "경기",
    unit: "2020=100",
    frequency: "M",
    description: "광공업 산업생산지수",
    treePath: ["KOSIS", "경기", "산업생산지수"],
    keywords: ["산업생산", "생산지수", "industrial production", "광공업"],
    // TODO: KOSIS에서 정확한 코드 확인 후 교체
    orgId: "101",
    tblId: "DT_1C81",
    objL1: "ALL",
    objL2: "ALL",
    itmId: "T1",
    prdSe: "M",
  },
];
