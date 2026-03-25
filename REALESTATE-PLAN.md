# Zanzibaba Real Estate – Mpango wa Tovuti na Webapp

## Kaulimbiu
**realestate.zanzibaba.com** — Tovuti ya kisasa ya kuorodhesha mali (property listing) yenye urahisi kwa wakala (agents) kuongeza listings kutoka simu au desktop, na msaada wa AI kusafisha maandishi, kuongeza picha, na kuzalisha maelezo/tags.

---

## 1. Jinsi Itakavyokuwa (Overview)

### Watu watakaotumia
- **Wakala (Agents)** — wanaweka listings, wanabadilisha/kuondoa, wanaona takwimu zao
- **Wageni/Watafiti (Public)** — wanaona listings, wanafilter, wanawasiliana na wakala

### Mambo makuu
1. **Listing rahisi** — wakala anaweza kuweka listing kwa dakika chache: paste WhatsApp text → upload picha → AI inasaidia kusafisha/kuzalisha maelezo
2. **Paste raw WhatsApp SMS** — mfumo unachukua maelezo yasiyo na muundo (kutoka WhatsApp) na kuyageuza kuwa listing sahihi (title, description, price, location, features)
3. **Upload picha** — picha nyingi kwa listing, optional **image enhancing** (AI) ili picha zionekane nzuri
4. **AI generation** — maelezo (description), kichwa (title), tags, hashtags — kwa listing mpya au kusafisha ile iliyopo
5. **Modern UI** — grid/list ya properties, filters (price, location, type), search, mobile-friendly

---

## 2. Ukubwa wa Mfumo (Scope)

### Kurasa / Sehemu za Tovuti

| Sehemu | Maelezo |
|-------|---------|
| **Home / Listings** | Ukurasa kuu: grid ya properties, filters (bei, eneo, aina ya mali), search, “Featured” |
| **Property detail** | Ukurasa mmoja kwa kila property: picha, maelezo, map (optional), “Contact agent” (WhatsApp/email) |
| **Agent dashboard** | Kwa wakala tu: orodha ya listings zao, “Add listing”, edit/delete, takwimu rahisi |
| **Add/Edit listing** | Form moja yenye: paste WhatsApp text → parse → fields (title, description, price, location, type, features), upload images, “Enhance images”, “Generate description/title/tags” |

### Flow ya Wakala (Agent Flow)

```
1. Wakala anaingia kwenye dashboard (login)
2. Anabofya "Add listing"
3. Anaweza:
   A. Ku-paste maandishi kamili kutoka WhatsApp (description ya property)
     → Mfumo (AI) inachambua na kujaza: title, price, location, features, description safi
   B. Kujaza manual: title, description, price, location, property type, etc.
   C. Mchanganyiko: paste kwanza, kisha kurekebisha fields
4. Upload picha (kutoka simu au desktop)
   → Optional: "Enhance images" (AI) kabla ya kuhifadhi
5. Optional: "Generate description" / "Generate title" / "Generate tags & hashtags" (AI)
6. Anabofya "Publish" au "Save draft"
7. Listing inaonekana kwenye tovuti ya umma na kwenye dashboard yake
```

### Flow ya “Paste WhatsApp → Proper Listing”

- **Input:** Maandishi yasiyo na muundo (mfano kutoka WhatsApp):
  - "Plot 50x100 Paje tsh 80M negotiable, 5min from beach, water electricity available..."
- **Utaratibu:**
  1. Wakala ana-paste kwenye text area maalum (“Paste from WhatsApp”)
  2. Backend/API inatumia AI (e.g. OpenAI/Claude) kuchambua maandishi na kutoa:
     - **Title** (short, clear)
     - **Price** (number + currency)
     - **Location** (place name, area)
     - **Description** (paragraph(s) safi, professional)
     - **Features** (list: e.g. "Water", "Electricity", "Near beach")
     - **Property type** (plot, house, apartment, etc.) ikiwezekana
  3. Form inajazwa automatically; wakala anaweza kurekebisha
  4. Baada ya kukubali, anaupload picha na kupublish

Hii itasaidia wakala kufanya kazi haraka na kutoka simu bila kujaza form ndefu.

---

## 3. Vipengele Maalum (Features)

### Kwa Wakala (Agents)
- **Login / Register** — ili kila agent aone listings zake na takwimu
- **Dashboard** — orodha ya listings (published + drafts), quick stats
- **Add listing** — form yenye:
  - **Paste WhatsApp** box → AI parse → auto-fill
  - Fields: title, description, price, location, property type, features (tags)
  - **Image upload** — multi-image, reorder, optional **image enhancing** (AI)
  - Buttons: “Generate description”, “Generate title”, “Generate tags & hashtags”
- **Edit / Delete listing** — kutoka dashboard
- **Draft vs Published** — kuweka draft kabla ya kutoa hadharani

### Kwa Umma (Public)
- **Listings page** — grid/list, pagination au “load more”
- **Filters** — price range, location, property type, features
- **Search** — keyword (title, location, description)
- **Property page** — picha, maelezo, map (optional), “Contact agent” (WhatsApp link, email)
- **Responsive** — simu na desktop

### AI Features (summary)
| Feature | Kazi |
|--------|-----|
| **Parse WhatsApp text** | Raw SMS → title, price, location, description, features |
| **Generate description** | Kutoka title/location/features → paragraph(s) professional |
| **Generate title** | Kutoka maelezo → kichwa kifupi na wazi |
| **Generate tags & hashtags** | Keywords na hashtags za kushare (Instagram, etc.) |
| **Image enhancing** | Picha moja au nyingi → mwanga, contrast, clarity (AI) |

---

## 4. Teknolojia (Tech Stack) – Mapendekezo

- **Frontend:** React (Next.js) au Vue/Nuxt — SPA/SSR, modern UI (e.g. Tailwind CSS)
- **Backend:** Node.js (Next.js API routes) au backend tofauti (e.g. Express/Fastify) — API kwa auth, listings, AI
- **Database:** PostgreSQL au SQLite (development) — users, agents, listings, images
- **Storage picha:** Cloud (e.g. S3, Cloudinary) au local storage kwa mwanzo
- **Auth:** Simple login (email + password) au “magic link”; agents tu wana dashboard
- **AI:** API ya OpenAI au Claude — parse text, generate description/title/tags, image enhancing (au dedicated image API)

Hii inaweza kujengwa step-by-step: kwanza listing + upload + public site, kisha agent auth, kisha paste WhatsApp + AI, mwishoni image enhancing.

---

## 5. UX (User Experience) – Muonekano na Urahisi

- **Theme:** Clean, professional, picha kubwa na wazi (real estate style)
- **Colors:** Unaweza kufuata brand ya Zanzibaba (bluu/brown/white) ili kuendana na zanzibaba.com
- **Mobile-first:** Form ya “Add listing” inavyofaa simu (paste, upload picha kutoka gallery)
- **Speed:** Lazy load images, pagination, caching ili tovuti iwe responsive

---

## 6. Usalama na Mipaka

- **Agents only** — dashboard na add/edit ni kwa watu waliosajiliwa kama agents
- **Listings** — kila agent anaona na kurediti listings zake tu (admin anaweza kuona zote)
- **API keys** — AI keys (OpenAI etc.) zihifadhiwe server-side only, kamwe frontend
- **Upload** — limit size na type ya picha; scan kwa malware ikiwa kuna budget

---

## 7. Hatua za Kujenga (Phases)

| Phase | Kazi |
|-------|-----|
| **1** | Setup project (Next.js + DB + auth skeleton), design DB (users, agents, listings, images) |
| **2** | Public site: listings page, filters, search, property detail page |
| **3** | Agent auth + dashboard + Add/Edit listing (manual form + image upload) |
| **4** | “Paste WhatsApp” → AI parse → auto-fill form |
| **5** | AI: Generate description, title, tags/hashtags |
| **6** | Image upload flow + optional **image enhancing** (AI) |
| **7** | Polish: SEO, performance, analytics (optional) |

---

## 8. Muhtasari

- **realestate.zanzibaba.com** itakuwa tovuti ya kisasa ya property listing.
- **Wakala** wanaweza kuweka listings kwa urahisi kutoka simu/desktop: **paste WhatsApp text** → mfumo inabadilisha kuwa listing sahihi, **upload picha**, na **AI** kwa maelezo, title, tags na image enhancing.
- **Umma** anaona listings, filter, search, na kuwasiliana na wakala (WhatsApp).
- Mfumo unaelezwa hapa kwa mujibu wa mahitaji yako; baada ya kukubali, tunaweza kuanza na Phase 1 (setup na public listings).

---

*Ili kuanza kujenga, sema phase unayotaka kuanza (kwa mfano Phase 1), au tueleze mabadiliko yoyote kwenye mpango huu.*
