# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio Arcade - An interactive portfolio website that transforms traditional navigation into a space shooter game. Users pilot a ship and destroy neon-colored targets to navigate to different sections (Projects, Blog, Recipes, About).

**Design Aesthetic**: "Neon Deep Space" with retro 8-bit pixel art and 60fps game engine
**Primary Color**: Neon cyan (#00ffff)
**Fonts**: Press Start 2P (game text), Rajdhani (HUD elements), Inter (content)

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server (port 5000)
npm run dev:client   # Start Vite dev server only (port 5000)
npm start            # Run production build
```

### Building
```bash
npm run build        # Build for production (client + server)
npm run check        # TypeScript type checking
```

### Database
```bash
npm run db:push      # Push Drizzle schema to database
```

Note: Database is currently defined but not actively used. Content is served from markdown files.

## Architecture

### Tech Stack
- **Frontend**: React 19.2, TypeScript 5.6, Vite 7, Wouter (routing), TanStack Query (data fetching)
- **Backend**: Express 4.21, TypeScript, gray-matter, marked
- **Styling**: Tailwind CSS 4, Framer Motion, shadcn/ui (Radix UI)
- **Database**: Drizzle ORM with Neon PostgreSQL (infrastructure defined, not actively used)
- **Build**: Vite (client), esbuild (server)

### Directory Structure

```
client/src/          # React frontend
  ├── pages/         # Page components (Home, Projects, Blog, Recipes, About)
  ├── components/    # Reusable UI components (shadcn/ui based)
  ├── game/          # Game loop and logic (useGameLoop.ts)
  └── lib/           # API client and utilities

server/              # Express backend
  ├── index.ts       # Main server entry point
  ├── routes.ts      # API route definitions
  ├── data/content.ts # Markdown content parser
  ├── vite.ts        # Vite dev middleware integration
  └── static.ts      # Production static file serving

shared/              # Shared types and schemas
  └── schema.ts      # Drizzle ORM schema (users table defined)

content/             # File-based CMS
  ├── blog/          # Blog posts (*.md)
  ├── projects/      # Projects (*.md)
  ├── recipes/       # Recipes (*.md)
  └── media/         # Static media (images, GIFs, videos)

script/              # Build scripts
  └── build.ts       # Production build orchestration
```

### Key Patterns

**Dual-Mode Server**: The Express server behaves differently in development vs production:
- Development (`npm run dev`): Vite middleware integrated into Express for HMR
- Production (`npm start`): Serves pre-built static files from `dist/public/`
- Server setup in [server/index.ts](server/index.ts)

**Game Architecture**: The homepage features an interactive canvas-based space shooter:
- Game loop runs at 60fps using `requestAnimationFrame`
- Uses React refs for mutable game state (ship position, projectiles, particles)
- Only UI elements use React state to minimize re-renders
- Located in [client/src/game/](client/src/game/) and [client/src/components/game/](client/src/components/game/)
- Targets represent portfolio sections - shooting them navigates to pages

**File-Based Content Management**:
- Content stored as markdown files with YAML frontmatter
- Parsed on-demand using gray-matter and marked
- No database required for content
- API routes serve processed content
- Located in [content/](content/) directory

**Path Aliases** (configured in [tsconfig.json](tsconfig.json) and [vite.config.ts](vite.config.ts)):
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### API Routes

All routes return JSON and are prefixed with `/api`:

```
GET /api/projects       # List all projects
GET /api/projects/:id   # Get single project
GET /api/blog           # List all blog posts
GET /api/blog/:id       # Get single blog post
GET /api/recipes        # List all recipes
GET /api/recipes/:id    # Get single recipe
```

Static media files served at `/content/media/*`

### Content System

Content files use markdown with YAML frontmatter. Each content type has specific required fields:

**Blog Posts** (`content/blog/*.md`):
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

**Projects** (`content/projects/*.md`):
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

**Recipes** (`content/recipes/*.md`):
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

Content is processed in [server/data/content.ts](server/data/content.ts) using gray-matter and marked.

### Build Process

Production build (`npm run build`) executes [script/build.ts](script/build.ts):
1. Cleans `dist/` directory
2. Builds client with Vite → `dist/public/`
3. Builds server with esbuild → `dist/index.cjs`
4. Server bundled with selective dependencies (allowlist pattern)
5. Creates minified production bundle

### Type Safety & Duplication

**Known Issue**: TypeScript interfaces for content types (Project, BlogPost, Recipe) are duplicated in:
- [server/data/content.ts](server/data/content.ts)
- [client/src/lib/api.ts](client/src/lib/api.ts)

These could be moved to `shared/` for a single source of truth.

### Database (Currently Unused)

Infrastructure is set up but not actively used:
- Drizzle ORM configured with Neon PostgreSQL
- Schema defined in [shared/schema.ts](shared/schema.ts)
- `users` table exists but authentication not implemented
- `MemStorage` class in [server/storage.ts](server/storage.ts) provides in-memory storage interface
- Run `npm run db:push` to sync schema changes

### Replit Integration

The project includes Replit-specific integrations:
- Custom Vite plugins: cartographer, dev-banner, runtime-error-modal
- Environment detection via `process.env.REPL_ID`
- Configured in [vite.config.ts](vite.config.ts)
- Documentation in [replit.md](replit.md)

### Special Files

**[vite-plugin-meta-images.ts](vite-plugin-meta-images.ts)**: Custom Vite plugin that generates OpenGraph meta tags for project preview images/videos.

**[components.json](components.json)**: shadcn/ui configuration for component generation.

## Working with Content

To add new content:

1. Create markdown file in appropriate `content/` subdirectory
2. Add frontmatter with required fields (see Content System above)
3. Write content in markdown below frontmatter
4. Content automatically available via API routes
5. Media files go in `content/media/` and can be referenced in frontmatter

## Performance Considerations

**Game Loop**: The game uses refs instead of state for high-frequency updates to avoid unnecessary React re-renders. Only UI elements that need visual updates use React state.

**Canvas vs DOM**: Game elements render on canvas for 60fps performance. UI overlays use DOM for accessibility and easier styling.
