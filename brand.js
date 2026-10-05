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
  {
    id: 'mags', name: 'Mags', title: 'Magnesium Gummies', cat: 'balance', line: 'adult',
    flavor: 'Blaue Himbeere · sauer', sour: true,
    color: '#2f6bff', light: '#9cbcff', dark: '#1636a8', tint: '#d9e6ff',
    word: 'CHILL', mood: 'sleepy', acc: 'zz',
    headline: 'Dein Kopf darf jetzt Feierabend machen.',
    hello: 'Hi, ich bin Mags. Schultern runter.',
    story: 'Ich bin der ruhigste Bär im Glas. Ich kümmere mich um deine Muskeln nach dem Training und um deinen Kopf nach einem langen Tag. Sauer im Geschmack, entspannt im Charakter.',
    facts: [['150 mg', 'Magnesium'], ['40 %', 'des Tagesbedarfs'], ['2 Gummies', 'pro Tag'], ['Vegan', 'Pektin statt Gelatine']],
    nutrients: [['Magnesium (Bisglycinat)', '150 mg', '40 %']],
    claim: 'Magnesium trägt zur Verringerung von Müdigkeit und Ermüdung und zu einer normalen Muskelfunktion bei.',
    serving: '2 Gummies täglich', count: 60, price: 24.90, vegan: true, doses: {}
  },
  {
    id: 'sunny', name: 'Sunny', title: 'Vitamin D3 + K2 Gummies', cat: 'balance', line: 'adult',
    flavor: 'Orange-Mango',
    color: '#ff8a1f', light: '#ffc27a', dark: '#c4500a', tint: '#ffe6cc',
    word: 'SONNE', mood: 'cool', acc: 'shades',
    headline: 'Sonne zum Kauen. Auch im November.',
    hello: 'Sunny hier. Ich hab Sonne dabei.',
    story: 'Von Oktober bis März steht die Sonne in Deutschland so tief, dass deine Haut kaum Vitamin D bilden kann. Also bringe ich es mit, und Vitamin K2 gleich dazu.',
    facts: [['20 µg', 'Vitamin D3 (800 IE)'], ['50 µg', 'Vitamin K2 (MK-7)'], ['1 Gummy', 'pro Tag'], ['Vegan', 'D3 aus Flechten']],
    nutrients: [['Vitamin D3', '20 µg', '400 %'], ['Vitamin K2 (MK-7)', '50 µg', '67 %']],
    claim: 'Vitamin D trägt zu einer normalen Funktion des Immunsystems und zur Erhaltung normaler Knochen bei. Vitamin K trägt zur Erhaltung normaler Knochen bei.',
    serving: '1 Gummy täglich', count: 30, price: 19.90, vegan: true, doses: { vitD: 20 }
  },
  {
    id: 'glow', name: 'Glow', title: 'Hair, Skin & Nails Gummies', cat: 'beauty', line: 'adult',
    flavor: 'Erdbeere',
    color: '#ff4fa3', light: '#ffa8d2', dark: '#c21470', tint: '#ffdcee',
    word: 'GLOW', mood: 'lashes', acc: 'sparkles',
    headline: 'Haare, Haut und Nägel fangen innen an.',
    hello: 'Ich bin Glow. Geduld steht dir.',
    story: 'Biotin, Zink und Selen, die drei Klassiker für Haare und Nägel, in einem Erdbeer-Gummy. Über Nacht passiert nichts, ein Haar wächst etwa einen Zentimeter im Monat. Aber ich bleibe dran.',
    facts: [['450 µg', 'Biotin'], ['5 mg', 'Zink'], ['55 µg', 'Selen'], ['2 Gummies', 'pro Tag']],
    nutrients: [['Biotin', '450 µg', '900 %'], ['Zink', '5 mg', '50 %'], ['Selen', '55 µg', '100 %']],
    claim: 'Biotin, Zink und Selen tragen zur Erhaltung normaler Haare und Nägel bei. Biotin und Zink tragen zur Erhaltung normaler Haut bei.',
    serving: '2 Gummies täglich', count: 60, price: 26.90, vegan: true, doses: { zinc: 5 }
  },
  {
    id: 'dew', name: 'Dew', title: 'Kollagen + Vitamin C Gummies', cat: 'beauty', line: 'adult',
    flavor: 'Litschi-Holunderblüte',
    color: '#8b5cf6', light: '#c7adff', dark: '#5527c9', tint: '#ece3ff',
    word: 'DEW', mood: 'wink', acc: 'drop',
    headline: 'Der Glow, den man nicht aufträgt.',
    hello: 'Dew. Freut mich, Haut.',
    story: 'Dein Körper braucht Vitamin C, um selbst Kollagen zu bilden. Ich bringe beides mit, dazu Hyaluronsäure. Schmeckt nach Litschi und Holunderblüte.',
    facts: [['1 g', 'Kollagenpeptide'], ['80 mg', 'Vitamin C'], ['50 mg', 'Hyaluronsäure'], ['2 Gummies', 'pro Tag']],
    nutrients: [['Kollagenpeptide (Fisch)', '1.000 mg', '–'], ['Vitamin C', '80 mg', '100 %'], ['Hyaluronsäure', '50 mg', '–']],
    claim: 'Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.',
    serving: '2 Gummies täglich', count: 60, price: 27.90, vegan: false, doses: {}
  },
  {
    id: 'brainy', name: 'Brainy', title: 'Omega-3 Gummies aus Algenöl', cat: 'focus', line: 'adult',
    flavor: 'Zitrone-Limette',
    color: '#10b39a', light: '#80e3d4', dark: '#087766', tint: '#d3f5ef',
    word: 'FOKUS', mood: 'smart', acc: 'glasses',
    headline: 'Omega-3 aus der Alge. Ohne Fischgeschmack.',
    hello: 'Brainy. Ich hab nachgelesen.',
    story: 'Fische haben ihr DHA aus Algen. Ich nehme die Abkürzung. 250 mg pro Portion, Zitrone-Limette, kein Fischaufstoßen. Klingt nerdig, schmeckt aber nicht so.',
    facts: [['250 mg', 'DHA aus Algenöl'], ['125 mg', 'EPA'], ['3 Gummies', 'pro Tag'], ['Vegan', 'ohne Fisch']],
    nutrients: [['DHA', '250 mg', '–'], ['EPA', '125 mg', '–']],
    claim: 'DHA trägt zur Erhaltung einer normalen Gehirnfunktion und normaler Sehkraft bei. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 250 mg DHA ein.',
    serving: '3 Gummies täglich', count: 90, price: 29.90, vegan: true, doses: {}
  },
  {
    id: 'flex', name: 'Flex', title: 'Kreatin Gummies', cat: 'sport', line: 'adult',
    flavor: 'Kirsche-Cola',
    color: '#e8263b', light: '#ff8b97', dark: '#a10d1f', tint: '#ffdde1',
    word: 'WUMMS', mood: 'determined', acc: 'headband',
    headline: 'Kreatin, das du nicht anrühren musst.',
    hello: 'Flex. Noch ein Satz?',
    story: '3 Gramm Kreatin-Monohydrat pro Portion, genau die Menge aus den Studien. Kein Shaker, kein Pulver im Rucksack, keine Klümpchen. Vier Gummies, fertig.',
    facts: [['3 g', 'Kreatin-Monohydrat'], ['4 Gummies', 'pro Tag'], ['120', 'Gummies im Glas'], ['Vegan', 'Pektin statt Gelatine']],
    nutrients: [['Kreatin-Monohydrat', '3.000 mg', '–']],
    claim: 'Kreatin erhöht die körperliche Leistung bei Schnellkrafttraining im Rahmen kurzzeitiger intensiver körperlicher Betätigung. Die positive Wirkung stellt sich bei einer täglichen Aufnahme von 3 g Kreatin ein.',
    serving: '4 Gummies täglich', count: 120, price: 29.90, vegan: true, doses: {}, adultOnly: true
  },
  {
    id: 'zap', name: 'Zap', title: 'Koffein + L-Theanin Gummies', cat: 'focus', line: 'adult',
    flavor: 'Zitrone · sauer', sour: true,
    color: '#ffc21a', light: '#ffe48a', dark: '#b88200', tint: '#fff2c2',
    word: 'WACH', mood: 'wide', acc: 'bolt',
    headline: 'Ein Espresso. Zum Kauen.',
    hello: 'ZAP! Oh, hallo.',
    story: '80 mg Koffein, so viel wie ein Espresso, plus L-Theanin, damit du nicht zappelig wirst. Zitrone, richtig sauer. Für Erwachsene, nicht nach 16 Uhr und ganz sicher nicht für deine Kids.',
    facts: [['80 mg', 'Koffein'], ['100 mg', 'L-Theanin'], ['1 Gummy', 'bei Bedarf'], ['18+', 'nur für Erwachsene']],
    nutrients: [['Koffein', '80 mg', '–'], ['L-Theanin', '100 mg', '–']],
    claim: 'Für Koffein gibt es in der EU keine zugelassene gesundheitsbezogene Angabe. Deshalb sagen wir dir nur, was drin ist.',
    warn: 'Erhöhter Koffeingehalt. Für Kinder und schwangere oder stillende Frauen nicht empfohlen.',
    serving: '1 Gummy, max. 2 täglich', count: 30, price: 19.90, vegan: true, doses: {}, adultOnly: true
  },
  {
    id: 'shield', name: 'Shield', title: 'Immun Gummies: Vitamin C, Zink, D3', cat: 'balance', line: 'adult',
    flavor: 'Grüner Apfel · sauer', sour: true,
    color: '#3fbf5a', light: '#9fe6ab', dark: '#1e7f35', tint: '#dcf6e1',
    word: 'ABWEHR', mood: 'grin', acc: 'none',
    headline: 'Für die Wochen, in denen alle husten.',
    hello: 'Shield. Ich halt die Stellung.',
    story: 'Vitamin C, Zink und Vitamin D in einem sauren Apfel-Gummy. Ich bin kein Wundermittel gegen die Bürogrippe. Aber ich sorge dafür, dass dein Immunsystem bekommt, was es für seine normale Funktion braucht.',
    facts: [['80 mg', 'Vitamin C'], ['5 mg', 'Zink'], ['10 µg', 'Vitamin D3'], ['2 Gummies', 'pro Tag']],
    nutrients: [['Vitamin C', '80 mg', '100 %'], ['Zink', '5 mg', '50 %'], ['Vitamin D3', '10 µg', '200 %']],
    claim: 'Vitamin C, Zink und Vitamin D tragen zu einer normalen Funktion des Immunsystems bei.',
    serving: '2 Gummies täglich', count: 60, price: 21.90, vegan: true, doses: { zinc: 5, vitD: 10 }
  },
  {
    id: 'buff', name: 'Buff', title: 'Protein Gummies', cat: 'sport', line: 'adult',
    flavor: 'Salted Caramel',
    color: '#c8732e', light: '#efb47c', dark: '#7c3e12', tint: '#f6e3cf',
    word: 'PROTEIN', mood: 'determined', acc: 'none',
    headline: '10 g Protein, die nach Snack schmecken.',
    hello: 'Buff. Snack oder Mahlzeit? Ja.',
    story: 'Fünf von mir sind 10 Gramm Protein aus Kollagen und Molke. Salted Caramel. Für zwischendurch, wenn ein Shake zu viel und ein Riegel zu trocken ist.',
    facts: [['10 g', 'Protein'], ['5 Gummies', 'pro Portion'], ['20', 'Portionen im Glas'], ['Snack', 'statt Riegel']],
    nutrients: [['Protein', '10 g', '–']],
    claim: 'Eiweiß trägt zu einer Zunahme und zur Erhaltung von Muskelmasse bei.',
    serving: '5 Gummies als Snack', count: 100, price: 24.90, vegan: false, doses: {}
  },
  {
    id: 'kiko', name: 'Kiko', title: 'Kids Schul-Fokus Gummies', cat: 'kids', line: 'kids',
    flavor: 'Kiwi-Limette',
    color: '#8bd12e', light: '#c9f07f', dark: '#4e8a0c', tint: '#eaf8d2',
    word: 'SCHULE', mood: 'grin', acc: 'cap',
    headline: 'Für die erste Reihe. Und die letzte.',
    hello: 'Kiko! Ich sitz vorne.',
    power: 'Eisen + Jod + DHA',
    story: 'Ich habe Eisen und Jod dabei, beides brauchen Kinderköpfe für ihre normale Entwicklung, und DHA aus Algen. Ein Gummy in die Brotdose, fertig.',
    facts: [['3,5 mg', 'Eisen'], ['50 µg', 'Jod'], ['100 mg', 'DHA aus Algen'], ['4–12', 'Jahre']],
    nutrients: [['Eisen', '3,5 mg', '25 %'], ['Jod', '50 µg', '33 %'], ['DHA', '100 mg', '–']],
    claim: 'Eisen trägt zur normalen kognitiven Entwicklung von Kindern bei. Jod trägt zu einer normalen kognitiven Funktion bei.',
    serving: '1 Gummy täglich', count: 30, price: 19.90, vegan: true, doses: {}
  },
  {
    id: 'splash', name: 'Splash', title: 'Kids Elektrolyt Gummies', cat: 'kids', line: 'kids',
    flavor: 'Kokos-Ananas',
    color: '#1eb8f0', light: '#8edcf8', dark: '#0a78a6', tint: '#d5f1fc',
    word: 'SPLASH', mood: 'wide', acc: 'goggles',
    headline: 'Nach dem Sportunterricht.',
    hello: 'Splash! Trink was!',
    power: 'Kalium + Magnesium',
    story: 'Nach dem Sportunterricht fehlt nicht nur Wasser. Ich bringe Kalium, Magnesium und ein bisschen Natrium mit. Trinken musst du trotzdem selbst.',
    facts: [['150 mg', 'Kalium'], ['40 mg', 'Magnesium'], ['50 mg', 'Natrium'], ['4–12', 'Jahre']],
    nutrients: [['Kalium', '150 mg', '8 %'], ['Magnesium', '40 mg', '11 %'], ['Natrium', '50 mg', '–']],
    claim: 'Kalium und Magnesium tragen zu einer normalen Muskelfunktion bei.',
    serving: '1 Gummy täglich', count: 30, price: 19.90, vegan: true, doses: {}
  },
  {
    id: 'juno', name: 'Juno', title: 'Kids Vitamin D Gummies', cat: 'kids', line: 'kids',
    flavor: 'Erdbeere-Banane',
    color: '#ff5a5f', light: '#ffa3a5', dark: '#c0262c', tint: '#ffe0df',
    word: 'WACHSEN', mood: 'lashes', acc: 'bow',
    headline: 'Für Knochen, die schneller wachsen als die Hosen.',
    hello: 'Juno. Ich wachse noch!',
    power: 'Vitamin D3',
    story: 'Kinderknochen wachsen wie verrückt, und dafür brauchen sie Vitamin D. Ein Gummy zum Frühstück, Erdbeere-Banane.',
    facts: [['10 µg', 'Vitamin D3'], ['1 Gummy', 'pro Tag'], ['4–12', 'Jahre'], ['Vegan', 'D3 aus Flechten']],
    nutrients: [['Vitamin D3', '10 µg', '200 %']],
    claim: 'Vitamin D wird für ein gesundes Wachstum und eine gesunde Entwicklung der Knochen bei Kindern benötigt.',
    serving: '1 Gummy täglich', count: 30, price: 19.90, vegan: true, doses: {}
  }
];
const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

/* Packungstexte: kurzer Nährstoffname, Dosis-Badge, Bezeichnung nach NemV.
   Nettogewicht = Stückzahl × Stückgewicht (Richtwert, mit Hersteller bestätigen). */
const PACK_INFO = {
  mags:   { nutrient: 'Magnesium',              dose: '150 mg',  legal: 'Nahrungsergänzungsmittel mit Magnesium' },
  sunny:  { nutrient: 'Vitamin D3 + K2',        dose: '20 µg D3', legal: 'Nahrungsergänzungsmittel mit Vitamin D3 und K2' },
  glow:   { nutrient: 'Biotin · Zink · Selen',  dose: '450 µg',  legal: 'Nahrungsergänzungsmittel mit Biotin, Zink und Selen' },
  dew:    { nutrient: 'Kollagen + Vitamin C',   dose: '1 g',     legal: 'Nahrungsergänzungsmittel mit Kollagen und Vitamin C' },
  brainy: { nutrient: 'Omega-3 aus Algen',      dose: '250 mg',  legal: 'Nahrungsergänzungsmittel mit DHA aus Algenöl' },
  flex:   { nutrient: 'Kreatin',                dose: '3 g',     legal: 'Nahrungsergänzungsmittel mit Kreatin' },
  zap:    { nutrient: 'Koffein + L-Theanin',    dose: '80 mg',   legal: 'Nahrungsergänzungsmittel mit Koffein' },
  shield: { nutrient: 'Vitamin C · Zink · D3',  dose: '80 mg C', legal: 'Nahrungsergänzungsmittel mit Vitamin C, Zink und Vitamin D' },
  buff:   { nutrient: 'Protein',                dose: '10 g',    legal: 'Nahrungsergänzungsmittel mit Protein' },
  kiko:   { nutrient: 'Eisen · Jod · DHA',      dose: '3,5 mg',  legal: 'Nahrungsergänzungsmittel mit Eisen, Jod und DHA' },
  splash: { nutrient: 'Elektrolyte',            dose: '150 mg',  legal: 'Nahrungsergänzungsmittel mit Kalium und Magnesium' },
  juno:   { nutrient: 'Vitamin D3',             dose: '10 µg',   legal: 'Nahrungsergänzungsmittel mit Vitamin D3' }
};


const BUNDLES = {
  beauty: { id: 'beauty', name: 'Beauty Stack', title: 'Glow + Dew', members: ['glow', 'dew'], price: 44.90, tint: '#ffdcee' },
  kids:   { id: 'kids', name: 'Schulstart-Box', title: 'Kiko, Splash und Juno', members: ['kiko', 'splash', 'juno'], price: 49.90, tint: '#fff2c2' }
};

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
  const { face = true, shadow = true, x, y, width, height, label = true } = opts;
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
    <ellipse cx="72" cy="54" rx="17" ry="9" transform="rotate(-32 72 54)" fill="#fff" opacity=".7" filter="url(#soft)"/>
    <ellipse cx="66" cy="50" rx="6" ry="3.4" transform="rotate(-32 66 50)" fill="#fff" opacity=".95"/>
    <ellipse cx="60" cy="152" rx="8" ry="22" transform="rotate(22 60 152)" fill="#fff" opacity=".42" filter="url(#soft)"/>
    <ellipse cx="50" cy="28" rx="6" ry="3.5" transform="rotate(-40 50 28)" fill="#fff" opacity=".65"/>
    <ellipse cx="142" cy="196" rx="10" ry="16" fill="${p.dark}" opacity=".25" filter="url(#softer)"/>
    ${p.sour ? '<rect x="0" y="0" width="200" height="250" fill="#fff" opacity=".1"/><rect x="0" y="0" width="200" height="250" fill="url(#sugar)" opacity=".75"/>' : ''}
    ${face ? accInside(p) : ''}
  </g>
  ${face ? `
  <ellipse cx="68" cy="95" rx="8.5" ry="4.6" fill="#ff5c8a" opacity=".38"/>
  <ellipse cx="132" cy="95" rx="8.5" ry="4.6" fill="#ff5c8a" opacity=".38"/>
  ${eyes(p.mood)}${mouth(p.mood)}${accOutside(p)}` : ''}
</svg>`;
}

window.Baerly = { BRAND, INK, ABO_FACTOR, eur, aboPrice, PRODUCTS, byId, BUNDLES, PACK_INFO, bear };
})();
