/**
 * KOSIS API 호출 유틸리티
 *
 * 이 파일은 서버 사이드에서만 사용됩니다 (API Route에서 import).
 * 클라이언트에서는 /api/kosis 엔드포인트를 통해 간접 호출합니다.
 */

const KOSIS_BASE_URL =
  "https://kosis.kr/openapi/Param/statisticsParameterData.do";

export interface KosisParams {
  apiKey: string;
  orgId: string;
  tblId: string;
  objL1?: string;
  objL2?: string;
  itmId?: string;
  prdSe?: string; // M, Y, Q
  startPrdDe: string; // YYYYMM
  endPrdDe: string;
}

/**
 * KOSIS 통계자료 API를 호출합니다.
 */
export async function fetchKosisData(params: KosisParams) {
  const {
    apiKey,
    orgId,
    tblId,
    objL1 = "ALL",
    objL2 = "ALL",
    itmId = "ALL",
    prdSe = "M",
    startPrdDe,
    endPrdDe,
  } = params;

  const queryParams = new URLSearchParams({
    method: "getList",
    apiKey,
    orgId,
    tblId,
    objL1,
    objL2,
    itmId,
    prdSe,
    startPrdDe,
    endPrdDe,
    format: "json",
    jsonVD: "Y",
  });

  const url = `${KOSIS_BASE_URL}?${queryParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `KOSIS API 호출 실패: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  // KOSIS 에러 체크 (에러 시 { err: "...", errMsg: "..." } 반환)
  if (data?.err) {
    throw new Error(`KOSIS API 에러: ${data.errMsg || data.err}`);
  }

  return data;
}
