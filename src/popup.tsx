import React, { useEffect, useState } from "react"

import logoUrl from "data-base64:../assets/icon-dark.png"

import { quraa } from "./data"
import {
  type AyatConfig,
  type Language,
  type NotificationFrequency,
  type PopupPosition,
  type Theme,
  getConfig,
  getHostname,
  setConfig
} from "./storage"
import "./style.css"

const t = {
  ar: {
    title: "آيات",
    subtitle: "تذكير لطيف بالقرآن الكريم",
    enableTitle: "تفعيل آيات",
    enableDesc: "عرض آية في كل صفحة",
    languageTitle: "اللغة",
    languageDesc: "لغة عرض الآية",
    reciterTitle: "القارئ",
    reciterDesc: "اختر قارئ القرآن",
    themeTitle: "المظهر",
    themeDesc: "مظهر الإضافة",
    frequencyTitle: "تكرار الإشعارات",
    frequencyDesc: "اختر عدد مرات ظهور الآية",
    everyPage: "كل صفحة",
    firstPerSession: "أول مرة فقط",
    everyNPages: "كل عدة صفحات",
    pages: "صفحات",
    positionTitle: "موضع الآية",
    positionDesc: "مكان ظهور الآية في الصفحة",
    excludeBtn: "استبعاد هذا الموقع",
    reEnableBtn: "إعادة تفعيل",
    excludedTitle: "المواقع المستبعدة",
    remove: "إزالة"
  },
  en: {
    title: "Ayat",
    subtitle: "Gentle Quran reminders",
    enableTitle: "Enable Ayat",
    enableDesc: "Show ayah on every page",
    languageTitle: "Language",
    languageDesc: "Ayah display language",
    reciterTitle: "Reciter",
    reciterDesc: "Choose a Quran reciter",
    themeTitle: "Theme",
    themeDesc: "Extension appearance",
    frequencyTitle: "Notification Frequency",
    frequencyDesc: "Choose how often the ayah appears",
    everyPage: "Every page",
    firstPerSession: "First per session",
    everyNPages: "Every N pages",
    pages: "pages",
    positionTitle: "Ayah Position",
    positionDesc: "Where the ayah appears on the page",
    excludeBtn: "Exclude this site",
    reEnableBtn: "Re-enable",
    excludedTitle: "Excluded Sites",
    remove: "Remove"
  }
}

const SunSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MoonSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

function Popup() {
  const [config, setLocalConfig] = useState<AyatConfig | null>(null)
  const [currentHostname, setCurrentHostname] = useState<string>("")
  const [isCurrentExcluded, setIsCurrentExcluded] = useState(false)
  const [excludedOpen, setExcludedOpen] = useState(false)

  const lang = config?.language || "ar"
  const isRtl = lang === "ar"
  const labels = t[lang]
  const dark = config?.theme === "dark"

  useEffect(() => {
    getConfig().then(setLocalConfig)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        const hostname = getHostname(tabs[0].url)
        setCurrentHostname(hostname)
      }
    })
  }, [])

  useEffect(() => {
    if (config && currentHostname) {
      setIsCurrentExcluded(config.excludedSites.includes(currentHostname))
    }
  }, [config, currentHostname])

  async function handleToggleEnabled() {
    if (!config) return
    const updated = await setConfig({ enabled: !config.enabled })
    setLocalConfig(updated)
  }

  async function handleLanguageChange(newLang: Language) {
    if (!config) return
    const updated = await setConfig({ language: newLang })
    setLocalConfig(updated)
  }

  async function handleThemeChange(newTheme: Theme) {
    if (!config) return
    const updated = await setConfig({ theme: newTheme })
    setLocalConfig(updated)
  }

  async function handleReciterChange(key: string) {
    if (!config) return
    const updated = await setConfig({ reciter: key })
    setLocalConfig(updated)
  }

  async function handlePositionChange(pos: PopupPosition) {
    if (!config) return
    const updated = await setConfig({ popupPosition: pos })
    setLocalConfig(updated)
  }

  async function handleFrequencyChange(frequency: NotificationFrequency) {
    if (!config) return
    const updated = await setConfig({ notificationFrequency: frequency })
    setLocalConfig(updated)
  }

  async function handleFrequencyIntervalChange(value: number) {
    if (!config) return
    const updated = await setConfig({
      notificationEveryNPages: Math.min(Math.max(value, 2), 25)
    })
    setLocalConfig(updated)
  }

  async function handleExcludeCurrentSite() {
    if (!config || !currentHostname) return

    if (isCurrentExcluded) {
      const updated = await setConfig({
        excludedSites: config.excludedSites.filter((s) => s !== currentHostname)
      })
      setLocalConfig(updated)
    } else {
      const updated = await setConfig({
        excludedSites: [...config.excludedSites, currentHostname]
      })
      setLocalConfig(updated)
    }
  }

  async function handleRemoveExcluded(site: string) {
    if (!config) return
    const updated = await setConfig({
      excludedSites: config.excludedSites.filter((s) => s !== site)
    })
    setLocalConfig(updated)
  }

  if (!config) {
    return (
      <div
        className={`flex w-[320px] items-center justify-center p-6 font-sans ${dark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#D6A54A] border-t-transparent" />
      </div>
    )
  }

  // Theme-dependent color classes
  // Theme-dependent color classes
  const bg = dark ? "bg-[#0F1C2C]" : "bg-[#F1ECE4]"
  const textPrimary = dark ? "text-[#F1ECE4]" : "text-[#0F1C2C]"
  const textSecondary = dark ? "text-white/60" : "text-[#1F1B16]/60"
  const textLabel = dark ? "text-[#F1ECE4]" : "text-[#1F1B16]"
  const cardBg = dark ? "bg-white/5" : "bg-white"
  const borderColor = dark ? "border-white/10" : "border-[#1F1B16]/10"
  const siteBg = cardBg
  const siteText = textSecondary
  const selectBg = dark
    ? "bg-white/5 border-white/10 text-[#F1ECE4]"
    : "bg-white border-[#1F1B16]/20 text-[#0F1C2C]"
  const segBtnInactive = dark
    ? "bg-white/5 text-white/70 hover:bg-white/10"
    : "bg-[#F1ECE4]/50 text-slate-600 hover:bg-[#F1ECE4]"
  const segBorder = dark ? "border-white/10" : "border-[#1F1B16]/20"

  return (
    <div
      className={`w-[320px] font-sans ${bg} ${textPrimary}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      helllo
      {/* Header */}
      <div
        className={`flex items-center gap-3 border-b ${borderColor} px-4 py-3`}
      >
        <img src={logoUrl} alt="Ayat" className="h-10 w-10 rounded-lg" />
        <div className="flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <h1 className="m-0 text-lg font-semibold leading-none">
              {labels.title}
            </h1>
            <span className="flex items-center justify-center rounded-full border border-[#D7A542]/30 px-[10px] py-[4px] text-[10px] font-bold uppercase leading-none tracking-wider text-[#D7A542] bg-transparent pb-[3px]">
              V{chrome.runtime.getManifest().version} BETA
            </span>
          </div>
          <p className={`m-0 text-xs ${textSecondary}`}>{labels.subtitle}</p>
        </div>
        {/* Info icon */}
        <div className="group relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D6A54A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 cursor-pointer opacity-60 transition-opacity hover:opacity-100"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div
            className={`pointer-events-none absolute top-full end-0 mt-2 w-[220px] rounded-lg px-3 py-2.5 text-center text-[11px] leading-relaxed opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 z-[9999] ${
              dark
                ? "bg-gray-700 text-gray-100"
                : "bg-white text-gray-700 ring-1 ring-black/5"
            }`}
            // dir="rtl"
          >
            صدقة جارية لروح آخي الشهيد أمير مجدي وجدتي وأموات جميع المسلمين،
            اللهم تقبلها وتقبلنا 🤲
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3 p-4">
        {/* Enable / Disable toggle */}
        <div
          className={`flex items-center justify-between rounded-lg ${cardBg} px-3 py-2.5`}
        >
          <div>
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.enableTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>
              {labels.enableDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleEnabled}
            aria-label={config.enabled ? "Disable" : "Enable"}
            className={`relative h-6 w-11 cursor-pointer rounded-full border-none transition-colors duration-200 ${
              config.enabled
                ? "bg-[#D6A54A]"
                : dark
                  ? "bg-white/20"
                  : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                config.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Language selector */}
        <div
          className={`flex items-center justify-between rounded-lg ${cardBg} px-3 py-2.5`}
        >
          <div>
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.languageTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>
              {labels.languageDesc}
            </p>
          </div>
          <div
            className={`flex overflow-hidden rounded-lg border ${segBorder}`}
            dir="ltr"
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("ar")}
              className={`cursor-pointer border-none px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                config.language === "ar"
                  ? "bg-[#D6A54A] text-[#1F1B16]"
                  : segBtnInactive
              }`}
            >
              عربي
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`cursor-pointer border-none px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                config.language === "en"
                  ? "bg-[#D6A54A] text-[#1F1B16]"
                  : segBtnInactive
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Theme selector */}
        <div
          className={`flex items-center justify-between rounded-lg ${cardBg} px-3 py-2.5`}
        >
          <div>
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.themeTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>{labels.themeDesc}</p>
          </div>
          <div
            className={`flex overflow-hidden rounded-lg border ${segBorder}`}
            dir="ltr"
          >
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className={`flex cursor-pointer items-center gap-1 border-none px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                config.theme === "light"
                  ? "bg-[#D6A54A] text-[#1F1B16]"
                  : segBtnInactive
              }`}
            >
              <SunSvg />
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange("dark")}
              className={`flex cursor-pointer items-center gap-1 border-none px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                config.theme === "dark"
                  ? "bg-[#D6A54A] text-[#1F1B16]"
                  : segBtnInactive
              }`}
            >
              <MoonSvg />
            </button>
          </div>
        </div>

        {/* Notification frequency selector */}
        <div className={`rounded-lg ${cardBg} px-3 py-2.5`}>
          <div className="mb-2">
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.frequencyTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>
              {labels.frequencyDesc}
            </p>
          </div>
          <div className={`grid overflow-hidden rounded-lg border ${segBorder}`}>
            {(
              [
                { key: "everyPage", label: labels.everyPage },
                { key: "firstPerSession", label: labels.firstPerSession },
                { key: "everyNPages", label: labels.everyNPages }
              ] as { key: NotificationFrequency; label: string }[]
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleFrequencyChange(item.key)}
                className={`cursor-pointer border-none px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
                  config.notificationFrequency === item.key
                    ? "bg-[#D6A54A] text-[#1F1B16]"
                    : segBtnInactive
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {config.notificationFrequency === "everyNPages" && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={2}
                max={25}
                value={config.notificationEveryNPages}
                onChange={(e) =>
                  handleFrequencyIntervalChange(Number(e.target.value) || 2)
                }
                className={`w-16 rounded-md border px-2 py-1.5 text-xs outline-none transition-colors focus:border-[#D6A54A] focus:ring-1 focus:ring-[#D6A54A] ${selectBg}`}
              />
              <span className={`text-xs ${textSecondary}`}>{labels.pages}</span>
            </div>
          )}
        </div>

        {/* Reciter selector */}
        <div className={`rounded-lg ${cardBg} px-3 py-2.5`}>
          <div className="mb-2">
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.reciterTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>
              {labels.reciterDesc}
            </p>
          </div>
          <select
            value={config.reciter}
            onChange={(e) => handleReciterChange(e.target.value)}
            dir={isRtl ? "rtl" : "ltr"}
            className={`w-full cursor-pointer appearance-none rounded-md border px-3 py-2 text-xs outline-none transition-colors focus:border-[#D6A54A] focus:ring-1 focus:ring-[#D6A54A] ${selectBg}`}
          >
            {Object.entries(quraa).map(([key, q]) => (
              <option key={key} value={key}>
                {isRtl ? q.arabicName : q.name} ({q.bitrate})
              </option>
            ))}
          </select>
        </div>

        {/* Position selector */}
        <div dir="ltr" className={`rounded-lg ${cardBg} px-3 py-2.5`}>
          <div className="mb-2">
            <p className={`m-0 text-sm font-medium ${textLabel}`}>
              {labels.positionTitle}
            </p>
            <p className={`m-0 text-xs ${textSecondary}`}>
              {labels.positionDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                { key: "top-left", labelAr: "أعلى يسار", labelEn: "Top Left" },
                { key: "top-right", labelAr: "أعلى يمين", labelEn: "Top Right" },
                {
                  key: "bottom-left",
                  labelAr: "أسفل يسار",
                  labelEn: "Bottom Left"
                },
                {
                  key: "bottom-right",
                  labelAr: "أسفل يمين",
                  labelEn: "Bottom Right"
                }
              ] as { key: PopupPosition; labelAr: string; labelEn: string }[]
            ).map((pos) => {
              const isActive = config.popupPosition === pos.key
              return (
                <button
                  key={pos.key}
                  type="button"
                  onClick={() => handlePositionChange(pos.key)}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-[11px] font-semibold transition-all duration-150 ${
                    isActive
                      ? "border-[#D6A54A] bg-[#D6A54A]/15 text-[#D6A54A]"
                      : dark
                        ? "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10"
                        : "border-[#1F1B16]/10 bg-[#F1ECE4]/50 text-[#1F1B16]/60 hover:border-[#1F1B16]/20 hover:bg-[#F1ECE4]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        isActive
                          ? "bg-[#D6A54A]"
                          : dark
                            ? "bg-white/30"
                            : "bg-[#1F1B16]/30"
                      }`}
                      style={{
                        boxShadow: isActive
                          ? "0 0 6px rgba(214,165,74,0.5)"
                          : "none"
                      }}
                    />
                    {isRtl ? pos.labelAr : pos.labelEn}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Exclude current site */}
        {currentHostname && (
          <button
            type="button"
            onClick={handleExcludeCurrentSite}
            className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors duration-150 ${
              isCurrentExcluded
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                : dark
                  ? "border-red-700 bg-red-900/40 text-red-400 hover:bg-red-900/60"
                  : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            }`}
            style={{ textAlign: isRtl ? "right" : "left" }}
          >
            <span className="flex-1">
              {isCurrentExcluded ? (
                <>
                  <span className="font-medium">{labels.reEnableBtn}</span>{" "}
                  <span className="text-xs opacity-75">
                    ({currentHostname})
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium">{labels.excludeBtn}</span>{" "}
                  <span className="text-xs opacity-75">
                    ({currentHostname})
                  </span>
                </>
              )}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 flex-shrink-0"
            >
              {isCurrentExcluded ? (
                <path d="M20 6L9 17l-5-5" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M4.93 4.93l14.14 14.14" />
                </>
              )}
            </svg>
          </button>
        )}

        {/* Excluded sites list — collapsible */}
        {config.excludedSites.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setExcludedOpen(!excludedOpen)}
              className={`m-0 flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-0 text-xs font-semibold uppercase tracking-wide ${textSecondary}`}
            >
              <span>
                {labels.excludedTitle}{" "}
                <span className="opacity-60">
                  ({config.excludedSites.length})
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 transition-transform duration-200"
                style={{
                  transform: excludedOpen ? "rotate(180deg)" : "rotate(0deg)"
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {excludedOpen && (
              <div className="mt-2 max-h-[120px] space-y-1 overflow-y-auto">
                {config.excludedSites.map((site) => (
                  <div
                    key={site}
                    className={`flex items-center justify-between rounded-md ${siteBg} px-3 py-1.5`}
                  >
                    <span className={`text-xs ${siteText}`}>{site}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExcluded(site)}
                      aria-label={`${labels.remove} ${site}`}
                      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-none bg-transparent p-0 transition-colors hover:text-red-500 ${dark ? "text-gray-500" : "text-gray-400"}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t ${borderColor} px-4 py-2.5`}>
        <p className={`m-0 text-center text-[10px] ${textSecondary}`}>
          Ayat v{chrome.runtime.getManifest().version}
        </p>
      </div>
    </div>
  )
}

export default Popup
