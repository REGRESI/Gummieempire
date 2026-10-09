/* bärly – gemeinsame Markenbasis
   Produktdaten und die Bären-Zeichnung als SVG. Wird vom Shop (app.js) und
   von der Verpackungsseite (verpackung.html, packs.js) genutzt. */

(() => {
'use strict';

const BRAND = 'bärly';
const ABO_FACTOR = 0.8;          // 20 % Rabatt im Abo
const INK = '#1d1236';
const eur = n => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
const aboPrice = n => Math.round(n * ABO_FACTOR * 100) / 100;

/* ------------------------------------------------------------------ */
/* Produkte                                                            */
/* Angaben zu gesundheitsbezogenen Aussagen orientieren sich an der    */
/* EU-Claims-Verordnung (VO 1924/2006, VO 432/2012). Vor Launch mit    */
/* Hersteller und Lebensmittelrecht prüfen lassen.                     */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  /* ---------------- Launch-Crew: die vier Bären aus der Character Bible ---------------- */
  {
    id: 'glow', launch: true, name: 'Glow', title: 'Beauty Gummies', cat: 'beauty', line: 'adult',
    role: 'The Icon',
    goal: 'Beauty', persona: 'Charmant, selbstbewusst und immer ein bisschen extra.', look: 'Pink, mit Krone und Herzbrille',
    short: 'Mit Biotin, Zink und Vitamin C.',
    cardClaim: 'Biotin und Zink tragen zur Erhaltung normaler Haut und Haare bei.',
    scene: { title: 'Vor dem Spiegel', text: 'Zwei Gummies in der Morgenroutine, zwischen Serum und Parfum.' },
    flavor: 'Himbeere', ingredients: 'Biotin · Zink · Vitamin C',
    color: '#e86b8e', light: '#ffd1e1', dark: '#c2416a', tint: '#fad4dd',
    pack: { primary: '#fad4dd', accent: '#e86b8e', light: '#f7e9ed', fur: '#ff8fb1', icon: 'crown', jar: '#efb3c3', deep: '#9c2f55', metal: ['#f3d2cb', '#b97f76'] },
    word: 'GLOW', mood: 'wink', acc: 'sparkles',
    story: 'Biotin, Zink und Vitamin C in zwei Himbeer-Gummies am Tag. Biotin und Zink tragen zur Erhaltung normaler Haut und Haare bei. Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.',
    facts: [['450 µg', 'Biotin'], ['5 mg', 'Zink'], ['80 mg', 'Vitamin C'], ['2 Gummies', 'pro Tag']],
    nutrients: [
      ['Biotin', '450 µg', '900 %', 'Biotin trägt zur Erhaltung normaler Haut und Haare bei.'],
      ['Zink', '5 mg', '50 %', 'Zink trägt zur Erhaltung normaler Haut, Haare und Nägel bei.'],
      ['Vitamin C', '80 mg', '100 %', 'Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.']
    ],
    claim: 'Biotin und Zink tragen zur Erhaltung normaler Haut und Haare bei. Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 26.90, vegan: true, doses: { zinc: 5 }
  },
  {
    id: 'flex', launch: true, name: 'Flex', title: 'Kreatin Gummies', cat: 'sport', line: 'adult',
    role: 'The Gym Bro',
    goal: 'Performance', persona: 'Diszipliniert, loyal und ein kleines bisschen zu motiviert.', look: 'Blau, athletisch, mit schwarzer Sportbrille',
    short: '3 g Kreatin pro Tagesportion, dazu Vitamin B6 und B12.',
    cardClaim: 'Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein.',
    scene: { title: 'Vor dem ersten Satz', text: 'Zwei Gummies aus der Sporttasche. Kein Shaker, kein Pulver.' },
    flavor: 'Blaubeere', ingredients: 'Kreatin · Vitamin B6 · B12',
    color: '#2a6fff', light: '#a7c6ff', dark: '#1e4ed8', tint: '#d3e8ff',
    pack: { primary: '#d3e8ff', accent: '#2a6fff', light: '#e9f3ff', fur: '#6da3ff', icon: 'dumbbell', jar: '#a6bdee', deep: '#1f3a8a', metal: ['#e8edf6', '#8f9bb5'] },
    word: 'FLEX', mood: 'cool', acc: 'shades',
    story: '3 g Kreatin in zwei Blaubeer-Gummies, ohne Shaker und Pulver. Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein. Für alle, die intensiv trainieren.',
    facts: [['3 g', 'Kreatin'], ['0,7 mg', 'Vitamin B6'], ['2,5 µg', 'Vitamin B12'], ['2 Gummies', 'pro Tag']],
    nutrients: [
      ['Kreatin (aus 3.410 mg Kreatin-Monohydrat)', '3.000 mg', '–', 'Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein.'],
      ['Vitamin B6', '0,7 mg', '50 %', 'Vitamin B6 trägt zur Verringerung von Müdigkeit und Ermüdung bei.'],
      ['Vitamin B12', '2,5 µg', '100 %', 'Vitamin B12 trägt zu einem normalen energieliefernden Stoffwechsel bei.']
    ],
    claim: 'Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 29.90, vegan: true, doses: { b6: .7 }
  },
  {
    id: 'snoozy', launch: true, name: 'Snoozy', title: 'Sleep Gummies', cat: 'sleep', line: 'adult',
    role: 'The Chill Guy',
    goal: 'Sleep', persona: 'Ruhig, humorvoll und Profi im Abschalten.', look: 'Lila, mit Schlafmütze und Kissen',
    short: '1 mg Melatonin, dazu Magnesium und Vitamin B6.',
    cardClaim: 'Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen, wenn kurz vor dem Schlafengehen 1 mg aufgenommen wird.',
    scene: { title: 'Nach dem letzten Licht', text: 'Eine halbe Stunde vor dem Schlafen. Handy weg, Licht aus.' },
    flavor: 'Waldbeere', ingredients: 'Melatonin · Magnesium · Vitamin B6',
    color: '#8e6bdb', light: '#dcc3ff', dark: '#5b21b6', tint: '#dccef4',
    pack: { primary: '#b9a7e6', accent: '#8e6bdb', light: '#dccef4', fur: '#8b5cf6', icon: 'moon', jar: '#bfa9e6', deep: '#43207f', metal: ['#ece6f8', '#998cbd'] },
    word: 'SNOOZY', mood: 'sleepy', acc: 'zz',
    story: 'Melatonin, Magnesium und Vitamin B6 in zwei Waldbeer-Gummies, eine halbe Stunde vor dem Schlafengehen. Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen. Die positive Wirkung stellt sich ein, wenn kurz vor dem Schlafengehen 1 mg Melatonin aufgenommen wird.',
    facts: [['1 mg', 'Melatonin'], ['57 mg', 'Magnesium'], ['1,4 mg', 'Vitamin B6'], ['2 Gummies', 'vor dem Schlafen']],
    // Magnesium 57 mg = 15,2 % NRV: ab 15 % gilt die Menge als signifikant, erst dann ist eine Angabe erlaubt
    nutrients: [
      ['Melatonin', '1 mg', '–', 'Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen. Die positive Wirkung stellt sich ein, wenn kurz vor dem Schlafengehen 1 mg Melatonin aufgenommen wird.'],
      ['Magnesium', '57 mg', '15 %', 'Magnesium trägt zu einer normalen Funktion des Nervensystems bei.'],
      ['Vitamin B6', '1,4 mg', '100 %', 'Vitamin B6 trägt zu einer normalen psychischen Funktion bei.']
    ],
    claim: 'Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen. Die positive Wirkung stellt sich ein, wenn kurz vor dem Schlafengehen 1 mg Melatonin aufgenommen wird.',
    warn: 'Nicht für Kinder, Schwangere und Stillende. Nicht vor dem Autofahren einnehmen.',
    serving: '2 Fruchtgummis 30 Minuten vor dem Schlafengehen', count: 60, price: 24.90, vegan: true, doses: { b6: 1.4 }
  },
  {
    id: 'daily', launch: true, name: 'Daily', title: 'Multivitamin Gummies', cat: 'balance', line: 'adult',
    role: 'The Organizer',
    goal: 'Daily Wellness', persona: 'Strukturiert, positiv und der Grund, warum die Crew funktioniert.', look: 'Gelb, mit Hoodie und Crossbody-Bag',
    short: '12 Vitamine und 3 Mineralstoffe in zwei Gummies.',
    cardClaim: 'Vitamin C und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei.',
    scene: { title: 'Mit dem ersten Kaffee', text: 'Zwei Gummies zum Frühstück, bevor der Tag losgeht.' },
    flavor: 'Zitrone-Mango', ingredients: '12 Vitamine · 3 Mineralstoffe',
    color: '#e0a11f', light: '#fbe7b5', dark: '#8a5c00', tint: '#fbe7b5',
    pack: { primary: '#f6c843', accent: '#e0a11f', light: '#fbe7b5', fur: '#ffd166', icon: 'sun', jar: '#eecb6c', deep: '#5f4100', metal: ['#f7e3a8', '#b48a2a'] },
    word: 'DAILY', mood: 'grin', acc: 'cap',
    story: '12 Vitamine und 3 Mineralstoffe in zwei Zitrone-Mango-Gummies zum Frühstück. Vitamin C und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei. Vitamin B6 und B12 tragen zu einem normalen energieliefernden Stoffwechsel bei.',
    facts: [['12', 'Vitamine'], ['3', 'Mineralstoffe'], ['10 µg', 'Vitamin D3'], ['2 Gummies', 'pro Tag']],
    nutrients: [
      ['Vitamin A', '200 µg', '25 %', 'Vitamin A trägt zur Erhaltung normaler Haut bei.'],
      ['Vitamin D3', '10 µg', '200 %', 'Vitamin D trägt zu einer normalen Funktion des Immunsystems bei.'],
      ['Vitamin E', '6 mg', '50 %', 'Vitamin E trägt dazu bei, die Zellen vor oxidativem Stress zu schützen.'],
      ['Vitamin C', '80 mg', '100 %', 'Vitamin C trägt zu einer normalen Funktion des Immunsystems bei.'],
      ['Thiamin (B1)', '0,55 mg', '50 %', 'Thiamin trägt zu einem normalen Energiestoffwechsel bei.'],
      ['Riboflavin (B2)', '0,7 mg', '50 %', 'Riboflavin trägt zur Verringerung von Müdigkeit und Ermüdung bei.'],
      ['Niacin (als Nicotinamid)', '8 mg', '50 %', 'Niacin trägt zur Verringerung von Müdigkeit und Ermüdung bei.'],
      ['Pantothensäure', '3 mg', '50 %', 'Pantothensäure trägt zu einer normalen geistigen Leistung bei.'],
      ['Vitamin B6', '1,4 mg', '100 %', 'Vitamin B6 trägt zu einem normalen energieliefernden Stoffwechsel bei.'],
      ['Biotin', '25 µg', '50 %', 'Biotin trägt zu einem normalen Energiestoffwechsel bei.'],
      ['Folsäure', '200 µg', '100 %', 'Folat trägt zur Verringerung von Müdigkeit und Ermüdung bei.'],
      ['Vitamin B12', '2,5 µg', '100 %', 'Vitamin B12 trägt zu einem normalen energieliefernden Stoffwechsel bei.'],
      ['Zink', '1,5 mg', '15 %', 'Zink trägt zu einer normalen Funktion des Immunsystems bei.'],
      ['Selen', '27,5 µg', '50 %', 'Selen trägt zu einer normalen Funktion des Immunsystems bei.'],
      ['Jod', '75 µg', '50 %', 'Jod trägt zu einer normalen kognitiven Funktion bei.']
    ],
    claim: 'Vitamin C und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei. Vitamin B6 und B12 tragen zu einem normalen energieliefernden Stoffwechsel bei.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 24.90, vegan: true, doses: { zinc: 1.5, vitD: 10, b6: 1.4 }
  },
  /* ---------------- Später: Sorten für die nächsten Wellen ---------------- */
  {
    id: 'mags', later: true, name: 'Mags', title: 'Magnesium Gummies', cat: 'balance', line: 'adult',
    flavor: 'Blaue Himbeere · sauer', sour: true,
    color: '#2f6bff', light: '#9cbcff', dark: '#1636a8', tint: '#d9e6ff',
    word: 'CHILL', mood: 'sleepy', acc: 'zz',
    headline: 'Dein Kopf darf jetzt Feierabend machen.',
    hello: 'Hi, ich bin Mags. Schultern runter.',
    story: 'Ich bin der ruhigste Bär im Glas. Ich kümmere mich um deine Muskeln nach dem Training und um deinen Kopf nach einem langen Tag. Sauer im Geschmack, entspannt im Charakter.',
    facts: [['150 mg', 'Magnesium'], ['40 %', 'des Tagesbedarfs'], ['2 Gummies', 'pro Tag'], ['Vegan', 'Pektin statt Gelatine']],
    nutrients: [['Magnesium (Bisglycinat)', '150 mg', '40 %']],
    claim: 'Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung und zu einer normalen Muskelfunktion bei.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 24.90, vegan: true, doses: {}
  },
  {
    id: 'sunny', later: true, name: 'Sunny', title: 'Vitamin D3 + K2 Gummies', cat: 'balance', line: 'adult',
    flavor: 'Orange-Mango',
    color: '#ff8a1f', light: '#ffc27a', dark: '#c4500a', tint: '#ffe6cc',
    word: 'SONNE', mood: 'cool', acc: 'shades',
    headline: 'Sonne zum Kauen. Auch im November.',
    hello: 'Sunny hier. Ich hab Sonne dabei.',
    story: 'Von Oktober bis März steht die Sonne in Deutschland so tief, dass deine Haut kaum Vitamin D bilden kann. Also bringe ich es mit, und Vitamin K2 gleich dazu.',
    facts: [['20 µg', 'Vitamin D3 (800 IE)'], ['50 µg', 'Vitamin K2 (MK-7)'], ['1 Gummy', 'pro Tag'], ['Vegan', 'D3 aus Flechten']],
    nutrients: [['Vitamin D3', '20 µg', '400 %'], ['Vitamin K2 (MK-7)', '50 µg', '67 %']],
    claim: 'Vitamin D trägt zu einer normalen Funktion des Immunsystems und zur Erhaltung normaler Knochen bei. Vitamin K trägt zur Erhaltung normaler Knochen bei.',
    serving: '1 Fruchtgummi täglich', count: 30, price: 19.90, vegan: true, doses: { vitD: 20 }
  },
  {
    id: 'dew', later: true, name: 'Dew', title: 'Kollagen + Vitamin C Gummies', cat: 'beauty', line: 'adult',
    flavor: 'Litschi-Holunderblüte',
    color: '#8b5cf6', light: '#c7adff', dark: '#5527c9', tint: '#ece3ff',
    word: 'DEW', mood: 'wink', acc: 'drop',
    headline: 'Der Glow, den man nicht aufträgt.',
    hello: 'Dew. Freut mich, Haut.',
    story: 'Dein Körper braucht Vitamin C, um selbst Kollagen zu bilden. Ich bringe beides mit, dazu Hyaluronsäure. Schmeckt nach Litschi und Holunderblüte.',
    facts: [['1 g', 'Kollagenpeptide'], ['80 mg', 'Vitamin C'], ['50 mg', 'Hyaluronsäure'], ['2 Gummies', 'pro Tag']],
    nutrients: [['Kollagenpeptide (Fisch)', '1.000 mg', '–'], ['Vitamin C', '80 mg', '100 %'], ['Hyaluronsäure', '50 mg', '–']],
    claim: 'Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 27.90, vegan: false, doses: {}
  },
  {
    id: 'brainy', later: true, name: 'Brainy', title: 'Omega-3 Gummies aus Algenöl', cat: 'focus', line: 'adult',
    flavor: 'Zitrone-Limette',
    color: '#10b39a', light: '#80e3d4', dark: '#087766', tint: '#d3f5ef',
    word: 'FOKUS', mood: 'smart', acc: 'glasses',
    headline: 'Omega-3 aus der Alge. Ohne Fischgeschmack.',
    hello: 'Brainy. Ich hab nachgelesen.',
    story: 'Fische haben ihr DHA aus Algen. Ich nehme die Abkürzung. 250 mg pro Portion, Zitrone-Limette, kein Fischaufstoßen. Klingt nerdig, schmeckt aber nicht so.',
    facts: [['250 mg', 'DHA aus Algenöl'], ['125 mg', 'EPA'], ['3 Gummies', 'pro Tag'], ['Vegan', 'ohne Fisch']],
    nutrients: [['DHA', '250 mg', '–'], ['EPA', '125 mg', '–']],
    claim: 'DHA trägt zur Erhaltung einer normalen Gehirnfunktion und normaler Sehkraft bei. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 250 mg DHA ein.',
    serving: '3 Fruchtgummis täglich', count: 90, price: 29.90, vegan: true, doses: {}
  },
  {
    id: 'zap', later: true, name: 'Zap', title: 'Koffein + L-Theanin Gummies', cat: 'focus', line: 'adult',
    flavor: 'Zitrone · sauer', sour: true,
    color: '#ffc21a', light: '#ffe48a', dark: '#b88200', tint: '#fff2c2',
    word: 'ESPRESSO', mood: 'wide', acc: 'bolt',
    headline: 'Ein Espresso. Zum Kauen.',
    hello: 'ZAP! Oh, hallo.',
    story: '80 mg Koffein, so viel wie ein Espresso, dazu 100 mg L-Theanin. Zitrone, richtig sauer. Jede Portion einzeln versiegelt im Tütchen, eins pro Tag, nur für Erwachsene.',
    facts: [['80 mg', 'Koffein'], ['100 mg', 'L-Theanin'], ['1 Tütchen', 'max. pro Tag'], ['18+', 'nur für Erwachsene']],
    nutrients: [['Koffein', '80 mg', '–'], ['L-Theanin', '100 mg', '–']],
    claim: 'Für Koffein gibt es in der EU keine zugelassene gesundheitsbezogene Angabe. Deshalb sagen wir dir nur, was drin ist.',
    warn: 'Enthält Koffein. Für Kinder und schwangere Frauen nicht empfohlen. (80 mg Koffein pro Tagesportion)',
    serving: '1 Tütchen täglich', count: 30, price: 19.90, vegan: true, doses: {}, adultOnly: true
  },
  {
    id: 'shield', later: true, name: 'Shield', title: 'Immun Gummies: Vitamin C, Zink, D3', cat: 'balance', line: 'adult',
    flavor: 'Grüner Apfel · sauer', sour: true,
    color: '#3fbf5a', light: '#9fe6ab', dark: '#1e7f35', tint: '#dcf6e1',
    word: 'ABWEHR', mood: 'grin', acc: 'none',
    headline: 'Für die Wochen, in denen alle husten.',
    hello: 'Shield. Ich halt die Stellung.',
    story: 'Vitamin C, Zink und Vitamin D in einem sauren Apfel-Gummy. Ich bin kein Wundermittel gegen die Bürogrippe. Aber ich sorge dafür, dass dein Immunsystem bekommt, was es für seine normale Funktion braucht.',
    facts: [['80 mg', 'Vitamin C'], ['5 mg', 'Zink'], ['10 µg', 'Vitamin D3'], ['2 Gummies', 'pro Tag']],
    nutrients: [['Vitamin C', '80 mg', '100 %'], ['Zink', '5 mg', '50 %'], ['Vitamin D3', '10 µg', '200 %']],
    claim: 'Vitamin C, Zink und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei.',
    serving: '2 Fruchtgummis täglich', count: 60, price: 21.90, vegan: true, doses: { zinc: 5, vitD: 10 }
  },
  {
    id: 'buff', later: true, name: 'Buff', title: 'Protein Gummies', cat: 'sport', line: 'adult',
    flavor: 'Salted Caramel',
    color: '#c8732e', light: '#efb47c', dark: '#7c3e12', tint: '#f6e3cf',
    word: 'PROTEIN', mood: 'determined', acc: 'none',
    headline: '10 g Protein pro Portion. Salted Caramel.',
    hello: 'Buff. Nach dem Training?',
    story: 'Fünf von mir sind 10 Gramm Protein aus Kollagen und Molke, Salted Caramel. Jede Portion steckt in einem eigenen Tütchen, für die Sporttasche statt Shaker.',
    facts: [['10 g', 'Protein'], ['5 Fruchtgummis', 'pro Portion'], ['10', 'Portionen pro Brief'], ['Tütchen', 'für die Sporttasche']],
    nutrients: [['Protein', '10 g', '–']],
    claim: 'Eiweiß trägt zu einer Zunahme und zur Erhaltung von Muskelmasse bei.',
    serving: '1 Tütchen (5 Fruchtgummis) pro Portion', count: 50, price: 12.90, vegan: false, doses: {}
  },
  {
    id: 'kiko', soon: true, name: 'Kiko', title: 'Kids Gummies mit Eisen, Jod und DHA', cat: 'kids', line: 'kids',
    flavor: 'Kiwi-Limette',
    color: '#8bd12e', light: '#c9f07f', dark: '#4e8a0c', tint: '#eaf8d2',
    word: 'SCHULE', mood: 'grin', acc: 'cap',
    headline: 'Für Schultage. Und alle anderen.',
    hello: 'Kiko! Ich sitz vorne.',
    power: 'Eisen + Jod + DHA',
    story: 'Ich habe Eisen und Jod dabei, beides brauchen Kinder für ihre normale Entwicklung, und DHA aus Algen. Der Vorrat bleibt bei dir, nur das Tütchen kommt in die Brotdose.',
    facts: [['3,5 mg', 'Eisen'], ['50 µg', 'Jod'], ['100 mg', 'DHA aus Algen'], ['4–12', 'Jahre']],
    nutrients: [['Eisen', '3,5 mg', '25 %'], ['Jod', '50 µg', '33 %'], ['DHA', '100 mg', '–']],
    claim: 'Eisen trägt zur normalen kognitiven Entwicklung von Kindern bei. Jod trägt zu einer normalen kognitiven Funktion bei.',
    serving: '1 Tütchen täglich', count: 30, price: 19.90, vegan: true, doses: {}
  },
  {
    id: 'splash', soon: true, name: 'Splash', title: 'Kids Elektrolyt Gummies', cat: 'kids', line: 'kids',
    flavor: 'Kokos-Ananas',
    color: '#1eb8f0', light: '#8edcf8', dark: '#0a78a6', tint: '#d5f1fc',
    word: 'SPORTTAG', mood: 'wide', acc: 'goggles',
    headline: 'Für Sport-, Schwimm- und Hitzetage.',
    hello: 'Splash. Wasserflasche dabei?',
    power: 'Kalium + Magnesium',
    story: 'Kein Tagesprodukt, sondern eins für besondere Tage: Kalium, Magnesium und etwas Natrium in einem Tütchen. Ans Trinken muss dein Kind trotzdem denken.',
    facts: [['150 mg', 'Kalium'], ['40 mg', 'Magnesium'], ['10', 'Sporttag-Tütchen'], ['4–12', 'Jahre']],
    nutrients: [['Kalium', '150 mg', '8 %'], ['Magnesium', '40 mg', '11 %'], ['Natrium', '50 mg', '–']],
    claim: 'Kalium und Magnesium tragen zu einer normalen Muskelfunktion bei.',
    serving: '1 Tütchen pro Sporttag', count: 10, price: 7.90, vegan: true, doses: {}
  },
  {
    id: 'juno', soon: true, name: 'Juno', title: 'Kids Vitamin D Gummies', cat: 'kids', line: 'kids',
    flavor: 'Erdbeere-Banane',
    color: '#ff5a5f', light: '#ffa3a5', dark: '#c0262c', tint: '#ffe0df',
    word: 'WACHSEN', mood: 'lashes', acc: 'bow',
    headline: 'Für Knochen, die schneller wachsen als die Hosen.',
    hello: 'Juno. Ich wachse noch!',
    power: 'Vitamin D3',
    story: 'Kinderknochen wachsen wie verrückt, und dafür brauchen sie Vitamin D. Ein Tütchen zum Frühstück, Erdbeere-Banane.',
    facts: [['10 µg', 'Vitamin D3'], ['1 Tütchen', 'pro Tag'], ['4–12', 'Jahre'], ['Vegan', 'D3 aus Flechten']],
    nutrients: [['Vitamin D3', '10 µg', '200 %']],
    claim: 'Vitamin D wird für ein gesundes Wachstum und eine gesunde Entwicklung der Knochen bei Kindern benötigt.',
    serving: '1 Tütchen täglich', count: 30, price: 19.90, vegan: true, doses: {}
  }
];
const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

/* ------------------------------------------------------------------ */
/* Texte für Hero und Produktseiten der Launch-Crew                    */
/* hero    Schlagzeile (HTML, <em> = kursiv) und Unterzeile             */
/* lines   Sprechblasen des Maskottchens (Charakter, keine Wirkaussage) */
/* traits  Steckbrief                                                   */
/* ritual  Uhrzeit, Moment und drei Schritte zur Einnahme               */
/* faq     produktbezogene Fragen                                       */
/* ------------------------------------------------------------------ */
const PDP = {
  glow: {
    hero: { title: 'Beauty, <em>zum Kauen.</em>', sub: 'Biotin, Zink und Vitamin C in zwei Himbeer-Gummies am Tag.' },
    lines: ['Krone sitzt. Du auch?', 'Heute ist mein Tag. Morgen auch.', 'Erst zwei Gummies, dann der Spiegel.', 'Herzbrille bleibt auf. Immer.'],
    traits: [['Rolle', 'The Icon'], ['Erkennungszeichen', 'Krone und Herzbrille'], ['Lieblingsort', 'Vor dem Spiegel, mit gutem Licht'], ['Sagt nie', '„Ich bin nicht fotogen.“']],
    ritual: { time: '07:30', moment: 'Morgens im Bad', steps: [
      ['Zwei Gummies', 'Morgens, zwischen Zähneputzen und Serum.'],
      ['Mehr ist nicht mehr', 'Die Tagesportion sind zwei Gummies. Nicht mehr.'],
      ['Dose zu, fertig', 'Im Abo kommt der Nachfüller, bevor die Dose leer ist.']
    ] },
    faq: [
      ['Wie viel ist pro Tagesportion drin?', '450 µg Biotin (900 % des Nährstoffbezugswerts), 5 mg Zink (50 %) und 80 mg Vitamin C (100 %) in zwei Fruchtgummis.'],
      ['Ab wann merke ich etwas?', 'Dazu machen wir kein Versprechen. Biotin und Zink tragen zur Erhaltung normaler Haut und Haare bei, Vitamin C zu einer normalen Kollagenbildung für eine normale Funktion der Haut. Mehr sagen wir nicht, weil mehr nicht belegt ist.'],
      ['Kann ich GLOW mit DAILY kombinieren?', 'Ja. Zusammen kommst du auf 6,5 mg Zink pro Tag. Das ist genau die Höchstmenge, die das BfR für Zink in Nahrungsergänzungsmitteln empfiehlt. Nimm dann kein weiteres Zink-Präparat dazu.'],
      ['Ist GLOW vegan?', 'Die Rezeptur ist mit Pektin statt Gelatine geplant. Die finale Zutatenliste steht hier, sobald der Hersteller sie bestätigt.']
    ]
  },
  flex: {
    hero: { title: '3 g Kreatin. <em>Ohne Shaker.</em>', sub: 'Zwei Blaubeer-Gummies am Tag, dazu Vitamin B6 und B12.' },
    lines: ['Noch ein Satz. Dann noch einer.', 'Shaker? Kenn ich nicht.', 'Brille bleibt auf. Auch drinnen.', 'Ruhetag heißt: trotzdem zwei Gummies.'],
    traits: [['Rolle', 'The Gym Bro'], ['Erkennungszeichen', 'Schwarze Sportbrille'], ['Lieblingsort', 'Hantelbank, vorletzter Satz'], ['Sagt nie', '„Heute lass ich’s mal.“']],
    ritual: { time: '17:30', moment: 'Jeden Tag, auch an Ruhetagen', steps: [
      ['Zwei Gummies', 'Jeden Tag. Die Uhrzeit ist egal, Hauptsache täglich.'],
      ['3 g pro Tag', 'Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein.'],
      ['Ab in die Tasche', 'Kein Abmessen, kein Pulver im Rucksack.']
    ] },
    faq: [
      ['Warum Gummies statt Pulver?', 'Weil 3 g Kreatin in zwei Gummies in jede Tasche passen. Kein Abmessen, kein Shaker, kein Pulver im Rucksack.'],
      ['Muss ich FLEX auch an trainingsfreien Tagen nehmen?', 'Ja. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein, also jeden Tag zwei Gummies.'],
      ['Ist FLEX für Jugendliche?', 'FLEX ist für Menschen gedacht, die intensiv trainieren. Jugendliche sprechen vorher am besten mit ihrer Ärztin oder ihrem Arzt.']
    ]
  },
  snoozy: {
    hero: { title: '1 mg Melatonin. <em>Licht aus.</em>', sub: 'Zwei Waldbeer-Gummies, eine halbe Stunde vor dem Schlafengehen.' },
    lines: ['Psst. Ich bin schon im Bett.', 'Handy weg. Ich mein’s ernst.', 'Nur noch fünf Minuten. Oder acht Stunden.', 'Kissen ist dabei. Immer.'],
    traits: [['Rolle', 'The Chill Guy'], ['Erkennungszeichen', 'Schlafmütze und Kissen'], ['Lieblingsort', 'Unter der Decke'], ['Sagt nie', '„Nur noch eine Folge.“']],
    ritual: { time: '22:30', moment: 'Abends, vor dem Schlafen', steps: [
      ['Zwei Gummies', 'Etwa 30 Minuten vor dem Schlafengehen.'],
      ['Danach nicht mehr fahren', 'Nach der Einnahme nicht mehr Auto fahren.'],
      ['Licht aus', 'Handy weg, Licht aus, Kissen zurechtlegen.']
    ] },
    faq: [
      ['Wie viel Melatonin ist drin?', '1 mg pro Tagesportion. Genau die Menge, für die die zugelassene Angabe gilt: Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen, wenn kurz vor dem Schlafengehen 1 mg aufgenommen wird.'],
      ['Für wen ist SNOOZY nicht geeignet?', 'Nicht für Kinder, Schwangere und Stillende, und nicht vor dem Autofahren.'],
      ['Ich nehme Medikamente. Darf ich SNOOZY nehmen?', 'Sprich bitte vorher mit deiner Ärztin oder deinem Arzt.'],
      ['Warum Magnesium und Vitamin B6?', 'Magnesium trägt zu einer normalen Funktion des Nervensystems bei, Vitamin B6 zu einer normalen psychischen Funktion. Beides ist in einer Menge drin, für die diese Angaben zugelassen sind.']
    ]
  },
  daily: {
    hero: { title: '15 Nährstoffe. <em>Zwei Gummies.</em>', sub: '12 Vitamine und 3 Mineralstoffe, Zitrone-Mango, zum Frühstück.' },
    lines: ['Plan steht. Snacks auch.', 'Hab an alles gedacht. Auch an dich.', 'Zwei Gummies, dann los.', 'Liste abgehakt. Nächste Liste.'],
    traits: [['Rolle', 'The Organizer'], ['Erkennungszeichen', 'Hoodie und Crossbody-Bag'], ['Lieblingsort', 'Am Frühstückstisch, mit Liste'], ['Sagt nie', '„Mal schauen.“']],
    ritual: { time: '07:00', moment: 'Zum Frühstück', steps: [
      ['Zwei Gummies', 'Morgens zum Frühstück.'],
      ['Mit einer Mahlzeit', 'Die Vitamine A, D und E sind fettlöslich. Darum am besten zum Essen.'],
      ['Dose bleibt stehen', 'Der Nachfüller kommt per Brief, die Dose bleibt auf dem Tisch.']
    ] },
    faq: [
      ['Warum nicht 100 % von allem?', 'Weil du auch isst. DAILY ist als Ergänzung gedacht und bleibt bei Zink, Vitamin D und Vitamin B6 unter den Höchstmengen-Empfehlungen des BfR, auch zusammen mit den anderen bärly-Sorten.'],
      ['Kann ich DAILY mit GLOW kombinieren?', 'Ja. Zusammen kommst du auf 6,5 mg Zink pro Tag, genau die Höchstmenge, die das BfR für Zink in Nahrungsergänzungsmitteln empfiehlt. Nimm dann kein weiteres Zink-Präparat dazu.'],
      ['Ich habe eine Schilddrüsenerkrankung. Ist Jod drin?', 'Ja, 75 µg Jod pro Tagesportion. Bei Schilddrüsenerkrankungen sprich bitte vorher mit deiner Ärztin oder deinem Arzt.'],
      ['Ist DAILY vegan?', 'Die Rezeptur ist mit Pektin statt Gelatine geplant. Die finale Zutatenliste steht hier, sobald der Hersteller sie bestätigt.']
    ]
  }
};
/* Produktseiten liegen im Hauptordner: glow.html, flex.html, snoozy.html, daily.html,
   die Sets unter eigenem Namen (Inhalt aus BUNDLES, Seite aus bundle.js) */
const SET_PAGES = { crew: 'crew.html', beautysleep: 'morgen-abend.html' };
const pdpUrl = (id) => SET_PAGES[id] || `${id}.html`;

/* Packungsdaten je Sorte (siehe verpackung.html)
   nutrient  kurzer Nährstoffname für die Vorderseite
   dose      Leitdosis pro Tagesportion
   legal     Bezeichnung nach NemV §4 (Pflicht, im selben Sichtfeld wie die Füllmenge)
   claim     zugelassene Angabe (VO 432/2012 bzw. Art. 14), trägt Fantasiename und Nutzenwort
   perDay    Fruchtgummis pro Tagesportion (Tatzen-Dosis)
   unit      Stückgewicht in g (Richtwert, im Füllversuch bestätigen)
   format    'can'  Bärendose (std/gross) + Nachfüller per Brief
             'box'  Tütchen-Box + Tütchen-Nachfüllbrief (Kids, Zap)
             'sport' 10 Sporttag-Tütchen (Splash)
             'portion' Protein-Portionen in Tütchen M (Buff)
   can       'std' (Ø 70 × 100 mm, 330 ml) oder 'gross' (Ø 70 × 150 mm, 500 ml)
   refill    [Fruchtgummis pro Beutel, Tage pro Beutel, Beutelgröße]
   wave      Launch-Welle 1, 2 oder 3 */
const PACK_INFO = {
  glow:   { nutrient: 'Biotin · Zink · Vitamin C', dose: '450 µg Biotin', perDay: 2, unit: 3, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Biotin, Zink und Vitamin C',
            claim: 'Biotin und Zink tragen zur Erhaltung normaler Haut und Haare bei.' },
  flex:   { nutrient: 'Kreatin · B6 · B12', dose: '3 g Kreatin', perDay: 2, unit: 4.5, format: 'can', can: 'gross', refill: [60, 30, 'L'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Kreatin, Vitamin B6 und B12',
            claim: 'Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung.' },
  snoozy: { nutrient: 'Melatonin · Magnesium · B6', dose: '1 mg Melatonin', perDay: 2, unit: 3, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Melatonin, Magnesium und Vitamin B6',
            claim: 'Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen.' },
  daily:  { nutrient: '12 Vitamine · 3 Mineralstoffe', dose: '80 mg Vit. C', perDay: 2, unit: 3, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Vitaminen und Mineralstoffen',
            claim: 'Vitamin C und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei.' },
  mags:   { nutrient: 'Magnesium', dose: '150 mg', perDay: 2, unit: 3, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Magnesium',
            claim: 'Magnesium trägt zu einer normalen psychischen Funktion bei.' },
  sunny:  { nutrient: 'Vitamin D3 + K2', dose: '20 µg D3', perDay: 1, unit: 3, format: 'can', can: 'std', refill: [30, 30, 'S'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Vitamin D3 und Vitamin K2',
            claim: 'Vitamin D trägt zu einer normalen Funktion des Immunsystems bei.' },
  dew:    { nutrient: 'Vitamin C + Kollagen', dose: '80 mg Vit. C', perDay: 2, unit: 3.5, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 2,
            legal: 'Nahrungsergänzungsmittel mit Vitamin C und Kollagenpeptiden',
            claim: 'Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.' },
  brainy: { nutrient: 'Omega-3 DHA aus Algen', dose: '250 mg DHA', perDay: 3, unit: 3, format: 'can', can: 'gross', refill: [90, 30, 'L'], wave: 2,
            legal: 'Nahrungsergänzungsmittel mit Omega-3-Fettsäure DHA aus Algenöl',
            claim: 'DHA trägt zur Erhaltung einer normalen Gehirnfunktion bei.' },
  zap:    { nutrient: 'Koffein + L-Theanin', dose: '80 mg Koffein', perDay: 1, unit: 3, format: 'box', wave: 2,
            legal: 'Nahrungsergänzungsmittel mit Koffein und L-Theanin',
            caffeine: 'Enthält Koffein. Für Kinder und schwangere Frauen nicht empfohlen. (80 mg Koffein pro Tagesportion)' },
  shield: { nutrient: 'Vitamin C · Zink · D3', dose: '80 mg Vit. C', perDay: 2, unit: 3, format: 'can', can: 'std', refill: [60, 30, 'M'], wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Vitamin C, Zink und Vitamin D3',
            claim: 'Vitamin C, Zink und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei.' },
  buff:   { nutrient: 'Protein', dose: '10 g', perDay: 5, unit: 5.5, format: 'portion', wave: 3,
            legal: 'Nahrungsergänzungsmittel mit Protein',
            claim: 'Eiweiß trägt zur Erhaltung von Muskelmasse bei.' },
  kiko:   { nutrient: 'Eisen · Jod · DHA', dose: '3,5 mg Eisen', perDay: 1, unit: 2.5, format: 'box', wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Eisen, Jod und DHA für Kinder',
            claim: 'Eisen trägt zur normalen kognitiven Entwicklung von Kindern bei.' },
  splash: { nutrient: 'Kalium + Magnesium', dose: '150 mg Kalium', perDay: 1, unit: 2.5, format: 'sport', wave: 3,
            legal: 'Nahrungsergänzungsmittel mit Kalium und Magnesium für Kinder',
            claim: 'Kalium trägt zu einer normalen Muskelfunktion bei.' },
  juno:   { nutrient: 'Vitamin D3', dose: '10 µg D3', perDay: 1, unit: 2.5, format: 'box', wave: 1,
            legal: 'Nahrungsergänzungsmittel mit Vitamin D3 für Kinder',
            claim: 'Vitamin D wird für ein gesundes Wachstum und eine gesunde Entwicklung der Knochen bei Kindern benötigt.' }
};


/* Formate und Preise je Sorte. Jede Packung reicht genau 30 Tage.
   Dose:  Abo (Bärendose gratis, Nachfüller alle 30/45/60 Tage per Brief), Einmalkauf, Nur Nachfüller, 3er-Vorrat.
   Box:   Abo (Tütchen-Box gratis, 30 Tütchen per Brief), Einmalkauf.
   Buff:  10 Portionen per Brief. Splash: 10 Sporttag-Tütchen, nur einmalig. */
const REFILL_OFF = 2;      // Nachfüller ohne Dose: 2 € günstiger
const EXTRA_CAN = 4.90;    // zusätzliche Bärendose
const round2 = n => Math.round(n * 100) / 100;
const to90 = n => { const v = Math.floor(n) + .9; return round2(v > n ? v - 1 : v); };   // 61,83 → 60,90, nie über dem Rabattpreis
function plansFor(p) {
  const f = PACK_INFO[p.id] || {};
  if (f.format === 'can') {
    const [n, days] = f.refill;
    const per = 30 / days;
    const refillSub = per === 1 ? `${n} Fruchtgummis, 30 Tage` : `${per} Beutel à ${n} Fruchtgummis, zusammen 30 Tage`;
    const refill = round2(p.price - REFILL_OFF);
    const stock = to90(refill * 3 * .9);   // Rabatt nie kleiner als angezeigt: auf x,90 abrunden
    return [
      // Abo-Preis bezieht sich auf den Nachfüller, weil das Abo ab der zweiten Lieferung nur Nachfüller schickt
      { id: 'abo', label: 'Abo', sub: 'Dose ohne Aufpreis, danach Nachfüller per Brief, je 20 % unter dem Nachfüller-Preis', price: aboPrice(refill), save: '−20 %', view: 'can', every: true },
      { id: 'once', label: 'Einmalkauf', sub: 'Dose mit 60 Fruchtgummis für 30 Tage', price: p.price, view: 'can' },
      { id: 'refill', label: 'Nur Nachfüller', sub: `Für deine Dose · ${refillSub}`, price: refill, view: 'refill' },
      { id: 'stock', label: '3er-Vorrat', sub: '3 Nachfüller, einzeln versiegelt, 90 Tage', price: stock, save: `−${Math.floor((1 - stock / (refill * 3)) * 100)} %`, view: 'refill' }
    ];
  }
  if (f.format === 'box') {
    return [
      { id: 'abo', label: 'Abo', sub: 'Tütchen-Box gratis, danach 30 Tütchen per Brief', price: aboPrice(p.price), save: '−20 %', view: 'box', every: true },
      { id: 'once', label: 'Einmalkauf', sub: 'Tütchen-Box mit 30 Tütchen', price: p.price, view: 'box' }
    ];
  }
  if (f.format === 'portion') {
    return [
      { id: 'abo', label: 'Abo', sub: '10 Portionen per Brief', price: aboPrice(p.price), save: '−20 %', view: 'portion', every: true },
      { id: 'once', label: 'Einmalkauf', sub: '10 Portionen à 5 Fruchtgummis', price: p.price, view: 'portion' }
    ];
  }
  return [
    { id: 'once', label: 'Einmalkauf', sub: '10 Sporttag-Tütchen, kein Abo nötig', price: p.price, view: 'sport' }
  ];
}
function planFor(item, planId) {
  if (item.members) {
    if (planId === 'abo' && item.id === BLACK_FRIDAY.bundle && bfState() === 'live') {
      const regular = aboPrice(item.price);
      return { id: 'abo', label: 'Abo', sub: `Black Week: erste Lieferung ${eur(BLACK_FRIDAY.aboPrice)}, danach ${eur(regular)} je 30 Tage`, price: BLACK_FRIDAY.aboPrice, was: regular, every: true };
    }
    return planId === 'abo'
      ? { id: 'abo', label: 'Abo', sub: item.aboSub || 'per Brief', price: aboPrice(item.price), every: true }
      : { id: 'once', label: 'Einmalkauf', sub: '', price: item.price };
  }
  const all = plansFor(item);
  return all.find(x => x.id === planId) || all.find(x => x.id === 'once') || all[0];
}
/* Nettogewicht und Grundpreis (PAngV) je Plan */
function netGrams(p, planId) {
  const f = PACK_INFO[p.id] || {};
  if (f.format === 'can') {
    const [n, days] = f.refill;
    return Math.round(n * (30 / days) * f.unit * (planId === 'stock' ? 3 : 1));
  }
  return Math.round(p.count * f.unit);
}
function unitPrice(p, planId) {
  const pl = planFor(p, planId);
  const g = netGrams(p, pl.id);
  return g ? pl.price / g * 1000 : 0;
}

const BUNDLES = {
  crew:   { id: 'crew', name: 'Die ganze Crew', title: 'GLOW, FLEX, SNOOZY und DAILY, je 30 Tage', aboSub: 'alle vier, je 30 Tage', members: ['glow', 'flex', 'snoozy', 'daily'], price: 89.90, tint: '#fbe7b5',
            includes: [
              ['Alle vier Dosen', 'GLOW, FLEX, SNOOZY und DAILY mit je 60 Fruchtgummis, zusammen 30 Tage für alle vier Ziele'],
              ['Vier Charakterkarten', 'Jeder Bär mit Steckbrief und Uhrzeit: wann welcher Gummi dran ist'],
              ['Im Abo: vier Nachfüller per Brief', 'Danach alle 30 Tage, die Dosen bleiben bei dir. Einzelne Sorten tauschen oder pausieren geht jederzeit']
            ] },
  beautysleep: { id: 'beautysleep', name: 'Morgen & Abend', title: 'GLOW zum Frühstück, SNOOZY vor dem Schlafen', aboSub: 'GLOW und SNOOZY, je 30 Tage', members: ['glow', 'snoozy'], price: 44.90, tint: '#fad4dd' },
  /* Black-Week-Koop „Glow Inside & Out“ mit SKINCARRY: GLOW von innen, Pflege von außen.
     Auswahl und Preise aus dem Skincare-Thread (koop/skincarry-glow-koop.md). Einkaufspreise sind noch Schätzungen,
     daher soon: true – nirgends sichtbar und nicht kaufbar. Zum Start: Preise bestätigen, Bilder (img) eintragen, soon entfernen.
     was = Summe der Einzelpreise. Kein Abo, die Pflegeprodukte laufen nicht im Nachfüll-Rhythmus.
     Versand als verbundener Kauf: ein Warenkorb, zwei Sendungen. Glow Complete (Panel) verkauft nur SKINCARRY. */
  glowduo: { id: 'glowduo', name: 'Glow Duo', title: 'GLOW von innen, Serum von außen', members: ['glow'], noAbo: true, tint: '#f6e1e6', soon: true,
            partner: { brand: 'SKINCARRY', items: [{ name: 'Afterlight Serum', price: 34, img: '' }] },
            price: 49, was: 60.90 },
  glowritual: { id: 'glowritual', name: 'Glow Ritual', title: 'GLOW plus das ganze Pflegeritual', members: ['glow'], noAbo: true, tint: '#f6e1e6', soon: true,
            // Nail & Hair Oil nur, wenn Selfnamed es im Katalog hat; sonst Eintrag löschen, price: 69 und was anpassen
            partner: { brand: 'SKINCARRY', items: [{ name: 'Afterlight Serum', img: '' }, { name: 'Afterglow Face Oil', img: '' }, { name: 'Nail & Hair Oil', img: '' }] },
            price: 79, was: 114.90 },
  kids:   { id: 'kids', name: 'Schul-Duo', title: '30 Tütchen mit je 1 Kiko + 1 Juno', aboSub: 'Kiko + Juno alle 30 Tage', members: ['kiko', 'juno'], price: 34.90, tint: '#fff2c2', soon: true }
};

/* Black Week: „Die ganze Crew“ im Abo, erste Lieferung zum Aktionspreis. Danach gilt der normale
   Abo-Preis, der „statt“-Preis ist also der Preis der letzten 30 Tage (PAngV § 11).
   Zeiten in deutscher Zeit. Ab teaser zählt der Banner bis zum Start, ab start bis zum Ende,
   danach ist alles wie vorher. Vorschau: ?bf=teaser, ?bf=live oder ?bf=off an die Adresse hängen. */
const BLACK_FRIDAY = {
  bundle: 'crew',
  coop: ['glowduo', 'glowritual'],         // Koop-Karten im Black-Week-Block, jeweils sobald das Set nicht mehr soon ist
  coopName: 'Glow Inside & Out',
  gift: '',                                // Crew-Beigabe, z. B. 'Gratis dazu: eine Serum-Probe von SKINCARRY'; leer = keine Zeile
  aboPrice: 59.90,                         // erste Lieferung im Abo (normal 71,92 €)
  teaser: '2026-11-09T00:00:00+01:00',
  start: '2026-11-23T00:00:00+01:00',      // Montag der Black Week
  end: '2026-12-01T00:00:00+01:00',        // bis einschließlich Cyber Monday, 30.11.
  endLabel: '30.11.'
};
function bfState(now = Date.now()) {
  const force = typeof location !== 'undefined' && /[?&#]bf=(teaser|live|off)\b/.exec(location.search + location.hash);
  if (force) return force[1];
  if (now >= Date.parse(BLACK_FRIDAY.end)) return 'off';
  if (now >= Date.parse(BLACK_FRIDAY.start)) return 'live';
  if (now >= Date.parse(BLACK_FRIDAY.teaser)) return 'teaser';
  return 'off';
}

/* Bild-Slots der Website. Alle Bilder werden eigens für die Website produziert
   (siehe assets/ASSETS.md); fehlt eine Datei, zeigt die Seite einen sauberen Platzhalter. */
/* Freigegebene Bilder: Packshot (mit Studiohintergrund) und Charakter (freigestellt).
   Büsten werden per CSS aus dem Charakterbild geschnitten, es gibt keine weiteren Varianten. */
/* Lifestyle-Fotos (assets/lifestyle/<id>.webp): Sorte hier eintragen, sobald das Foto im Ordner liegt.
   Bis dahin zeigt die Seite Packshot und Charakter, ohne eine Datei anzufragen, die es nicht gibt. */
const LIFESTYLE_READY = [];
const ASSETS = (id) => ({
  front: `assets/products/${id}-front.webp`,
  character: `assets/characters/${id}.webp`,
  lifestyle: `assets/lifestyle/${id}.webp`
});


/* SVG-Definitionen (Zuckerkristalle, Weichzeichner) einmal pro Seite einhängen */
function ensureDefs() {
  if (document.getElementById('sugar')) return;
  const holder = document.createElement('div');
  holder.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <pattern id="sugar" width="56" height="56" patternUnits="userSpaceOnUse">
      <rect x="4" y="6" width="3.4" height="3" rx=".9" fill="#fff" opacity=".85" transform="rotate(18 5 7)"/>
      <rect x="31" y="3" width="2.6" height="2.4" rx=".7" fill="#fff" opacity=".6"/>
      <rect x="45" y="17" width="3.6" height="3" rx=".9" fill="#fff" opacity=".8" transform="rotate(-22 46 18)"/>
      <rect x="17" y="24" width="2.6" height="2.4" rx=".7" fill="#fff" opacity=".55" transform="rotate(40 18 25)"/>
      <rect x="36" y="35" width="3.4" height="2.8" rx=".9" fill="#fff" opacity=".8"/>
      <rect x="6" y="42" width="3" height="2.6" rx=".8" fill="#fff" opacity=".7" transform="rotate(-30 7 43)"/>
      <rect x="23" y="49" width="2.4" height="2.2" rx=".6" fill="#fff" opacity=".5"/>
      <rect x="50" y="48" width="2.8" height="2.4" rx=".7" fill="#fff" opacity=".65" transform="rotate(25 51 49)"/>
    </pattern>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="softer" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs></svg>`;
  document.body.prepend(holder.firstElementChild);
}
ensureDefs();

/* ------------------------------------------------------------------ */
/* Gummibär als SVG                                                    */
/* ------------------------------------------------------------------ */
let uid = 0;
const SILHOUETTE = `
  <circle cx="58" cy="38" r="22"/><circle cx="142" cy="38" r="22"/>
  <ellipse cx="100" cy="78" rx="56" ry="48"/>
  <ellipse cx="100" cy="166" rx="60" ry="62"/>
  <ellipse cx="44" cy="142" rx="19" ry="30" transform="rotate(32 44 142)"/>
  <ellipse cx="156" cy="142" rx="19" ry="30" transform="rotate(-32 156 142)"/>
  <ellipse cx="64" cy="216" rx="28" ry="24"/><ellipse cx="136" cy="216" rx="28" ry="24"/>`;

function eyes(mood) {
  const open = (x) => `<ellipse cx="${x}" cy="80" rx="5.6" ry="7.6" fill="${INK}"/><circle cx="${x + 2}" cy="76.5" r="2.1" fill="#fff"/>`;
  const big = (x) => `<ellipse cx="${x}" cy="79" rx="7.4" ry="9.4" fill="${INK}"/><circle cx="${x + 2.4}" cy="75" r="2.8" fill="#fff"/><circle cx="${x - 2.4}" cy="83" r="1.2" fill="#fff"/>`;
  const closed = (x) => `<path d="M${x - 7} 80 Q${x} 87 ${x + 7} 80" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
  const lash = (x, side) => `<path d="M${x + side * 4.6} 76.5 l${side * 4.6} -1.6" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
  switch (mood) {
    case 'sleepy': return closed(82) + closed(118);
    case 'wide': return big(82) + big(118);
    case 'lashes': return open(82) + open(118) + lash(82, -1) + lash(118, 1);
    case 'wink': return open(82) + `<path d="M111 82 Q118 74 125 82" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` + lash(82, -1);
    case 'determined': return open(82) + open(118) +
      `<path d="M73 66 L91 71 M127 66 L109 71" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>`;
    default: return open(82) + open(118);
  }
}

function mouth(mood) {
  switch (mood) {
    case 'sleepy': return `<path d="M95 96 Q100 100 105 96" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    case 'wide': return `<ellipse cx="100" cy="100" rx="5.5" ry="6.5" fill="${INK}"/><ellipse cx="100" cy="103" rx="3.4" ry="2.4" fill="#ff7a93"/>`;
    case 'grin': case 'cool': return `<path d="M89 93 Q100 109 111 93 Z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M94 100 Q100 104 106 100 Q100 106 94 100Z" fill="#ff7a93"/>`;
    case 'determined': return `<path d="M91 97 Q100 102 109 95" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
    default: return `<path d="M91 94 Q100 103 109 94" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
  }
}

function star(x, y, s, fill) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C1.5 -2 2 -1.5 10 0 C2 1.5 1.5 2 0 10 C-1.5 2 -2 1.5 -10 0 C-2 -1.5 -1.5 -2 0 -10Z" fill="${fill}" stroke="${INK}" stroke-width="${1.6 / s}" stroke-linejoin="round"/>`;
}

/* Zubehör, das innerhalb der Bärenform liegt (wird mit ausgeschnitten) */
function accInside(p) {
  switch (p.acc) {
    case 'headband': return `<g transform="rotate(-5 100 56)"><rect x="30" y="47" width="140" height="15" fill="#fff"/><rect x="30" y="52" width="140" height="5" fill="${p.dark}"/></g>`;
    case 'goggles': return `<rect x="30" y="50" width="140" height="7" fill="${INK}"/>`;
    default: return '';
  }
}
/* Zubehör, das oben drauf liegt */
function accOutside(p) {
  switch (p.acc) {
    case 'zz': return `<g fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 10 h12 l-12 13 h12"/><path d="M8 -8 h8 l-8 9 h8"/></g>`;
    case 'shades': return `<g><rect x="66" y="69" width="30" height="20" rx="9" fill="${INK}"/><rect x="104" y="69" width="30" height="20" rx="9" fill="${INK}"/><path d="M96 75 h8" stroke="${INK}" stroke-width="4"/><path d="M60 74 l6 1 M134 75 l6 -1" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/><path d="M72 74 l8 -2 M110 74 l8 -2" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></g>`;
    case 'sparkles': return star(30, 66, 1, '#fff') + star(176, 108, .8, '#fff') + star(168, 14, .6, '#fff');
    case 'drop': return `<path transform="translate(150 70)" d="M0 -13 C5 -5 9 0 9 5 A9 9 0 0 1 -9 5 C-9 0 -5 -5 0 -13Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + star(36, 40, .55, '#fff');
    case 'glasses': return `<g fill="#fff" fill-opacity=".22" stroke="${INK}" stroke-width="3.6"><circle cx="82" cy="80" r="14"/><circle cx="118" cy="80" r="14"/></g><path d="M96 78 Q100 74 104 78" fill="none" stroke="${INK}" stroke-width="3.4"/>`;
    case 'bolt': return `<path d="M178 52 l-16 24 h11 l-8 22 l22 -30 h-12 l9 -16z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M22 70 l-9 -6 M20 84 l-11 0 M24 98 l-9 6" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    case 'cap': return `<path d="M46 60 Q48 22 100 20 Q152 22 154 60 Q100 46 46 60Z" fill="${INK}"/><path d="M146 54 Q176 50 186 60 Q166 66 148 62Z" fill="${INK}"/><circle cx="100" cy="21" r="4" fill="${p.light}"/><path d="M70 30 Q100 22 130 30" fill="none" stroke="${p.light}" stroke-width="3" opacity=".6"/>`;
    case 'goggles': return `<g stroke="${INK}" stroke-width="3.4"><circle cx="82" cy="54" r="12" fill="#bfeaff"/><circle cx="118" cy="54" r="12" fill="#bfeaff"/></g><path d="M77 50 l5 -4 M113 50 l5 -4" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`;
    case 'bow': return `<g transform="translate(58 22) rotate(-14)"><path d="M0 0 L-20 -12 L-18 12Z M0 0 L20 -12 L18 12Z" fill="#ffd84d" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/><circle r="5" fill="#ffd84d" stroke="${INK}" stroke-width="2.6"/></g>`;
    default: return '';
  }
}

function bear(p, opts = {}) {
  const { face = true, shadow = true, x, y, width, height, label = true, flat = false } = opts;
  const id = 'bb' + (++uid);
  // In einer anderen SVG platziert: Inline-Style schlägt die CSS-Regel .bear-svg { width: 100% }
  const h = height || width * 1.33;
  const place = width !== undefined ? ` x="${x || 0}" y="${y || 0}" width="${width}" height="${h}" style="width:${width}px;height:${h}px;filter:none"` : '';
  const aria = label ? `role="img" aria-label="${p.name}, ${p.title}"` : 'aria-hidden="true"';
  return `<svg class="bear-svg"${place} viewBox="0 -14 200 266" ${aria}>
  <defs>
    <clipPath id="${id}c">${SILHOUETTE}</clipPath>
    <radialGradient id="${id}g" cx="36%" cy="28%" r="85%">
      <stop offset="0" stop-color="${p.light}"/><stop offset=".42" stop-color="${p.color}"/><stop offset="1" stop-color="${p.dark}"/>
    </radialGradient>
    <radialGradient id="${id}v" cx="50%" cy="52%" r="58%">
      <stop offset=".55" stop-color="${p.dark}" stop-opacity="0"/><stop offset="1" stop-color="${p.dark}" stop-opacity=".6"/>
    </radialGradient>
  </defs>
  ${shadow ? `<ellipse cx="100" cy="244" rx="66" ry="6" fill="${INK}" opacity=".12"/>` : ''}
  <g clip-path="url(#${id}c)">
    <rect x="0" y="0" width="200" height="250" fill="url(#${id}g)"/>
    <rect x="0" y="0" width="200" height="250" fill="url(#${id}v)"/>
    <circle cx="58" cy="38" r="10" fill="${p.dark}" opacity=".28"/><circle cx="142" cy="38" r="10" fill="${p.dark}" opacity=".28"/>
    <ellipse cx="100" cy="172" rx="34" ry="40" fill="${p.light}" opacity=".3" filter="url(#softer)"/>
    ${flat ? '' : `<ellipse cx="72" cy="54" rx="17" ry="9" transform="rotate(-32 72 54)" fill="#fff" opacity=".7" filter="url(#soft)"/>
    <ellipse cx="66" cy="50" rx="6" ry="3.4" transform="rotate(-32 66 50)" fill="#fff" opacity=".95"/>
    <ellipse cx="60" cy="152" rx="8" ry="22" transform="rotate(22 60 152)" fill="#fff" opacity=".42" filter="url(#soft)"/>
    <ellipse cx="50" cy="28" rx="6" ry="3.5" transform="rotate(-40 50 28)" fill="#fff" opacity=".65"/>
    <ellipse cx="142" cy="196" rx="10" ry="16" fill="${p.dark}" opacity=".25" filter="url(#softer)"/>
    ${p.sour ? '<rect x="0" y="0" width="200" height="250" fill="#fff" opacity=".1"/><rect x="0" y="0" width="200" height="250" fill="url(#sugar)" opacity=".75"/>' : ''}`}
    ${face ? accInside(p) : ''}
  </g>
  ${face ? `
  <ellipse cx="68" cy="95" rx="8.5" ry="4.6" fill="#ff5c8a" opacity=".38"/>
  <ellipse cx="132" cy="95" rx="8.5" ry="4.6" fill="#ff5c8a" opacity=".38"/>
  ${eyes(p.mood)}${mouth(p.mood)}${accOutside(p)}` : ''}
</svg>`;
}

window.Baerly = { ...(window.Baerly || {}), BRAND, INK, ABO_FACTOR, EXTRA_CAN, eur, aboPrice, PRODUCTS, byId, BUNDLES, BLACK_FRIDAY, bfState, PACK_INFO, PDP, pdpUrl, ASSETS, LIFESTYLE_READY, plansFor, planFor, netGrams, unitPrice, bear };
})();
