#!/usr/bin/env node

const { execSync } = require('child_process');

if (!process.env.GITHUB_ACTION) {
  //we're on local

  if (execSync('git status --porcelain') != '') {
    console.log('cannot proceed as the git repo is not clean...');
    process.exitCode = 1;
  }
}
