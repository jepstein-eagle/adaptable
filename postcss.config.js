const path = require('path');
const atImport = require('postcss-import');

module.exports = {
  plugins: [
    atImport({
      path: [path.join(__dirname, './packages/adaptable/node_modules')],
    }),
  ],
};
