import { isEnabled, setEnabled } from "./settings.js";

const button = document.getElementById("toggle");
const status = document.getElementById("status");
const error = document.getElementById("error");
let enabled;

function render() {
  document.body.dataset.enabled = String(enabled);
  status.textContent = enabled ? "Aktiv" : "Inaktiv";
  button.textContent = enabled ? "Deaktivieren" : "Aktivieren";
  button.disabled = false;
}

try {
  enabled = await isEnabled();
  render();
} catch {
  status.textContent = "Nicht verfügbar";
  error.textContent = "Die Einstellung konnte nicht geladen werden. Bitte öffne das Fenster erneut.";
  error.hidden = false;
}

button.addEventListener("click", async () => {
  button.disabled = true;
  error.hidden = true;
  try {
    await setEnabled(!enabled);
    enabled = !enabled;
  } catch {
    error.textContent = "Das hat leider nicht geklappt. Bitte versuche es noch einmal.";
    error.hidden = false;
  } finally {
    render();
  }
});
