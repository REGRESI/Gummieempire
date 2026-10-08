# Bausteine

Die Prompts in den anderen Dateien sind schon fertig zusammengesetzt. Diese Bausteine brauchst du nur, wenn du einen eigenen Prompt baust: Baustein kopieren, in deinen Prompt einsetzen.

## Grundsatz für Referenzbilder

Steht am Anfang jedes Prompts, der Referenzen nutzt:

```
[REFERENZ]
Use the uploaded reference images as the single source of truth. Reproduce the jar, its label, the character and the gummies exactly as they appear in the references: same shapes, colors, proportions, logo and label text. Do not redesign, simplify or reinterpret them. Only change pose, scene, lighting and camera as described below.
```

## Stil

```
[STIL-STUDIO]
Premium supplement product photography, soft diffused daylight from the left, gentle realistic shadows, warm off-white seamless studio background with a subtle gradient, calm and adult, high-end skincare-brand aesthetic, sharp focus on the product, 85 mm lens look, photorealistic.
```

```
[STIL-LIFESTYLE]
Natural lifestyle photo, real home interior, soft morning or evening window light, muted pastel tones, uncluttered styling, calm and adult, editorial magazine quality, shallow depth of field, photorealistic, no stock-photo look.
```

```
[STIL-UGC]
Shot on a recent iPhone, handheld, natural indoor light, slightly imperfect framing, authentic and casual, real skin texture, no studio lighting, looks like a genuine social media post.
```

```
[STIL-3D]
Soft plush 3D character render, Pixar-like quality, velvety fluffy fur with fine strand detail, glossy black eyes and nose, rounded chubby proportions with a large head and short limbs, soft studio lighting with gentle rim light, clean background.
```

```
[STIL-MIX]
Photorealistic scene with the plush 3D character placed naturally into it: correct contact shadows, matching light direction and color temperature, the character the size of a {small toy | 30 cm figure | life-size companion}.
```

## Die Bären

Beschreibung aus den freigegebenen Charakterbildern (`assets/characters/`). Immer zusätzlich `R-BÄR-<SORTE>` hochladen, die Beschreibung ist nur die Absicherung.

```
[BÄR-GLOW]
GLOW: a plush 3D teddy bear with soft bubblegum-pink fur, a lighter pink-white muzzle, small glossy black nose and a cheeky open smile. Wears a shiny gold crown with five points topped by small gold balls and pink diamond gems, sitting slightly tilted on the head, and pink heart-shaped sunglasses with thin gold arms. Personality: charming, confident, always a little extra; often winks or strikes a playful pose.
```

```
[BÄR-FLEX]
FLEX: a plush 3D teddy bear with bright cornflower-blue fur and a muscular bodybuilder build, white fur on the chest and a clearly defined white six-pack, white muzzle with a small confident smile. Wears black wraparound sports sunglasses. Signature item: a black weight-plate dumbbell. Personality: disciplined, loyal, a little too motivated.
```

```
[BÄR-SNOOZY]
SNOOZY: a plush 3D teddy bear with soft lavender-purple fur, rosy blush cheeks, cream-white muzzle and belly, eyes usually closed with long dark lashes and a content little smile. Wears a deep violet nightcap with cream stars and a crescent moon, a cream fluffy band and a lavender pompom at the tip. Signature item: a cream pillow he hugs. Personality: calm, funny, a professional at switching off.
```

```
[BÄR-DAILY]
DAILY: a plush 3D teddy bear with warm golden-yellow fur, a small fluffy tuft on the head, warm brown eyes, rosy cheeks and a big friendly smile. Wears a cream-beige hoodie with drawstrings and a kangaroo pocket, and a black crossbody bag with gold zippers on a brown strap. Often holds a tablet or phone. Personality: structured, positive, the reason the crew works. No cap.
```

```
[BÄR-CREW]
The bärly crew: GLOW (pink, crown, heart sunglasses), FLEX (blue, muscular, black sports sunglasses), SNOOZY (lavender, nightcap, pillow) and DAILY (yellow, cream hoodie, black crossbody bag). All four the same plush 3D style and the same body height except FLEX, who is slightly broader.
```

## Die Dosen

Immer zusätzlich `R-DOSE-<SORTE>` hochladen.

```
[DOSE-GLOW]
The GLOW jar: a cylindrical pastel-pink plastic jar with a ribbed screw lid in the same pink. Label: large white rounded "bärly" logo with a small ™, below it "GLOW" in bold raspberry-red capitals, "BEAUTY GUMMIES", a thin line, "Biotin · Zink · Vitamin C", bottom left "60 Gummies" and "Himbeere", a small pink crown icon bottom right, metallic rose-gold wave pattern on both sides.
```

```
[DOSE-FLEX]
The FLEX jar: a cylindrical pastel-blue plastic jar with a ribbed screw lid in the same blue. Label: large white rounded "bärly" logo with a small ™, below it "FLEX" in bold navy capitals, "KREATIN GUMMIES", a thin line, "Kreatin · Vitamin B6 · B12", bottom left "60 Gummies" and "Blaubeere", a small flexed-arm icon bottom right, metallic blue wave pattern on both sides.
```

```
[DOSE-SNOOZY]
The SNOOZY jar: a cylindrical pastel-lavender plastic jar with a ribbed screw lid in the same lavender. Label: large white rounded "bärly" logo with a small ™, below it "SNOOZY" in bold deep-purple capitals, "SLEEP GUMMIES", a thin line, "Melatonin · Magnesium · Vitamin B6", bottom left "60 Gummies" and "Waldbeere", a small moon-and-stars icon bottom right, metallic violet wave pattern on both sides.
```

```
[DOSE-DAILY]
The DAILY jar: a cylindrical pastel-yellow plastic jar with a ribbed screw lid in the same yellow. Label: large white rounded "bärly" logo with a small ™, below it "DAILY" in bold amber-orange capitals, "MULTIVITAMIN GUMMIES", a thin line, "Vitamin D · B12 · Zink", bottom left "60 Gummies" and "Zitrone-Mango", a small sun icon bottom right, metallic golden wave pattern on both sides.
```

## Die Gummies

Wie die Gummies aussehen, weißt nur dein Foto. Deshalb gibt es keine Beschreibung, sondern nur diese Regel:

```
[GUMMI]
The gummies look exactly like in the uploaded gummy reference photo: same shape, size, color, surface (matte or sugared or glossy) and translucency. Do not invent a different gummy shape. Show at most {2 | 3–6} gummies, placed deliberately, never as a pile or bowl.
```

Gummies nur in der Sortenfarbe, solange du nichts anderes weißt: GLOW Himbeere (rosa-rot), FLEX Blaubeere (blau), SNOOZY Waldbeere (beerenlila), DAILY Zitrone-Mango (gelb-orange).

## Hintergrundfarben der Sorten

Aus dem Shop (`brand.js`), damit Ads und Website gleich wirken:

| Sorte | Hell | Akzent | Dunkel |
| --- | --- | --- | --- |
| GLOW | `#fad4dd` blush rose | `#e86b8e` | `#c2416a` |
| FLEX | `#d3e8ff` ice blue | `#2a6fff` | `#1e4ed8` |
| SNOOZY | `#dccef4` soft lavender | `#8e6bdb` | `#5b21b6` |
| DAILY | `#fbe7b5` butter yellow | `#e0a11f` | `#8a5c00` |
| Marke, Schrift | `#1d1236` ink | | |

```
[HINTERGRUND-<SORTE>]
Background: a seamless {blush rose #fad4dd | ice blue #d3e8ff | soft lavender #dccef4 | butter yellow #fbe7b5} backdrop with a soft gradient and a subtle floor shadow.
```

## Text im Bild

```
[TEXT-AN]
Add this exact German text in a clean, bold, rounded sans-serif font (similar to the bärly logo), dark ink color #1d1236, perfectly spelled including umlauts: "{TEXT}". Place it {top | bottom | left} with generous margin. No other text except the jar label.
```

```
[TEXT-AUS]
No text, no letters, no watermark anywhere except the original jar label. Leave clean empty space {top | bottom} for text added later.
```

## Verbote (ans Ende jedes Prompts)

```
[NICHT]
Avoid: changing the label or logo, extra or missing letters on the label, different jar shape, changed character colors or accessories, cartoon style for the jar, piles or bowls of gummies, candy-shop look, children, medical setting, pills, syringes, neon oversaturation, cluttered background, watermarks.
```
