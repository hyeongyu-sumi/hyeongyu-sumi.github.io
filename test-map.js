const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const viewports = [
    { width: 375, height: 812, name: 'iPhone' },
    { width: 768, height: 1024, name: 'iPad' },
    { width: 1920, height: 1080, name: 'Desktop' }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://127.0.0.1:9998/index.html');
    const map = await page.locator('#kakaomap').boundingBox();
    console.log(`${vp.name} (${vp.width}px): map width = ${map.width}px`);
    await page.close();
  }

  await browser.close();
})();
