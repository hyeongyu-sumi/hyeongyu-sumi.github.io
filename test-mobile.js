const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  await page.goto('http://127.0.0.1:9998/index.html');
  await page.screenshot({ path: 'mobile-test.png', fullPage: false });
  
  const body = await page.locator('body').boundingBox();
  console.log(`Mobile body width: ${body.width}px (viewport: 375px)`);
  console.log(`Screenshot saved: mobile-test.png`);
  
  await browser.close();
})();
