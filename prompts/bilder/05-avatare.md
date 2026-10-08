# KI-Avatare mit Produkt

Die vier Avatare sind dieselben wie in den Video-Skripten: **Lina** (GLOW), **Kian** (FLEX), **Mila** (SNOOZY) und **Jule** (DAILY). Wer sie sind, wie sie reden, Higgsfield-Merkmale, Stimmen und Account-Ideen stehen in `ki-content/01-avatare.md` auf dem Branch `claude/ki-influencer-skripte-g70x6l`. Die Personen-Bausteine unten sind die Charakter-Prompts von dort, wörtlich übernommen. Wenn sich dort etwas ändert, hier mit anpassen.

**Avatar mit Dose (je 5 Feed-Fotos pro Avatar):** stehen schon in `ki-content/04-bild-prompts.md`, Teil A (`L-1` bis `L-5`, `K-…`, `M-…`, `J-…`). Hier gibt es nur, was dort fehlt: Gesicht festlegen ohne Higgsfield, Profilbild, Startbild für Videos, Unboxing, Duo-Bilder, Avatar mit Bär, Black Week und Alltagsposts ohne Produkt.

## So bleibt das Gesicht gleich

1. **In Higgsfield (empfohlen):** Character Sheet über AI Influencer bauen, wie in `ki-content/01-avatare.md` beschrieben. Das Sheet ist ab dann `R-AVATAR-<NAME>`.
2. **Nur mit ChatGPT:** einmal `AV-00` laufen lassen, bis dir das Gesicht gefällt, und das Bild als `R-AVATAR-<NAME>` speichern.
3. Bei jedem weiteren Bild `R-AVATAR-<NAME>` als erstes Bild hochladen, danach die Dose.
4. Die Personenbeschreibung nicht ändern, nur Szene und Outfit.

## Personen-Bausteine

```
[LINA]
Lina, 26-year-old German woman, long chestnut hair with soft face-framing layers, light skin with natural freckles across nose and cheeks, dimples when she smiles, hazel almond eyes, glowing dewy skin with minimal makeup, small gold hoop earrings and a thin gold necklace. Warm, playful, slightly extra energy.
```

```
[KIAN]
Kian, 24-year-old German man with Middle Eastern roots, athletic build (fit, not bodybuilder), short dark brown hair with a clean fade, light stubble, thick eyebrows with one small brow slit, warm brown eyes, olive skin. Confident, self-ironic, slightly over-motivated energy.
```

```
[MILA]
Mila, 33-year-old German woman, chin-length dirty blonde bob, fair skin, calm blue hooded eyes, small beauty mark near her lip, thin round glasses she wears in the evening. Calm, dry-humoured, cosy energy.
```

```
[JULE]
Jule, 31-year-old German woman with mixed heritage, dark brown hair in two neat braids or a high bun, warm tan skin, round brown eyes, high cheekbones, dimples, small silver studs. Positive, organised, slightly nerdy energy.
```

```
[FOTO-UGC]
Shot on a recent iPhone, natural light, realistic skin texture with pores and fine details, no beauty filter, no studio lighting, authentic social-media look, slightly imperfect framing.
```

Typische Orte und Outfits (aus den Charakter-Prompts):

| Avatar | Ort | Outfit |
| --- | --- | --- |
| Lina | helles Marmorbad mit rundem Spiegel und Ringlicht | oversized cream knit, pink satin pyjama set, white bathrobe, pink claw clip |
| Kian | modernes Gym mit dunklem Boden und blauem Licht, Umkleide, Auto vor dem Gym | royal blue oversized gym tee, black shorts, black hoodie, headphones around the neck |
| Mila | gemütliches Schlafzimmer mit warmer Lampe, Kerze, Tee | lilac oversized hoodie, grey knit cardigan, lavender silk sleep set |
| Jule | helle skandinavische Küche mit Frühstückstisch und Planer | cream hoodie, mustard yellow cardigan, black crossbody bag |

---

## AV-00 · Gesicht festlegen (nur ohne Higgsfield)

Einmal pro Avatar. Ergebnis wird `R-AVATAR-<NAME>`.

**Hochladen:** nichts  
**Format:** horizontal 3:2

```
Character reference sheet of one photorealistic person, three views side by side on a plain light grey background, identical lighting: 1) front head-and-shoulders portrait, neutral friendly expression, 2) three-quarter portrait smiling, 3) full-body standing, relaxed pose.

{PERSON: [LINA], [KIAN], [MILA] oder [JULE] einsetzen}

Outfit: {OUTFIT aus der Tabelle oben}.
Soft even studio light, realistic skin texture, natural proportions, photorealistic, 50 mm lens look. No text, no logos.

Avoid: plastic skin, beauty filter, distorted hands, different faces between the views, watermark.
```

## AV-01 · Profilbild für den Account

**Hochladen:** `R-AVATAR-<NAME>`  
**Format:** square 1:1

```
Use the uploaded image as the identity reference: the same person, same face, same hair.

{PERSON} Head-and-shoulders portrait for a social media profile picture, face centered with space around it (the image will be cropped to a circle), soft natural daylight, a plain background in {FARBE: Lina blush rose, Kian ice blue, Mila soft lavender, Jule butter yellow}, friendly authentic smile.
[FOTO-UGC]

Avoid: changed face, text, logos, watermark.
```

## AV-02 · Startbild für ein Talking-Head-Video

Erstes Bild eines Videos, in dem der Avatar in die Kamera spricht. In Seedance oder Higgsfield als Start-Frame nutzen, das Skript kommt aus `ki-content/02-skripte/`.

**Hochladen:** `R-AVATAR-<NAME>`, `R-DOSE-<SORTE>`  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar and its label.

{PERSON} looking directly into the camera with a natural, mid-sentence expression (mouth slightly open, as if starting to talk), holding the {SORTE} jar at chest height in one hand, label facing the camera and readable. Framed from mid-torso up, eyes in the upper third of the image. Location: {ORT aus der Tabelle oben}. Outfit: {OUTFIT aus der Tabelle oben}.
Front-facing phone camera look, natural light, realistic skin.
[FOTO-UGC]

Avoid: changed face, hand covering the label, extra fingers, watermark.
```

## AV-03 · Unboxing der Crew-Box

**Hochladen:** `R-AVATAR-<NAME>`, `R-BOX` (oder Ergebnis aus `B-02`), alle vier `R-DOSE-…` (wenn das Limit es zulässt)  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference. Use the other images as the single source of truth for the box and the jars.

{PERSON} sits cross-legged on a bed and has just opened the cream bärly crew box on their lap: the four jars (yellow, pink, blue, lavender) in their insert, character cards on top. Excited, genuine smile, looking down into the box. Morning light, cozy bedroom.
[FOTO-UGC]

Avoid: changed face, changed labels, watermark.
```

## AV-04 · Duo-Bilder

Die Paare aus den Crossover-Skripten: Lina und Mila sind Freundinnen (Set „Morgen & Abend“), Kian ist Jules Bruder (Crew-Bundle).

**Hochladen:** beide `R-AVATAR-…`, dazu die Dosen  
**Format:** vertical 4:5 und 9:16

**Lina + Mila, Morgen & Abend** (`R-AVATAR-LINA`, `R-AVATAR-MILA`, `R-DOSE-GLOW`, `R-DOSE-SNOOZY`):

```
Use the first two uploaded images as identity references for the two people. Use the other images as the single source of truth for the jars.

[LINA] [MILA] Lina and Mila on a sofa in the evening, wrapped in one big blanket, laughing. Lina holds up the GLOW jar, Mila the SNOOZY jar, both labels facing the camera and readable. Herbal tea and a candle on the side table, warm lamp light, blush and lavender tones.
[FOTO-UGC]

Avoid: changed faces, changed labels, piles of gummies, watermark.
```

**Kian + Jule, die ganze Crew** (`R-AVATAR-KIAN`, `R-AVATAR-JULE`, alle vier `R-DOSE-…` oder `R-BOX`):

```
Use the first two uploaded images as identity references for the two people. Use the other images as the single source of truth for the jars.

[KIAN] [JULE] Siblings Kian and Jule in Jule's bright kitchen on a weekday morning: Jule holds her paper planner and points at it, Kian in his gym hoodie grabs the FLEX jar and rolls his eyes, grinning. On the wooden table the other three bärly jars (DAILY yellow, GLOW pink, SNOOZY lavender) and two coffee cups, labels readable. Sunny, real lived-in kitchen.
[FOTO-UGC]

Avoid: changed faces, changed labels, piles of gummies, watermark.
```

## AV-05 · Avatar mit Bär als Figur

Der Avatar mit seinem Bären als kleiner Plüschfigur. Verbindet die Avatar-Accounts mit den Brand-Accounts.

**Hochladen:** `R-AVATAR-<NAME>`, `R-BÄR-<SORTE>`, `R-DOSE-<SORTE>`  
**Format:** vertical 4:5

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the plush character and the third for the jar.

{PERSON} at {ORT aus der Tabelle oben}, smiling at the camera. On the table next to them the {SORTE} jar, label readable, and leaning against it the {SORTE} bear as a 25 cm plush figure exactly like the character reference, with correct contact shadow and matching light.
[FOTO-UGC]

Avoid: changed face, changed character colors or accessories, cartoon person, watermark.
```

## AV-06 · Black Week mit der Crew-Box

**Hochladen:** `R-AVATAR-<NAME>`, `R-BOX` (oder Ergebnis aus `B-07`)  
**Format:** vertical 9:16 und 4:5

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the box.

{PERSON} holds the bärly crew box with the black-and-gold Black Week sleeve towards the camera, excited expression. Background: a dim living room in the evening with warm string lights and a gold glow. Premium, festive, adult.
[FOTO-UGC]

Avoid: changed face, misspelled text on the sleeve, red sale signs, watermark.
```

## AV-07 · Alltagsposts ohne Produkt

Ein frischer Account wirkt echter, wenn nicht jeder Post Werbung ist. Etwa jeder dritte Post mit Produkt, der Rest so. In Higgsfield dafür Soul 2.0 mit der Soul-ID des Avatars nehmen.

**Hochladen:** `R-AVATAR-<NAME>`  
**Format:** vertical 4:5

```
Use the uploaded image as the identity reference: the same person, same face, same hair.

{PERSON} {SZENE}.
[FOTO-UGC]

Avoid: changed face, logos, readable signs with real brand names, watermark.
```

`{SZENE}`-Ideen:

- **Lina (Köln):** `having an iced matcha at a sunny café table` · `trying on a blazer in a bright bedroom mirror` · `walking along the Rhine promenade at golden hour with a tote bag`
- **Kian:** `stretching outdoors at sunrise in a park` · `meal-prepping chicken and rice in a small kitchen` · `sitting in his car in the gym parking lot with headphones on`
- **Mila (Hamburg):** `reading on a windowsill while it rains outside` · `lighting a candle in a cozy living room` · `working late on a laptop in a calm home office, tired but smiling`
- **Jule (Leipzig):** `writing in a paper planner with sticky notes at a café` · `arranging meal-prep boxes in the fridge on a Sunday` · `cycling through a leafy city street with a basket`
