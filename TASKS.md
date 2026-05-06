# Ayat Task Checklist

Use this file as the live implementation checklist. Update it whenever a task is started, completed, deferred, or changed.

## Current Version

- [ ] Confirm target package version for `v1.4.0`
- [x] Update `CHANGELOG.md` for Notification Frequency Control

## Sprint B - User Control Features

### Notification Frequency Control

- [x] Add config types for notification frequency
- [x] Add default settings for notification frequency
- [x] Add popup UI for frequency selection
- [x] Add every-page mode
- [x] Add first-per-session mode
- [x] Add every-N-pages mode
- [x] Add configurable N-pages interval
- [x] Gate initial toast loading before fetching an ayah
- [ ] Manually test every-page mode in Chrome
- [ ] Manually test first-per-session mode in Chrome
- [ ] Manually test every-N-pages mode in Chrome
- [ ] Manually test behavior after clearing `chrome.storage.session`
- [ ] Confirm Firefox behavior or note follow-up risk
- [ ] Decide whether SPA route changes need support in this version

### Favorite / Bookmark Verses

- [x] Define `FavoriteAyah` data shape
- [x] Add storage helpers for favorites
- [x] Add favorite toggle in toast
- [x] Add favorites list in popup
- [x] Add remove favorite action
- [x] Add favorites search/filter
- [x] Update `CHANGELOG.md`
- [ ] Manually test favorite toggle in Chrome
- [ ] Manually test popup favorites list in Chrome
- [ ] Manually test favorites search/filter in Chrome

### Keyboard Shortcuts

- [ ] Add extension commands to manifest
- [ ] Add background command listener
- [ ] Add content-script message handlers
- [ ] Add shortcut for show/hide toast
- [ ] Add shortcut for refresh ayah
- [ ] Add shortcut for minimize/expand
- [ ] Update `CHANGELOG.md`

## Sprint C - Sharing + Discovery

### Share to Social

- [ ] Create shared ayah formatter
- [ ] Add share UI in toast
- [ ] Add native share support where available
- [ ] Add WhatsApp share URL
- [ ] Add X/Twitter share URL
- [ ] Add copy fallback
- [ ] Update `CHANGELOG.md`

### Reciter Search

- [ ] Replace reciter dropdown with searchable control
- [ ] Add client-side filtering
- [ ] Add keyboard navigation
- [ ] Persist selected reciter
- [ ] Test long-list performance
- [ ] Update `CHANGELOG.md`

## Cross-Cutting

- [x] Port redesigned toast UI from `Redesign Toast UI`
- [x] Port redesigned popup Settings / Library UI
- [x] Add `lucide-react` icon dependency
- [x] Refresh Tailwind v3 design tokens for redesigned light/dark system
- [x] Harden toast styles against host-page CSS inheritance
- [x] Keep `TASKS.md` updated with every feature change
- [x] Keep `CHANGELOG.md` updated with every shipped user-facing change
- [ ] Bump package version before release
- [x] Run build before release
- [ ] Note any blocked verification steps
