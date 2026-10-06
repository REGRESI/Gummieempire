/* bärly – Verpackungen als SVG
   Zeichnet die Packungs-Vorderseiten aus den Produktdaten in brand.js (PACK_INFO):
   Bärendose (S/M/L), Briefkasten-Nachfüller, Tagespäckchen und Wochenstreifen.

   Raster der Vorderseite, von oben nach unten:
   Geschmack + Badge · Wortmarke · Nutzenwort · zugelassene Angabe* · Bär ·
   Namenskarte mit Nährstoff, Dosis und Pfoten-Dosis · Pflichtband (Bezeichnung + Füllmenge). */

(() => {
'use strict';

const { INK, byId, bear, PACK_INFO } = window.Baerly;
const DISPLAY = "'Bricolage Grotesque', 'Arial Rounded MT Bold', Arial, sans-serif";
const BODY = "Figtree, 'Segoe UI', Arial, sans-serif";
const HAND = "Caveat, 'Comic Sans MS', cursive";
const WEEKDAYS = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];
const YELLOW = '#ffd84d';

let uid = 0;
const nid = (p) => p + (++uid);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const info = (p) => PACK_INFO[p.id] || {};
const grams = (p, count) => Math.round(count * (info(p).unit || 3));

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

/* Pfoten-Dosis: fünf Zehenballen, gefüllt = Gummis pro Tag */
function paw(cx, cy, s, n, opts = {}) {
  const ink = opts.ink || INK, bg = opts.bg || '#fff', unit = opts.unit || 'am Tag';
  const toes = [[-14.5, -16.5, 3.9], [-6.5, -22, 4.2], [2.5, -23.2, 4.2], [11, -20.5, 4], [17.5, -14, 3.6]];
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    ${toes.map(([x, y, r], i) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.12}" fill="${i < n ? ink : bg}" stroke="${ink}" stroke-width="1.6"/>`).join('')}
    <path d="M-16 4 C-16 -8 -6 -11 0.5 -11 C7 -11 17 -8 17 4 C17 13 9 15 0.5 15 C-8 15 -16 13 -16 4Z" fill="${bg}" stroke="${ink}" stroke-width="1.8"/>
    <text x="0.5" y="5" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="15" fill="${ink}">${n}</text>
    <text x="0.5" y="12.3" text-anchor="middle" font-family="${BODY}" font-weight="700" font-size="5" fill="${ink}">${unit}</text>
  </g>`;
}

/* Bärendose-Größen: ein Durchmesser (Ø 66 mm), drei Höhen. 180 px Breite = 66 mm */
const CAN = {
  S: { H: 196, word: 34, bear: 70, label: 'S · 150 ml' },
  M: { H: 300, word: 46, bear: 104, label: 'M · 330 ml' },
  L: { H: 404, word: 52, bear: 158, label: 'L · 480 ml' }
};

/* ------------------------------------------------------------------ */
/* Bärendose: Aluminium, Deckel mit Bärenohren                         */
/* ------------------------------------------------------------------ */
function can(p, opts = {}) {
  const f = info(p);
  const size = CAN[opts.size || f.can || 'M'];
  const id = nid('cn');
  const count = f.refill ? f.refill[0] : p.count;
  const days = f.refill ? f.refill[1] : 30;
  const bx = 30, cw = 180, top = 100, bottom = top + size.H, W = 240, VH = bottom + 30;
  const claim = wrap((f.claim || '') + '*', 44);
  const wordY = top + 50 + size.word * .78 + 8;
  const claimY = wordY + 13;
  const legalH = 26, cardH = 56;
  const legalY = bottom - legalH - 2;
  const cardY = legalY - cardH - 6;
  const claimEnd = claimY + (claim.length - 1) * 8;
  const bearH = Math.min(size.bear * 1.33, cardY + 30 - (claimEnd + 6));
  const bearW = bearH * .75;
  const bearY = cardY + 30 - bearH;
  const doseLine = `${f.nutrient} · ${f.dose} pro Tag`;
  return `<svg class="pack pack-can" viewBox="0 0 ${W} ${VH}" role="img" aria-label="Bärendose ${esc(p.name)}: ${esc(f.legal)}, ${count} Fruchtgummis">
  <defs>
    <linearGradient id="${id}cyl" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".12" stop-color="#000" stop-opacity=".05"/>
      <stop offset=".25" stop-color="#fff" stop-opacity=".3"/><stop offset=".34" stop-color="#fff" stop-opacity=".04"/>
      <stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset=".9" stop-color="#000" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000" stop-opacity=".36"/>
    </linearGradient>
    <linearGradient id="${id}alu" x1="0" x2="1">
      <stop offset="0" stop-color="#8f8a99"/><stop offset=".25" stop-color="#f4f2f8"/><stop offset=".5" stop-color="#c9c5d2"/><stop offset=".8" stop-color="#e9e6ef"/><stop offset="1" stop-color="#7d7887"/>
    </linearGradient>
    <linearGradient id="${id}lid" x1="0" x2="1">
      <stop offset="0" stop-color="#0d0719"/><stop offset=".28" stop-color="#4a3b70"/><stop offset=".42" stop-color="${INK}"/><stop offset="1" stop-color="#0d0719"/>
    </linearGradient>
    <clipPath id="${id}body"><path d="M${bx} ${top} H${bx + cw} V${bottom} A${cw / 2} 13 0 0 1 ${bx} ${bottom} Z"/></clipPath>
  </defs>
  <ellipse cx="120" cy="${bottom + 14}" rx="104" ry="10" fill="${INK}" opacity=".16"/>

  <!-- Bärenohren-Deckel -->
  <circle cx="70" cy="42" r="23" fill="url(#${id}lid)"/><circle cx="170" cy="42" r="23" fill="url(#${id}lid)"/>
  <circle cx="70" cy="42" r="11" fill="${p.color}"/><circle cx="170" cy="42" r="11" fill="${p.color}"/>
  <rect x="24" y="50" width="192" height="50" rx="10" fill="url(#${id}lid)"/>
  <ellipse cx="120" cy="51" rx="95" ry="9" fill="#5a4a82" opacity=".55"/>
  <g stroke="#fff" stroke-opacity=".09" stroke-width="2">${Array.from({ length: 23 }, (_, i) => `<line x1="${32 + i * 8}" y1="64" x2="${32 + i * 8}" y2="94"/>`).join('')}</g>
  <text x="120" y="84" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="13" fill="#fff" fill-opacity=".55" letter-spacing="3">bärly.de</text>

  <g clip-path="url(#${id}body)">
    <rect x="${bx}" y="${top}" width="${cw}" height="${size.H + 14}" fill="${p.color}"/>
    <rect x="${bx}" y="${top}" width="${cw}" height="8" fill="url(#${id}alu)"/>

    <text x="44" y="${top + 24}" font-family="${BODY}" font-weight="700" font-size="7.5" fill="${INK}">${esc(p.flavor)}</text>
    ${p.vegan ? `<g transform="translate(186 ${top + 21})"><circle r="11" fill="#fff"/><text y="2.2" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="6.4" fill="${INK}">vegan</text></g>` : ''}
    <text x="120" y="${top + 50}" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="21" letter-spacing="-.9" fill="${INK}">bärly</text>
    <text x="120" y="${wordY}" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="${size.word}" fill="${INK}" textLength="${Math.min(156, size.word * .58 * p.word.length)}" lengthAdjust="spacingAndGlyphs">${esc(p.word)}</text>
    ${lines(120, claimY, claim, 6.6, 8, `text-anchor="middle" font-family="${BODY}" font-weight="600" fill="${INK}"`)}

    <circle cx="120" cy="${bearY + bearH * .5}" r="${bearW * .62}" fill="${p.light}" opacity=".55"/>
    ${bear(p, { x: 120 - bearW / 2, y: bearY, width: bearW, height: bearH, shadow: false, label: false })}

    <rect x="40" y="${cardY}" width="160" height="${cardH}" rx="12" fill="#fff"/>
    <text x="51" y="${cardY + 21}" font-family="${DISPLAY}" font-weight="800" font-size="19" letter-spacing="-.5" fill="${INK}">${esc(p.name)}</text>
    ${lines(51, cardY + 33, wrap(doseLine, 26).slice(0, 2), 7.2, 8.4, `font-family="${BODY}" font-weight="700" fill="${INK}"`)}
    <text x="51" y="${cardY + 51}" font-family="${BODY}" font-weight="600" font-size="6.8" fill="${INK}" fill-opacity=".7">${days} Tage · ${count} Fruchtgummis</text>
    ${paw(178, cardY + 30, .78, f.perDay || 1)}

    <rect x="${bx}" y="${legalY}" width="${cw}" height="${legalH + 20}" fill="${p.tint}"/>
    ${lines(120, legalY + 10, wrap(f.legal, 52), 6.4, 7.6, `text-anchor="middle" font-family="${BODY}" font-weight="700" fill="${INK}"`)}
    <text x="120" y="${legalY + 10 + wrap(f.legal, 52).length * 7.6}" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="6.4" fill="${INK}">${count} Fruchtgummis = ${grams(p, count)} g</text>

    <rect x="${bx}" y="${top}" width="${cw}" height="${size.H + 14}" fill="url(#${id}cyl)"/>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Briefkasten-Nachfüller: flacher Mono-PE-Beutel, max. 20 mm           */
/* ------------------------------------------------------------------ */
function crimp(x, y, w, h, color) {
  const n = Math.floor(w / 4);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>
  <g stroke="#000" stroke-opacity=".12" stroke-width="1">${Array.from({ length: n }, (_, i) => `<line x1="${x + 2 + i * 4}" y1="${y + 2}" x2="${x + 2 + i * 4}" y2="${y + h - 2}"/>`).join('')}</g>`;
}

function stamp(cx, cy, r, color) {
  const pid = nid('st');
  return `<g transform="rotate(-12 ${cx} ${cy})">
    <defs><path id="${pid}" d="M${cx - r + 4.5} ${cy} A${r - 4.5} ${r - 4.5} 0 1 1 ${cx + r - 4.5} ${cy} A${r - 4.5} ${r - 4.5} 0 1 1 ${cx - r + 4.5} ${cy}"/></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.6" stroke-dasharray="2.5 2"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 9}" fill="none" stroke="${color}" stroke-width="1"/>
    <text font-family="${DISPLAY}" font-weight="800" font-size="4.6" letter-spacing=".6" fill="${color}"><textPath href="#${pid}" startOffset="25%" text-anchor="middle">PASST IN DEN BRIEFKASTEN · MAX. 2 CM ·</textPath></text>
    <rect x="${cx - 7}" y="${cy - 5}" width="14" height="10" rx="1.5" fill="none" stroke="${color}" stroke-width="1.4"/>
    <path d="M${cx - 7} ${cy - 4} L${cx} ${cy + 1} L${cx + 7} ${cy - 4}" fill="none" stroke="${color}" stroke-width="1.4"/>
  </g>`;
}

function refill(p, opts = {}) {
  const f = info(p);
  const id = nid('rf');
  const [count, days] = f.refill || [p.count, 30];
  const x = 14, y = 14, w = 196, h = 300;
  const claim = wrap((f.claim || '') + '*', 46);
  const doseLine = `${f.dose} pro Tag`;
  const claimEnd = 160 + (claim.length - 1) * 8;
  const cardY = 238;
  return `<svg class="pack pack-refill" viewBox="0 0 224 332" role="img" aria-label="Nachfüller ${esc(p.name)}: ${esc(f.legal)}, ${count} Fruchtgummis, ${days} Tage">
  <defs>
    <mask id="${id}m"><rect x="0" y="0" width="224" height="332" fill="#fff"/><path d="M${x + w} 50 l-7 5 l7 5Z M${x} 50 l7 5 l-7 5Z" fill="#000"/></mask>
    <clipPath id="${id}c"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="45%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".26"/>
    </radialGradient>
  </defs>
  <ellipse cx="112" cy="322" rx="92" ry="7" fill="${INK}" opacity=".14"/>
  <g mask="url(#${id}m)">
    <g clip-path="url(#${id}c)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.color}"/>
      ${crimp(x, y, w, 22, p.dark)}

      <text x="34" y="60" font-family="${DISPLAY}" font-weight="800" font-size="24" letter-spacing="-1" fill="${INK}">bärly</text>
      <rect x="34" y="68" width="118" height="17" rx="8.5" fill="${INK}"/>
      <text x="93" y="79.4" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="7.6" letter-spacing=".8" fill="#fff">NACHFÜLLER · ${days} TAGE</text>
      ${stamp(180, 62, 22, INK)}

      <text x="112" y="${146}" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="48" fill="${INK}" textLength="${Math.min(168, 27 * p.word.length)}" lengthAdjust="spacingAndGlyphs">${esc(p.word)}</text>
      ${lines(112, 160, claim, 6.8, 8.2, `text-anchor="middle" font-family="${BODY}" font-weight="600" fill="${INK}"`)}

      <circle cx="112" cy="${cardY + 4}" r="62" fill="${p.light}" opacity=".5"/>
      ${bear(p, { x: 112 - 50, y: Math.max(claimEnd + 6, cardY - 104), width: 100, height: 133, shadow: false, label: false })}

      <rect x="28" y="${cardY}" width="168" height="44" rx="11" fill="#fff"/>
      <text x="39" y="${cardY + 18}" font-family="${DISPLAY}" font-weight="800" font-size="17" letter-spacing="-.4" fill="${INK}">${esc(p.name)}</text>
      <text x="39" y="${cardY + 29}" font-family="${BODY}" font-weight="700" font-size="7" fill="${INK}">${esc(wrap(doseLine, 30)[0])}</text>
      <text x="39" y="${cardY + 38.5}" font-family="${BODY}" font-weight="600" font-size="6.4" fill="${INK}" fill-opacity=".7">${count} Fruchtgummis = ${grams(p, count)} g</text>
      ${paw(176, cardY + 24, .66, f.perDay || 1)}

      <rect x="${x}" y="${y + h - 30}" width="${w}" height="30" fill="${p.tint}"/>
      ${lines(112, y + h - 19, wrap(f.legal, 56), 6.2, 7.4, `text-anchor="middle" font-family="${BODY}" font-weight="700" fill="${INK}"`)}
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}pil)"/>
      <path d="M40 120 Q66 150 50 196" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Tagespäckchen (46 × 58 mm). Kids: weißer Grund, Namensfeld.         */
/* Zap: dunkler Grund, nummeriert statt Wochentag, kein Cartoon.       */
/* ------------------------------------------------------------------ */
function packet(members, opts = {}) {
  const items = members.map(m => typeof m === 'string' ? byId[m] : m);
  const lead = items[0];
  const f = info(lead);
  const kids = items.every(p => p.line === 'kids');
  const zap = lead.id === 'zap';
  const id = nid('pk');
  const label = opts.day || 'MO';
  const name = opts.name || '';
  const w = 160, h = 200;
  const per = items.map(p => info(p).perDay || 1);
  const total = per.reduce((s, n) => s + n, 0);
  const bg = zap ? INK : '#fffdf8';
  const fg = zap ? '#fff' : INK;
  const band = zap ? YELLOW : (items.length === 1 ? lead.color : YELLOW);
  const bearW = items.length === 1 ? 56 : items.length === 2 ? 46 : 38;
  const gap = bearW * .82;
  const x0 = w / 2 - (items.length - 1) * gap / 2 - bearW / 2;
  return `<svg class="pack pack-packet" viewBox="0 0 ${w} ${h}" role="img" aria-label="${zap ? 'Zap-Päckchen' : kids ? 'Pausen-Päckchen' : 'Tagespäckchen'}: ${items.map(p => esc(p.name)).join(', ')}">
  <defs><clipPath id="${id}c"><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="7"/></clipPath>
    <radialGradient id="${id}pil" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></radialGradient>
  </defs>
  <g clip-path="url(#${id}c)">
    <rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="${bg}"/>
    ${crimp(4, 4, w - 8, 30, band)}
    <circle cx="30" cy="40" r="17" fill="${zap ? YELLOW : INK}" stroke="${bg}" stroke-width="3"/>
    <text x="30" y="45.5" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="${zap ? 16 : 14}" fill="${zap ? INK : '#fff'}">${esc(label)}</text>
    <text x="146" y="50" text-anchor="end" font-family="${DISPLAY}" font-weight="800" font-size="14" letter-spacing="-.5" fill="${fg}">bärly${kids ? ' <tspan font-size="9">kids</tspan>' : ''}</text>
    ${zap ? `
      <path d="M86 62 l-20 30 h13 l-9 28 l26 -36 h-14 l10 -22z" fill="${YELLOW}"/>
      <rect x="104" y="66" width="30" height="17" rx="8.5" fill="#fff"/><text x="119" y="78" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="10" fill="${INK}">18+</text>
      <text x="80" y="138" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="17" fill="#fff">Zap · 80 mg</text>
      <text x="80" y="150" text-anchor="middle" font-family="${BODY}" font-weight="700" font-size="7" fill="#fff" fill-opacity=".85">Koffein + L-Theanin · 1 Fruchtgummi</text>
      ${lines(80, 164, wrap(f.caffeine, 40), 6, 7.2, `text-anchor="middle" font-family="${BODY}" font-weight="600" fill="#fff"`)}
    ` : `
      ${items.map((p, i) => bear(p, { x: x0 + i * gap, y: 58 + (i % 2) * 4, width: bearW, height: bearW * 1.33, shadow: false, label: false })).join('')}
      <text x="80" y="${kids ? 150 : 148}" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="11.5" fill="${INK}">${items.length === 1 ? esc(lead.name) : items.map(p => esc(p.name)).join(' + ')}</text>
      <text x="80" y="${kids ? 161 : 160}" text-anchor="middle" font-family="${BODY}" font-weight="800" font-size="7.6" fill="${INK}">1 Päckchen = 1 Tag. Nicht mehr.</text>
      ${kids ? `
        <rect x="16" y="167" width="128" height="20" rx="5" fill="#fff" stroke="${INK}" stroke-opacity=".2"/>
        <text x="23" y="180" font-family="${BODY}" font-weight="700" font-size="7" fill="${INK}" fill-opacity=".6">Gehört:</text>
        <text x="52" y="182" font-family="${HAND}" font-weight="700" font-size="15" fill="${INK}">${esc(name)}</text>
      ` : `<text x="80" y="172" text-anchor="middle" font-family="${BODY}" font-weight="600" font-size="6.4" fill="${INK}" fill-opacity=".75">Nahrungsergänzungsmittel · ${total} Fruchtgummis</text>`}
    `}
    <rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="url(#${id}pil)"/>
  </g>
</svg>`;
}

/* Wochenstreifen: 7 perforierte Päckchen MO–SO (Zap: 1–7) mit Eurolochung */
function strip(members, opts = {}) {
  const items = members.map(m => typeof m === 'string' ? byId[m] : m);
  const zap = items[0].id === 'zap';
  const pw = 160, ph = 200, tab = 56;
  const labels = (zap ? ['1', '2', '3', '4', '5', '6', '7'] : WEEKDAYS).slice(0, opts.count || 7);
  const total = pw * labels.length + tab + (opts.count ? 12 : 0);
  const inner = labels.map((d, i) => `<g transform="translate(${tab + i * pw} 0)">${packet(items, { day: d, name: opts.name }).replace('<svg ', `<svg width="${pw}" height="${ph}" `)}</g>`).join('');
  return `<svg class="pack pack-strip" viewBox="0 0 ${total} ${ph}" role="img" aria-label="Wochenstreifen mit 7 Päckchen: ${items.map(p => esc(p.name)).join(', ')}">
    <rect x="4" y="4" width="${tab}" height="${ph - 8}" rx="7" fill="${zap ? INK : YELLOW}"/>
    <rect x="18" y="20" width="28" height="10" rx="5" fill="#fff"/>
    <text transform="translate(${tab / 2 + 6} ${ph / 2 + 6}) rotate(-90)" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="13" fill="${zap ? '#fff' : INK}">${zap ? '18+ · 7 PÄCKCHEN' : 'WOCHENSTREIFEN'}</text>
    ${inner}
    ${labels.map((_, i) => `<line x1="${tab + i * pw + 2}" y1="8" x2="${tab + i * pw + 2}" y2="${ph - 8}" stroke="${INK}" stroke-opacity=".35" stroke-width="1.4" stroke-dasharray="3 3"/>`).join('')}
    ${opts.count ? `<text x="${total - 6}" y="${ph / 2}" text-anchor="end" font-family="${DISPLAY}" font-weight="800" font-size="16" fill="${INK}" fill-opacity=".45" transform="rotate(90 ${total - 6} ${ph / 2})">+ ${7 - labels.length} weitere</text>` : ''}
  </svg>`;
}

/* Monatsbrief: Papierhülle mit Sichtfenster (Großbrief, max. 2 cm) */
function letter(content, opts = {}) {
  const id = nid('lt');
  return `<svg class="pack pack-letter" viewBox="0 0 353 250" role="img" aria-label="${esc(opts.label || 'Großbrief')}">
    <rect x="6" y="10" width="341" height="232" rx="6" fill="#e9dcc6"/>
    <rect x="6" y="10" width="341" height="232" rx="6" fill="none" stroke="#c9b48f"/>
    <path d="M6 16 L176 120 L347 16" fill="none" stroke="#c9b48f" stroke-width="1.4"/>
    <g transform="translate(26 132)"><rect width="150" height="60" rx="4" fill="#fff" stroke="#c9b48f"/>
      <text x="10" y="22" font-family="${HAND}" font-weight="700" font-size="16" fill="${INK}">${esc(opts.to || 'Emma Beispiel')}</text>
      <text x="10" y="40" font-family="${HAND}" font-weight="700" font-size="13" fill="${INK}" fill-opacity=".8">Bärenstraße 7</text>
      <text x="10" y="54" font-family="${HAND}" font-weight="700" font-size="13" fill="${INK}" fill-opacity=".8">12345 Musterstadt</text></g>
    <g transform="translate(286 26)"><rect width="44" height="52" fill="#fff" stroke="${INK}" stroke-dasharray="3 2"/><text x="22" y="30" text-anchor="middle" font-family="${DISPLAY}" font-weight="800" font-size="11" fill="${INK}">1,80</text></g>
    <text x="26" y="48" font-family="${DISPLAY}" font-weight="800" font-size="22" letter-spacing="-.8" fill="${INK}">bärly</text>
    <text x="26" y="64" font-family="${BODY}" font-weight="700" font-size="9" fill="${INK}" fill-opacity=".8">${esc(opts.label || 'Dein Nachschub ist da.')}</text>
    <g transform="translate(214 84) rotate(-7)">${content}</g>
  </svg>`;
}

window.Baerly.packs = { can, refill, packet, strip, letter, paw, WEEKDAYS, CAN };
})();
