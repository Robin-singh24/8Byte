
import { HoldingsTable } from "@/components/HoldingsTable";
import { PortfolioSummary } from "@/components/PortfolioTable";
import { SectorAllocation } from "@/components/SectorAllocation";
import { PortfolioClient } from "@/components/PortfolioClient";

export default async function HomePage() {

  const res = await fetch(
    "/api/portfolio",
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <PortfolioClient>
      <main className="mx-auto max-w-7xl p-6 space-y-8">
        <PortfolioSummary totals={data.totals} />
        <SectorAllocation sectors={data.sectors} />
        <HoldingsTable stocks={data.stocks} />
      </main>
    </PortfolioClient>
  );
}
