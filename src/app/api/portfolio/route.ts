import { NextResponse } from "next/server";
import { loadPortfolio } from "@/lib/portfolio/loadPortfolio";

export async function GET() {
    const portfolio = loadPortfolio();

    console.log("Portfolio length : ",portfolio.length);

    return NextResponse.json({
        message:"portfolio fetched successfully",
        count: portfolio.length
    });
}