import React, { useEffect, useMemo, useState, type ReactNode } from "react"
import {
  Ban,
  Bookmark,
  Check,
  ChevronDown,
  Copy,
  Library,
  Minus,
  Moon,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Trash2
} from "lucide-react"

import { quraa } from "./data"
import {
  type AyatConfig,
  type FavoriteAyah,
  type Language,
  type NotificationFrequency,
  type PopupPosition,
  type Theme,
  getConfig,
  getFavorites,
  getHostname,
  removeFavorite,
  setConfig,
  setFavorites as persistFavorites
} from "./storage"
import "./style.css"

type PopupTab = "settings" | "library"

interface ReciterOption {
  id: string
  name: string
  arabicName: string
  bitrate: string
  initials: string
  hue: number
}

const t = {
  ar: {
    title: "رفيق القرآن",
    subtitle: "آيات هادئة أثناء التصفح",
    settings: "الإعدادات",
    library: "المحفوظات",
    displayGroup: "العرض",
    displaySubtitle: "طريقة ظهور الآيات",
    languageTitle: "اللغة",
    themeTitle: "المظهر",
    frequencyGroup: "التكرار",
    frequencySubtitle: "متى تظهر الآيات",
    everyPage: "كل صفحة",
    firstPerSession: "أول زيارة",
    everyNPages: "كل عدة صفحات",
    showEvery: "اعرض كل",
    pages: "صفحات",
    reciterGroup: "القارئ",
    reciterSubtitle: "صوت التلاوة",
    reciterSearch: "ابحث عن قارئ...",
    noReciters: "لا توجد نتائج",
    positionGroup: "الموضع",
    positionSubtitle: "مكان ظهور التنبيه",
    positionLabels: {
      "top-left": "أعلى يسار",
      "top-right": "أعلى يمين",
      "bottom-left": "أسفل يسار",
      "bottom-right": "أسفل يمين"
    },
    siteGroup: "هذا الموقع",
    blockSite: "استبعاد هذا الموقع",
    siteBlocked: "الموقع مستبعد",
    savedCount: "محفوظة",
    clearAll: "مسح الكل",
    favoritesSearch: "ابحث في الآيات المحفوظة...",
    noFavorites: "لا توجد آيات محفوظة بعد",
    noFavoritesHint: "اضغط علامة الحفظ في أي آية لإضافتها هنا.",
    noFavoriteResults: "لا توجد نتائج",
    copy: "نسخ",
    delete: "حذف",
    madeWithIntention: "صنع بنية طيبة"
  },
  en: {
    title: "Quran companion",
    subtitle: "Mindful verses, while you browse.",
    settings: "Settings",
    library: "Library",
    displayGroup: "Display",
    displaySubtitle: "How verses appear",
    languageTitle: "Language",
    themeTitle: "Theme",
    frequencyGroup: "Frequency",
    frequencySubtitle: "When verses appear",
    everyPage: "Every page",
    firstPerSession: "First visit",
    everyNPages: "Every N pages",
    showEvery: "Show every",
    pages: "pages",
    reciterGroup: "Reciter",
    reciterSubtitle: "Voice for audio playback",
    reciterSearch: "Search reciters...",
    noReciters: "No reciters found",
    positionGroup: "Position",
    positionSubtitle: "Where the toast appears",
    positionLabels: {
      "top-left": "Top left",
      "top-right": "Top right",
      "bottom-left": "Bottom left",
      "bottom-right": "Bottom right"
    },
    siteGroup: "This site",
    blockSite: "Block on this site",
    siteBlocked: "Site blocked",
    savedCount: "saved",
    clearAll: "Clear all",
    favoritesSearch: "Search saved ayat...",
    noFavorites: "No saved ayat yet",
    noFavoritesHint: "Tap the bookmark icon on any verse to save it here.",
    noFavoriteResults: "No matches",
    copy: "Copy",
    delete: "Delete",
    madeWithIntention: "Made with intention"
  }
}

function getReciterOptions(): ReciterOption[] {
  return Object.entries(quraa).map(([id, reciter], index) => {
    const sourceName = reciter.name || reciter.arabicName || id
    const initials = sourceName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .padEnd(2, sourceName[0]?.toUpperCase() || "R")
      .slice(0, 2)

    return {
      id,
      name: reciter.name,
      arabicName: reciter.arabicName,
      bitrate: reciter.bitrate,
      initials,
      hue: (index * 47 + 32) % 360
    }
  })
}

function buildFavoriteCopyText(favorite: FavoriteAyah, language: Language) {
  return language === "ar"
    ? `${favorite.arabicText}\n— سورة ${favorite.surahArabicName}، آية ${favorite.ayahNumber}`
    : `"${favorite.translation}"\n— Surah ${favorite.surahName}, Ayah ${favorite.ayahNumber}`
}

function Popup() {
  const [config, setLocalConfig] = useState<AyatConfig | null>(null)
  const [currentHostname, setCurrentHostname] = useState("")
  const [isCurrentExcluded, setIsCurrentExcluded] = useState(false)
  const [favorites, setFavorites] = useState<FavoriteAyah[]>([])
  const [tab, setTab] = useState<PopupTab>("settings")
  const [reciterOpen, setReciterOpen] = useState(false)
  const [favoriteSearch, setFavoriteSearch] = useState("")
  const [copiedFavoriteId, setCopiedFavoriteId] = useState<string | null>(null)

  const lang = config?.language || "ar"
  const isRtl = lang === "ar"
  const labels = t[lang]
  const dark = config?.theme === "dark"
  const reciters = useMemo(() => getReciterOptions(), [])

  useEffect(() => {
    getConfig().then(setLocalConfig)
    getFavorites().then(setFavorites)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) setCurrentHostname(getHostname(tabs[0].url))
    })
  }, [])

  useEffect(() => {
    if (config && currentHostname) {
      setIsCurrentExcluded(config.excludedSites.includes(currentHostname))
    }
  }, [config, currentHostname])

  async function updateConfig(configPatch: Partial<AyatConfig>) {
    const updated = await setConfig(configPatch)
    setLocalConfig(updated)
  }

  async function handleExcludeCurrentSite() {
    if (!config || !currentHostname) return

    await updateConfig({
      excludedSites: isCurrentExcluded
        ? config.excludedSites.filter((site) => site !== currentHostname)
        : [...config.excludedSites, currentHostname]
    })
  }

  async function handleRemoveFavorite(id: string) {
    const updated = await removeFavorite(id)
    setFavorites(updated)
  }

  async function handleClearFavorites() {
    await persistFavorites([])
    setFavorites([])
  }

  function copyFavorite(favorite: FavoriteAyah) {
    navigator.clipboard
      .writeText(buildFavoriteCopyText(favorite, lang))
      .catch((err) => console.error("Ayat: failed to copy favorite", err))
    setCopiedFavoriteId(favorite.id)
    setTimeout(() => setCopiedFavoriteId(null), 1800)
  }

  const filteredFavorites = favorites.filter((favorite) => {
    const query = favoriteSearch.trim().toLowerCase()
    if (!query) return true

    return [
      favorite.surahName,
      favorite.surahArabicName,
      favorite.arabicText,
      favorite.translation,
      `${favorite.surahNumber}:${favorite.ayahNumber}`
    ]
      .join(" ")
      .toLowerCase()
      .includes(query)
  })

  if (!config) {
    return (
      <div className="ayat-ui flex w-[400px] items-center justify-center bg-background p-6 text-foreground">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div
      className={`ayat-ui ${dark ? "dark" : ""} w-[400px] bg-background text-foreground`}
      dir={isRtl ? "rtl" : "ltr"}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <PopupHeader
        labels={labels}
        enabled={config.enabled}
        onEnabledChange={(enabled) => updateConfig({ enabled })}
        tab={tab}
        setTab={setTab}
        savedCount={favorites.length}
      />

      {tab === "settings" ? (
        <SettingsPanel
          labels={labels}
          config={config}
          currentHostname={currentHostname}
          isCurrentExcluded={isCurrentExcluded}
          reciters={reciters}
          reciterOpen={reciterOpen}
          setReciterOpen={setReciterOpen}
          onLanguageChange={(language) => updateConfig({ language })}
          onThemeChange={(theme) => updateConfig({ theme })}
          onFrequencyChange={(notificationFrequency) =>
            updateConfig({ notificationFrequency })
          }
          onIntervalChange={(notificationEveryNPages) =>
            updateConfig({ notificationEveryNPages })
          }
          onReciterChange={(reciter) => updateConfig({ reciter })}
          onPositionChange={(popupPosition) => updateConfig({ popupPosition })}
          onExcludeCurrentSite={handleExcludeCurrentSite}
        />
      ) : (
        <LibraryPanel
          labels={labels}
          language={lang}
          favorites={filteredFavorites}
          allFavorites={favorites}
          search={favoriteSearch}
          setSearch={setFavoriteSearch}
          copiedId={copiedFavoriteId}
          onCopy={copyFavorite}
          onDelete={handleRemoveFavorite}
          onClear={handleClearFavorites}
        />
      )}

      <Footer labels={labels} />
    </div>
  )
}

function PopupHeader({
  labels,
  enabled,
  onEnabledChange,
  tab,
  setTab,
  savedCount
}: {
  labels: (typeof t)["en"]
  enabled: boolean
  onEnabledChange: (value: boolean) => void
  tab: PopupTab
  setTab: (tab: PopupTab) => void
  savedCount: number
}) {
  return (
    <div className="border-b border-border bg-background px-5 pb-4 pt-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="m-0 text-[22px] font-bold leading-tight tracking-[-0.02em]">
            {labels.title}
          </h1>
          <p className="m-0 mt-0.5 text-[12.5px] text-muted-foreground">
            {labels.subtitle}
          </p>
        </div>
        <Switch on={enabled} onChange={onEnabledChange} />
      </div>

      <div className="flex rounded-lg bg-secondary p-1 text-[13px]">
        <TabBtn
          active={tab === "settings"}
          onClick={() => setTab("settings")}
          icon={<Settings2 size={13} />}
        >
          {labels.settings}
        </TabBtn>
        <TabBtn
          active={tab === "library"}
          onClick={() => setTab("library")}
          icon={<Library size={13} />}
        >
          {labels.library}
          <span
            className={`ms-1.5 rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${
              tab === "library"
                ? "bg-secondary text-foreground"
                : "bg-card text-muted-foreground"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {savedCount}
          </span>
        </TabBtn>
      </div>
    </div>
  )
}

function TabBtn({
  active,
  onClick,
  icon,
  children
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border-none px-3 py-2 transition-all ${
        active
          ? "bg-card text-foreground shadow-sm"
          : "bg-transparent text-muted-foreground hover:text-foreground"
      }`}
      style={{ fontWeight: active ? 600 : 500 }}
    >
      {icon}
      {children}
    </button>
  )
}

function SettingsPanel({
  labels,
  config,
  currentHostname,
  isCurrentExcluded,
  reciters,
  reciterOpen,
  setReciterOpen,
  onLanguageChange,
  onThemeChange,
  onFrequencyChange,
  onIntervalChange,
  onReciterChange,
  onPositionChange,
  onExcludeCurrentSite
}: {
  labels: (typeof t)["en"]
  config: AyatConfig
  currentHostname: string
  isCurrentExcluded: boolean
  reciters: ReciterOption[]
  reciterOpen: boolean
  setReciterOpen: (value: boolean) => void
  onLanguageChange: (value: Language) => void
  onThemeChange: (value: Theme) => void
  onFrequencyChange: (value: NotificationFrequency) => void
  onIntervalChange: (value: number) => void
  onReciterChange: (value: string) => void
  onPositionChange: (value: PopupPosition) => void
  onExcludeCurrentSite: () => void
}) {
  const currentReciter =
    reciters.find((reciter) => reciter.id === config.reciter) || reciters[0]

  return (
    <div className="animate-fade-up space-y-6 px-5 py-5">
      <Group label={labels.displayGroup} subtitle={labels.displaySubtitle}>
        <div className="grid grid-cols-2 gap-2">
          <SegmentField label={labels.languageTitle}>
            <Segmented
              options={[
                { id: "ar", label: "AR" },
                { id: "en", label: "EN" }
              ]}
              value={config.language}
              onChange={(value) => onLanguageChange(value as Language)}
            />
          </SegmentField>
          <SegmentField label={labels.themeTitle}>
            <Segmented
              options={[
                { id: "light", label: <Sun size={12} /> },
                { id: "dark", label: <Moon size={12} /> }
              ]}
              value={config.theme}
              onChange={(value) => onThemeChange(value as Theme)}
            />
          </SegmentField>
        </div>
      </Group>

      <Group label={labels.frequencyGroup} subtitle={labels.frequencySubtitle}>
        <div className="space-y-2">
          <div className="flex rounded-lg bg-secondary p-1 text-[13px]">
            {[
              { id: "everyPage", label: labels.everyPage },
              { id: "everyNPages", label: labels.everyNPages },
              { id: "firstPerSession", label: labels.firstPerSession }
            ].map((option) => {
              const active = config.notificationFrequency === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    onFrequencyChange(option.id as NotificationFrequency)
                  }
                  className={`flex-1 cursor-pointer rounded-md border-none px-2 py-1.5 transition-all ${
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontWeight: active ? 600 : 500 }}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          {config.notificationFrequency === "everyNPages" && (
            <div className="animate-fade-up flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
              <span className="text-[13px] text-muted-foreground">
                {labels.showEvery}
              </span>
              <Stepper
                value={config.notificationEveryNPages}
                setValue={onIntervalChange}
                min={2}
                max={50}
                unit={labels.pages}
              />
            </div>
          )}
        </div>
      </Group>

      <Group label={labels.reciterGroup} subtitle={labels.reciterSubtitle}>
        <ReciterSelect
          labels={labels}
          reciters={reciters}
          reciter={currentReciter}
          setReciter={(reciter) => onReciterChange(reciter.id)}
          open={reciterOpen}
          setOpen={setReciterOpen}
        />
      </Group>

      <Group label={labels.positionGroup} subtitle={labels.positionSubtitle}>
        <PositionPicker
          labels={labels}
          value={config.popupPosition}
          onChange={onPositionChange}
        />
      </Group>

      {currentHostname && (
        <Group label={labels.siteGroup} subtitle={currentHostname}>
          <button
            type="button"
            onClick={onExcludeCurrentSite}
            className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-[13px] transition-colors ${
              isCurrentExcluded
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-border bg-card hover:border-foreground/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Ban size={13} />
              <span style={{ fontWeight: 500 }}>
                {isCurrentExcluded ? labels.siteBlocked : labels.blockSite}
              </span>
            </div>
            <Switch on={isCurrentExcluded} onChange={onExcludeCurrentSite} small />
          </button>
        </Group>
      )}
    </div>
  )
}

function Group({
  label,
  subtitle,
  children
}: {
  label: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <span
          className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}
        >
          {label}
        </span>
        {subtitle && (
          <span className="truncate text-[11.5px] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function SegmentField({
  label,
  children
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
      <span className="text-[12.5px] text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

function Segmented({
  options,
  value,
  onChange
}: {
  options: { id: string; label: ReactNode }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex rounded-md bg-secondary p-0.5">
      {options.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`flex h-6 min-w-[28px] cursor-pointer items-center justify-center rounded border-none px-2 text-[11.5px] transition-all ${
              active
                ? "bg-card text-foreground shadow-sm"
                : "bg-transparent text-muted-foreground"
            }`}
            style={{ fontWeight: 600 }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function Stepper({
  value,
  setValue,
  min,
  max,
  unit
}: {
  value: number
  setValue: (value: number) => void
  min: number
  max: number
  unit: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-secondary p-0.5">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        aria-label="decrease"
      >
        <Minus size={11} />
      </button>
      <span
        className="min-w-[56px] text-center text-[13px] tabular-nums"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}
      >
        {value}{" "}
        <span className="text-muted-foreground" style={{ fontWeight: 400 }}>
          {unit}
        </span>
      </span>
      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        aria-label="increase"
      >
        <Plus size={11} />
      </button>
    </div>
  )
}

function ReciterSelect({
  labels,
  reciters,
  reciter,
  setReciter,
  open,
  setOpen
}: {
  labels: (typeof t)["en"]
  reciters: ReciterOption[]
  reciter: ReciterOption
  setReciter: (reciter: ReciterOption) => void
  open: boolean
  setOpen: (value: boolean) => void
}) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = reciters.filter(
    (item) =>
      !normalizedQuery ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.arabicName.includes(query) ||
      item.initials.toLowerCase().includes(normalizedQuery)
  )

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2.5 transition-colors ${
          open ? "border-accent" : "border-border hover:border-foreground/20"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar reciter={reciter} />
          <div className="min-w-0 text-start">
            <div className="truncate text-[13px]" style={{ fontWeight: 600 }}>
              {reciter.name}
            </div>
            <div className="truncate font-serif text-[11px] text-muted-foreground">
              {reciter.arabicName}
            </div>
          </div>
        </div>
        <ChevronDown
          size={14}
          className="shrink-0 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {open && (
        <div className="animate-fade-up absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-lg border border-border bg-popover shadow-xl">
          <div className="relative border-b border-border">
            <Search
              size={12}
              className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.reciterSearch}
              className="w-full bg-transparent py-2 pe-3 ps-8 text-[12.5px] outline-none"
            />
          </div>
          <div className="max-h-[220px] overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-[12px] text-muted-foreground">
                {labels.noReciters}
              </div>
            )}
            {filtered.map((item) => {
              const active = item.id === reciter.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setReciter(item)
                    setOpen(false)
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2.5 border-none px-3 py-2.5 text-start transition-colors ${
                    active ? "bg-secondary" : "bg-transparent hover:bg-secondary/60"
                  }`}
                >
                  <Avatar reciter={item} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px]" style={{ fontWeight: 600 }}>
                      {item.name}
                    </div>
                    <div className="truncate font-serif text-[11px] text-muted-foreground">
                      {item.arabicName}
                    </div>
                  </div>
                  {active && <Check size={13} className="shrink-0 text-accent" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function Avatar({ reciter }: { reciter: ReciterOption }) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px]"
      style={{
        background: `linear-gradient(135deg, hsl(${reciter.hue} 50% 70%), hsl(${reciter.hue} 60% 50%))`,
        color: "#fff",
        fontWeight: 700,
        letterSpacing: "0.02em"
      }}
    >
      {reciter.initials}
    </div>
  )
}

function PositionPicker({
  labels,
  value,
  onChange
}: {
  labels: (typeof t)["en"]
  value: PopupPosition
  onChange: (value: PopupPosition) => void
}) {
  const corners: { id: PopupPosition; x: string; y: string }[] = [
    { id: "top-left", x: "12%", y: "18%" },
    { id: "top-right", x: "88%", y: "18%" },
    { id: "bottom-left", x: "12%", y: "82%" },
    { id: "bottom-right", x: "88%", y: "82%" }
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border bg-background">
        <div className="absolute left-0 right-0 top-0 flex h-4 items-center gap-1 border-b border-border bg-secondary px-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        </div>
        <div className="absolute left-3 right-3 top-7 space-y-1.5">
          <div className="h-1 w-1/3 rounded bg-muted-foreground/20" />
          <div className="h-1 w-full rounded bg-muted-foreground/15" />
          <div className="h-1 w-5/6 rounded bg-muted-foreground/15" />
          <div className="h-1 w-2/3 rounded bg-muted-foreground/15" />
        </div>

        {corners.map((corner) => {
          const active = corner.id === value
          return (
            <button
              key={corner.id}
              type="button"
              onClick={() => onChange(corner.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent transition-all"
              style={{ left: corner.x, top: corner.y }}
              aria-label={labels.positionLabels[corner.id]}
            >
              <div
                className={`relative rounded-sm transition-all ${
                  active
                    ? "h-7 w-12 bg-accent shadow-md"
                    : "h-5 w-9 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              >
                {active && (
                  <div className="absolute inset-1 rounded-sm bg-accent-foreground/20" />
                )}
              </div>
            </button>
          )
        })}
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
        <span style={{ fontFamily: "var(--font-mono)" }}>
          {value.toUpperCase()}
        </span>
        <span>{labels.positionLabels[value]}</span>
      </div>
    </div>
  )
}

function LibraryPanel({
  labels,
  language,
  favorites,
  allFavorites,
  search,
  setSearch,
  copiedId,
  onCopy,
  onDelete,
  onClear
}: {
  labels: (typeof t)["en"]
  language: Language
  favorites: FavoriteAyah[]
  allFavorites: FavoriteAyah[]
  search: string
  setSearch: (value: string) => void
  copiedId: string | null
  onCopy: (favorite: FavoriteAyah) => void
  onDelete: (id: string) => void
  onClear: () => void
}) {
  return (
    <div className="animate-fade-up px-5 py-5">
      {allFavorites.length > 0 && (
        <>
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.favoritesSearch}
              className="w-full rounded-lg border border-border bg-card py-2.5 pe-3 ps-9 text-[13px] outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span
              className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}
            >
              {favorites.length} {labels.savedCount}
            </span>
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer border-none bg-transparent text-[11.5px] text-muted-foreground transition-colors hover:text-destructive"
            >
              {labels.clearAll}
            </button>
          </div>
        </>
      )}

      {allFavorites.length === 0 && <EmptyLibrary labels={labels} />}
      {allFavorites.length > 0 && favorites.length === 0 && (
        <p className="py-8 text-center text-[13px] text-muted-foreground">
          {labels.noFavoriteResults}
        </p>
      )}

      <div className="space-y-2">
        {favorites.map((favorite) => (
          <SavedCard
            key={favorite.id}
            favorite={favorite}
            language={language}
            copied={copiedId === favorite.id}
            labels={labels}
            onCopy={() => onCopy(favorite)}
            onDelete={() => onDelete(favorite.id)}
          />
        ))}
      </div>
    </div>
  )
}

function EmptyLibrary({ labels }: { labels: (typeof t)["en"] }) {
  return (
    <div className="px-4 py-12 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <Bookmark size={18} className="text-muted-foreground" />
      </div>
      <p className="m-0 text-[14px]" style={{ fontWeight: 600 }}>
        {labels.noFavorites}
      </p>
      <p className="m-0 mt-1 text-[12px] text-muted-foreground">
        {labels.noFavoritesHint}
      </p>
    </div>
  )
}

function SavedCard({
  favorite,
  language,
  copied,
  labels,
  onCopy,
  onDelete
}: {
  favorite: FavoriteAyah
  language: Language
  copied: boolean
  labels: (typeof t)["en"]
  onCopy: () => void
  onDelete: () => void
}) {
  return (
    <div className="group rounded-lg border border-border bg-card p-3.5 transition-colors hover:border-foreground/15">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-[13px]" style={{ fontWeight: 600 }}>
            {language === "ar" ? favorite.surahArabicName : favorite.surahName}
          </span>
          <span
            className="shrink-0 text-[11px] text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {favorite.surahNumber}:{favorite.ayahNumber}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <IconBtn onClick={onCopy} title={labels.copy}>
            {copied ? (
              <Check size={12} className="text-accent" />
            ) : (
              <Copy size={12} />
            )}
          </IconBtn>
          <IconBtn onClick={onDelete} title={labels.delete}>
            <Trash2 size={12} />
          </IconBtn>
        </div>
      </div>
      <p
        className="m-0 text-right font-serif text-[15px] leading-[1.9] text-foreground"
        dir="rtl"
      >
        {favorite.arabicText}
      </p>
      <p className="m-0 mt-1.5 text-[12px] leading-snug text-muted-foreground">
        {favorite.translation}
      </p>
    </div>
  )
}

function IconBtn({
  onClick,
  title,
  children
}: {
  onClick: () => void
  title: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  )
}

function Switch({
  on,
  onChange,
  small
}: {
  on: boolean
  onChange: (value: boolean) => void
  small?: boolean
}) {
  const width = small ? 32 : 40
  const height = small ? 18 : 22
  const thumb = small ? 14 : 18

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative shrink-0 cursor-pointer rounded-full border-none transition-colors"
      style={{
        width,
        height,
        background: on ? "var(--accent)" : "var(--switch-background)"
      }}
    >
      <span
        className="absolute top-0.5 rounded-full bg-white shadow-sm transition-all"
        style={{
          width: thumb,
          height: thumb,
          left: on ? `${width - thumb - 2}px` : "2px"
        }}
      />
    </button>
  )
}

function Footer({ labels }: { labels: (typeof t)["en"] }) {
  return (
    <div className="mt-2 border-t border-border px-5 py-4">
      <div
        className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>v{chrome.runtime.getManifest().version}</span>
        <span className="flex items-center gap-1.5">
          <Sparkles size={10} />
          {labels.madeWithIntention}
        </span>
      </div>
    </div>
  )
}

export default Popup
