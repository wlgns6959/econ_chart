"use client";

import { IndicatorMeta } from "@/types/indicator";

const MAX_INDICATORS = 4;

interface SelectedIndicatorsProps {
  selected: IndicatorMeta[];
  onRemove: (id: string) => void;
}

export default function SelectedIndicators({
  selected,
  onRemove,
}: SelectedIndicatorsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          선택된 지표
        </h3>
        <span className="text-xs text-slate-400">
          {selected.length}/{MAX_INDICATORS}
        </span>
      </div>

      {selected.length === 0 ? (
        <p className="text-sm text-slate-400 py-3 text-center">
          지표를 선택해주세요
        </p>
      ) : (
        <div className="space-y-1">
          {selected.map((ind) => (
            <div
              key={ind.id}
              className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    ind.source === "ECOS"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {ind.source}
                </span>
                <span className="text-sm text-slate-700 truncate">
                  {ind.name}
                </span>
              </div>
              <button
                onClick={() => onRemove(ind.id)}
                className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                title="선택 해제"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
