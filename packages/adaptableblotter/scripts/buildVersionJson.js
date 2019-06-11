const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;

const sourcePackagePath = resolve(process.cwd(), './dist/package.json');
const targetVersionJSONPath = resolve(process.cwd(), './dist/version.js');

const packageJSON = require(sourcePackagePath);

// set the version
//targetVersionJSON.version = packageJSON.version;

fs.writeFile(
  targetVersionJSONPath,
  'module.exports = "' + packageJSON.version + '"',
  'utf8',
  err => {
    if (err) {
      console.log(chalk.red(err));
      throw err;
    } else {
      console.log('DONE updating version.js with version ', chalk.green(packageJSON.version));
    }
  }
);
