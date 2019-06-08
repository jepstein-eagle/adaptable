const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;

const sourcePackagePath = resolve(process.cwd(), './package.json');
const abBlotterPackagePath = resolve(process.cwd(), '../adaptableblotter/package.json');

const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');

const packageJSON = require(sourcePackagePath);
const abPackageJSON = require(abBlotterPackagePath);
const topLevelPackageJSON = require(topLevelPackageJSONPath);

function buildGlobalPackageJSON() {
  console.log('Preparing package');
  return new Promise((res, reject) => {
    const toDelete = ['devDependencies', 'scripts', 'private'];
    toDelete.forEach(key => delete packageJSON[key]);

    packageJSON.dependencies = packageJSON.dependencies || {};

    Object.assign(packageJSON.dependencies, abPackageJSON.dependencies || {});
    delete packageJSON.dependencies.react;
    delete packageJSON.dependencies['react-dom'];
    packageJSON.version = topLevelPackageJSON.version;

    const content = JSON.stringify(packageJSON, null, 2);
    const path = resolve(process.cwd(), './dist', 'package.json');
    fs.writeFile(path, content, 'utf8', err => {
      if (err) {
        console.log(chalk.red(err));
        reject(err);
      } else {
        console.log('DONE building package.json with version ', packageJSON.version);
        res(true);
      }
    });
  });
}

buildGlobalPackageJSON();

module.exports = buildGlobalPackageJSON;
