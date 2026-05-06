export type Language = "ar" | "en"
export type Theme = "light" | "dark"
export type PopupPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left"
export type NotificationFrequency = "everyPage" | "firstPerSession" | "everyNPages"

export interface AyatConfig {
  enabled: boolean
  excludedSites: string[]
  language: Language
  reciter: string
  theme: Theme
  popupPosition: PopupPosition
  notificationFrequency: NotificationFrequency
  notificationEveryNPages: number
}

export const DEFAULT_CONFIG: AyatConfig = {
  enabled: true,
  excludedSites: [],
  language: "ar",
  reciter: "67",
  theme: "light",
  popupPosition: "bottom-right",
  notificationFrequency: "everyPage",
  notificationEveryNPages: 3
}

export async function getConfig(): Promise<AyatConfig> {
  const result = await chrome.storage.sync.get("ayatConfig")
  return { ...DEFAULT_CONFIG, ...(result.ayatConfig || {}) }
}

export async function setConfig(
  config: Partial<AyatConfig>
): Promise<AyatConfig> {
  const current = await getConfig()
  const updated = { ...current, ...config }
  await chrome.storage.sync.set({ ayatConfig: updated })
  return updated
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ""
  }
}
