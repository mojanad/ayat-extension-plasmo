export type Language = "ar" | "en"
export type Theme = "light" | "dark"
export type PopupPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left"
export type NotificationFrequency = "everyPage" | "firstPerSession" | "everyNPages"

export interface FavoriteAyah {
  id: string
  surahNumber: number
  ayahNumber: number
  surahName: string
  surahArabicName: string
  arabicText: string
  translation: string
  reciter?: string
  createdAt: number
}

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

export function getFavoriteId(surahNumber: number, ayahNumber: number): string {
  return `${surahNumber}:${ayahNumber}`
}

export async function getFavorites(): Promise<FavoriteAyah[]> {
  const result = await chrome.storage.local.get("ayatFavorites")
  return Array.isArray(result.ayatFavorites) ? result.ayatFavorites : []
}

export async function setFavorites(favorites: FavoriteAyah[]): Promise<void> {
  await chrome.storage.local.set({ ayatFavorites: favorites })
}

export async function addFavorite(
  favorite: Omit<FavoriteAyah, "id" | "createdAt">
): Promise<FavoriteAyah[]> {
  const favorites = await getFavorites()
  const id = getFavoriteId(favorite.surahNumber, favorite.ayahNumber)
  const nextFavorite: FavoriteAyah = {
    ...favorite,
    id,
    createdAt: Date.now()
  }
  const updated = [
    nextFavorite,
    ...favorites.filter((item) => item.id !== id)
  ]
  await setFavorites(updated)
  return updated
}

export async function removeFavorite(id: string): Promise<FavoriteAyah[]> {
  const favorites = await getFavorites()
  const updated = favorites.filter((item) => item.id !== id)
  await setFavorites(updated)
  return updated
}

export async function isFavoriteAyah(
  surahNumber: number,
  ayahNumber: number
): Promise<boolean> {
  const favorites = await getFavorites()
  const id = getFavoriteId(surahNumber, ayahNumber)
  return favorites.some((item) => item.id === id)
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ""
  }
}
