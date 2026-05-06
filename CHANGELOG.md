# Changelog

All notable changes to the **Ayat** extension will be documented in this file.

---

## [1.3.1] — 2026-05-06

### 🛠 Stability & UX

- **More resilient verse fetching**
  - Added request timeouts and retry logic when fetching from QuranEnc.
  - Added a safe fallback error UI with a **Retry** button when the initial fetch fails.
  - Existing toasts now show fetch/API/offline errors in a bottom alert without hiding the current ayah.

- **Loading state**
  - Toast now shows a lightweight loading UI while the first ayah is being fetched.
  - Next, previous, and refresh actions now show an in-toast loading skeleton until the new ayah arrives.

- **Font preloading**
  - Warmed up Arabic fonts earlier to reduce FOUT and improve first-render consistency.

- **Copy feedback improvements**
  - Copy actions now handle failures more safely and reset feedback state reliably.

- **Audio proxy hardening**
  - Background audio fetch now uses a timeout and a safer base64 conversion for large MP3s.

---

## [1.3.0] — 2026-04-28

### ✨ New Features

- **Popup Position Selector**
  - Added a new setting in the popup to choose the position of the Ayah toast on the page.
  - Four position options: **Top Left**, **Top Right**, **Bottom Left**, and **Bottom Right** (default).
  - Position is displayed as a 2×2 visual grid in the popup settings with active state highlighting.
  - The selected position is persisted in storage and applied in real-time — no page refresh required.
  - Both the minimized floating button and the expanded toast respect the chosen position.
  - Full Arabic and English translations for the position labels.

- **Next / Previous Verse Navigation**
  - Added **◀ Previous** and **▶ Next** navigation buttons to the toast action bar.
  - Navigate sequentially through verses within the current surah.
  - Automatic surah wrapping: clicking Next on the last ayah of a surah advances to ayah 1 of the next surah; clicking Previous on ayah 1 goes to the last ayah of the previous surah.
  - Circular navigation: Surah 114 wraps to Surah 1, and vice versa.
  - Audio playback stops automatically when navigating to a new verse.
  - Buttons are disabled during fetch to prevent double-clicks.

- **Forced UthmanicHafs Font**
  - The UthmanicHafs font is now loaded directly into the shadow DOM via `@font-face`, ensuring it renders correctly regardless of host page or device.
  - Explicit `font-family` is applied to all Arabic text elements (ayah body, surah name, juz badge, ayah number) — no more fallback to browser defaults.
  - Fonts are also still loaded via the FontFace API for canvas/screenshot use.

---

## [1.2.1] — 2026-03-05
- ** Fix Ui bugs
  - Enhanced the minimze button position 
---

## [1.2.0] — 2026-03-05

### ✨ New Features & Enhancements

- **New Branding & Logo**
  - Updated the extension's primary icon to a new, highly detailed Islamic-themed logo featuring a mosque dome and open book.
  - Reflected the new logo in the extension popup header, the landing page hero section, the navbar, and as the browser favicon (`icon-dark.png`).

- **Landing Page Redesign**
  - Full aesthetic overhaul matching the elegant SirahBooks theme (dark navy, gold accents, glassmorphism).
  - Replaced all emojis with premium custom SVG icons for a professional look.
  - Implemented the 'Graphik Arabic' font for the primary typography.
  - Added contact links (LinkedIn, WhatsApp, Facebook) with respective icons in the footer.
  - Download buttons now feature official browser logos for Chrome and Firefox.

- **Screenshot (Image Export) Typography**
  - The generated Ayah screenshots now use the prestigious **UthmanicHafs** font for rendering the Quranic Arabic text.
  - Integrated the Uthmanic font locally within the extension (`web_accessible_resources`) to ensure flawless rendering across all environments without network requests.

- **Refined Copy Format**
  - The "Copy Text" feature now includes the Juz number in its formatted output.
  - Formatted layout: `— {Surah Name} , {Ayah/آية} {number} [{Juz/الجزء} {number}]`

- **UI Polishes**
  - Replaced the standard chevron icon for minimizing the toast with a dedicated "shrink/minimize" (inward arrows) SVG icon.
  - Added the 'UthmanicHafs' font as the primary display font for the landing page title spans.

---

## [1.1.0] — 2026-03-04

### ✨ New Features

- **Dark / Light Mode**
  - Added theme toggle (☀️ / 🌙) in the popup settings.
  - Both the popup and the toast adapt to the selected theme — backgrounds, text, borders, badges, and buttons all change accordingly.
  - Dark mode uses a `gray-800/900` palette with emerald accents; light mode uses `green-50` with teal borders.

- **Internationalization (i18n)**
  - Full Arabic and English support for the entire extension.
  - All popup labels, buttons, and descriptions are translated.
  - Reciter names display in Arabic (`arabicName`) when Arabic is selected, and English (`name`) otherwise.
  - Text direction (RTL / LTR) is applied automatically based on the language.
  - Toast labels (آية / Ayah) and surah names adapt to the selected language.

- **Reciter Selection**
  - Added a reciter dropdown in the popup with 60+ reciters.
  - Each reciter has a `name`, `arabicName`, `subfolder`, and `bitrate`.
  - Audio URL is dynamically constructed using the selected reciter's subfolder:
    `https://everyayah.com/data/{subfolder}/{surah}{ayah}.mp3`
  - Reciter names display with spaces instead of underscores for readability.

- **Audio Playback**
  - Added play/pause button on the toast.
  - Audio resumes from the paused position instead of restarting.
  - Audio stops when the toast is dismissed or the extension is disabled.

- **Copy Ayah Text**
  - Added a copy button (📋) on the toast action bar.
  - Copies the ayah text along with surah name, number, and ayah number.
  - Shows a ✓ checkmark for 2 seconds after a successful copy.

- **Save Ayah as Image (Refined)**
  - Redesigned canvas output to match premium SirahBooks aesthetics.
  - Generates an elegant gold double-border frame with ornate decorative corners.
  - Dynamically centers Ayah text, adjusting layout for Arabic/English with word-wrapping.
  - Conditionally displays "Bismillah" at the top (omitted for Surah At-Tawbah and Al-Fatihah v. 1).
  - Displays Juz and Ayah numbers clearly in the footer area inside the frame.
  - Added a clean extension version watermark outside the main decorative frame.
  - Beautifully renders Arabic calligraphy using the newly bundled offline `Amiri Quran` font.

- **Offline Calligraphy Font**
  - Bundled the `Amiri Quran` (`.ttf`) font locally within the extension to ensure reliable rendering.
  - Ensures accurate Arabic typography in both the live toast and downloaded screenshots, bypassing content-script sandboxing and external network blocks.

- **Juz Tracking in Toast**
  - Added comprehensive Surah-to-Juz mappings in the data layer.
  - The toast badge now dynamically displays the accurate Juz number (e.g., "Juz 2" / "جزء ٢") corresponding to the current random Ayah, instead of the Surah number.
- **Excluded Sites UI Redesign**
  - The "Excluded Sites" section in the popup is now a compact, collapsible disclosure panel to save vertical space.
  - Improved the current site exclusion button: the "Re-enable" state is now styled in green to clearly distinguish it from the destructive red "Exclude" state.

- **Collapse Button Update**
  - Corrected the collapse toggle chevron direction to point rightward, matching the layout.

- **Selectable Ayah Text**
  - The ayah body text is now selectable — users can highlight and copy text directly.
  - Clicking the body no longer collapses the toast.

### 🔄 Changes

- **API Updated**
  - Switched to `https://quranenc.com/api/v1/translation/aya/english_saheeh/{surah}/{ayah}`.
  - Random surah and ayah selection ensures valid ayah numbers based on surah ayah counts.

- **Data Layer Enhancements**
  - Integrated detailed Juz range arrays for all 114 Surahs.
  - Added `arabic_name` to all 114 surahs in `data.ts`.
  - Added `arabicName` to all reciters in the `quraa` object.

- **Hover Behavior Improved**
  - Auto-minimize timer pauses when the user hovers over the toast.
  - Timer resumes with the remaining time when the mouse leaves.

### 🔒 Permissions Cleaned Up

- **Removed `tabs` permission** — `activeTab` is sufficient since only the current tab is queried in the popup.
- Final permissions: `storage`, `activeTab`.
- Host permission: `https://quranenc.com/*`.

### 📦 Version

- Bumped from `1.0.2` → `1.1.0`.

---

## [1.0.2] — Initial release

- Basic Quran verse display on every page.
- Enable/disable toggle.
- Site exclusion list.
- Auto-minimize with toast animation.
