import { SectorData, StockDetails } from "../types";

export function aggregateBySector(
  stocks: StockDetails[]
): SectorData[] {
  const sectorMap = new Map<string, SectorData>();

  for (const stock of stocks) {
    const existingSector = sectorMap.get(stock.sector);

    if (!existingSector) {
      sectorMap.set(stock.sector, {
        sector: stock.sector,
        investment: stock.investment,
        presentValue: stock.presentValue ?? 0,
        gainLoss:
          stock.presentValue !== null
            ? stock.presentValue - stock.investment
            : 0,
        gainLossPercent: 0,
        allocationPercent: 0,
      });
    } else {
      existingSector.investment += stock.investment;

      if (stock.presentValue !== null) {
        existingSector.presentValue += stock.presentValue;
        existingSector.gainLoss +=
          stock.presentValue - stock.investment;
      }
    }
  }

  const sectors = Array.from(sectorMap.values());

  const totalInvestment = sectors.reduce(
    (sum, s) => sum + s.investment,
    0
  );

  return sectors.map((sector) => ({
    ...sector,
    gainLossPercent:
      sector.investment === 0
        ? 0
        : (sector.gainLoss / sector.investment) * 100,

    allocationPercent:
      totalInvestment === 0
        ? 0
        : (sector.investment / totalInvestment) * 100,
  }));
}
