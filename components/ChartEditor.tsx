"use client";

import { IndicatorSeries } from "@/types/data";
import { ChartSettings } from "@/types/chart";
import ChartView from "./ChartView";
import StylePanel from "./StylePanel";
import DataTable from "./DataTable";
import DownloadButtons from "./DownloadButtons";

interface ChartEditorProps {
  seriesList: IndicatorSeries[];
  settings: ChartSettings;
  onSettingsChange: (settings: ChartSettings) => void;
}

export default function ChartEditor({
  seriesList,
  settings,
  onSettingsChange,
}: ChartEditorProps) {
  return (
    <div className="space-y-5">
      {/* 차트 */}
      <ChartView seriesList={seriesList} settings={settings} />

      {/* 차트 편집 + 다운로드 */}
      {seriesList.length > 0 && (
        <>
          <StylePanel
            settings={settings}
            onSettingsChange={onSettingsChange}
            seriesList={seriesList}
          />

          <div className="flex items-center justify-between">
            <DownloadButtons seriesList={seriesList} settings={settings} />
          </div>

          <DataTable seriesList={seriesList} />
        </>
      )}
    </div>
  );
}
