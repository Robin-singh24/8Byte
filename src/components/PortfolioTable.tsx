import { formatCurrency, formatPercent } from "@/lib/ui/format";

export function PortfolioSummary({ totals }: any) {
  const pnlClass =
    totals.totalGainLoss == null
      ? "text-gray-500"
      : totals.totalGainLoss >= 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Investment */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Total Investment</p>
        <p className="mt-1 text-xl font-semibold font-mono">
          {formatCurrency(totals.totalInvestment)}
        </p>
      </div>

      {/* Present Value */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Current Value</p>
        <p className="mt-1 text-xl font-semibold font-mono">
          {formatCurrency(totals.totalPresentValue)}
        </p>
      </div>

      {/* P&L */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Total P&amp;L</p>
        <p className={`mt-1 text-xl font-semibold font-mono ${pnlClass}`}>
          {formatCurrency(totals.totalGainLoss)}
        </p>
      </div>

      {/* P&L % */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Return %</p>
        <p className={`mt-1 text-xl font-semibold font-mono ${pnlClass}`}>
          {formatPercent(totals.totalGainLossPercent)}
        </p>
      </div>
    </div>
  );
}
