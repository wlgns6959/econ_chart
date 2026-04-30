"use client";

import { IndicatorSeries } from "@/types/data";
import { ChartSettings } from "@/types/chart";
import { generateCsv, downloadCsv } from "@/lib/csv";

interface DownloadButtonsProps {
  seriesList: IndicatorSeries[];
  settings: ChartSettings;
}

export default function DownloadButtons({
  seriesList,
  settings,
}: DownloadButtonsProps) {
  if (seriesList.length === 0) return null;

  const today = new Date().toISOString().slice(0, 10);

  const handleDownloadImage = async () => {
    try {
      // Plotly가 이미 로드된 상태에서 window 객체를 통해 접근
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Plotly = (window as any).Plotly;
      const plotEl = document.querySelector(".js-plotly-plot") as HTMLElement;

      if (!plotEl || !Plotly) {
        alert("차트를 찾을 수 없습니다.");
        return;
      }

      const dataUrl = await Plotly.toImage(plotEl, {
        format: "png",
        width: 1200,
        height: 600,
        scale: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${settings.title || "차트"}_${today}.png`;
      link.click();
    } catch {
      alert("이미지 다운로드에 실패했습니다.");
    }
  };

  const handleDownloadCsv = () => {
    const csv = generateCsv(seriesList);
    const filename = `${settings.title || "경제지표"}_데이터_${today}.csv`;
    downloadCsv(csv, filename);
  };

  return (
    <div className="flex gap-2">
      <button
        id="download-png-button"
        onClick={handleDownloadImage}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        차트 이미지 다운로드
      </button>
      <button
        id="download-csv-button"
        onClick={handleDownloadCsv}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        CSV 다운로드
      </button>
    </div>
  );
}
