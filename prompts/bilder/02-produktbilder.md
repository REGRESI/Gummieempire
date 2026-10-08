# Produktbilder

Packshots, Gummies, Lifestyle und Bundle-Bilder. Die Prompts gelten für alle vier Sorten: ersetze `{SORTE}` und, wo es vorkommt, `{HINTERGRUND}`, `{GESCHMACK}` und `{FRUCHT}` aus der Tabelle.

| `{SORTE}` | `{HINTERGRUND}` | `{GESCHMACK}` | `{FRUCHT}` (Deko) |
| --- | --- | --- | --- |
| GLOW | blush rose #fad4dd | Himbeere | fresh raspberries |
| FLEX | ice blue #d3e8ff | Blaubeere | fresh blueberries |
| SNOOZY | soft lavender #dccef4 | Waldbeere | mixed forest berries (blackberries, blueberries, red currants) |
| DAILY | butter yellow #fbe7b5 | Zitrone-Mango | a lemon half and mango slices |

**Immer mit hochladen:** `R-DOSE-{SORTE}`. Sobald Gummies im Bild sind, zusätzlich `R-GUMMI-{SORTE}` (dein Foto). Ohne Gummi-Foto: Prompts mit Gummies erst machen, wenn das Sample da ist, sonst erfindet das Modell eine Form.

---

### P-01 · Packshot 3/4-Ansicht

Die Dose leicht gedreht, für Galerie, Ads und Marktplätze. Füllt die fehlende Ansicht `3q-front` aus dem Asset-Manifest.

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded jar photo as the single source of truth. Reproduce the jar, lid, label, logo and colors exactly; copy the label text letter by letter ("bärly" with umlaut).

Premium supplement packshot: the {SORTE} jar rotated about 25 degrees to the right so the label curves away slightly and the metallic wave pattern on the side catches the light. Camera at label height, 85 mm lens look.
Soft diffused daylight from the left, a gentle highlight on the lid ribs, realistic soft shadow on the floor.
Background: the same warm off-white seamless studio backdrop as in the reference.

Avoid: changed label text, extra or missing letters, different jar shape, cartoon look, props, gummies, text outside the label, watermark.
```

### P-02 · Packshot Seite und Rückseite

Für die Galerie (Ansichten `side` und `back`). Die Rückseite mit Nährwerttabelle erzeugt das Modell nicht korrekt, deshalb nur eine neutrale Etikettrückseite: echte Pflichtangaben kommen vom Supplier-Etikett.

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded jar photo as the single source of truth for jar shape, lid, colors and label design.

Two packshots of the {SORTE} jar side by side on the same warm off-white studio backdrop: left, a pure side view showing the metallic wave pattern of the label; right, the back of the jar with the label's back panel showing only small, blurred, unreadable fine print blocks in the label's dark accent color. Same lighting for both, soft shadows.

Avoid: readable invented text on the back, changed colors, cartoon look, gummies, watermark.
```

### P-03 · Offene Dose von oben

Deckel daneben, Blick in die Dose. Zeigt, wie die Gummies aussehen, ohne Snack-Optik.

**Hochladen:** `R-DOSE-{SORTE}`, `R-GUMMI-{SORTE}`  
**Format:** square 1:1

```
Use the uploaded images as the single source of truth: the jar and lid exactly as in the jar photo, the gummies exactly as in the gummy photo (same shape, size, color, surface).

Top-down flat lay: the open {SORTE} jar seen from directly above, filled with gummies to the usual fill level, the lid lying upside down next to it showing its ribbed edge. Two single gummies lie neatly on the surface between jar and lid.
Surface: matte {HINTERGRUND} paper. Soft daylight from the top left, gentle shadows. Premium, calm, minimal.

Avoid: gummies spilling or piled outside the jar, a different gummy shape, changed jar color, text other than the label, watermark.
```

### P-04 · Gummies in Nahaufnahme (Makro)

Für Detailbilder in der Galerie und Ads („So sehen sie aus“).

**Hochladen:** `R-GUMMI-{SORTE}` (+ `R-DOSE-{SORTE}` für den Hintergrund)  
**Format:** vertical 4:5

```
Use the uploaded gummy photo as the single source of truth for shape, size, color, surface texture and translucency. Do not change the gummy design.

Macro product shot: two {SORTE} gummies in sharp focus in the foreground on a smooth {HINTERGRUND} surface, light passing slightly through them to show their texture. In the soft-focus background the {SORTE} jar from the jar reference. A small amount of {FRUCHT} as subtle flavor props at the side.
100 mm macro lens look, soft side light, shallow depth of field, premium, appetizing but calm.

Avoid: more than three gummies in focus, piles, sugar dust everywhere, a different gummy shape, oversaturated candy look, watermark.
```

### P-05 · Tagesportion in der Hand

Zwei Gummies in der offenen Hand, Dose im Hintergrund. Zeigt die Dosis, wirkt persönlich.

**Hochladen:** `R-GUMMI-{SORTE}`, `R-DOSE-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded images as the single source of truth for the gummies and the jar.

Close-up of an adult's open palm (natural, well-kept hand, neutral skin, short clean nails) holding exactly two {SORTE} gummies. The {SORTE} jar stands slightly out of focus in the background, label readable. Soft daylight, {HINTERGRUND} background, minimal, premium.

Avoid: more than two gummies in the hand, child hands, jewelry overload, different gummy shape, changed label, watermark.
```

### P-06 · Geschmack und Zutaten (Flatlay)

Dose mit den Geschmacksfrüchten. Für Geschmacks-Posts und Produktseite.

**Hochladen:** `R-DOSE-{SORTE}`, `R-GUMMI-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded images as the single source of truth for the jar and the gummies.

Flat lay from 45 degrees above: the {SORTE} jar standing upright in the center, around it a loose, airy arrangement of {FRUCHT} and three {SORTE} gummies, plenty of empty space. Surface: {HINTERGRUND} stone texture. Soft daylight, gentle shadows, fresh and premium.

Avoid: piles, candy-shop look, more than four gummies, changed label, watermark.
```

### P-07 · Lifestyle-Foto für die Website

Die vier Motive aus `assets/ASSETS.md` (Slot „Ein Tag mit der Crew“). Nur die echte Dose, kein Bär. Nach deiner Freigabe als `assets/lifestyle/{sorte}.webp` in 1600 × 2000 ablegen und die Sorte in `brand.js` unter `LIFESTYLE_READY` eintragen.

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded jar photo as the single source of truth. Reproduce jar, lid, label and logo exactly; copy the label text letter by letter.

{SZENE}

The jar is the clear hero, label facing the camera and readable, placed on the right third. Natural lifestyle photography, real interior, soft natural light, muted pastel tones, uncluttered, calm and adult, editorial magazine quality, shallow depth of field, photorealistic. No people, no text.

Avoid: changed label, cartoon elements, characters, piles of gummies, cluttered styling, watermark.
```

`{SZENE}` je Sorte:

- **GLOW:** `A bright bathroom vanity in the morning: white marble counter, a round mirror, a glass serum dropper bottle and a perfume bottle, a small vase with one pink ranunculus, warm sunlight from a window on the left. The GLOW jar stands between the serum and the perfume.`
- **FLEX:** `A modern gym in morning light: the FLEX jar stands on a wooden bench next to a folded towel and a black gym bag, a rack of dumbbells softly out of focus in the background, a water bottle.`
- **SNOOZY:** `A bedside table at night: a warm small lamp, a cup of herbal tea, a closed book, a phone lying face down. The SNOOZY jar stands in the lamp light, the soft bed with linen sheets in the background.`
- **DAILY:** `A sunny breakfast table: a cup of coffee, a paper weekly planner with a pen, a plate with toast and fruit. The DAILY jar stands next to the coffee in morning sunlight.`

### P-08 · Dose mit Bär (3D-Komposition)

Dose und Bär zusammen, wie die Galerie „Dose mit Bär“, aber als ein Bild. Für Ads und Social.

**Hochladen:** `R-DOSE-{SORTE}`, `R-BÄR-{SORTE}`  
**Format:** square 1:1 oder vertical 4:5

Fertige Prompts dafür stehen in [01-charaktere.md](01-charaktere.md) unter `C-{SORTE}-03` (Studio) und `C-{SORTE}-04` (Alltagsszene).

### P-09 · Shelfie (alle vier im Regal)

Die vier Dosen im Badregal. Für GLOW-Content („hübsche Dose fürs Bad-Regal“) und Crew-Posts.

**Hochladen:** `R-DOSE-GLOW`, `R-DOSE-FLEX`, `R-DOSE-SNOOZY`, `R-DOSE-DAILY`  
**Format:** vertical 4:5

```
Use the uploaded jar photos as the single source of truth for all four jars. Reproduce each label exactly.

A floating light-oak bathroom shelf against a warm white wall: the four bärly jars stand in a row (DAILY yellow, GLOW pink, FLEX blue, SNOOZY lavender), labels facing forward, between a few tasteful skincare bottles, a small candle and a trailing plant. Morning light, soft shadows, shot straight on at shelf height. Calm, aesthetic, real home.

Avoid: changed labels, mixed-up colors, other supplement brands, clutter, text, watermark.
```

### P-10 · Bundle-Bild „Die ganze Crew“

Für die Produktseite des Crew-Bundles (gibt es noch nicht). Zuerst nur Dosen, für die zweite Galerie-Ansicht mit Bären nimm `C-CREW-02`. Sobald es die Box gibt, ersetzt `B-02` das Hauptbild.

**Hochladen:** alle vier `R-DOSE-…`  
**Format:** vertical 4:5 (Galerie) und square 1:1 (Shop-Kachel)

```
Use the uploaded jar photos as the single source of truth for all four jars. Reproduce each label exactly, letter by letter.

Premium bundle packshot: the four bärly jars grouped on the same warm off-white studio backdrop as the reference photos, two in front (GLOW pink, SNOOZY lavender) and two slightly behind and between them (DAILY yellow, FLEX blue), all labels facing the camera and readable. Four small cream character cards lean against the jars, blank. Soft diffused light from the left, realistic shadows.

Avoid: changed labels, overlapping labels that hide the product name, gummies, text outside the labels, watermark.
```

### P-11 · Bundle-Bild „Morgen & Abend“

GLOW und SNOOZY als Set.

**Hochladen:** `R-DOSE-GLOW`, `R-DOSE-SNOOZY`  
**Format:** vertical 4:5

```
Use the uploaded jar photos as the single source of truth for both jars. Reproduce each label exactly.

Two jars side by side on a warm off-white studio backdrop: the GLOW jar on the left in soft morning light with a faint warm sun glow behind it, the SNOOZY jar on the right with cooler evening light and a faint lavender glow. Labels readable, soft shadows, premium and calm.

Avoid: changed labels, gummies, text outside the labels, watermark.
```

### P-12 · Nachfüller per Brief

Nachfüllbeutel im Briefumschlag, Dose daneben. Für Abo-Erklärung. Ohne `R-NACHFÜLLER` entsteht ein Konzeptbild: als „so könnte es aussehen“ nutzen, bis der echte Beutel da ist.

**Hochladen:** `R-DOSE-{SORTE}`, `R-NACHFÜLLER` (wenn vorhanden)  
**Format:** vertical 4:5

```
Use the uploaded images as the single source of truth for the jar{ and the refill pouch}.

On a light wooden table next to a letterbox-sized kraft paper envelope that has just been opened: a flat matte {HINTERGRUND} refill pouch with a white "bärly" logo and "{SORTE} Nachfüller" in small text slides out of the envelope. Next to it stands the {SORTE} jar with its lid off, ready to be refilled. Morning light, calm, tidy, premium.

Avoid: changed jar label, plastic clutter, piles of gummies, watermark.
```
