# Supplier & Verpackung

Stand: 09.10.2026 (abends) · Branch `claude/supplier-verpackung-56motr`

## Stand 10.10.2026: Antworten und neue Entscheidung

**Entscheidung: Option 2, also eigene Dose plus Gummies im versiegelten Beutel. Wir packen und versenden selbst.** Biocaro (Plan A) fällt für den Start weg. Alles darunter ab „Was zu tun ist“ ist der alte Stand vom 08./09.10.

### Was die Lieferanten geantwortet haben

| | Biocaro (Leo) | Shaanxi Fuda Ruishi (Anna) | Suplify | Option 2: eigene Dose + Beutel |
| --- | --- | --- | --- | --- |
| Mindestmenge | 3.000 Dosen je Geschmack, unter 1.000 gar nicht | 100 Dosen | keine | 100 Dosen (Dose), Beutel: anfragen |
| Preis | erst nach Muster | 2,30 $ (100) / 2,20 $ (500) + 30 $ einmalig fürs Etikett, farbige Dose extra | 7,85 € + MwSt. (≈ 9,34 €) | Dose 0,30–0,60 € + Gummies + Etikett |
| Muster | 150–200 $ je Produkt inkl. Versand, 7–15 Arbeitstage | anfragen | – | – |
| Bärchen | 3 g, 1 g Kreatin pro Stück | 3 g | ja | über Fuda o. a. |
| Optik wie Packshots | ja | nein (Standarddose, nur Etikett) | nein (klare Dose, weißer Deckel) | **ja** |
| Versand | wir | wir | Suplify | wir |

### Warum Option 2

- Die Packung sieht aus wie geplant. Shop, Ads und Creator-Content zeigen dann das echte Produkt.
- Es ist mit Abstand am günstigsten: grob 3–4 € pro Dose für Gummies, Dose, Etikett und Beutel (Schätzung, bis Preise für die Beutel da sind). Bei Suplify sind es ≈ 9,34 € nur für die Ware.
- Die Mindestmenge von 100 passt zum Vorbestellmodell: Erst wenn Vorbestellungen da sind, wird bestellt.
- Der Beutel kommt fertig versiegelt mit MHD und Los vom Hersteller. Wir öffnen nichts und füllen nichts um, wir legen ihn nur in die Dose. Das hält Hygiene und Haftung einfach.
- Der Beutel passt später direkt als Nachfüller im Abo (Plan aus `packaging-spec.js`).

**Was man dafür in Kauf nimmt:** selbst packen und versenden (bei ein paar hundert Bestellungen mit zwei Leuten machbar), Etiketten separat drucken lassen und Platz zum Lagern.

**Suplify als Notfall:** Wenn die Beutel-Gummies nicht rechtzeitig kommen, kann man über Suplify Creator-Seeding oder erste Bestellungen bedienen. Dann aber ehrlich mit Fotos der echten Suplify-Dose.

### Zum Start nur ein Geschmack pro Produkt (von Nico bestätigt am 10.10.)

Die Mindestmenge gilt meist pro Geschmack. Mit 4 Produkten × 3 Geschmäckern × 100 Stück wären es 1.200 Einheiten auf einmal. Deshalb starten wir mit **einem Geschmack pro Produkt** (400 Einheiten) und nehmen weitere dazu, sobald Vorbestellungen sie bezahlen. Als Start-Geschmäcker: GLOW Erdbeere oder Himbeere, FLEX Blaubeere, SNOOZY Mixed Berries, DAILY Mango.

### Nächster Schritt: Nachricht an Anna (Fuda), kurz

```text
Hi Anna, thanks for the quick answer! One more question: we'd like to
buy the gummies in sealed bags instead of bottles (we use our own jars).

1. Can you pack bear gummies in sealed food-grade bags (60 or 90 pcs per
   bag), with best-before date and batch number printed on each bag?
2. Which formulas do you have: creatine, beauty (biotin, zinc, vit C),
   sleep (melatonin, magnesium, B6), multivitamin?
3. Are they vegan (pectin, no gelatine)?
4. MOQ and price per bag at 100 / 500 per formula and flavour?
5. Sample cost and shipping time to Germany?

Thanks!
Nico
```

Dieselbe Frage parallel an 1–2 weitere Anbieter schicken, damit wir vergleichen können.

### Danach

1. Dose auswählen: matt in Sortenfarbe, Weithals, Größe passend zu 60 Bärchen à 3 g (≈ 180 g Gummies). Musterdose bestellen und mit Gummies füllen.
2. Etiketten bei einer Etikettendruckerei anfragen: matt, rundum, Metallic-Effekt, ab 100 Stück je Sorte.
3. Muster-Check (Abschnitt 5), dann erste Bestellung nach Vorbestellungen.
4. Shop anpassen: Stückzahl und Gewicht je Produkt, sobald die Gummies feststehen.

---

## Was zu tun ist

1. Kurze Nachricht (Abschnitt 1) an den Supplier schicken, ohne Bilder. Wenn er zusagt, Details aus Abschnitt 1a nachschieben. Die fertigen Produktbilder bekommt er erst, wenn er bestätigt hat, dass er alles umsetzen kann.
2. Antwort mit der Checkliste in Abschnitt 2 auswerten. Wenn alle Muss-Punkte erfüllt sind: Muster bestellen, Plan A.
3. Wenn nicht: Plan B (Abschnitt 3) bzw. die bessere Alternative B+ (Abschnitt 4).
4. Nach seiner Antwort: Geschmäcker festlegen (alle vier Produkte zum Start, je 2 bis 3 Geschmäcker) und Produktdesign und Shop daran anpassen.
5. Wenn die Muster da sind: Abschnitt 5 abarbeiten (Muster-Check), erst dann Produktion.

**Empfehlung:** Plan A, also der Supplier aus China. Nur dort sieht das echte Produkt aus wie auf unseren Packshots, und auf genau diesen Bildern bauen Shop, Ads und Creator-Content auf. Begründung in Abschnitt 4.

---

## 1. Erste Nachricht an den Supplier (kurz, zum Einfügen)

Kurz gehalten, weil das Alibaba-Feld lange Texte nicht absendet. Erst klären, ob er es überhaupt kann; Details (Verpackung, Multipack-Box, Zahlung, CoA) kommen in der zweiten Runde aus Abschnitt 1a.

```text
Hi, I'm Nico, founder of bärly, a new German brand for vegan supplement gummies. We want to launch 4 products under our own brand for Black Friday:

1. Beauty (biotin, zinc, vitamin C)
2. Creatine (3 g/day, like your BK2025102003)
3. Sleep (melatonin, magnesium, B6)
4. Multivitamin

Each in 2-3 flavours, classic gummy bear shape, 30 days per jar (60 or 90 gummies), custom coloured jar with our full label.

Quick questions:
1. Can you make all 4 in bear shape and different flavours?
2. How much does one bear gummy weigh?
3. No MOQ per product and flavour?
4. Price per jar incl. custom jar and label at 100 / 500 / 1,000?
5. Samples: cost and shipping time to Germany?
6. Do you have a vegan certificate?

If it fits, we'd like to order samples right away. Thanks!
Nico
```

## 1a. Details für die zweite Runde (nach seiner Zusage)

Englisch, weil das bei chinesischen OEM-Herstellern der Standard ist. Platzhalter in `[eckigen Klammern]` vorher ausfüllen.

```text
Hi [Name],

my name is Nico, I'm the founder of bärly, a new German brand for vegan
supplement gummies. We're launching our first products together with a big
creator campaign for Black Friday, and we'd love to produce with you because you're
the only manufacturer we found that offers full customisation, no MOQ and
all the certificates we need.

WHAT WE PLAN
- One jar = 30 days. 60 gummies (2 per day) or 90 gummies (3 per day)
  both work for us, whatever fits your gummies best.
- We'll launch all four products below at once, each in 2 to 3 flavours.
- Selling online in Germany/EU (Shopify), first through pre-orders, then
  monthly subscriptions.
- We want to start with small batches and scale up quickly with demand.

OUR 4 PRODUCTS (per daily serving)
1) GLOW – Beauty Gummies, pink
   Biotin (amount to be confirmed, we'd like to go lower than 450 µg,
   e.g. 50 µg), Zinc 5 mg, Vitamin C 80 mg
2) FLEX – Creatine Gummies, blue
   Creatine 3 g (from creatine monohydrate), Vitamin B6 0.7 mg, B12 2.5 µg
   -> We saw your creatine gummies (BK2025102003, 3 g creatine per serving,
      90 gummies, sugar-free, blueberry). That's a great base for FLEX.
      Is it 3 gummies per serving (1 g creatine each)? Can you add B6/B12?
3) SNOOZY – Sleep Gummies, purple
   Melatonin 1 mg, Magnesium 57 mg, Vitamin B6 1.4 mg
4) DAILY – Multivitamin Gummies, yellow
   Vitamins A, D3 (10 µg), E, C, B1, B2, B3, B5, B6, B12, biotin, folic acid,
   plus zinc, selenium, iodine (full list on request)

Requirements for all: vegan (pectin, no gelatine), natural colours only
(no azo dyes, no titanium dioxide), EU-compliant vitamin/mineral forms. Low sugar or sugar-free options are welcome,
please tell us what you offer.

FLAVOURS
We saw your flavour list. We'd like 2 to 3 flavours per product:
- GLOW: raspberry (is your "cranberry" picture raspberry?) or strawberry,
  cherry, honey peach
- FLEX: blueberry, green apple, watermelon
- SNOOZY: mixed berries, grape, cherry
- DAILY: mango, orange, pineapple
Can every flavour be combined with every formula (e.g. creatine and
minerals change the taste)? Can the gummy colour match the product colour
(pink, blue, purple, yellow) with natural colours?

GUMMY SHAPE
Our brand characters are four bears, so we'd like the classic gummy bear
shape.
- How much does one of your bear gummies weigh?
- Can we use your existing gummy bear mould? Which other shapes do you have?
- Later maybe a custom mould with our own bear: cost and lead time?

PACKAGING – our designs are almost finished, we'll send you the final
product images once you confirm you can produce this. The look:
- We saw your options (wide-mouthed bottle, square bottle, bag, barrel).
  We want the round wide-mouthed jar for 60 or 90 gummies, filled nicely
  to the top. Which jar size do you recommend for your bear gummies?
- Fully matte, opaque jar in the product colour (pink, light blue, lilac,
  yellow), screw cap in the same colour, smooth, no logo on the cap.
- Full-wrap matte label (or direct print) with metallic foil swirls
  (rose gold / silver / lilac silver / gold), big white "bärly" logo,
  product name, category, small icon (crown, arm, moon, sun).
- Tamper-evident inner seal.
- We provide the artwork. Can your team create the dieline / print files
  from our designs, and do you send a print proof before production?

MULTI-PACK GIFT BOX
For bundles we'd like a premium outer box that holds several jars, so the
unboxing feels special (similar to what some beauty brands do):
- Box for 2 jars and box for 4 jars (all four products).
- Printed rigid box or premium mailer box with an insert that holds the
  jars upright, plus a slot for a printed card.
- Can you produce these boxes and the cards too? Price and MOQ?

QUESTIONS
1. Can you produce all four formulas above in all requested flavours and
   the bear shape? If not, which formula/flavour combinations work best?
2. Samples: can you send samples of the formulas you can make (or as close
   as possible with existing recipes) in all our flavours and bear shape, plus
   one jar + label sample? Cost and shipping time to Germany?
3. Is there really no minimum order quantity per product, per flavour,
   per shape and per packaging design?
4. We saw your prices for the creatine gummies (5.67 € / 4.54 € / 3.42 € /
   3.15 €). Do they include our custom jar, coloured cap and full-wrap
   label, or what is the extra cost? Please quote the same tiers for the
   other formulas and list one-off costs separately (mould, printing
   plates, setup).
5. Price for the multi-pack box (2-jar and 4-jar) at 100 / 500 / 1,000.
6. Your listing says 14 days production up to 500 units. Does that also
   apply to custom packaging? Shipping time to Germany, and can you ship
   DDP (duties paid)? Air and sea prices please.
7. Payment terms: what deposit do you need, and when is the balance due?
8. We saw your certificates, thank you. Do you also have a vegan
   certificate?
9. For each batch: certificate of analysis incl. active ingredients, heavy
   metals and microbiology? Shelf life and stability data?
10. Can you print batch number and best-before date on each jar?
11. Do you also offer refill pouches (flat stand-up or 3-side-seal bag,
    60 gummies) in matching design? We'd like to add those later.

If everything works, we'd like to order samples this week and start with a
first small batch right after approval.

Looking forward to working with you!

Best regards,
Nico
bärly · [E-Mail] · [WhatsApp/Telefon]
```

Hinweis zu GLOW: Im Shop stehen noch 450 µg Biotin. Der Vorbestellplan schlägt eine niedrigere Dosis vor (z. B. 50 µg), entschieden ist das noch nicht. Die Nachricht fragt deshalb offen.

---

## 1b. Was sein Alibaba-Angebot schon verrät (Stand 09.10.2026)

Biocaro Pharmaceutical Co., Ltd. (Marke BIOCCHN), Zhengzhou, Verified PRO, seit 1 Jahr auf Alibaba, Antwortzeit ≤ 3 h, 100 % pünktliche Lieferung, 4,3/5 aus nur 6 Bewertungen, 10–20 Tsd. $ Online-Umsatz.

Kreatin-Gummies (Modell BK2025102003): vegan, zuckerfrei, 3 g Kreatin pro Portion, 90 Gummies und 200 g pro Dose, Blaubeere, 24 Monate haltbar, Muster verfügbar, volle Anpassung (OEM/ODM, eigene Rezeptur, eigene Verpackung).

| Menge | Preis pro Dose | Produktion |
| --- | --- | --- |
| 1–49 | 5,67 € | 14 Tage (bis 500) |
| 50–499 | 4,54 € | 14 Tage |
| 500–2.999 | 3,42 € | 35 Tage (501–3.000) |
| ab 3.000 | 3,15 € | 42 Tage |

Zertifikate laut Angebot: GMP, HACCP, ISO 22000, ISO 9001, Halal, CoA, Sicherheitsdatenblatt.

**Was das für uns heißt:**

- Keine Mindestmenge stimmt: Preise ab 1 Stück.
- Bei FLEX zum Shoppreis von 29,90 € ist der Einkauf mit ca. 4,50 € plus Versand und Zoll sehr gut. Bei FLEX ist das Risiko am kleinsten, weil er das Produkt schon fertig hat.
- 90 Gummies à ca. 2,2 g heißt wohl 3 Gummies pro Tag. Das klärt unsere Frage nach 1,5 g pro Gummy: einfach 3 am Tag. Shop und Etikett müssten dann von 60 auf 90 Stück.
- Die Lieferzeit ist 14 Tage Produktion bis 500 Stück, nicht 7 Tage. Die 7 Tage sind vermutlich nur der Versand.
- Zertifikate hat er auf Alibaba hochgeladen. Ein Vegan-Zertifikat steht nicht in der Liste, nur Halal. Die Mail fragt nur noch danach.
- Der Laden ist jung und hat wenige Bewertungen. Deshalb über Alibaba bezahlen (Trade Assurance mit Geld-zurück-Garantie), nicht per Überweisung außerhalb.
- Die Preise gelten für sein Standardprodukt. Ob eigene Dose, farbiger Deckel und Etikett extra kosten, fragt die Mail.

## 2. Antwort auswerten

**Muss (sonst Plan B):**

- Muster aller vier Sorten plus Dose und Etikett, Lieferung nach Deutschland in ca. 7–10 Tagen.
- Wirklich keine Mindestmenge (oder höchstens ca. 100–300 Dosen je Sorte).
- Dose matt in Sortenfarbe, Deckel in Sortenfarbe, Metallic-Effekt möglich.
- Vegan, Halal, ISO/GMP mit Kopien der Zertifikate.
- Analysezertifikat (CoA) je Charge.

**Gut zu haben:**

- Eigene Bärenform.
- Multipack-Box und Karten aus einer Hand.
- Versand DDP, also Zoll und Einfuhrumsatzsteuer im Preis.
- Zahlung mit kleiner Anzahlung, Rest vor Versand. Das passt zum Vorbestellmodell: Kundengeld kommt vor der Produktion rein.

**Preise einordnen:** Verkaufspreis im Shop 24,90–29,90 € (Abo 20 % darunter). Damit Creator-Provisionen und Black-Friday-Rabatte drin sind, sollte eine fertige Dose inkl. Versand nach Deutschland unter ca. 6–7 € liegen. Teurer als andere ist okay, solange das Muster überzeugt und die Menge klein bleibt.

---

## 3. Plan B: Sublify + eigene Außenbox

So wie besprochen:

- Gummies kommen fertig in der Standarddose von Sublify. Nur das Etikett ist von uns.
- Bei einem Kartonhersteller etwas größere Außenboxen bestellen (Druck außen und innen, Inlay).
- In die Box: die Sublify-Dose als „Nachfüller“, eine Karte zum jeweiligen Charakter, ein kleines Geschenk.

**Was dafür spricht:** Schnell verfügbar, kein Risiko mit Import und Zoll, keine Mindestmenge.

**Was dagegen spricht:**

- Die Dose sieht nicht aus wie auf den Packshots. Shop, Ads und alle Creator-Inhalte zeigen dann ein anderes Produkt als das, was ankommt. Das kostet Vertrauen, sorgt für Rückfragen und Retouren, und wir müssten alle Produktbilder neu machen.
- Doppelte Lieferkette: Sublify plus Kartonhersteller plus Karten plus Geschenke. Jede Bestellung muss von Hand gepackt werden, also kein reiner Dropshipping-Versand mehr.
- Die Box kostet extra (grob 1,50–4 € je Box bei kleinen Mengen, plus Inlay und Karte) und macht den Versand größer und teurer.
- „Box mit Nachfüller drin“ ist ein Kompromiss, den man beim Auspacken sieht. Genau das stört dich ja schon.

---

## 4. Empfehlung und Alternativen

### Empfehlung: Plan A

Plan A ist die einzige Option, bei der das Produkt so aussieht wie unsere Marke. Der ganze Black-Friday-Plan lebt von den Bildern (Packshots, Charaktere, Creator-Videos, KI-Avatare mit Produkt). Wenn die Dose anders aussieht, arbeitet jedes Stück Content gegen uns.

Der höhere Stückpreis ist ohne Mindestmenge tragbar: Wir produzieren nur, was vorbestellt ist. Das Risiko liegt bei Muster-Qualität und Lieferzeit, und beides prüfen wir mit den Mustern, bevor Geld in Produktion fließt.

Reihenfolge laut Vorbestellplan: DAILY und FLEX zuerst, GLOW nach der Biotin-Entscheidung, SNOOZY erst wenn die Melatonin-Frage geklärt ist. Muster trotzdem für alle vier bestellen, das kostet wenig und spart später eine Runde.

### Wenn Plan A nicht klappt: B+ statt B

Bevor wir Plan B mit Box-Umweg machen, lohnt sich ein Zwischenweg:

- **Andere OEM-Hersteller mit niedriger Mindestmenge** auf Alibaba gezielt suchen: Filter „Customization: Customized packaging“, „Verified Supplier“, Zertifikate vegan/Halal/GMP, MOQ ≤ 500. Die Nachricht oben funktioniert für jeden davon unverändert. Drei Anfragen parallel geben einen Preisvergleich.
- **Sublify, aber mit passender Optik:** Fragen, ob Sublify eine Dose in Weiß oder einer Farbe hat, die wir mit einem vollflächigen, matten Rundum-Etikett in Sortenfarbe bekleben können. Dann kommt man den Packshots deutlich näher als mit dem Standard-Etikett, ganz ohne Außenbox. Danach die Packshots ehrlich an die echte Dose anpassen.
- **Außenbox nur für Bundles und Creator-Pakete:** Die Multipack-Box (2 oder 4 Dosen, Karte, kleines Geschenk) brauchen wir in jedem Plan für „Die ganze Crew“, „Morgen & Abend“ und das Creator-Seeding. Einzelne Dosen gehen ohne Box raus. So bleibt der Packaufwand klein. Anbieter mit kleinen Mengen ab ca. 30–100 Stück: z. B. Packhelp oder Packiro (Preise dort direkt im Konfigurator).

### Charakter-Karte und Geschenk

Wie du sagst: Das geht in jedem Plan und braucht kein eigenes Setup. Vorschlag: eine Karte pro Bär (Vorderseite Charakter, Rückseite Einnahme und QR-Code zum Abo), gedruckt bei einer normalen Online-Druckerei. Das Geschenk erst festlegen, wenn die Stückpreise stehen.

---

## 5. Muster-Check (wenn die Muster da sind)

- Optik neben den Packshots fotografieren: Farbe von Dose und Deckel, Mattheit, Metallic, Logo.
- Passen 60 Gummies gut in die Dose (nicht halb leer, nicht gequetscht)? Besonders FLEX, da Kreatin-Gummies größer sind.
- Geschmack, Konsistenz, Kleben die Gummies nach ein paar Tagen bei Zimmertemperatur?
- CoA der Musterchargen gegen unsere Mengen pro Tagesdosis prüfen.
- Gute Fotos und Videos vom Auspacken direkt für Content nutzen.
- Danach: Druckfreigabe (Proof) und erste kleine Charge je Sorte nach Vorbestellungen.
