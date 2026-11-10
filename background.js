import { isEnabled, setEnabled } from "./settings.js";

// Restore the saved choice after installation, updates, or extension reloads.
chrome.runtime.onInstalled.addListener(() => {
  isEnabled().then(setEnabled).catch(console.error);
});
