# Image Ads

Fertige Ad-Motive für Meta (Instagram, Facebook), TikTok und Pinterest. Jede Ad hat eine Headline auf Deutsch, die das Modell direkt ins Bild setzt. Du kannst jede Ad auch **ohne Text** erzeugen: ersetze dafür den Textabsatz durch `No text anywhere except the jar label. Leave clean empty space at the {top} for a headline.` und setz die Headline danach in Canva. Bei Ads, die mit Budget laufen, ist das der sicherere Weg (Schrift garantiert richtig, Packshot kannst du drüberlegen).

**Formate:** Jede Ad zweimal erzeugen, `vertical 4:5` für den Feed und `vertical 9:16` für Stories, Reels und TikTok. Bei 9:16 oben und unten je 15 % frei lassen (dort liegen Profilname und Buttons), das steht schon in den Prompts.

**Texte:** Nur Aussagen, die auch im Shop stehen. Die kleinen Zeilen unter den Headlines sind die zugelassenen Angaben aus `brand.js` im Wortlaut oder reine Fakten (Menge, Geschmack).

Die Platzhalter `{SORTE}` und `{HINTERGRUND}` stehen in [02-produktbilder.md](02-produktbilder.md) oben in der Tabelle.

## Übersicht

| ID | Sorte | Headline | Typ |
| --- | --- | --- | --- |
| A-01 | GLOW | Fürs Bad-Regal fast zu schön. | Produkt im Bad |
| A-02 | GLOW | Bin in 5 Minuten fertig. | Bär + Dose, Humor |
| A-03 | FLEX | Pulver klumpt. Shaker stinkt. | Vorher/Nachher-Split |
| A-04 | FLEX | 3 g Kreatin. Zwei Gummies. | Große Zahl |
| A-05 | SNOOZY | Um elf ins Bett. Um eins noch am Handy. | Problem-Szene |
| A-06 | SNOOZY | Handy weg. Zwei Gummies. Licht aus. | Abendritual |
| A-07 | DAILY | Fünf Dosen im Schrank? Eine reicht. | Vorher/Nachher |
| A-08 | DAILY | Ich hab da einen Plan. | Bär + Dose, Humor |
| A-09 | Crew | Vier Bären. Ein Tag. | Crew-Bundle |
| A-10 | Crew | Welcher Bär bist du? | Bären-Finder |
| A-11 | Abo | Die Dose bleibt. Der Nachfüller kommt per Brief. | Abo erklären |
| A-12 | alle | Notizen-App | Native-Format |
| A-13 | Crew | BLACK WEEK · Bald. | Teaser |
| A-14 | Crew | BLACK WEEK · Die ganze Crew | Angebot live |
| A-15 | Crew | Nur noch bis {DATUM}. | Letzte Chance |
| A-16 | GLOW | GLOW × {SKINCARE} | Koop |
| A-17 | alle | Was drin ist. | Infokarte |
| A-18 | alle | UGC-Foto mit Story-Text | Native-Format |

---

### A-01 · GLOW · Fürs Bad-Regal fast zu schön.

**Hochladen:** `R-DOSE-GLOW`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded jar photo as the single source of truth; reproduce the jar and its label exactly, letter by letter.

A bright, minimal bathroom shelf in morning light: the GLOW jar stands between a glass serum bottle, a perfume bottle and a small vase with one pink ranunculus. White marble, soft blush-pink tones, calm and aesthetic, editorial photography, photorealistic.

Add this exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: headline at the top "Fürs Bad-Regal fast zu schön." and below it, smaller: "Biotin · Zink · Vitamin C · Himbeere". Keep the top 15 % and bottom 15 % free of important elements. No other text.

Avoid: changed label, clutter, other brands' logos, watermark.
```

### A-02 · GLOW · Bin in 5 Minuten fertig.

**Hochladen:** `R-BÄR-GLOW`, `R-DOSE-GLOW`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the character and the jar; reproduce both exactly.

GLOW, a plush 3D teddy bear with bubblegum-pink fur, gold crown with pink gems and pink heart-shaped sunglasses, sits on a bathroom vanity in front of a mirror, surrounded by three tiny outfit options and a hairbrush, clearly not ready, winking at the camera. The GLOW jar stands sharp in the foreground, label readable. Photorealistic bathroom, the bear as a 30 cm plush figure with real shadows, warm morning light.

Add this exact German text in a bold rounded sans-serif, white with a soft shadow, perfectly spelled: at the top "Bin in 5 Minuten fertig." and at the bottom, small: "2 Gummies. Fertig." Keep the top 15 % and bottom 15 % free of the character's face. No other text.

Avoid: changed character or label, piles of gummies, watermark.
```

### A-03 · FLEX · Pulver klumpt. Shaker stinkt.

**Hochladen:** `R-DOSE-FLEX`, `R-GUMMI-FLEX`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the jar and the gummies; reproduce both exactly.

Split image, top and bottom halves. Top half, cool desaturated light: a messy gym-locker bench with an old plastic shaker bottle, white powder spilled around it, a clumpy scoop. Bottom half, bright clean ice-blue light: the FLEX jar on a clean gym bench next to a folded towel, two FLEX gummies lying in front of it. Photorealistic, premium.

Add this exact German text in a bold rounded sans-serif, perfectly spelled: on the top half in white "Pulver klumpt. Shaker stinkt." and on the bottom half in navy #1e4ed8 "3 g Kreatin. Zwei Gummies." No other text.

Avoid: brand names on the shaker, changed label, different gummy shape, watermark.
```

### A-04 · FLEX · 3 g Kreatin. Zwei Gummies.

**Hochladen:** `R-DOSE-FLEX`, `R-BÄR-FLEX`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the jar and the character; reproduce both exactly.

Bold typographic ad on a seamless ice-blue #d3e8ff background: a huge "3 g" in navy #1e4ed8 fills the upper half. Below it the FLEX jar, label readable, and next to it FLEX, the plush 3D blue muscular bear with black sports sunglasses, flexing one bicep. Soft studio light, realistic shadows.

Exact German text, bold rounded sans-serif, perfectly spelled: the big "3 g", under it "Kreatin pro Tagesportion.", at the bottom small: "Zwei Gummies. Kein Shaker. Blaubeere." No other text.

Avoid: changed label or character, watermark.
```

### A-05 · SNOOZY · Um elf ins Bett. Um eins noch am Handy.

**Hochladen:** `R-DOSE-SNOOZY`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded jar photo as the single source of truth; reproduce the jar and label exactly.

A dark bedroom at night seen from above the bed: an adult's hand holds a glowing phone, the screen light is the only bright spot, the bedside clock shows 01:07. On the bedside table, softly lit by a dim warm lamp, the SNOOZY jar, label readable. Cinematic, moody, lavender and deep violet tones, photorealistic.

Exact German text in a bold rounded sans-serif, white, perfectly spelled: at the top "Um elf ins Bett." and below "Um eins noch am Handy." At the bottom, small: "SNOOZY · 1 mg Melatonin · 30 Minuten vor dem Schlafen". Keep top and bottom 15 % free of important elements. No other text.

Avoid: readable phone content, app logos, changed label, watermark.
```

### A-06 · SNOOZY · Handy weg. Zwei Gummies. Licht aus.

**Hochladen:** `R-DOSE-SNOOZY`, `R-BÄR-SNOOZY`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the jar and the character; reproduce both exactly.

A cozy bedside table in warm lamp light: a cup of herbal tea, a phone lying face down, the SNOOZY jar. On the pillow behind it SNOOZY, the plush 3D lavender bear with violet starry nightcap, asleep hugging his pillow. Soft lavender evening tones, calm, photorealistic interior.

Exact German text in a bold rounded sans-serif, dark ink #1d1236 on a soft light area, perfectly spelled, three short lines at the top: "Handy weg." "Zwei Gummies." "Licht aus." At the bottom, small: "Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen." No other text.

Avoid: changed label or character, watermark.
```

Kleingedruckt bei Melatonin: die volle Angabe lautet „… Die positive Wirkung stellt sich ein, wenn kurz vor dem Schlafengehen 1 mg Melatonin aufgenommen wird.“ Den Satz in die Bildunterschrift des Posts schreiben.

### A-07 · DAILY · Fünf Dosen im Schrank? Eine reicht.

**Hochladen:** `R-DOSE-DAILY`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded jar photo as the single source of truth; reproduce the jar and label exactly.

Split image, left and right. Left, slightly grey and cluttered: an open kitchen cupboard with five different unbranded supplement bottles and blister packs, chaotic. Right, bright morning light: a tidy breakfast table with a coffee cup and only the DAILY jar, label readable. Photorealistic.

Exact German text in a bold rounded sans-serif, perfectly spelled: over the left side "Fünf Dosen im Schrank?", over the right side "Eine reicht." At the bottom, small: "12 Vitamine · 3 Mineralstoffe · Zitrone-Mango". No other text.

Avoid: real brand names on the left bottles, changed label, watermark.
```

### A-08 · DAILY · Ich hab da einen Plan.

**Hochladen:** `R-BÄR-DAILY`, `R-DOSE-DAILY`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the character and the jar; reproduce both exactly.

DAILY, the plush 3D golden-yellow bear in a cream hoodie with a black crossbody bag, stands proudly in front of a small whiteboard with a hand-drawn weekly plan (doodles of a crown, a dumbbell, a moon and a sun), holding a marker. The DAILY jar stands on the table in front, label readable. Sunny kitchen, photorealistic, the bear as a 30 cm plush figure.

Exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: at the top "Ich hab da einen Plan." At the bottom, small: "Zwei Gummies zum Frühstück." No other text, no readable words on the whiteboard.

Avoid: changed character (no cap), changed label, watermark.
```

### A-09 · Crew · Vier Bären. Ein Tag.

**Hochladen:** alle vier `R-DOSE-…` (bei Bedarf alle vier `R-BÄR-…` im zweiten Schritt)  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded jar photos as the single source of truth; reproduce all four labels exactly.

The four bärly jars in a row on a light wooden table in warm daylight, from left to right DAILY (yellow), GLOW (pink), FLEX (blue), SNOOZY (lavender), labels readable. Above each jar a small soft time label area. Premium product photography, warm off-white background.

Exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: headline at the top "Vier Bären. Ein Tag." Above the jars, small: "Frühstück", "Morgens", "Vor dem Training", "Vor dem Schlafen". At the bottom: "Die ganze Crew · {PREIS}". No other text.

Avoid: changed labels, mixed-up order, watermark.
```

`{PREIS}`: Einmalkauf 89,90 €, im Abo 71,92 € (Stand `brand.js`).

### A-10 · Crew · Welcher Bär bist du?

Führt zum Bären-Finder auf der Startseite.

**Hochladen:** alle vier `R-BÄR-…`  
**Format:** square 1:1 und vertical 9:16

```
Use the uploaded character images as the single source of truth; reproduce every bear exactly.

A 2x2 grid of the four bärly bears, each on its own pastel background: DAILY on butter yellow, GLOW on blush rose, FLEX on ice blue, SNOOZY on soft lavender. Each bear in a characteristic pose (DAILY waving with tablet, GLOW winking, FLEX flexing, SNOOZY hugging his pillow). Soft plush 3D render, Pixar-like quality.

In the center, over the grid, a cream rounded badge with this exact German text in bold rounded sans-serif, dark ink #1d1236, perfectly spelled: "Welcher Bär bist du?" Under each bear, small: "DAILY", "GLOW", "FLEX", "SNOOZY". No other text.

Avoid: changed characters, watermark.
```

### A-11 · Abo · Die Dose bleibt. Der Nachfüller kommt per Brief.

**Hochladen:** `R-DOSE-{SORTE}` (+ `R-NACHFÜLLER`, wenn vorhanden)  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the jar{ and refill pouch}.

A letterbox in a bright apartment hallway with a kraft paper envelope sticking out; next to it on a small sideboard the {SORTE} jar, label readable, and a flat matte refill pouch with a white "bärly" logo. Morning light, calm, tidy, photorealistic.

Exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: at the top "Die Dose bleibt." and below "Der Nachfüller kommt per Brief." At the bottom, small: "Im Abo 20 % günstiger · jederzeit pausieren". No other text.

Avoid: readable address labels, changed jar label, watermark.
```

### A-12 · Notizen-App (alle Sorten)

Sieht aus wie ein Screenshot aus der iPhone-Notizen-App. Funktioniert gut, weil es nicht nach Werbung aussieht. Text pro Sorte unten.

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 9:16

```
Use the uploaded jar photo as the single source of truth for the jar.

A realistic smartphone screenshot of a minimal notes app in light mode: cream-white background, a bold title and a short list in the app's default font, no app logos. At the bottom of the note an embedded photo of the {SORTE} jar on a {HINTERGRUND} surface, label readable.

Exact German text, perfectly spelled, as the note content:
{NOTIZ}
No other text.

Avoid: brand logos of phone makers, status-bar notifications with names, changed label, watermark.
```

`{NOTIZ}` je Sorte:

- **FLEX:** `Titel: "Dinge, die ich nicht mehr mache"` · `– Kreatin-Pulver abmessen` · `– Shaker in der Tasche vergessen` · `– Pulver auf dem Boden` · `Jetzt: 2 Gummies, 3 g Kreatin.`
- **GLOW:** `Titel: "Morgenroutine"` · `1. Serum` · `2. SPF` · `3. Zwei GLOW Gummies` · `4. Parfum` · `fertig.`
- **SNOOZY:** `Titel: "Abendroutine (ehrlich)"` · `22:00 Tee` · `22:15 Zwei SNOOZY` · `22:30 Handy weg` · `22:31 Handy wieder da` · `22:45 Handy wirklich weg`
- **DAILY:** `Titel: "Einkaufsliste"` · `– Hafermilch` · `– Kaffee` · `– Brot` · `– fünf Vitamin-Dosen (durchgestrichen)` · `– DAILY (eine reicht)`

### A-13 · Black Week Teaser · Bald.

Läuft ab Teaser-Start (9.11.) bis zum Start der Aktion.

**Hochladen:** alle vier `R-BÄR-…`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded character images as the single source of truth; reproduce every bear exactly.

Deep black background with a soft warm gold glow in the center. The four bärly bears peek in from the edges of the frame, only their heads and paws visible: GLOW from the top left with her crown, FLEX from the right with his sports sunglasses, SNOOZY from the bottom with his nightcap, DAILY from the top right waving. A few out-of-focus gold confetti pieces. Plush 3D render, premium, mysterious, playful.

Exact German text in a bold rounded sans-serif, perfectly spelled, centered: in gold "BLACK WEEK", below in white, smaller: "Bald. Die ganze Crew zum besten Preis des Jahres." At the bottom, small white: "Ab {STARTDATUM}". No other text.

Avoid: changed characters, red sale signs, watermark.
```

### A-14 · Black Week live · Die ganze Crew

**Hochladen:** `R-BOX` oder alle vier `R-DOSE-…`, optional alle vier `R-BÄR-…` (zweiter Schritt)  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the box and the jars; reproduce every label exactly.

The cream bärly crew box open on a glossy black surface, the four jars inside (DAILY yellow, GLOW pink, FLEX blue, SNOOZY lavender), labels readable. Deep black background with a warm gold glow behind the box, a few out-of-focus gold confetti pieces. Luxurious, adult, premium.

Exact German text in a bold rounded sans-serif, perfectly spelled: at the top in gold "BLACK WEEK", below in white "Die ganze Crew". In the lower third a cream rounded price badge: "{PREIS_AKTION}" large in dark ink, and next to it, smaller and struck through: "{PREIS_STATT}". At the bottom, small white: "{ZUSATZ}". No other text.

Avoid: changed labels, cheap sale look, watermark.
```

Platzhalter (Stand `BLACK_FRIDAY` im Crew-Bundle-Thread): `{PREIS_AKTION}` = `59,90 €`, `{PREIS_STATT}` = `71,92 €`, `{ZUSATZ}` = `Erste Lieferung im Abo · bis 30.11.` Wenn sich Preis oder Zeitraum ändern, hier anpassen.

### A-15 · Black Week · Letzte Chance

**Hochladen:** alle vier `R-BÄR-…`, `R-DOSE-SNOOZY`  
**Format:** vertical 9:16

```
Use the uploaded images as the single source of truth for the characters and the jar; reproduce them exactly.

Humorous scene on a deep black background with a gold glow: SNOOZY, the lavender bear with nightcap, has just woken up and looks shocked at a big gold alarm clock, while GLOW, FLEX and DAILY stand behind him pointing at the clock. Plush 3D render, cinematic light.

Exact German text in a bold rounded sans-serif, perfectly spelled: at the top in white "SNOOZY hat fast verschlafen.", in the middle in gold "Nur noch bis {DATUM}.", at the bottom small white "Black Week · Die ganze Crew". Keep top and bottom 15 % free of faces. No other text.

Avoid: changed characters, watermark.
```

### A-16 · GLOW × Skincare (Koop)

Für das Koop-Set mit der Skincare-Marke. Produkt, Name und Preis kommen aus dem Skincare-Thread.

**Hochladen:** `R-DOSE-GLOW`, `R-SKINCARE`, optional `R-BÄR-GLOW`  
**Format:** vertical 4:5 und 9:16

```
Use the uploaded images as the single source of truth for the GLOW jar and the skincare product; reproduce both and their labels exactly.

Premium beauty still life on a blush rose #fad4dd stone surface with soft morning light: the GLOW jar on the left, the skincare product on the right, between them a few drops of serum texture and a single pink ranunculus. Editorial, calm, high-end skincare aesthetic.

Exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: at the top "GLOW × {SKINCARE_MARKE}", below it smaller "Von innen und von außen." At the bottom, small: "{SET_NAME} · {PREIS}". No other text.

Avoid: changed labels, clutter, watermark.
```

### A-17 · Was drin ist (Infokarte)

Für Karussell-Slide 2 oder als eigene Ad. Zeigt die Dose und die Werte pro Tagesportion.

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 4:5

```
Use the uploaded jar photo as the single source of truth; reproduce the jar and label exactly.

Clean infographic layout on a seamless {HINTERGRUND} background: the {SORTE} jar on the right half, label readable. On the left half three cream rounded info cards stacked vertically, each with a big number and a small word.

Exact German text in a bold rounded sans-serif, dark ink #1d1236, perfectly spelled: headline at the top "Was drin ist." Cards: {KARTEN}. At the bottom, small: "pro Tagesportion (2 Gummies)". No other text.

Avoid: changed label, extra numbers, watermark.
```

`{KARTEN}` je Sorte (aus `brand.js`, Feld `facts`):

- **GLOW:** `"450 µg" / "Biotin"`, `"5 mg" / "Zink"`, `"80 mg" / "Vitamin C"`
- **FLEX:** `"3 g" / "Kreatin"`, `"0,7 mg" / "Vitamin B6"`, `"2,5 µg" / "Vitamin B12"`
- **SNOOZY:** `"1 mg" / "Melatonin"`, `"57 mg" / "Magnesium"`, `"1,4 mg" / "Vitamin B6"`
- **DAILY:** `"12" / "Vitamine"`, `"3" / "Mineralstoffe"`, `"10 µg" / "Vitamin D3"`

Werte vor dem Posten mit der finalen Rezeptur vom Supplier abgleichen.

### A-18 · UGC-Foto mit Story-Text

Sieht aus wie ein echtes Foto aus dem Alltag, mit Text im Stil einer Instagram-Story. Für Spark Ads und Stories. Mit Avatar statt Hand: `AV-10` in [05-avatare.md](05-avatare.md).

**Hochladen:** `R-DOSE-{SORTE}`  
**Format:** vertical 9:16

```
Use the uploaded jar photo as the single source of truth; reproduce the jar and label exactly.

Shot on a recent iPhone, handheld, natural light: {ORT} with an adult's hand holding the {SORTE} jar towards the camera, label readable, the background slightly out of focus. Authentic, casual, real skin texture, looks like a genuine story.

Add this exact German text in the style of an Instagram story caption, white text on a semi-transparent black rounded box, perfectly spelled, in the upper third: "{STORYTEXT}". No other text.

Avoid: studio look, changed label, watermark.
```

Vorschläge für `{ORT}` / `{STORYTEXT}`:

- GLOW: `a car's driver seat in the morning` / `Mein einziger Schritt, den ich nie vergesse`
- FLEX: `a gym locker room` / `Seit ich keinen Shaker mehr mitschleppe`
- SNOOZY: `a bed with a dim lamp` / `Mein neues Abendritual`
- DAILY: `an office desk with a laptop` / `Das hier steht jetzt neben meinem Kaffee`
