const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
// const { sendToDiscordWebhookForEachSpec, afterSpecFunction } = require('cypress-discord-webhook-integration'); // import lib

require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      // If you want to see 1 message for 1 full run
      on('after:run', async (results) => {
        await afterRunHook();

        // --------------------required part------------------------------
        const { sendToDiscordWebhook } = require('cypress-discord-webhook-integration'); // import lib
        const webhookURL = process.env.WEBHOOK_URL; // REQUIRED: Webhook URL for Discord
        const files = ['./cypress/reports/html/index.html']; // REQUIRED: File paths
        // --------------------required part------------------------------

        // --------------------custom data------------------------------
        const customUsername = 'Custom Username for Bot'; // Custom name for Bot's username in Discord
        const customMessage = 'Custom message for Bot'; // Custom message for Bot's message in Discord
        const customAvatar = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'; // Custom avatar URL for Bot in Discord
        // --------------------custom data------------------------------

        // --------------------required part------------------------------
        // Using function
        await sendToDiscordWebhook(
          webhookURL,     // required variable
          files,          // required variable
          customMessage,  // set to undefined if you don't use custom message, but use custom avatar, custom username or convertHtmlToPng functionality
          customUsername, // set to undefined if you don't use custom username, but use custom avatar or convertHtmlToPng functionality
          customAvatar,   // set to undefined if you don't use custom message, but use convertHtmlToPng functionality
          true,           // if you want to convert HTML files to PNG set it as true, or remove it if you don't want to use this functionality
        );
        // --------------------required part------------------------------
      });

      // Send 1 message for each spec file with 1 PNG file 
      /* on('after:spec', async (results) => {
        await afterRunHook();

        // --------------------required part------------------------------
        const { sendToDiscordWebhook } = require('cypress-discord-webhook-integration'); // import lib
        const webhookURL = process.env.WEBHOOK_URL; // REQUIRED: Webhook URL for Discord
        const files = ['./cypress/reports/html/index.html']; // REQUIRED: File paths
        // --------------------required part------------------------------

        // --------------------custom data------------------------------
        const customUsername = 'Custom Username for Bot'; // Custom name for Bot's username in Discord
        const customMessage = 'Custom message for Bot'; // Custom message for Bot's message in Discord
        const customAvatar = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'; // Custom avatar URL for Bot in Discord
        // --------------------custom data------------------------------

        // --------------------required part------------------------------
        // Using function
        await sendToDiscordWebhook(
          webhookURL,     // required variable
          files,          // required variable
          customMessage,  // set to undefined if you don't use custom message, but use custom avatar, custom username or convertHtmlToPng functionality
          customUsername, // set to undefined if you don't use custom username, but use custom avatar or convertHtmlToPng functionality
          customAvatar,   // set to undefined if you don't use custom message, but use convertHtmlToPng functionality
          true,           // if you want to convert HTML files to PNG set it as true, or remove it if you don't want to use this functionality
        );
        // --------------------required part------------------------------
      }); */

      // If you want to see 1 message in Discord per 10 reports use next settings
      /* on('after:spec', async (results) => {
        await afterRunHook();

        await afterSpecFunction('./cypress/reports/html/index.html');
      });

      on('after:run', async (results) => {
        // --------------------required part------------------------------
        const webhookURL = process.env.WEBHOOK_URL; // REQUIRED: Webhook URL for Discord
        // --------------------required part------------------------------

        // --------------------custom data------------------------------
        const customUsername = 'Custom Username for Bot'; // Custom name for Bot's username in Discord
        const customMessage = 'Custom message for Bot'; // Custom message for Bot's message in Discord
        const customAvatar = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'; // Custom avatar URL for Bot in Discord
        // --------------------custom data------------------------------

        // --------------------required part------------------------------
        // Using function
        await sendToDiscordWebhookForEachSpec(
          webhookURL,     // required variable
          customMessage,  // set to undefined if you don't use custom message, but use custom avatar, custom username functionality
          customUsername, // set to undefined if you don't use custom username, but use custom avatar functionality
          customAvatar,   // set to undefined if you don't use custom message
        );
        // --------------------required part------------------------------
      }); */

      return config;
    },
    specPattern: 'cypress/e2e/**/*.spec.{js, jsx, ts, tsx}',
  },
});
