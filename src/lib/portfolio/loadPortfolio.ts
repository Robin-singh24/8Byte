import fs from "fs";
import path from "path";

import { PortfolioStock } from "../types";

export function loadPortfolio(): PortfolioStock[] {

    const filePath = path.join(process.cwd(), "src","data","portfolio.json");
    
    const fileContent = fs.readFileSync(filePath,"utf-8");

    const data = JSON.parse(fileContent);

    if(!Array.isArray(data)){
        throw new Error("The Portfolio data is not an array");
    }

    return data as PortfolioStock[];
}