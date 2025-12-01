---
title: Portfolio Arcade
description: An interactive Galaga-inspired portfolio where visitors pilot a ship through your career.
technologies:
  - React
  - TypeScript
  - Canvas API
  - Tailwind
  - Vite
role: Lead Engineer
timeframe: Q4 2024
architecture: React + Canvas Hybrid
preview: /content/media/portfolio-arcade.gif
demoUrl: https://portfolio-arcade.replit.app
---

This project represents a quantum leap in user interface paradigms. We deconstructed the traditional navigation patterns and rebuilt them from first principles, focusing on velocity and immersion.

## The Challenge

The core challenge was optimizing the render loop to sustain 60fps while calculating complex particle physics on a mobile device. Traditional React state management would cause too many re-renders, dropping frames below acceptable thresholds.

## The Solution

The solution involved a hybrid DOM/Canvas approach:

- **Canvas Layer**: Handles high-performance elements (stars, particles, projectiles, ship) at 60fps using refs instead of state
- **DOM Layer**: Overlays the interactive targets as React components for accessibility and crisp text rendering

## Key Innovations

1. **Ref-based game loop** - Game state lives in refs, not React state, avoiding re-render overhead
2. **Programmatic sprite transparency** - Black backgrounds are removed from sprites at runtime via canvas pixel manipulation
3. **Hybrid rendering** - Critical path uses Canvas, UI uses DOM
4. **Touch-optimized controls** - Click-to-move for mobile users
