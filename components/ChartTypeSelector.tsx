"use client";

interface ChartTypeSelectorProps {
  chartType: "line" | "bar" | "scatter";
  onChange: (type: "line" | "bar" | "scatter") => void;
}

const chartTypes = [
  { value: "line" as const, label: "Line", icon: "📈" },
  { value: "bar" as const, label: "Bar", icon: "📊" },
  { value: "scatter" as const, label: "Scatter", icon: "⚬" },
];

export default function ChartTypeSelector({
  chartType,
  onChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="flex gap-1">
      {chartTypes.map((ct) => (
        <button
          key={ct.value}
          onClick={() => onChange(ct.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            chartType === ct.value
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <span>{ct.icon}</span>
          {ct.label}
        </button>
      ))}
    </div>
  );
}
