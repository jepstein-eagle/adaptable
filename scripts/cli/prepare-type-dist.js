#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs');
const argv = require('yargs').options('module', {
  type: 'string',
}).argv;

const path = require('path');

const abmodule = argv.module;

if (!abmodule) {
  throw 'Need to specify a module';
}

const modulePath = path.resolve(__dirname, '../../', abmodule);

const packagePath = path.resolve(modulePath, 'type-dist', 'package.json');

const package = require(packagePath);

delete package.publishConfig;
package.files = ['*.d.ts'];
package.name += '-types';

fs.writeFile(packagePath, JSON.stringify(package, null, 2), 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    console.log(
      'DONE building package.json for',
      chalk.green('TYPES'),
      'with version ',
      chalk.green(package.version)
    );
  }
});
