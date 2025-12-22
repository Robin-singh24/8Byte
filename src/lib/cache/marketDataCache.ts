import { MarketData } from "../types"

type CacheEntry = {
    data: MarketData,
    timestamp: number,
};

const TTL = 15 * 1000; //15 sec

const marketDataCache = new Map<string, CacheEntry>();

export function getMarketDataCache(
    key: string
): MarketData | null {
    const entry = marketDataCache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > TTL;

    if (isExpired) {
        marketDataCache.delete(key);
        return null;
    }

    return entry.data;
}

export function setMarketDataCache(
    key: string,
    data: MarketData
) {
    marketDataCache.set(key, {
        data,
        timestamp: Date.now(),
    });
}

