/* bärly – die vier Maskottchen als eigene Illustration (SVG)
   Plüsch-Look: weiche Verläufe, leichter Flaum am Rand, feine Faserstruktur.
   Farben und Erkennungsmerkmale nach der Character Bible:
   GLOW  pink, Krone + Herzbrille        FLEX  blau, schwarze Sportbrille, athletisch, Hantel
   SNOOZY lila, Schlafmütze + Kissen     DAILY gelb, Hoodie + Crossbody-Bag
   mascot(id, { pose: 'full' | 'bust' }) liefert ein SVG (viewBox 0 0 400 500 bzw. 0 0 400 360). */

(() => {
'use strict';

const PAL = {
  glow:   { fur: '#ff8fb1', light: '#ffd1e1', dark: '#e0607f', muzzle: '#ffe8ef', inner: '#ffc2d4', nose: '#2a1d24', blush: '#ff5c8a' },
  flex:   { fur: '#6da3ff', light: '#bfd8ff', dark: '#3f74d9', muzzle: '#ffffff', inner: '#a9c8ff', nose: '#1f1d26', blush: '#ff7a9c' },
  snoozy: { fur: '#a27cf0', light: '#dcc3ff', dark: '#7650cf', muzzle: '#f6ecff', inner: '#cfb4ff', nose: '#231d2e', blush: '#ff86b0' },
  daily:  { fur: '#ffcf5c', light: '#ffe7a3', dark: '#e5a92c', muzzle: '#fff4da', inner: '#ffe08f', nose: '#2a2118', blush: '#ff9a7a' }
};
const INK = '#1d1a24';
let uid = 0;

function defs(id, c) {
  return `<defs>
    <radialGradient id="${id}fur" cx="36%" cy="28%" r="80%">
      <stop offset="0" stop-color="${c.light}"/><stop offset=".48" stop-color="${c.fur}"/><stop offset="1" stop-color="${c.dark}"/>
    </radialGradient>
    <radialGradient id="${id}furS" cx="40%" cy="30%" r="75%">
      <stop offset="0" stop-color="${c.fur}"/><stop offset=".7" stop-color="${c.dark}"/><stop offset="1" stop-color="${c.dark}"/>
    </radialGradient>
    <radialGradient id="${id}muz" cx="45%" cy="35%" r="70%">
      <stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${c.muzzle}"/><stop offset="1" stop-color="${c.inner}"/>
    </radialGradient>
    <radialGradient id="${id}belly" cx="45%" cy="30%" r="75%">
      <stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="${c.muzzle}"/><stop offset="1" stop-color="${c.light}"/>
    </radialGradient>
    <radialGradient id="${id}eye" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#4a4458"/><stop offset=".6" stop-color="${INK}"/><stop offset="1" stop-color="#000"/>
    </radialGradient>
    <linearGradient id="${id}gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff1b8"/><stop offset=".35" stop-color="#f2c94c"/><stop offset=".75" stop-color="#d4a017"/><stop offset="1" stop-color="#9c7409"/>
    </linearGradient>
    <linearGradient id="${id}heart" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff6f91"/><stop offset=".55" stop-color="#c8174a"/><stop offset="1" stop-color="#7d0a2b"/>
    </linearGradient>
    <linearGradient id="${id}shade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b3a44"/><stop offset=".5" stop-color="#121117"/><stop offset="1" stop-color="#000"/>
    </linearGradient>
    <linearGradient id="${id}metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9a9aa6"/><stop offset=".4" stop-color="#4b4b55"/><stop offset="1" stop-color="#1c1c22"/>
    </linearGradient>
    <linearGradient id="${id}cap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a4fe0"/><stop offset=".6" stop-color="#5b21b6"/><stop offset="1" stop-color="#3b137a"/>
    </linearGradient>
    <linearGradient id="${id}cream" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffaf2"/><stop offset=".6" stop-color="#f3e6d3"/><stop offset="1" stop-color="#dcc8ac"/>
    </linearGradient>
    <linearGradient id="${id}hood" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffaf3"/><stop offset=".55" stop-color="#efe3d1"/><stop offset="1" stop-color="#cdb796"/>
    </linearGradient>
    <filter id="${id}plush" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="fz"/>
      <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="3" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 .62" result="ga"/>
      <feComposite in="ga" in2="fz" operator="in" result="grain"/>
      <feMerge><feMergeNode in="fz"/><feMergeNode in="grain"/></feMerge>
    </filter>
    <filter id="${id}soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="${id}shadow" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>`;
}

/* Grundkörper: Ohren, Kopf, Schnauze, Nase. Augen/Mund kommen pro Figur. */
function head(id, c) {
  return `
    <circle cx="86" cy="86" r="54" fill="url(#${id}fur)"/><circle cx="314" cy="86" r="54" fill="url(#${id}fur)"/>
    <circle cx="90" cy="90" r="29" fill="${c.inner}"/><circle cx="310" cy="90" r="29" fill="${c.inner}"/>
    <ellipse cx="200" cy="182" rx="146" ry="128" fill="url(#${id}fur)"/>`;
}
function face(id, c) {
  return `
    <ellipse cx="200" cy="232" rx="64" ry="47" fill="url(#${id}muz)"/>
    <ellipse cx="200" cy="208" rx="23" ry="16" fill="${c.nose}"/>
    <ellipse cx="193" cy="202" rx="8" ry="4.5" fill="#fff" opacity=".55"/>
    <ellipse cx="112" cy="222" rx="24" ry="13" fill="${c.blush}" opacity=".32" filter="url(#${id}soft)"/>
    <ellipse cx="288" cy="222" rx="24" ry="13" fill="${c.blush}" opacity=".32" filter="url(#${id}soft)"/>`;
}
const eyesOpen = (id) => `
    <ellipse cx="146" cy="172" rx="15" ry="19" fill="url(#${id}eye)"/><ellipse cx="254" cy="172" rx="15" ry="19" fill="url(#${id}eye)"/>
    <circle cx="151" cy="164" r="5.5" fill="#fff"/><circle cx="259" cy="164" r="5.5" fill="#fff"/>
    <circle cx="142" cy="180" r="2.2" fill="#fff" opacity=".8"/><circle cx="250" cy="180" r="2.2" fill="#fff" opacity=".8"/>`;
const smile = (c, open = true) => open
  ? `<path d="M200 223 v10" stroke="${c.nose}" stroke-width="4" stroke-linecap="round"/>
     <path d="M176 238 Q200 264 224 238 Q200 248 176 238Z" fill="${c.nose}"/>
     <path d="M188 249 Q200 258 212 249 Q200 252 188 249Z" fill="#ff7a93"/>`
  : `<path d="M200 223 v10 M180 240 Q200 256 220 240" fill="none" stroke="${c.nose}" stroke-width="4" stroke-linecap="round"/>`;

/* Körper mit Bauch und Beinen; arms = SVG für die Arme (vor/hinter dem Körper) */
function body(id, c, opts = {}) {
  const belly = opts.belly === false ? '' : `<ellipse cx="200" cy="384" rx="76" ry="66" fill="url(#${id}belly)" opacity=".95"/>`;
  return `
    <ellipse cx="148" cy="448" rx="50" ry="40" fill="url(#${id}furS)"/>
    <ellipse cx="252" cy="448" rx="50" ry="40" fill="url(#${id}furS)"/>
    <ellipse cx="146" cy="462" rx="26" ry="17" fill="${c.inner}"/><ellipse cx="254" cy="462" rx="26" ry="17" fill="${c.inner}"/>
    <ellipse cx="200" cy="362" rx="${opts.wide ? 132 : 120}" ry="108" fill="url(#${id}fur)"/>
    ${belly}`;
}
/* Gliedmaße von Punkt 1 (Schulter) zu Punkt 2 (Pfote) */
function limb(fill, x1, y1, x2, y2, w = 68) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
  const rot = Math.atan2(dx, -dy) * 180 / Math.PI;
  const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${w / 2}" ry="${len / 2 + w * .32}" transform="rotate(${rot.toFixed(1)} ${cx} ${cy})" fill="${fill}"/>`;
}
const arm = (id, cx, cy, rot, rx = 36, ry = 64) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="url(#${id}fur)"/>`;
const paw = (id, c, cx, cy, r = 26) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}fur)"/><ellipse cx="${cx}" cy="${cy + 4}" rx="${r * .5}" ry="${r * .38}" fill="${c.inner}" opacity=".85"/>`;

/* ---------- GLOW ---------- */
function glow(id, c) {
  const F = `url(#${id}fur)`;
  const heart = (cx, cy) => `<path d="M${cx} ${cy + 26} C ${cx - 46} ${cy + 2} ${cx - 40} ${cy - 30} ${cx - 16} ${cy - 28} C ${cx - 6} ${cy - 27} ${cx} ${cy - 19} ${cx} ${cy - 13} C ${cx} ${cy - 19} ${cx + 6} ${cy - 27} ${cx + 16} ${cy - 28} C ${cx + 40} ${cy - 30} ${cx + 46} ${cy + 2} ${cx} ${cy + 26} Z"`;
  return {
    back: limb(F, 112, 318, 92, 408, 66) + paw(id, c, 92, 414, 25),
    over: limb(F, 296, 304, 366, 236, 66) + paw(id, c, 374, 226, 29),
    face: `${smile(c)}
      <g>
        <path d="M100 168 L60 150 M300 168 L340 150" stroke="#d8264f" stroke-width="7" stroke-linecap="round"/>
        ${heart(146, 172)} fill="url(#${id}heart)" stroke="#ff3d6a" stroke-width="7" stroke-linejoin="round"/>
        ${heart(254, 172)} fill="url(#${id}heart)" stroke="#ff3d6a" stroke-width="7" stroke-linejoin="round"/>
        <path d="M184 160 Q200 150 216 160" fill="none" stroke="#ff3d6a" stroke-width="7" stroke-linecap="round"/>
        <path d="M122 160 q10 -10 22 -8" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".75"/>
        <path d="M230 160 q10 -10 22 -8" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".75"/>
      </g>`,
    top: `<g transform="rotate(-8 200 60)">
        <path d="M138 92 L128 30 L166 62 L200 14 L234 62 L272 30 L262 92 Z" fill="url(#${id}gold)" stroke="#b8860b" stroke-width="3" stroke-linejoin="round"/>
        <rect x="136" y="82" width="128" height="16" rx="6" fill="url(#${id}gold)" stroke="#b8860b" stroke-width="3"/>
        <circle cx="200" cy="58" r="9" fill="#ff3d6a" stroke="#fff" stroke-width="2"/>
        <circle cx="160" cy="76" r="6" fill="#ff86a6"/><circle cx="240" cy="76" r="6" fill="#ff86a6"/>
        <circle cx="128" cy="30" r="6" fill="url(#${id}gold)"/><circle cx="200" cy="14" r="7" fill="url(#${id}gold)"/><circle cx="272" cy="30" r="6" fill="url(#${id}gold)"/>
        <path d="M150 50 l6 -10" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      </g>`
  };
}

/* ---------- FLEX ---------- */
function flex(id, c) {
  const F = `url(#${id}fur)`;
  const dumbbell = (x, y) => `<g>
      <rect x="${x - 56}" y="${y - 6}" width="112" height="12" rx="6" fill="url(#${id}metal)"/>
      <rect x="${x - 60}" y="${y - 30}" width="22" height="60" rx="7" fill="url(#${id}metal)"/><rect x="${x + 38}" y="${y - 30}" width="22" height="60" rx="7" fill="url(#${id}metal)"/>
      <rect x="${x - 72}" y="${y - 21}" width="13" height="42" rx="5" fill="#26262e"/><rect x="${x + 59}" y="${y - 21}" width="13" height="42" rx="5" fill="#26262e"/>
      <path d="M${x - 53} ${y - 24} v48 M${x + 45} ${y - 24} v48" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".25"/>
    </g>`;
  return {
    wide: true,
    front: limb(F, 118, 316, 80, 414, 72) + dumbbell(80, 438) + paw(id, c, 80, 430, 27),
    over: limb(F, 300, 306, 372, 296, 74) + limb(F, 376, 300, 380, 222, 64) + paw(id, c, 380, 208, 30) +
      `<path d="M318 286 q26 -22 52 -4" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>`,
    chest: `<path d="M150 318 Q176 304 200 318 Q224 304 250 318" fill="none" stroke="${c.dark}" stroke-width="4" stroke-linecap="round" opacity=".45"/>
      <path d="M200 334 V428 M168 362 H232 M172 394 H228" fill="none" stroke="${c.light}" stroke-width="4" stroke-linecap="round" opacity=".75"/>`,
    face: `<path d="M200 223 v10 M178 240 Q204 258 226 236" fill="none" stroke="${c.nose}" stroke-width="4.5" stroke-linecap="round"/>
      <g>
        <path d="M70 166 C 90 142 140 138 200 146 C 260 138 310 142 330 166 L 322 190 C 304 214 256 220 226 198 C 214 190 186 190 174 198 C 144 220 96 214 78 190 Z" fill="url(#${id}shade)" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
        <path d="M96 162 C 120 152 150 152 170 158" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>
        <path d="M232 158 C 252 152 282 152 304 162" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>
        <path d="M70 168 L52 160 M330 168 L348 160" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      </g>`
  };
}

/* ---------- SNOOZY ---------- */
function snoozy(id, c) {
  const F = `url(#${id}fur)`;
  const star = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 L2.9 -3.1 L10 -3.1 L4.3 1.4 L6.4 8.6 L0 4.3 L-6.4 8.6 L-4.3 1.4 L-10 -3.1 L-2.9 -3.1 Z" fill="#f8e27a"/>`;
  return {
    belly: false,
    front: `<g>
        <path d="M86 300 C 120 286 280 286 314 300 C 330 340 330 400 314 440 C 280 454 120 454 86 440 C 70 400 70 340 86 300 Z" fill="url(#${id}cream)"/>
        <path d="M86 300 l-10 -10 M314 300 l10 -10 M86 440 l-10 10 M314 440 l10 10" stroke="#e8d7bd" stroke-width="12" stroke-linecap="round"/>
        <path d="M110 318 Q200 300 290 318" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>
        <path d="M108 424 Q200 440 292 424" fill="none" stroke="#d9c4a4" stroke-width="3" opacity=".7"/>
      </g>
      ${limb(F, 110, 318, 150, 392, 60)}${paw(id, c, 152, 398, 25)}
      ${limb(F, 290, 318, 250, 392, 60)}${paw(id, c, 248, 398, 25)}`,
    face: `<path d="M126 176 Q146 192 166 176 M234 176 Q254 192 274 176" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <path d="M200 223 v8 M186 240 Q200 250 214 240" fill="none" stroke="${c.nose}" stroke-width="4" stroke-linecap="round"/>`,
    top: `<g>
        <path d="M64 120 C 70 40 150 8 232 22 C 300 34 350 80 372 150 C 380 178 368 206 352 214 C 342 170 318 128 270 104 C 200 76 120 88 64 120 Z" fill="url(#${id}cap)"/>
        ${star(150, 54, 1.1)}${star(232, 44, .9)}${star(300, 92, 1)}${star(104, 96, .8)}${star(340, 150, .75)}
        <path d="M58 124 C 120 82 260 74 336 120" fill="none" stroke="#cdb6ff" stroke-width="30" stroke-linecap="round"/>
        <path d="M70 116 C 130 82 250 76 322 112" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>
        <circle cx="356" cy="226" r="26" fill="#efe6ff"/><circle cx="348" cy="218" r="9" fill="#fff" opacity=".7"/>
      </g>`
  };
}

/* ---------- DAILY ---------- */
function daily(id, c) {
  const H = `url(#${id}hood)`;
  return {
    belly: false,
    hoodie: `<path d="M84 330 C 84 280 130 252 200 252 C 270 252 316 280 316 330 L 322 430 C 300 462 100 462 78 430 Z" fill="${H}"/>
      <path d="M140 262 C 160 300 240 300 260 262" fill="none" stroke="#d6c3a5" stroke-width="10" stroke-linecap="round"/>
      <path d="M182 290 L176 340 M218 290 L224 340" stroke="#cbb48f" stroke-width="4" stroke-linecap="round"/>
      <circle cx="176" cy="342" r="4" fill="#cbb48f"/><circle cx="224" cy="342" r="4" fill="#cbb48f"/>
      <path d="M140 380 H260 L250 428 H150 Z" fill="none" stroke="#d6c3a5" stroke-width="4" stroke-linejoin="round"/>
      <text x="246" y="330" font-family="Fredoka, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="700" font-size="30" fill="${INK}">b</text>`,
    back: limb(H, 112, 314, 88, 406, 70) + paw(id, c, 86, 420, 24),
    front: `<path d="M118 270 L292 420" stroke="#1d1d22" stroke-width="16" stroke-linecap="round"/>
      <path d="M118 270 L292 420" stroke="#3a3a42" stroke-width="4" stroke-linecap="round" opacity=".6"/>
      <g transform="rotate(-12 296 418)">
        <rect x="248" y="392" width="96" height="58" rx="20" fill="#1d1d22"/>
        <path d="M258 410 H334" stroke="#55555f" stroke-width="3" stroke-linecap="round"/>
        <rect x="286" y="424" width="22" height="12" rx="4" fill="#3a3a42"/>
        <path d="M260 398 q30 -8 70 0" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".15"/>
      </g>`,
    over: limb(H, 298, 300, 366, 236, 70) + paw(id, c, 376, 224, 28),
    face: `<path d="M128 176 Q146 162 164 176" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="254" cy="172" rx="15" ry="19" fill="url(#${id}eye)"/><circle cx="259" cy="164" r="5.5" fill="#fff"/><circle cx="250" cy="180" r="2.2" fill="#fff" opacity=".8"/>
      ${smile(c)}`
  };
}

const PARTS = { glow, flex, snoozy, daily };

function mascot(name, opts = {}) {
  const c = PAL[name];
  const id = `m${name}${++uid}`;
  const part = PARTS[name](id, c);
  const bust = opts.pose === 'bust';
  const label = opts.label === false ? 'aria-hidden="true"' : `role="img" aria-label="${opts.alt || name.toUpperCase()}"`;
  const viewBox = bust ? '0 -10 400 340' : '-30 -10 470 520';
  const bodyPart = bust ? '' : `
    <g filter="url(#${id}plush)">
      ${part.back || ''}
      ${body(id, c, { wide: part.wide, belly: part.belly })}
      ${part.hoodie || ''}
      ${part.chest || ''}
    </g>`;
  const front = bust ? '' : part.front;
  return `<svg class="mascot mascot-${name}" viewBox="${viewBox}" ${label} xmlns="http://www.w3.org/2000/svg">
  ${defs(id, c)}
  ${bust ? '' : `<ellipse cx="200" cy="486" rx="130" ry="14" fill="#1d1a24" opacity=".16" filter="url(#${id}shadow)"/>`}
  ${bodyPart}
  <g filter="url(#${id}plush)">${front}</g>
  <g filter="url(#${id}plush)">${head(id, c)}</g>
  <ellipse cx="146" cy="104" rx="60" ry="30" transform="rotate(-24 146 104)" fill="#fff" opacity=".18" filter="url(#${id}soft)"/>
  ${face(id, c)}
  ${part.face || eyesOpen(id) + smile(c)}
  ${part.top || ''}
  ${!bust && part.over ? `<g filter="url(#${id}plush)">${part.over}</g>` : ''}
</svg>`;
}

window.Baerly = window.Baerly || {};
window.Baerly.mascot = mascot;
window.Baerly.MASCOT_PALETTE = PAL;
})();
