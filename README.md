# bärly – Supplement-Gummies (Prototyp)

Klickbarer Prototyp der bärly-Shopseite. Marke: **bärly** (Domain: bärly.de). Claim: *Same Bears. Better Days.*

## Ansehen

- **Lokal:** `index.html` im Browser öffnen.
- **GitHub Pages (empfohlen, lädt alle Bilder):** Repo → Settings → Pages → Branch auswählen → Ordner `/ (root)`.
- **Ohne Setup:** `https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/<branch>/index.html`

## Aufbau der Startseite

1. Hero: große Wortmarke, Claim, Gruppenbild (Slot), „Produkte entdecken“ und „Welcher Bär passt zu dir?“
2. Trust-Leiste: nur Zusagen aus dem eigenen Angebot (Abo-Versand, Kündigung, Briefkasten, offene Nährstoffangaben)
3. Die Original Four: GLOW, FLEX, SNOOZY, DAILY plus die Sets „Die ganze Crew“ und „Beauty Sleep“
4. Bären-Finder: „Was soll dein Glas für dich tun?“
5. Momente: vier große Lifestyle-Bilder (Slots)
6. Warum bärly
7. Meet the bärly Crew: Name, Persönlichkeit, Produkt
8. Abo
9. Founders Club
10. FAQ

Dazu Warenkorb (im Browser gespeichert) und Produktdetail mit Nährstofftabelle, zugelassener Angabe, Kaufarten und Pflichtangaben.

## Bilder

Es werden keine Ausschnitte aus Referenzbildern verwendet. `assets/ASSETS.md` listet alle Bild-Slots mit Format und Motiv-Briefing:

- `assets/products/*-front.webp`: vorhanden, gerendert aus der Verpackungszeichnung (`node tools/render-products.js`)
- `assets/characters/*.webp`, `assets/lifestyle/*.webp`, `assets/hero/crew.webp`: noch zu produzieren. Bis dahin zeigt die Seite einen Platzhalter mit dem Dateinamen; liegt die Datei unter dem Pfad, erscheint sie automatisch.

## Interne Seiten (nicht im Shop verlinkt)

- `verpackung.html`: Verpackungssystem, Maße, Pflichtangaben, Launch, offene Fragen
- `content.html`: Content-Plan für Instagram, TikTok und YouTube (Episoden und Running Gags gehören hierhin, nicht auf die Shopseite)

## Anpassen

Produkte, Formate und Preise stehen in `brand.js` (`PRODUCTS`, `PACK_INFO`, `plansFor`, `BUNDLES`, `ASSETS`), Shop-Logik in `app.js`, Farben und Schriften in `styles.css` unter `:root`. Die Verpackungszeichnung steht in `packs.js` (`jar()`).

## Vor dem Launch prüfen

- Echte Packshots, Character-Renderings und Lifestyle-Fotos produzieren (Briefing in `assets/ASSETS.md`).
- Rezepturen, Dosierungen und Preise mit dem Hersteller abgleichen.
- Melatonin (SNOOZY): Einstufung in Deutschland rechtlich klären.
- Gesundheitsbezogene Angaben, Produktnamen und Pflichtangaben rechtlich prüfen lassen.
- Kasse und Newsletter sind noch nicht angebunden (geplant: Shopify).
