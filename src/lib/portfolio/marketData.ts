import YahooFinance from "yahoo-finance2";
import { MarketData } from "../types";
import {
    getMarketDataCache,
    setMarketDataCache
} from "../cache/marketDataCache"

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

type YahooQuote = {
    regularMarketPrice?: number;
    trailingPE?: number;
    epsTrailingTwelveMonths?: number;
};

export async function getMarketData(
    symbol: string
): Promise<MarketData> {
    const baseSymbol = symbol.replace("NSE:", "");
    const nseKey = `${baseSymbol}.NS`;
    const bseKey = `${baseSymbol}.BO`;

    const cachedNSE = getMarketDataCache(nseKey);
    if (cachedNSE) return cachedNSE;
    try {
        let quote = (await yahooFinance.quote(nseKey)) as
            | YahooQuote
            | undefined;

        let finalKey = nseKey;
        //check bse if no nse
        if (!quote) {
            const cachedBSE = getMarketDataCache(bseKey);
            if (cachedBSE) return cachedBSE;

            quote = (await yahooFinance.quote(bseKey)) as
                | YahooQuote
                | undefined;

            finalKey = bseKey;
        }

        //return null if nothing
        if (!quote) {
            const emptyData: MarketData = {
                cmp: null,
                peRatio: null,
                latestEarnings: null,
                source: "yahoo",
            };

            setMarketDataCache(finalKey, emptyData);
            return emptyData;
        };

        const marketData: MarketData = {
            cmp: quote.regularMarketPrice ?? null,
            peRatio: quote.trailingPE ?? null,
            latestEarnings: quote.epsTrailingTwelveMonths ?? null,
            source: "yahoo",
        };

        setMarketDataCache(finalKey, marketData);

        return marketData;
    } catch (error) {
        console.error("Yahoo Fetch failed... ->", error);
        return {
            cmp: null,
            peRatio: null,
            latestEarnings: null,
            source: "yahoo",
        };
    }
}