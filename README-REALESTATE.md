# Zanzibaba Real Estate – realestate.zanzibaba.com

Modern property listing site for Zanzibar. Built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

## Run locally (in Cursor)

```bash
cd /Users/apple/zanzibaba
npm install
npm run dev
```

Then open **http://localhost:3000** (or the port shown, e.g. 3001 if 3000 is in use) in your browser.

**Live reload:** When you save a file, the dev server updates the page automatically. If you see a "Server Error" (e.g. `Cannot find module './948.js'`), clear the cache and restart: `rm -rf .next && npm run dev`.

## What’s included

- **Home** – Hero, search bar, filters (type, location, price), featured + all listings grid
- **Property page** – `/properties/[slug]` with images, description, features, WhatsApp CTA
- **Agent dashboard** – `/dashboard` (login at `/login`). List, add, edit, delete listings; upload images; save as draft or publish.
- **SEO** – Metadata, Open Graph, `sitemap.xml`, `robots.txt`
- **Responsive** – Mobile-first layout
- **Storage** – Listings in `data/listings.json` (created on first add); seed data in `data/listings.ts` used when no JSON file exists.

### Login (agents)

- Go to **http://localhost:3000/login**
- Default password: **zanzibaba2025** (set `DASHBOARD_PASSWORD` in `.env` to change)

### Import listings (dashboard)

- **Outscraper:** Set `OUTSCRAPER_API_KEY` in `.env` → Dashboard → “Import from Outscraper” (Google Maps search).
- **Apify:** Set `APIFY_API_TOKEN` (or `APIFY_TOKEN`) in `.env` → Dashboard → “Import from Apify”. Enter an Actor ID (e.g. `whitewalk/real-estate-scraper`) and optional JSON input; run imports dataset items as draft listings.

## Project structure

```
app/
  layout.tsx       # Root layout, fonts, metadata
  page.tsx         # Home (listings + filters)
  globals.css
  sitemap.ts       # SEO sitemap
  robots.ts        # SEO robots
  properties/[slug]/page.tsx  # Property detail
components/
  Header.tsx
  Footer.tsx
  Hero.tsx         # Hero + search
  FilterBar.tsx    # Type, location, price filters
  SearchBar.tsx
  PropertyCard.tsx
  ListingsSection.tsx
data/
  listings.ts      # Seed listings (edit here for now)
lib/
  types.ts         # Listing, PropertyType
  filter-listings.ts
```

## Next steps (from REALESTATE-PLAN.md)

1. ~~**Agent dashboard**~~ ✅ Done
2. **Paste WhatsApp** – Raw SMS → AI parse → auto-fill form
3. **AI** – Generate description, title, tags; image enhancing
4. **Database** – Replace JSON file with DB (e.g. PostgreSQL) for production

## Deploy

- Set **realestate.zanzibaba.com** to point to your host
- Build: `npm run build`
- Run: `npm start` or deploy to Vercel/Netlify
