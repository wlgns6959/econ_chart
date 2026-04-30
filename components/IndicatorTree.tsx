"use client";

import { useState } from "react";
import { IndicatorTreeNode } from "@/types/indicator";
import { IndicatorMeta } from "@/types/indicator";

interface IndicatorTreeProps {
  tree: IndicatorTreeNode[];
  selectedIds: Set<string>;
  onSelect: (indicator: IndicatorMeta) => void;
  searchResults?: IndicatorMeta[] | null;
}

function TreeNode({
  node,
  selectedIds,
  onSelect,
  defaultExpanded = false,
}: {
  node: IndicatorTreeNode;
  selectedIds: Set<string>;
  onSelect: (indicator: IndicatorMeta) => void;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (node.type === "indicator") {
    const isSelected = selectedIds.has(node.id);
    return (
      <button
        onClick={() => node.indicator && onSelect(node.indicator)}
        disabled={isSelected}
        className={`w-full text-left pl-10 pr-3 py-1.5 text-sm transition-all rounded-md ${
          isSelected
            ? "bg-blue-50 text-blue-600 font-medium cursor-default"
            : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
        }`}
      >
        <span className="flex items-center gap-2">
          {isSelected ? (
            <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <span className="w-3.5 h-3.5 flex-shrink-0" />
          )}
          {node.label}
        </span>
      </button>
    );
  }

  const isSource = node.type === "source";

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-all rounded-md ${
          isSource
            ? "font-semibold text-slate-800 hover:bg-slate-100"
            : "pl-6 text-slate-600 font-medium hover:bg-slate-50"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform flex-shrink-0 text-slate-400 ${
            expanded ? "rotate-90" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {isSource && (
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              node.label === "ECOS"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {node.label}
          </span>
        )}
        {!isSource && <span className="text-sm">{node.label}</span>}
      </button>
      {expanded && node.children && (
        <div className="ml-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function IndicatorTree({
  tree,
  selectedIds,
  onSelect,
  searchResults,
}: IndicatorTreeProps) {
  // 검색 결과가 있으면 플랫 리스트로 표시
  if (searchResults !== null && searchResults !== undefined) {
    if (searchResults.length === 0) {
      return (
        <div className="py-8 text-center text-sm text-slate-400">
          검색 결과가 없습니다.
        </div>
      );
    }

    return (
      <div className="space-y-0.5">
        {searchResults.map((ind) => {
          const isSelected = selectedIds.has(ind.id);
          return (
            <button
              key={ind.id}
              onClick={() => onSelect(ind)}
              disabled={isSelected}
              className={`w-full text-left px-3 py-2 text-sm transition-all rounded-md ${
                isSelected
                  ? "bg-blue-50 text-blue-600 font-medium cursor-default"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {ind.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    ind.source === "ECOS"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {ind.source}
                </span>
              </div>
              {ind.description && (
                <p className="text-xs text-slate-400 mt-0.5 pl-5">
                  {ind.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // 트리 표시
  return (
    <div className="space-y-0.5">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          onSelect={onSelect}
          defaultExpanded
        />
      ))}
    </div>
  );
}
