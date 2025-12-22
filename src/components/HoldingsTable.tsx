"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/ui/format";

type SortKey = "cmp" | "pnl" | null;

export function HoldingsTable({ stocks }: any) {
  const [sortKey, setSortKey] = useState<SortKey>(null);

  const sortedStocks = [...stocks].sort((a, b) => {
    if (!sortKey) return 0;

    if (sortKey === "cmp") {
      return (b.cmp ?? -Infinity) - (a.cmp ?? -Infinity);
    }

    if (sortKey === "pnl") {
      return (b.gainLoss ?? -Infinity) - (a.gainLoss ?? -Infinity);
    }

    return 0;
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <h2 className="px-4 py-3 text-lg font-semibold border-b">
        Holdings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="text-gray-700 font-semibold">
              <th className="px-4 py-3 text-left">Name</th>

              <th className="px-4 py-3 text-center">Qty</th>

              <th className="px-4 py-3 text-center">Avg</th>

              <th
                className="px-4 py-3 text-center cursor-pointer select-none"
                onClick={() =>
                  setSortKey((prev) => (prev === "cmp" ? null : "cmp"))
                }
              >
                CMP {sortKey === "cmp" && "↓"}
              </th>

              <th
                className="px-4 py-3 text-center cursor-pointer select-none"
                onClick={() =>
                  setSortKey((prev) => (prev === "pnl" ? null : "pnl"))
                }
              >
                P&amp;L {sortKey === "pnl" && "↓"}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {sortedStocks.map((s: any) => {
              const pnlClass =
                s.gainLoss == null
                  ? "text-gray-400"
                  : s.gainLoss >= 0
                  ? "text-green-600"
                  : "text-red-600";

              return (
                <tr
                  key={s.symbol}
                  className={`hover:bg-gray-50 transition-colors ${
                    s.gainLoss < 0 ? "bg-red-50/30" : ""
                  }`}
                >
                  <td className="px-4 py-2 text-left font-medium">
                    {s.name}
                  </td>

                  <td className="px-4 py-2 text-center font-mono">
                    {s.quantity}
                  </td>

                  <td className="px-4 py-2 text-center font-mono">
                    {formatCurrency(s.purchasePrice)}
                  </td>

                  <td className="px-4 py-2 text-center font-mono text-gray-600">
                    {s.cmp == null ? "—" : formatCurrency(s.cmp)}
                  </td>

                  <td
                    className={`px-4 py-2 text-center font-mono ${pnlClass}`}
                  >
                    {s.gainLoss == null
                      ? "—"
                      : formatCurrency(s.gainLoss)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
