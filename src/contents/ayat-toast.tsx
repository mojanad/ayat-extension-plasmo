import cssText from "data-text:../style.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import React, { useCallback, useEffect, useRef, useState } from "react"
import logoUrl from "data-base64:../../assets/icon-dark.png"
import { allSurahs, quraa } from "../data"
import {
  type AyatConfig,
  type Language,
  type PopupPosition,
  type Theme,
  addFavorite,
  getConfig,
  getFavoriteId,
  getHostname,
  isFavoriteAyah,
  removeFavorite
} from "../storage"

export const config: PlasmoCSConfig = {
  matches: ["http://*/*", "https://*/*"]
}

// Arabic font family stack — used across the toast for consistent rendering
const ARABIC_FONT = "'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"

export const getStyle: PlasmoGetStyle = () => {
  const uthmanicFontUrl = chrome.runtime.getURL(
    "assets/fonts/UthmanicHafs/KFGQPC Uthmanic Script HAFS.otf"
  )
  const amiriFontUrl = chrome.runtime.getURL(
    "assets/fonts/Amiri_Quran/AmiriQuran-Regular.ttf"
  )

  const fontFaces = `
    :host {
      all: initial;
      color-scheme: light dark;
      direction: ltr;
      font-family: ${ARABIC_FONT};
      font-size: 16px;
      line-height: 1.5;
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }
    :host, :host * {
      box-sizing: border-box;
    }
    @font-face {
      font-family: 'UthmanicHafs';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('${uthmanicFontUrl}') format('opentype');
    }
    @font-face {
      font-family: 'Amiri Quran';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('${amiriFontUrl}') format('truetype');
    }
  `

  const style = document.createElement("style")
  style.textContent = fontFaces + "\n" + cssText
  return style
}

const CloseSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[16px] w-[16px]"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const CollapseSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[16px] w-[16px]"
  >
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const CopySvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const StarSvg = ({ filled = false }: { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3 1.2-6.8-5-4.9 6.9-1L12 2z" />
  </svg>
)

const QuranSvg = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[24px] w-[24px]"
  >
    <path
      d="M100,20 C55.82,20 20,55.82 20,100 C20,144.18 55.82,180 100,180 C118.35,180 135.15,173.81 148.54,163.41 C115.21,168.14 83.33,142.5 83.33,100 C83.33,57.5 115.21,31.86 148.54,36.59 C135.15,26.19 118.35,20 100,20 Z"
      fill="currentColor"
    />
    <path
      d="M145,75 L151.47,88.11 L165.94,90.22 L155.47,100.42 L157.94,114.83 L145,108.03 L132.06,114.83 L134.53,100.42 L124.06,90.22 L138.53,88.11 Z"
      fill="currentColor"
    />
  </svg>
)

const PlaySvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]">
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
)

const CheckSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const ChevronLeftSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRightSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const RefreshSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[14px] w-[14px]"
  >
    <path d="M21 12a9 9 0 0 1-15.1 6.6" />
    <path d="M3 12A9 9 0 0 1 18.1 5.4" />
    <path d="M18 2v4h-4" />
    <path d="M6 22v-4h4" />
  </svg>
)

/** Pads a number to 3 digits: 1 → "001", 12 → "012", 114 → "114" */
function pad3(n: number): string {
  return n.toString().padStart(3, "0")
}

function getAudioUrl(
  subfolder: string,
  surahNumber: number,
  ayahNumber: number
): string {
  return `https://everyayah.com/data/${subfolder}/${pad3(surahNumber)}${pad3(ayahNumber)}.mp3`
}

interface AyahData {
  arabicText: string
  translation: string
  surahName: string
  surahArabicName: string
  surahNumber: number
  ayahNumber: number
  juzNumber: number
}

type ViewState = "loading" | "toast" | "minimized" | "hidden" | "error"

interface FetchJsonOptions {
  timeoutMs: number
}

async function fetchJson(url: string, options: FetchJsonOptions): Promise<unknown> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs)
  try {
    const resp = await fetch(url, { signal: controller.signal })
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`)
    return await resp.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchJsonWithRetry(
  url: string,
  options: FetchJsonOptions & { retries: number }
): Promise<unknown> {
  let lastError: unknown = null
  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await fetchJson(url, options)
    } catch (err) {
      lastError = err
      const backoffMs = 450 * 2 ** attempt + Math.floor(Math.random() * 150)
      await new Promise((r) => setTimeout(r, backoffMs))
    }
  }
  throw lastError
}

function getErrorMessage(err: unknown, language: Language): string {
  const isArabic = language === "ar"

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return isArabic
      ? "لا يوجد اتصال بالإنترنت. تحقق من الشبكة وحاول مرة أخرى."
      : "No internet connection. Please check your network and try again."
  }
  if (err instanceof DOMException && err.name === "AbortError") {
    return isArabic
      ? "انتهت مهلة الطلب. حاول مرة أخرى."
      : "The request timed out. Please try again."
  }
  if (err instanceof Error && err.message === "Unexpected API response") {
    return isArabic
      ? "وصل رد غير متوقع من خدمة الآيات. حاول مرة أخرى."
      : "Unexpected response from the ayah service. Please try again."
  }
  if (err instanceof Error && err.message.startsWith("HTTP ")) {
    return isArabic
      ? "تعذّر الاتصال بخدمة الآيات. حاول مرة أخرى لاحقًا."
      : "Couldn’t reach the ayah service. Please try again later."
  }
  if (err instanceof Error) return err.message
  if (typeof err === "string") return err
  return isArabic ? "حدث خطأ غير معروف." : "Unknown error"
}

function isQuranEncAyaResponse(
  value: unknown
): value is { result: { arabic_text: string; translation: string } } {
  if (!value || typeof value !== "object") return false
  const v = value as any
  return (
    typeof v.result?.arabic_text === "string" && typeof v.result?.translation === "string"
  )
}

const FREQUENCY_SHOWN_KEY = "ayatFrequencyShownThisSession"
const FREQUENCY_PAGE_COUNT_KEY = "ayatFrequencyPageCount"

async function getSessionValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const storageSession = chrome.storage.session
    if (storageSession) {
      const result = await storageSession.get(key)
      return (result[key] as T) ?? fallback
    }
  } catch {
    // Fall back to window sessionStorage below.
  }

  try {
    const value = window.sessionStorage.getItem(key)
    return value === null ? fallback : (JSON.parse(value) as T)
  } catch {
    return fallback
  }
}

async function setSessionValue<T>(key: string, value: T): Promise<void> {
  try {
    const storageSession = chrome.storage.session
    if (storageSession) {
      await storageSession.set({ [key]: value })
      return
    }
  } catch {
    // Fall back to window sessionStorage below.
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage failures and let the toast show normally.
  }
}

async function shouldShowToastForFrequency(cfg: AyatConfig): Promise<boolean> {
  if (cfg.notificationFrequency === "firstPerSession") {
    const alreadyShown = await getSessionValue(FREQUENCY_SHOWN_KEY, false)
    if (alreadyShown) return false
    await setSessionValue(FREQUENCY_SHOWN_KEY, true)
    return true
  }

  if (cfg.notificationFrequency === "everyNPages") {
    const interval = Math.max(cfg.notificationEveryNPages || 3, 2)
    const previousCount = await getSessionValue(FREQUENCY_PAGE_COUNT_KEY, 0)
    const nextCount = previousCount + 1
    await setSessionValue(FREQUENCY_PAGE_COUNT_KEY, nextCount)
    return nextCount === 1 || (nextCount - 1) % interval === 0
  }

  return true
}

function AyatToast() {
  const [ayahData, setAyahData] = useState<AyahData | null>(null)
  const [viewState, setViewState] = useState<ViewState>("loading")
  const [dismissing, setDismissing] = useState(false)
  const [allowed, setAllowed] = useState(true)
  const [language, setLanguage] = useState<Language>("ar")
  const [isPlaying, setIsPlaying] = useState(false)
  const [reciter, setReciter] = useState("67")
  const [theme, setTheme] = useState<Theme>("light")
  const [copyFeedback, setCopyFeedback] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [imageFeedback, setImageFeedback] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [popupPosition, setPopupPosition] = useState<PopupPosition>("bottom-right")
  const [navigating, setNavigating] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isFontsReady, setIsFontsReady] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hoveringRef = useRef(false)
  const remainingRef = useRef<number>(0)
  const timerStartRef = useRef<number>(0)

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
    }
  }, [])

  // Load Arabic fonts into the main page (not shadow DOM) for both toast body and canvas
  useEffect(() => {
    const amiriFontUrl = chrome.runtime.getURL(
      "assets/fonts/Amiri_Quran/AmiriQuran-Regular.ttf"
    )
    const uthmanicFontUrl = chrome.runtime.getURL(
      "assets/fonts/UthmanicHafs/KFGQPC Uthmanic Script HAFS.otf"
    )

    // 1. Inject @font-face into the main page's <head> so CSS font-family works
    const styleId = "ayat-arabic-fonts"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      style.textContent = `
        @font-face {
          font-family: 'Amiri Quran';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('${amiriFontUrl}') format('truetype');
        }
        @font-face {
          font-family: 'UthmanicHafs';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('${uthmanicFontUrl}') format('opentype');
        }
      `
      document.head.appendChild(style)
    }

    // 2. Also load via FontFace API so Canvas can use it reliably
    async function loadFontApi() {
      try {
        if (typeof FontFace === "undefined" || !document.fonts) return
        // Load Amiri Quran
        const amiriResp = await fetch(amiriFontUrl)
        const amiriBuffer = await amiriResp.arrayBuffer()
        const amiriFace = new FontFace("Amiri Quran", amiriBuffer)
        await amiriFace.load()
        document.fonts.add(amiriFace)
        // Load UthmanicHafs
        const uthmanicResp = await fetch(uthmanicFontUrl)
        const uthmanicBuffer = await uthmanicResp.arrayBuffer()
        const uthmanicFace = new FontFace("UthmanicHafs", uthmanicBuffer)
        await uthmanicFace.load()
        document.fonts.add(uthmanicFace)
      } catch (e) {
        console.error("Ayat: FontFace API load failed", e)
      }
    }
    loadFontApi()

    async function warmupFonts() {
      try {
        if (!document.fonts?.load) return
        await Promise.race([
          Promise.allSettled([
            document.fonts.load("400 16px 'UthmanicHafs'"),
            document.fonts.load("400 16px 'Amiri Quran'")
          ]),
          new Promise((r) => setTimeout(r, 1500))
        ])
      } finally {
        setIsFontsReady(true)
      }
    }

    warmupFonts()
  }, [])

  // Hide the Plasmo container when we don't want to show anything
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    let plasmoContainer = el.closest("[id^='plasmo-']") as HTMLElement | null
    if (!plasmoContainer) {
      const root = el.getRootNode() as ShadowRoot
      if (root?.host) {
        plasmoContainer = root.host as HTMLElement
      }
    }

    if (plasmoContainer) {
      const shouldHide = viewState === "hidden"
      plasmoContainer.style.display = shouldHide ? "none" : ""
    }
  }, [viewState])

  // Check if the extension is enabled and current site is not excluded
  useEffect(() => {
    async function checkConfig() {
      try {
        const cfg = await getConfig()
        const hostname = getHostname(window.location.href)
        setLanguage(cfg.language)
        setReciter(cfg.reciter || "67")
        setTheme(cfg.theme || "light")
        setPopupPosition(cfg.popupPosition || "bottom-right")

        if (!cfg.enabled || cfg.excludedSites.includes(hostname)) {
          setAllowed(false)
          setViewState("hidden")
          return
        }

        const shouldShow = await shouldShowToastForFrequency(cfg)
        if (!shouldShow) {
          setAllowed(false)
          setViewState("hidden")
          return
        }

        setAllowed(true)
        startInitialLoad()
      } catch (err) {
        console.error("Ayat: failed to load config", err)
        startInitialLoad()
      }
    }

    checkConfig()
  }, [])

  useEffect(() => {
    if (!allowed) return
    if (!ayahData) return
    if (!isFontsReady) return
    if (viewState !== "loading") return
    setViewState("toast")
  }, [allowed, ayahData, isFontsReady, viewState])

  useEffect(() => {
    let cancelled = false

    async function syncFavoriteState() {
      if (!ayahData) {
        setIsFavorite(false)
        return
      }

      const favorite = await isFavoriteAyah(
        ayahData.surahNumber,
        ayahData.ayahNumber
      )
      if (!cancelled) setIsFavorite(favorite)
    }

    syncFavoriteState()
    return () => {
      cancelled = true
    }
  }, [ayahData])

  // Listen for config changes in real-time
  useEffect(() => {
    function onStorageChange(changes: {
      [key: string]: chrome.storage.StorageChange
    }) {
      if (changes.ayatConfig) {
        const newConfig = changes.ayatConfig.newValue
        const hostname = getHostname(window.location.href)

        if (newConfig.language) {
          setLanguage(newConfig.language)
        }
        if (newConfig.reciter) {
          setReciter(newConfig.reciter)
        }
        if (newConfig.theme) {
          setTheme(newConfig.theme)
        }
        if (newConfig.popupPosition) {
          setPopupPosition(newConfig.popupPosition)
        }

        if (!newConfig.enabled || newConfig.excludedSites.includes(hostname)) {
          setAllowed(false)
          setViewState("hidden")
          stopAudio()
        } else if (!allowed && newConfig.enabled) {
          setAllowed(true)
          if (ayahData) {
            setViewState("minimized")
          } else {
            fetchAyah()
          }
        }
      }
    }

    chrome.storage.onChanged.addListener(onStorageChange)
    return () => chrome.storage.onChanged.removeListener(onStorageChange)
  }, [allowed, ayahData])

  async function fetchSpecificAyah(surahNumber: number, ayahNumber: number) {
    const hadAyah = Boolean(ayahData)
    const surah = allSurahs.find((s) => s.number === surahNumber)
    if (!surah) return

    // Determine juz number from the surah's juz ranges
    const juzEntry = surah.juz.find(
      (j) => ayahNumber >= j.from_ayah && ayahNumber <= j.to_ayah
    )
    const juzNumber = juzEntry ? juzEntry.juz : surah.juz[0].juz

    setNavigating(true)
    setFetchError(null)
    if (hadAyah) {
      setViewState("toast")
    }
    try {
      const url = `https://quranenc.com/api/v1/translation/aya/english_saheeh/${surah.number}/${ayahNumber}`
      const json = await fetchJsonWithRetry(url, {
        timeoutMs: 10_000,
        retries: 2
      })
      if (!isQuranEncAyaResponse(json)) {
        throw new Error("Unexpected API response")
      }

      stopAudio()
      setAyahData({
        arabicText: json.result.arabic_text,
        translation: json.result.translation,
        surahName: surah.name,
        surahArabicName: surah.arabic_name,
        surahNumber: surah.number,
        ayahNumber,
        juzNumber
      })
      setFetchError(null)
      if (hadAyah || isFontsReady) {
        setViewState("toast")
      } else {
        setViewState("loading")
      }
    } catch (err) {
      console.error("Ayat: failed to fetch ayah", err)
      setFetchError(getErrorMessage(err, language))
      if (!ayahData) setViewState("error")
    } finally {
      setNavigating(false)
    }
  }

  function fetchAyah() {
    const surah = allSurahs[Math.floor(Math.random() * allSurahs.length)]
    const ayahNumber = Math.floor(Math.random() * surah.ayah_count) + 1
    fetchSpecificAyah(surah.number, ayahNumber)
  }

  function refreshAyah() {
    if (navigating) return
    fetchAyah()
  }

  function startInitialLoad() {
    setFetchError(null)
    setAyahData(null)
    setViewState("loading")
    fetchAyah()
  }

  function goNextAyah() {
    if (!ayahData || navigating) return
    const currentSurah = allSurahs.find((s) => s.number === ayahData.surahNumber)
    if (!currentSurah) return

    if (ayahData.ayahNumber < currentSurah.ayah_count) {
      // Next ayah in the same surah
      fetchSpecificAyah(currentSurah.number, ayahData.ayahNumber + 1)
    } else {
      // Last ayah — go to first ayah of the next surah (wrap 114 → 1)
      const nextSurahNumber = currentSurah.number >= 114 ? 1 : currentSurah.number + 1
      fetchSpecificAyah(nextSurahNumber, 1)
    }
  }

  function goPrevAyah() {
    if (!ayahData || navigating) return
    const currentSurah = allSurahs.find((s) => s.number === ayahData.surahNumber)
    if (!currentSurah) return

    if (ayahData.ayahNumber > 1) {
      // Previous ayah in the same surah
      fetchSpecificAyah(currentSurah.number, ayahData.ayahNumber - 1)
    } else {
      // First ayah — go to last ayah of the previous surah (wrap 1 → 114)
      const prevSurahNumber = currentSurah.number <= 1 ? 114 : currentSurah.number - 1
      const prevSurah = allSurahs.find((s) => s.number === prevSurahNumber)
      if (prevSurah) {
        fetchSpecificAyah(prevSurah.number, prevSurah.ayah_count)
      }
    }
  }

  /**
   * Toggle audio playback.
   *
   * On CSP-strict sites (GitHub, Facebook, WhatsApp, etc.) the host page's
   * `media-src` policy blocks loading audio from everyayah.com directly.
   *
   * Fix: ask the background service worker (which runs in the extension origin
   * and is NOT bound by the host page's CSP) to fetch the MP3 bytes and return
   * them as a base64 string. We then create a `data:audio/mpeg;base64,...` URI
   * and play that — data: URIs are never blocked by `media-src` CSP policies.
   */
  async function toggleAudio() {
    if (!ayahData) return

    // ── Pause ──
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // ── Resume (audio already loaded) ──
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Ayat: resume failed", err)
        setIsPlaying(false)
      })
      setIsPlaying(true)
      return
    }

    // ── Fresh play: proxy fetch through background to bypass host-page CSP ──
    const subfolder = quraa[reciter]?.subfolder || quraa["67"].subfolder
    const url = getAudioUrl(
      subfolder,
      ayahData.surahNumber,
      ayahData.ayahNumber
    )

    let audioSrc: string
    try {
      const resp = await chrome.runtime.sendMessage({
        type: "AUDIO_FETCH",
        url,
        fromContent: true
      })

      if (resp?.ok && resp.base64) {
        // Use a data: URI — not subject to any media-src CSP restriction
        audioSrc = `data:audio/mpeg;base64,${resp.base64}`
      } else {
        // Background fetch failed → fall back to direct URL (works on most sites)
        console.warn(
          "Ayat: background fetch failed, falling back to direct URL",
          resp?.error
        )
        audioSrc = url
      }
    } catch (err) {
      // sendMessage itself failed (e.g. service worker restarting) → fall back
      console.warn("Ayat: sendMessage failed, falling back to direct URL", err)
      audioSrc = url
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      audioRef.current = null
    })

    audio.addEventListener("error", () => {
      console.error("Ayat: audio playback error")
      setIsPlaying(false)
      audioRef.current = null
    })

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Ayat: play() rejected", err)
        setIsPlaying(false)
        audioRef.current = null
      })
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current = null
    }
    setIsPlaying(false)
  }

  // Copy ayah text with details
  function copyText() {
    if (!ayahData) return
    const surahName =
      language === "ar" ? ayahData.surahArabicName : ayahData.surahName
    const text = language === "ar" ? ayahData.arabicText : ayahData.translation
    const label = language === "ar" ? "آية" : "Ayah"
    const juzLabel = language === "ar" ? "الجزء" : "Juz"
    const copyStr = `${text}\n\n— ${surahName} , ${label} ${ayahData.ayahNumber} [${juzLabel} ${ayahData.juzNumber}]`

    navigator.clipboard
      .writeText(copyStr)
      .then(() => {
        setCopyFeedback("success")
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
        copyTimerRef.current = setTimeout(() => setCopyFeedback("idle"), 2000)
      })
      .catch((err) => {
        console.error("Ayat: failed to copy text", err)
        setCopyFeedback("error")
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
        copyTimerRef.current = setTimeout(() => setCopyFeedback("idle"), 2000)
      })
  }

  async function toggleFavorite() {
    if (!ayahData || navigating) return

    const id = getFavoriteId(ayahData.surahNumber, ayahData.ayahNumber)
    if (isFavorite) {
      await removeFavorite(id)
      setIsFavorite(false)
      return
    }

    await addFavorite({
      surahNumber: ayahData.surahNumber,
      ayahNumber: ayahData.ayahNumber,
      surahName: ayahData.surahName,
      surahArabicName: ayahData.surahArabicName,
      arabicText: ayahData.arabicText,
      translation: ayahData.translation,
      reciter
    })
    setIsFavorite(true)
  }

  // Save toast as PNG image to device
  async function copyAsImage() {
    if (!ayahData) return
    setImageFeedback("idle")

    try {
      // Wait for fonts to be ready for canvas
      if (document.fonts) {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 2500))
        ])
        // Ensure UthmanicHafs is loaded for canvas
        const uthmanicLoaded = document.fonts.check("34px 'UthmanicHafs'")
        if (!uthmanicLoaded) {
          const url = chrome.runtime.getURL(
            "assets/fonts/UthmanicHafs/KFGQPC Uthmanic Script HAFS.otf"
          )
          const resp = await fetch(url)
          const buf = await resp.arrayBuffer()
          const face = new FontFace("UthmanicHafs", buf)
          await face.load()
          document.fonts.add(face)
        }
      }

      const isDark = theme === "dark"
      const text = language === "ar" ? ayahData.arabicText : ayahData.translation
      const version = chrome.runtime.getManifest().version

      const canvas = document.createElement("canvas")
      const scale = 2
      const maxWidth = 800
      const padding = 60
      const footerHeight = 36 // space for footer outside frame
      const ctx = canvas.getContext("2d")
      if (!ctx) return

    // Colors matching sirahbooks.com theme
    const bgColor = isDark ? "#0F1C2C" : "#F1ECE4"
    const gold = "#D6A54A"
    const textColor = isDark ? "#F1ECE4" : "#0F1C2C"
    const mutedColor = isDark ? "rgba(241,236,228,0.4)" : "rgba(15,28,44,0.4)"

    // Arabic numbers and markers
    const toArabicNumber = (n: number) =>
      n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d as any])

    const bismillahText =
      language === "ar"
        ? "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
        : "In the name of Allah, the Entirely Merciful, the Especially Merciful."

    // Skip Bismillah for Surah At-Tawbah (9) and Al-Fatiha Ayah 1 (already included)
    const showBismillah = !(
      ayahData.surahNumber === 9 ||
      (ayahData.surahNumber === 1 && ayahData.ayahNumber === 1)
    )

    const ayahMark =
      language === "ar"
        ? ` ﴿${toArabicNumber(ayahData.ayahNumber)}﴾`
        : ` (${ayahData.ayahNumber})`
    const mainText = `${text}${ayahMark}`

    const surahText =
      language === "ar"
        ? `سُورَةُ ${ayahData.surahArabicName}`
        : `Surah ${ayahData.surahName}`

    const infoText =
      language === "ar"
        ? `الجزء ${toArabicNumber(ayahData.juzNumber)}  ·  آية ${toArabicNumber(ayahData.ayahNumber)}`
        : `Juz ${ayahData.juzNumber}  ·  Ayah ${ayahData.ayahNumber}`

    // Measure text
    canvas.width = maxWidth * scale
    canvas.height = 1000 * scale // temp height
    ctx.scale(scale, scale)
    ctx.direction = language === "ar" ? "rtl" : "ltr"
    ctx.font =
      language === "ar"
        ? "normal 34px 'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"
        : "normal 26px 'Inter', sans-serif"

    // Word-wrap logic
    const words = mainText.split(/\s+/)
    const lines: string[] = []
    let currentLine = ""
    const contentWidth = maxWidth - padding * 2.5

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      if (ctx.measureText(testLine).width > contentWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)

    // Calculate dynamic heights
    const bismillahHeight = showBismillah ? 60 : 0
    const lineHeight = language === "ar" ? 64 : 44
    const textHeight = lines.length * lineHeight
    const surahHeight = 40
    const infoHeight = 30
    const frameHeight =
      padding +
      bismillahHeight +
      (showBismillah ? 20 : 0) +
      textHeight +
      20 +
      surahHeight +
      10 +
      infoHeight +
      padding
    const totalHeight = frameHeight + footerHeight

    // Re-init canvas with actual calculated height
    canvas.width = maxWidth * scale
    canvas.height = totalHeight * scale
    ctx.scale(scale, scale)

    // 1. Draw Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, maxWidth, totalHeight)

    // 2. Draw Elegant Double Border (only around frameHeight)
    ctx.strokeStyle = gold
    // Outer border
    ctx.lineWidth = 3
    ctx.strokeRect(16, 16, maxWidth - 32, frameHeight - 32)
    // Inner border
    ctx.lineWidth = 1
    ctx.strokeRect(24, 24, maxWidth - 48, frameHeight - 48)

    // 3. Draw Corner Ornaments
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rot)

      // Mask out the inner intersection
      ctx.fillStyle = bgColor
      ctx.fillRect(-4, -4, 30, 30)

      // Ornate outer curve
      ctx.strokeStyle = gold
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(26, 0)
      ctx.quadraticCurveTo(26, 26, 0, 26)
      ctx.stroke()

      // Ornate inner curve
      ctx.beginPath()
      ctx.moveTo(18, 0)
      ctx.quadraticCurveTo(18, 18, 0, 18)
      ctx.stroke()

      // Center decorative dot
      ctx.fillStyle = gold
      ctx.beginPath()
      ctx.arc(8, 8, 2.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    drawCorner(24, 24, 0) // top-left
    drawCorner(maxWidth - 24, 24, Math.PI / 2) // top-right
    drawCorner(maxWidth - 24, frameHeight - 24, Math.PI) // bottom-right
    drawCorner(24, frameHeight - 24, -Math.PI / 2) // bottom-left

    // 4. Draw Typography
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.direction = language === "ar" ? "rtl" : "ltr"

    let currentY = padding + (showBismillah ? 30 : 0)

    // Bismillah
    if (showBismillah) {
      ctx.fillStyle = gold
      ctx.font =
        language === "ar"
          ? "normal 28px 'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"
          : "normal 20px 'Inter', sans-serif"
      ctx.fillText(bismillahText, maxWidth / 2, currentY)
      currentY += 40
    }

    // Ayah Text
    currentY += 10 + lineHeight / 2
    ctx.fillStyle = textColor
    ctx.font =
      language === "ar"
        ? "normal 34px 'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"
        : "normal 26px 'Inter', sans-serif"

    for (const line of lines) {
      ctx.fillText(line, maxWidth / 2, currentY)
      currentY += lineHeight
    }

    // Surah Name
    currentY += 20
    ctx.fillStyle = gold
    ctx.font =
      language === "ar"
        ? "normal 26px 'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"
        : "bold 20px 'Inter', sans-serif"
    ctx.fillText(surahText, maxWidth / 2, currentY)

    // Info line (Juz · Ayah)
    currentY += 34
    ctx.fillStyle = mutedColor
    ctx.font =
      language === "ar"
        ? "normal 18px 'UthmanicHafs', 'Amiri Quran', 'Traditional Arabic', serif"
        : "normal 14px 'Inter', sans-serif"
    ctx.fillText(infoText, maxWidth / 2, currentY)

    // 5. Footer outside the frame — extension name & version
    ctx.direction = "ltr"
    ctx.textAlign = "center"
    ctx.fillStyle = mutedColor
    ctx.font = "normal 12px 'Inter', 'Segoe UI', sans-serif"
    ctx.fillText(
      `Ayat Extension v${version}`,
      maxWidth / 2,
      frameHeight + footerHeight / 2
    )

    // Download PNG
    canvas.toBlob((blob) => {
      if (!blob) {
        setImageFeedback("error")
        if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
        imageTimerRef.current = setTimeout(() => setImageFeedback("idle"), 2000)
        return
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ayat-${ayahData.surahNumber}-${ayahData.ayahNumber}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setImageFeedback("success")
      if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
      imageTimerRef.current = setTimeout(() => setImageFeedback("idle"), 2000)
    }, "image/png")
    } catch (err) {
      console.error("Ayat: failed to export image", err)
      setImageFeedback("error")
      if (imageTimerRef.current) clearTimeout(imageTimerRef.current)
      imageTimerRef.current = setTimeout(() => setImageFeedback("idle"), 2000)
    }
  }

  // Derived display values based on language
  const displayText =
    ayahData && language === "ar" ? ayahData.arabicText : ayahData?.translation
  const displaySurahName =
    ayahData && language === "ar"
      ? ayahData.surahArabicName
      : ayahData?.surahName
  const isRtl = language === "ar"

  // Auto-minimize timer (pauses on hover)
  useEffect(() => {
    if (viewState !== "toast" || !displayText) return

    const hideDelay = displayText.length >= 100 ? displayText.length * 50 : 6000
    remainingRef.current = hideDelay
    startTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [viewState, displayText])

  function startTimer() {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (hoveringRef.current) return
    timerStartRef.current = Date.now()
    timerRef.current = setTimeout(() => minimize(), remainingRef.current)
  }

  function pauseTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      const elapsed = Date.now() - timerStartRef.current
      remainingRef.current = Math.max(remainingRef.current - elapsed, 0)
    }
  }

  function handleMouseEnter() {
    hoveringRef.current = true
    pauseTimer()
  }

  function handleMouseLeave() {
    hoveringRef.current = false
    if (viewState === "toast") {
      startTimer()
    }
  }

  const minimize = useCallback(() => {
    setDismissing(true)
    setTimeout(() => {
      setDismissing(false)
      setViewState("minimized")
    }, 280)
  }, [])

  const dismiss = useCallback(() => {
    stopAudio()
    setDismissing(true)
    setTimeout(() => {
      setDismissing(false)
      setViewState("hidden")
    }, 280)
  }, [])

  function expand() {
    setViewState("toast")
  }

  // Always render the wrapper div so we can find & hide the Plasmo container
  if (viewState === "hidden") {
    return <div ref={wrapperRef} style={{ display: "none" }} />
  }

  const dark = theme === "dark"
  const skeletonTone = dark ? "bg-white/10" : "bg-[#1F1B16]/10"
  const skeletonShine = "animate-pulse rounded-[6px]"

  // Action button style
  const actionBtn = `flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border-none bg-transparent p-0 transition-[background,color] duration-150 ${
    dark
      ? "text-white/50 hover:bg-white/10 hover:text-[#F1ECE4]"
      : "text-[#1F1B16]/50 hover:bg-[#1F1B16]/[0.06] hover:text-[#1F1B16]"
  }`

  // Position classes based on popupPosition setting
  const positionClasses = (() => {
    switch (popupPosition) {
      case "top-left":
        return "top-[24px] left-[24px]"
      case "top-right":
        return "top-[24px] right-[24px]"
      case "bottom-left":
        return "bottom-[24px] left-[24px]"
      case "bottom-right":
      default:
        return "bottom-[24px] right-[24px]"
    }
  })()

  if (viewState === "loading") {
    return (
      <div ref={wrapperRef}>
        <div
          style={{ fontFamily: ARABIC_FONT }}
          className={`fixed ${positionClasses} z-[2147483647] flex w-[min(380px,calc(100vw-48px))] items-center gap-[12px] rounded-[12px] border px-[16px] py-[12px] motion-reduce:animate-none ${
            dark
              ? "border-white/10 bg-[#0F1C2C] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              : "border-[#1F1B16]/10 bg-[#F1ECE4] shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          } animate-toast-in`}
        >
          <div className="h-[20px] w-[20px] animate-spin rounded-full border-2 border-[#D6A54A] border-t-transparent" />
          <div className="min-w-0">
            <p
              className={`m-0 text-[14px] font-semibold leading-[20px] ${
                dark ? "text-[#F1ECE4]" : "text-[#0F1C2C]"
              }`}
            >
              {language === "ar" ? "جارٍ التحميل…" : "Loading…"}
            </p>
            <p
              className={`m-0 truncate text-[12px] leading-[16px] ${
                dark ? "text-white/50" : "text-[#1F1B16]/60"
              }`}
            >
              {language === "ar"
                ? "جاري جلب آية جديدة"
                : "Fetching a new ayah"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (viewState === "error") {
    return (
      <div ref={wrapperRef}>
        <div
          style={{ fontFamily: ARABIC_FONT }}
          className={`fixed ${positionClasses} z-[2147483647] flex max-w-[min(380px,calc(100vw-48px))] flex-col rounded-[12px] border px-[16px] py-[16px] motion-reduce:animate-none ${
            dark
              ? "border-white/10 bg-[#0F1C2C] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              : "border-[#1F1B16]/10 bg-[#F1ECE4] shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          } animate-toast-in`}
        >
          <div className="mb-[8px] flex items-center justify-between gap-[12px]">
            <div className="min-w-0">
              <p
                className={`m-0 text-[14px] font-semibold leading-[20px] ${
                  dark ? "text-[#F1ECE4]" : "text-[#0F1C2C]"
                }`}
              >
                {language === "ar" ? "تعذر جلب الآية" : "Couldn’t load ayah"}
              </p>
              <p
                className={`m-0 truncate text-[12px] leading-[16px] ${
                  dark ? "text-white/50" : "text-[#1F1B16]/60"
                }`}
                title={fetchError || undefined}
              >
                {fetchError || (language === "ar" ? "حاول مرة أخرى." : "Please try again.")}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              className={actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                dismiss()
              }}
            >
              <CloseSvg />
            </button>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                startInitialLoad()
              }}
              className={`flex-1 cursor-pointer rounded-[8px] border px-[12px] py-[8px] text-[14px] font-semibold leading-[20px] transition-colors ${
                dark
                  ? "border-white/10 bg-white/5 text-[#F1ECE4] hover:bg-white/10"
                  : "border-[#1F1B16]/10 bg-white text-[#0F1C2C] hover:bg-[#1F1B16]/[0.04]"
              }`}
            >
              {language === "ar" ? "إعادة المحاولة" : "Retry"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Minimized: show a small floating circle button
  if (viewState === "minimized") {
    return (
      <div ref={wrapperRef}>
        <button
          type="button"
          onClick={expand}
          aria-label="Show Ayat"
          className={`fixed ${positionClasses} z-[2147483647] flex h-[48px] w-[48px] animate-toast-in cursor-pointer items-center justify-center rounded-full border shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl ${
            dark
              ? "border-white/10 bg-[#0F1C2C] text-[#D6A54A] hover:bg-white/5"
              : "border-[#1F1B16]/10 bg-[#F1ECE4] text-[#D6A54A] hover:bg-[#1F1B16]/5"
          }`}
        >
          {/* <QuranSvg /> */}
          <img src={logoUrl} alt="icon" />
        </button>
      </div>
    )
  }

  // Expanded toast
  return (
    <div ref={wrapperRef}>
      <div
        ref={toastRef}
        style={{ fontFamily: ARABIC_FONT }}
        className={`fixed ${positionClasses} z-[2147483647] flex w-[min(380px,calc(100vw-48px))] flex-col rounded-[12px] border px-[16px] py-[16px] transform-gpu will-change-transform motion-reduce:animate-none ${
          dark
            ? "border-white/10 bg-[#0F1C2C] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "border-[#1F1B16]/10 bg-[#F1ECE4] shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        } ${dismissing ? "animate-toast-out" : "animate-toast-in"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top action buttons row */}
        <div
          data-actions
          className="absolute right-[8px] top-[8px] flex items-center gap-[2px]"
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            className={actionBtn}
            onClick={(e) => {
              e.stopPropagation()
              dismiss()
            }}
          >
            <CloseSvg />
          </button>
        </div>

        {/* Surah info + play button */}
        <div className="mb-[8px] flex items-center gap-[8px] px-[6px] pr-[112px]" dir="ltr">
          <span
            style={{ fontFamily: ARABIC_FONT }}
            className={`inline-flex h-[24px] min-w-[24px] items-center justify-center rounded-[6px] px-[6px] text-[12px] font-bold leading-[16px] ${
              dark
                ? "bg-[#D6A54A]/20 text-[#D6A54A]"
                : "bg-[#D6A54A]/15 text-[#D6A54A]"
            }`}
          >
            {isRtl ? `جزء ${ayahData.juzNumber}` : `Juz ${ayahData.juzNumber}`}
          </span>
          <span
            style={{ fontFamily: ARABIC_FONT }}
            className={`text-[12px] font-semibold leading-[16px] ${dark ? "text-[#F1ECE4]" : "text-[#0F1C2C]"}`}
          >
            {displaySurahName}
          </span>
          <span
            style={{ fontFamily: ARABIC_FONT }}
            className={`text-[10px] leading-[14px] ${dark ? "text-white/50" : "text-[#1F1B16]/60"}`}
          >
            {isRtl
              ? `آية ${ayahData.ayahNumber}`
              : `Ayah ${ayahData.ayahNumber}`}
          </span>
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleAudio()
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={` flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border-none transition-all duration-150 ${
              isPlaying
                ? "bg-[#D6A54A] text-[#1F1B16] shadow-sm hover:scale-105"
                : dark
                  ? "bg-[#D6A54A]/20 text-[#D6A54A] hover:bg-[#D6A54A]/30"
                  : "bg-[#D6A54A]/15 text-[#D6A54A] hover:bg-[#D6A54A]/25"
            }`}
          >
            {isPlaying ? <PauseSvg /> : <PlaySvg />}
          </button>
        </div>

        {/* Ayah text — selectable, no click-to-collapse */}
        <div
          data-body
          className="min-w-0 select-text px-[6px]"
          dir={isRtl ? "rtl" : "ltr"}
          style={{ textAlign: isRtl ? "right" : "left" }}
        >
          <p
            style={{ fontFamily: ARABIC_FONT }}
            className={`m-0 font-normal ${
              dark ? "text-[#F1ECE4]" : "text-[#0F1C2C]"
            } ${isRtl ? "text-[15px] leading-[34px]" : "text-[14px] leading-[24px]"}`}
          >
            {navigating ? (
              <span className="block py-[4px]">
                <span className={`mb-[8px] block h-[16px] w-full ${skeletonShine} ${skeletonTone}`} />
                <span className={`mb-[8px] block h-[16px] w-11/12 ${skeletonShine} ${skeletonTone}`} />
                <span className={`block h-[16px] w-2/3 ${skeletonShine} ${skeletonTone}`} />
              </span>
            ) : (
              displayText
            )}
          </p>
        </div>
        <section className="mt-[8px] flex items-center justify-between gap-[8px] px-[6px]">
          {/* Left group: collapse + navigation */}
          <div className="flex items-center gap-[4px]">
            {/* Collapse */}
            <button
              type="button"
              aria-label="Collapse"
              className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] border-none bg-transparent p-0 transition-[background,color] duration-150 ${
                dark
                  ? "text-[#D6A54A] hover:bg-white/10 hover:text-[#D7A542]"
                  : "text-[#D6A54A] hover:bg-[#1F1B16]/[0.06] hover:text-[#D7A542]"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                minimize()
              }}
            >
              <CollapseSvg />
            </button>

            {/* Divider */}
            <div
              className={`mx-[2px] h-[16px] w-px ${
                dark ? "bg-white/10" : "bg-[#1F1B16]/10"
              }`}
            />

            {/* Refresh Ayah */}
            <button
              type="button"
              aria-label="Refresh Ayah"
              disabled={navigating}
              className={`${actionBtn} ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                refreshAyah()
              }}
            >
              <RefreshSvg />
            </button>

            {/* Previous Ayah */}
            <button
              type="button"
              aria-label="Previous Ayah"
              disabled={navigating}
              className={`${actionBtn} ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                goPrevAyah()
              }}
            >
              <ChevronLeftSvg />
            </button>
            {/* Next Ayah */}
            <button
              type="button"
              aria-label="Next Ayah"
              disabled={navigating}
              className={`${actionBtn} ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                goNextAyah()
              }}
            >
              <ChevronRightSvg />
            </button>
          </div>

          {/* Right group: favorite + copy + screenshot */}
          <div className="flex items-center gap-[8px]">
            {/* Favorite */}
            <button
              type="button"
              aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
              disabled={navigating}
              className={`${actionBtn} ${
                isFavorite ? "text-[#D6A54A]" : ""
              } ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite()
              }}
            >
              <StarSvg filled={isFavorite} />
            </button>
            {/* Copy text */}
            <button
              type="button"
              aria-label="Copy text"
              disabled={navigating}
              className={`${actionBtn} ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                copyText()
              }}
            >
              {copyFeedback === "success" ? <CheckSvg /> : <CopySvg />}
            </button>
            {/* Copy as image */}
            <button
              type="button"
              aria-label="Copy as image"
              disabled={navigating}
              className={`${actionBtn} ${navigating ? "opacity-40 pointer-events-none" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                copyAsImage()
              }}
            >
              {imageFeedback === "success" ? <CheckSvg /> : <CameraIcon />}
            </button>
          </div>
        </section>
        {fetchError && !navigating && (
          <div
            role="status"
            className={`mx-[6px] mt-[12px] rounded-[8px] border px-[12px] py-[8px] text-[12px] leading-[16px] ${
              dark
                ? "border-red-300/20 bg-red-300/10 text-red-100"
                : "border-red-700/15 bg-red-50 text-red-900"
            }`}
          >
            {language === "ar" ? "تعذر جلب الآية. " : "Couldn’t load ayah. "}
            <span title={fetchError}>{fetchError}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AyatToast
