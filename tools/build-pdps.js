/* Erzeugt die Produktseiten glow.html, flex.html, snoozy.html und daily.html.
   Kopf, Fuß und Warenkorb kommen aus index.html (Anker zeigen dann auf index.html#…),
   den Inhalt baut pdp.js im Browser aus brand.js. Nach Änderungen an Kopf oder Fuß neu laufen lassen:
   node tools/build-pdps.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {}, document: { getElementById: () => true } };
vm.runInNewContext(fs.readFileSync(path.join(root, 'brand.js'), 'utf8'), sandbox);
const { PRODUCTS, PDP, eur, planFor } = sandbox.window.Baerly;

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const head = index.slice(index.indexOf('<aside class="announce"'), index.indexOf('<main id="top">'));
const foot = index.slice(index.indexOf('</main>') + '</main>'.length, index.indexOf('<script src="brand.js">'));
const relink = (html) => html
  .replace(/href="#top"/g, 'href="index.html"')
  .replace(/href="#([^"]+)"/g, 'href="index.html#$1"')
  .replace('aria-label="bärly, zum Seitenanfang"', 'aria-label="bärly, zur Startseite"')
  .replace('aria-label="bärly, zum Seitenanfang"', 'aria-label="bärly, zur Startseite"');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const p of PRODUCTS.filter(x => x.launch)) {
  const name = p.name.toUpperCase();
  const abo = planFor(p, 'abo');
  const desc = `bärly ${name} ${p.title}: ${p.short} ${p.flavor}, 60 Fruchtgummis für 30 Tage. Einmalig ${eur(p.price)}, im Abo ${eur(abo.price)} je Lieferung.${p.warn ? ' Nur für Erwachsene.' : ''}`;
  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${name} ${p.title} · bärly</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#fbf8f4">
<!-- Erzeugt mit node tools/build-pdps.js. Inhalt kommt aus brand.js über pdp.js. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@400;500;600;700;800&family=Fredoka:wght@600;700&display=swap">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="pdp.css">
</head>
<body>

<a class="skip" href="#buy">Zur Kaufbox springen</a>

${relink(head)}<main id="top" class="pdp" data-product="${p.id}">
  <noscript>
    <div class="wrap noscript">
      <h1>${name} ${p.title}</h1>
      <p>${esc(p.short)} ${esc(p.flavor)}, ${esc(p.serving)}.</p>
      <p>${esc(p.claim)}${p.warn ? ` ${esc(p.warn)}` : ''}</p>
      <p>Für Preise, Warenkorb und die 360°-Ansicht bitte JavaScript aktivieren.</p>
    </div>
  </noscript>
</main>
${relink(foot)}<script src="brand.js"></script>
<script src="packs.js"></script>
<script src="shop.js"></script>
<script src="pdp.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, `${p.id}.html`), html);
  console.log('geschrieben:', `${p.id}.html`);
}
