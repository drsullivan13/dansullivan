# Portfolio Arcade

## Overview
A portfolio website that transforms traditional navigation into an interactive space shooter game. Users pilot a ship and destroy neon-colored targets (representing Projects, Blog, Recipes, About sections) to navigate the site.

**Design Aesthetic**: "Neon Deep Space" with retro 8-bit pixel art and 60fps game engine
**Primary Color**: Neon cyan (#00ffff)
**Fonts**: Press Start 2P (game text), Rajdhani (HUD elements)

## Architecture

### Frontend (client/)
- **React** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Tailwind CSS** for styling
- **Hybrid Canvas/DOM rendering** - Canvas for game elements (60fps), DOM for UI targets

### Backend (server/)
- **Express** server
- **Markdown-based content** - No database needed for portfolio content

### Content System
Content is managed through markdown files with frontmatter support:

```
content/
├── blog/          # Blog posts (*.md)
├── recipes/       # Recipes (*.md)
├── projects/      # Projects (*.md)
└── media/         # Static assets (images, GIFs, videos)
```

**Libraries**: gray-matter (frontmatter parsing), marked (markdown to HTML)

#### Blog Post Frontmatter
```yaml
---
title: Post Title
subtitle: Short description
date: 2024-10-24
readTime: 5 min
tags:
  - Tag1
  - Tag2
---
```

#### Project Frontmatter
```yaml
---
title: Project Name
description: Short description
technologies:
  - React
  - TypeScript
role: Lead Engineer
timeframe: Q4 2024
architecture: React + Canvas Hybrid
preview: /content/media/project.gif  # Optional: image, GIF, or video
demoUrl: https://example.com         # Optional
---
```

#### Recipe Frontmatter
```yaml
---
title: Recipe Name
description: Short description
prepTime: 20 min
tags:
  - Vegan
  - Spicy
emoji: "🍜"
ingredients:
  - Ingredient 1
  - Ingredient 2
---
```

## Key Files
- `client/src/components/game/GameCanvas.tsx` - Main game component
- `client/src/game/useGameLoop.ts` - 60fps game loop
- `server/data/content.ts` - Markdown content reader
- `server/routes.ts` - API routes

## Recent Changes
- **2024-12-01**: Implemented markdown-based content system with frontmatter support
- **2024-12-01**: Added media preview support (images/GIFs/videos) for project cards
