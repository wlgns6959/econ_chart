import { NextRequest, NextResponse } from "next/server";
import { fetchKosisData } from "@/lib/kosis";
import { normalizeKosisResponse } from "@/lib/normalize";
import { indicators } from "@/lib/indicators";

/**
 * KOSIS API 프록시 라우트
 *
 * POST /api/kosis
 * Body: { indicatorId: string, startDate: string, endDate: string }
 *
 * API Key는 서버 환경변수에서만 읽으므로 클라이언트에 노출되지 않습니다.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { indicatorId, startDate, endDate } = body;

    // 1. API Key 확인
    const apiKey = process.env.KOSIS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "KOSIS_API_KEY 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 2. 지표 메타데이터 찾기
    const indicator = indicators.find((ind) => ind.id === indicatorId);
    if (!indicator) {
      return NextResponse.json(
        { error: `지표를 찾을 수 없습니다: ${indicatorId}` },
        { status: 400 }
      );
    }

    if (!indicator.orgId || !indicator.tblId) {
      return NextResponse.json(
        { error: `이 지표의 KOSIS 코드(orgId/tblId)가 설정되지 않았습니다.` },
        { status: 400 }
      );
    }

    // 3. 날짜 포맷 변환 (YYYY-MM → YYYYMM)
    const formattedStart = startDate.replace(/-/g, "");
    const formattedEnd = endDate.replace(/-/g, "");

    // 4. KOSIS API 호출
    const rawData = await fetchKosisData({
      apiKey,
      orgId: indicator.orgId,
      tblId: indicator.tblId,
      objL1: indicator.objL1,
      objL2: indicator.objL2,
      itmId: indicator.itmId,
      prdSe: indicator.prdSe ?? "M",
      startPrdDe: formattedStart,
      endPrdDe: formattedEnd,
    });

    // 5. 정규화
    const series = normalizeKosisResponse(rawData, indicator);

    if (series.data.length === 0) {
      return NextResponse.json(
        { error: "조회된 데이터가 없습니다. 지표 코드 또는 기간을 확인해주세요." },
        { status: 404 }
      );
    }

    return NextResponse.json(series);
  } catch (error) {
    console.error("KOSIS API 에러:", error);
    const message =
      error instanceof Error
        ? error.message
        : "데이터를 불러오지 못했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
