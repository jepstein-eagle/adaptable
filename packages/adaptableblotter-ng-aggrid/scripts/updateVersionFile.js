const fs = require('fs');

const resolve = require('path').resolve;

const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const version = topLevelPackageJSON.version;

const versionFilePath = resolve(
  process.cwd(),
  './dist/adaptableblotter-angular-aggrid/adaptableblotter',
  'version.d.ts'
);
let versionContent = fs.readFileSync(versionFilePath, { encoding: 'utf8' });

if (versionContent.indexOf('x.y.z') === -1) {
  throw `Cannot find version to replace - ${versionContent}`;
}
versionContent = versionContent.replace('x.y.z', version);

fs.writeFileSync(versionFilePath, versionContent, 'utf8');

const versionFilePath2 = resolve(
  process.cwd(),
  './dist/adaptableblotter-angular-aggrid/esm5/adaptableblotter',
  'version.js'
);
let versionContent2 = fs.readFileSync(versionFilePath2, { encoding: 'utf8' });

if (versionContent2.indexOf('x.y.z') === -1) {
  throw `Cannot find version to replace - ${versionContent2}`;
}
versionContent2 = versionContent2.replace('x.y.z', version);

fs.writeFileSync(versionFilePath2, versionContent2, 'utf8');
