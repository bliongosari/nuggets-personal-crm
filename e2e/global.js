const { chromium } = require('@playwright/test');

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.click('text=Sign In');
  await page.fill('input[name="email"]', 'a@gmail.com');
  await page.fill('input[name="password"]', 'a');
  await page.click('input[name="submit-login"]');
  await page.waitForTimeout(3000);
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: './e2e/storageState.json' });

  await browser.close();

};