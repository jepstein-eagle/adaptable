const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;

const sourcePackagePath = resolve(process.cwd(), './package.json');
const abBlotterPackagePath = resolve(process.cwd(), '../adaptableblotter/package.json');

const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');

const packageJSON = require(sourcePackagePath);
const abPackageJSON = require(abBlotterPackagePath);
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const toDelete = ['devDependencies', 'scripts', 'private'];
toDelete.forEach(key => delete packageJSON[key]);

packageJSON.dependencies = packageJSON.dependencies || {};

Object.assign(packageJSON.dependencies, abPackageJSON.dependencies || {});
packageJSON.version = topLevelPackageJSON.version;

// UPDATE PEER DEP to refer to the blotter with the same version
packageJSON.peerDependencies = {
  ...packageJSON.peerDependencies,
  '@adaptabletools/adaptableblotter': `>=${topLevelPackageJSON.version}`,
};

const content = JSON.stringify(packageJSON, null, 2);
const path = resolve(process.cwd(), './dist', 'package.json');
fs.writeFile(path, content, 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    console.log('DONE building package.json with version ', packageJSON.version);
  }
});

fs.writeFile(
  resolve(process.cwd(), './dist/adaptableblotter', 'package.json'),
  JSON.stringify({
    version: packageJSON.version,
  }),
  'utf8',
  err => {
    if (err) {
      console.log(chalk.red(err));
      throw err;
    } else {
      console.log('DONE building package.json with version ', chalk.green(packageJSON.version));
    }
  }
);
