# 🕌 Ayat Extension — Development Planning Prompt

## Context for the Agent

You are a senior product/technical planner helping develop **Ayat**, a Plasmo-based Chrome/Firefox browser extension that displays a random Quran verse (ayah) on every webpage the user visits.

### Current Tech Stack
- **Extension:** Plasmo framework, TypeScript, React, Shadow DOM, Chrome Storage API
- **Landing Page:** Next.js, AR/EN i18n, Tailwind CSS
- **APIs Used:** `quranenc.com` for verse + translation, `everyayah.com` for audio
- **Fonts:** UthmanicHafs (Arabic rendering), Amiri Quran (canvas/screenshot)

### What Already Exists (as of v1.3.0)
- Random ayah display as a toast on every page
- Enable/disable toggle + site exclusion list
- Dark/Light mode
- AR/EN i18n with RTL/LTR support
- 60+ reciters with audio playback (play/pause)
- Copy ayah text (with surah, ayah, juz info)
- Save ayah as image (canvas, UthmanicHafs font, gold frame design)
- Juz tracking and badge display
- Toast position selector (Top/Bottom × Left/Right)
- Next/Previous verse navigation within surah (with circular wrap)
- UthmanicHafs font injected into Shadow DOM via `@font-face`
- Landing page with new branding, glassmorphism design, contact links

---

## 📋 Full To-Do List

### 🔧 Extension — New Features

- [ ] **Translation Options**
  - Add a translation selector in the popup
  - Support multiple QuranEnc slugs: `arabic_tafseer`, `urdu`, `french`, `indonesian`, etc.
  - Persist selected translation in `chrome.storage`

- [ ] **Verse of the Day**
  - Option to show the same verse all day instead of random per page
  - Use `date string + seed` for deterministic selection
  - Toggle between "Random" and "Daily" mode in popup settings

- [x] **Favorite / Bookmark Verses**
  - Heart/bookmark button on the toast
  - Save favorites to `chrome.storage.local`
  - Show a "Favorites" section in the popup or a dedicated page

- [x] **Keyboard Shortcuts**
  - Use `commands` API in `manifest.json`
  - Shortcuts for: toggle extension on/off, refresh verse, minimize/expand toast

- [x] **Notification Frequency Control**
  - Option to show the toast only on first visit per session
  - Or every N pages (e.g. every 3 pages)
  - Setting stored in `chrome.storage`

- [x] **Share to Social**
  - Share buttons on the toast: Twitter/X, WhatsApp
  - Open share URLs pre-filled with the ayah text + surah info

- [ ] **Offline / Caching**
  - Cache recently fetched verses in `chrome.storage.local` or IndexedDB
  - Serve from cache when offline
  - Add `everyayah.com` to `host_permissions` to fix audio in some setups

- [ ] **New Tab Page**
  - Optional override for the new tab page
  - Shows a verse, clean minimal design, quick links to settings and landing page
  - Toggle on/off in popup

- [ ] **More UI Languages**
  - Add Urdu, Turkish, French, Indonesian support
  - Apply to both the popup UI labels and verse translations

---

### ⚙️ Extension — Enhancements

#### Technical
- [x] **Error Handling** — Add retry logic and fallback UI when QuranEnc or EveryAyah requests fail
- [x] **Loading State** — Show a spinner or skeleton in the toast while fetching
- [ ] **Accessibility** — Improve ARIA labels, focus management, and keyboard navigation in both popup and toast
- [ ] **Remove BETA Badge** — Drop it once the extension is considered stable
- [ ] **i18n for Dedication Tooltip** — Move the hardcoded dedication text into the i18n translation files (AR/EN)

#### UX
- [x] **Reciter Search** — Add a search/filter input inside the reciter dropdown
- [x] **Smoother Toast Animations** — Improve enter/exit transitions (e.g. slide + fade)
- [x] **Copy Feedback** — Show a brief toast or visual confirmation when copying text or image
- [ ] **Image Export Templates** — Offer multiple styles for "Save as image" (minimal, ornate, dark, etc.)

#### Performance
- [ ] **Lazy Load Reciters** — Load the reciter list on demand as the dropdown is opened
- [x] **Preload Fonts** — Ensure UthmanicHafs is loaded before first render to avoid FOUT (Flash of Unstyled Text)

---

### 🌐 Landing Page — Enhancements

#### Content & Trust
- [ ] **Screenshots / Demo Section** — Add a "See it in action" section with screenshots of toast, popup, and image export; optionally a short GIF or video
- [ ] **Trust & Social Proof** — Pull or link to Chrome Web Store reviews, update user count to real numbers, add short user testimonials (with permission), add badges if applicable ("Editors' Pick", etc.)
- [ ] **"What's New" Section** — Highlight the latest version's features (v1.3.0)
- [ ] **FAQ Section** — Answer common questions: "Does it work offline?", "Can I choose the verse?", "Is my data collected?", "What languages are supported?"
- [ ] **Comparison Section** — "Why Ayat?" vs generic Quran apps or other browser extensions

#### SEO & Metadata
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add `hreflang` alternate tags for AR/EN
- [ ] Add more specific `<meta>` keywords (e.g. "Quran browser extension", "daily verse", "Islamic extension")
- [ ] Add `canonical` URLs
- [ ] Add JSON-LD structured data for the product/extension

#### Conversion & UX
- [ ] **Improve Hero Copy** — Clear headline, one primary CTA, short benefit statement above the fold
- [ ] **Urgency Line** — e.g. "Start your day with a verse — install in seconds"
- [ ] **Store Listing Alignment** — Ensure hero and feature copy match the Chrome Web Store description
- [ ] **Roadmap / Coming Soon** — Simple public list to show the extension is actively developed
- [ ] **Animated Walkthrough** — Short "How it works" video or Framer Motion animated steps
- [ ] **Subtle Animations** — Apply Framer Motion to hero and feature cards

#### Navigation & Links
- [ ] Add a direct link to the Chrome Web Store listing in the navbar
- [ ] Add a "Report an issue" / Contact link
- [ ] Optional newsletter signup for update notifications

#### Performance & Accessibility
- [ ] Ensure all CTAs and layout work well on mobile
- [ ] Optimize images (WebP format, correct sizes)
- [ ] Use `next/image` for all images
- [ ] Aim for good Core Web Vitals (LCP, CLS, INP)
- [ ] Ensure contrast and readability for accessibility

#### Analytics & Feedback
- [ ] Add privacy-friendly analytics (e.g. Plausible or Fathom)
- [ ] Add a feedback form or link to support (email / WhatsApp)

---

### 💼 Business / Growth

- [ ] **Monetization** — Add an optional "Support the developer" link (Ko-fi, Buy Me a Coffee, or Sadaqah Jariyah framing)
- [ ] **Growth** — Share in Islamic tech communities, forums, and social media
- [ ] **Differentiation Messaging** — Emphasize: privacy-first, no ads, offline support, quality Arabic typography vs generic Quran extensions

---

## 🚀 Suggested Priority Order

| Priority | Area | Task |
|----------|------|------|
| 🔴 High | Extension | Error handling + loading state |
| 🔴 High | Extension | Remove BETA badge |
| 🔴 High | Landing | Screenshots / demo section |
| 🔴 High | Landing | FAQ section |
| 🔴 High | Landing | SEO: hreflang + metadata + JSON-LD |
| 🟡 Medium | Extension | Verse of the Day |
| 🟡 Medium | Extension | Favorite / Bookmark verses |
| 🟡 Medium | Extension | Translation options |
| 🟡 Medium | Extension | Keyboard shortcuts |
| 🟡 Medium | Landing | Trust & social proof |
| 🟡 Medium | Landing | Animated walkthrough |
| 🟢 Low | Extension | New Tab Page |
| 🟢 Low | Extension | Share to Social |
| 🟢 Low | Extension | More languages |
| 🟢 Low | Landing | Newsletter signup |
| 🟢 Low | Business | Ko-fi / Sadaqah Jariyah link |

---

## Instructions for the Agent

Using the context and to-do list above, please:

1. **Create a detailed sprint plan** — group tasks into logical sprints (e.g. Sprint 1: Stability & Quick Wins, Sprint 2: Core Features, Sprint 3: Growth)
2. **For each task**, provide:
   - Estimated effort (S / M / L)
   - Technical approach / implementation notes
   - Any dependencies on other tasks
3. **Identify any risks or blockers** (e.g. API limitations, browser extension manifest constraints)
4. **Suggest a versioning strategy** — what goes into v1.3.1, v1.4.0, v2.0.0, etc.