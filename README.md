# Portfolio Arcade

> An interactive space shooter portfolio where navigation meets nostalgia. Pilot a ship, destroy neon targets, and explore projects through gameplay.

[![Live Demo](https://img.shields.io/badge/demo-live-00ffff?style=for-the-badge)](https://portfolio-arcade.replit.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-98.8%25-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## About This Project

Portfolio Arcade reimagines the traditional portfolio website as an **interactive experience**. Instead of clicking through menus, visitors pilot a spacecraft through a neon-lit void, shooting targets to access different sections (Projects, Blog, Recipes, About).

This project represents a core belief: **interfaces should be experiences, not obstacles**. Performance is not a feature—it's a prerequisite. Every frame at 60fps. Every interaction instant.

### Why Build This?

1. **Technical Challenge** - Sustaining 60fps game loops in React requires architectural creativity
2. **User Experience** - Traditional portfolios are boring; memorable experiences create lasting impressions
3. **Full-Stack Showcase** - Demonstrates expertise across frontend, backend, build tooling, and content systems

## ✨ Features

- 🎮 **60fps Canvas Game Engine** - Buttery-smooth space shooter mechanics
- 🎨 **Neon Deep Space Aesthetic** - Retro 8-bit pixel art with modern polish
- 📝 **Markdown-Based CMS** - File-based content system with frontmatter support
- 🚀 **Hybrid Rendering** - Canvas for performance, DOM for accessibility
- 📱 **Mobile Optimized** - Touch controls and responsive design
- ⚡ **Lightning Fast** - Vite for sub-second HMR, optimized production bundles

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript for type-safe component development
- **Vite 7** for instant HMR and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and data fetching
- **Tailwind CSS 4** with custom neon-themed utilities
- **Framer Motion** for declarative animations
- **shadcn/ui** component library (Radix UI primitives)

### Backend
- **Express 4** for REST API and static file serving
- **gray-matter** + **marked** for markdown parsing and rendering
- **Drizzle ORM** with Neon PostgreSQL (infrastructure ready)

### Build & Developer Experience
- **TypeScript 5.6** throughout the entire stack
- **esbuild** for lightning-fast server bundling
- **tsx** for TypeScript execution in development
- Custom Vite plugins for meta image generation

### Game Engine Architecture
- **Canvas API** for high-performance rendering
- **requestAnimationFrame** for 60fps game loop
- **React refs** for mutable game state (zero re-render overhead)
- **Hybrid DOM/Canvas** - Critical path on Canvas, UI overlays in DOM

## 🏗️ Architecture Highlights

### Dual-Mode Server
The Express server adapts to its environment:
- **Development**: Vite middleware integration with HMR
- **Production**: Serves pre-built static assets from `dist/public/`

### Performance-First Game Loop
Traditional React state management would cause excessive re-renders, tanking performance. The solution:
- Game state lives in **refs**, not React state
- Only UI elements (score, HUD) trigger React updates
- Particle physics and collision detection run independently at 60fps

### File-Based Content System
No database required for content management:
```
content/
├── blog/       # Markdown blog posts
├── projects/   # Project case studies
├── recipes/    # Personal recipes
└── media/      # Images, GIFs, videos
```

Content is parsed on-demand with **gray-matter** and **marked**, cached efficiently, and served via REST endpoints.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/drsullivan13/dansullivan.git
cd dansullivan

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5000` and pilot your ship!

### Available Commands

```bash
npm run dev          # Start development server (port 5000)
npm run build        # Build for production
npm start            # Run production build
npm run check        # TypeScript type checking
npm run db:push      # Sync database schema (if using DB)
```

## 📁 Project Structure

```
client/src/          # React frontend
  ├── components/    # Reusable UI components
  ├── game/          # Game loop and mechanics
  ├── pages/         # Route-based page components
  └── lib/           # API client and utilities

server/              # Express backend
  ├── routes.ts      # API endpoint definitions
  ├── data/          # Content management system
  └── index.ts       # Server entry point

content/             # Markdown content files
  ├── blog/          # Blog posts
  ├── projects/      # Project case studies
  └── recipes/       # Personal recipes

shared/              # Shared TypeScript types and schemas
```

## 📝 Content Management

Add new content by creating markdown files with YAML frontmatter:

### Blog Post Example
```yaml
---
title: "Building for 60fps"
subtitle: A performance manifesto
date: 2024-09-15
readTime: 8 min
tags:
  - Performance
  - React
---

Your markdown content here...
```

### Project Example
```yaml
---
title: My Project
description: A brief description
technologies:
  - React
  - TypeScript
role: Lead Engineer
timeframe: Q4 2024
preview: /content/media/demo.gif
demoUrl: https://example.com
---

Project details here...
```

Content is automatically available via API routes and rendered on the frontend.

## 🎨 Design Philosophy

**Performance is not a feature—it's respect.**

Every dropped frame is a micro-betrayal of user trust. This portfolio targets 60fps on all devices because smooth interfaces aren't just pleasant, they're professional.

Key principles:
- **Measure before optimizing** - Chrome DevTools and React Profiler guide all decisions
- **Do less, faster** - Offload to GPU, batch updates, virtualize what you can
- **Hybrid rendering** - Use the right tool for the job (Canvas for performance, DOM for accessibility)

## 🤝 About Me

I'm Dan Sullivan, a full-stack engineer who believes that **software should delight, not just function**. I build systems that scale (distributed event pipelines handling 10M+ events/second) and interfaces that sing (60fps game engines in React).

When I'm not architecting fault-tolerant systems or optimizing render loops, you'll find me experimenting with space curry recipes or writing about interface design philosophy.

**Specialties**: Performance optimization, distributed systems, full-stack TypeScript, React architecture

## 📄 License

MIT License - feel free to fork, modify, and use this project as inspiration for your own portfolio!

---

**Built with ⚡ by [Dan Sullivan](https://github.com/drsullivan13)**
