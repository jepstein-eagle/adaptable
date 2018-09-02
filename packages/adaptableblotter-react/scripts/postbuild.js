const fs = require('fs');
const pkg = require('../package.json');

const matchReplaceMap = [{
  match: /__metadata\([\s\S\n]*?\),?\n?/ig,
  replace: '',
}, {
  match: /\/\/ The full default export is required to be BC with redux\-storage([\s\S\n]*?)\);/,
  replace: '',
}, {
  match: /default: index\$9,/,
  replace: '',
}, {
  match: /var ReduxStorage.*?;/,
  replace: 'var ReduxStorage = buildEs;',
}];

[pkg.main, pkg.module].forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = matchReplaceMap.reduce((content, {match, replace}) => content.replace(match, replace), content);
  fs.writeFileSync(filePath, content);
})