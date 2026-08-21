# Chef Harrizona — Catering & Private Dining Website

A modern marketing + booking website for **Chef Harrizona**, a Nairobi-based private chef offering private dining, event catering, cooking classes, pastry services and weekly meal-kit preparation.

Built with Next.js, React, TypeScript, Tailwind CSS, Drizzle ORM and Neon (PostgreSQL).

## Features

- **Home, About, Menu, Services, Meal Kits, Events, Gallery, Blog, Reviews, FAQ, Contact, Book** — full marketing pages with a dark luxury theme.
- **Meal Kit Shop + Cart** — add meal kits to a cart (persisted in `localStorage`) and place an order directly on WhatsApp with an auto-formatted message.
- **Booking & Contact forms** — validated with React Hook Form + Zod, submitted to Neon via API routes.
- **Admin dashboard** — `/admin` for managing bookings, contact messages, testimonials, menu items, gallery and site settings (demo auth: `admin@chefharrizona.co.ke` / `admin123`).
- **WhatsApp integration** — floating chat button and order placement with the chef's WhatsApp number.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Forms:** React Hook Form + Zod
- **Database:** Neon (PostgreSQL) via Drizzle ORM + `@neondatabase/serverless`
- **Icons:** lucide-react

## Getting Started

### 1. Prerequisites

- Node.js 20+
- A Neon (PostgreSQL) database — [neon.tech](https://neon.tech)

### 2. Install & configure

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and set your connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

### 3. Initialize the database

Creates all tables (`bookings`, `contact_messages`, `menu_items`, `gallery_images`, `testimonials`, `blog_posts`, `site_settings`, `customer_reviews`) plus the `booking_status` enum:

```bash
npm run db:init
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the development server                       |
| `npm run build`     | Build for production                               |
| `npm run start`     | Start the production server                        |
| `npm run lint`      | Run ESLint                                         |
| `npm run db:init`   | Create/refresh the database schema in Neon         |

## Key Configuration

Most site content (menu items, services, meal kits, events, testimonials, gallery, site settings) lives in **`src/lib/data.ts`** — edit it to change dishes, prices, images and content. Photos are served from **`public/`**.

WhatsApp order and floating button use the phone number defined in the site settings / `data.ts`.

## Project Structure

```
src/
├── app/                # Pages, routes and API handlers
│   ├── admin/          # Admin dashboard + login
│   ├── api/            # API routes (bookings, contact, reviews, admin)
│   ├── meal-kits/      # Meal kit shop
│   ├── services/       # Services list + detail pages
│   └── ...             # menu, events, gallery, blog, book, etc.
├── components/
│   ├── cart/           # Cart drawer, buttons
│   ├── layout/         # Navbar, Footer, WhatsApp button
│   └── ui/             # Reusable UI primitives
├── lib/
│   ├── db/             # Drizzle schema + Neon client
│   ├── admin/          # Demo auth + mock store
│   ├── data.ts         # Site content & data
│   └── cart.tsx        # Cart context/provider
scripts/
└── init-neon.mjs       # Database schema initialisation
```

## Deployment

Build and deploy to any Node.js host (Vercel, Railway, Render, etc.):

```bash
npm run build
npm run start
```

Set the `DATABASE_URL` environment variable on the hosting platform.

## Notes

- `.env.local` contains real credentials and is **never** committed (gitignored). Only `.env.example` is tracked.
- Admin authentication is a demo (client-side) implementation — replace with a real auth provider for production use.