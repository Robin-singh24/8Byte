import { formatCurrency, formatPercent } from "@/lib/ui/format";

export function SectorAllocation({ sectors }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <h2 className="px-4 py-3 text-lg font-semibold border-b">
        Sector Allocation
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="text-gray-700 font-semibold">
              <th className="px-4 py-3 text-left">Sector</th>
              <th className="px-4 py-3 text-center">Investment</th>
              <th className="px-4 py-3 text-center">Value</th>
              <th className="px-4 py-3 text-center">Allocation</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {sectors.map((s: any) => (
              <tr
                key={s.sector}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-left font-medium">
                  {s.sector}
                </td>

                <td className="px-4 py-2 text-center font-mono">
                  {formatCurrency(s.investment)}
                </td>

                <td className="px-4 py-2 text-center font-mono">
                  {s.presentValue == null
                    ? "—"
                    : formatCurrency(s.presentValue)}
                </td>

                <td className="px-4 py-2 text-center font-mono">
                  {s.allocationPercent == null
                    ? "—"
                    : formatPercent(s.allocationPercent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
