/* Rendert assets/products/<id>-front.png aus tools/render-products.html.
   Aufruf: node tools/render-products.js   (braucht Playwright mit Chromium)
   Danach in WebP umwandeln, z. B. mit cwebp oder Pillow. */
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  if (process.env.FONT_CACHE) {
    const dir = process.env.FONT_CACHE;
    await page.route(/fonts\.googleapis\.com\/css2/, r => r.fulfill({ path: path.join(dir, 'index.css'), contentType: 'text/css' }));
    await page.route(/fonts\.gstatic\.com/, r => r.fulfill({ path: path.join(dir, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_')), contentType: 'font/woff2' }));
  }
  await page.goto('file://' + path.join(root, 'tools/render-products.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  for (const el of await page.$$('.shot')) {
    const id = (await el.getAttribute('id')).replace('shot-', '');
    await el.screenshot({ path: path.join(root, `assets/products/${id}-front.png`), omitBackground: true });
    console.log('rendered', id);
  }
  await browser.close();
})();
