Exclusive Break
---------------

Damit kannst du auch TT-Artikel hinter der Paywall lesen.

Installation:
1. Öffne chrome://extensions in Chrome oder einem anderen Chromium-Browser.
2. Schalte den Entwicklermodus ein.
3. Klicke auf "Entpackte Erweiterung laden" und wähle diesen Ordner.
4. Lade die Artikelseite neu.

Ein- und ausschalten:
Öffne das Popup über das Symbol der Erweiterung und klicke auf
"Aktivieren" oder "Deaktivieren". Die Einstellung bleibt gespeichert,
auch nach einem Browser-Neustart. Standardmäßig ist die Erweiterung aktiv.
Lade nach dem Umschalten offene Artikelseiten neu.

Für die Entwicklung:
interceptor.js entfernt Array-Einträge mit dem Typ "exclusive-break" aus
JSON-Antworten von https://api.tt.com/v2/articles/...
Fetch (.json() und .text()) und XMLHttpRequest (JSON und Text) werden
unterstützt. Verschachtelte Arrays werden ebenfalls bereinigt.
Andere JSON-Felder bleiben unverändert; die Textformatierung kann sich
ändern. Binäre Antworten und direkte Datenströme werden nicht gefiltert.

settings.js speichert die Auswahl und meldet interceptor.js beim Browser
an oder ab. background.js stellt die Auswahl nach Installation und
Updates wieder her. popup.html und popup.js enthalten die Oberfläche.

Die Erweiterung benötigt Website-Zugriff, damit sie die Artikelantworten
auf aufrufenden Seiten bearbeiten kann. Nur Antworten des genannten
Endpunkts werden geändert. Es werden keine Daten versendet.

Dateien direkt bearbeiten, danach die Erweiterung und Artikelseite neu
laden. Es gibt keine Abhängigkeiten und keinen Build-Schritt.
