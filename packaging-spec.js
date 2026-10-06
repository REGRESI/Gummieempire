/* bärly – Verpackungs-Spezifikation
   Ergebnis aus Recherche (Formate, Material, Recht), vier Konzepten, Bewertung und Faktencheck.
   Alle Maße und Kosten sind Richtwerte, bis Füllversuch und Lieferantenangebote vorliegen. */

window.Baerly.SPEC = {
  title: 'Eine Dose. Danach nur noch Briefe.',

  reco: [
    'Wir wählen nicht zwischen Grüns-Tütchen und Dose, sondern geben jedem Format eine Aufgabe. Erwachsene bekommen einmal die Bärendose aus Aluminium, im Abo gratis. Danach kommt alle 30 Tage ein flacher Nachfüller aus Mono-PE als Großbrief durch den Briefkasten. Die Dose ist das Shelfie-Objekt und der Grund, im Abo zu bleiben. Der Beutel ist das eigentliche Produkt, und nur ihn füllt der Hersteller ab.',
    'Tütchen nutzen wir nur dort, wo sie etwas leisten, das eine Dose nicht kann: bei bärly kids und bei Zap (Koffein) als versiegelte Tagesportion, später für Tages-Stacks und Protein-Portionen. Eine offene Dose voller bonbonähnlicher Gummis gibt es für Kinder nie. Bei 1–2 Gummis pro Tag wäre ein Tütchen für alle Erwachsenen-Sorten fast nur Folie: rund 20 % Verpackung aufs Produktgewicht, beim Nachfüller etwa 4–5 %.',
    'Jede Packung reicht genau 30 Tage. Damit fällt „zu viel Vorrat“ als Kündigungsgrund weg. Zum Start brauchst du nur Lagerware und Digitaldruck, also ca. 1–2,5 k€ für Stanzwerkzeuge statt 15–30 k€ für eigene Formen.'
  ],

  formats: [
    {
      key: 'can', role: 'Starter · bleibt beim Kunden',
      name: 'Bärendose & Bärendose Groß',
      contents: 'Leere Alu-Dose mit Wechsel-Banderole und Deckel-Tatze der Sorte, daneben der erste Nachfüller, Charakterkarte mit QR-Code („Bär füttern“-Video, Abo-Portal), kleiner Stickerbogen.',
      size: 'Ø 70 mm. Standard: Körper 100 mm, ca. 330 ml Nutzvolumen (brutto ca. 385 ml). Groß: 150 mm, ca. 500 ml nutzbar (brutto ca. 577 ml). Banderole 72 bzw. 110 mm hoch; als Etikett ohne Überlappung 212 mm lang, mit Überlappung 226–230 mm.',
      material: 'Nahtlose Lager-Alu-Schraubdose mit BPA-NI-Innenlack, gebürstet, ohne Direktdruck. Lagerdeckel Alu oder weißes PP mit PE-Dichteinlage (nie Ruß-Schwarz). Banderole aus weißem PP mit wiederablösbarem Kleber, Ohren gestanzt.',
      closure: 'Weithals ≥ 55 mm, Schraubdeckel. Kein Induktionssiegel, kein Trockenmittel: Die Frische bleibt im versiegelten Nachfüller. Am Boden ein Feld für den MHD-Sticker vom Beutel.',
      who: 'Erwachsene: Mags, Sunny, Glow, Dew, Shield (Standard), Brainy, Flex (Groß). Nicht für Kids, Zap und Buff.',
      price: 'Im Abo gratis (Kosten ca. 1,50–2,80 €). Einmalkauf zum vollen Sortenpreis inkl. Dose. Zweite Dose 4,90 €, zweite Sorte im Abo bringt eine Dose gratis mit. Starter-Set als DHL Kleinpaket.'
    },
    {
      key: 'refill', role: 'Monats-Nachschub · das eigentliche Produkt',
      name: 'Nachfüller S / M / L',
      contents: 'S: 30 Fruchtgummis ≈ 90 g (Sunny). M: 60 ≈ 180 g (Mags, Glow, Shield) bzw. ≈ 210 g (Dew). L: 90 ≈ 270 g (Brainy). Jeder Beutel reicht 30 Tage.',
      size: 'Flacher Dreirandsiegelbeutel. S 130 × 170 mm, M 165 × 235 mm, L 190 × 260 mm, gefüllt höchstens 20 mm (S 15 mm). Versand im Papierumschlag als Großbrief (2026: max. 353 × 250 × 20 mm, 500 g).',
      material: 'Mono-PE-Barrierelaminat (MDO-PE/PE, EVOH ≤ 5 % oder AlOx), 100–120 µm, weiß-opak als Lichtschutz. Ziel: WVTR ≤ 1 g/m²·d (38 °C/90 % r. F.), OTR ≤ 2 cm³/m²·d·bar, auch nach Knickbelastung. Digitaldruck ab 250 Stück je Motiv.',
      closure: 'Reißkerben, PE-Druckzipper, Ausgießecke, Briefkasten-Stempel. Abziehbarer MHD- und Los-Sticker für den Dosenboden. 15 × 15 mm frei für das EU-Sortierlabel.',
      who: 'Alle Erwachsenen-Abos ab Monat 2, Kunden mit Dose und Kunden ohne Dose (der Beutel funktioniert auch allein).',
      price: 'Abo: Sortenpreis −20 %, Versand gratis. „Nur Nachfüller“: Sortenpreis −2 €. 3er-Vorrat nur einmalig −10 %, nie als Abo-Standard. Beauty-Stack (Glow + Dew) als Doppelbrief 44,90 €.'
    },
    {
      key: 'duo', role: 'Monats-Nachschub für Flex',
      name: 'Nachfüller Duo',
      contents: '2 × M à 60 Fruchtgummis (≈ 4 g) = 120 Stück = 30 Tage mit je 3 g Kreatin. Beutel 2 trägt „Tag 16–30 · bleibt bis dahin versiegelt“.',
      size: '2 × 165 × 235 mm nebeneinander, je ≤ 20 mm, zusammen ca. 520–540 g. 2026 als Maxibrief, ab 2027 als Großbrief (bis 30 mm, 1.000 g).',
      material: 'Wie der Nachfüller, mit der besten verfügbaren Feuchtebarriere: In feuchten Gummis zerfällt Kreatin zu Kreatinin.',
      closure: 'Wie der Nachfüller. Front: „120 Fruchtgummis = volle 30 Tage“.',
      who: 'Fitness-Kunden, die MOREs Dose mit 20 Portionen kennen.',
      price: '29,90 € einmalig, Abo 23,92 €.'
    },
    {
      key: 'tuetchen', role: 'Versiegelte Tagesportion',
      name: 'Tagestütchen S (Ohren-Tütchen)',
      contents: '1 Fruchtgummi pro Tütchen (Kids ≈ 2,5 g, Zap ≈ 3 g). Später das Schul-Duo-Tütchen mit Kiko + Juno (eigene BVL-Anzeige).',
      size: '50 × 70 mm inkl. 10 mm Ohrenzone, gefüllt ca. 7 mm, ca. 0,6 g Folie.',
      material: 'Mono-PE-Barriere, 80 µm, weiß-opak, mit beschreibbarem Mattfeld. Vorgefertigte Formbeutel, vom Co-Packer gezählt befüllt.',
      closure: 'Reißkerbe seitlich unten, Ohren bleiben dran. Mindestaufdruck: Name, „Nahrungsergänzungsmittel“, „1 Tütchen = Tagesportion“, „Nicht mehr als 1 Tütchen pro Tag“, Los/MHD, QR-Code. Kids: „Für: ____“. Zap: „Enthält Koffein · 80 mg · 18+“.',
      who: 'Kiko, Juno (Welle 1), Zap (Welle 2), Splash als Sporttag-Tütchen (Welle 3).',
      price: 'Nicht einzeln verkauft. Ca. 0,10–0,18 € je Tütchen inkl. Füllung (Schätzung).'
    },
    {
      key: 'box', role: 'Starter für Kids und Zap · bleibt bei den Eltern',
      name: 'Tütchen-Box',
      contents: '30 Tagestütchen stehend in 2 Reihen. Kids zusätzlich: Elternkarte mit Dosis, Alter, Gesamtmenge Eisen bzw. Vitamin D pro Packung und Abhakplan im Deckel.',
      size: 'Aufgerichtet 112 × 108 × 90 mm, Front 112 × 90 mm mit gestanzten Ohren. Crash-Lock-Boden: geht flach in den Versand (ca. 20–24 mm, 150 g).',
      material: 'Faltschachtel GC1/SBS, 350–380 g/m², mineralölfreie Farben, kein Fenster, keine Kaschierung. Eine Stanzform für alle Kids-Sorten und Zap.',
      closure: 'Stecklasche, Entnahme von oben. Kids-Front: „Vorrat zu den Eltern – nur das Tütchen geht mit.“ Zap-Front: Tintenfond, 18+, Koffeinhinweis im Pflichtband.',
      who: 'Eltern von 4–12-Jährigen, Zap-Kunden (nur Erwachsene). Zap erscheint nie neben Kids-Produkten.',
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
      contents: 'Erwachsene: Probierbeutel mit 7 Tagesportionen. Kids: 7 Tagestütchen in einer Kartonhülle. Gutschein-Code auf der Rückseite.',
      size: 'Probierbeutel 100 × 140 mm, ≤ 12 mm, im C5-Umschlag. Kids-Hülle ca. 210 × 150 × 10 mm. Beides als Großbrief.',
      material: 'Derselbe Mono-PE-Digitaldruckbeutel wie der Nachfüller; Kids-Hülle aus Recyclingkarton.',
      closure: 'Reißkerbe, kein Zipper. QR-Code: „Abo starten – deine Probierwoche wird angerechnet“. Es startet kein Abo automatisch.',
      who: 'Kalter Traffic aus Social Ads, Eltern, die testen wollen, ob ihr Kind die Gummis mag.',
      price: 'Erwachsene 5,90 €, Kids 4,90 € inkl. Versand, voll angerechnet auf das erste Abo innerhalb von 30 Tagen.'
    },
    {
      key: 'stack', role: 'Welle 3 · Grüns-Ritual und Protein',
      name: 'Tütchen M: Tages-Stacks und Protein-Portionen',
      contents: 'Stacks mit festen Kombinationen (Beauty: Glow 2 + Dew 2, Gym: Flex 4 + Mags 2, Fokus: Brainy 3 + Sunny 1). Nie Sunny + Shield (Vitamin D) oder Glow + Shield (Zink). Buff: 5 Fruchtgummis = 10 g Protein pro Tütchen, 10 pro Brief.',
      size: '75 × 105 mm inkl. Ohrenzone, ≤ 12 mm, ca. 1,2 g Folie.',
      material: 'Mono-PE-Barriere. Buff mit Antihaft-Beschichtung, weil Gelatine ab ca. 35 °C weich wird.',
      closure: 'Ohrenkontur, Reißkerbe, Köpfe der enthaltenen Bären, „Glow ×2 · Dew ×2“, Tatzen-Dosis.',
      who: 'Abos mit 2+ Sorten, Reisende, Fitness-Kunden nach dem Training.',
      price: 'Stack: Summe der Abo-Preise ohne Extra-Rabatt. Buff: 12,90 € für 10 Portionen, Abo 10,32 €. Jede Kombination braucht eine eigene BVL-Anzeige.'
    }
  ],

  /* Vorderseite der Bärendose, in Lesereihenfolge. x/y in Prozent der Zeichnung */
  zones: [
    { label: 'Produktfarbe', detail: 'Die ganze Banderole in der Sortenfarbe. Sie wird im 150-px-Thumbnail zuerst erkannt.', x: 86, y: 47 },
    { label: 'Nutzenwort', detail: 'CHILL, SONNE, GLOW, DEW, FOKUS, WUMMS, ABWEHR. Bricolage 800 in Tinte, 13 mm Versalhöhe auf der Dose, 28 mm auf dem Nachfüller.', x: 15, y: 41 },
    { label: 'Charakterbär', detail: 'Ganzer Körper, ca. 37 % der Fronthöhe, Ohren überlappen die Wort-Unterkante. Dahinter ein heller Kreis.', x: 64, y: 52 },
    { label: 'Tatzen-Dosis', detail: 'Pfote mit 5 Zehenballen, gefüllt = Fruchtgummis pro Tag (1 bis 5), darunter „2 am Tag“. Erfüllt die Dosis-Forderung aus dem HEY-SUNSHINE-Urteil.', x: 79, y: 64 },
    { label: 'Name und Nährstoff', detail: '„Mags · Magnesium · 150 mg pro Tag“ im weißen Namensschild.', x: 12, y: 66 },
    { label: 'Zugelassene Angabe', detail: 'Ein Claim nach VO 432/2012 mit *, wortgleich. Er trägt rechtlich das Nutzenwort und den Fantasienamen.', x: 12, y: 73 },
    { label: 'Wortmarke', detail: 'bärly klein über dem Nutzenwort. Die Marke erkennt man an Farbe, Bär, Ohren und Tatze.', x: 64, y: 33 },
    { label: 'Pflichtband', detail: 'Weißes Band: „Nahrungsergänzungsmittel mit Magnesium · 60 Fruchtgummis = 180 g“. Bezeichnung und Füllmenge im selben Sichtfeld, x-Höhe ≥ 1,2 mm.', x: 90, y: 81 },
    { label: 'Ohren-Banderole', detail: 'Zwei gestanzte Ohren über der Etikettenkante. Eine Stanze für alle Sorten, kein Deckelwerkzeug nötig.', x: 35, y: 28 },
    { label: 'Deckel-Tatze', detail: 'Rundetikett auf dem Lagerdeckel. Erinnert bei jedem Öffnen an die Dosis; von oben ergibt die Dosenreihe eine Reihe bunter Pfoten.', x: 50, y: 9 }
  ],

  devices: [
    { name: 'Tatzen-Dosis', detail: 'Gefüllte Zehenballen = Gummis pro Tag. Auf jedem Format, im Shop und in Ads. Immer als Cartoon-Pfote mit Zahl, damit sie nicht an Tierfutter erinnert.' },
    { name: 'Ohren-Kante', detail: 'Bärenohren als Stanzung an Banderole, Tütchen und Box, als Ohrbögen im Kopfband des Nachfüllers. Stanzen kosten ca. 150–800 € je Format.' },
    { name: 'Wechsel-Banderole', detail: 'Der Charakter sitzt auf einem ablösbaren Etikett, die Dose bleibt. Beim Sortenwechsel kommt ein Wechsel-Set per Brief.' },
    { name: 'Briefkasten-Stempel', detail: '„Passt durch den Briefkasten · max. 2 cm“. Ein nachprüfbarer Nutzen, keine Umweltaussage.' },
    { name: 'Tages-Siegel und Namensfeld', detail: '„1 Tütchen = 1 Tag – nicht mehr“ und „Für: ____“ auf jedem Kids-Tütchen. Verhindert doppelte Dosis bei Geschwistern.' },
    { name: 'Wort-Wand', detail: 'Ein Nutzenwort pro Bär, immer an derselben Stelle. Im Regal liest sich die Reihe als CHILL GLOW FOKUS WUMMS.' }
  ],

  modes: [
    { id: 'mags', label: 'Erwachsene', text: 'Produktfarbe vollflächig, Nutzenwort als Held, Bär mit Attitüde. Emotionale Texte nur auf Rückseite und Website.' },
    { id: 'kiko', label: 'bärly kids', text: 'Cremeweiß, Farbe nur im Kopfband und in den Ohren, ruhiger Bär ohne Glanz. Größtes Element ist das Tages-Siegel. Texte nur an Eltern.' },
    { id: 'zap', label: 'Zap · 18+', text: 'Tinte vollflächig, ESPRESSO und Blitz in Gelb, Bär nur als Umriss. Koffeinhinweis neben der Bezeichnung. Nie neben Kids-Produkten.' }
  ],

  sizes: [
    { product: 'Mags · 2/Tag', can: 'Bärendose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M, 60 Stück, Großbrief', sachet: 'Welle 3: Gym-Stack' },
    { product: 'Sunny · 1/Tag', can: 'Bärendose, 30 × 3 g ≈ 90 g (ca. ⅓ voll)', refill: 'Nachfüller S, 30 Stück', sachet: 'Welle 3: Fokus-Stack, nie mit Shield' },
    { product: 'Glow · 2/Tag', can: 'Bärendose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M; Beauty-Stack als Doppelbrief', sachet: 'Welle 3: Beauty-Stack, nie mit Shield' },
    { product: 'Dew · 2/Tag', can: 'Bärendose, 60 × 3,5 g ≈ 210 g (knapp)', refill: 'Nachfüller M', sachet: 'Erst nach Hitzetest (Kollagen)' },
    { product: 'Brainy · 3/Tag', can: 'Bärendose Groß, 90 × 3 g ≈ 270 g', refill: 'Nachfüller L, 90 Stück', sachet: 'Welle 3: Fokus-Stack' },
    { product: 'Flex · 4/Tag', can: 'Bärendose Groß, fasst 60 × 4 g (15 Tage)', refill: 'Nachfüller Duo 2 × 60', sachet: 'Welle 3: Gym-Stack' },
    { product: 'Shield · 2/Tag', can: 'Bärendose, 60 × 3 g ≈ 180 g', refill: 'Nachfüller M', sachet: 'Kein Stack mit Sunny oder Glow' },
    { product: 'Buff · 5/Portion', can: 'Keine Dose (100 × 5,5 g wären ca. 650–765 ml)', refill: 'Protein-Brief: 10 Tütchen M', sachet: 'Tütchen M, 5 Stück = 10 g Protein' },
    { product: 'Zap · 1/Tag, 18+', can: 'Keine Dose: Zap-Box mit 30 Tütchen', refill: 'Tütchen-Nachfüllbrief', sachet: 'Tütchen S, 80 mg Koffein' },
    { product: 'Kiko · 1/Tag', can: 'Tütchen-Box, 30 × 3,5 mg = 105 mg Eisen', refill: 'Tütchen-Nachfüllbrief', sachet: 'Tütchen S mit Namensfeld' },
    { product: 'Juno · 1/Tag', can: 'Tütchen-Box, 30 Tütchen', refill: 'Tütchen-Nachfüllbrief', sachet: 'Tütchen S mit Namensfeld' },
    { product: 'Splash · bei Bedarf', can: 'Keine Box: Kartonhülle', refill: '10 Sporttag-Tütchen, kein Abo', sachet: 'Tütchen S „SPORTTAG“' }
  ],

  rules: {
    front: [
      'Bezeichnung „Nahrungsergänzungsmittel mit <Nährstoffen>“ (bei Süßungsmitteln ergänzt um „mit Süßungsmitteln“) im selben Sichtfeld wie die Füllmenge (LMIV Art. 13(5), NemV §4).',
      'Füllmenge nach Gewicht plus Stückzahl: „60 Fruchtgummis = 180 g“. Bei Boxen und Briefen Anzahl der Tütchen und Gesamtgewicht (BVerwG 3 C 15.21).',
      'Tagesdosis groß vorne: Tatzen-Dosis plus Worte. Nicht zwingend, nach dem Urteil HEY SUNSHINE (LG München I) aber praktisch Pflicht.',
      'Zu jedem Nutzenwort und Bärennamen eine zugelassene Angabe mit *. Kids nur mit Art.-14-Wortlaut. Zap hat keinen zugelassenen Claim, nur Fakten.',
      'Nur Zap: „Enthält Koffein. Für Kinder und schwangere Frauen nicht empfohlen. (80 mg Koffein pro Tagesportion)“ neben der Bezeichnung, dazu 18+.',
      'Nur Kids: „Für Kinder von 4–12 Jahren“, alle Texte an die Eltern (UWG Anhang Nr. 28).',
      'Alle Pflichtangaben mit x-Höhe ≥ 1,2 mm, Tinte auf hellem Feld, nie auf einer Illustration.'
    ],
    back: [
      'Empfohlene tägliche Verzehrsmenge in Portionen und die Menge jedes Nährstoffs pro Tagesdosis, bei Vitaminen und Mineralstoffen mit % NRV.',
      '„Die angegebene empfohlene tägliche Verzehrsmenge darf nicht überschritten werden.“',
      '„Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung.“',
      '„Außerhalb der Reichweite von kleinen Kindern aufbewahren.“',
      'Satz nach Art. 10(2) HCVO plus Verzehrbedingung zum * (z. B. 3 g Kreatin bzw. 250 mg DHA pro Tag).',
      'Zutatenliste mit hervorgehobenen Allergenen (Dew: ggf. Fisch, Buff: ggf. Milch). Keine Azofarbstoffe.',
      'MHD und Los, Lagerhinweis, Anschrift des Lebensmittelunternehmers, QR-Code zur Online-Kennzeichnung.',
      '15 × 15 mm frei für das EU-Sortierlabel. Entsorgungshinweis erst nach dem Recyclinggutachten.',
      'Alle Angaben auch als HTML auf der Produktseite vor dem Checkout (LMIV Art. 14) und Grundpreis pro kg (PAngV).'
    ],
    allowed: [
      '„Bärendose aus Aluminium – zum Behalten und Nachfüllen.“',
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
      'Mehrweg für die Bärendose (sie ist kein rechtliches Mehrwegsystem)',
      'eigene Öko-Siegel, Blatt- oder Planet-Icons',
      'kindersicher – nur mit Prüfung nach ISO 8317 (Dose) bzw. EN 862 (Tütchen) für die konkrete Packung',
      'Koffein-Wirkaussagen (wach, Fokus, Konzentration): Die Claims wurden 2016 vom EU-Parlament abgelehnt.',
      'Kids: Snack, naschen, lecker, Süßigkeit, Belohnung, „statt Gummibärchen“, Aufforderungen an Kinder'
    ]
  },

  launch: [
    'Phase 0 (bis Dezember 2026): 30-Tage-Regel für alle Formate festlegen. Dose wird leer geliefert, der Hersteller füllt nur Beutel und Tütchen. Stückgewichte festschreiben (Erwachsene ≈ 3 g, Dew ≈ 3,5 g, Flex ≈ 4 g, Kids ≈ 2,5 g).',
    'Füllversuch mit echten Gummis in Dosen- und Beutelmustern; Dicke mit 20-mm-Schlitzlehre, Gewicht pro Brief. Danach alle Maße hier ersetzen.',
    'Stabilitätsstudie 40 °C/75 % r. F. (3 Monate) und 25 °C/60 % in 2–3 Kandidatenfolien. Vitamin C, D3, DHA und Kreatin zuerst; Kreatin am Ende der Haltbarkeit analysieren.',
    'Brieftest: 50 Testbriefe je Format, inkl. Hitze im Metallbriefkasten (bis 50 °C).',
    'Recht und Register: Claims-Review aller Nutzenwörter, BVL-Anzeige je Sorte, LUCID-Registrierung und Systembeteiligung (VerpackDG), Recyclinggutachten, Konformitäts- und PFAS-Erklärungen.',
    'Welle 1 (Januar 2027, Vitamin-D-Saison): Mags, Sunny, Glow, Shield in Bärendose + Nachfüller; Kiko und Juno in Tütchen-Box; Probierwoche; Schul-Duo.',
    'Welle 2 (März–Juni 2027): Bärendose Groß, Brainy, Flex (nur mit Kreatin-Analysen), Dew (nach Hitzetest), Zap-Box, Beauty-Stack, 3er-Vorrat. Ab Juni Versand nur Mo–Mi.',
    'Welle 3 (ab August 2027, Schulstart): Splash als Sporttag-Tütchen, Buff-Portionen (nach 12-%-Protein-Prüfung), Tages-Stacks.',
    'Phase 3 (ab > 10.000 Dosen/Jahr): gespritzter Ohren-Deckel, optional „Drücken + Drehen“ nach ISO 8317, Direktdruck auf Alu, eigene Gummiform.'
  ],

  questions: [
    'Dosenlieferant: Nahtlose Alu-Schraubdose aus Lagerware, Ø 66–72 mm, ca. 330 und 500 ml Nutzvolumen mit gleichem Gewinde? Mindestmenge, Preis bei 1.000 und 5.000, technisches Datenblatt?',
    'Etikettendrucker: Halten PP-Banderolen mit ablösbarem Kleber auf gebürstetem Alu, auch im Bad? Kosten für Ohren-Stanze und Digitaldruck ab 500?',
    'Beutelhersteller: Welches Mono-PE-Laminat schafft WVTR ≤ 1 und OTR ≤ 2, auch nach Gelbo-Flex? Gibt es ein Recyclinggutachten für genau dieses Laminat inkl. Zipper und Farben?',
    'Co-Packer: Vorgefertigte Zipper-Beutel nach Stückzahl füllen, bei ≤ 35–40 % r. F.? Genau 1 Gummi pro Tütchen zählen? Los/MHD per Inkjet?',
    'Gummi-Hersteller: Mindestmenge je Sorte (Spanne laut Markt 1.000–30.000), Vorlauf, Stabilitätsdaten in Mono-PE, Overages für Vitamin C, D3, DHA, Kreatin-Analysen am MHD.',
    'Deutsche Post/DHL: Preise 2027 für Großbrief (30 mm, 1.000 g) und Kleinpaket? Grenzen für Kissenbeutel in Sortiermaschinen?',
    'Duales System: Gilt die leer verkaufte Bärendose als Verpackung? Welche Materialfraktionen sind zu melden?'
  ],

  risks: [
    'Barriere: Mono-PE über 18–24 Monate ist weniger erprobt als PET/Alu. Ritual hat Nachfüllbeutel wegen Stabilität verworfen. Erst echte Daten, dann Werte drucken.',
    'Hitze im Briefkanal: Gummis können im Sommer verkleben. Pektinbasis, Antihaft-Beschichtung, Versand Mo–Mi, Ersatzversprechen.',
    'Briefe haben nur Basis-Tracking (Start- und Zielscan) und keine Haftung. Nachsendequote von ca. 1–2 % einplanen; Starter-Sets immer mit Sendungsverfolgung.',
    'Sunny füllt die Bärendose nur zu einem Drittel. Bewertungen beobachten, sonst Bärendose Mini (150 ml).',
    'Kids-Linie: Verbraucherzentrale und Giftnotruf kritisieren bonbonähnliche Kinder-NEM. Nach DGE-Werten dosieren, Gesamtmengen pro Packung niedrig halten, nur an Eltern schreiben.',
    'Nutzenwörter und Bärennamen gelten als Gesundheitsangaben. ABWEHR, FOKUS, WUMMS, SCHULE und WACHSEN nur mit passendem Claim auf derselben Packung.',
    'Flex: Ohne Kreatin-Analysen am Ende der Haltbarkeit ist „3 g pro Tag“ ein Haftungsrisiko. Bei einem NOW-Test 2024 verfehlte fast die Hälfte von 12 Kreatin-Gummis die Deklaration, 3 enthielten kaum Kreatin.',
    'Folie pro Gummi bei Kids und Zap ca. 20 % des Produktgewichts. Ehrlich mit Sicherheit begründen, nie als Umweltvorteil.',
    'Porto: Gegenüber dem DHL Kleinpaket (2026 ca. 3,80–4,00 €) spart der Brief realistisch ca. 18–26 € pro Abonnent und Jahr, nicht 30 €.'
  ],

  decision: {
    title: 'Offene Entscheidung für dich: die Form der Gummis',
    text: 'Die Recherche empfiehlt, die Fruchtgummis selbst nicht in Bärenform zu machen, sondern als runden Taler aus dem Lagerprogramm des Herstellers, später mit eingeprägter Tatze. Grund ist das Urteil HEY SUNSHINE (LG München I, 2021): Vitamin-D-Gummibärchen mit Cartoon-Bär wurden als irreführend verboten, weil sie wie Süßigkeiten wirkten und die Dosis nicht klar war. Die Bären bleiben als Charaktere auf Packung und Website. Du wolltest ausdrücklich Gummibärchen. Beides geht, aber Bärenform plus Cartoon-Bär plus Kinder ist die Kombination mit dem höchsten Risiko. Lass das vor dem Druck von einer Lebensmittelrechts-Kanzlei prüfen.'
  },

  sources: [
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
