import { CHART_COLORS } from "@/types/chart";
import type { ChartSettings, SeriesStyle } from "@/types/chart";
import type { IndicatorSeries } from "@/types/data";

/**
 * IndicatorSeries 배열에서 기본 seriesStyles를 생성합니다.
 * 이미 설정이 있으면 유지하고, 새 시리즈만 기본값 추가.
 */
export function ensureSeriesStyles(
  seriesList: IndicatorSeries[],
  existing: Record<string, SeriesStyle>
): Record<string, SeriesStyle> {
  const result = { ...existing };

  seriesList.forEach((s, i) => {
    if (!result[s.id]) {
      result[s.id] = {
        label: s.name,
        color: CHART_COLORS[i % CHART_COLORS.length],
        lineWidth: 2,
      };
    }
  });

  return result;
}

/**
 * ChartSettings + IndicatorSeries[] → Plotly data + layout 변환
 */
export function buildPlotlyConfig(
  seriesList: IndicatorSeries[],
  settings: ChartSettings
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traces: any[] = seriesList.map((s) => {
    const style = settings.seriesStyles[s.id] ?? {
      label: s.name,
      color: "#2563eb",
      lineWidth: 2,
    };

    const base = {
      x: s.data.map((d) => d.date),
      y: s.data.map((d) => d.value),
      name: style.label,
    };

    if (settings.chartType === "line") {
      return {
        ...base,
        type: "scatter" as const,
        mode: "lines+markers" as const,
        line: { color: style.color, width: style.lineWidth },
        marker: { color: style.color, size: 4 },
      };
    } else if (settings.chartType === "bar") {
      return {
        ...base,
        type: "bar" as const,
        marker: { color: style.color },
      };
    } else {
      // scatter
      return {
        ...base,
        type: "scatter" as const,
        mode: "markers" as const,
        marker: { color: style.color, size: 6 },
      };
    }
  });

  const layout = {
    title: {
      text: settings.title,
      font: { size: settings.fontSize + 4 },
    },
    xaxis: {
      title: { text: settings.xAxisTitle },
      tickangle: settings.xAxisTickAngle,
      tickfont: { size: settings.fontSize },
    },
    yaxis: {
      title: { text: settings.yAxisTitle },
      tickfont: { size: settings.fontSize },
    },
    showlegend: settings.showLegend,
    legend: {
      font: { size: settings.fontSize },
    },
    font: {
      size: settings.fontSize,
    },
    margin: { t: 60, r: 30, b: 80, l: 70 },
    autosize: true,
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
  };

  return { traces, layout };
}
