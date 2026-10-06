/* Rendert alle .shot-Elemente einer Renderer-Seite als PNG mit transparentem Hintergrund.
   Aufruf: node tools/render.js tools/render-characters.html assets/characters
           node tools/render.js tools/render-wraps.html assets/products
   Dateiname = id des .shot-Elements. Danach in WebP umwandeln (z. B. cwebp oder Pillow).
   PLAYWRIGHT: Pfad zum Playwright-Modul, FONT_CACHE: Ordner mit lokal gespeicherten Google Fonts. */
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

(async () => {
  const [page_, out] = process.argv.slice(2);
  if (!page_ || !out) { console.error('Aufruf: node tools/render.js <seite.html> <zielordner>'); process.exit(1); }
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 2400, height: 1600 } });
  if (process.env.FONT_CACHE) {
    const dir = process.env.FONT_CACHE;
    await page.route(/fonts\.googleapis\.com\/css2/, r => r.fulfill({ path: path.join(dir, 'index.css'), contentType: 'text/css' }));
    await page.route(/fonts\.gstatic\.com/, r => r.fulfill({ path: path.join(dir, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_')), contentType: 'font/woff2' }));
  }
  await page.goto('file://' + path.resolve(root, page_));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  for (const el of await page.$$('.shot')) {
    const id = await el.getAttribute('id');
    await el.screenshot({ path: path.resolve(root, out, `${id}.png`), omitBackground: true });
    console.log('rendered', id);
  }
  await browser.close();
})();
