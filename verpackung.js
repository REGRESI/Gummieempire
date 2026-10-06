/* bärly – Verpackungsseite
   Rendert das Verpackungssystem aus packaging-spec.js mit den Zeichnungen aus packs.js. */

(() => {
'use strict';

const { PRODUCTS, byId, bear, packs, SPEC } = window.Baerly;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KIDS = ['kiko', 'splash', 'juno'];

/* Hero: Dose, Nachfüller und Tütchen nebeneinander */
$('#pkTitle').textContent = SPEC.title;
$('#pkReco').innerHTML = SPEC.reco.map(t => `<p>${esc(t)}</p>`).join('');
$('#pkHeroVisual').innerHTML = `
  <div class="hv hv-can">${packs.can(byId.glow)}</div>
  <div class="hv hv-refill">${packs.refill(byId.glow)}</div>
  <div class="hv hv-sachet">${packs.packet(['kiko'], { day: 'MO', name: 'Emma' })}</div>`;

/* Formate */
const formatArt = {
  can: () => `<div class="can-trio">${packs.can(byId.sunny)}${packs.can(byId.mags)}${packs.can(byId.brainy)}</div>`,
  refill: () => packs.refill(byId.mags),
  letter: () => packs.letter(`<g transform="scale(.42)">${packs.refill(byId.mags).replace('<svg ', '<svg width="224" height="332" ')}</g>`),
  strip: () => packs.strip(['juno'], { name: 'Emma', count: 3 }),
  kids: () => packs.packet(['kiko'], { day: 'DI', name: 'Paul' }),
  zap: () => packs.strip(['zap'], { count: 3 }),
  trial: () => packs.packet(['glow'], { day: 'MO' }),
  stack: () => packs.packet(['glow', 'dew'], { day: 'MI' })
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
        <div><dt>Verschluss</dt><dd>${esc(f.closure)}</dd></div>
        <div><dt>Für wen</dt><dd>${esc(f.who)}</dd></div>
        <div><dt>Preis</dt><dd>${esc(f.price)}</dd></div>
      </dl>
    </div>
  </article>`).join('');

/* Vorderseiten-Raster: nummerierte Punkte auf der Dose */
$('#zoneVisual').innerHTML = `<div class="zone-can">${packs.can(byId.kiko)}${SPEC.zones.map((z, i) =>
  `<span class="zone-dot" style="top:${z.y}%;left:${z.x}%">${i + 1}</span>`).join('')}</div>`;
$('#zoneList').innerHTML = SPEC.zones.map(z => `<li><b>${esc(z.label)}</b><span>${esc(z.detail)}</span></li>`).join('');
$('#devices').innerHTML = `<h3 class="devices-title">Was nur wir haben</h3><div class="device-list">${SPEC.devices.map(d =>
  `<div class="device"><b>${esc(d.name)}</b><p>${esc(d.detail)}</p></div>`).join('')}</div>`;

/* Lineup */
const lineup = $('#lineup');
function renderLineup(view) {
  if (view === 'sachet') {
    lineup.innerHTML = [
      [packs.packet(['kiko'], { day: 'MO', name: 'Emma' }), 'Kiko'],
      [packs.packet(['splash'], { day: 'DI', name: 'Ben' }), 'Splash'],
      [packs.packet(['juno'], { day: 'MI', name: 'Mia' }), 'Juno'],
      [packs.packet(KIDS, { day: 'DO', name: 'Leo' }), 'Schulstart-Trio'],
      [packs.packet(['zap'], { day: '1' }), 'Zap'],
      [packs.packet(['glow', 'dew'], { day: 'FR' }), 'Beauty-Stack (Phase 2)']
    ].map(([s, n]) => `<div class="lineup-item">${s}<span>${esc(n)}</span></div>`).join('');
    return;
  }
  const list = PRODUCTS.filter(p => window.Baerly.PACK_INFO[p.id].can);
  lineup.innerHTML = list.map(p =>
    `<div class="lineup-item lineup-${view}">${view === 'refill' ? packs.refill(p) : packs.can(p)}<span>${esc(p.name)}</span></div>`).join('');
}
renderLineup('can');
$('#lineupTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-view]');
  if (!b) return;
  $$('[data-view]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  renderLineup(b.dataset.view);
});

$('#sizeTable').innerHTML = `<thead><tr><th scope="col">Sorte</th><th scope="col">Dose</th><th scope="col">Nachfüller</th><th scope="col">Tütchen</th></tr></thead>
<tbody>${SPEC.sizes.map(s => `<tr><th scope="row">${esc(s.product)}</th><td>${esc(s.can)}</td><td>${esc(s.refill)}</td><td>${esc(s.sachet)}</td></tr>`).join('')}</tbody>`;

/* Regeln */
const list = (items) => `<ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
$('#rules').innerHTML = `
  <div class="rule-card"><h3>Muss auf die Vorderseite</h3>${list(SPEC.rules.front)}</div>
  <div class="rule-card"><h3>Muss auf die Rückseite</h3>${list(SPEC.rules.back)}</div>
  <div class="rule-card rule-ok"><h3>Dürfen wir sagen</h3>${list(SPEC.rules.allowed)}</div>
  <div class="rule-card rule-no"><h3>Sagen wir nicht</h3>${list(SPEC.rules.forbidden)}</div>`;

/* Launch */
$('#launchGrid').innerHTML = `
  <div><h3>Reihenfolge</h3><ol class="launch-steps">${SPEC.launch.map(t => `<li>${esc(t)}</li>`).join('')}</ol></div>
  <div><h3>Fragen an den Hersteller</h3>${list(SPEC.questions)}<h3>Risiken</h3>${list(SPEC.risks)}</div>`;
$('#sources').innerHTML = `<details><summary>Quellen und Prüfstatus (${SPEC.sources.length})</summary>
  <ul>${SPEC.sources.map(s => `<li><span class="src-tag src-${s.check}">${s.check === 'ok' ? 'geprüft' : s.check === 'fix' ? 'korrigiert' : 'Schätzung'}</span> ${esc(s.claim)}${s.url ? ` <a href="${esc(s.url)}" target="_blank" rel="noopener">Quelle</a>` : ''}</li>`).join('')}</ul></details>`;
})();
