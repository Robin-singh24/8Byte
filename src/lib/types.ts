export type PortfolioStock = {
    name: string;
    symbol: string;
    exchange: string;
    sector: string;
    purchasePrice: number;
    quantity: number;
};

export type MarketData = {
  cmp: number | null;
  peRatio: number | null;
  latestEarnings: number | null;
  source: "mock" | "live";
};