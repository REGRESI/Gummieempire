/* bärly – Verpackungen als SVG
   Zeichnet die Packungs-Vorderseiten aus den Produktdaten in brand.js:
   Bärendose, Nachfüller, Tagestütchen und Spenderbox.
   Alle Maße, Füllmengen und Materialien stehen in FORMATS und PACK_INFO. */

(() => {
'use strict';

const { INK, byId, bear } = window.Baerly;
const DISPLAY = "'Bricolage Grotesque', 'Arial Rounded MT Bold', Arial, sans-serif";
const BODY = "Figtree, 'Segoe UI', Arial, sans-serif";
const HAND = "Caveat, 'Comic Sans MS', cursive";
const WEEKDAYS = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];

let uid = 0;
const nid = (p) => p + (++uid);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Text, der auf allen Formaten wiederkehrt */
function packCopy(p) {
  const info = (window.Baerly.PACK_INFO || {})[p.id] || {};
  return {
    nutrient: info.nutrient || p.title,
    dose: info.dose || (p.facts[0][0] + ' ' + p.facts[0][1]),
    legal: info.legal || 'Nahrungsergänzungsmittel',
    count: p.count,
    days: info.days || 30,
    net: info.net || '',
    flavor: p.flavor
  };
}

/* ------------------------------------------------------------------ */
/* Bärendose: Aluminium, Deckel mit Bärenohren                         */
/* ------------------------------------------------------------------ */
function can(p, opts = {}) {
  const c = packCopy(p);
  const id = nid('cn');
  const kids = p.line === 'kids';
  const W = 240, H = 372;
  const bx = 30, cw = 180, top = 100, bottom = 344;
  const bw = Math.max(44, c.dose.length * 6.4 + 16);   // Breite des Dosis-Badges
  return `<svg class="pack pack-can" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bärendose ${esc(p.name)}, ${esc(c.nutrient)}">
  <defs>
    <linearGradient id="${id}cyl" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".34"/>
      <stop offset=".12" stop-color="#000" stop-opacity=".06"/>
      <stop offset=".26" stop-color="#fff" stop-opacity=".34"/>
      <stop offset=".34" stop-color="#fff" stop-opacity=".05"/>
      <stop offset=".72" stop-color="#000" stop-opacity="0"/>
      <stop offset=".9" stop-color="#000" stop-opacity=".14"/>
      <stop offset="1" stop-color="#000" stop-opacity=".38"/>
    </linearGradient>
    <linearGradient id="${id}alu" x1="0" x2="1">
      <stop offset="0" stop-color="#8f8a99"/><stop offset=".25" stop-color="#f4f2f8"/><stop offset=".5" stop-color="#c9c5d2"/><stop offset=".8" stop-color="#e9e6ef"/><stop offset="1" stop-color="#7d7887"/>
    </linearGradient>
    <linearGradient id="${id}lid" x1="0" x2="1">
      <stop offset="0" stop-color="#0d0719"/><stop offset=".28" stop-color="#4a3b70"/><stop offset=".42" stop-color="${INK}"/><stop offset="1" stop-color="#0d0719"/>
    </linearGradient>
    <clipPath id="${id}body"><path d="M${bx} ${top} H${bx + cw} V${bottom} A${cw / 2} 13 0 0 1 ${bx} ${bottom} Z"/></clipPath>
  </defs>
  <ellipse cx="120" cy="${bottom + 14}" rx="104" ry="11" fill="${INK}" opacity=".16"/>

  <!-- Deckel mit Ohren -->
  <circle cx="68" cy="40" r="25" fill="url(#${id}lid)"/><circle cx="172" cy="40" r="25" fill="url(#${id}lid)"/>
  <circle cx="68" cy="40" r="12" fill="${p.color}" opacity=".9"/><circle cx="172" cy="40" r="12" fill="${p.color}" opacity=".9"/>
  <rect x="24" y="50" width="192" height="50" rx="10" fill="url(#${id}lid)"/>
  <ellipse cx="120" cy="51" rx="95" ry="9" fill="#5a4a82" opacity=".55"/>
  <g stroke="#fff" stroke-opacity=".09" stroke-width="2">${Array.from({ length: 23 }, (_, i) => `<line x1="${32 + i * 8}" y1="64" x2="${32 + i * 8}" y2="94"/>`).join('')}</g>
  <text x="120" y="84" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="13" fill="#fff" fill-opacity=".55" letter-spacing="3">${kids ? 'DRÜCKEN + DREHEN' : 'bärly.de'}</text>

  <!-- Körper -->
  <g clip-path="url(#${id}body)">
    <rect x="${bx}" y="${top}" width="${cw}" height="${bottom - top + 14}" fill="${p.color}"/>
    <rect x="${bx}" y="${top}" width="${cw}" height="8" fill="url(#${id}alu)"/>
    <rect x="${bx}" y="${bottom - 2}" width="${cw}" height="16" fill="url(#${id}alu)"/>

    <text x="120" y="132" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="24" letter-spacing="-1" fill="${INK}">bärly</text>
    ${kids ? `<rect x="150" y="116" width="36" height="17" rx="8.5" fill="#ffd84d" stroke="${INK}" stroke-width="1.5"/><text x="168" y="128.5" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="10.5" fill="${INK}">kids</text>` : ''}
    <text x="120" y="146" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="8.5" fill="${INK}" fill-opacity=".75">${esc(c.flavor)}</text>
    <text x="120" y="196" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="50" fill="${INK}" textLength="${Math.min(160, 27 * p.word.length)}" lengthAdjust="spacingAndGlyphs">${esc(p.word)}</text>
    <circle cx="120" cy="262" r="58" fill="${p.light}" opacity=".55"/>
    ${bear(p, { x: 70, y: 200, width: 100, height: 133, shadow: false, label: false })}
    <rect x="44" y="270" width="152" height="62" rx="12" fill="#fff"/>
    <text x="56" y="292" font-family="${DISPLAY}" font-weight="800" font-size="20" letter-spacing="-.5" fill="${INK}">${esc(p.name)}</text>
    <rect x="${196 - 10 - bw}" y="278" width="${bw}" height="19" rx="9.5" fill="${p.color}"/>
    <text x="${196 - 10 - bw / 2}" y="291.5" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="10.5" fill="${INK}">${esc(c.dose)}</text>
    <text x="56" y="307" font-family="${BODY}" font-weight="700" font-size="9" fill="${INK}">${esc(c.nutrient)}</text>
    <text x="56" y="322" font-family="${BODY}" font-weight="500" font-size="7" fill="${INK}" fill-opacity=".75">${esc(c.legal)} · ${c.count} Gummies${c.net ? ' · ' + esc(c.net) : ''}</text>

    <rect x="${bx}" y="${top}" width="${cw}" height="${bottom - top + 14}" fill="url(#${id}cyl)"/>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Nachfüller: flacher Beutel, passt in die Dose                        */
/* ------------------------------------------------------------------ */
function crimp(x, y, w, h, color) {
  const n = Math.floor(w / 4);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>
  <g stroke="#000" stroke-opacity=".12" stroke-width="1">${Array.from({ length: n }, (_, i) => `<line x1="${x + 2 + i * 4}" y1="${y + 2}" x2="${x + 2 + i * 4}" y2="${y + h - 2}"/>`).join('')}</g>`;
}

function refill(p, opts = {}) {
  const c = packCopy(p);
  const id = nid('rf');
  const kids = p.line === 'kids';
  const big = opts.days === 90;
  const x = 14, y = 14, w = 196, h = 300;
  return `<svg class="pack pack-refill" viewBox="0 0 224 332" role="img" aria-label="Nachfüller ${esc(p.name)}, ${big ? '90' : c.days} Tage">
  <defs>
    <mask id="${id}m"><rect x="0" y="0" width="224" height="332" fill="#fff"/><path d="M${x + w} 52 l-7 5 l7 5Z M${x} 52 l7 5 l-7 5Z" fill="#000"/></mask>
    <clipPath id="${id}c"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="45%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/>
    </radialGradient>
  </defs>
  <ellipse cx="112" cy="322" rx="92" ry="7" fill="${INK}" opacity=".14"/>
  <g mask="url(#${id}m)">
    <g clip-path="url(#${id}c)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.color}"/>
      ${crimp(x, y, w, 22, p.dark)}
      ${crimp(x, y + h - 22, w, 22, p.dark)}

      <text x="112" y="72" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="27" letter-spacing="-1" fill="${INK}">bärly</text>
      <rect x="${big ? 46 : 54}" y="80" width="${big ? 132 : 116}" height="20" rx="10" fill="${INK}"/>
      <text x="112" y="94" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="10" letter-spacing="1.4" fill="#fff">${big ? 'NACHFÜLLER · 90 TAGE' : 'NACHFÜLLER'}</text>

      <text x="112" y="132" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="30" letter-spacing="-.8" fill="${INK}">${esc(p.name)}${kids ? ' <tspan font-size="14" fill-opacity=".8">kids</tspan>' : ''}</text>
      <text x="112" y="148" text-anchor="middle" font-family="${BODY}" font-weight="700" font-size="10" fill="${INK}">${esc(c.nutrient)} · ${esc(c.dose)}</text>
      <text x="112" y="161" text-anchor="middle" font-family="${BODY}" font-weight="500" font-size="7.5" fill="${INK}" fill-opacity=".8">${esc(c.legal)} · ${big ? c.count * 3 : c.count} Gummies${c.net ? '' : ''}</text>

      <text x="112" y="212" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="50" fill="${INK}" textLength="${Math.min(170, 28 * p.word.length)}" lengthAdjust="spacingAndGlyphs">${esc(p.word)}</text>
      <circle cx="112" cy="300" r="72" fill="${p.light}" opacity=".5"/>
      ${bear(p, { x: 50, y: 214, width: 124, height: 165, shadow: false, label: false })}
      ${crimp(x, y + h - 22, w, 22, p.dark)}
      <text x="112" y="${y + h - 8}" text-anchor="middle" font-family="${BODY}" font-weight="700" font-size="7.5" fill="#fff" fill-opacity=".9">Leer? Ab in den Gelben Sack.</text>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}pil)"/>
      <path d="M40 120 Q70 150 52 200" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/>
      <path d="M186 60 Q172 96 184 130" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="4" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Tagestütchen: eine Tagesportion. Kids mit Namensfeld                  */
/* ------------------------------------------------------------------ */
function sachet(members, opts = {}) {
  const items = members.map(m => typeof m === 'string' ? byId[m] : m);
  const lead = items[0];
  const id = nid('sa');
  const kids = items.every(p => p.line === 'kids');
  const day = opts.day || 'MO';
  const name = opts.name || '';
  const x = 10, y = 10, w = 150, h = 196;
  const per = opts.counts || items.map(p => perDay(p));
  const total = per.reduce((s, n) => s + n, 0);
  const bg = items.length === 1 ? lead.color : (kids ? '#ffd84d' : '#f3effa');
  const stripe = items.length === 1 ? lead.dark : INK;
  const bears = items.slice(0, 4);
  const bw = bears.length === 1 ? 64 : bears.length === 2 ? 64 : bears.length === 3 ? 50 : 42;
  const startX = 85 - (bears.length * bw * .78) / 2 + bw * .11;
  return `<svg class="pack pack-sachet" viewBox="0 0 170 216" role="img" aria-label="${kids ? 'Pausen-Päckchen' : 'Tagestütchen'}: ${items.map(p => esc(p.name)).join(', ')}">
  <defs>
    <clipPath id="${id}c"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="45%" r="75%">
      <stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/>
    </radialGradient>
  </defs>
  <ellipse cx="85" cy="209" rx="70" ry="5" fill="${INK}" opacity=".14"/>
  <g clip-path="url(#${id}c)">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}"/>
    ${crimp(x, y, w, 16, stripe)}
    ${crimp(x, y + h - 16, w, 16, stripe)}

    <circle cx="36" cy="48" r="17" fill="${INK}"/>
    <text x="36" y="53.5" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="14" fill="#fff">${day}</text>
    <text x="146" y="44" text-anchor="end" font-family="${DISPLAY}" font-weight="800" font-size="17" letter-spacing="-.6" fill="${INK}">bärly</text>
    <text x="146" y="57" text-anchor="end" font-family="${BODY}" font-weight="700" font-size="7.5" fill="${INK}" fill-opacity=".8">${kids ? 'Pausen-Päckchen' : 'Tagestütchen'}</text>

    ${bears.map((p, i) => bear(p, { x: startX + i * bw * .78, y: (kids ? 66 : 68) + (i % 2) * 6, width: bw, height: bw * 1.33, shadow: false, label: false })).join('')}

    ${kids ? `
    <rect x="22" y="146" width="126" height="26" rx="6" fill="#fff"/>
    <text x="30" y="163" font-family="${BODY}" font-weight="700" font-size="8" fill="${INK}" fill-opacity=".6">Gehört:</text>
    <text x="62" y="165" font-family="${HAND}" font-weight="700" font-size="17" fill="${INK}">${esc(name)}</text>
    <line x1="62" y1="167" x2="140" y2="167" stroke="${INK}" stroke-opacity=".25" stroke-width="1"/>
    ` : `
    <text x="85" y="160" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="13" fill="${INK}">${items.length === 1 ? esc(lead.name) : 'Dein Stack'}</text>
    `}
    <text x="85" y="${kids ? 186 : 174}" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="7" fill="${INK}" fill-opacity=".8">${items.map((p, i) => esc(p.name) + ' ×' + per[i]).join(' · ')}</text>
    ${kids ? '' : `<text x="85" y="185" text-anchor="middle" font-family="${BODY}" font-weight="500" font-size="6" fill="${INK}" fill-opacity=".7">Nahrungsergänzungsmittel · ${total} Gummies</text>`}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}pil)"/>
  </g>
</svg>`;
}

function perDay(p) {
  const m = /^(\d+)/.exec(p.serving || '');
  return m ? +m[1] : 1;
}

/* ------------------------------------------------------------------ */
/* Spenderbox: 28 Tütchen, Tütchen ragen oben aus der Öffnung           */
/* ------------------------------------------------------------------ */
function box(members, opts = {}) {
  const items = members.map(m => typeof m === 'string' ? byId[m] : m);
  const id = nid('bx');
  const kids = items.every(p => p.line === 'kids');
  const title = opts.title || (kids ? 'Pausen-Päckchen' : 'Tagestütchen');
  const bg = kids ? '#ffd84d' : '#fdfcff';
  return `<svg class="pack pack-box" viewBox="0 0 260 320" role="img" aria-label="Box mit 28 ${esc(title)}">
  <defs>
    <linearGradient id="${id}side" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
    <clipPath id="${id}front"><rect x="26" y="70" width="190" height="228" rx="6"/></clipPath>
  </defs>
  <ellipse cx="134" cy="306" rx="112" ry="9" fill="${INK}" opacity=".16"/>
  <!-- Seite und Deckel in leichter Perspektive -->
  <path d="M216 70 L238 56 L238 284 L216 298 Z" fill="${bg}"/><path d="M216 70 L238 56 L238 284 L216 298 Z" fill="url(#${id}side)"/>
  <path d="M26 70 L48 56 L238 56 L216 70 Z" fill="${bg}"/><path d="M26 70 L48 56 L238 56 L216 70 Z" fill="#000" opacity=".05"/>
  <!-- herausschauende Tütchen -->
  ${items.concat(items, items).slice(0, 6).map((p, i) => `<rect x="${56 + i * 22}" y="${34 + (i % 2) * 6}" width="34" height="40" rx="4" fill="${p.color}" stroke="${INK}" stroke-opacity=".15" transform="rotate(${-8 + i * 3} ${73 + i * 22} 60)"/>`).join('')}
  <rect x="26" y="70" width="190" height="228" rx="6" fill="${bg}"/>
  <g clip-path="url(#${id}front)">
    <path d="M60 70 Q121 96 182 70" fill="${INK}" opacity=".88"/>
    <text x="121" y="128" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="34" letter-spacing="-1.4" fill="${INK}">bärly${kids ? '<tspan font-size="16" dx="4">kids</tspan>' : ''}</text>
    ${items.slice(0, 3).map((p, i, a) => bear(p, { x: 121 - (a.length * 58) / 2 + i * 58 - 4, y: 138 + (i % 2) * 8, width: 66, height: 88, shadow: false, label: false })).join('')}
    <rect x="26" y="236" width="190" height="62" fill="${INK}"/>
    <text x="121" y="262" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="19" fill="#fff">28 ${esc(title)}</text>
    <text x="121" y="281" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="9" fill="#fff" fill-opacity=".75">${esc(opts.sub || items.map(p => p.name).join(' · '))}</text>
  </g>
</svg>`;
}

window.Baerly.packs = { can, refill, sachet, box, WEEKDAYS, perDay };
})();
