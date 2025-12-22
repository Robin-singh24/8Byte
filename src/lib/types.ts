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

export type StockDetails = {
    name: string;
    symbol: string;
    exchange: string;
    sector: string;

    purchasePrice: number;
    quantity: number;

    cmp: number | null;
    peRatio: number | null;
    latestEarnings: number | null;

    investment: number;
    presentValue: number | null;
    gainLoss: number | null;
    gainLossPercent: number | null;
    portfolioPercentage: number | null;
};

export type CurrentMarketData = {
    cmp: number | null;
    peRatio: number | null;
    latestEarnings: number | null;
    source: "mock" | "yahoo";
};