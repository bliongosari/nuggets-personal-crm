// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    globalSetup: require.resolve('./global'),
    use: {
      // Tell all tests to load signed-in state from 'storageState.json'.
      storageState: './e2e/storageState.json'
    }
  };
  module.exports = config;