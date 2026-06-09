import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR] ${err.toString()}`);
  });

  console.log('Navigating to http://localhost:8080/...');
  try {
    await page.goto('http://localhost:8080/');
    await page.waitForTimeout(3000);

    const metrics = await page.evaluate(() => {
      return {
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        bodyOverflow: window.getComputedStyle(document.body).overflow,
        htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
      };
    });

    console.log('Page Metrics:', JSON.stringify(metrics, null, 2));

  } catch (error) {
    console.error('Metrics error:', error);
  }

  console.log('Shutting down...');
  await browser.close();
})();
