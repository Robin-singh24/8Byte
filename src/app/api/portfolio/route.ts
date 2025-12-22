import { NextResponse } from "next/server";
import { loadPortfolio } from "@/lib/portfolio/loadPortfolio";
import { getMarketData } from "@/lib/portfolio/marketData";
import {
    calcutateStockValue,
    calcTotalPortfolioTotalValue,
    computePortfolioPercentage
} from "@/lib/portfolio/calculations";
import { aggregateBySector } from "@/lib/portfolio/sectorAggregation";

export async function GET() {
    try {
        //loading the static porti
        const portfolio = loadPortfolio();

        // console.log("Portfolio length : ", portfolio.length);
        //fetch marketData from yahoo/google
        const stockDetails = await Promise.all(
            portfolio.map(async (stock) => {
                const marketData = await getMarketData(stock.symbol);
                return calcutateStockValue(stock, marketData);
            })
        );
        //totals
        const total = calcTotalPortfolioTotalValue(stockDetails)

        //portfolio %
        const finalStocks = computePortfolioPercentage(
            stockDetails,
            total.totalPresentValue
        );

        const sectors = aggregateBySector(
            finalStocks,
            total.totalPresentValue
        );

        return NextResponse.json({
            updatedAt: new Date().toISOString(),
            totals: {
                totalInvestment: total.totalInvestment,
                totalPresentValue: total.totalPresentValue,
                totalGainLoss:
                    total.totalPresentValue - total.totalInvestment,
                totalGainLossPercent:
                    ((total.totalPresentValue - total.totalInvestment) /
                        total.totalInvestment) *
                    100,
            },
            sectors,
            stocks: finalStocks,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Error loading Portfolio data" },
            { status: 500 }
        );
    }
}