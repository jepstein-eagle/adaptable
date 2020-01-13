#!/usr/bin/env node
const argv = require('yargs')
  .option('ignoreDep', {
    type: 'boolean',
    description: 'Ignore deps',
  })
  .options('distFolder', {
    type: 'string',
  })
  .options('module', {
    type: 'string',
  }).argv;

const update = require('../updatePackageJson').update;

const abmodule = argv.module;

if (!abmodule) {
  throw 'Need to specify a module';
}

update(abmodule, {
  distFolder: argv.distFolder,
  ignoreDep: argv.ignoreDep,
});
