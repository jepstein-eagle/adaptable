const resolve = require('path').resolve;
const writeFile = require('fs').writeFile;

const update = currentModulePackagePath => {
  const topLevelPackagePath = resolve(__dirname, '../package.json');
  const corePackagePath = resolve(__dirname, '../packages/adaptable/package.json');

  const topLevelJSON = require(topLevelPackagePath);

  const coreJSON = require(corePackagePath);

  const currentModuleFolder = resolve(__dirname, '../', currentModulePackagePath);

  const currentModuleJSON = require(resolve(currentModuleFolder, './package.json'));

  const toDelete = ['devDependencies', 'scripts', 'private'];
  toDelete.forEach(key => delete currentModuleJSON[key]);

  currentModuleJSON.dependencies = currentModuleJSON.dependencies || {};

  // set correct version
  currentModuleJSON.version = topLevelJSON.version;

  // UPDATE DEP to refer to adaptable core with the same version
  currentModuleJSON.dependencies = {
    ...currentModuleJSON.dependencies,
    '@adaptabletools/adaptable': `${topLevelJSON.version}`,
  };

  const content = JSON.stringify(currentModuleJSON, null, 2);

  const currentModuleDistPackagePath = resolve(currentModuleFolder, './dist', 'package.json');

  writeFile(currentModuleDistPackagePath, content, 'utf8', err => {
    if (err) {
      console.log(chalk.red(err));
      throw err;
    } else {
      console.log('DONE building package.json with version ', currentModuleJSON.version);
    }
  });
};

module.exports = {
  update,
};
