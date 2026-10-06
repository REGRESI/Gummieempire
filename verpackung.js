/* bärly – Verpackungsseite
   Rendert das Verpackungssystem aus packaging-spec.js mit den Zeichnungen aus packs.js. */

(() => {
'use strict';

const { PRODUCTS, byId, PACK_INFO, packs, SPEC } = window.Baerly;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const list = (items) => `<ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

/* Hero: Dose, Nachfüller, Tütchen */
$('#pkTitle').textContent = SPEC.title;
$('#pkReco').innerHTML = SPEC.reco.map(t => `<p>${esc(t)}</p>`).join('');
$('#pkHeroVisual').innerHTML = `
  <div class="hv hv-can">${packs.can(byId.glow)}</div>
  <div class="hv hv-refill">${packs.refill(byId.glow)}</div>
  <div class="hv hv-sachet">${packs.tuetchen('kiko', { name: 'Emma' })}</div>`;

/* Formate */
const formatArt = {
  can: () => `<div class="can-duo">${packs.can(byId.mags)}${packs.can(byId.brainy)}</div>`,
  refill: () => packs.refill(byId.mags),
  duo: () => `<div class="can-duo">${packs.refill(byId.flex, { variant: 'duo1' })}${packs.refill(byId.flex, { variant: 'duo2' })}</div>`,
  tuetchen: () => `<div class="can-duo">${packs.tuetchen('kiko', { name: 'Paul' })}${packs.tuetchen('zap')}</div>`,
  box: () => packs.box(['kiko', 'juno']),
  letter: () => packs.letter(packs.nest(packs.tuetchen('juno', { name: 'Emma' }), 20, 0, 70), { label: '30 Tütchen für die Box' }),
  trial: () => packs.refill(byId.glow, { variant: 'trial' }),
  stack: () => `<div class="can-duo">${packs.tuetchenM(['glow', 'dew'], { title: 'BEAUTY' })}${packs.tuetchenM('buff')}</div>`
};
$('#formatList').innerHTML = SPEC.formats.map(f => `
  <article class="format">
    <div class="format-art">${(formatArt[f.key] || formatArt.can)()}</div>
    <div class="format-body">
      <p class="format-role">${esc(f.role)}</p>
      <h3>${esc(f.name)}</h3>
      <dl class="format-specs">
        <div><dt>Inhalt</dt><dd>${esc(f.contents)}</dd></div>
        <div><dt>Maße</dt><dd>${esc(f.size)}</dd></div>
        <div><dt>Material</dt><dd>${esc(f.material)}</dd></div>
        <div><dt>Verschluss &amp; Details</dt><dd>${esc(f.closure)}</dd></div>
        <div><dt>Für wen</dt><dd>${esc(f.who)}</dd></div>
        <div><dt>Preis</dt><dd>${esc(f.price)}</dd></div>
      </dl>
    </div>
  </article>`).join('');

/* Vorderseiten-Raster: nummerierte Punkte auf der Dose, in Lesereihenfolge */
$('#zoneVisual').innerHTML = `<div class="zone-can">${packs.can(byId.mags)}${SPEC.zones.map((z, i) =>
  `<span class="zone-dot" style="top:${z.y}%;left:${z.x}%">${i + 1}</span>`).join('')}</div>`;
$('#zoneList').innerHTML = SPEC.zones.map(z => `<li><b>${esc(z.label)}</b><span>${esc(z.detail)}</span></li>`).join('');

/* Drei Tonlagen: Erwachsene, Kids, Zap */
const modeArt = { mags: () => packs.refill(byId.mags), kiko: () => packs.box('kiko'), zap: () => packs.box('zap') };
$('#modes').innerHTML = `<h3 class="devices-title">Drei Tonlagen</h3><div class="mode-list">${SPEC.modes.map(m =>
  `<div class="mode"><div class="mode-art">${modeArt[m.id]()}</div><b>${esc(m.label)}</b><p>${esc(m.text)}</p></div>`).join('')}</div>`;
$('#devices').innerHTML = `<h3 class="devices-title">Was nur wir haben</h3><div class="device-list">${SPEC.devices.map(d =>
  `<div class="device"><b>${esc(d.name)}</b><p>${esc(d.detail)}</p></div>`).join('')}</div>`;

/* Lineup */
const lineup = $('#lineup');
function renderLineup(view) {
  if (view === 'sachet') {
    lineup.className = 'lineup lineup-wide';
    lineup.innerHTML = [
      [packs.box('kiko'), 'Tütchen-Box Kiko'],
      [packs.box('juno'), 'Tütchen-Box Juno'],
      [packs.box('zap'), 'Zap-Box'],
      [packs.tuetchen('kiko', { name: 'Emma' }), 'Kiko'],
      [packs.tuetchen('juno', { name: 'Ben' }), 'Juno'],
      [packs.tuetchen(['kiko', 'juno'], { name: 'Mia' }), 'Schul-Duo (Welle 2)'],
      [packs.tuetchen('splash', { name: 'Leo' }), 'Splash Sporttag'],
      [packs.tuetchen('zap'), 'Zap'],
      [packs.tuetchenM('buff'), 'Buff-Portion'],
      [packs.tuetchenM(['glow', 'dew'], { title: 'BEAUTY' }), 'Beauty-Stack (Welle 3)']
    ].map(([s, n]) => `<div class="lineup-item">${s}<span>${esc(n)}</span></div>`).join('');
    return;
  }
  lineup.className = 'lineup';
  const items = PRODUCTS.filter(p => PACK_INFO[p.id].format === 'can');
  lineup.innerHTML = items.map(p =>
    `<div class="lineup-item lineup-${view}">${view === 'refill' ? packs.refill(p, { variant: PACK_INFO[p.id].refill[1] === 30 ? 'refill' : 'duo1' }) : packs.can(p)}<span>${esc(p.name)}</span></div>`).join('');
}
renderLineup('can');
$('#lineupTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-view]');
  if (!b) return;
  $$('[data-view]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  renderLineup(b.dataset.view);
});

$('#sizeTable').innerHTML = `<thead><tr><th scope="col">Sorte</th><th scope="col">Behälter</th><th scope="col">Nachschub</th><th scope="col">Tütchen</th></tr></thead>
<tbody>${SPEC.sizes.map(s => `<tr><th scope="row">${esc(s.product)}</th><td>${esc(s.can)}</td><td>${esc(s.refill)}</td><td>${esc(s.sachet)}</td></tr>`).join('')}</tbody>`;

/* Regeln */
$('#rules').innerHTML = `
  <div class="rule-card"><h3>Muss auf die Vorderseite</h3>${list(SPEC.rules.front)}</div>
  <div class="rule-card"><h3>Muss auf die Rückseite</h3>${list(SPEC.rules.back)}</div>
  <div class="rule-card rule-ok"><h3>Dürfen wir sagen</h3>${list(SPEC.rules.allowed)}</div>
  <div class="rule-card rule-no"><h3>Sagen wir nicht</h3>${list(SPEC.rules.forbidden)}</div>`;

/* Entscheidung, Launch, Quellen */
$('#decision').innerHTML = `<h3>${esc(SPEC.decision.title)}</h3><p>${esc(SPEC.decision.text)}</p>`;
$('#launchGrid').innerHTML = `
  <div><h3>Reihenfolge</h3><ol class="launch-steps">${SPEC.launch.map(t => `<li>${esc(t)}</li>`).join('')}</ol></div>
  <div><h3>Fragen an die Lieferanten</h3>${list(SPEC.questions)}<h3>Risiken</h3>${list(SPEC.risks)}</div>`;
const tag = { ok: 'geprüft', fix: 'korrigiert', est: 'Schätzung' };
$('#sources').innerHTML = `<details><summary>Quellen und Prüfstatus (${SPEC.sources.length})</summary>
  <ul>${SPEC.sources.map(s => `<li><span class="src-tag src-${s.check}">${tag[s.check]}</span> ${esc(s.claim)}${s.url ? ` <a href="${esc(s.url)}" target="_blank" rel="noopener">Quelle</a>` : ''}</li>`).join('')}</ul></details>`;
})();
