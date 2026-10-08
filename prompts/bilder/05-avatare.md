# KI-Avatare mit Produkt

Fotorealistische Avatare, die mit den bärly-Dosen posieren. Die fünf Personen sind die Zielgruppen aus dem Content-Plan (`content.html`, „Avatare ↔ Bären“): Lea für GLOW, Tim für FLEX, Sarah für SNOOZY, Mara und Jonas für DAILY. So passt jeder Avatar zu seiner Sorte und seinen Hooks.

Die Video-Skripte für die Avatare kommen aus dem Thread „KI-Influencer und Video-Skripte“. Die Bilder hier sind die Grundlage dafür: Gesicht festlegen, Profilbild, Feed-Posts und Startbilder für Videos.

## So bleibt das Gesicht gleich

1. **Einmal pro Avatar** `AV-00-<NAME>` laufen lassen, bis dir ein Gesicht gefällt. Dieses Bild als `R-AVATAR-<NAME>` speichern (z. B. `lea.png`), es ist ab jetzt die Referenz.
2. Bei **jedem** weiteren Bild `R-AVATAR-<NAME>` als erstes Bild hochladen, dann die Dose.
3. Die Personenbeschreibung im Prompt nicht ändern, nur Szene und Outfit.
4. In Higgsfield: das Bild aus Schritt 1 als Character-Referenz nutzen (Soul ID oder AI Influencer), dann bleiben Bilder und Videos konsistent.

## Die fünf Avatare

| Name | Sorte | Kurzbeschreibung (steckt schon in den Prompts) |
| --- | --- | --- |
| Lea, 26 | GLOW | Marketing, Skincare-Fan, warmer Clean-Girl-Look |
| Tim, 24 | FLEX | Gym 4× pro Woche, sportlich, locker, selbstironisch |
| Sarah, 33 | SNOOZY | Job mit Verantwortung, liebt Abendrituale |
| Mara, 34 | DAILY | Organisiert, Planer, Meal-Prep |
| Jonas, 36 | DAILY | Maras Partner, entspannt, Kaffee-Typ |

Personen-Bausteine zum Kopieren:

```
[LEA]
Lea, a 26-year-old woman from Germany: light olive skin with a few freckles across the nose, warm brown eyes, long dark-brown hair with soft waves usually in a sleek low bun or loose, natural thick eyebrows, minimal "clean girl" makeup with glossy lips, small gold hoop earrings, slim build, friendly confident expression.
```

```
[TIM]
Tim, a 24-year-old man from Germany: fair skin, short light-brown hair with a slightly longer textured top, short trimmed stubble, blue-grey eyes, athletic muscular build (fit, not a bodybuilder), a small scar on the left eyebrow, easygoing grin.
```

```
[SARAH]
Sarah, a 33-year-old woman from Germany: medium-brown skin, shoulder-length curly black hair often in a loose claw clip, dark brown eyes, round tortoiseshell glasses (sometimes off), soft natural look, average build, calm warm smile.
```

```
[MARA]
Mara, a 34-year-old woman from Germany: fair skin with rosy cheeks, straight blonde shoulder-length hair tucked behind the ears, green eyes, light natural makeup, slim average build, organized and cheerful expression.
```

```
[JONAS]
Jonas, a 36-year-old man from Germany: light-brown skin, short black curly hair, a well-groomed full short beard, dark eyes, tall average build, relaxed friendly expression.
```

```
[FOTO-UGC]
Shot on a recent iPhone, natural light, realistic skin texture with pores and fine details, no beauty filter, no studio lighting, authentic social-media look, slightly imperfect framing.
```

---

## AV-00 · Gesicht festlegen (pro Avatar)

Einmal pro Person. Ergebnis wird `R-AVATAR-<NAME>`.

**Hochladen:** nichts  
**Format:** horizontal 3:2

```
Character reference sheet of one photorealistic person, three views side by side on a plain light grey background, identical lighting: 1) front head-and-shoulders portrait, neutral friendly expression, 2) three-quarter portrait smiling, 3) full-body standing, relaxed pose.

{PERSON: [LEA], [TIM], [SARAH], [MARA] oder [JONAS] einsetzen}

Outfit: {OUTFIT, z. B. Lea: 'a cream ribbed top and light-blue straight jeans' · Tim: 'a black gym t-shirt and grey joggers' · Sarah: 'a soft lavender knit sweater and wide trousers' · Mara: 'a white shirt and beige trousers' · Jonas: 'a navy knit sweater and dark jeans'}.
Soft even studio light, realistic skin texture, natural proportions, photorealistic, 50 mm lens look. No text, no logos.

Avoid: plastic skin, beauty filter, distorted hands, different faces between the views, watermark.
```

## AV-01 bis AV-03 · Lea mit GLOW

### AV-01 · GRWM-Spiegelselfie

**Hochladen:** `R-AVATAR-LEA`, `R-DOSE-GLOW`  
**Format:** vertical 9:16 (auch Startbild für ein GRWM-Video)

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar and its label.

[LEA] Lea takes a mirror selfie in a bright bathroom in the morning, phone in one hand (phone back facing the mirror, no brand logo), holding the GLOW jar up next to her face with the other hand, label towards the mirror and readable. Hair in a sleek low bun, cream robe, fresh skin. On the counter a serum bottle and a perfume.
[FOTO-UGC]

Avoid: changed face, mirrored or unreadable label (the label must read correctly in the final image), extra fingers, watermark.
```

### AV-02 · Dose in die Kamera

**Hochladen:** `R-AVATAR-LEA`, `R-DOSE-GLOW`  
**Format:** vertical 4:5 und 9:16

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar and its label.

[LEA] Close-up of Lea sitting at her vanity, smiling at the camera and holding the GLOW jar towards the lens with both hands, label sharp and readable, her face slightly out of focus behind it. Warm morning light from a window, blush-pink tones.
[FOTO-UGC]

Avoid: changed face, changed label, extra fingers, watermark.
```

### AV-03 · Lea mit GLOW × Skincare

**Hochladen:** `R-AVATAR-LEA`, `R-DOSE-GLOW`, `R-SKINCARE`  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference. Use the other images as the single source of truth for the GLOW jar and the skincare product.

[LEA] Lea in her bathroom applies a drop of the skincare product to her cheek while the GLOW jar stands open in front of her on the counter, label readable. Natural morning light, fresh dewy skin, calm and premium.
[FOTO-UGC]

Avoid: changed face, changed labels, watermark.
```

## AV-04 bis AV-06 · Tim mit FLEX

### AV-04 · Auf der Hantelbank

**Hochladen:** `R-AVATAR-TIM`, `R-DOSE-FLEX`, `R-GUMMI-FLEX`  
**Format:** vertical 4:5 und 9:16

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the other images as the single source of truth for the jar and the gummies.

[TIM] Tim sits on a weight bench in a modern gym between sets, black t-shirt, towel over his shoulder, taking two FLEX gummies out of the open FLEX jar, label readable. Dumbbell rack out of focus behind him, morning light through large windows.
[FOTO-UGC]

Avoid: changed face, more than two gummies in his hand, changed label, gym brand logos, watermark.
```

### AV-05 · Shaker vergessen

**Hochladen:** `R-AVATAR-TIM`, `R-DOSE-FLEX`  
**Format:** vertical 9:16 (Startbild für den Hook „Shaker vergessen?“)

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the jar.

[TIM] Tim in a gym locker room looks into his open gym bag with an exaggerated "oh no" face, an empty dirty shaker bottle in one hand. In the bag, clearly visible, the FLEX jar, label readable. Fluorescent locker-room light.
[FOTO-UGC]

Avoid: changed face, brand names on the shaker, watermark.
```

### AV-06 · Gym-Spiegelselfie

**Hochladen:** `R-AVATAR-TIM`, `R-DOSE-FLEX`  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the jar.

[TIM] Tim takes a gym mirror selfie after training, slight sweat, grey tank top, holding the FLEX jar casually against his chest, label readable and correctly oriented. Gym equipment behind him, natural light.
[FOTO-UGC]

Avoid: changed face, mirrored label text, watermark.
```

## AV-07 und AV-08 · Sarah mit SNOOZY

### AV-07 · Abendroutine im Bett

**Hochladen:** `R-AVATAR-SARAH`, `R-DOSE-SNOOZY`  
**Format:** vertical 9:16 und 4:5

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar.

[SARAH] Sarah sits in bed at night in a soft lavender pyjama, glasses on, hair in a loose claw clip, the warm bedside lamp is the main light. She holds the SNOOZY jar in her lap and smiles sleepily at the camera; her phone lies face down on the nightstand next to a cup of herbal tea.
[FOTO-UGC]

Avoid: changed face, changed label, readable phone screen, watermark.
```

### AV-08 · Sofa, Tee, Decke

**Hochladen:** `R-AVATAR-SARAH`, `R-DOSE-SNOOZY`  
**Format:** vertical 4:5

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the jar.

[SARAH] Sarah curled up on a sofa under a chunky knit blanket in the evening, a candle and a cup of tea on the side table next to the SNOOZY jar, label readable. She reads a paperback, calm and content. Warm dim light, lavender and cream tones.
[FOTO-UGC]

Avoid: changed face, changed label, TV screens, watermark.
```

## AV-09 · Mara mit DAILY

**Hochladen:** `R-AVATAR-MARA`, `R-DOSE-DAILY`  
**Format:** vertical 4:5 und 9:16

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar.

[MARA] Mara at a sunny kitchen table in the morning, a paper weekly planner open in front of her, pen in hand, a cup of coffee and the DAILY jar next to the planner, label readable. She looks up at the camera with a cheerful "got it all planned" smile. Bright, tidy, warm yellow tones.
[FOTO-UGC]

Avoid: changed face, readable planner text, changed label, watermark.
```

## AV-10 · Startbild für Talking-Head-Video (alle Avatare)

Das erste Bild eines Videos, in dem der Avatar in die Kamera spricht. Dieses Bild in Higgsfield oder Seedance als Start-Frame nutzen, das Skript kommt aus dem Video-Thread.

**Hochladen:** `R-AVATAR-<NAME>`, `R-DOSE-<SORTE>`  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference: the same person, same face, same hair. Use the second image as the single source of truth for the jar.

{PERSON-BAUSTEIN} looking directly into the camera with a natural, mid-sentence expression (mouth slightly open, as if starting to talk), holding the {SORTE} jar at chest height in one hand, label facing the camera and readable. Framed from mid-torso up, eyes in the upper third of the image. Location: {ORT: Lea – bathroom vanity; Tim – gym; Sarah – bedroom with lamp; Mara/Jonas – kitchen}.
Front-facing phone camera look, natural light, realistic skin.
[FOTO-UGC]

Avoid: changed face, hand covering the label, extra fingers, watermark.
```

## AV-11 · Unboxing der Crew-Box

**Hochladen:** `R-AVATAR-<NAME>`, `R-BOX` (oder Ergebnis aus `B-02`), alle vier `R-DOSE-…` (wenn das Limit es zulässt)  
**Format:** vertical 9:16

```
Use the first uploaded image as the identity reference. Use the other images as the single source of truth for the box and the jars.

{PERSON-BAUSTEIN} sits cross-legged on a bed and has just opened the cream bärly crew box on her/his lap: the four jars (yellow, pink, blue, lavender) in their insert, character cards on top. Excited, genuine smile, looking down into the box. Morning light, cozy bedroom.
[FOTO-UGC]

Avoid: changed face, changed labels, watermark.
```

## AV-12 · Mara und Jonas mit der Crew

**Hochladen:** `R-AVATAR-MARA`, `R-AVATAR-JONAS`, alle vier `R-DOSE-…` (oder `R-BOX`)  
**Format:** vertical 4:5

```
Use the first two uploaded images as identity references for the two people. Use the others as the single source of truth for the jars.

[MARA] [JONAS] Mara and Jonas in their kitchen on a weekday morning: Jonas pours coffee, Mara holds the DAILY jar and hands him two gummies, laughing. On the counter the other three bärly jars (GLOW pink, FLEX blue, SNOOZY lavender) stand in a row, labels readable. Warm sunny light, real lived-in kitchen.
[FOTO-UGC]

Avoid: changed faces, changed labels, piles of gummies, watermark.
```

## AV-13 · Avatar mit Bär als Figur

Der Avatar mit dem Bären als kleiner Plüschfigur, z. B. auf dem Schreibtisch oder der Schulter. Verbindet Avatar-Accounts mit den Charakter-Accounts.

**Hochladen:** `R-AVATAR-<NAME>`, `R-BÄR-<SORTE>`, `R-DOSE-<SORTE>`  
**Format:** vertical 4:5

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the plush character and the third for the jar.

{PERSON-BAUSTEIN} at {ORT}, smiling at the camera. On the table next to her/him the {SORTE} jar, label readable, and leaning against it the {SORTE} bear as a 25 cm plush figure exactly like the character reference, with correct contact shadow and matching light.
[FOTO-UGC]

Avoid: changed face, changed character colors or accessories, cartoon person, watermark.
```

## AV-14 · Black Week mit der Crew-Box

**Hochladen:** `R-AVATAR-<NAME>`, `R-BOX` (oder Ergebnis aus `B-07`)  
**Format:** vertical 9:16 und 4:5

```
Use the first uploaded image as the identity reference. Use the second image as the single source of truth for the box.

{PERSON-BAUSTEIN} holds the bärly crew box with the black-and-gold Black Week sleeve towards the camera, excited expression. Background: a dim living room in the evening with warm string lights and a gold glow. Premium, festive, adult.
[FOTO-UGC]

Avoid: changed face, misspelled text on the sleeve, red sale signs, watermark.
```

## AV-15 · Profilbild für den Account

**Hochladen:** `R-AVATAR-<NAME>`  
**Format:** square 1:1

```
Use the uploaded image as the identity reference: the same person, same face, same hair.

{PERSON-BAUSTEIN} Head-and-shoulders portrait for a social media profile picture, face centered with space around it (the image will be cropped to a circle), soft natural daylight, a plain background in {FARBE: Lea blush rose, Tim ice blue, Sarah soft lavender, Mara/Jonas butter yellow}, friendly authentic smile.
[FOTO-UGC]

Avoid: changed face, text, logos, watermark.
```

## AV-16 · Alltagsposts ohne Produkt

Ein frischer Account wirkt echter, wenn nicht jeder Post Werbung ist. Mit diesem Prompt erzeugst du Feed-Bilder aus dem Leben des Avatars. Etwa jeder dritte Post mit Produkt, der Rest so.

**Hochladen:** `R-AVATAR-<NAME>`  
**Format:** vertical 4:5

```
Use the uploaded image as the identity reference: the same person, same face, same hair.

{PERSON-BAUSTEIN} {SZENE}.
[FOTO-UGC]

Avoid: changed face, logos, readable signs with real brand names, watermark.
```

`{SZENE}`-Ideen:

- **Lea:** `having an iced matcha at a sunny café table` · `trying on a blazer in a bright bedroom mirror` · `walking through a farmers' market with a tote bag`
- **Tim:** `stretching outdoors at sunrise in a park` · `meal-prepping chicken and rice in a small kitchen` · `laughing with a friend after a run`
- **Sarah:** `reading on a balcony at dusk with a blanket` · `lighting a candle in a cozy living room` · `working on a laptop in a calm home office, tired but smiling`
- **Mara:** `writing in a paper planner at a café` · `arranging meal-prep boxes in the fridge on a Sunday` · `on a weekend hike with a backpack`
- **Jonas:** `brewing pour-over coffee in a sunny kitchen` · `reading the newspaper on the sofa` · `cycling to work on a city bike`
