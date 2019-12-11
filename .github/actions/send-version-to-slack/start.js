const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

async function run() {
  try {
    const version =
      core.getInput('version') ||
      JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './package.json'), 'utf-8')).version;

    const request = require('request');

    return new Promise((resolve, reject) => {
      request.post(
        core.getInput('slack_webhook_notify'),
        {
          json: {
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `Version release *${version || 512}*`,
                },
              },
            ],

            channel: '#builds',
            username: 'Releasebot',
          },
        },
        (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            if (body === 'ok') {
              core.info('Sent slack notification to #builds channel');
              resolve('done');
            } else {
              reject(body);
            }
          }
        }
      );
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
