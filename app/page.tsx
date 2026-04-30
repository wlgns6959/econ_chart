import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-4.5 h-4.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">
              경제지표 차트 생성기
            </h1>
            <p className="text-[11px] text-slate-400 leading-tight">
              ECOS · KOSIS 데이터 기반 시계열 차트
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[10px] font-semibold bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            MVP
          </span>
        </div>
      </header>

      {/* 대시보드 */}
      <Dashboard />
    </>
  );
}
