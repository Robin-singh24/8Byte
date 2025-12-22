export function formatCurrency(
  value: number | null,
  decimals = 0
): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `₹${value.toFixed(decimals)}`;
}

export function formatPercent(
  value: number | null,
  decimals = 1
): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(decimals)}%`;
}
