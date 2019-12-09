#!/usr/bin/env node

const { spawnSync } = require('child_process');

if (process.env.PUBLISH_PACKAGE_CMD) {
  spawnSync(process.env.PUBLISH_PACKAGE_CMD, {
    stdio: 'inherit',
    env: { ...process.env },
  });
}
