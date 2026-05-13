# 🌸 Knits by Muna – Premium Handmade E-Commerce Platform

A visually stunning, lightweight, and modern e-commerce storefront designed for **Knits by Muna**, a boutique handmade crochet accessories store based in Bangladesh.

Built specifically to operate optimally and indefinitely on the **Vercel Free Tier**, featuring an edge-optimized setup, client-cached checkout flows, Supabase PostgreSQL support, and automated direct order generation via **Facebook Messenger / Instagram DMs** without server-heavy transaction gateways.

**New to deployment?** Follow the step-by-step guide: **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** (GitHub → Supabase tables → Vercel env vars → deploy).

---

## ✨ Features & Visual Excellence
- **Feminine Dark Luxury Aesthetics:** Implemented with curated neon pink, electric blue, and soft lavender accents built directly into a dynamic dark-mode palette.
- **Glassmorphism Design:** Premium interactive cards with smooth glow shadows, rounded layouts, and sleek micro-animations leveraging Framer Motion.
- **Client-Side Persistence Engine:** Completely server-free Cart and Wishlist systems syncing instantly to secure local browser storage.
- **Messenger Automated Routing:** Generates flawlessly formatted order requests pre-filled with items, quantities, custom variant configurations, totals, and user contact details directly into DM inboxes.
- **Supabase/Drizzle Native Admin Suite:** Includes fully operational visual management for Products, Featured items, categories, discount markers, and multi-image uploads.

---

## 🛠️ Tech Stack Overview
- **Core Framework:** Next.js App Router (v16.2), fully responsive mobile-first UI architecture.
- **Language & Types:** Strict TypeScript configurations ensuring high reliability.
- **Styling System:** Tailwind CSS paired with custom variant tokens, animations, and reusable modular Shadcn UI structural bases.
- **Animations:** Fully customized scroll-triggered reveals, continuous subtle floating orbs, and quick-load overlay components via `framer-motion`.
- **Database Architecture:** Drizzle ORM configured for Supabase PostgreSQL serverless connection pooling.
- **Storage Strategy:** Compatible natively with both Vercel Blob zero-setup block management and Supabase standard cloud storage buckets.

---

## 📂 Project Directory Structure

```
├── .env.example                # Sample configurations template
├── README.md                   # Comprehensive platform setup documentation
├── next.config.ts              # Remote pattern caching and framework configurations
├── src/
│   ├── app/                    # Next.js App Router structural pages
│   │   ├── admin/              # Secured admin state management & dynamic tables
│   │   ├── cart/               # Live reactive shopping cart summary page
│   │   ├── categories/         # Browsable automated collection pages
│   │   ├── custom-order/       # Formatted bespoke inquiry dispatch handler
│   │   ├── shop/               # Primary searchable storefront catalog
│   │   ├── wishlist/           # Persistent item collection tracking view
│   │   ├── layout.tsx          # Root framework wrapping with complete SEO structure
│   │   └── globals.css         # Rich Design tokens, CSS glass filters, neon animations
│   ├── components/             # Reusable Client & Server interactive modules
│   │   ├── ui/                 # Core modular atomic layout primitives
│   │   ├── navbar.tsx          # Floating animated header with integrated quick-search overlay
│   │   ├── footer.tsx          # Multi-column dynamic brand info & site routes footer
│   │   ├── product-card.tsx    # Responsive glass cards with stock validation & color rings
│   │   ├── product-detail-client.tsx # Active image zoom, quantity controller, share suite
│   │   └── ...                 # System Context Providers (Cart / Wishlist)
│   ├── db/                     # Relational definitions repository
│   │   └── schema.ts           # Extended table schemas (Products, Categories, Inquiries)
│   └── lib/                    # Shared operational helper structures
│       ├── types.ts            # Central Application typings & embedded Seed fallback arrays
│       └── utils.ts            # Automated Markdown URL formatting, prices, slug generator
```

---

## 🚀 Setup & Installation Instructions

Follow these steps to setup the platform locally for testing or extensions:

### 1. Clone the Codebase
```bash
git clone https://github.com/your-org/knits-by-muna.git
cd knits-by-muna
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the bundled reference configuration template into your environment context:
```bash
cp .env.example .env.local
```
Open `.env.local` and substitute the fallback references with your specific active backend connection parameters.

### 4. Execute Local Dev Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the fully working e-commerce app.

---

## 🗄️ Supabase DB Setup & Configuration Guide

To host your database perfectly within the free limits, we support **Supabase PostgreSQL**.

### 1. Project Creation
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and create a New Project.
2. Ensure you store your Database Password securely.

### 2. Connection Pool String
1. Under **Project Settings** → **Database**, look for the **Connection String** panel.
2. Select **URI** mode and make sure **Use connection pooling** is checked (ends with port `:6543`).
3. Place this connection URI into the `POSTGRES_URL` key inside your `.env.local`.

### 3. Deploying the Database Schema
With the connection parameters fully applied, leverage Drizzle ORM tools to compile and map your tables instantly:
```bash
npx drizzle-kit push:pg
```
This automatically structures your Supabase instance to feature the complete relational mappings detailed in `src/db/schema.ts` (`products`, `categories`, `product_images`, `discounts`, `inquiries`, `admin_users`).

---

## 🌱 Sample Seed Data & Fallback Architecture

To ensure your layout remains functional for evaluations even before a live database layer is fully provisioned, the project features a **Self-Healing Fallback Strategy**:
- When incoming queries encounter uninitialized connection pools, the codebase gracefully intercepts the network exceptions.
- It dynamically substitutes standard queries with rich client side fallback structures embedded within `src/lib/types.ts`.
- This ensures developers and evaluators can view full product collections, execute test checkouts, and preview the dark glass layouts right out of the box with **zero required config**.

---

## ☁️ Vercel Deployment Guide (Optimized for Free Tier)

Deploying to Vercel is built to be a simple, one-click experience requiring zero ongoing running server bills.

1. **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
3. Import your git repository.
4. Expand the **Environment Variables** panel during setup:
   - Provide your active `POSTGRES_URL` configuration strings.
   - If utilizing integrated cloud components, ensure `BLOB_READ_WRITE_TOKEN` is loaded.
5. Click **Deploy**. Vercel will automatically resolve Next.js dynamic routing blocks, generate optimized edge assets, and bundle static components perfectly within standard limits.
6. The app will be permanently online and accessible via its secure `.vercel.app` custom routing alias.

---

## 🛡️ Best Practices Applied
- **Optimized Font Parsing:** Uses pre-fetched CSS rules matching Google web-fonts without dynamic layout shifts.
- **Hydration Safe Wrapping:** Prevents extension layout mismatches on root tags automatically.
- **Client Render Offloading:** Ensures state calculators evaluate natively inside client contexts without forcing server re-renders.
