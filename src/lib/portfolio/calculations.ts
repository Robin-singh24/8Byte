import { PortfolioStock, MarketData, StockDetails } from "../types";

export function calcutateStockValue(
    stock: PortfolioStock,
    marketData: MarketData
): StockDetails {

    const investment = stock.purchasePrice * stock.quantity;

    const presentValue = marketData.cmp !== null ? marketData.cmp * stock.quantity : null;

    const gainLoss = presentValue !== null ? presentValue - investment : null;

    const gainLossPercent = gainLoss !== null ? (gainLoss / investment) * 100 : null;

    return {
        ...stock,
        cmp: marketData.cmp,
        peRatio: marketData.peRatio,
        latestEarnings: marketData.latestEarnings,

        investment, presentValue, gainLoss, gainLossPercent,
        portfolioPercentage: null,//compute in a while 
    }
}

export function calcTotalPortfolioValue(
    stocks: StockDetails[]
) {
    const totalInvestment = stocks.reduce(
        (sum, s) => sum + s.investment,
        0
    );

    const totalPresentValue = stocks.reduce(
        (sum, s) => sum + (s.presentValue ?? 0),
        0
    );

    return {
        totalInvestment,
        totalPresentValue,
    };
}

export function computePortfolioPercentage(
  stocks: StockDetails[],
  totalPresentValue: number
): StockDetails[] {
  return stocks.map((stock) => {
    if (stock.presentValue === null || totalPresentValue === 0) {
      return {
        ...stock,
        portfolioPercentage: null,
      };
    }

    return {
      ...stock,
      portfolioPercentage: (stock.presentValue / totalPresentValue) * 100,
    };
  });
}