# bärly – Gummy-Shop (Prototyp)

Klickbarer Prototyp für eine Supplement-Gummibärchen-Marke. Marke: **bärly** (Domain: bärly.de).

## Ansehen

- **Lokal:** `index.html` im Browser öffnen.
- **GitHub Pages:** Repo → Settings → Pages → Branch auswählen → Ordner `/ (root)`. Danach ist die Seite unter `https://<user>.github.io/Gummieempire/` erreichbar.
- **Ohne Setup:** `https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/<branch>/index.html`

## Was drin ist

- Hero-Karussell: Ein Bär steht in der Mitte, der nächste fliegt von unten rechts herein. Wischen, Pfeiltasten, Antippen (Squish) und Maus-Parallax funktionieren.
- 12 Sorten (9 für Erwachsene, 3 in der Kids-Linie) mit eigener Figur, Farbe, Nährwerttabelle und zugelassener Gesundheitsangabe.
- Formatwahl je Sorte: Abo (Dose gratis, Nachfüller per Brief, Rhythmus 30/45/60 Tage), Einmalkauf, Nur Nachfüller, 3er-Vorrat; Kids und Zap als Tütchen-Box. Grundpreis pro kg.
- Bären-Finder mit Zielen, Abo-Preis und Warnung, wenn ein Stack die BfR-Höchstmengen für Zink oder Vitamin D überschreitet.
- Warenkorb mit Abo/Einmalkauf, Bundles und Gratisversand-Leiste (wird im Browser gespeichert).
- Beauty-von-innen-Sektion, Kids-Linie „Pausenbrot-Bande“, Vergleichstabelle, Abo-Erklärung, Founders-Club-Anmeldung, FAQ.

## Verpackung

`verpackung.html` ist die Arbeitsgrundlage für Lieferanten und Design: Formate (Bärendose, Nachfüller per Brief, Tütchen-Box, Tagestütchen, Probierwoche), Maße, Material, Raster der Vorderseite, Pflichtangaben, erlaubte und verbotene Umweltaussagen, Launch-Wellen und Quellen mit Prüfstatus. Die Packungen werden als SVG aus `packs.js` gezeichnet, die Inhalte stehen in `packaging-spec.js`.

## Anpassen

Produkte, Packungsdaten, Formate und Preise stehen in `brand.js` (`PRODUCTS`, `PACK_INFO`, `plansFor`, `BUNDLES`), Shop-Logik in `app.js`. Farben und Schriften stehen in `styles.css` unter `:root`.

## Vor dem Launch prüfen

- Rezepturen, Dosierungen und Preise mit dem Hersteller abgleichen.
- Gesundheitsbezogene Aussagen (VO 1924/2006, VO 432/2012) und Pflichthinweise rechtlich prüfen lassen.
- Zuckerwert „unter 1 g“ ist ein Zielwert.
- Kasse und Newsletter sind noch nicht angebunden (geplant: Shopify).
