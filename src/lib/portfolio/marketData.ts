import { MarketData } from "../types";

//mock implementation
export async function getMarketData(symbol: string): Promise<MarketData> {

    await new Promise((res) => setTimeout(res, 100));

    const basePrice = symbol.length * 100;

    return {
        cmp: basePrice + Math.random() * 50,
        peRatio: 15 + Math.random() * 10,
        latestEarnings: 50 + Math.random() * 20,
        source: "mock",
    };
}