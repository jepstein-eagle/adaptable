const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;
const sourcePackagePath = resolve(process.cwd(), './package.json');

const packageJSON = require(sourcePackagePath);

function buildGlobalPackageJSON() {
  return new Promise((res, reject) => {
    const toDelete = ['devDependencies', 'scripts', 'private'];
    toDelete.forEach(key => delete packageJSON[key]);
    const content = JSON.stringify(packageJSON, null, 2);
    const path = resolve(process.cwd(), 'dist', 'package.json');
    fs.writeFile(path, content, 'utf8', err => {
      if (err) {
        console.log(chalk.red(err));
        reject(err);
      } else {
        console.log('DONE building package.json with version ', chalk.green(packageJSON.version));
        res(true);
      }
    });
  });
}

buildGlobalPackageJSON();

module.exports = buildGlobalPackageJSON;
