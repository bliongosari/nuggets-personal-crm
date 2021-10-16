const { test, expect, chromium } = require('@playwright/test');

// test.beforeAll(async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/');
//   await page.click('text=Sign In');
//   await page.fill('input[name="email"]', 'a@gmail.com');
//   await page.fill('input[name="password"]', 'a');
//   await page.click('input[name="submit-login"]');
//   await page.waitForTimeout(3000);
//   // Save signed-in state to 'storageState.json'.
//   await page.context().storageState({ path: 'storageState.json' });
//   await browser.close();
//   // await page.context().storageState({ path: 'storageState.json' });
// });

test.use({
  // headless: false
})

test('Testing home page ', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const content = await page.textContent('.current-events-title');
  expect(content).toBe('EVENTS IN THE NEXT 2 WEEKS');
  await page.screenshot({ path: './e2e/images/home_page.png' });
});

test('Testing edit profile', async ({ page }) => {
  await page.goto('http://localhost:3000/user-profile');
  // await page.click('.user-button');
  await page.click('text=Edit Profile');
  await page.screenshot({ path: './e2e/example2.png' });
  await page.fill('input[name="firstname"]', 'FIRST');
  await page.fill('input[name="lastname"]', 'LAST');
  await page.click('#editProfileBtn');
  await page.waitForTimeout(3000);
  const content = await page.textContent('.user-full-name');
  expect(content).toBe('FIRST LAST');
  await page.screenshot({ path: './e2e/images/profile_page.png' });
});

test('Testing opening, creating, editing, deleting contact', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click("#contacts");
  await page.click('#addnewBtn');
  await page.fill('input[name="fullname"]', 'my full name');
  await page.click('#addContactBtn');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './e2e/images/contact.png' });
  await page.click('text=my full name');
  await page.screenshot({ path: './e2e/images/contactDetails.png' });
  await page.click('#editBtn');
  await page.fill('input[name="fullname"]', 'my edited name');
  await page.click("#editSubmitBtn")
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './e2e/images/editedContact.png' });
  await page.click('#deleteContact');
});

test('Testing opening, creating, editing, deleting event', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click("#events");
  await page.click('#addNewEvent');
  await page.fill('input[name="title"]', 'new event name');
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  var start = now.toISOString().slice(0,16);
  var day = 60 * 60 * 24 * 1000;
  var end = new Date(now.getTime() + day);
  var end = end.toISOString().slice(0,16);
  await page.fill('input[name="start"]', start);
  await page.fill('input[name="end"]', end);
  await page.click('#addEventSubmit');
  await page.waitForTimeout(3000);
  // get the event calendar after added
  await page.screenshot({ path: './e2e/images/events.png' });
  await page.click('"Day"');
  await page.screenshot({ path: './e2e/images/events.png' });
  await page.click('text=new event name');
  await page.click('text=Delete Event');
  await page.waitForTimeout(3000);
  // get image after delete event 
  await page.screenshot({ path: './e2e/images/contactDetails.png' });
});

// test('Testing opening, creating, editing, deleting journal', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await page.click("#events");
//   await page.click('#addNewEvent');
//   await page.fill('input[name="title"]', 'new event name');
//   var now = new Date();
//   now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//   var start = now.toISOString().slice(0,16);
//   var day = 60 * 60 * 24 * 1000;
//   var end = new Date(now.getTime() + day);
//   var end = end.toISOString().slice(0,16);
//   await page.fill('input[name="start"]', start);
//   await page.fill('input[name="end"]', end);
//   await page.click('#addEventSubmit');
//   await page.waitForTimeout(3000);
//   // get the event calendar after added
//   await page.screenshot({ path: './e2e/images/events.png' });
//   await page.click('"Day"');
//   await page.screenshot({ path: './e2e/images/events.png' });
//   await page.click('text=new event name');
//   await page.click('text=Delete Event');
//   await page.waitForTimeout(3000);
//   // get image after delete event 
//   await page.screenshot({ path: './e2e/images/contactDetails.png' });
// });

