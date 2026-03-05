import { DEFAULT_CONFIG } from "./storage"

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("ayatConfig", (result) => {
    if (!result.ayatConfig) {
      chrome.storage.sync.set({ ayatConfig: DEFAULT_CONFIG })
    }
  })
})

console.log("Ayat background worker running")
