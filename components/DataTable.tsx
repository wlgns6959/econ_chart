"use client";

import { IndicatorSeries } from "@/types/data";

interface DataTableProps {
  seriesList: IndicatorSeries[];
}

export default function DataTable({ seriesList }: DataTableProps) {
  if (seriesList.length === 0) return null;

  // 모든 날짜 수집 & 정렬
  const dateSet = new Set<string>();
  for (const s of seriesList) {
    for (const d of s.data) {
      dateSet.add(d.date);
    }
  }
  const dates = Array.from(dateSet).sort();

  // 시리즈 → date → value 맵
  const seriesMaps = seriesList.map((s) => {
    const map = new Map<string, number>();
    for (const d of s.data) {
      map.set(d.date, d.value);
    }
    return map;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">데이터 테이블</h3>
        <span className="text-xs text-slate-400">{dates.length}행</span>
      </div>
      <div className="overflow-x-auto max-h-80">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                날짜
              </th>
              {seriesList.map((s) => (
                <th
                  key={s.id}
                  className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {s.name}
                  {s.unit && (
                    <span className="font-normal text-slate-400 ml-1">
                      ({s.unit})
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dates.map((date, i) => (
              <tr
                key={date}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-4 py-2 text-slate-700 font-mono text-xs">
                  {date}
                </td>
                {seriesMaps.map((m, j) => {
                  const v = m.get(date);
                  return (
                    <td
                      key={j}
                      className="px-4 py-2 text-right text-slate-600 font-mono text-xs"
                    >
                      {v !== undefined ? v.toLocaleString() : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
