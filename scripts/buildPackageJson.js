const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;
const sourcePackagePath = resolve(process.cwd(), './package.json');
const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');

const packageJSON = require(sourcePackagePath);
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const toDelete = ['devDependencies', 'scripts', 'private'];
toDelete.forEach(key => delete packageJSON[key]);

packageJSON.version = topLevelPackageJSON.version;
const content = JSON.stringify(packageJSON, null, 2);

const path = resolve(process.cwd(), 'dist', 'package.json');
fs.writeFile(path, content, 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    const versionFilePath = resolve(process.cwd(), 'dist', 'version.js');
    let versionContent = fs.readFileSync(versionFilePath, { encoding: 'utf8' });

    if (versionContent.indexOf('x.y.z') === -1) {
      throw 'Cannot find version to replace';
    }
    versionContent = versionContent.replace('x.y.z', packageJSON.version);

    fs.writeFileSync(versionFilePath, versionContent, 'utf8');

    console.log('DONE building package.json with version ', chalk.green(packageJSON.version));
  }
});
