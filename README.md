# Ajibade Hassan — Developer Portfolio

A modern, animated developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui. Features dark/light mode, smooth scroll navigation, responsive design, and a working contact form backed by a Prisma database.

## Features

- **Hero Section** — Animated intro with name, role, social links, and floating stat badges
- **About Section** — Bio, service cards (Frontend / Backend / Full-Stack), and categorized skills
- **Projects Section** — Featured project showcase + grid of other projects with live/code links
- **Contact Section** — Working contact form (POST /api/contact → saved to SQLite via Prisma) + social links
- **Dark/Light Mode** — Theme toggle with system preference detection (next-themes)
- **Responsive** — Mobile-first design with hamburger menu on small screens
- **Animated** — Framer Motion entrance animations and scroll reveals
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM + SQLite (contact form submissions) |
| Animations | Framer Motion |
| Theme | next-themes (dark/light mode) |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)

### Installation

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Push database schema (creates SQLite DB for contact form)
bun run db:push

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

All portfolio content lives in [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts). Edit this single file to update:

- Your name, role, bio, and location
- Social links (GitHub, LinkedIn, Twitter)
- Skills (categorized)
- Projects (title, description, tech stack, links)
- Stats shown in the hero section

## Deployment

This app uses Next.js API routes (for the contact form), so it needs a Node.js-capable host:

- **Vercel** (recommended) — https://vercel.com
- **Netlify** — https://netlify.com
- **Railway** — https://railway.app
- **Render** — https://render.com

> ⚠️ GitHub Pages won't work out of the box because it doesn't support API routes. Use Vercel for the easiest deployment.

## Scripts

```bash
bun run dev        # Start dev server (port 3000)
bun run lint       # Run ESLint
bun run db:push    # Push Prisma schema to database
bun run db:generate # Generate Prisma client
```

## License

MIT © Ajibade Hassan
