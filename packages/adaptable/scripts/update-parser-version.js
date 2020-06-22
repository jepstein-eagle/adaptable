const resolve = require('path').resolve;
const writeFile = require('fs').writeFile;
const chalk = require('chalk');

const packagePath = resolve(__dirname, '../dist/package.json');

const packageJSON = require(packagePath);

packageJSON.dependencies['@adaptabletools/adaptable-parser'] = packageJSON.version;

writeFile(packagePath, JSON.stringify(packageJSON, null, 2), 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    console.log(
      'DONE updating adaptable-parser in package.json with version ',
      packageJSON.version
    );
  }
});
