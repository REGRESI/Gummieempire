# bärly – Gummy-Shop und Markenwelt (Prototyp)

Klickbarer Prototyp für eine Supplement-Gummibärchen-Marke. Marke: **bärly** (Domain: bärly.de). Claim: *Same Bears. Better Days.*

## Ansehen

- **Lokal:** `index.html` im Browser öffnen.
- **GitHub Pages (empfohlen, lädt alle Bilder):** Repo → Settings → Pages → Branch auswählen → Ordner `/ (root)`. Danach ist die Seite unter `https://<user>.github.io/Gummieempire/` erreichbar.
- **Ohne Setup:** `https://htmlpreview.github.io/?https://github.com/REGRESI/Gummieempire/blob/<branch>/index.html`

## Was drin ist

Der Launch konzentriert sich auf vier Bären aus der Character Bible. Die anderen Sorten stehen als „später“ in den Daten.

| Bär | Produkt | Rolle | Running Gag |
| --- | --- | --- | --- |
| Glow | Beauty Gummies (Biotin, Zink, Vitamin C) | The Main Character | „Bin in 5 Minuten fertig.“ |
| Flex | Kreatin Gummies (Kreatin, B6, B12) | The Gym Bro | „Nur noch ein Satz.“ |
| Snooze | Snoozy Sleep Gummies (Melatonin, Magnesium, B6) | The Chill Guy | „Morgen?“ |
| Daily | Multivitamin Gummies (12 Vitamine, 3 Mineralstoffe) | The Organizer | „Ich hab da einen Plan.“ |

- **Hero:** Die Dose mit dem Bär obendrauf steht in der Mitte, die nächste fliegt von unten rechts herein. Wischen, Pfeiltasten, Antippen und Maus-Parallax funktionieren.
- **Quiz** „Welcher bärly-Bär bist du?“ mit drei Fragen, teilbarem Ergebnis und Bundle-Tipp.
- **Shop:** vier Dosen, Bundles „Die ganze Crew“ und „Beauty Sleep“, Teaser „Bald im Haus“. Formatwahl je Sorte: Abo (Dose gratis, Nachfüller per Brief, 30/45/60 Tage), Einmalkauf, Nur Nachfüller, 3er-Vorrat, mit Grundpreis pro kg.
- **Die Crew:** Charakterkarten mit Eigenschaften, Zitat, Running Gag und Zimmer, dazu die sechs Crew-Dynamiken.
- **Das Haus:** Villa mit anklickbaren Zimmern.
- **Episoden:** Episode 001 als Storyboard, Running Gags, Links zu Instagram, TikTok und YouTube.
- **bärly kids:** bleibt sichtbar, ist aber noch nicht bestellbar. Statt Warenkorb gibt es eine Warteliste.
- Warenkorb (im Browser gespeichert), Founders Club mit Abstimmung, FAQ.

## Interne Seiten

- `verpackung.html`: Verpackungssystem für Lieferanten und Design: Dose im Look der Frames, Nachfüller per Brief, Maße, Material, Lesereihenfolge der Vorderseite, Pflichtangaben, Launch, offene Fragen und Quellen mit Prüfstatus. Inhalte in `packaging-spec.js`, Zeichnungen in `packs.js`.
- `content.html`: Content-Plan für Instagram, TikTok und YouTube: Avatare und Bären, Content-Säulen, Staffel 1 mit acht Folgen, Hooks und CTAs je Plattform, Posting-Takt, Leitplanken mit zugelassenen Claims, Kennzahlen.

## Anpassen

Produkte, Welt (Zimmer, Beziehungen, Gags, Episoden), Bildpfade, Formate und Preise stehen in `brand.js` (`PRODUCTS`, `WORLD`, `IMG`, `PACK_INFO`, `plansFor`, `BUNDLES`), Shop-Logik in `app.js`. Farben und Schriften stehen in `styles.css` unter `:root`. Bilder liegen in `assets/` und sind Ausschnitte aus dem PDF mit den Frames.

## Vor dem Launch prüfen

- Bilder in voller Auflösung aus den Original-Frames exportieren (die PDF-Ausschnitte sind klein).
- Rezepturen, Dosierungen und Preise mit dem Hersteller abgleichen. Die Crew ist so abgestimmt, dass alle vier zusammen nicht über den BfR-Höchstmengen für Zink, Vitamin D und B6 liegen.
- Melatonin (Snoozy): Einstufung in Deutschland rechtlich klären.
- Gesundheitsbezogene Aussagen (VO 1924/2006, VO 432/2012), Produktnamen und Captions rechtlich prüfen lassen.
- Kasse, Newsletter und Warteliste sind noch nicht angebunden (geplant: Shopify).
