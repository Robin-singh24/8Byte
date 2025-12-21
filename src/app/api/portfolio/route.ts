import { NextResponse } from "next/server";
import { loadPortfolio } from "@/lib/portfolio/loadPortfolio";
import { getMarketData } from "@/lib/portfolio/marketData";

export async function GET() {
    const portfolio = loadPortfolio();

    console.log("Portfolio length : ", portfolio.length);
    const firstStock = portfolio[0];
    const marketData = await getMarketData(firstStock.symbol);

    return NextResponse.json({
        message: "portfolio fetched successfully",
        count: portfolio.length,
        stock: firstStock.name,
        marketData,
    });
}