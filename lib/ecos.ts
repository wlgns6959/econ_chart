/**
 * ECOS API 호출 유틸리티
 *
 * 이 파일은 서버 사이드에서만 사용됩니다 (API Route에서 import).
 * 클라이언트에서는 /api/ecos 엔드포인트를 통해 간접 호출합니다.
 */

const ECOS_BASE_URL = "https://ecos.bok.or.kr/api/StatisticSearch";

export interface EcosParams {
  apiKey: string;
  statCode: string;
  cycle: string; // D, M, Q, A
  startDate: string; // YYYYMM or YYYYMMDD
  endDate: string;
  itemCode1?: string;
  itemCode2?: string;
  itemCode3?: string;
  itemCode4?: string;
}

/**
 * ECOS StatisticSearch API를 호출합니다.
 */
export async function fetchEcosData(params: EcosParams) {
  const {
    apiKey,
    statCode,
    cycle,
    startDate,
    endDate,
    itemCode1 = "",
    itemCode2 = "",
    itemCode3 = "",
    itemCode4 = "",
  } = params;

  // URL 구성: /인증키/요청유형/언어/시작건수/종료건수/통계표코드/주기/시작일/종료일/항목코드1/항목코드2/항목코드3/항목코드4
  const urlParts = [
    ECOS_BASE_URL,
    apiKey,
    "json",
    "kr",
    "1",
    "100000", // 최대 건수
    statCode,
    cycle,
    startDate,
    endDate,
  ];

  // 항목 코드 추가 (빈 문자열이 아닌 경우)
  if (itemCode1) urlParts.push(itemCode1);
  if (itemCode2) urlParts.push(itemCode2);
  if (itemCode3) urlParts.push(itemCode3);
  if (itemCode4) urlParts.push(itemCode4);

  const url = urlParts.join("/");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`ECOS API 호출 실패: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // ECOS 에러 체크
  if (data?.RESULT) {
    throw new Error(`ECOS API 에러: ${data.RESULT.MESSAGE}`);
  }

  return data;
}
