import { DEFAULT_CONFIG } from "./storage"

// ─── Init default config on install ──────────────────────────────────────────

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("ayatConfig", (result) => {
    if (!result.ayatConfig) {
      chrome.storage.sync.set({ ayatConfig: DEFAULT_CONFIG })
    }
  })
})

console.log("Ayat background worker running")

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000
  let binary = ""
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode(...chunk)
  }
  return btoa(binary)
}

// ─── Audio proxy ──────────────────────────────────────────────────────────────
//
// The host page's Content-Security-Policy (e.g. on GitHub, Facebook, WhatsApp)
// blocks `new Audio("https://everyayah.com/...")` in the content script because
// their CSP restricts `media-src` to same-origin only.
//
// Fix: the background service worker runs in the extension's own origin, which
// has its OWN CSP (defined by the extension manifest) and is NOT subject to the
// host page's CSP. We fetch the audio here, convert it to a base64 data-URI,
// and return it to the content script. The content script then plays a
// `data:audio/mpeg;base64,...` URL, which is never blocked by `media-src` CSP.

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; url?: string; fromContent?: boolean },
    _sender,
    sendResponse
  ) => {
    if (!message.fromContent) return false

    if (message.type === "AUDIO_FETCH") {
      const fetchAudio = async () => {
        try {
          if (!message.url) {
            sendResponse({ ok: false, error: "No URL provided" })
            return
          }

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 12_000)

          const resp = await fetch(message.url, { signal: controller.signal })
          if (!resp.ok) {
            clearTimeout(timeoutId)
            sendResponse({
              ok: false,
              error: `HTTP ${resp.status} ${resp.statusText}`
            })
            return
          }

          const buffer = await resp.arrayBuffer()
          clearTimeout(timeoutId)

          const base64 = arrayBufferToBase64(buffer)

          sendResponse({ ok: true, base64 })
        } catch (err) {
          console.error("Ayat background: failed to fetch audio", err)
          sendResponse({ ok: false, error: String(err) })
        }
      }

      fetchAudio()
      return true // keep message channel open for async sendResponse
    }

    return false
  }
)
