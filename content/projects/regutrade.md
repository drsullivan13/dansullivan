---
title: ReguTrade
description: Institutional-grade DeFi trade execution and compliance reporting platform built on Uniswap V3 and Base L2.
technologies:
  - Uniswap V3 QuoterV2
  - Base L2
  - React 19
  - TypeScript
  - Viem
  - Wagmi
  - Express
  - Drizzle ORM
  - PostgreSQL
  - Uniswap V3 SwapRouter02
  - The Graph Protocol
role: Full Stack Development
timeframe: Q4 2024
architecture: Blockchain Integration
preview: /content/media/regutrade-preview.png 
demoUrl: https://www.youtube.com/watch?v=Nem_Km6Ty4c&t=1s
projectLink: https://regutrade.replit.app/
---

Built a DeFi compliance platform that brings institutional-grade execution analytics and regulatory reporting to decentralized exchanges. Bridges the gap between DeFi's transparency and traditional finance's audit requirements through direct smart contract integration and comprehensive swap documentation.

## The Challenge

Institutional traders need DeFi's permissionless access and transparent pricing, but can't execute without proper audit trails, best execution proof, and regulatory documentation. Traditional DEX interfaces lack the compliance infrastructure required for regulated entities.

## Smart Contract Integration

Direct integration with Uniswap V3's QuoterV2 contract on Base L2 to discover optimal routing across all fee tiers (0.01%, 0.05%, 0.3%, 1%). Parallel queries analyze liquidity depth and price impact across pools, ranking routes by net output after real-time gas cost calculations converted to USD.

## Compliance-First Architecture

Every swap generates a complete audit trail: predicted vs actual output, execution variance analysis, price impact calculations, gas costs, routing strategy, and immutable blockchain verification. JSONB storage preserves all analyzed routes for regulatory review, while PDF reports provide institutional-grade documentation.

## Technical Decisions

1. **Type-safe blockchain interactions**: Viem for contract calls with full TypeScript inference from ABIs, Wagmi for wallet state management
2. **Multi-tier route optimization**: Queries all four Uniswap fee tiers simultaneously, factoring gas costs into route selection
3. **Hybrid pricing architecture**: Primary on-chain quotes via QuoterV2 with The Graph Protocol fallback for real-time market data
4. **Slippage protection**: Configurable tolerance with real-time validation before transaction submission
5. **Transaction verification**: Links to BaseScan for on-chain proof with complete calldata transparency

## Scale

- **Four fee tier analysis** per quote request (0.01%, 0.05%, 0.3%, 1%)
- **Real-time gas estimation** with USD conversion for accurate route comparison
- **Complete trade history** with blockchain verification and execution metrics
- **PDF compliance reports** with variance analysis and regulatory documentation