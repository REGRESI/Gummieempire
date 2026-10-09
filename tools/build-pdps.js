/* Erzeugt die Produktseiten glow.html, flex.html, snoozy.html und daily.html
   und die Set-Seiten crew.html und morgen-abend.html (Dateinamen aus pdpUrl in brand.js).
   Kopf, Fuß und Warenkorb kommen aus index.html (Anker zeigen dann auf index.html#…),
   den Inhalt bauen pdp.js bzw. bundle.js im Browser aus brand.js. Nach Änderungen an Kopf oder Fuß neu laufen lassen:
   node tools/build-pdps.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {}, document: { getElementById: () => true } };
vm.runInNewContext(fs.readFileSync(path.join(root, 'brand.js'), 'utf8'), sandbox);
const { PRODUCTS, BUNDLES, eur, planFor, pdpUrl } = sandbox.window.Baerly;
const memberSum = (b) => b.members.reduce((s, id) => s + PRODUCTS.find(p => p.id === id).price, 0);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const head = index.slice(index.indexOf('<aside class="announce"'), index.indexOf('<main id="top">'));
const foot = index.slice(index.indexOf('</main>') + '</main>'.length, index.indexOf('<script src="brand.js">'));
// data-page: shop.js baut daraus in der htmlpreview-Vorschau die richtige Adresse
const relink = (html) => html
  .replace(/href="#top"/g, 'href="index.html" data-page="index.html"')
  .replace(/href="#([^"]+)"/g, 'href="index.html#$1" data-page="index.html#$1"')
  .replace('aria-label="bärly, zum Seitenanfang"', 'aria-label="bärly, zur Startseite"')
  .replace('aria-label="bärly, zum Seitenanfang"', 'aria-label="bärly, zur Startseite"');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pageHTML({ title, desc, mainAttrs, noscript, script }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#fbf8f4">
<!-- Erzeugt mit node tools/build-pdps.js. Inhalt kommt aus brand.js über ${script}. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@400;500;600;700;800&family=Fredoka:wght@600;700&display=swap">
<!-- Bis styles.css geladen ist: Seite in Markenfarbe statt kurz weiß mit blauen Links (fällt nach 3 s von selbst weg) -->
<style>html{background:#fbf8f4;color:#1f1b2d}body{visibility:hidden;animation:baerly-show 0s 3s forwards}@keyframes baerly-show{to{visibility:visible}}</style>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="pdp.css">
</head>
<body>

<a class="skip" href="#buy">Zur Kaufbox springen</a>

${relink(head)}<main id="top" class="pdp" ${mainAttrs}>
  <noscript>
    <div class="wrap noscript">
${noscript}
      <p>Für Preise und Warenkorb bitte JavaScript aktivieren.</p>
    </div>
  </noscript>
</main>
${relink(foot)}<script src="brand.js"></script>
<script src="shop.js"></script>
<script src="${script}"></script>
</body>
</html>
`;
}
const write = (file, html) => { fs.writeFileSync(path.join(root, file), html); console.log('geschrieben:', file); };

for (const p of PRODUCTS.filter(x => x.launch)) {
  const name = p.name.toUpperCase();
  const abo = planFor(p, 'abo');
  write(pdpUrl(p.id), pageHTML({
    title: `${name} ${p.title} · bärly`,
    desc: `bärly ${name} ${p.title}: ${p.short} ${p.flavor}, 60 Fruchtgummis für 30 Tage. Einmalig ${eur(p.price)}, im Abo ${eur(abo.price)} je Lieferung.${p.adultOnly ? ' Nur für Erwachsene.' : ''}`,
    mainAttrs: `data-product="${p.id}"`,
    noscript: `      <h1>${name} ${p.title}</h1>
      <p>${esc(p.short)} ${esc(p.flavor)}, ${esc(p.serving)}.</p>
      <p>${esc(p.claim)}${p.warn ? ` ${esc(p.warn)}` : ''}</p>`,
    script: 'pdp.js'
  }));
}

for (const b of Object.values(BUNDLES).filter(x => !x.soon)) {
  const items = b.members.map(id => PRODUCTS.find(p => p.id === id));
  const names = items.map(p => p.name.toUpperCase());
  const list = `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}`;
  const adult = items.some(p => p.adultOnly);
  write(pdpUrl(b.id), pageHTML({
    title: `${b.name}: ${list} · bärly`,
    desc: `bärly Set ${b.name}: ${list}, je 30 Tage. ${eur(b.price)} statt einzeln ${eur(memberSum(b))}, im Abo ${eur(planFor(b, 'abo').price)}.${adult ? ' Nur für Erwachsene.' : ''}`,
    mainAttrs: `data-bundle="${b.id}"`,
    noscript: `      <h1>${esc(b.name)}</h1>
      <p>${esc(b.title)}. ${eur(b.price)} statt einzeln ${eur(memberSum(b))}.</p>
      <p>${items.map(p => `<a href="${pdpUrl(p.id)}">${p.name.toUpperCase()} ${p.title}</a>`).join(' · ')}</p>`,
    script: 'bundle.js'
  }));
}
