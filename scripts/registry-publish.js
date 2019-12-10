#!/usr/bin/env node

const { spawnSync } = require('child_process');

if (process.env.PUBLISH_PACKAGE_CMD) {
  console.log('starting publishing with ' + process.env.PUBLISH_PACKAGE_CMD);
  const { stdout } = spawnSync(process.env.PUBLISH_PACKAGE_CMD, {
    stdio: 'inherit',
    env: { ...process.env },
  });

  console.log(stdout);
} else {
  console.log('Nothing to publish');
}
