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
  // HACK: ugly fix for mathjs, we can't bundle it with Rollup
  // const mathjsContent = fs.readFileSync('externals/math.min.js', 'utf8');
  fs.writeFileSync(filePath, `${mathjsContent}\n${content}`);
})