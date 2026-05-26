# 🚀 Next-Gen Student Dashboard

A futuristic, highly animated, dark-mode-only student education dashboard prototype built using Next.js (App Router), styled with Tailwind CSS, and animated with Framer Motion. The data is fetched in real-time from a Supabase PostgreSQL database.

## ✨ Features & Architecture

- 🖤 **Strict Dark Mode Theme:** Clean, modern UI designed around deep near-black tones (`#050505`) with premium translucent glassmorphism panels and subtle neon border glow indicators.
- 🍱 **Bento Grid Layout:** Fully responsive grid layout utilizing semantic HTML (`<section>` for grid container, `<article>` for Bento items).
  - **Hero Tile:** Dynamic greeting with an animated daily learning streak tracker.
  - **Activity Tile:** Visually appealing animated study activity graph.
  - **Course Tiles:** Displays dynamically fetched course information complete with animated circular progress indicators, dynamic icons, and 3D hover effects.
- 🛸 **Premium Micro-Interactions & 3D Tilt:** 
  - Smooth spring-based **3D tilt parallax effect** on course cards triggered by mouse position.
  - Collapsible, smooth-animating left navigation sidebar utilizing Framer Motion's `layoutId` physics for indicator transitions.
- ⚡ **Next.js Server-Side Rendering (SSR):** Courses are fetched securely using Next.js Server Components from Supabase.
- 🔄 **Pulsing Loading Skeletons:** Implemented a matching loading layout (`loading.tsx`) with pulse animations to ensure a smooth transition during server data fetch.
- 🇮🇳 **Indian-Context Data:** Seeded with localized courses (e.g., MERN Stack, Data Science, Flutter, UPI/mobile-first UI/UX Design) instructed by Indian educators.
- ⚙️ **Fully Functional Pages:** Working sub-pages for `/courses`, `/analytics`, and `/settings` reachable via the sidebar.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Components)
- **Styling:** Tailwind CSS, PostCSS
- **Animation:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
First, install the required packages:
```bash
npm install
```

### 2. Set Up Supabase Database
1. Go to your [Supabase Dashboard](https://supabase.com) and create a new project.
2. Open the **SQL Editor** in the Supabase console.
3. Copy the contents of [`supabase_setup.sql`](./supabase_setup.sql).
4. Paste it into the editor and click **Run** to create the `courses` table, configure Row Level Security (RLS) policies, and seed it with mock courses.

### 3. Environment Configuration
1. Create a `.env.local` file in the root directory (or rename `.env.example`):
```bash
cp .env.example .env.local
```
2. Retrieve your project URL and Public Anon Key from **Project Settings → API** in Supabase and paste them:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

*Note: If no env credentials are provided, the app will run in **Mock Data Mode** automatically, showing the offline fallback data.*

### 4. Run Development Server
Start the Next.js development server locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── analytics/       # Analytics page
│   │   ├── courses/         # All courses grid page
│   │   ├── settings/        # App preferences & settings page
│   │   ├── globals.css      # Core style definitions & custom animations
│   │   ├── layout.tsx       # Root layout containing Sidebar component
│   │   ├── loading.tsx      # Skeleton loader fallback for lazy rendering
│   │   └── page.tsx         # Dashboard landing page
│   ├── components/
│   │   ├── ActivityTile.tsx # Interactive learning activity bar graph
│   │   ├── BentoGrid.tsx    # Layout wrappers (BentoGrid & BentoGridItem)
│   │   ├── CourseCard.tsx   # Individual course tile with 3D tilt + progress
│   │   ├── CourseGrid.tsx   # Staggered container wrapper for course cards
│   │   ├── HeroTile.tsx     # Hero banner and learning streak container
│   │   └── Sidebar.tsx      # Collapsible Left Nav with active state layoutId
│   └── lib/
│       ├── supabase-server.ts # Server-side Supabase client initialization
│       ├── supabase.ts      # Type definitions and configurations
│       └── utils.ts         # Utility for styling class mergers (cn)
├── supabase_setup.sql       # Seed database queries
└── .env.example             # Template for local environment configs
```
