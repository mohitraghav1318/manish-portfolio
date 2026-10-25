# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

There is no test runner or linter configured. Use `npx tsc --noEmit` for a type check (strict mode is on).

## Architecture

Single-page portfolio (Next.js 15 App Router, React 19, TypeScript). `app/page.tsx` composes the sections in order: Nav, Hero, Marquee, Work, About, Kit, Services, Contact, Footer. Styling is one global stylesheet, `app/globals.css` (no CSS modules or Tailwind). Fonts are loaded in `app/layout.tsx` via `next/font/google` and exposed as `--font-d` / `--font-b`. The `@/*` alias maps to the repo root.

**All content lives in `data/site.ts`** (name, role, contact, socials, nav, hero copy, work items, bio, gear, services, footer, meta). Components must not hard-code names, links or copy; read them from the exported `site` object and add new fields (and their types) there.

### Work items and video
- `WorkItem` (in `data/site.ts`) drives the Work grid. `category` must match a key in `work.categories`; `colors` is the gradient shown until a poster/video exists. The first item renders as the `wide` card.
- `lib/video.ts` `parseVideo()` turns a `video` string into `{kind, src, poster}`: YouTube (thumbnail derived automatically, embedded via youtube-nocookie), Vimeo, or a local file under `public/videos/`. `Work.tsx` uses it for thumbnails; `VideoModal.tsx` uses it for playback. Vertical reels set `ratio: '9/16'`.
- Local images go in `public/images/` (e.g. `about.image` for the portrait).

### Client vs server components
Most sections are server components. Interactive ones are marked `'use client'`: `Work` (category filter, 3D tilt via CSS vars `--rx`/`--ry`, modal state), `VideoModal`, `Nav`, `Cursor` (custom cursor, mounted in the layout), `Timecode`, `Stats`, `FooterClient` (split from `Footer`, which stays a server component). Keep that split when adding interactivity: put the client part in its own component rather than marking a whole section client.
