const fs = require('fs');

const resolve = require('path').resolve;

const envFilePath = resolve(__dirname, '../packages/adaptableblotter/App_Scripts/env.ts'); //'packages', 'adaptableblotter', 'dist', 'env.js');

var ENVS;

try {
  ENVS = require(envFilePath);
} catch (err) {
  throw err;
}

function simpleFileReplace(variables, filePath) {
  let fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });

  // const THE_ENV = process.env
  const THE_ENV = variables;

  Object.keys(variables).forEach(name => {
    if (!THE_ENV[name]) {
      throw `Cannot find env variable ${name}`;
    }
    const value = THE_ENV[name];

    fileContents = fileContents.replace(`process.env.${name}`, `"${value}"`);
  });

  fs.writeFileSync(filePath, fileContents, 'utf8');
}

simpleFileReplace(ENVS, envFilePath);
