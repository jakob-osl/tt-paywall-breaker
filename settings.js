const scriptId = "exclusive-break";

export async function isEnabled() {
  const { enabled = true } = await chrome.storage.local.get("enabled");
  return enabled;
}

export async function setEnabled(enabled) {
  const scripts = await chrome.scripting.getRegisteredContentScripts({ ids: [scriptId] });

  if (enabled && scripts.length === 0) {
    await chrome.scripting.registerContentScripts([{
      id: scriptId,
      matches: ["http://*/*", "https://*/*"],
      js: ["interceptor.js"],
      runAt: "document_start",
      world: "MAIN",
      allFrames: true,
    }]);
  } else if (!enabled && scripts.length > 0) {
    await chrome.scripting.unregisterContentScripts({ ids: [scriptId] });
  }

  await chrome.storage.local.set({ enabled });
}
