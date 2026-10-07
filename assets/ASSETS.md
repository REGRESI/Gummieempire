# bärly Website-Assets

Auf der Website erscheinen ausschließlich die freigegebenen Dateien unten. Es werden keine Dosen oder Bären nachgezeichnet, gerendert oder ersetzt. Ansichten wie „Dose mit Bär“ entstehen nur durch Anordnung dieser Dateien per HTML/CSS.

## Freigegeben (kanonisch)

| Datei | Inhalt | Format |
| --- | --- | --- |
| `products/glow-front.webp` | Packshot GLOW | 1122 × 1402, mit Studiohintergrund |
| `products/flex-front.webp` | Packshot FLEX | 1086 × 1448, mit Studiohintergrund |
| `products/snoozy-front.webp` | Packshot SNOOZY | 1122 × 1402, mit Studiohintergrund |
| `products/daily-front.webp` | Packshot DAILY | 1122 × 1402, mit Studiohintergrund |
| `characters/glow.webp` | GLOW: pink, goldene Krone, Herz-Sonnenbrille | 1122 × 1402, freigestellt |
| `characters/flex.webp` | FLEX: blau, schwarze Sportbrille, Hantel | 1122 × 1402, freigestellt |
| `characters/snoozy.webp` | SNOOZY: lila, Schlafmütze, Kissen | 1122 × 1402, freigestellt |
| `characters/daily.webp` | DAILY: gelb, cremefarbener Hoodie, schwarze Crossbody-Bag | 1122 × 1402, freigestellt |

`characters/*-bust.webp` sind identische Kopien der Charakterbilder. Die Website nutzt dafür das Hauptbild und schneidet den Kopf per CSS aus (`.avatar` in `styles.css`, Kopfmitte über `--ax` / `--ay`).

Packshots haben einen Studiohintergrund und werden deshalb immer als gerahmtes Foto gezeigt, nie freigestellt.

## Nicht verwenden

| Datei | Grund |
| --- | --- |
| `campaign/crew-hero.webp` | Liegt im Repository, weil sie im Asset-Paket war. Die Bären und Dosen darin weichen von den freigegebenen Dateien ab (z. B. DAILY mit Cap, andere Dosen). Deshalb nirgends eingebunden. |

## Noch zu produzieren (optional)

| Datei | Format | Motiv |
| --- | --- | --- |
| `lifestyle/{glow,flex,snoozy,daily}.webp` | 1600 × 2000 (4:5) | Echte Dose im Alltag: GLOW Vanity am Morgen, FLEX im Gym, SNOOZY Nachttisch am Abend, DAILY Frühstückstisch. |

Liegt ein Foto im Ordner, die Sorte in `brand.js` unter `LIFESTYLE_READY` eintragen. Dann erscheint es im Modul „Ein Tag mit der Crew“. Vorher zeigt die Seite Packshot und Charakter und fragt keine fehlende Datei an.

## Regeln für alle Bilder

- Produkt zuerst, Charakter als zweite Ebene. Erwachsen, ruhig, hochwertig.
- Gummies nie als Snack in großen Mengen zeigen.
- Charaktere nur so, wie in den freigegebenen Dateien.
