const fs = require('fs');

const resolve = require('path').resolve;

const topLevelPackageJSONPath = resolve(__dirname, '../package.json');
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const version = topLevelPackageJSON.version;

const versionFilePath = resolve(__dirname, '../packages/adaptableblotter/version.ts');
let versionContent = fs.readFileSync(versionFilePath, { encoding: 'utf8' });

if (versionContent.indexOf('xxx.yyy.zzz') === -1) {
  throw 'Cannot find version to replace - ' + versionContent;
}
versionContent = versionContent.replace('xxx.yyy.zzz', version);

fs.writeFileSync(versionFilePath, versionContent, 'utf8');
