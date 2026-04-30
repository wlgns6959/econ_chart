"use client";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  hasSelected: boolean;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onSubmit,
  isLoading,
  hasSelected,
}: DateRangePickerProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            시작
          </label>
          <input
            id="date-start"
            type="month"
            value={startDate}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            종료
          </label>
          <input
            id="date-end"
            type="month"
            value={endDate}
            onChange={(e) => onEndChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        id="fetch-data-button"
        onClick={onSubmit}
        disabled={isLoading || !hasSelected}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
          isLoading || !hasSelected
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md active:scale-[0.98]"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            데이터를 불러오는 중...
          </span>
        ) : (
          "🔍 데이터 조회"
        )}
      </button>
    </div>
  );
}
