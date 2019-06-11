const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;

const sourcePackagePath = resolve(process.cwd(), './dist/package.json');
const targetVersionJSONPath = resolve(process.cwd(), './dist/version.json');

const packageJSON = require(sourcePackagePath);
const targetVersionJSON = require(targetVersionJSONPath);

// set the version
targetVersionJSON.version = packageJSON.version;

fs.writeFile(targetVersionJSONPath, JSON.stringify(targetVersionJSON, null, 2), 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    console.log('DONE updating version.json with version ', chalk.green(targetVersionJSON.version));
  }
});
