# bärly – Supplement-Gummies (Prototyp)

Klickbarer Prototyp des bärly-Shops. Marke: **bärly** (Domain: bärly.de). Claim: *Same Bears. Better Days.*

## Ansehen

- **Lokal:** `index.html` im Browser öffnen.
- **GitHub Pages (empfohlen, lädt alle Bilder):** Repo → Settings → Pages → Branch auswählen → Ordner `/ (root)`.
- **Ohne Setup:** `https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/<branch>/index.html`

## Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite |
| `glow.html`, `flex.html`, `snoozy.html`, `daily.html` | Produktseiten (eine pro Sorte) |
| `verpackung.html`, `content.html` | intern: Verpackungssystem und Content-Plan (nicht im Shop verlinkt) |

### Startseite

1. **Hero:** eine Bühne pro Bär. Maskottchen und Dose, Sortenfarbe, riesiges Produktwort, Sprechblase. Der nächste Bär fliegt von rechts unten herein, der alte nach links oben raus. Automatischer Wechsel alle 7 Sekunden mit Fortschrittsbalken, Pause-Knopf, Wischen, Pfeiltasten. Pausiert bei Maus oder Fokus im Hero und außerhalb des Bildschirms. Bär antippen: er quetscht sich und sagt etwas Neues.
2. Trust-Leiste
3. Die Original Four und zwei Sets (Karten führen zur Produktseite; beim Hovern schaut das Maskottchen hinter der Dose hervor)
4. Bären-Finder
5. **Ein Tag mit der Crew:** Regler durch den Tag (07:00 DAILY, 07:30 GLOW, 17:30 FLEX, 22:30 SNOOZY), Himmel, Sonne und Mond wandern mit
6. Warum bärly
7. Meet the bärly Crew
8. Abo
9. Founders Club
10. FAQ

### Produktseite (nach dem Vorbild Bloom, mit mehr Details für DACH)

- **Galerie mit 360°-Dose:** ziehen, Pfeiltasten oder „Vorne / Bär / Nährwerte / Seite“. Die Rückseite zeigt die echte Nährwerttabelle. Dazu Maskottchen, Tagesportion, Nachfüller, Alltag.
- **Kaufbox:** Abo, Einmalkauf, Nur Nachfüller, 3er-Vorrat; Abo-Rhythmus 30/45/60 Tage; Menge; Grundpreis pro kg, Füllmenge, MwSt. und Versand direkt am Preis; Kündigen per Klick; Widerrufsrecht; Versand, Abo und Zahlarten zum Aufklappen.
- Leiste mit Kaufknopf, sobald die Kaufbox aus dem Bild scrollt
- Laufband mit den Fakten
- **Meet the bear:** Steckbrief, Bär folgt der Maus, antippen für neue Sprüche
- **Was drin ist:** jede Zutat mit Menge, NRV-Balken und der zugelassenen Angabe im Wortlaut
- So nimmst du es: Uhrzeit und drei Schritte
- **Abo-Rechner:** 1–12 Monate, Einzelkauf mit Versand gegen Abo, mit Rechenweg
- Nährwerttabelle und alle Pflichtangaben
- Bewertungen: bis zum Launch ehrlich leer (keine erfundenen Sterne)
- FAQ zur Sorte und Empfehlungen aus der Crew

Warenkorb (im Browser gespeichert) gilt für alle Seiten.

## Bilder

Es werden keine Ausschnitte aus Referenzbildern verwendet. Maskottchen (`mascots.js`), Dosen und die 360°-Etiketten (`packs.js`) sind eigene Zeichnungen und werden als WebP gerendert. `assets/ASSETS.md` listet alle Dateien, die Render-Befehle und die noch fehlenden Lifestyle-Fotos.

## Anpassen

- Produkte, Formate, Preise: `brand.js` (`PRODUCTS`, `PACK_INFO`, `plansFor`, `BUNDLES`)
- Texte für Hero und Produktseiten (Schlagzeilen, Sprechblasen, Steckbrief, Einnahme, FAQ): `brand.js` (`PDP`)
- Gemeinsame Shop-Logik (Warenkorb, Navigation): `shop.js`, Startseite: `home.js`, Produktseiten: `pdp.js`
- Farben und Schriften: `styles.css` unter `:root`, Produktseite zusätzlich `pdp.css`
- Kopf und Fuß der Produktseiten kommen aus `index.html`: nach Änderungen `node tools/build-pdps.js`

## Vor dem Launch prüfen

- Echte Packshots und Lifestyle-Fotos produzieren (Briefing in `assets/ASSETS.md`).
- Rezepturen, Dosierungen und Preise mit dem Hersteller abgleichen.
- GLOW: 450 µg Biotin pro Tag liegt deutlich über dem Höchstmengen-Vorschlag des BfR für Biotin in Nahrungsergänzungsmitteln. Vorschläge des BfR sind nicht verbindlich, aber im DACH-Raum wird darauf geachtet: mit Hersteller und Lebensmittelrecht klären.
- Melatonin (SNOOZY): Einstufung in Deutschland rechtlich klären.
- Gesundheitsbezogene Angaben, Produktnamen und Pflichtangaben rechtlich prüfen lassen.
- Widerrufsrecht und Abo-Bedingungen (Kündigungsbutton) mit den AGB abgleichen.
- Kasse und Newsletter sind noch nicht angebunden (geplant: Shopify).
