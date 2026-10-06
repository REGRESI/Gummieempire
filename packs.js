/* bärly – Verpackungen als SVG
   Zeichnet die Vorderseiten aller Formate aus PACK_INFO (brand.js), nach dem Raster in verpackung.html:

   Erwachsene: Produktfarbe · Wortmarke · Nutzenwort · Bär (Ohren überlappen das Wort) ·
               Namensschild mit Nährstoffzeile und zugelassener Angabe* · Tatzen-Dosis an der
               rechten oberen Ecke · Badges · weißes Pflichtband (Bezeichnung + Füllmenge).
   Kids:       cremeweißer Grund, Farbe nur im Kopfband und in den Ohren, ruhiger Bär,
               gelbes Tages-Siegel als größtes Typo-Element, Texte an Eltern.
   Zap:        Tinte vollflächig, ESPRESSO und Blitz in Gelb, Bär nur als Kopf-Umriss, 18+.

   Maße in Millimetern stehen bei jeder Funktion; die Zeichnungen sind maßstäblich. */

(() => {
'use strict';

const { INK, byId, bear, PACK_INFO } = window.Baerly;
const DISPLAY = "Fredoka, 'Arial Rounded MT Bold', Arial, sans-serif";
const BODY = "Figtree, 'Segoe UI', Arial, sans-serif";
const HAND = "Caveat, 'Comic Sans MS', cursive";
const YELLOW = '#ffd84d';
const ZAPYELLOW = '#ffc21a';
const CREAM = '#fffdf7';

let uid = 0;
const nid = (p) => p + (++uid);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const info = (p) => PACK_INFO[p.id] || {};
const items = (m) => (Array.isArray(m) ? m : [m]).map(x => typeof x === 'string' ? byId[x] : x);

/* Text auf Zeilen umbrechen (SVG kann das nicht selbst) */
function wrap(text, max) {
  const out = [];
  let line = '';
  String(text).split(' ').forEach(w => {
    if ((line + ' ' + w).trim().length > max) { if (line) out.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  });
  if (line) out.push(line);
  return out;
}
function lines(x, y, arr, size, lh, attrs) {
  return arr.map((t, i) => `<text x="${x}" y="${y + i * lh}" font-size="${size}" ${attrs}>${esc(t)}</text>`).join('');
}
function txt(x, y, s, size, attrs = '') {
  return `<text x="${x}" y="${y}" font-size="${size}" ${attrs}>${esc(s)}</text>`;
}
const D = (w = 800) => `font-family="${DISPLAY}" font-weight="${w}"`;
const B = (w = 600) => `font-family="${BODY}" font-weight="${w}"`;

function crimp(x, y, w, h, color) {
  const n = Math.floor(w / 4);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>
  <g stroke="#000" stroke-opacity=".12" stroke-width="1">${Array.from({ length: n }, (_, i) => `<line x1="${x + 2 + i * 4}" y1="${y + 1.5}" x2="${x + 2 + i * 4}" y2="${y + h - 1.5}"/>`).join('')}</g>`;
}

/* Tatzen-Dosis: Pfote in Tinte, 5 Zehenballen, davon n in Produktfarbe. Zahl weiß im Ballen.
   (cx, cy) = Mitte, d = Durchmesser der Pfote in px */
function paw(cx, cy, d, n, color, opts = {}) {
  const s = d / 48;
  const ink = opts.ink || INK;
  const empty = opts.empty || '#fff';
  const toes = [[-15, -14, 4.6], [-7, -20.5, 5], [2.5, -22, 5], [11.5, -19, 4.8], [18, -11.5, 4.3]];
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    ${toes.map(([x, y, r], i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.15}" fill="${i < n ? color : empty}" stroke="${ink}" stroke-width="2"/>`).join('')}
    <path d="M-16 5 C-16 -7 -6 -10 1 -10 C8 -10 18 -7 18 5 C18 14 10 17 1 17 C-8 17 -16 14 -16 5Z" fill="${ink}"/>
    <text x="1" y="11" text-anchor="middle" ${D()} font-size="19" fill="#fff">${n}</text>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* Bärendose: Lager-Alu-Dose, Ø 70 mm, Höhe 100 mm (std) / 150 mm (gross)
   Wechsel-Banderole 72 mm (gross 110 mm) mit gestanzten Ohren, Deckel-Tatze */
/* ------------------------------------------------------------------ */
const CAN = {
  std:   { body: 100, label: 72, name: 'Bärendose', ml: 330 },
  gross: { body: 150, label: 110, name: 'Bärendose Groß', ml: 500 }
};
const PX = 180 / 70;   // 180 px = Ø 70 mm

function can(p, opts = {}) {
  const f = info(p);
  const size = CAN[opts.size || f.can || 'std'];
  const id = nid('cn');
  const g = size === CAN.gross ? 1.3 : 1;             // Typo-Faktor der großen Banderole
  const bx = 30, cw = 180, lidTop = 30, lidH = 22 * PX * .62;
  const top = lidTop + lidH;                           // Körper beginnt unter dem Deckel
  const bodyH = size.body * PX;
  const bottom = top + bodyH;
  const labH = size.label * PX;
  const labTop = top + (bodyH - labH) * .55;
  const mm = (v) => labTop + v * (labH / 72);         // y-Zonen aus dem 72-mm-Raster
  const VH = bottom + 26;
  const [n, days] = f.refill || [p.count, 30];
  const per = 30 / days;
  const grams = Math.round(n * per * (f.unit || 3));
  const count = n * per;
  const claim = wrap((f.claim || '') + '*', 46);
  const word = p.word;
  const wordSize = 34 * g;
  const doseLines = wrap(`${f.nutrient} · ${f.dose} pro Tag`, 30).slice(0, 2);
  const claimLines = claim.slice(0, g > 1 ? 3 : 2);
  const cardY = mm(g > 1 ? 44 : 46);
  const cardH = (20 + doseLines.length * 6.4 + 1 + claimLines.length * 5.6 + 2.5) * g;
  const bearY = mm(18.5);                              // Ohren überlappen die Wort-Unterkante um ca. 3 mm
  const bearH = cardY + 10 - bearY;
  const bearW = bearH * .75;
  const legalLines = wrap(`${f.legal} · ${n * (30 / days)} Fruchtgummis = ${Math.round(n * (30 / days) * (f.unit || 3))} g`, 58);
  const legalY = labTop + labH - (legalLines.length * 5.2 + 4) * g;
  void grams; void count;
  return `<svg class="pack pack-can" viewBox="0 0 240 ${VH}" role="img" aria-label="${esc(size.name)} ${esc(p.name)}: ${esc(f.legal)}">
  <defs>
    <linearGradient id="${id}cyl" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".12" stop-color="#000" stop-opacity=".05"/>
      <stop offset=".25" stop-color="#fff" stop-opacity=".28"/><stop offset=".34" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset=".9" stop-color="#000" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000" stop-opacity=".34"/>
    </linearGradient>
    <linearGradient id="${id}alu" x1="0" x2="1">
      <stop offset="0" stop-color="#9a96a3"/><stop offset=".22" stop-color="#f3f2f6"/><stop offset=".45" stop-color="#cfccd6"/><stop offset=".75" stop-color="#ebe9f0"/><stop offset="1" stop-color="#85808f"/>
    </linearGradient>
    <pattern id="${id}brush" width="3" height="240" patternUnits="userSpaceOnUse"><rect width="1" height="240" fill="#fff" opacity=".18"/></pattern>
    <clipPath id="${id}body"><path d="M${bx} ${top} H${bx + cw} V${bottom} A${cw / 2} 12 0 0 1 ${bx} ${bottom} Z"/></clipPath>
  </defs>
  <ellipse cx="120" cy="${bottom + 13}" rx="102" ry="9" fill="${INK}" opacity=".16"/>

  <!-- Körper aus gebürstetem Alu -->
  <g clip-path="url(#${id}body)">
    <rect x="${bx}" y="${top}" width="${cw}" height="${bodyH + 14}" fill="url(#${id}alu)"/>
    <rect x="${bx}" y="${top}" width="${cw}" height="${bodyH + 14}" fill="url(#${id}brush)"/>

    <!-- Wechsel-Banderole mit gestanzten Ohren -->
    <circle cx="${120 - 36}" cy="${labTop - 5}" r="${8 * PX}" fill="${p.color}"/>
    <circle cx="${120 + 36}" cy="${labTop - 5}" r="${8 * PX}" fill="${p.color}"/>
    <circle cx="${120 - 36}" cy="${labTop - 5}" r="${4.2 * PX}" fill="${p.light}" opacity=".7"/>
    <circle cx="${120 + 36}" cy="${labTop - 5}" r="${4.2 * PX}" fill="${p.light}" opacity=".7"/>
    <rect x="${bx}" y="${labTop}" width="${cw}" height="${labH}" fill="${p.color}"/>

    <circle cx="120" cy="${bearY + bearH * .52}" r="${bearH * .575}" fill="${p.light}" opacity=".6"/>
    ${txt(120, mm(6.2), 'bärly', 14 * g, `text-anchor="middle" ${D()} letter-spacing="-.5" fill="${INK}"`)}
    <text x="120" y="${mm(20.5)}" text-anchor="middle" ${D()} font-size="${wordSize}" fill="${INK}" textLength="${Math.min(150, wordSize * .6 * word.length)}" lengthAdjust="spacingAndGlyphs">${esc(word)}</text>
    ${bear(p, { x: 120 - bearW / 2, y: bearY, width: bearW, height: bearH, shadow: false, label: false })}

    <rect x="${120 - 32 * PX * .9}" y="${cardY}" width="${64 * PX * .9}" height="${cardH}" rx="7" fill="#fff"/>
    ${txt(120 - 32 * PX * .9 + 7, cardY + 12.5 * g, p.name, 13 * g, `${D()} letter-spacing="-.3" fill="${INK}"`)}
    ${lines(120 - 32 * PX * .9 + 7, cardY + 20 * g, doseLines, 5.6 * g, 6.4 * g, `${B(700)} fill="${INK}"`)}
    ${lines(120 - 32 * PX * .9 + 7, cardY + (20 + doseLines.length * 6.4 + 1) * g, claimLines, 4.7 * g, 5.6 * g, `${B(500)} fill="${INK}"`)}
    ${paw(120 + 32 * PX * .9 - 6, cardY + 1, 15 * PX * .9, f.perDay || 1, p.color)}
    ${txt(120 + 32 * PX * .9 - 6, cardY + 17 * g, `${f.perDay} am Tag`, 4.4 * g, `text-anchor="middle" ${B(700)} fill="${INK}"`)}

    <rect x="${bx}" y="${legalY}" width="${cw}" height="${labTop + labH - legalY}" fill="#fff"/>
    ${lines(120, legalY + 6 * g, legalLines, 4.5 * g, 5.2 * g, `text-anchor="middle" ${B(600)} fill="${INK}"`)}

    <rect x="${bx}" y="${top}" width="${cw}" height="${bodyH + 14}" fill="url(#${id}cyl)"/>
  </g>

  <!-- Lager-Schraubdeckel aus Alu mit Deckel-Tatze -->
  <rect x="${bx - 3}" y="${lidTop}" width="${cw + 6}" height="${lidH}" rx="5" fill="url(#${id}alu)"/>
  <g stroke="#000" stroke-opacity=".12" stroke-width="1.4">${Array.from({ length: 30 }, (_, i) => `<line x1="${bx + 2 + i * 6}" y1="${lidTop + 6}" x2="${bx + 2 + i * 6}" y2="${lidTop + lidH - 4}"/>`).join('')}</g>
  <ellipse cx="120" cy="${lidTop + 1}" rx="${cw / 2 + 3}" ry="10" fill="#e9e7ee"/>
  <ellipse cx="120" cy="${lidTop + 1}" rx="${27 * PX * .9}" ry="7.4" fill="#fff"/>
  <g transform="translate(0 ${lidTop + 1}) scale(1 .28) translate(0 ${-(lidTop + 1)})">${paw(120, lidTop + 1, 20 * PX * .9, f.perDay || 1, p.color)}</g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Nachfüller S/M/L: flacher Mono-PE-Beutel. Master M = 165 × 235 mm.   */
/* variant: 'refill' | 'trial' | 'duo1' | 'duo2'                        */
/* ------------------------------------------------------------------ */
function stamp(cx, cy, r, color) {
  const pid = nid('st');
  return `<g transform="rotate(-12 ${cx} ${cy})">
    <defs><path id="${pid}" d="M${cx - r + 4.5} ${cy} A${r - 4.5} ${r - 4.5} 0 1 1 ${cx + r - 4.5} ${cy} A${r - 4.5} ${r - 4.5} 0 1 1 ${cx - r + 4.5} ${cy}"/></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="2.5 2"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 9}" fill="none" stroke="${color}" stroke-width="1"/>
    <text ${D()} font-size="4.4" letter-spacing=".6" fill="${color}"><textPath href="#${pid}" startOffset="25%" text-anchor="middle">PASST DURCH DEN BRIEFKASTEN · MAX. 2 CM ·</textPath></text>
    <rect x="${cx - 7}" y="${cy - 5}" width="14" height="10" rx="1.5" fill="none" stroke="${color}" stroke-width="1.4"/>
    <path d="M${cx - 7} ${cy - 4} L${cx} ${cy + 1} L${cx + 7} ${cy - 4}" fill="none" stroke="${color}" stroke-width="1.4"/>
  </g>`;
}

/* Badge-Reihe: Pills, max. 3; die dritte ist das dunkle Format-Pill */
function badgeRow(x, y, list) {
  let cx = x;
  return list.filter(Boolean).slice(0, 3).map((t, i, arr) => {
    const dark = i === arr.length - 1 && arr.length === 3;
    const w = t.length * 3.6 + 12;
    const out = `<rect x="${cx}" y="${y - 8}" width="${w}" height="11" rx="5.5" fill="${dark ? INK : '#fff'}" ${dark ? '' : `stroke="${INK}" stroke-opacity=".15"`}/>
      <text x="${cx + w / 2}" y="${y - 0.5}" text-anchor="middle" ${D(700)} font-size="6" letter-spacing=".3" fill="${dark ? '#fff' : INK}">${esc(t)}</text>`;
    cx += w + 4;
    return out;
  }).join('');
}

function refill(p, opts = {}) {
  if (p.pack) return refillBrand(p, opts);
  const f = info(p);
  const id = nid('rf');
  const variant = opts.variant || 'refill';
  const W = 220, H = 313, k = W / 165;                 // px pro mm
  const y = (v) => v * k;
  const [n0, days0] = f.refill || [p.count, 30];
  const n = variant === 'trial' ? f.perDay * 7 : n0;
  const grams = Math.round(n * (f.unit || 3));
  const claim = wrap((f.claim || '') + '*', 46);
  const pill = {
    refill: days0 === 30 ? 'NACHFÜLLER · 30 TAGE' : 'NACHFÜLLER',
    trial: 'PROBIERWOCHE · 7 TAGE',
    duo1: 'BEUTEL 1 VON 2 · TAG 1–15',
    duo2: 'BEUTEL 2 VON 2 · TAG 16–30'
  }[variant];
  const bearH = y(84), bearW = bearH * .75;
  const cardY = y(146), cardH = y(54);
  return `<svg class="pack pack-refill" viewBox="0 0 ${W} ${H + 12}" role="img" aria-label="${variant === 'trial' ? 'Probierwoche' : 'Nachfüller'} ${esc(p.name)}: ${esc(f.legal)}, ${n} Fruchtgummis = ${grams} g">
  <defs>
    <clipPath id="${id}c"><rect x="0" y="0" width="${W}" height="${H}" rx="${y(5)}"/></clipPath>
    <mask id="${id}m"><rect x="0" y="0" width="${W}" height="${H}" fill="#fff"/><path d="M${W} ${y(14) - 5} l-7 5 l7 5Z M0 ${y(14) - 5} l7 5 l-7 5Z" fill="#000"/></mask>
    <radialGradient id="${id}pil" cx="45%" cy="45%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/>
    </radialGradient>
  </defs>
  <ellipse cx="${W / 2}" cy="${H + 6}" rx="${W * .42}" ry="6" fill="${INK}" opacity=".14"/>
  <g mask="url(#${id}m)"><g clip-path="url(#${id}c)">
    <rect width="${W}" height="${H}" fill="${p.color}"/>
    <!-- Kopfband mit Ohrbögen: die Produktfarbe ragt als zwei Ohren ins Band -->
    <rect width="${W}" height="${y(24)}" fill="${p.dark}"/>
    <circle cx="${W * .25}" cy="${y(24)}" r="${y(13)}" fill="${p.color}"/>
    <circle cx="${W * .75}" cy="${y(24)}" r="${y(13)}" fill="${p.color}"/>
    <circle cx="${W * .25}" cy="${y(24)}" r="${y(6.5)}" fill="${p.light}" opacity=".6"/>
    <circle cx="${W * .75}" cy="${y(24)}" r="${y(6.5)}" fill="${p.light}" opacity=".6"/>
    ${txt(W / 2, y(14.5), 'bärly', y(10), `text-anchor="middle" ${D()} letter-spacing="-.6" fill="#fff"`)}
    ${variant === 'trial' ? '' : stamp(W - y(18), y(15), y(12), '#fff')}
    <line x1="0" y1="${y(27)}" x2="${W}" y2="${y(27)}" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="4 3"/>

    <circle cx="${W / 2}" cy="${y(56) + bearH * .52}" r="${bearH * .575}" fill="${p.light}" opacity=".55"/>
    ${bear(p, { x: W / 2 - bearW / 2, y: y(56), width: bearW, height: bearH, shadow: false, label: false })}
    <text x="${W / 2}" y="${y(60)}" text-anchor="middle" ${D()} font-size="${y(37)}" fill="${INK}" textLength="${Math.min(W - y(24), y(37) * .6 * p.word.length)}" lengthAdjust="spacingAndGlyphs">${esc(p.word)}</text>

    <rect x="${y(12)}" y="${cardY}" width="${W - y(24)}" height="${cardH}" rx="${y(6)}" fill="#fff"/>
    ${txt(y(19), cardY + y(14), p.name, y(13), `${D()} letter-spacing="-.4" fill="${INK}"`)}
    ${lines(y(19), cardY + y(22), wrap(`${f.nutrient} · ${f.dose} pro Tagesportion`, 36).slice(0, 2), 6.6, 7.6, `${B(700)} fill="${INK}"`)}
    ${lines(y(19), cardY + y(22) + wrap(`${f.nutrient} · ${f.dose} pro Tagesportion`, 36).slice(0, 2).length * 7.6 + 2, claim.slice(0, 3), 5.9, 7, `${B(500)} fill="${INK}"`)}
    ${paw(W - y(20), cardY + y(1), y(26), f.perDay || 1, p.color)}
    ${txt(W - y(20), cardY + y(19), `${f.perDay} am Tag`, 5.4, `text-anchor="middle" ${B(800)} fill="${INK}"`)}
    ${txt(W - y(20), cardY + y(23.5), variant === 'trial' ? '7 Tage' : (days0 === 30 ? '30 Tage' : '15 Tage'), 5.4, `text-anchor="middle" ${B(600)} fill="${INK}"`)}

    ${badgeRow(y(12), y(208), [p.flavor, p.vegan ? 'vegan' : null, pill].filter(Boolean).length === 3 ? [p.flavor, 'vegan', pill] : [p.flavor, pill, null])}

    <rect x="0" y="${y(216)}" width="${W}" height="${y(12)}" fill="#fff"/>
    ${lines(W / 2, y(220.6), wrap(`${f.legal} · ${n} Fruchtgummis = ${grams} g`, 62), 5.4, 6.4, `text-anchor="middle" ${B(600)} fill="${INK}"`)}
    ${crimp(0, y(228), W, H - y(228), p.dark)}
    <rect width="${W}" height="${H}" fill="url(#${id}pil)"/>
    <path d="M${y(18)} ${y(80)} Q${y(36)} ${y(110)} ${y(24)} ${y(140)}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="5" stroke-linecap="round"/>
  </g></g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Marken-Dose der Launch-Crew (nach den Packaging-Frames):            */
/* matte Pastell-Dose, geriffelter Deckel in derselben Farbe, weißes   */
/* „bärly™“, Produktname in Tieffarbe, Kategorie, Nährstoffzeile,      */
/* Tatzen-Dosis, Füllmenge und Sorte unten links, Icon unten rechts.   */
/* Maßstab wie die Bärendose: Ø 70 mm, Körper 100 mm.                  */
/* ------------------------------------------------------------------ */
function icon(kind, cx, cy, s, color) {
  const g = (d) => `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;
  switch (kind) {
    case 'crown': return g('<path d="M-10 5 L-10 -5 L-5 0 L0 -8 L5 0 L10 -5 L10 5 Z"/><path d="M-10 9 H10"/>');
    case 'dumbbell': return g('<path d="M-12 -4 V4 M-8 -7 V7 M8 -7 V7 M12 -4 V4 M-8 0 H8"/>');
    case 'moon': return g('<path d="M3 -9 A9 9 0 1 0 9 5 A7 7 0 1 1 3 -9 Z"/><path d="M9 -8 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 Z" stroke-width="1.2"/>');
    case 'sun': return g('<circle r="4.5"/>' + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(Math.cos(a) * 7.5).toFixed(1)} ${(Math.sin(a) * 7.5).toFixed(1)} L${(Math.cos(a) * 10.5).toFixed(1)} ${(Math.sin(a) * 10.5).toFixed(1)}"/>`; }).join(''));
    default: return '';
  }
}
const pal = (p) => {
  const k = p.pack || {};
  return { body: k.jar || p.color, deep: k.deep || p.dark, light: k.light || p.light, accent: k.accent || p.color, icon: k.icon, metal: k.metal || ['#e9e4dc', '#a59c8e'] };
};
const perDayLabel = (p, f) => `${f.perDay || 1} ${p.id === 'snoozy' ? 'am Abend' : 'am Tag'}`;

function jar(p, opts = {}) {
  /* Launch-Dose nach dem Packaging-Briefing: matte, undurchsichtige Dose in der Sortenfarbe,
     glatter Schraubdeckel ohne Symbol, großes weißes bärly-Logo, Produktname darunter,
     feine Metallic-Akzente. Kein Charakter auf der Front (der sitzt auf der Seite).
     Maßstab: Ø 70 mm = 188 px, Körper 100 mm (Standard) bzw. 150 mm (Groß). */
  const f = info(p);
  const c = pal(p);
  const id = nid('jr');
  const name = (p.product || p.name).toUpperCase();
  const [n, days] = f.refill || [p.count, 30];
  const count = n * (30 / days);
  const grams = Math.round(count * (f.unit || 3));
  const MM = 188 / 70;
  const bx = 26, bw = 188, capTop = 14, capH = 46, top = 66;
  const bodyH = ((opts.size || f.can) === 'gross' ? 150 : 100) * MM;
  const bottom = top + bodyH;
  const t = top + (bodyH - 100 * MM) * .42;              // Logo-Block sitzt bei der Dose Groß tiefer, gleiche Proportion
  const H = opts.canvasH || Math.ceil(bottom + 22);
  const yOff = H - Math.ceil(bottom + 22);                 // auf gemeinsamer Leinwand unten ausrichten
  const [m1, m2] = c.metal;
  const dose = `${f.perDay || 1} Gummies ${p.id === 'snoozy' ? 'am Abend' : 'täglich'}`;
  const legal = wrap(`${f.legal || 'Nahrungsergänzungsmittel'} · ${count} Fruchtgummis = ${grams} g`, 66);
  const warn = p.warn ? wrap(p.warn, 62) : [];
  let y = bottom - 12;                                     // unterer Block von unten nach oben
  const legalY = y - (legal.length - 1) * 6.2; y = legalY - 12;
  const doseY = y; y -= 11;
  const countY = y; y -= 13;
  const warnY = y - (warn.length - 1) * 6.4;
  const body = `M${bx} ${top} H${bx + bw} V${bottom - 16} Q${bx + bw} ${bottom} ${bx + bw - 16} ${bottom} H${bx + 16} Q${bx} ${bottom} ${bx} ${bottom - 16} Z`;
  const cap = `M${bx + 2} ${capTop + capH} V${capTop + 9} Q${bx + 2} ${capTop} ${bx + 11} ${capTop} H${bx + bw - 11} Q${bx + bw - 2} ${capTop} ${bx + bw - 2} ${capTop + 9} V${capTop + capH} Z`;
  return `<svg class="pack pack-jar" viewBox="0 0 240 ${H}" role="img" aria-label="bärly ${esc(p.product || p.name)}, ${esc(p.title)}: ${esc(f.legal || '')}, ${count} Fruchtgummis">
  <defs>
    <linearGradient id="${id}cyl" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".08" stop-color="#000" stop-opacity=".07"/>
      <stop offset=".22" stop-color="#fff" stop-opacity=".2"/><stop offset=".4" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".72" stop-color="#000" stop-opacity=".02"/><stop offset=".9" stop-color="#000" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </linearGradient>
    <linearGradient id="${id}metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${m1}"/><stop offset=".45" stop-color="#fff"/><stop offset=".55" stop-color="${m1}"/><stop offset="1" stop-color="${m2}"/>
    </linearGradient>
    <linearGradient id="${id}sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${m1}" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="${m2}" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" result="t"/>
      <feColorMatrix in="t" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 .07"/></feComponentTransfer>
    </filter>
    <filter id="${id}blur" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>
    <clipPath id="${id}b"><path d="${body}"/></clipPath>
    <clipPath id="${id}c"><path d="${cap}"/></clipPath>
  </defs>
  <g transform="translate(0 ${yOff})">
  <ellipse cx="120" cy="${bottom + 4}" rx="96" ry="6" fill="${INK}" opacity=".28" filter="url(#${id}blur)"/>
  <!-- Körper -->
  <g clip-path="url(#${id}b)">
    <rect x="${bx}" y="${top}" width="${bw}" height="${bodyH}" fill="${c.body}"/>
    <path d="M${bx} ${top + bodyH * .52} C ${bx + 70} ${top + bodyH * .4}, ${bx + 120} ${top + bodyH * .68}, ${bx + bw} ${top + bodyH * .5} L${bx + bw} ${top + bodyH * .55} C ${bx + 120} ${top + bodyH * .74}, ${bx + 70} ${top + bodyH * .46}, ${bx} ${top + bodyH * .58} Z" fill="url(#${id}sheen)" opacity=".55"/>
    ${txt(120, t + 97, 'bärly', 60, `text-anchor="middle" ${D(700)} letter-spacing="-1.5" fill="#fff"`)}
    ${txt(186, t + 60, '™', 9, `${D(600)} fill="#fff"`)}
    <text x="120" y="${t + 137}" text-anchor="middle" ${D(600)} font-size="27" letter-spacing="3.5" fill="${c.deep}">${esc(name)}</text>
    <path d="M102 ${t + 150} H138" stroke="url(#${id}metal)" stroke-width="1.6" stroke-linecap="round"/>
    ${txt(120, t + 166, p.title.toUpperCase(), 9.4, `text-anchor="middle" ${B(700)} letter-spacing="2.6" fill="${c.deep}"`)}
    ${txt(120, t + 181, p.ingredients || f.nutrient, 8.6, `text-anchor="middle" ${B(500)} fill="${c.deep}" fill-opacity=".85"`)}
    ${warn.length ? lines(120, warnY, warn, 5.3, 6.4, `text-anchor="middle" ${B(700)} fill="${c.deep}"`) : ''}
    ${txt(120, countY, `${count} GUMMIES · ${p.flavor.toUpperCase()}`, 7.2, `text-anchor="middle" ${B(700)} letter-spacing="1.4" fill="${c.deep}"`)}
    ${txt(120, doseY, dose, 7.2, `text-anchor="middle" ${B(500)} fill="${c.deep}"`)}
    ${lines(120, legalY, legal, 5, 6.2, `text-anchor="middle" ${B(500)} fill="${c.deep}" fill-opacity=".8"`)}
    <rect x="${bx}" y="${top}" width="${bw}" height="${bodyH}" fill="url(#${id}cyl)"/>
    <rect x="${bx}" y="${top}" width="${bw}" height="${bodyH}" filter="url(#${id}grain)"/>
    <rect x="${bx}" y="${top}" width="${bw}" height="2.5" fill="#000" opacity=".1"/>
  </g>
  <!-- Hals -->
  <rect x="${bx + 8}" y="${capTop + capH - 1}" width="${bw - 16}" height="${top - capTop - capH + 2}" fill="${c.body}"/>
  <rect x="${bx + 8}" y="${capTop + capH - 1}" width="${bw - 16}" height="${top - capTop - capH + 2}" fill="#000" opacity=".2"/>
  <!-- glatter Schraubdeckel ohne Symbol -->
  <g clip-path="url(#${id}c)">
    <rect x="${bx}" y="${capTop}" width="${bw}" height="${capH}" fill="${c.body}"/>
    <rect x="${bx}" y="${capTop}" width="${bw}" height="${capH}" fill="#fff" opacity=".1"/>
    <g stroke="#000" stroke-opacity=".045" stroke-width="1.2">${Array.from({ length: 46 }, (_, i) => `<line x1="${bx + 3 + i * 4}" y1="${capTop + 6}" x2="${bx + 3 + i * 4}" y2="${capTop + capH - 4}"/>`).join('')}</g>
    <rect x="${bx}" y="${capTop}" width="${bw}" height="${capH}" fill="url(#${id}cyl)"/>
    <rect x="${bx}" y="${capTop}" width="${bw}" height="${capH}" filter="url(#${id}grain)"/>
    <rect x="${bx}" y="${capTop}" width="${bw}" height="3" fill="#fff" opacity=".35"/>
    <rect x="${bx}" y="${capTop + capH - 3}" width="${bw}" height="3" fill="#000" opacity=".1"/>
  </g>
  </g>
</svg>`;
}

/* Nachfüller der Launch-Crew: flacher Mono-PE-Beutel im Look der Dose */
function refillBrand(p, opts = {}) {
  const f = info(p);
  const c = pal(p);
  const id = nid('rb');
  const variant = opts.variant || 'refill';
  const W = 220, H = 313;
  const [n0, days0] = f.refill || [p.count, 30];
  const n = variant === 'trial' ? (f.perDay || 1) * 7 : n0;
  const grams = Math.round(n * (f.unit || 3));
  const name = (p.product || p.name).toUpperCase();
  const pill = {
    refill: days0 === 30 ? 'NACHFÜLLER · 30 TAGE' : 'NACHFÜLLER',
    trial: 'PROBIERWOCHE · 7 TAGE',
    duo1: 'BEUTEL 1 VON 2 · TAG 1–15',
    duo2: 'BEUTEL 2 VON 2 · TAG 16–30'
  }[variant];
  const pw = pill.length * 5.2 + 18;
  const legal = [...(p.warn ? wrap(p.warn, 60) : []), ...wrap(`${f.legal} · ${n} Fruchtgummis = ${grams} g`, 60)];
  const legalTop = 288 - (legal.length * 7 + 6);
  return `<svg class="pack pack-refill" viewBox="0 0 ${W} ${H + 12}" role="img" aria-label="${variant === 'trial' ? 'Probierwoche' : 'Nachfüller'} ${esc(p.product || p.name)}: ${esc(f.legal)}, ${n} Fruchtgummis = ${grams} g">
  <defs>
    <clipPath id="${id}c"><rect x="0" y="0" width="${W}" height="${H}" rx="7"/></clipPath>
    <mask id="${id}m"><rect x="0" y="0" width="${W}" height="${H}" fill="#fff"/><path d="M${W} 15 l-7 5 l7 5Z M0 15 l7 5 l-7 5Z" fill="#000"/></mask>
    <radialGradient id="${id}pil" cx="45%" cy="42%" r="72%">
      <stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/>
    </radialGradient>
    <linearGradient id="${id}sw" x1="0" y1="0" x2="1" y2=".4">
      <stop offset="0" stop-color="#fff" stop-opacity=".05"/><stop offset=".45" stop-color="#fff" stop-opacity=".5"/><stop offset=".6" stop-color="${c.deep}" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/>
    </linearGradient>
  </defs>
  <ellipse cx="${W / 2}" cy="${H + 6}" rx="${W * .42}" ry="6" fill="${INK}" opacity=".14"/>
  <g mask="url(#${id}m)"><g clip-path="url(#${id}c)">
    <rect width="${W}" height="${H}" fill="${c.body}"/>
    <path d="M0 232 C 70 190, 130 280, ${W} 206 L${W} 238 C 130 306, 66 222, 0 262 Z" fill="url(#${id}sw)"/>
    ${crimp(0, 0, W, 13, c.body)}
    <rect width="${W}" height="13" fill="#000" opacity=".08"/>
    <line x1="0" y1="20" x2="${W}" y2="20" stroke="#fff" stroke-opacity=".6" stroke-width="1.2" stroke-dasharray="4 3"/>
    ${txt(W / 2, 74, 'bärly', 44, `text-anchor="middle" ${D(700)} letter-spacing="-1" fill="#fff"`)}
    ${txt(W / 2 + 54, 48, '™', 8, `${D(600)} fill="#fff"`)}
    <text x="${W / 2}" y="106" text-anchor="middle" ${D(700)} font-size="27" letter-spacing=".5" fill="${c.deep}" ${name.length > 6 ? `textLength="${Math.min(160, name.length * 18)}" lengthAdjust="spacingAndGlyphs"` : ''}>${esc(name)}</text>
    ${txt(W / 2, 122, p.title.toUpperCase(), 9.2, `text-anchor="middle" ${B(800)} letter-spacing="1.5" fill="${c.deep}"`)}
    ${txt(W / 2, 140, p.ingredients || f.nutrient, 8.6, `text-anchor="middle" ${B(600)} fill="${c.deep}"`)}
    <rect x="${W / 2 - pw / 2}" y="151" width="${pw}" height="16" rx="8" fill="${INK}"/>
    ${txt(W / 2, 162, pill, 7.4, `text-anchor="middle" ${B(800)} letter-spacing=".6" fill="#fff"`)}
    <rect x="16" y="182" width="96" height="34" rx="10" fill="#fff" fill-opacity=".62"/>
    ${paw(34, 199, 24, f.perDay || 1, c.deep, { empty: '#fff' })}
    ${txt(52, 197, perDayLabel(p, f), 9.4, `${B(800)} fill="${c.deep}"`)}
    ${txt(52, 208, variant === 'trial' ? '7 Tage' : (days0 === 30 ? '30 Tage' : '15 Tage'), 8.4, `${B(600)} fill="${c.deep}"`)}
    ${variant === 'trial' ? '' : stamp(W - 44, 199, 21, '#fff')}
    ${txt(16, 238, `${n} Gummies · ${p.flavor}`, 8.6, `${B(700)} fill="${c.deep}"`)}
    <rect x="0" y="${legalTop}" width="${W}" height="${288 - legalTop}" fill="#fff"/>
    ${lines(W / 2, legalTop + 8, legal, 5.6, 7, `text-anchor="middle" ${B(600)} fill="${INK}"`)}
    ${crimp(0, 288, W, H - 288, c.body)}
    <rect y="288" width="${W}" height="${H - 288}" fill="#000" opacity=".08"/>
    <rect width="${W}" height="${H}" fill="url(#${id}pil)"/>
  </g></g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Tagestütchen S (Ohren-Tütchen) 50 × 70 mm. Kids und Zap.             */
/* opts.name: Namensfeld (Beispiel)                                     */
/* ------------------------------------------------------------------ */
function headClip(p, cx, top, w, opts = {}) {
  // Nur den Bärenkopf zeigen: Bär zeichnen und unterhalb des Kinns abschneiden
  const h = w * 1.33;
  const cid = nid('hc');
  const chin = top + h * (140 / 266);
  return `<defs><clipPath id="${cid}"><rect x="${cx - w}" y="${top - 10}" width="${w * 2}" height="${chin - top + 10}"/></clipPath></defs>
    <g clip-path="url(#${cid})">${bear(p, { x: cx - w / 2, y: top, width: w, height: h, shadow: false, label: false, flat: opts.flat })}</g>`;
}

function zapHead(cx, cy, s, color) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${color}" stroke-width="2.6">
    <circle cx="-13" cy="-12" r="6.5"/><circle cx="13" cy="-12" r="6.5"/>
    <ellipse cx="0" cy="2" rx="17" ry="14.5" fill="${INK}"/>
    <circle cx="-6" cy="0" r="1.6" fill="${color}" stroke="none"/><circle cx="6" cy="0" r="1.6" fill="${color}" stroke="none"/>
    <path d="M-4 7 Q0 9.5 4 7" stroke-linecap="round"/>
  </g>`;
}

function tuetchen(m, opts = {}) {
  const list = items(m);
  const p = list[0];
  const f = info(p);
  const zap = p.id === 'zap';
  const sport = f.format === 'sport';
  const id = nid('tu');
  const W = 150, H = 210, k = 3;                     // 3 px pro mm
  const y = (v) => v * k;
  const earR = y(7.5);
  const shape = `M${y(4)} ${y(10)} H${W - y(4)} Q${W} ${y(10)} ${W} ${y(14)} V${H - y(3)} Q${W} ${H} ${W - y(3)} ${H} H${y(3)} Q0 ${H} 0 ${H - y(3)} V${y(14)} Q0 ${y(10)} ${y(4)} ${y(10)}Z`;
  const bg = zap ? INK : CREAM;
  const band = zap ? ZAPYELLOW : p.color;
  const name = list.map(x => x.name).join(' + ');
  const total = list.reduce((s, x) => s + (info(x).perDay || 1), 0);
  return `<svg class="pack pack-tuetchen" viewBox="0 0 ${W} ${H + 10}" role="img" aria-label="${zap ? 'Zap-Tütchen' : 'Tagestütchen'} ${esc(name)}">
  <defs><clipPath id="${id}c"><path d="${shape}"/><circle cx="${W * .3}" cy="${y(10)}" r="${earR}"/><circle cx="${W * .7}" cy="${y(10)}" r="${earR}"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></radialGradient>
  </defs>
  <ellipse cx="${W / 2}" cy="${H + 4}" rx="${W * .4}" ry="4" fill="${INK}" opacity=".14"/>
  <g clip-path="url(#${id}c)">
    <rect width="${W}" height="${H}" fill="${bg}"/>
    <rect width="${W}" height="${y(13)}" fill="${band}"/>
    <circle cx="${W * .3}" cy="${y(10)}" r="${earR * .5}" fill="#fff" opacity=".35"/>
    <circle cx="${W * .7}" cy="${y(10)}" r="${earR * .5}" fill="#fff" opacity=".35"/>
    ${zap ? `
      ${txt(W / 2, y(25), 'ESPRESSO', y(8.5), `text-anchor="middle" ${D()} fill="${ZAPYELLOW}" textLength="${W - y(10)}" lengthAdjust="spacingAndGlyphs"`)}
      ${zapHead(W / 2 - y(6), y(37), 1.05, ZAPYELLOW)}
      <path d="M${W / 2 + y(9)} ${y(29)} l-9 13 h6 l-4 12 l12 -16 h-6 l5 -9z" fill="${ZAPYELLOW}"/>
      <circle cx="${W - y(8)}" cy="${y(36)}" r="${y(5)}" fill="#fff"/>
      ${txt(W - y(8), y(37.6), '18+', y(4), `text-anchor="middle" ${D()} fill="${INK}"`)}
      ${txt(W / 2, y(50.5), 'Zap', y(5.5), `text-anchor="middle" ${D()} fill="#fff"`)}
    ` : `
      <rect x="${y(5)}" y="${y(14.5)}" width="${W - y(10)}" height="${y(8)}" rx="4" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
      ${txt(y(8), y(20.3), 'Für:', y(2.6), `${B(700)} fill="${INK}" fill-opacity=".7"`)}
      ${opts.name ? txt(y(16.5), y(21.2), opts.name, y(5.4), `font-family="${HAND}" font-weight="700" fill="${INK}"`) : ''}
      ${list.length === 1
        ? headClip(p, W / 2, y(24), y(26), { flat: true })
        : list.map((x, i) => headClip(x, W / 2 + (i - (list.length - 1) / 2) * y(17), y(26), y(19), { flat: true })).join('')}
      ${txt(W / 2, y(49.5), name, y(list.length > 1 ? 4.2 : 5.5), `text-anchor="middle" ${D()} fill="${INK}"`)}
    `}
    <rect x="0" y="${y(52.5)}" width="${W}" height="${y(10)}" fill="${zap ? '#fff' : YELLOW}"/>
    ${zap
      ? `${txt(y(4), y(56.6), 'Enthält Koffein · 80 mg', y(2.7), `${B(800)} fill="${INK}"`)}${txt(y(4), y(60.4), 'Max. 1 Tütchen pro Tag', y(2.4), `${B(600)} fill="${INK}"`)}`
      : `${txt(y(4), y(57.4), sport ? '1 Tütchen = 1 Sporttag' : '1 Tütchen = 1 Tag', y(3.1), `${D()} fill="${INK}"`)}${txt(y(4), y(61), 'Nicht mehr.', y(2.6), `${B(700)} fill="${INK}"`)}`}
    ${paw(W - y(7), y(57.8), y(9), total, zap ? ZAPYELLOW : p.color)}
    ${crimp(0, y(63), W, H - y(63), zap ? '#2c2148' : p.dark)}
    <rect width="${W}" height="${H}" fill="url(#${id}pil)"/>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Tütchen M 75 × 105 mm: Buff-Portion (5 Fruchtgummis) und Stacks      */
/* ------------------------------------------------------------------ */
function tuetchenM(m, opts = {}) {
  const list = items(m);
  const p = list[0];
  const id = nid('tm');
  const W = 150, H = 210, k = 2;
  const y = (v) => v * k;
  const per = list.map(x => (info(x).perDay || 1));
  const total = per.reduce((s, n) => s + n, 0);
  const portion = info(p).format === 'portion';
  const word = list.length === 1 ? p.word : (opts.title || 'STACK');
  const tint = list.length === 1 ? p.color : '#f3effa';
  const earR = y(6.5);
  const shape = `M${y(4)} ${y(12)} H${W - y(4)} Q${W} ${y(12)} ${W} ${y(16)} V${H - y(3)} Q${W} ${H} ${W - y(3)} ${H} H${y(3)} Q0 ${H} 0 ${H - y(3)} V${y(16)} Q0 ${y(12)} ${y(4)} ${y(12)}Z`;
  return `<svg class="pack pack-tuetchen-m" viewBox="0 0 ${W} ${H + 10}" role="img" aria-label="Tütchen ${list.map(x => esc(x.name)).join(' + ')}">
  <defs><clipPath id="${id}c"><path d="${shape}"/><circle cx="${W * .28}" cy="${y(12)}" r="${earR}"/><circle cx="${W * .72}" cy="${y(12)}" r="${earR}"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
  </defs>
  <ellipse cx="${W / 2}" cy="${H + 4}" rx="${W * .4}" ry="4" fill="${INK}" opacity=".14"/>
  <g clip-path="url(#${id}c)">
    <rect width="${W}" height="${H}" fill="${tint}"/>
    <rect width="${W}" height="${y(20)}" fill="${list.length === 1 ? p.dark : INK}"/>
    ${txt(W / 2, y(18.6), 'bärly', y(5), `text-anchor="middle" ${D()} fill="#fff"`)}
    ${txt(W / 2, y(32), word, y(9), `text-anchor="middle" ${D()} fill="${INK}" textLength="${Math.min(W - y(10), y(10) * .62 * word.length)}" lengthAdjust="spacingAndGlyphs"`)}
    ${list.length === 1
      ? bear(p, { x: W / 2 - y(17), y: y(33), width: y(34), height: y(45), shadow: false, label: false })
      : list.map((x, i) => headClip(x, W / 2 + (i - (list.length - 1) / 2) * y(22), y(36), y(24))).join('')}
    <rect x="${y(5)}" y="${y(74)}" width="${W - y(10)}" height="${y(20)}" rx="6" fill="#fff"/>
    ${txt(y(9), y(81.5), portion ? `${p.name} · 10 g Protein` : list.map((x, i) => `${x.name} ×${per[i]}`).join(' · '), y(3.4), `${D()} fill="${INK}"`)}
    ${txt(y(9), y(87), portion ? '1 Tütchen = 1 Portion (5 Fruchtgummis)' : '1 Tütchen = 1 Tagesportion', y(2.5), `${B(700)} fill="${INK}"`)}
    ${txt(y(9), y(91.5), `Nahrungsergänzungsmittel · ${total} Fruchtgummis`, y(2.2), `${B(500)} fill="${INK}"`)}
    ${paw(W - y(13), y(78), y(12), total > 5 ? 5 : total, list.length === 1 ? p.color : YELLOW)}
    ${crimp(0, y(97), W, H - y(97), list.length === 1 ? p.dark : INK)}
    <rect width="${W}" height="${H}" fill="url(#${id}pil)"/>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Tütchen-Box (Kids, Zap): aufgerichtet 112 × 108 × 90 mm, Front 112 × 90 */
/* ------------------------------------------------------------------ */
function box(m, opts = {}) {
  const list = items(m);
  const p = list[0];
  const f = info(p);
  const zap = p.id === 'zap';
  const sport = f.format === 'sport';
  const id = nid('bx');
  const k = 2.2, y = (v) => v * k;
  const FW = y(112), FH = y(90), ox = 20, oy = 46;     // Front-Ursprung
  const dx = 26, dy = 18;                               // Perspektive Deckel/Seite
  const bg = zap ? INK : CREAM;
  const band = zap ? INK : p.color;
  const n = sport ? 10 : 30;
  const perSachet = list.length;                      // Schul-Duo: 1 Kiko + 1 Juno pro Tütchen
  const grams = Math.round(n * list.reduce((s, x) => s + (info(x).unit || 2.5), 0));
  const nutrients = list.flatMap(x => (info(x).nutrient || '').split(' · '));
  const nutrientText = nutrients.length > 1 ? `${nutrients.slice(0, -1).join(', ')} und ${nutrients[nutrients.length - 1]}` : nutrients[0];
  const word = p.word;
  const legal = list.length > 1 ? `Nahrungsergänzungsmittel mit ${nutrientText} für Kinder` : f.legal;
  const W = ox + FW + dx + 10, H = oy + FH + 18;
  const ears = [ox + FW * .3, ox + FW * .7];
  return `<svg class="pack pack-box" viewBox="0 0 ${W} ${H}" role="img" aria-label="${zap ? 'Zap-Box' : 'Tütchen-Box'} ${list.map(x => esc(x.name)).join(' + ')}: ${n} Tagestütchen">
  <defs><clipPath id="${id}f"><rect x="${ox}" y="${oy}" width="${FW}" height="${FH}" rx="3"/>${ears.map(cx => `<circle cx="${cx}" cy="${oy}" r="${y(8)}"/>`).join('')}</clipPath>
    <linearGradient id="${id}side" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
  <ellipse cx="${ox + FW / 2 + dx / 2}" cy="${oy + FH + 8}" rx="${FW * .55}" ry="7" fill="${INK}" opacity=".16"/>
  <!-- Deckel und Seite -->
  <path d="M${ox + FW} ${oy} l${dx} ${-dy} v${FH} l${-dx} ${dy} Z" fill="${bg}"/><path d="M${ox + FW} ${oy} l${dx} ${-dy} v${FH} l${-dx} ${dy} Z" fill="url(#${id}side)"/>
  <path d="M${ox} ${oy} l${dx} ${-dy} h${FW} l${-dx} ${dy} Z" fill="${zap ? '#2c2148' : band}"/>
  <!-- Tütchen-Ohren schauen oben heraus -->
  ${[0, 1, 2, 3].map(i => {
    const q = list[i % list.length];
    const cx = ox + FW * .22 + i * FW * .17 + dx * .5;
    const c = zap ? ZAPYELLOW : q.color;
    return `<g transform="translate(${cx} ${oy - dy * .5}) rotate(${-6 + i * 4})"><rect x="-13" y="-22" width="26" height="24" rx="3" fill="${zap ? INK : CREAM}" stroke="${INK}" stroke-opacity=".25"/><circle cx="-7" cy="-21" r="5.5" fill="${c}"/><circle cx="7" cy="-21" r="5.5" fill="${c}"/><rect x="-13" y="-21" width="26" height="6" fill="${c}"/></g>`;
  }).join('')}
  <path d="M${ox + 6} ${oy - 2} l${dx - 6} ${-dy + 4} h${FW - 12} l${-dx + 6} ${dy - 4} Z" fill="#000" opacity=".25"/>

  <g clip-path="url(#${id}f)">
    <rect x="${ox}" y="${oy - y(9)}" width="${FW}" height="${FH + y(9)}" fill="${bg}"/>
    <rect x="${ox}" y="${oy - y(9)}" width="${FW}" height="${y(22) + y(9)}" fill="${band}"/>
    ${ears.map(cx => `<circle cx="${cx}" cy="${oy}" r="${y(4)}" fill="#fff" opacity="${zap ? .15 : .3}"/>`).join('')}
    ${txt(ox + y(6), oy + y(15), 'bärly', y(9), `${D()} letter-spacing="-.5" fill="#fff"`)}
    ${zap ? `<circle cx="${ox + FW - y(11)}" cy="${oy + y(11)}" r="${y(7)}" fill="${ZAPYELLOW}"/>${txt(ox + FW - y(11), oy + y(13.2), '18+', y(5.4), `text-anchor="middle" ${D()} fill="${INK}"`)}`
      : `<rect x="${ox + y(34)}" y="${oy + y(8.5)}" width="${y(14)}" height="${y(7)}" rx="${y(3.5)}" fill="${YELLOW}"/>${txt(ox + y(41), oy + y(13.6), 'kids', y(4.6), `text-anchor="middle" ${D()} fill="${INK}"`)}`}

    ${zap ? `
      ${txt(ox + y(6), oy + y(40), 'ESPRESSO', y(14), `${D()} fill="${ZAPYELLOW}" textLength="${y(70)}" lengthAdjust="spacingAndGlyphs"`)}
      <path d="M${ox + y(88)} ${oy + y(26)} l-14 22 h10 l-7 20 l20 -28 h-10 l8 -14z" fill="${ZAPYELLOW}"/>
      ${zapHead(ox + y(13), oy + y(51), 1.15, ZAPYELLOW)}
      ${txt(ox + y(25), oy + y(50), 'Zap · Koffein + L-Theanin', y(4.2), `${D()} fill="#fff"`)}
      ${txt(ox + y(25), oy + y(55.5), '30 Tütchen à 1 Fruchtgummi · max. 1 pro Tag', y(2.8), `${B(600)} fill="#fff" fill-opacity=".85"`)}
      <rect x="${ox + y(4)}" y="${oy + y(61)}" width="${FW - y(8)}" height="${y(18)}" rx="3" fill="none" stroke="${ZAPYELLOW}" stroke-width="1.6"/>
      ${lines(ox + y(7), oy + y(66.5), wrap(f.caffeine + ' Nur für Erwachsene.', 64), y(2.7), y(3.6), `${B(700)} fill="#fff"`)}
    ` : `
      ${list.length === 1
        ? bear(p, { x: ox + y(6), y: oy + y(22), width: y(30), height: y(40), shadow: false, label: false, flat: true })
        : list.map((x, i) => bear(x, { x: ox + y(2) + i * y(18), y: oy + y(25), width: y(24), height: y(32), shadow: false, label: false, flat: true })).join('')}
      <circle cx="${ox + FW - y(22)}" cy="${oy + y(41)}" r="${y(16)}" fill="${YELLOW}"/>
      ${paw(ox + FW - y(22), oy + y(31), y(8), 1, p.color)}
      ${txt(ox + FW - y(22), oy + y(40.5), '1 Tütchen', y(4.4), `text-anchor="middle" ${D()} fill="${INK}"`)}
      ${txt(ox + FW - y(22), oy + y(46), sport ? '= 1 Sporttag' : '= 1 Tag', y(4.4), `text-anchor="middle" ${D()} fill="${INK}"`)}
      ${txt(ox + FW - y(22), oy + y(51), '– nicht mehr', y(3.2), `text-anchor="middle" ${B(800)} fill="${INK}"`)}
      ${txt(ox + y(6), oy + y(66.5), list.map(x => x.name).join(' + '), y(6), `${D()} fill="${INK}"`)}
      ${txt(ox + FW - y(6), oy + y(66.5), list.length > 1 ? 'SCHULE · WACHSEN' : word, y(4), `text-anchor="end" ${D()} fill="${p.dark}"`)}
      ${lines(ox + y(6), oy + y(71.5), wrap(`Für Eltern: ${list.map(x => info(x).nutrient).join(' / ')} für Kinder von 4–12 Jahren. ${list.length === 1 ? f.claim + '*' : ''}`, 74), y(2.55), y(3.3), `${B(600)} fill="${INK}"`)}
      ${txt(ox + y(6), oy + y(80.5), 'Vorrat zu den Eltern – nur das Tütchen geht mit.', y(2.6), `${B(800)} fill="${INK}"`)}
    `}
    <rect x="${ox}" y="${oy + y(82)}" width="${FW}" height="${y(8)}" fill="#fff"/>
    ${lines(ox + FW / 2, oy + y(85.2), wrap(`${legal} · ${n} Tagestütchen à ${perSachet} Fruchtgummi${perSachet > 1 ? 's' : ''} = ${grams} g`, 78), y(2.4), y(3), `text-anchor="middle" ${B(600)} fill="${INK}"`)}
  </g>
</svg>`;
}

/* Brief: Papierumschlag (Großbrief, max. 2 cm) mit Inhalt obendrauf */
function letter(content, opts = {}) {
  return `<svg class="pack pack-letter" viewBox="0 0 353 250" role="img" aria-label="${esc(opts.label || 'Großbrief')}">
    <rect x="6" y="10" width="341" height="232" rx="6" fill="#e9dcc6"/>
    <rect x="6" y="10" width="341" height="232" rx="6" fill="none" stroke="#c9b48f"/>
    <path d="M6 16 L176 120 L347 16" fill="none" stroke="#c9b48f" stroke-width="1.4"/>
    <g transform="translate(26 132)"><rect width="150" height="60" rx="4" fill="#fff" stroke="#c9b48f"/>
      <text x="10" y="22" font-family="${HAND}" font-weight="700" font-size="16" fill="${INK}">${esc(opts.to || 'Emma Beispiel')}</text>
      <text x="10" y="40" font-family="${HAND}" font-weight="700" font-size="13" fill="${INK}" fill-opacity=".8">Bärenstraße 7</text>
      <text x="10" y="54" font-family="${HAND}" font-weight="700" font-size="13" fill="${INK}" fill-opacity=".8">12345 Musterstadt</text></g>
    <g transform="translate(286 26)"><rect width="44" height="52" fill="#fff" stroke="${INK}" stroke-dasharray="3 2"/><text x="22" y="30" text-anchor="middle" ${D()} font-size="11" fill="${INK}">1,80</text></g>
    <text x="26" y="48" ${D()} font-size="22" letter-spacing="-.8" fill="${INK}">bärly</text>
    <text x="26" y="64" ${B(700)} font-size="9" fill="${INK}" fill-opacity=".8">${esc(opts.label || 'Dein Nachschub ist da.')}</text>
    <g transform="translate(214 84) rotate(-7)">${content}</g>
  </svg>`;
}

/* Einbettung einer Pack-SVG in eine andere SVG */
function nest(svg, x, y, w) {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  const h = vb ? w * (+vb[2] / +vb[1]) : w;
  return svg.replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${h}" style="width:${w}px;height:${h}px" `);
}

window.Baerly.packs = { can, jar, refill, tuetchen, tuetchenM, box, letter, paw, nest, icon, CAN };
})();
