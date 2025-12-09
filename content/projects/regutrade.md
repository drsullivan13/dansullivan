---
title: ReguTrade
description: An AI-powered analytics platform for discovering correlations between alternative data signals and stock performance.
technologies:
  - Next.js v16
  - Supabase
  - Tailwind v4
  - Anthropic Haiku 4.5
  - Vercel
role: Full Stack Development
timeframe: Q3 2025
architecture: Data Visualization
preview: /content/media/fin-intel-preview.png 
demoUrl: https://www.youtube.com/watch?v=U5ij0jMuTFQ&list=PL--sOUbTSgLcXMvHaxZW1xhI6LzTeE9YU
projectLink: https://fin-intel.com/
---

Built an AI-powered analytics platform that transforms natural language queries into interactive data visualizations. Users can discover correlations between alternative data signals (job postings, social sentiment, hiring trends) and stock performance across 12 major tickers using plain English requests.

## The Challenge

Financial analysts need to test dozens of hypotheses daily, but traditional dashboards require navigating multiple dropdowns and configuration screens. The goal was to reduce the time from question to insight from minutes to seconds.

## Natural Language Interface

The core innovation is a Claude Haiku-powered query parser that extracts structured parameters from conversational input. "Show correlation between job postings and price for AAPL" becomes a validated API call with ticker symbols, metrics, and date ranges. Achieved 90% cost savings by using Haiku 4.5 instead of larger models while maintaining accuracy.

## Discovery Engine

One-click functionality that tests all 11 available metrics against stock price, ranking results by correlation strength. Analysts can immediately click any result to visualize the relationship—turning exploratory analysis from a 30-minute process into a 10-second operation.

## Technical Decisions

1. **Three-layer validation**: Client-side type checking, API-level sanitization, and AI response verification ensure data integrity
2. **Dual visualization modes**: Scatter plots for correlation analysis, time-series charts with dual Y-axes for trend analysis
3. **Interactive query editing**: Pill-shaped UI elements allow real-time modification of tickers and metrics with preview before execution
4. **Admin approval workflow**: Supabase authentication with edge functions for automated email notifications

## Scale

- **12,080 data points** across 12 tickers covering 2024-present
- **11 alternative data metrics** including social sentiment, hiring momentum, and community activity
- **Sub-second query response** times with Chart.js visualization rendering
