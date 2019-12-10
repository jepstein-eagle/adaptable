#!/usr/bin/env node

const { spawnSync } = require('child_process');

if (process.env.PUBLISH_PACKAGE_CMD) {
  console.log('starting publishing with ' + process.env.PUBLISH_PACKAGE_CMD);
  const { stdio } = spawnSync(process.env.PUBLISH_PACKAGE_CMD, {
    stdio: 'inherit',
    env: { ...process.env },
  });

  console.log(stdio);
} else {
  console.log('Nothing to publish');
}
