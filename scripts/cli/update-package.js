#!/usr/bin/env node
const argv = require('yargs').argv;

const update = require('../updatePackageJson').update;

const abmodule = argv.module;

if (!abmodule) {
  throw 'Need to specify a module';
}

update(abmodule);
