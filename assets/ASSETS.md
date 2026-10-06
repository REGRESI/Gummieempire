# bärly Website-Assets

Alle Bilder auf der Website werden eigens dafür produziert. Ausschnitte aus Moodboards, Character Bible oder Packaging-Frames werden nicht verwendet. Die Referenz-Frames dienen nur als Vorlage für Farben, Charaktere und Packaging.

Fehlt eine Datei, zeigt die Website an dieser Stelle einen sauberen Platzhalter mit dem Dateinamen. Sobald die Datei unter genau diesem Pfad liegt, erscheint sie automatisch.

## Vorhanden (eigene Renderings)

| Datei | Inhalt | Quelle |
| --- | --- | --- |
| `products/{glow,flex,snoozy,daily}-front.webp` | Dose frontal, transparenter Hintergrund, Leinwand 720 × 1473 px, alle im selben Maßstab und unten bündig | `packs.js` `jar()` · `node tools/render-products.js` |
| `products/{id}-wrap.webp` | Abwicklung des Dosenkörpers (2000 px breit = Umfang) für die 360°-Ansicht: Front, Maskottchen-Seite, Rückseite mit Nährwerten, linke Seite | `packs.js` `jarWrap()` · `node tools/render.js tools/render-wraps.html assets/products` |
| `characters/{id}.webp` | Maskottchen ganz, 940 × 1040 px, transparent | `mascots.js` · `node tools/render.js tools/render-characters.html assets/characters` |
| `characters/{id}-bust.webp` | Maskottchen als Büste, 600 × 510 px, transparent (Auswahl im Hero, Karten, Leiste) | wie oben |

Die Renderer erzeugen PNG; danach in WebP umwandeln (Qualität 86–90, bei Figuren mit Alphakanal). Für den Launch können echte Packshots und 3D-Renderings der Maskottchen die Dateien 1:1 ersetzen: gleicher Name, gleiche Leinwand, transparenter Hintergrund. Die 360°-Ansicht braucht dafür eine flache Etiketten-Abwicklung in derselben Aufteilung (Front bei 57,5° vom linken Rand, siehe `WRAP_SEAM` in `packs.js`).

## Noch zu produzieren

Alle Formate als WebP, sRGB, Qualität 85–90. Bis dahin zeigt die Seite die Maskottchen mit Dose auf der Sortenfarbe und einen kleinen Hinweis mit dem Dateinamen.

| Datei | Format | Motiv | Wo |
| --- | --- | --- | --- |
| `lifestyle/glow.webp` | 1600 × 2000 (4:5) | GLOW-Dose auf einem hellen Vanity-Setup: Marmor, Spiegel, Serum, frische Himbeeren, Morgenlicht. Ruhig, viel Fläche. | „Ein Tag mit der Crew“, Produktseite „Im Alltag“ |
| `lifestyle/flex.webp` | 1600 × 2000 (4:5) | FLEX-Dose im Gym: Bank, Hanteln, Sporttasche, kühles Tageslicht. Keine Personen mit Körperversprechen. | wie oben |
| `lifestyle/snoozy.webp` | 1600 × 2000 (4:5) | SNOOZY-Dose im Schlafzimmer am Abend: Nachttisch, warme Lampe, Leinen, Buch. Nur Erwachsenen-Setting. | wie oben |
| `lifestyle/daily.webp` | 1600 × 2000 (4:5) | DAILY-Dose beim Frühstück: Küche, Kaffee, Zitrone, Mango, helles Morgenlicht. | wie oben |

Der Hero braucht kein eigenes Bild mehr: Er setzt sich pro Sorte aus Maskottchen und Dose zusammen.

## Regeln für alle Bilder

- Erwachsen, ruhig, hochwertig. Keine Comic-Flächen, keine Kinder, keine Süßigkeiten-Inszenierung.
- Gummies nie als Snack in großen Mengen zeigen; wenn Gummies im Bild sind, dann zwei.
- Kein Text im Bild außer dem, was auf der Dose steht.
- Charaktere so, wie in der Character Bible beschrieben: GLOW pink mit Krone und Herzbrille, FLEX blau mit schwarzer Sportbrille, SNOOZY lila mit Schlafmütze und Kissen, DAILY gelb mit Hoodie und Crossbody-Bag.
