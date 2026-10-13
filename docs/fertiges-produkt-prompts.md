# Fertiges Produkt (Stand 13.10.2026)

Mit diesen Prompts legst du das fertige Produkt fest, bevor die Ausschreibung rausgeht: Dose mit Etikett und Gummies in Bärchenform. Die Ergebnisse ersetzen danach die alten Packshots als Referenz für alle anderen Prompts in dieser Bibliothek.

Hintergrund: Wir starten über Dropshipping mit eigenem Etikett (siehe `supplier/supplier-verpackung.md`). Die alte farbige Design-Dose (`R-DOSE-<SORTE>`) dient hier nur noch als **Vorlage für das Etikett-Design**, nicht mehr als Dose.

## Referenzbilder

Alle liegen in `prompts/bilder/referenzen/`.

| Kürzel | Datei | Wofür |
| --- | --- | --- |
| `R-DOSE-WEISS` | `R-DOSE-WEISS.jpg` | Form der Dose: weiße 250-ml-Zylinderdose mit glattem weißem Schraubdeckel |
| `R-FORM-BÄRCHEN` | `R-FORM-BAERCHEN.png` | Form der Gummies: klassisches sitzendes Gummibärchen, matt |
| `R-DOSE-GLOW` … `R-DOSE-DAILY` | `R-DOSE-<SORTE>.jpg` | Etikett-Design: Farben, Logo, Schrift, Metallic-Wellen, Icon |

## Die Sorten

| `{SORTE}` | `{FARBE}` (Etikett, Variante B auch Dose) | `{TIEFFARBE}` (Produktname) | `{KATEGORIE}` | `{NÄHRSTOFFE}` | `{GESCHMACK}` | `{ICON}` | `{GUMMIFARBE}` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GLOW | pastel pink #fad4dd with rose-gold metallic waves | raspberry red #c2416a | BEAUTY GUMMIES | Biotin · Zink · Vitamin C | Himbeere | small pink crown | raspberry pink-red |
| FLEX | pastel ice blue #d3e8ff with silver-blue metallic waves | navy #1e4ed8 | KREATIN GUMMIES | Kreatin · Vitamin B6 · B12 | Blaubeere | small flexed arm | blueberry blue |
| SNOOZY | pastel lavender #dccef4 with lilac-silver metallic waves | deep purple #5b21b6 | SLEEP GUMMIES | Melatonin · Magnesium · Vitamin B6 | Waldbeere | small crescent moon with stars | berry purple |
| DAILY | butter yellow #fbe7b5 with gold metallic waves | amber #8a5c00 | MULTIVITAMIN GUMMIES | Vitamin D · B12 · Zink | Mango | small sun | mango yellow-orange |

`60 Gummies` bleibt stehen, bis der Anbieter die echte Stückzahl nennt.

---

## Schritt 1: Gummibärchen in Sortenfarbe

### F-01 · Ein Bärchen freigestellt

**Hochladen:** `R-FORM-BÄRCHEN`
**Format:** square 1:1

```
Use the uploaded gummy bear photo as the single source of truth for the shape: the classic sitting gummy bear with round ears, arms at the sides and short legs, same proportions and the same soft matte surface. Do not change the shape.

Product photo of one single gummy bear in {GUMMIFARBE}, slightly translucent so light glows softly through the edges, matte surface without sugar coating. Pure white seamless background, soft diffused studio light, gentle shadow underneath, 100 mm macro lens look, photorealistic.

Avoid: a different bear shape, faces painted on, glossy plastic look, sugar crystals, several bears, text, watermark.
```

Ergebnis speichern als **`R-GUMMI-{SORTE}`**. Es ersetzt das Foto der echten Gummies, bis Muster da sind.

### F-02 · Alle vier Bärchen nebeneinander

**Hochladen:** `R-FORM-BÄRCHEN` (oder die vier Ergebnisse aus F-01)
**Format:** landscape 16:9

```
Use the uploaded gummy bear images as the single source of truth for shape and surface.

Four identical classic sitting gummy bears in a row on a pure white seamless background, from left to right: raspberry pink-red, blueberry blue, berry purple, mango yellow-orange. Same size, same matte slightly translucent surface, evenly spaced, soft studio light, gentle shadows, photorealistic.

Avoid: different shapes, faces, sugar crystals, text, watermark.
```

---

## Schritt 2: Die Dose mit Etikett

Mach beide Varianten und entscheide dann. **Variante A** ist realistisch für den Start (weiße Standarddose), **Variante B** nur, wenn ein Anbieter farbige Dosen anbietet.

### F-03 · Variante A: weiße Dose mit Etikett rundum

**Hochladen:** `R-DOSE-WEISS`, `R-DOSE-{SORTE}`
**Format:** vertical 4:5

```
Use the first uploaded image (white jar) as the single source of truth for the jar: the same white cylindrical 250 ml jar with the same smooth flat white screw lid, same proportions. Do not change the jar or lid shape or color.
Use the second uploaded image only as the design reference for the label: copy its colors, logo, typography, metallic wave pattern and icon.

Apply a full-wrap matte paper label around the jar body, from just below the lid to just above the bottom edge, so a thin strip of white jar stays visible above and below the label. Label design: background {FARBE}, a large white rounded "bärly" logo with a small ™, below it "{SORTE}" in bold {TIEFFARBE} capitals, below that "{KATEGORIE}", a thin line, "{NÄHRSTOFFE}", bottom left "60 Gummies" and "{GESCHMACK}", bottom right a {ICON} icon. Copy all text letter by letter, "bärly" with umlaut.

Premium supplement packshot, front view, camera at label height, 85 mm lens look. Soft diffused daylight from the left, realistic soft shadow, warm off-white seamless studio background.

Avoid: a coloured lid, a different jar shape, a glossy label, extra or misspelled letters, cartoon look, gummies, props, watermark.
```

### F-04 · Variante B: Dose und Deckel in Sortenfarbe

**Hochladen:** `R-DOSE-WEISS`, `R-DOSE-{SORTE}`
**Format:** vertical 4:5

```
Use the first uploaded image (white jar) as the single source of truth for the jar shape and the smooth flat screw lid: same cylindrical 250 ml shape and proportions.
Use the second uploaded image only as the design reference for colors, logo, typography, metallic waves and icon.

The jar body and the lid are both made of matte opaque plastic in {FARBE}, without the metallic waves on the lid. A full-wrap matte label in the same color sits seamlessly on the body: a large white rounded "bärly" logo with a small ™, below it "{SORTE}" in bold {TIEFFARBE} capitals, "{KATEGORIE}", a thin line, "{NÄHRSTOFFE}", bottom left "60 Gummies" and "{GESCHMACK}", bottom right a {ICON} icon, metallic waves on both sides of the label. Copy all text letter by letter, "bärly" with umlaut.

Premium supplement packshot, front view, camera at label height, 85 mm lens look. Soft diffused daylight from the left, realistic soft shadow, warm off-white seamless studio background.

Avoid: a ribbed lid, a different jar shape, white parts on the jar, extra or misspelled letters, cartoon look, gummies, props, watermark.
```

Das Ergebnis der gewählten Variante speichern als **`R-DOSE-NEU-{SORTE}`**.

---

## Schritt 3: Produkt komplett

### F-05 · Offene Dose mit Bärchen

**Hochladen:** `R-DOSE-NEU-{SORTE}`, `R-GUMMI-{SORTE}`
**Format:** vertical 4:5

```
Use the uploaded images as the single source of truth: the jar, lid and label exactly as in the jar image; the gummy bears exactly as in the gummy image (same shape, color, surface).

The {SORTE} jar stands open, the lid leans against its side. The jar is filled with gummy bears up to just below the rim, a few bears visible at the top. Two single gummy bears sit neatly in front of the jar. Soft daylight from the left, realistic shadows, background in the label's light color as a seamless studio backdrop. Premium, calm, adult.

Avoid: piles or spilled gummies, a different bear shape, changed label text, extra letters, candy-shop look, watermark.
```

### F-06 · Alle vier Dosen nebeneinander

**Hochladen:** alle vier `R-DOSE-NEU-<SORTE>`
**Format:** landscape 16:9

```
Use the uploaded jar images as the single source of truth for each jar, lid and label. Do not change any label.

The four bärly jars in a row on a warm off-white seamless studio background, from left to right GLOW, FLEX, SNOOZY, DAILY, all facing the camera, evenly spaced, same height. One matching gummy bear sits in front of each jar. Soft daylight from the left, realistic shadows, premium and calm.

Avoid: changed labels, misspelled text, extra products, props, watermark.
```

---

## Danach

1. Variante A oder B wählen und die besten Bilder pro Sorte als `R-DOSE-NEU-<SORTE>` und `R-GUMMI-<SORTE>` speichern.
2. Diese Bilder in die Ausschreibung und die Anfragen an die Anbieter einfügen („so soll es aussehen“).
3. Alle anderen Prompts in dieser Bibliothek mit `R-DOSE-NEU-<SORTE>` statt `R-DOSE-<SORTE>` verwenden.
4. Das echte Etikett zum Drucken wird separat in Canva oder Figma gebaut, nach der Vorlage des Anbieters. KI-Text auf Etiketten ist nie druckfertig, und die Rückseite mit den Pflichtangaben kommt nicht aus der KI.
