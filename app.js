/* bärly – Shop-Prototyp
   Alles läuft im Browser: Produktdaten, Hero-Karussell, Bären-Finder, Warenkorb (localStorage).
   Markenname, Preise und Rezepturen sind Platzhalter. */

(() => {
'use strict';

const BRAND = 'bärly';
const SHIPPING_FREE = 35;
const ABO_FACTOR = 0.8;          // 20 % Rabatt im Abo
const INK = '#1d1236';

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

const BUNDLES = {
  beauty: { id: 'beauty', name: 'Beauty Stack', title: 'Glow + Dew', members: ['glow', 'dew'], price: 44.90, tint: '#ffdcee' },
  kids:   { id: 'kids', name: 'Schulstart-Box', title: 'Kiko, Splash und Juno', members: ['kiko', 'splash', 'juno'], price: 49.90, tint: '#fff2c2' }
};

const HERO = ['mags', 'sunny', 'glow', 'flex', 'brainy', 'zap', 'kiko'].map(id => byId[id]);

const GOALS = [
  { id: 'sleep',  label: 'Besser abschalten',   c: '#2f6bff', ids: ['mags'] },
  { id: 'beauty', label: 'Haut, Haare, Nägel',  c: '#ff4fa3', ids: ['glow', 'dew'] },
  { id: 'focus',  label: 'Fokus',               c: '#10b39a', ids: ['brainy'] },
  { id: 'energy', label: 'Energie ohne Kaffee', c: '#ffc21a', ids: ['zap'] },
  { id: 'sport',  label: 'Training',            c: '#e8263b', ids: ['flex', 'buff'] },
  { id: 'immune', label: 'Immunsystem',         c: '#3fbf5a', ids: ['shield', 'sunny'] },
  { id: 'kids',   label: 'Für mein Kind',       c: '#8bd12e', ids: ['kiko', 'splash', 'juno'] }
];

/* Höchstmengen-Empfehlungen des BfR für Nahrungsergänzungsmittel (pro Tag) */
const LIMITS = {
  zinc: { label: 'Zink', unit: 'mg', max: 6.5 },
  vitD: { label: 'Vitamin D', unit: 'µg', max: 20 }
};

const FILTERS = [
  { id: 'all', label: 'Alle' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'balance', label: 'Balance' },
  { id: 'focus', label: 'Fokus & Energie' },
  { id: 'sport', label: 'Sport' },
  { id: 'kids', label: 'Kids' }
];

/* ------------------------------------------------------------------ */
/* Helfer                                                              */
/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const eur = n => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
const aboPrice = n => Math.round(n * ABO_FACTOR * 100) / 100;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

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
  const { face = true } = opts;
  const id = 'bb' + (++uid);
  return `<svg class="bear-svg" viewBox="0 -14 200 266" role="img" aria-label="${p.name}, ${p.title}">
  <defs>
    <clipPath id="${id}c">${SILHOUETTE}</clipPath>
    <radialGradient id="${id}g" cx="36%" cy="28%" r="85%">
      <stop offset="0" stop-color="${p.light}"/><stop offset=".42" stop-color="${p.color}"/><stop offset="1" stop-color="${p.dark}"/>
    </radialGradient>
    <radialGradient id="${id}v" cx="50%" cy="52%" r="58%">
      <stop offset=".55" stop-color="${p.dark}" stop-opacity="0"/><stop offset="1" stop-color="${p.dark}" stop-opacity=".6"/>
    </radialGradient>
  </defs>
  <ellipse cx="100" cy="244" rx="66" ry="6" fill="${INK}" opacity=".12"/>
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

/* ------------------------------------------------------------------ */
/* Hero-Karussell                                                      */
/* ------------------------------------------------------------------ */
const hero = $('#hero');
const stage = $('#heroStage');
const bubble = $('#heroBubble');
const copy = $('#heroCopy');
const facts = $('#heroFacts');
const word = $('#heroWord');
const thumbs = $('#heroThumbs');
const HERO_MS = 6500;
let cur = 0;
let busy = false;

function setTheme(p) {
  root.style.setProperty('--hero-bg', p.tint);
  root.style.setProperty('--hero-color', p.color);
  root.style.setProperty('--hero-deep', p.dark);
}

function copyHTML(p, i) {
  const num = String(i + 1).padStart(2, '0');
  return `
    <p class="hero-tag"><i></i>${num} / ${String(HERO.length).padStart(2, '0')} · ${p.title}</p>
    <h1 class="hero-title">${p.headline}</h1>
    <p class="hero-story">${p.story}</p>
    <div class="hero-ctas">
      <button class="btn btn-ink" type="button" data-add="${p.id}">In den Warenkorb · ${eur(p.price)}</button>
      <button class="btn btn-ghost" type="button" data-detail="${p.id}">Mehr über ${p.name}</button>
    </div>`;
}
function factsHTML(p) {
  // Dosierung steht schon im Kopf des Etiketts
  return p.facts.filter(([, s]) => !/^(pro Tag|pro Portion|bei Bedarf)$/.test(s)).map(([b, s]) => `<li><span>${s}</span><b>${b}</b></li>`).join('');
}
function wordHTML(p) {
  return [...p.word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('');
}

function makeHeroBear(p) {
  const el = document.createElement('div');
  el.className = 'hero-bear';
  el.innerHTML = `<div class="bear-float"><div class="bear-tilt">${bear(p)}</div></div>`;
  stage.insertBefore(el, bubble);
  return el;
}

function showBubble(p) {
  bubble.textContent = p.hello;
  bubble.classList.add('show');
}

function swap(el, html) {
  if (reduced) { el.innerHTML = html; return; }
  el.classList.remove('swap-in');
  el.classList.add('swap-out');
  setTimeout(() => {
    el.innerHTML = html;
    el.classList.remove('swap-out');
    void el.offsetWidth;
    el.classList.add('swap-in');
  }, 280);
}

function swapWord(p) {
  word.innerHTML = wordHTML(p);
  if (reduced) return;
  $$('span', word).forEach((s, i) => s.animate(
    [{ transform: 'translateY(60%) rotate(8deg)', opacity: 0 }, { transform: 'none', opacity: 1 }],
    { duration: 700, delay: 260 + i * 45, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }
  ));
}

function renderThumbs() {
  thumbs.innerHTML = HERO.map((p, i) =>
    `<button class="thumb" type="button" role="tab" aria-selected="${i === cur}" aria-label="${p.name}: ${p.title}" data-i="${i}" style="--dur:${HERO_MS}ms">
      ${bear(p, { face: false })}<span class="thumb-bar"></span></button>`).join('');
}
function updateThumbs() {
  $$('.thumb', thumbs).forEach((t, i) => t.setAttribute('aria-selected', String(i === cur)));
}

function goTo(i, dir) {
  i = (i + HERO.length) % HERO.length;
  if (busy || i === cur) return;
  busy = true;
  if (dir === undefined) dir = i > cur ? 1 : -1;
  const p = HERO[i];
  const out = $('.hero-bear:not(.leaving)', stage);
  out.classList.add('leaving');
  bubble.classList.remove('show');
  const inc = makeHeroBear(p);

  cur = i;
  updateThumbs();
  setTheme(p);
  swap(copy, copyHTML(p, i));
  swap(facts, factsHTML(p));
  $('#heroServing').textContent = p.serving;
  swapWord(p);

  const done = () => { busy = false; showBubble(p); };
  const safety = setTimeout(done, 1600);

  if (reduced) {
    out.remove();
    clearTimeout(safety); done();
    return;
  }

  // Alter Bär fliegt nach oben links raus, neuer kommt von unten rechts
  const exitTo = dir > 0
    ? 'translate(-75%, -55%) rotate(-38deg) scale(.45)'
    : 'translate(80%, 70%) rotate(38deg) scale(.45)';
  out.animate(
    [{ transform: 'none', opacity: 1 }, { transform: exitTo, opacity: 0 }],
    { duration: 620, easing: 'cubic-bezier(.55,0,.8,.3)', fill: 'forwards' }
  ).finished.then(() => out.remove()).catch(() => out.remove());

  const enterFrom = dir > 0
    ? 'translate(115%, 105%) rotate(55deg) scale(.4)'
    : 'translate(-110%, -95%) rotate(-55deg) scale(.4)';
  inc.animate([
    { transform: enterFrom, opacity: 0 },
    { opacity: 1, offset: .2 },
    { transform: 'translate(0,0) rotate(-7deg) scale(1.07)', offset: .66 },
    { transform: 'translate(0,0) rotate(3deg) scale(.97)', offset: .84 },
    { transform: 'none', opacity: 1 }
  ], { duration: 1150, delay: 160, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'backwards' })
    .finished.then(() => { clearTimeout(safety); done(); }).catch(() => {});
}

function initHero() {
  const p = HERO[0];
  setTheme(p);
  makeHeroBear(p);
  copy.innerHTML = copyHTML(p, 0);
  facts.innerHTML = factsHTML(p);
  $('#heroServing').textContent = p.serving;
  word.innerHTML = wordHTML(p);
  renderThumbs();
  setTimeout(() => showBubble(p), 600);

  if (reduced) hero.classList.add('paused');

  thumbs.addEventListener('click', e => {
    const t = e.target.closest('.thumb');
    if (t) goTo(+t.dataset.i);
  });
  thumbs.addEventListener('animationend', e => {
    if (e.animationName === 'progress' && !reduced) goTo(cur + 1, 1);
  });
  $('#heroPrev').addEventListener('click', () => goTo(cur - 1, -1));
  $('#heroNext').addEventListener('click', () => goTo(cur + 1, 1));

  // Pause, wenn jemand mit dem Bären spielt oder liest
  const pause = () => hero.classList.add('paused');
  const resume = () => { if (!reduced) hero.classList.remove('paused'); };
  [stage, copy].forEach(el => {
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);
  });
  hero.addEventListener('focusin', pause);
  hero.addEventListener('focusout', resume);
  new IntersectionObserver(([en]) => en.isIntersecting ? resume() : pause(), { threshold: .3 }).observe(hero);

  // Bär folgt der Maus ein bisschen
  hero.addEventListener('pointermove', e => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    const t = $('.hero-bear:not(.leaving) .bear-tilt', stage);
    if (!t) return;
    t.style.setProperty('--px', (dx * 18).toFixed(1) + 'px');
    t.style.setProperty('--py', (dy * 12).toFixed(1) + 'px');
    t.style.setProperty('--ry', (dx * 22).toFixed(1) + 'deg');
    t.style.setProperty('--rx', (-dy * 14).toFixed(1) + 'deg');
  });

  // Wischen und Antippen
  let sx = 0, sy = 0, down = false;
  stage.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sy = e.clientY; });
  stage.addEventListener('pointerup', e => {
    if (!down) return;
    down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      goTo(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    } else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const t = $('.hero-bear:not(.leaving) .bear-tilt', stage);
      if (t) { t.classList.remove('squish'); void t.offsetWidth; t.classList.add('squish'); }
      showBubble(HERO[cur]);
    }
  });
  hero.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') goTo(cur + 1, 1);
    if (e.key === 'ArrowLeft') goTo(cur - 1, -1);
  });
}

/* ------------------------------------------------------------------ */
/* Shop                                                                */
/* ------------------------------------------------------------------ */
const grid = $('#productGrid');
const filtersEl = $('#filters');
let activeFilter = store('baerly-filter') || 'all';

function cardHTML(p) {
  const badges = [
    p.line === 'kids' ? '<span class="badge badge-dark">Kids</span>' : '',
    p.sour ? '<span class="badge">Sauer</span>' : '',
    p.adultOnly ? '<span class="badge">18+</span>' : '',
    !p.vegan ? '<span class="badge">nicht vegan</span>' : ''
  ].join('');
  return `<article class="card" data-cat="${p.cat}" style="--tint:${p.tint};--c:${p.color}">
    <button class="card-visual" type="button" data-detail="${p.id}" aria-label="Details zu ${p.name}">
      <span class="card-word" aria-hidden="true">${p.word}</span>
      <span class="bear-wrap">${bear(p)}</span>
      <span class="badges">${badges}</span>
    </button>
    <div class="card-body">
      <div class="card-top"><h3 class="card-name">${p.name}</h3><span class="card-price">${eur(p.price)}</span></div>
      <p class="card-sub">${p.title}</p>
      <p class="card-flavor">${p.flavor} · ${p.count} Stück</p>
    </div>
    <div class="card-actions">
      <button class="btn btn-ink add-btn" type="button" data-add="${p.id}">In den Warenkorb</button>
    </div>
  </article>`;
}

function renderShop() {
  grid.innerHTML = PRODUCTS.map(cardHTML).join('');
  filtersEl.innerHTML = FILTERS.map(f =>
    `<button class="filter" type="button" role="tab" data-filter="${f.id}" aria-selected="${f.id === activeFilter}">${f.label}</button>`).join('');
  applyFilter();
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    activeFilter = b.dataset.filter;
    store('baerly-filter', activeFilter);
    $$('.filter', filtersEl).forEach(x => x.setAttribute('aria-selected', String(x === b)));
    applyFilter(true);
  });
}
function applyFilter(animate) {
  $$('.card', grid).forEach((c, i) => {
    const show = activeFilter === 'all' || c.dataset.cat === activeFilter;
    c.classList.toggle('is-hidden', !show);
    if (show && animate && !reduced) {
      c.animate([{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }],
        { duration: 450, delay: i * 25, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Bären-Finder                                                        */
/* ------------------------------------------------------------------ */
const chips = $('#goalChips');
const result = $('#finderResult');
let goals = new Set(store('baerly-goals') || ['beauty', 'sleep']);

function renderChips() {
  chips.innerHTML = GOALS.map(g =>
    `<button class="chip" type="button" data-goal="${g.id}" aria-pressed="${goals.has(g.id)}" style="--c:${g.c}">
      <span class="chip-dot"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5l2.6 2.5L11 4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${g.label}</button>`).join('');
}

function renderResult() {
  const ids = [...new Set(GOALS.filter(g => goals.has(g.id)).flatMap(g => g.ids))];
  if (!ids.length) {
    result.innerHTML = `<p class="finder-empty">Wähl oben mindestens ein Ziel. Dann stellt sich hier deine Bande auf.</p>`;
    return;
  }
  const items = ids.map(id => byId[id]);
  const total = items.reduce((s, p) => s + p.price, 0);
  const adult = items.filter(p => p.line === 'adult');

  // Nährstoffe im Stack zusammenrechnen und mit BfR-Höchstmengen vergleichen
  const warnings = Object.entries(LIMITS).map(([k, l]) => {
    const sum = adult.reduce((s, p) => s + (p.doses[k] || 0), 0);
    if (sum <= l.max) return '';
    const who = adult.filter(p => p.doses[k]).map(p => p.name).join(' und ');
    return `<p class="warn"><b>${l.label}: ${sum.toLocaleString('de-DE')} ${l.unit} im Stack</b>Das BfR empfiehlt aus Nahrungsergänzung höchstens ${l.max.toLocaleString('de-DE')} ${l.unit} pro Tag. Nimm ${who} abwechselnd statt am selben Tag.</p>`;
  }).join('');
  const mixed = adult.length && items.some(p => p.line === 'kids')
    ? `<p class="warn"><b>Kids-Bären gehören in die Brotdose</b>Kiko, Splash und Juno sind für dein Kind dosiert und zählen nicht zu deinem eigenen Stack.</p>` : '';

  result.innerHTML = `
    <div class="finder-lineup">${items.map(p =>
      `<div class="finder-bear"><button type="button" data-detail="${p.id}" aria-label="Details zu ${p.name}">${bear(p)}</button><span>${p.name}</span></div>`).join('')}</div>
    <div class="finder-summary">
      <h3>${items.length === 1 ? 'Dein Bär' : `Deine Bande: ${items.length} Bären`}</h3>
      <div class="finder-price"><strong>${eur(aboPrice(total))}</strong><span>pro Monat im Abo, statt ${eur(total)}</span></div>
      ${warnings}${mixed}
      <button class="btn btn-ink" type="button" data-add-many="${ids.join(',')}">Im Abo in den Warenkorb</button>
    </div>`;
}

function initFinder() {
  renderChips();
  renderResult();
  chips.addEventListener('click', e => {
    const c = e.target.closest('.chip');
    if (!c) return;
    const g = c.dataset.goal;
    goals.has(g) ? goals.delete(g) : goals.add(g);
    c.setAttribute('aria-pressed', String(goals.has(g)));
    store('baerly-goals', [...goals]);
    renderResult();
  });
}

/* ------------------------------------------------------------------ */
/* Beauty + Kids                                                       */
/* ------------------------------------------------------------------ */
function initBeauty() {
  $('#beautyDuo').innerHTML =
    `<div class="duo duo-1"><button type="button" data-detail="glow" aria-label="Details zu Glow">${bear(byId.glow)}</button></div>
     <div class="duo duo-2"><button type="button" data-detail="dew" aria-label="Details zu Dew">${bear(byId.dew)}</button></div>`;

  const fill = $('#timelineFill');
  const sec = $('#beauty');
  const onScroll = () => {
    const r = sec.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight * .2)));
    fill.style.setProperty('--t', (0.08 + t * 0.92).toFixed(3));
  };
  if (!reduced) {
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initKids() {
  const kids = PRODUCTS.filter(p => p.line === 'kids');
  $('#kidsStage').innerHTML = kids.map(p =>
    `<button class="kid" type="button" data-detail="${p.id}" aria-label="${p.name}: ${p.title}">
      <span class="kid-bubble">${p.hello}</span>
      <span class="bear-wrap">${bear(p)}</span>
      <span class="kid-name">${p.name}</span>
      <span class="kid-power">${p.power}</span>
    </button>`).join('');
}

/* ------------------------------------------------------------------ */
/* Produkt-Modal                                                       */
/* ------------------------------------------------------------------ */
const modal = $('#modal');
const modalInner = $('#modalInner');

function openDetail(id) {
  const p = byId[id];
  if (!p) return;
  modalInner.style.setProperty('--tint', p.tint);
  modalInner.innerHTML = `
    <div class="modal-visual">
      <button class="round-btn" type="button" data-close aria-label="Schließen">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      </button>
      <span class="bear-wrap">${bear(p)}</span>
    </div>
    <div class="modal-body">
      <div>
        <p class="eyebrow">${p.line === 'kids' ? 'bärly kids · 4–12 Jahre' : p.title}</p>
        <h2>${p.name}</h2>
      </div>
      <p class="modal-sub">${p.flavor} · ${p.count} Gummies · ${p.serving}${p.vegan ? ' · vegan' : ' · nicht vegan'}</p>
      <p class="modal-story">${p.story}</p>
      <table class="nutri">
        <caption>Pro Tagesportion</caption>
        <thead><tr><th scope="col">Nährstoff</th><th scope="col">Menge</th><th scope="col">% NRV*</th></tr></thead>
        <tbody>${p.nutrients.map(([n, a, r]) => `<tr><th scope="row">${n}</th><td>${a}</td><td>${r}</td></tr>`).join('')}</tbody>
      </table>
      <p class="claim"><b>Was wir sagen dürfen</b>${p.claim}</p>
      ${p.warn ? `<p class="modal-warn">${p.warn}</p>` : ''}
      <div class="plan-pick" role="radiogroup" aria-label="Kaufart">
        <label class="plan-opt"><span><input type="radio" name="plan" id="planAbo" value="abo" checked>Abo<small>alle 30 Tage</small><em class="save">−20 %</em></span><strong>${eur(aboPrice(p.price))}</strong></label>
        <label class="plan-opt"><span><input type="radio" name="plan" id="planOnce" value="once">Einmalkauf</span><strong>${eur(p.price)}</strong></label>
      </div>
      <button class="btn btn-ink btn-block" type="button" data-modal-add="${p.id}">In den Warenkorb</button>
      <p class="footnote">* NRV = Nährstoffbezugswert für Erwachsene laut EU-Verordnung 1169/2011.</p>
    </div>`;
  if (!modal.open) modal.showModal();
}
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-close]')) modal.close();
  const add = e.target.closest('[data-modal-add]');
  if (add) {
    const plan = $('input[name="plan"]:checked', modal)?.value || 'once';
    addToCart(add.dataset.modalAdd, plan, add);
    modal.close();
  }
});

/* ------------------------------------------------------------------ */
/* Warenkorb                                                           */
/* ------------------------------------------------------------------ */
let cart = store('baerly-cart') || [];
const drawer = $('#drawer');
const overlay = $('#overlay');

function itemInfo(id) {
  if (byId[id]) return byId[id];
  return BUNDLES[id];
}
function linePrice(l) {
  const it = itemInfo(l.id);
  return (l.plan === 'abo' ? aboPrice(it.price) : it.price) * l.qty;
}
function saveCart() { store('baerly-cart', cart); }

function addToCart(id, plan = 'once', fromEl) {
  const it = itemInfo(id);
  if (!it) return;
  const found = cart.find(l => l.id === id && l.plan === plan);
  found ? found.qty++ : cart.push({ id, plan, qty: 1 });
  saveCart();
  renderCart();
  flyToCart(id, fromEl);
  toast(`${it.name} liegt im Warenkorb`);
}

function miniBear(id) {
  const b = BUNDLES[id];
  if (b) return byId[b.members[0]];
  return byId[id];
}

function flyToCart(id, fromEl) {
  const target = $('#cartOpen');
  target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump');
  if (reduced || !fromEl) return;
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'flyer';
  fly.innerHTML = bear(miniBear(id), { face: true });
  fly.style.left = (a.left + a.width / 2 - 28) + 'px';
  fly.style.top = (a.top + a.height / 2 - 32) + 'px';
  document.body.append(fly);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  fly.animate([
    { transform: 'translate(0,0) scale(1) rotate(0)' },
    { transform: `translate(${dx * .5}px, ${dy * .5 - 120}px) scale(1.2) rotate(-200deg)`, offset: .5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.3) rotate(-360deg)`, opacity: .6 }
  ], { duration: 800, easing: 'cubic-bezier(.45,0,.25,1)' }).finished.then(() => fly.remove());
}

function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  $('#cartCount').textContent = count;
  const total = cart.reduce((s, l) => s + linePrice(l), 0);
  $('#cartTotal').textContent = eur(total);

  const missing = Math.max(0, SHIPPING_FREE - total);
  $('#ship').innerHTML = (missing > 0
    ? `Noch <b>${eur(missing)}</b> bis zum Gratisversand.`
    : `<b>Gratisversand ist drin.</b> Die Bären reisen kostenlos.`) +
    `<div class="ship-bar"><span style="width:${Math.min(100, total / SHIPPING_FREE * 100)}%"></span></div>`;

  const items = $('#drawerItems');
  if (!cart.length) {
    items.innerHTML = `<div class="drawer-empty"><span class="bear-wrap">${bear(byId.mags)}</span>Noch leer hier. Mags schläft schon.</div>`;
    return;
  }
  items.innerHTML = cart.map((l, i) => {
    const it = itemInfo(l.id);
    const mb = miniBear(l.id);
    return `<div class="line" style="--tint:${it.tint}">
      <div class="line-img">${bear(mb)}</div>
      <div>
        <p class="line-name">${it.name}</p>
        <p class="line-meta">${it.title}</p>
        ${BUNDLES[l.id] ? '' : `<div class="line-plan" role="group" aria-label="Kaufart">
          <button type="button" data-plan="${i}" data-val="abo" aria-pressed="${l.plan === 'abo'}">Abo −20 %</button>
          <button type="button" data-plan="${i}" data-val="once" aria-pressed="${l.plan === 'once'}">Einmal</button>
        </div>`}
      </div>
      <div class="line-right">
        <span class="line-price">${eur(linePrice(l))}</span>
        <div class="qty">
          <button type="button" data-qty="${i}" data-d="-1" aria-label="Eins weniger">−</button>
          <span>${l.qty}</span>
          <button type="button" data-qty="${i}" data-d="1" aria-label="Eins mehr">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

$('#drawerItems').addEventListener('click', e => {
  const q = e.target.closest('[data-qty]');
  if (q) {
    const l = cart[+q.dataset.qty];
    l.qty += +q.dataset.d;
    if (l.qty <= 0) cart.splice(+q.dataset.qty, 1);
  }
  const pl = e.target.closest('[data-plan]');
  if (pl) {
    const l = cart[+pl.dataset.plan];
    const other = cart.find(x => x !== l && x.id === l.id && x.plan === pl.dataset.val);
    if (other) { other.qty += l.qty; cart.splice(cart.indexOf(l), 1); }
    else l.plan = pl.dataset.val;
  }
  if (q || pl) { saveCart(); renderCart(); }
});

let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  overlay.hidden = false;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  $('#cartClose').focus();
}
function closeCart() {
  overlay.hidden = true;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.();
}
$('#cartOpen').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
$('#checkout').addEventListener('click', () => {
  const n = $('#checkoutNote');
  n.textContent = cart.length
    ? 'Prototyp: Hier geht es später zum Shopify-Checkout. Dein Warenkorb bleibt gespeichert.'
    : 'Dein Warenkorb ist noch leer. Such dir erst einen Bären aus.';
});

/* ------------------------------------------------------------------ */
/* Toast, Delegation, Kleinkram                                        */
/* ------------------------------------------------------------------ */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, 'once', add);
    add.classList.add('added');
    const label = add.textContent;
    add.textContent = 'Drin!';
    setTimeout(() => { add.classList.remove('added'); add.textContent = label; }, 1400);
    return;
  }
  const many = e.target.closest('[data-add-many]');
  if (many) {
    many.dataset.addMany.split(',').forEach((id, i) => setTimeout(() => addToCart(id, 'abo', many), i * 140));
    return;
  }
  const bundle = e.target.closest('[data-bundle]');
  if (bundle) { addToCart(bundle.dataset.bundle, 'once', bundle); return; }
  const det = e.target.closest('[data-detail]');
  if (det) openDetail(det.dataset.detail);
});

$('#signup').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#signupEmail').value.trim();
  const msg = $('#signupMsg');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.';
    return;
  }
  msg.textContent = 'Du stehst auf der Liste. (Prototyp: Die Anmeldung wird noch nicht gespeichert.)';
  e.target.reset();
});

const nav = $('.nav');
addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', scrollY > hero.offsetTop + hero.offsetHeight - 90);
}, { passive: true });

/* Ankündigungsleiste: auf dem Handy eine Nachricht nach der anderen */
const annItems = $$('#announce li');
let ann = 0;
setInterval(() => {
  if (document.hidden) return;
  annItems[ann].classList.remove('is-active');
  ann = (ann + 1) % annItems.length;
  annItems[ann].classList.add('is-active');
}, 3800);

/* Start */
initHero();
renderShop();
initFinder();
initBeauty();
initKids();
renderCart();
document.title = `${BRAND} Gummies`;
})();
