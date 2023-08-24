# Example for cypress-discord-webhook-integration

Example uses [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)

- [Example for cypress-discord-webhook-integration](#example-for-cypress-discord-webhook-integration)
  - [Prepare your Discord Server for using package](#prepare-your-discord-server-for-using-package)
  - [Installation and running](#installation-and-running)
  - [Video example](#video-example)
  - [How to run new feature for converting HTML files to PNG files](#how-to-run-new-feature-for-converting-html-files-to-png-files)
    - [Send 1 message with 1 PNG file which contains results](#send-1-message-with-1-png-file-which-contains-results)
    - [Send 1 message for each spec file with 1 PNG file](#send-1-message-for-each-spec-file-with-1-png-file)
    - [Send 1 message for each 10 spec files (1 message contains results for 10 or less specs)](#send-1-message-for-each-10-spec-files-1-message-contains-results-for-10-or-less-specs)


## Prepare your Discord Server for using package

1. Open Server Settings in Discord Server

![Server Settings button](img/Screenshot_1.png)

2. Open Integrations tab and click on the Create Webhook button

![Integrations tab](img/Screenshot_2.png)

3. Click on your Webhook > Webhook is expanded

![Webhook](img/Screenshot_3.png)

4. Setup your Webhook and click on the Copy Webhook URL button (this URL will be used for `.env` file)

![Webhook URL is copied](img/Screenshot_4.png)

## Installation and running

1. Clone this project:

- `https://github.com/Smoliarick/cypress-discord-webhook-integration-example.git` for HTTPS
- `git@github.com:Smoliarick/cypress-discord-webhook-integration-example.git` for SSH

2. Run `npm install` command
3. Create `.env` file with configs for Test Rail. You can use [this example](.env.example):

```
WEBHOOK_URL=your_webhook_from_discord
```

4. Run autotests: `npx cypress run`
5. Check that report is sent to your Discord channel which you selected in Discord Webhook

![Result](img/Screenshot_5.png)

## Video example

https://user-images.githubusercontent.com/104084410/222214637-f130fda1-fcf3-4dab-83f7-a53a087fbbf5.mp4

## How to run new feature for converting HTML files to PNG files
### Send 1 message with 1 PNG file which contains results

```js
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
```

Video example:



https://github.com/Smoliarick/cypress-discord-webhook-integration-example/assets/104084410/9cdc3233-df71-47de-bf2c-c667e26b3d2b



### Send 1 message for each spec file with 1 PNG file 

```js
on('after:spec', async (results) => {
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
```

Video example:



https://github.com/Smoliarick/cypress-discord-webhook-integration-example/assets/104084410/9fdf8301-211d-4ed8-bead-bfaa42d4f54e




### Send 1 message for each 10 spec files (1 message contains results for 10 or less specs)

```js
// Add the next line at the beginning of the file
const { sendToDiscordWebhookForEachSpec, afterSpecFunction } = require('cypress-discord-webhook-integration'); // import lib

// Add the next lines into the setupNodeEvents function
on('after:spec', async (results) => {
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
});
```

Video example:



https://github.com/Smoliarick/cypress-discord-webhook-integration-example/assets/104084410/c68d8799-7723-4354-91b2-2b289009754d

