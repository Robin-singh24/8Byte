# Dynamic Portfolio Dashboard

## Overview
This project is a dynamic portfolio dashboard built as part of an assessment.  
It displays stock holdings, sector-wise allocation, and portfolio performance using live market data.

The goal was to design a clean, readable system that separates data fetching, calculations, and UI concerns while remaining simple and maintainable.

---

## Features
- Portfolio summary (investment, current value, P&L)
- Holdings table with live CMP and gain/loss
- Sector-wise allocation breakdown
- Graceful handling of missing market data
- Lightweight caching to avoid excessive market API calls

---

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, TypeScript
- **Market Data:** Yahoo Finance (with fallback handling)
- **Caching:** In-memory TTL-based cache

---

###Setup
1. Navigate to the root directory:
   ```bash
    npm install
    npm run dev
    http://localhost:3001

---

## Data Flow & Architecture
1. Portfolio data is loaded from a static JSON file.
2. Market prices are fetched per stock symbol from the market data provider.
3. Market responses are cached in-memory using a 15-second TTL to reduce repeated external calls.
4. Calculations (investment, present value, P&L, percentages) are performed server-side.
5. The frontend fetches a single aggregated API response and focuses only on rendering.

This keeps the UI simple and ensures business logic stays centralized.

---

## Caching Strategy
Market data is cached in memory with a **15-second TTL**.
- Prevents hitting the market API on every request
- Keeps prices reasonably fresh
- Ensures frontend always receives up-to-date computed values

Frontend caching is intentionally disabled to avoid stale UI state.

---

## Handling Missing Data
Some stocks may not return complete market data.
In such cases:
- CMP and P&L are shown as placeholders (`—`)
- Calculations skip unavailable values safely
- Sector and portfolio totals remain accurate

---

## Notes
- The focus was correctness, clarity, and maintainability rather than visual complexity.
- The system is designed so market providers can be swapped without changing UI logic.

