"use client";

import { ChartSettings } from "@/types/chart";
import { IndicatorSeries } from "@/types/data";
import ChartTypeSelector from "./ChartTypeSelector";

interface StylePanelProps {
  settings: ChartSettings;
  onSettingsChange: (settings: ChartSettings) => void;
  seriesList: IndicatorSeries[];
}

export default function StylePanel({
  settings,
  onSettingsChange,
  seriesList,
}: StylePanelProps) {
  const update = (partial: Partial<ChartSettings>) => {
    onSettingsChange({ ...settings, ...partial });
  };

  const updateSeriesStyle = (
    seriesId: string,
    field: string,
    value: string | number
  ) => {
    onSettingsChange({
      ...settings,
      seriesStyles: {
        ...settings.seriesStyles,
        [seriesId]: {
          ...settings.seriesStyles[seriesId],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* 헤더 */}
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">차트 설정</h3>
      </div>

      <div className="p-5 space-y-5">
        {/* 차트 종류 */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">
            차트 종류
          </label>
          <ChartTypeSelector
            chartType={settings.chartType}
            onChange={(type) => update({ chartType: type })}
          />
        </div>

        {/* 제목 입력 */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              차트 제목
            </label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="차트 제목"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                X축 제목
              </label>
              <input
                type="text"
                value={settings.xAxisTitle}
                onChange={(e) => update({ xAxisTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="기간"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Y축 제목
              </label>
              <input
                type="text"
                value={settings.yAxisTitle}
                onChange={(e) => update({ yAxisTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="값"
              />
            </div>
          </div>
        </div>

        {/* 범례 / 폰트 / 기울기 */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              범례
            </label>
            <button
              onClick={() => update({ showLegend: !settings.showLegend })}
              className={`w-full px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                settings.showLegend
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
            >
              {settings.showLegend ? "표시" : "숨김"}
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              폰트 크기
            </label>
            <input
              type="number"
              value={settings.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              min={8}
              max={24}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              X축 기울기
            </label>
            <input
              type="number"
              value={settings.xAxisTickAngle}
              onChange={(e) =>
                update({ xAxisTickAngle: Number(e.target.value) })
              }
              min={-90}
              max={90}
              step={15}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 시리즈별 설정 */}
        {seriesList.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              시리즈별 설정
            </label>
            <div className="space-y-2">
              {seriesList.map((s) => {
                const style = settings.seriesStyles[s.id];
                if (!style) return null;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg"
                  >
                    {/* 색상 */}
                    <input
                      type="color"
                      value={style.color}
                      onChange={(e) =>
                        updateSeriesStyle(s.id, "color", e.target.value)
                      }
                      className="w-8 h-8 rounded border border-slate-200 cursor-pointer flex-shrink-0"
                      title="색상"
                    />
                    {/* 범례 이름 */}
                    <input
                      type="text"
                      value={style.label}
                      onChange={(e) =>
                        updateSeriesStyle(s.id, "label", e.target.value)
                      }
                      className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
                      placeholder="범례 이름"
                    />
                    {/* 선 굵기 */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-[10px] text-slate-400">굵기</span>
                      <input
                        type="number"
                        value={style.lineWidth}
                        onChange={(e) =>
                          updateSeriesStyle(
                            s.id,
                            "lineWidth",
                            Number(e.target.value)
                          )
                        }
                        min={1}
                        max={8}
                        className="w-14 px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
