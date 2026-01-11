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
    
    const container = await page.locator('#contact .container').first().boundingBox();
    const centerX = container.x + container.width / 2;
    const viewportCenter = vp.width / 2;
    const offset = Math.abs(centerX - viewportCenter);
    
    console.log(`${vp.name} (${vp.width}px): container center=${centerX.toFixed(0)}, viewport center=${viewportCenter}, offset=${offset.toFixed(0)}px`);
    await page.close();
  }

  await browser.close();
})();
