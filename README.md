# Ajibade Hassan — Developer Portfolio

A modern, animated developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui. Features a blue + golden-yellow accent theme, dark/light mode, smooth scroll navigation, responsive design, and a working contact form backed by a Prisma database.

## Features

- **Hero Section** — Animated intro with name, role (Full-Stack Developer & AI Engineer), social links, golden floating stat badges, and a stats row
- **About Section** — Bio, 4 service cards (Frontend / Backend / AI Engineering / Full-Stack Integration), and categorized skills including an AI Engineering category
- **Projects Section** — Featured project showcase + grid of other projects with live/code links; the E-Hospital Management System is the featured project
- **Contact Section** — Working contact form (POST /api/contact → saved to SQLite via Prisma) + email, location, and social cards
- **Dark/Light Mode** — Theme toggle with system preference detection (next-themes)
- **Responsive** — Mobile-first design with hamburger menu on small screens
- **Animated** — Framer Motion entrance animations and scroll reveals
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

## Design System

- **Primary gradient**: `blue-500 → sky-500` (buttons, accents, hero name, stats)
- **Accent color**: `amber-400 / amber-500` (section eyebrows, "Featured" badges, floating badges, footer heart)
- **Theme**: Light/dark with system preference, emerald/teal-free palette

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

- Your name, role, bio, location, and email
- Social links (GitHub, LinkedIn, Twitter)
- Skills (categorized — Frontend, Backend, AI Engineering, Tools)
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
