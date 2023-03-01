# Example for cypress-discord-webhook-integration

Example uses [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)

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