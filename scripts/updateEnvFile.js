const fs = require('fs');

const resolve = require('path').resolve;

const envFilePath = resolve(__dirname, '../packages/adaptableblotter/App_Scripts/env.ts'); //'packages', 'adaptableblotter', 'dist', 'env.js');

try {
  if (!fs.existsSync(envFilePath)) {
    throw `env file not found at ${envFilePath}`;
  }
} catch (err) {
  throw err;
}

let regexp = /process\.env\.(\w*)/g;

function simpleFileReplace(filePath) {
  let fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });

  let matchAll = fileContents.matchAll(regexp);

  const variables = [...matchAll].map(match => match[1]);
  const THE_ENV = {};

  variables.forEach(name => {
    THE_ENV[name] = 'a';
    if (!THE_ENV[name]) {
      throw `Cannot find env variable ${name}`;
    }
    const value = THE_ENV[name];

    fileContents = fileContents.replace(`process.env.${name}`, `"${value}"`);
  });

  fs.writeFileSync(filePath, fileContents, 'utf8');
}

simpleFileReplace(envFilePath);
