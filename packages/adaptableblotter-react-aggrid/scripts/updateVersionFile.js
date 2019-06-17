const fs = require('fs');

const resolve = require('path').resolve;

const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const version = topLevelPackageJSON.version;

const versionFilePath = resolve(process.cwd(), './dist/adaptableblotter', 'version.js');
let versionContent = fs.readFileSync(versionFilePath, { encoding: 'utf8' });

if (versionContent.indexOf('x.y.z') === -1) {
  throw `Cannot find version to replace - ${versionContent}`;
}
versionContent = versionContent.replace('x.y.z', version);

fs.writeFileSync(versionFilePath, versionContent, 'utf8');
