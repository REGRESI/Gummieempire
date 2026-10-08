# 01 · Die vier KI-Avatare

Vier Personen, ein Avatar pro Sorte. Jeder Avatar ist die Zielperson aus dem Content-Plan (`content.html`), nur als Creator: Lina ist Lea, Kian ist Tim, Mila ist Sarah, Jule ist Mara. So spricht jeder Account genau die Leute an, die die Sorte kaufen.

| Avatar | Sorte | Alter | Plattform zuerst | Handy / Account |
| --- | --- | --- | --- | --- |
| **Lina** | GLOW | 26 | TikTok, Instagram | Handy 1 · Account A |
| **Kian** | FLEX | 24 | TikTok, YouTube Shorts | Handy 1 · Account B |
| **Mila** | SNOOZY | 33 | Instagram, TikTok | Handy 2 · Account A |
| **Jule** | DAILY | 31 | Instagram, Facebook | Handy 2 · Account B |

Die bärly-Brand-Accounts laufen daneben und reposten die besten Avatar-Clips. Die Crew-Bundles (Die ganze Crew, Morgen & Abend) kommen bei allen vier vor, siehe `02-skripte/bundles-black-friday.md`.

Wenn ihr nur zwei Avatare schafft: **Lina und Kian zuerst.** GLOW und FLEX haben die klarste Kaufsituation (Routine vorm Spiegel, Gym-Tasche) und das größte Creator-Umfeld.

---

## So baust du einen Avatar in Higgsfield

1. Higgsfield → **AI Influencer** öffnen, Tier **Normal**.
2. Die Merkmale aus der Tabelle des Avatars anklicken (die IDs in Klammern sind dieselben, die Higgsfield intern nutzt).
3. In das Textfeld den **Charakter-Prompt** des Avatars kopieren.
4. Character Sheet erzeugen, das beste speichern. Seed notieren und in die Tabelle unten eintragen.
5. Danach immer mit diesem Sheet als Referenz arbeiten (Bilder: Soul/Character, Videos: Seedance 2.5 im Modus **Omni Reference** mit Sheet + Packshot).
6. Stimme: in Higgsfield unter **Voice** eine Stimme nach der Stimmbeschreibung anlegen und für alle Videos des Avatars dieselbe nehmen.

Feste Referenzbilder für jedes Video: Character Sheet des Avatars + Packshot der Sorte aus `assets/products/<sorte>-front.webp`. Kommt das neue Packaging vom Supplier, nur den Packshot austauschen, alle Prompts bleiben gleich.

| Avatar | Seed | Sheet-Link | Stimme (ID) |
| --- | --- | --- | --- |
| Lina | | | |
| Kian | | | |
| Mila | | | |
| Jule | | | |

---

## Lina · GLOW · „Die mit der Routine“

**Wer sie ist:** 26, arbeitet im Marketing in Köln, Skincare morgens und abends, Bad-Regal ist ihr Heiligtum. Ehrlich, ein bisschen extra, lacht über sich selbst. Hat schon viele Beauty-Gummies probiert und sagt das auch. Kauft lieber Serum als Make-up.

**Wie sie redet:** schnell, warm, direkt in die Kamera, wie eine Sprachnachricht an die beste Freundin. Sagt „okay, hör zu“, „ehrlich gesagt“, „ich schwör“. Kein Fachchinesisch.

**Higgsfield-Merkmale**

| Gruppe | Wahl |
| --- | --- |
| Gender | Female (`female`) |
| Build | Slim (`body_slim`) |
| Hairstyle | Long hair (`hair_long`) |
| Hair Color | Chestnut (`hc_chestnut`) |
| Style | Casual (`casual`) |
| Ethnicity | European (`european`) |
| Age | Adult (`adult`) |
| Skin | Light (`st_light`) |
| Eye shape / color | Almond (`es_almond`) / Hazel (`eye_hazel`) |
| Features | Freckles (`fn_freckles`), Dimples (`fn_dimples`) |
| Accessories | Jewelry (`acc_jewelry`) |

**Charakter-Prompt (Higgsfield, Englisch lassen):**

```
Lina, 26-year-old German woman, long chestnut hair with soft face-framing layers, light skin with natural freckles across nose and cheeks, dimples when she smiles, hazel almond eyes, glowing dewy skin with minimal makeup, small gold hoop earrings and a thin gold necklace. Warm, playful, slightly extra energy. Wardrobe: oversized cream knit, pink satin pyjama set, white bathrobe, light pink claw clip. Home: bright bathroom with a marble shelf, round mirror with ring light, skincare bottles, pink accents. Natural smartphone-camera look, realistic skin texture, no beauty filter.
```

**Stimme:** weiblich, Mitte 20, hell und warm, schnelles Sprechtempo, lächelt hörbar, leichter rheinischer Einschlag ok.

**Sets für Videos:** Bad mit Spiegel und Ringlicht · Bett morgens mit Kaffee · Schminktisch · Auto (Beifahrersitz, GRWM) · Bad-Regal-„Shelfie“.

**Signature-Moment:** Sie stellt die rosa GLOW-Dose zwischen Serum und Parfum ins Regal und tippt zweimal auf den Deckel.

**Account-Namen-Ideen:** `lina.glowt` · `linas.routine` · `lina.morgens`

**Bio-Vorlage:** `Lina, 26 · Köln · Skincare, Routine, ehrlich · KI-Avatar von @baerly 🤖💗`

---

## Kian · FLEX · „Der mit dem Plan im Gym“

**Wer er ist:** 24, Azubi zum Mechatroniker, trainiert vier Mal die Woche, trackt alles in einer App. Kennt Kreatin, hasst Pulver im Rucksack. Selbstironisch, motiviert, ein bisschen zu sehr. Bester Freund von jedem im Gym.

**Wie er redet:** locker, direkt, Gym-Slang („Satz“, „Push-Day“, „Bro“), kurze Sätze, macht sich über sich selbst lustig.

**Higgsfield-Merkmale**

| Gruppe | Wahl |
| --- | --- |
| Gender | Male (`male`) |
| Build | Athletic (`body_athletic`) |
| Hairstyle | Short hair (`hair_short`) |
| Hair Color | Dark brown (`hc_darkbrown`) |
| Style | Sporty (`sporty`) |
| Ethnicity | Middle Eastern (`middle_eastern`) |
| Age | Adult (`adult`) |
| Skin | Olive (`st_olive`) |
| Eye shape / color | Almond (`es_almond`) / Brown (`eye_brown`) |
| Features | Thick brows (`fn_thickbrows`) |
| Facial hair | Stubble (`fh_stubble`) |
| Distinctive | Brow slits (`df_slits`) |
| Accessories | Headphones (`acc_headphones`), Bag (`acc_bag`) |

**Charakter-Prompt:**

```
Kian, 24-year-old German man with Middle Eastern roots, athletic build (fit, not bodybuilder), short dark brown hair with a clean fade, light stubble, thick eyebrows with one small brow slit, warm brown eyes, olive skin. Confident, self-ironic, slightly over-motivated energy. Wardrobe: royal blue oversized gym tee, black shorts, black hoodie, over-ear headphones around the neck, black gym duffel bag. Locations: modern commercial gym with dark floor and blue accent lights, locker room, car in the gym parking lot. Natural smartphone-camera look, realistic skin texture and sweat.
```

**Stimme:** männlich, Anfang/Mitte 20, mittlere Stimmlage, energisch, leicht rau, schnelles Tempo, lacht kurz zwischen Sätzen.

**Sets für Videos:** Gym zwischen den Sätzen · Umkleide · Auto vor dem Gym · Küche beim Meal Prep · Sporttasche packen.

**Signature-Moment:** Er kippt einen Shaker in die Spüle, zieht die blaue FLEX-Dose aus der Sporttasche und nimmt zwei Gummies.

**Account-Namen-Ideen:** `kian.flext` · `kian.liftet` · `noch.ein.satz`

**Bio-Vorlage:** `Kian, 24 · Push, Pull, Legs, repeat · KI-Avatar von @baerly 🤖💪`

---

## Mila · SNOOZY · „Die, die abends nicht runterkommt“

**Wer sie ist:** 33, Projektleiterin in Hamburg, Job mit Verantwortung, abends noch Mails und Serien. Liebt Rituale: Kerze, Tee, Decke. Trockener Humor, ruhig, ehrlich müde. Teilt ihr Abendritual.

**Wie sie redet:** ruhig, leise, ASMR-nah, trockene Pointen, längere Pausen. Spricht oft wie zu sich selbst.

**Higgsfield-Merkmale**

| Gruppe | Wahl |
| --- | --- |
| Gender | Female (`female`) |
| Build | Curvy (`body_curvy`) |
| Hairstyle | Short hair (`hair_short`) – Bob |
| Hair Color | Blonde (`hc_blonde`) |
| Style | Casual (`casual`) |
| Ethnicity | European (`european`) |
| Age | Adult (`adult`) |
| Skin | Fair (`st_fair`) |
| Eye shape / color | Hooded (`es_hooded`) / Blue (`eye_blue`) |
| Features | Beauty mark (`fn_mole`) |
| Accessories | Glasses (`acc_glasses`) |

**Charakter-Prompt:**

```
Mila, 33-year-old German woman, chin-length dirty blonde bob, fair skin, calm blue hooded eyes, small beauty mark near her lip, thin round glasses she wears in the evening. Calm, dry-humoured, cosy energy. Wardrobe: lilac oversized hoodie, grey knit cardigan, lavender silk sleep set, fluffy socks. Home: cosy bedroom at night with warm lamp light, linen bedding, a lit candle, herbal tea, a book, phone on the nightstand. Soft warm low light, natural smartphone-camera look, realistic skin texture.
```

**Stimme:** weiblich, Anfang 30, tief-warm, leise, langsames Tempo, fast flüsternd am Ende der Videos.

**Sets für Videos:** Nachttisch mit Lampe · Bett unter der Decke · Badewanne/Sofa mit Tee · Küche abends · Fensterbank mit Regen.

**Signature-Moment:** Sie legt das Handy umgedreht auf den Nachttisch, nimmt zwei Gummies aus der lila SNOOZY-Dose, Licht aus.

**Account-Namen-Ideen:** `mila.abends` · `licht.aus.mila` · `mila.schlaeft`

**Bio-Vorlage:** `Mila, 33 · Abendroutinen für Leute, die nicht abschalten können · KI-Avatar von @baerly 🤖🌙`

---

## Jule · DAILY · „Die mit der Liste“

**Wer sie ist:** 31, Grundschullehrerin in Leipzig, plant alles in Notion und auf Papier, Meal-Prep am Sonntag. Positiv, strukturiert, ein bisschen nerdig. Hatte fünf Dosen im Schrank und keine Ahnung wofür.

**Wie sie redet:** klar, freundlich, strukturiert („erstens, zweitens“), lacht über ihre eigenen Listen. Gut für Erklär-Formate und Facebook.

**Higgsfield-Merkmale**

| Gruppe | Wahl |
| --- | --- |
| Gender | Female (`female`) |
| Build | Athletic (`body_athletic`) |
| Hairstyle | Braids (`hair_braids`) |
| Hair Color | Dark brown (`hc_darkbrown`) |
| Style | Casual (`casual`) |
| Ethnicity | Mixed (`latin_american`) |
| Age | Adult (`adult`) |
| Skin | Tan (`st_tan`) |
| Eye shape / color | Round (`es_round`) / Brown (`eye_brown`) |
| Features | High cheekbones (`fn_cheekbones`), Dimples (`fn_dimples`) |
| Accessories | Bag (`acc_bag`), Jewelry (`acc_jewelry`) |

**Charakter-Prompt:**

```
Jule, 31-year-old German woman with mixed heritage, dark brown hair in two neat braids or a high bun, warm tan skin, round brown eyes, high cheekbones, dimples, small silver studs. Positive, organised, slightly nerdy energy. Wardrobe: cream hoodie, mustard yellow cardigan, black crossbody bag, white sneakers. Home: bright Scandinavian kitchen with a wooden breakfast table, coffee, paper planner with sticky notes, meal-prep containers, sunlight. Natural smartphone-camera look, realistic skin texture.
```

**Stimme:** weiblich, Anfang 30, klar und freundlich, mittleres Tempo, deutliche Aussprache, lehrerinnenhaft im besten Sinn.

**Sets für Videos:** Frühstückstisch mit Planer · Küche beim Meal Prep · Schreibtisch mit Notion-Bildschirm · Briefkasten im Hausflur · Supermarkt/Drogerie-Regal.

**Signature-Moment:** Sie hakt im Planer „08:00 Daily, 2 Stück“ ab und stellt die gelbe DAILY-Dose neben den Kaffee.

**Account-Namen-Ideen:** `jule.plant` · `jules.liste` · `jule.hat.einen.plan`

**Bio-Vorlage:** `Jule, 31 · Ich hab da einen Plan · Routinen, Meal Prep, Ordnung · KI-Avatar von @baerly 🤖☀️`

---

## Gemeinsame Regeln für alle Avatare (damit sie echt wirken)

- **Immer dasselbe Sheet, dieselbe Stimme, derselbe Seed.** Wiedererkennung ist alles.
- **Handy-Look statt Werbespot:** Selfie-Winkel, leichtes Wackeln, natürliches Licht, kein Studio. Die Brand-Accounts dürfen cinematic, die Avatare nicht.
- **Dose immer mit Label zur Kamera**, Logo lesbar, zwei Gummies in der Hand (nie eine Handvoll).
- **Die vier kennen sich.** Lina und Mila sind Freundinnen (Duette „Morgen & Abend“), Kian ist Jules Bruder (Crew-Bundle-Videos). Das gibt Stoff für Crossover und Duette.
- **Erste Sekunde = Bewegung + Satz.** Nie mit „Hi, ich bin …“ anfangen.
