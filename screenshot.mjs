import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:4321/v2');
  await page.waitForTimeout(2000); // wait for load
  
  const element = await page.locator('nav').first();
  await element.screenshot({ path: 'navbar_screenshot.png' });
  await page.screenshot({ path: 'navbar_full_top.png' });
  await browser.close();
})();
