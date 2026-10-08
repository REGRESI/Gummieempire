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
| `verpackung.html`, `content.html` | intern, nicht im Shop verlinkt: Verpackungssystem (Entwurfszeichnungen, nicht das freigegebene Packaging) und Content-Plan |

### Startseite

1. **Hero:** eine Bühne pro Sorte aus zwei echten Ebenen: Packshot als gerahmtes Foto, freigestellter Charakter davor, Hintergrund und Typo per CSS. Ruhiger Wechsel (die neue Sorte gleitet leicht von rechts unten herein), automatischer Wechsel alle 7 Sekunden mit Pause-Knopf, Wischen und Pfeiltasten. Bär antippen: neue Sprechblase.
2. Trust-Leiste
3. Die Original Four (Packshot, Zweck, Geschmack, Preis, Abo-Preis, CTA) und zwei Sets
4. Bären-Finder
5. Ein Tag mit der Crew (Regler durch den Tag)
6. Warum bärly
7. Meet the bärly Crew
8. Abo
9. Founders Club
10. FAQ

### Produktseite

- Galerie aus den freigegebenen Bildern: Dose, Dose mit Bär, Bär
- Kaufbox: Name, Produktart, Kurzzeile, drei Punkte, Geschmack und Menge; Abo (Standard, 20 % sparen, Lieferintervall) oder einmal kaufen; weitere Optionen (Nachfüller, 3er-Vorrat); Grundpreis, MwSt. und Versand am Preis; Leiste mit Kaufknopf beim Scrollen
- Danach: Nutzenleiste, Warum, Inhaltsstoffe mit NRV, zugelassene Angaben im Wortlaut mit Nährwerttabelle und Pflichtangaben, Einnahme, Meet the bear, Abo mit Rechner, Bewertungen (leer bis zum Launch), FAQ, Rest der Crew
- Jede Sorte mit eigener Stimmung (GLOW Vanity-Rosa, FLEX klares Blau, SNOOZY Abendlila, DAILY Morgengelb), gleiche Bausteine

Warenkorb (im Browser gespeichert) gilt für alle Seiten.

### Links in der htmlpreview-Vorschau

htmlpreview.github.io schreibt nur Links um, die beim Laden im HTML stehen. Alle internen Seitenlinks tragen deshalb `data-page`; `shop.js` (`page()`, `go()`) baut daraus in der Vorschau die richtige Adresse. Auf GitHub Pages, lokal und auf einer eigenen Domain bleiben es normale relative Links.

## Bilder

Nur die freigegebenen Dateien aus `assets/` (siehe `assets/ASSETS.md`). Es gibt keine gerenderten Dosen oder Bären mehr auf der Website.

## Anpassen

- Produkte, Formate, Preise: `brand.js` (`PRODUCTS`, `PACK_INFO`, `plansFor`, `BUNDLES`)
- Texte für Hero und Produktseiten (Schlagzeilen, Sprechblasen, Steckbrief, Einnahme, FAQ): `brand.js` (`PDP`)
- Black Week (Crew-Abo zum Aktionspreis, Banner mit Countdown, Angebotsblock unter dem Hero): `brand.js` (`BLACK_FRIDAY`: Preis, Teaser-, Start- und Endzeit). Vorschau ohne auf das Datum zu warten: `?bf=live`, `?bf=teaser` oder `?bf=off` an die Adresse hängen. Inhalt der Crew: `BUNDLES.crew.includes`. Koop-Set mit der Skincare-Marke: `BUNDLES.glowskin` (Partnername, Produkte mit Preis und Bild, Setpreis eintragen, dann `soon` entfernen); Gratis-Beigabe: `BLACK_FRIDAY.gift`
- Lifestyle-Fotos freischalten: `brand.js` (`LIFESTYLE_READY`)
- Gemeinsame Shop-Logik (Warenkorb, Navigation): `shop.js`, Startseite: `home.js`, Produktseiten: `pdp.js`
- Farben und Schriften: `styles.css` unter `:root`, Produktseite zusätzlich `pdp.css`
- Kopf und Fuß der Produktseiten kommen aus `index.html`: nach Änderungen `node tools/build-pdps.js`

## Vor dem Launch prüfen

- Lifestyle-Fotos produzieren (Briefing in `assets/ASSETS.md`).
- FLEX: `PACK_INFO` in `brand.js` führt noch die große Dose (150 mm), der freigegebene Packshot zeigt die normale Dose. Daten an das echte Packaging anpassen.
- Rezepturen, Dosierungen und Preise mit dem Hersteller abgleichen.
- GLOW: 450 µg Biotin pro Tag liegt deutlich über dem Höchstmengen-Vorschlag des BfR für Biotin in Nahrungsergänzungsmitteln. Vorschläge des BfR sind nicht verbindlich, aber im DACH-Raum wird darauf geachtet: mit Hersteller und Lebensmittelrecht klären.
- Melatonin (SNOOZY): Einstufung in Deutschland rechtlich klären.
- Gesundheitsbezogene Angaben, Produktnamen und Pflichtangaben rechtlich prüfen lassen.
- Widerrufsrecht und Abo-Bedingungen (Kündigungsbutton) mit den AGB abgleichen.
- Kasse und Newsletter sind noch nicht angebunden (geplant: Shopify).
