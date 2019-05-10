var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var scopify = require('postcss-scopify');

//We package all the bootswatch themes to work for the Adaptable Blotter only or
//at least all elements that have a parent that has the class #adaptable-blotter-style
var directories = getDirectories('node_modules/bootswatch/');
for (var directory of directories) {
  //    if (fs.existsSync('node_modules/bootswatch/' + directory + '/bootstrap.min.css')) {
  //        ensureDirectoryExistence('themes/' + directory + '/bootstrap.min.css')
  //        copyFileSync('node_modules/bootswatch/' + directory + '/bootstrap.min.css', 'themes/' + directory + '/bootstrap.min.css')
  // var css = fs.readFileSync('node_modules/bootswatch/' + directory + '/bootstrap.min.css', 'utf8').toString();
  // var out = postcss()
  //     .use(scopify('.#adaptable-blotter-style'))
  //     .process(css)
  //     .css;
  // ensureDirectoryExistence('themes/' + directory + '/bootstrap.min.css')
  // fs.writeFileSync('themes/' + directory + '/bootstrap.min.css', out)
  //   }
}

//We package the default theme to work for the Adaptable Blotter only or
//at least all elements that have a parent that has the class #adaptable-blotter-style/
//ensureDirectoryExistence('themes/default/bootstrap.min.css')
//copyFileSync('node_modules/bootstrap/dist/css/bootstrap-theme.min.css', 'themes/default/bootstrap.min.css')
// var css = fs.readFileSync('node_modules/bootstrap/dist/css/bootstrap-theme.min.css', 'utf8').toString();
// var out = postcss()
//     .use(scopify('.#adaptable-blotter-style'))
//     .process(css)
//     .css;

var directories = getDirectories('node_modules/bootswatch/');
for (var directory of directories) {
  if (fs.existsSync('node_modules/bootswatch/' + directory + '/bootstrap.min.css')) {
    var css = fs
      .readFileSync('node_modules/bootswatch/' + directory + '/bootstrap.min.css', 'utf8')
      .toString();
    var out = postcss()
      .use(scopify('.#ab-style'))
      .process(css).css;

    ensureDirectoryExistence('themes/' + directory + '/bootstrap.min.css');
    fs.writeFileSync('themes/' + directory + '/bootstrap.min.css', out);
  }
}

//We package the default theme to work for the Adaptable Blotter only or
//at least all elements that have a parent that has the class #adaptable-blotter-style
var css = fs
  .readFileSync('node_modules/bootstrap/dist/css/bootstrap-theme.min.css', 'utf8')
  .toString();
var out = postcss()
  .use(scopify('.#ab-style'))
  .process(css).css;

ensureDirectoryExistence('themes/default/bootstrap.min.css');
fs.writeFileSync('themes/default/bootstrap.min.css', out);

//We build an index.ts that we will reference in the code to build the list of initial available themes
//We make them with the first letter uppercase but will do lowercase when manipulatring the URL
directories.forEach((x, index, array) => (array[index] = x.charAt(0).toUpperCase() + x.slice(1)));
fs.writeFileSync(
  'themes/index.ts',
  "export const StaticThemes: Array<string> = ['" +
    directories.filter(x => x != 'Fonts').join("','") +
    "']"
);

//We copy the fonts folder
fs.readdir('node_modules/bootswatch/fonts', function(err, files) {
  if (err) {
    return console.error(err);
  }
  files.forEach(function(file) {
    ensureDirectoryExistence('themes/fonts/' + file);
    copyFileSync('node_modules/bootswatch/fonts/' + file, 'themes/fonts/' + file);
  });
});

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
