#!/usr/bin/env node

const { spawn } = require('child_process');

const exec = (cmd, args = []) =>
  new Promise((resolve, reject) => {
    console.log(`Started: ${cmd} ${args.join(' ')}`);

    const app = spawn(cmd, args, { stdio: 'inherit' });
    app.on('close', resolve);
    app.on('error', reject);
  });

const main = async () => {
  await exec(process.env.PUBLISH_PACKAGE_CMD);
};

if (process.env.PUBLISH_PACKAGE_CMD) {
  console.log('starting publishing with ' + process.env.PUBLISH_PACKAGE_CMD);

  main().catch(err => {
    console.error(err);
    console.error(err.stack);
    process.exit(-1);
  });
} else {
  console.log('Nothing to publish');
}
