/* bärly – Verpackungs-Spezifikation
   Ergebnis aus Recherche (Formate, Material, Recht), vier Konzepten, Bewertung und Faktencheck.
   Alle Maße und Kosten sind Richtwerte, bis Füllversuch und Lieferantenangebote vorliegen. */

window.Baerly.SPEC = {
  title: 'Eine Dose. Danach nur noch Briefe.',

  reco: [
    'Die vier Launch-Sorten kommen in einer matten, undurchsichtigen Dose in der Sortenfarbe mit glattem Schraubdeckel ohne Symbol. Vorne stehen nur das große weiße bärly-Logo, der Produktname, die Kategorie und feine Metallic-Akzente. Erwachsene bekommen die Dose einmal, im Abo gratis. Danach kommt alle 30 Tage ein flacher Nachfüller als Großbrief durch den Briefkasten.',
    'Der Charakter ist nicht groß auf der Front. Er sitzt auf der Seite der Dose und lebt in eigens produzierten Lifestyle- und Character-Bildern. So wirkt die Packung erwachsen, clean und hochwertig, und die Bären bleiben die Marke dahinter.',
    'Tütchen gibt es erst später, bei bärly kids und Zap als versiegelte Tagesportion. Jede Packung reicht genau 30 Tage. Damit fällt „zu viel Vorrat“ als Kündigungsgrund weg.'
  ],

  formats: [
    {
      key: 'can', role: 'Starter · bleibt beim Kunden',
      name: 'bärly-Dose & Dose Groß',
      contents: 'Leere Dose in der Sortenfarbe, daneben der erste Nachfüller und eine Karte mit QR-Code zum Abo-Portal.',
      size: 'Ø 70 mm. Standard: Körper 100 mm, ca. 330 ml Nutzvolumen (brutto ca. 385 ml) für Glow, Snoozy und Daily. Groß: 150 mm, ca. 500 ml nutzbar, für Flex (60 Gummis à 4,5 g brauchen ca. 450–480 ml Schüttvolumen). Front bei beiden gleich, nur der Körper ist höher.',
      material: 'Matte, undurchsichtige Dose in der Sortenfarbe, glatter Schraubdeckel ohne Symbol, feine Metallic-Akzente (Linie unter dem Produktnamen, leichter Schimmer). Umsetzung zum Start: Lager-Weithalsdose (Alu oder PP) mit vollflächigem Matt-Etikett inkl. Metallic-Effekt, Lagerdeckel aus PP. Deckel in Sortenfarbe ist eine Lieferantenfrage (siehe unten).',
      closure: 'Weithals ≥ 55 mm, Schraubdeckel. Kein Induktionssiegel, kein Trockenmittel: Die Frische bleibt im versiegelten Nachfüller. Am Boden ein Feld für den MHD-Sticker vom Beutel.',
      who: 'Launch-Crew: Glow, Snoozy, Daily (Standard), Flex (Groß). Später Mags, Sunny, Dew, Shield, Brainy im selben System. Nicht für Kids, Zap und Buff.',
      price: 'Im Abo gratis (Kosten ca. 1,50–2,80 €, Schätzung). Einmalkauf zum vollen Sortenpreis inkl. Dose. Zweite Dose 4,90 €, zweite Sorte im Abo bringt ihre Dose gratis mit. Starter-Set als DHL Kleinpaket.'
    },
    {
      key: 'refill', role: 'Monats-Nachschub · das eigentliche Produkt',
      name: 'Nachfüller M / L',
      contents: 'M: 60 Fruchtgummis ≈ 180 g (Glow, Snoozy, Daily). L: 60 Fruchtgummis à 4,5 g ≈ 270 g (Flex). Jeder Beutel reicht 30 Tage. Später S (30 Stück) für 1-am-Tag-Sorten.',
      size: 'Flacher Dreirandsiegelbeutel. M 165 × 235 mm, L 190 × 260 mm, gefüllt höchstens 20 mm. Versand im Papierumschlag als Großbrief (2026: max. 353 × 250 × 20 mm, 500 g).',
      material: 'Mono-PE-Barrierelaminat (MDO-PE/PE, EVOH ≤ 5 % oder AlOx), 100–120 µm, weiß-opak als Lichtschutz, bedruckt im Look der Dose. Ziel: WVTR ≤ 1 g/m²·d (38 °C/90 % r. F.), OTR ≤ 2 cm³/m²·d·bar, auch nach Knickbelastung. Digitaldruck ab 250 Stück je Motiv.',
      closure: 'Reißkerben, PE-Druckzipper, Ausgießecke, Briefkasten-Stempel. Abziehbarer MHD- und Los-Sticker für den Dosenboden. 15 × 15 mm frei für das EU-Sortierlabel.',
      who: 'Alle Erwachsenen-Abos ab Monat 2, Kunden mit Dose und Kunden ohne Dose (der Beutel funktioniert auch allein).',
      price: 'Abo: 20 % unter dem Nachfüller-Preis, Dose in der ersten Lieferung ohne Aufpreis, Versand gratis. „Nur Nachfüller“: Sortenpreis −2 €. 3er-Vorrat nur einmalig, mindestens −10 % (auf x,90 € abgerundet), nie als Abo-Standard. Beauty Sleep (Glow + Snoozy) als Doppelbrief 44,90 €, die ganze Crew 89,90 €.'
    },
    {
      key: 'tuetchen', role: 'Versiegelte Tagesportion',
      name: 'Tagestütchen S (Ohren-Tütchen)',
      contents: '1 Fruchtgummi pro Tütchen (Kids ≈ 2,5 g, Zap ≈ 3 g). Später das Schul-Duo-Tütchen mit Kiko + Juno (eigene BVL-Anzeige).',
      size: '50 × 70 mm inkl. 10 mm Ohrenzone, gefüllt ca. 7 mm, ca. 0,6 g Folie.',
      material: 'Mono-PE-Barriere, 80 µm, weiß-opak, mit beschreibbarem Mattfeld. Vorgefertigte Formbeutel, vom Co-Packer gezählt befüllt.',
      closure: 'Reißkerbe seitlich unten, Ohren bleiben dran. Mindestaufdruck: Name, „Nahrungsergänzungsmittel“, „1 Tütchen = Tagesportion“, „Nicht mehr als 1 Tütchen pro Tag“, Los/MHD, QR-Code. Kids: „Für: ____“. Zap: „Enthält Koffein · 80 mg · 18+“.',
      who: 'Später: Kiko und Juno (bärly kids), Zap, Splash als Sporttag-Tütchen. Nicht Teil des Launchs.',
      price: 'Nicht einzeln verkauft. Ca. 0,10–0,18 € je Tütchen inkl. Füllung (Schätzung).'
    },
    {
      key: 'box', role: 'Starter für Kids und Zap · bleibt bei den Eltern',
      name: 'Tütchen-Box',
      contents: '30 Tagestütchen stehend in 2 Reihen. Kids zusätzlich: Elternkarte mit Dosis, Alter, Gesamtmenge Eisen bzw. Vitamin D pro Packung und Abhakplan im Deckel.',
      size: 'Aufgerichtet 112 × 108 × 90 mm, Front 112 × 90 mm mit gestanzten Ohren. Crash-Lock-Boden: geht flach in den Versand (ca. 20–24 mm, 150 g).',
      material: 'Faltschachtel GC1/SBS, 350–380 g/m², mineralölfreie Farben, kein Fenster, keine Kaschierung. Eine Stanzform für alle Kids-Sorten und Zap.',
      closure: 'Stecklasche, Entnahme von oben. Kids-Front: „Vorrat zu den Eltern – nur das Tütchen geht mit.“ Zap-Front: Tintenfond, 18+, Koffeinhinweis im Pflichtband.',
      who: 'Später: Eltern von 4–12-Jährigen (bärly kids, Warteliste läuft), Zap-Kunden (nur Erwachsene). Zap erscheint nie neben Kids-Produkten.',
      price: 'Kiko, Juno, Zap: 19,90 € für 30 Tage, Abo 15,92 €, Box in der ersten Bestellung enthalten. Schul-Duo 34,90 €, Abo 27,92 €.'
    },
    {
      key: 'letter', role: 'Monats-Nachschub für die Box',
      name: 'Tütchen-Nachfüllbrief',
      contents: '30 lose Tagestütchen im Papierumschlag, ohne Karton und ohne Kunststoff-Überbeutel.',
      size: 'C4-Umschlag, 2 Lagen à 16 Tütchen, ≤ 20 mm, ca. 110–125 g, Großbrief.',
      material: 'Recyclingpapier, digital bedrucktes Etikett mit der vollständigen Kennzeichnung der Sammelpackung („30 Tagestütchen à 1 Fruchtgummi = 75 g“).',
      closure: 'Selbstklebeklappe mit Aufreißfaden. Innen: „Ab in die Box. 1 Tütchen pro Tag. Nicht mehr.“',
      who: 'Kids- und Zap-Abos ab Monat 2.',
      price: 'Abo 15,92 €, versandkostenfrei. Ferien-Pause im Portal.'
    },
    {
      key: 'trial', role: 'Testkauf für Ads und skeptische Eltern',
      name: 'Probierwoche',
      contents: 'Probierbeutel mit 7 Tagesportionen (14 Fruchtgummis) im Look der Dose. Später für Kids: 7 Tagestütchen in einer Kartonhülle. Gutschein-Code auf der Rückseite.',
      size: 'Probierbeutel 100 × 140 mm, ≤ 12 mm, im C5-Umschlag. Kids-Hülle ca. 210 × 150 × 10 mm. Beides als Großbrief.',
      material: 'Derselbe Mono-PE-Digitaldruckbeutel wie der Nachfüller; Kids-Hülle aus Recyclingkarton.',
      closure: 'Reißkerbe, kein Zipper. QR-Code: „Abo starten – deine Probierwoche wird angerechnet“. Es startet kein Abo automatisch.',
      who: 'Kalter Traffic aus Social Ads, Eltern, die testen wollen, ob ihr Kind die Gummis mag.',
      price: 'Erwachsene 5,90 €, Kids 4,90 € inkl. Versand, voll angerechnet auf das erste Abo innerhalb von 30 Tagen.'
    },
    {
      key: 'stack', role: 'Später · Grüns-Ritual und Protein',
      name: 'Tütchen M: Tages-Stacks und Protein-Portionen',
      contents: 'Tages-Stacks aus der Crew (Morgen: Daily 2 + Glow 2, Gym: Daily 2 + Flex 2; Snoozy bleibt wegen der Abend-Einnahme allein). Später Buff: 5 Fruchtgummis = 10 g Protein pro Tütchen, 10 pro Brief.',
      size: '75 × 105 mm inkl. Ohrenzone, ≤ 12 mm, ca. 1,2 g Folie.',
      material: 'Mono-PE-Barriere. Buff mit Antihaft-Beschichtung, weil Gelatine ab ca. 35 °C weich wird.',
      closure: 'Ohrenkontur, Reißkerbe, Köpfe der enthaltenen Bären, „Daily ×2 · Glow ×2“, Tatzen-Dosis.',
      who: 'Abos mit 2+ Sorten, Reisende, Fitness-Kunden nach dem Training.',
      price: 'Stack: Summe der Abo-Preise ohne Extra-Rabatt. Buff: 12,90 € für 10 Portionen, Abo 10,32 €. Jede Kombination braucht eine eigene BVL-Anzeige.'
    }
  ],

  /* Vorderseite der Bärendose, in Lesereihenfolge. x/y in Prozent der Zeichnung */
  zones: [
    { label: 'Sortenfarbe', detail: 'Die ganze Dose matt und undurchsichtig in der Farbe der Sorte: Rosa, Blau, Lila, Gold-Gelb. Sie wird im Thumbnail zuerst erkannt.', x: 10, y: 50 },
    { label: 'Wortmarke bärly', detail: 'Groß und weiß, das wichtigste Element auf der Front.', x: 88, y: 39 },
    { label: 'Produktname', detail: 'GLOW, FLEX, SNOOZY, DAILY in der Tieffarbe der Sorte, gesperrt. Gilt rechtlich als Gesundheitsbezug und braucht eine zugelassene Angabe auf derselben Packung.', x: 88, y: 56 },
    { label: 'Metallic-Akzent', detail: 'Feine Linie unter dem Produktnamen und ein leichter Schimmer im Mattlack. Roségold, Silber, Flieder-Silber, Gold.', x: 64, y: 61 },
    { label: 'Kategorie und Nährstoffe', detail: 'BEAUTY · KREATIN · SLEEP · MULTIVITAMIN GUMMIES, darunter die Hauptnährstoffe.', x: 10, y: 66 },
    { label: 'Stückzahl, Sorte, Dosis', detail: '„60 Gummies · Himbeere“ und „2 Gummies täglich“ (Snoozy: „am Abend“). Die Dosis steht vorne, wie es das HEY-SUNSHINE-Urteil nahelegt.', x: 10, y: 84 },
    { label: 'Pflichtzeile', detail: '„Nahrungsergänzungsmittel mit … · 60 Fruchtgummis = 180 g“: Bezeichnung und Füllmenge im selben Sichtfeld, x-Höhe ≥ 1,2 mm. Bei Snoozy steht der Warnhinweis direkt darüber.', x: 90, y: 90 },
    { label: 'Schraubdeckel', detail: 'Glatt, in Sortenfarbe, ohne Symbol und ohne Prägung.', x: 50, y: 9 }
  ],

  devices: [
    { name: 'Charakter auf der Seite', detail: 'Glow, Flex, Snoozy und Daily sitzen auf der Seitenfläche der Dose. Wer die Dose dreht, entdeckt den Bären; die Front bleibt clean.' },
    { name: 'Eigene Bildwelt', detail: 'Produktfotos, Character-Renderings und Lifestyle-Bilder werden separat produziert (siehe assets/ASSETS.md), nie aus Moodboards ausgeschnitten.' },
    { name: 'Briefkasten-Stempel', detail: '„Passt durch den Briefkasten · max. 2 cm“ auf jedem Nachfüller. Ein nachprüfbarer Nutzen, keine Umweltaussage.' },
    { name: 'Same Bears. Better Days.', detail: 'Claim auf Rückseite, Beipackkarte und Versandumschlag.' }
  ],

  modes: [
    { id: 'glow', label: 'Launch-Crew', text: 'Matte Sortenfarbe vollflächig, großes weißes bärly, Produktname in Tieffarbe, feine Metallic-Akzente. Der Bär sitzt auf der Seite und lebt in eigenen Lifestyle-Bildern.' },
    { id: 'kiko', label: 'bärly kids (später)', text: 'Cremeweiß, Farbe nur im Kopfband und in den Ohren, ruhiger Bär ohne Glanz. Größtes Element ist das Tages-Siegel. Texte nur an Eltern.' },
    { id: 'zap', label: 'Zap · 18+ (später)', text: 'Tinte vollflächig, ESPRESSO und Blitz in Gelb, Bär nur als Umriss. Koffeinhinweis neben der Bezeichnung. Nie neben Kids-Produkten.' }
  ],

  sizes: [
    { product: 'Glow · 2/Tag', can: 'Dose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M, 60 Stück, Großbrief', sachet: 'Später: Morgen-Stack mit Daily' },
    { product: 'Flex · 2/Tag', can: 'Dose Groß, 60 × 4,5 g ≈ 270 g', refill: 'Nachfüller L, 60 Stück, Großbrief', sachet: 'Später: Gym-Stack mit Daily' },
    { product: 'Snoozy · 2 am Abend', can: 'Dose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M, 60 Stück, Großbrief', sachet: 'Kein Stack (Abend-Einnahme, Melatonin)' },
    { product: 'Daily · 2/Tag', can: 'Dose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M, 60 Stück, Großbrief', sachet: 'Später: Morgen- und Gym-Stack' },
    { product: 'Später: Mags, Sunny, Dew, Shield, Brainy', can: 'Dose bzw. Dose Groß, gleiche Front', refill: 'Nachfüller S, M oder L', sachet: 'Nie Sunny mit Daily oder Shield (Vitamin D), nie Glow + Shield (Zink)' },
    { product: 'Später: Zap · 18+', can: 'Keine Dose: Zap-Box mit 30 Tütchen', refill: 'Tütchen-Nachfüllbrief', sachet: 'Tütchen S, 80 mg Koffein' },
    { product: 'Später: Kiko, Juno', can: 'Tütchen-Box, 30 Tütchen', refill: 'Tütchen-Nachfüllbrief', sachet: 'Tütchen S mit Namensfeld' },
    { product: 'Später: Splash, Buff', can: 'Keine Dose', refill: '10 Sporttag-Tütchen bzw. 10 Protein-Portionen', sachet: 'Tütchen S bzw. Tütchen M' }
  ],

  rules: {
    front: [
      'Bezeichnung „Nahrungsergänzungsmittel mit <Nährstoffen>“ (bei Süßungsmitteln ergänzt um „mit Süßungsmitteln“) im selben Sichtfeld wie die Füllmenge (LMIV Art. 13(5), NemV §4).',
      'Füllmenge nach Gewicht plus Stückzahl: „60 Fruchtgummis = 180 g“. Bei Boxen und Briefen Anzahl der Tütchen und Gesamtgewicht (BVerwG 3 C 15.21).',
      'Tagesdosis vorne: „2 Gummies täglich“ bzw. „am Abend“. Nicht zwingend, nach dem Urteil HEY SUNSHINE (LG München I) aber praktisch Pflicht.',
      'Zu jedem Produktnamen mit Gesundheitsbezug (GLOW, FLEX, SNOOZY, DAILY) eine zugelassene Angabe mit * auf derselben Packung (HCVO Art. 1(3), 10(3)). Kids nur mit Art.-14-Wortlaut. Zap hat keinen zugelassenen Claim, nur Fakten.',
      'Nur Snoozy: „Nur für Erwachsene. Nicht für Kinder, Schwangere und Stillende. Nicht vor dem Autofahren einnehmen.“ gut sichtbar. Ob Melatonin-Gummis in Deutschland als Lebensmittel durchgehen, vorab klären.',
      'Nur Zap: „Enthält Koffein. Für Kinder und schwangere Frauen nicht empfohlen. (80 mg Koffein pro Tagesportion)“ neben der Bezeichnung, dazu 18+.',
      'Nur Kids: „Für Kinder von 4–12 Jahren“, alle Texte an die Eltern (UWG Anhang Nr. 28).',
      'Alle Pflichtangaben mit x-Höhe ≥ 1,2 mm, Tinte auf hellem Feld, nie auf einer Illustration.'
    ],
    back: [
      'Empfohlene tägliche Verzehrsmenge in Portionen und die Menge jedes Nährstoffs pro Tagesdosis, bei Vitaminen und Mineralstoffen mit % NRV.',
      '„Die angegebene empfohlene tägliche Verzehrsmenge darf nicht überschritten werden.“',
      '„Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung.“',
      '„Außerhalb der Reichweite von kleinen Kindern aufbewahren.“',
      'Satz nach Art. 10(2) HCVO plus Verzehrbedingung zum * (Flex: 3 g Kreatin pro Tag; Snoozy: 1 mg Melatonin kurz vor dem Schlafengehen).',
      'Zutatenliste mit hervorgehobenen Allergenen. Keine Azofarbstoffe. Rückseite in den Frames: Nährwerttabelle, Icons vegan / ohne künstliche Farbstoffe / zuckerreduziert (nur mit Nachweis), Barcode.',
      'MHD und Los, Lagerhinweis, Anschrift des Lebensmittelunternehmers, QR-Code zur Online-Kennzeichnung.',
      '15 × 15 mm frei für das EU-Sortierlabel. Entsorgungshinweis erst nach dem Recyclinggutachten.',
      'Alle Angaben auch als HTML auf der Produktseite vor dem Checkout (LMIV Art. 14) und Grundpreis pro kg (PAngV).'
    ],
    allowed: [
      '„Die bärly-Dose – zum Behalten und Nachfüllen.“',
      '„Nachschub kommt als Brief – ohne Versandkarton.“ (wenn wirklich nur Papierumschlag)',
      '„Passt durch den Briefkasten (max. 2 cm).“ (jede Charge mit 20-mm-Lehre geprüft)',
      '„Nachfüllen statt neu kaufen: ca. 8 g statt ca. 40 g Verpackung*“ – nur mit eigener Wägung und genannter Vergleichsbasis.',
      '„Beutel aus Mono-PE – recycelbar. Leer in den Gelben Sack.“ – erst mit Recyclinggutachten für genau dieses Laminat.',
      '„Umschlag aus Papier – ins Altpapier.“ / „Box aus Karton – ins Altpapier.“',
      '„Einzeln versiegelt – jede Tagesportion bleibt bis zum Öffnen geschützt.“ – nur mit Stabilitätsdaten.'
    ],
    forbidden: [
      'nachhaltig, umweltfreundlich, grün, öko, klimaneutral, CO₂-sparend (seit 27.09.2026 ohne Nachweis abmahnfähig)',
      'kompostierbar, biologisch abbaubar – in Deutschland ohnehin kein Entsorgungsvorteil',
      'plastikfrei, Zero Waste, 100 % recycelbar, Kreislauf-Verpackung',
      'PFAS-frei (gesetzliche Pflicht seit 12.08.2026, Werbung mit Selbstverständlichkeiten ist unlauter)',
      'Mehrweg für die bärly-Dose (sie ist kein rechtliches Mehrwegsystem)',
      'eigene Öko-Siegel, Blatt- oder Planet-Icons',
      'kindersicher – nur mit Prüfung nach ISO 8317 (Dose) bzw. EN 862 (Tütchen) für die konkrete Packung',
      'Koffein-Wirkaussagen (wach, Fokus, Konzentration): Die Claims wurden 2016 vom EU-Parlament abgelehnt.',
      'Kids: Snack, naschen, lecker, Süßigkeit, Belohnung, „statt Gummibärchen“, Aufforderungen an Kinder'
    ]
  },

  launch: [
    'Phase 0 (bis Dezember 2026): 30-Tage-Regel für alle Formate festlegen. Dose wird leer geliefert, der Hersteller füllt nur Beutel. Stückgewichte festschreiben (Glow, Snoozy, Daily ≈ 3 g, Flex ≈ 4,5 g).',
    'Rezepturen der Crew gemeinsam prüfen: Zusammen nicht über den BfR-Höchstmengen (Zink 6,5 mg = Glow 5 + Daily 1,5; Vitamin B6 3,5 mg = Flex 0,7 + Snoozy 1,4 + Daily 1,4; Vitamin D 10 µg). Deshalb hat Flex kein Zink, anders als im Frame.',
    'Füllversuch mit echten Gummis in Dosen- und Beutelmustern; Dicke mit 20-mm-Schlitzlehre, Gewicht pro Brief. Danach alle Maße hier ersetzen.',
    'Stabilitätsstudie 40 °C/75 % r. F. (3 Monate) und 25 °C/60 % in 2–3 Kandidatenfolien. Vitamin C, D3, Biotin, Melatonin und Kreatin zuerst; Kreatin am Ende der Haltbarkeit analysieren.',
    'Recht und Register: Claims-Review der Produktnamen, Melatonin-Einstufung, BVL-Anzeige je Sorte, LUCID-Registrierung und Systembeteiligung (VerpackDG), Recyclinggutachten, Konformitäts- und PFAS-Erklärungen.',
    'Launch (Q1 2027): Glow, Flex, Snoozy, Daily in Dose + Nachfüller, Bundles Beauty Sleep und Crew, Probierwoche. Social-Content startet vier Wochen vorher (siehe content.html).',
    'Danach: weitere Bären nach Founders-Club-Abstimmung (Omega-3, Kollagen, D3 + K2), 3er-Vorrat, Tages-Stacks.',
    'bärly kids (später, Warteliste läuft): Kiko und Juno in der Tütchen-Box, Schul-Duo; Splash als Sporttag-Tütchen.'
  ],

  questions: [
    'Dose: Gibt es matte, undurchsichtige Lagerdosen (Alu oder PP, Ø 66–72 mm, 330 und 500 ml mit gleichem Gewinde) mit glattem Schraubdeckel? Deckel in Sortenfarbe ab welcher Menge (Schätzung: 5.000–10.000 je Farbe)? Matt-Etikett mit Metallic-Effekt im Digitaldruck?',
    'Gummi-Hersteller Flex: Schafft ihr 1,5 g Kreatin (≈ 1,7 g Kreatin-Monohydrat) pro Gummy (4,5 g) stabil? Sonst 3 Gummies à 1 g Kreatin pro Tag (90 Stück, Nachfüller L), wie MORE.',
    'Etikettendrucker: Matte Vollflächen-Etiketten mit Metallic-Schwüngen im Digitaldruck ab 500 je Sorte? Halten sie im Bad und in der Spülmaschine nicht, dann Hinweis „nur von Hand spülen“.',
    'Beutelhersteller: Welches Mono-PE-Laminat schafft WVTR ≤ 1 und OTR ≤ 2, auch nach Gelbo-Flex? Gibt es ein Recyclinggutachten für genau dieses Laminat inkl. Zipper und Farben?',
    'Co-Packer: Vorgefertigte Zipper-Beutel nach Stückzahl füllen, bei ≤ 35–40 % r. F.? Genau 1 Gummi pro Tütchen zählen? Los/MHD per Inkjet?',
    'Gummi-Hersteller: Mindestmenge je Sorte (Spanne laut Markt 1.000–30.000), Vorlauf, Stabilitätsdaten in Mono-PE, Overages für Vitamin C, D3 und Biotin, Melatonin- und Kreatin-Analysen am MHD.',
    'Deutsche Post/DHL: Preise 2027 für Großbrief (30 mm, 1.000 g) und Kleinpaket? Grenzen für Kissenbeutel in Sortiermaschinen?',
    'Duales System: Gilt die leer verkaufte bärly-Dose als Verpackung? Welche Materialfraktionen sind zu melden?'
  ],

  risks: [
    'Melatonin: In Deutschland ist die Abgrenzung zwischen Lebensmittel und Arzneimittel bei Melatonin umstritten. Snoozy erst nach rechtlicher Prüfung launchen; Plan B ist ein Schlaf-Bär ohne Melatonin (z. B. Magnesium + B6), dann aber ohne Einschlaf-Claim.',
    'Snoozy: Charakter und Produkt heißen jetzt gleich. Ein Referenzbild zeigt „Snooze Sleep Gummies“ mit Baldrian; Baldrian nur aufnehmen, wenn er wirklich in der Rezeptur ist.',
    'Barriere: Mono-PE über 18–24 Monate ist weniger erprobt als PET/Alu. Ritual hat Nachfüllbeutel wegen Stabilität verworfen. Erst echte Daten, dann Werte drucken.',
    'Hitze im Briefkanal: Gummis können im Sommer verkleben. Pektinbasis, Antihaft-Beschichtung, Versand Mo–Mi, Ersatzversprechen.',
    'Briefe haben nur Basis-Tracking (Start- und Zielscan) und keine Haftung. Nachsendequote von ca. 1–2 % einplanen; Starter-Sets immer mit Sendungsverfolgung.',
    'Kids-Linie (später): Verbraucherzentrale und Giftnotruf kritisieren bonbonähnliche Kinder-NEM. Nach DGE-Werten dosieren, Gesamtmengen pro Packung niedrig halten, nur an Eltern schreiben, nie Kinder in Episoden direkt ansprechen.',
    'Produktnamen und Bärennamen gelten als Gesundheitsangaben. GLOW, FLEX, SNOOZY und DAILY nur mit passendem Claim auf derselben Packung; dasselbe gilt für Captions in Episoden.',
    'Flex: Ohne Kreatin-Analysen am Ende der Haltbarkeit ist „3 g pro Tag“ ein Haftungsrisiko. Bei einem NOW-Test 2024 verfehlte fast die Hälfte von 12 Kreatin-Gummis die Deklaration, 3 enthielten kaum Kreatin.',
    'Folie pro Gummi bei Kids und Zap ca. 20 % des Produktgewichts. Ehrlich mit Sicherheit begründen, nie als Umweltvorteil.',
    'Porto: Gegenüber dem DHL Kleinpaket (2026 ca. 3,80–4,00 €) spart der Brief realistisch ca. 18–26 € pro Abonnent und Jahr, nicht 30 €.'
  ],

  decision: {
    title: 'Entschieden: Gummis in Bärenform, Bär nicht auf der Front',
    text: 'Eure Frames zeigen Gummibärchen in der Sortenfarbe, also bleibt es bei der Bärenform. Das Risiko kommt aus dem Urteil HEY SUNSHINE (LG München I, 2021): Vitamin-D-Gummibärchen mit Cartoon-Bär wurden als irreführend verboten, weil sie wie Süßigkeiten wirkten und die Dosis nicht klar war. Gegenmittel: Die Vorderseite bleibt erwachsen (Farbe, Wortmarke, Produktname), die Tagesdosis steht vorne drauf, der Bär sitzt nur auf der Seite und in eigenen Bildern, und es gibt keine Kids-Ansprache bei der Crew. Vor dem Druck von einer Lebensmittelrechts-Kanzlei prüfen lassen.'
  },

  sources: [
    { check: 'ok', claim: 'Melatonin-Claim (VO 432/2012): Verkürzung der Einschlafzeit bei 1 mg kurz vor dem Schlafengehen.', url: 'https://ec.europa.eu/food/food-feed-portal/screen/health-claims/eu-register' },
    { check: 'est', claim: 'Melatonin in NEM: Einstufung in Deutschland uneinheitlich, vor Launch rechtlich prüfen.', url: '' },
    { check: 'ok', claim: 'BfR-Höchstmengen-Vorschläge für NEM: Zink 6,5 mg, Vitamin D 20 µg, Vitamin B6 3,5 mg pro Tag.', url: '' },
    { check: 'ok', claim: 'Grüns: 8 Gummis pro Tagespack, 28 Packs pro Beutel; über 90 % Umsatz aus Abos.', url: 'https://www.shopify.com/case-studies/gruns' },
    { check: 'ok', claim: 'Unilever übernimmt Grüns (April 2026).', url: 'https://www.thefashionlaw.com/in-wellness-bid-unilever-to-acquire-supplement-company-gruns/' },
    { check: 'ok', claim: 'AG1 Essentials Gummies: 30 Packs à 8 Gummis (August 2026).', url: 'https://athletechnews.com/ag1-launches-gummies-entering-a-suddenly-crowded-category/' },
    { check: 'ok', claim: 'Kalender- und Blisterpackungen: Einnahmetreue 63 % → 71 % (Meta-Analyse, Medikamente).', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4562676/' },
    { check: 'est', claim: 'Abo-Churn bei NEM: Richtung belegt (Überbevorratung als Hauptgrund), konkrete Prozentwerte nicht.', url: 'https://changelog.skio.com/blog/why-70-of-supplement-subscribers-churn-after-order-2' },
    { check: 'ok', claim: 'Bears with Benefits: 60 Bären / 150 g für 24,99 €, 1 pro Tag.', url: 'https://www.vitalabo.com/bears-with-benefits/ah-mazing-hair-vitamins' },
    { check: 'ok', claim: 'MORE Creatine Gummies: 60 Gummis = 20 Portionen.', url: 'https://droptime.de/produkt/more-creatine-gummies' },
    { check: 'ok', claim: 'Ritual: keine Nachfüllbeutel, weil Stabilitätstests nicht bestanden.', url: 'https://help.ritual.com/en/articles/8002244-do-you-send-refills-for-your-products' },
    { check: 'fix', claim: 'NOW-Test 2024: Fast die Hälfte von 12 Kreatin-Gummis verfehlte die Deklaration, 3 enthielten kaum Kreatin.', url: 'https://www.supplysidesj.com/supplement-regulations/now-tests-creatine-gummies-finding-almost-half-to-be-severely-understrength-' },
    { check: 'fix', claim: 'Zielbereich Wasseraktivität Gummis ca. 0,50–0,65 (Feuchteaufnahme-Wert aus Quelle nicht belegbar).', url: 'https://aqualab.com/learn/solving-the-water-problem-in-gummies' },
    { check: 'fix', claim: 'Bärendose: 330/500 ml sind Nutzvolumen; brutto ca. 385/577 ml bei Ø 70 mm.', url: '' },
    { check: 'fix', claim: 'Buff: 100 × 5,5 g ≈ 650–765 ml Schüttvolumen.', url: '' },
    { check: 'ok', claim: 'Großbrief 2026: max. 353 × 250 × 20 mm, 500 g, 1,80 €; Maxibrief bis 50 mm, 1.000 g.', url: 'https://www.briefmarkenmesse-essen.de/versenden/porto/' },
    { check: 'ok', claim: 'Ab 01.01.2027: Großbrief bis 30 mm und 1.000 g, Preise noch offen.', url: 'https://www.paketda.de/news-grossbrief-maxibrief-2027.html' },
    { check: 'fix', claim: 'Briefe mit Matrixcode haben Basis-Tracking (Start/Ziel), aber keine Haftung.', url: 'https://www.deutschepost.de/de/hilfe-kontakt.html' },
    { check: 'ok', claim: 'DHL Kleinpaket: max. 35,3 × 25 × 8 cm, 1 kg, mit Sendungsverfolgung.', url: 'https://www.dhl.de/dam/jcr:4327b8ff-926a-4aa1-a1b1-2ef3280d58d1/dhl-kleinpaket-ratecard-1000-de-012025.pdf' },
    { check: 'ok', claim: 'Briefkastenschlitz nach DIN EN 13724: 30–35 mm hoch.', url: 'https://www.hausjournal.net/briefkasten-norm' },
    { check: 'fix', claim: 'BioAbfV ab 01.05.2025: Fremdstoff-Grenzwerte; kompostierbare Verpackungen bringen in Deutschland keinen Entsorgungsvorteil.', url: 'https://www.infranken.de/ratgeber/verbraucher/biomuell-gesetz-kompostierbar-plastik-tueten-umwelt-verpackung-mikroplastik-strafen-tmr-9-art-6126860' },
    { check: 'ok', claim: 'PPWR gilt seit 12.08.2026; PFAS-Verbot für Lebensmittelkontakt-Verpackungen.', url: 'https://foodpackagingforum.org/news/ppwr-pfas-limits-apply-from-august-12' },
    { check: 'ok', claim: 'PPWR ab 2030: nur Recyclingfähigkeitsklassen A–C; E-Commerce max. 50 % Leerraum.', url: 'https://www.greiner-gpi.com/en/Newsroom/Trending%20Topics/Recyclability-of-Packaging-Article-6-of-the-PPWR_s_366841' },
    { check: 'ok', claim: 'ZSVR-Mindeststandard: kleine PE-Folien gelten als recycelbar; EVOH ≤ 5 %.', url: 'https://www.verpackungsregister.org/stiftung-und-behoerde/presse-medienbereich/newsdetail/mindeststandard-2025-veroeffentlicht' },
    { check: 'fix', claim: 'Digitaldruck-Beutel ab 250 Stück; Express = 10 Arbeitstage plus Versand.', url: 'https://www.packaging-warehouse.com/en/category/stand-up-pouches-5' },
    { check: 'fix', claim: 'Individuell bedruckte Dosen: ca. 5.000 (vorhandene Größe), eigene Form 15.000–25.000; Gummi-Lohnhersteller 1.000–30.000 je Sorte.', url: 'https://independentcan.com/resources/faq' },
    { check: 'ok', claim: 'UWG nach EmpCo-Richtlinie seit 27.09.2026: pauschale Umweltaussagen verboten.', url: 'https://coslaw.eu/directive-eu-2024-825-generic-environmental-claims-and-practices-banned-in-the-eu-from-27-september-2026/' },
    { check: 'ok', claim: 'LMIV Art. 13(5): Bezeichnung und Füllmenge im selben Sichtfeld; x-Höhe 1,2 mm.', url: 'https://www.wko.at/oe/handel/lebensmittelhandel/lebensmittelkennzeichnung.pdf' },
    { check: 'ok', claim: 'BVerwG 3 C 15.21: Gesamtgewicht und Anzahl der Einzelpackungen angeben.', url: 'https://www.bverwg.de/de/pm/2023/19' },
    { check: 'ok', claim: 'LG München I, 1 HK O 17003/20 (HEY SUNSHINE): Vitamin-D-Gummibärchen mit Cartoon-Bär irreführend.', url: 'https://www.gesetze-bayern.de/Content/Document/Y-300-Z-GRURRS-B-2021-N-47453?hl=true' },
    { check: 'fix', claim: 'NemV §4: zusätzlich Bezeichnung „Nahrungsergänzungsmittel“ und Nährstoffmengen je Tagesdosis mit % NRV.', url: 'https://www.gesetze-im-internet.de/nemv/__4.html' },
    { check: 'ok', claim: 'HCVO Art. 1(3): Fantasienamen mit Gesundheitsbezug nur zusammen mit zugelassener Angabe.', url: 'https://legislation.gov.uk/eur/2006/1924/article/1/data.html' },
    { check: 'fix', claim: 'Koffein-Claims: 2016 vom EU-Parlament abgelehnt, keiner zugelassen.', url: 'https://www.europarl.europa.eu/news/en/press-room/20160701IPR34496/parliament-vetoes-energy-drink-alertness-claims' },
    { check: 'ok', claim: 'Koffeinhinweis nach LMIV Anhang III Nr. 4.2 im selben Sichtfeld wie die Bezeichnung.', url: 'https://www.bfr.bund.de/fragen-und-antworten/thema/fragen-und-antworten-zu-koffein-und-koffeinhaltigen-lebensmitteln-einschliesslich-energy-drinks/' },
    { check: 'ok', claim: 'Eisenvergiftung: unter 20 mg/kg meist symptomfrei; Kiko-Box 105 mg.', url: 'https://www.msdmanuals.com/professional/injuries-poisoning/poisoning/iron-poisoning' },
    { check: 'fix', claim: 'Kindersicherheit: ISO 8317 (wiederverschließbar), EN 862 (nicht wiederverschließbar, Nicht-Arzneimittel). Keine EU-Pflicht für NEM.', url: 'https://knowledge.bsigroup.com/products/packaging-child-resistant-packaging-requirements-and-testing-procedures-for-non-reclosable-packages-for-non-pharmaceutical-products' },
    { check: 'ok', claim: 'Verbraucherzentrale: 23 von 33 Kinder-NEM überdosiert.', url: 'https://www.verbraucherzentrale.de/aktuelle-meldungen/lebensmittel/nahrungsergaenzungsmittel-fuer-kinder-sind-meist-zu-hoch-dosiert-25949' },
    { check: 'ok', claim: 'UWG Anhang Nr. 28: direkte Kaufaufforderungen an Kinder verboten.', url: 'https://www.omsels.info/die-verbote-oder-was-darf-ich-nicht/schwarze-liste/6-schwarze-liste-nr-28' },
    { check: 'est', claim: 'Verpackungskosten (Dose, Beutel, Tütchen, Box, Stanzen) sind Schätzungen; je Position 2–3 Angebote einholen.', url: '' }
  ]
};
