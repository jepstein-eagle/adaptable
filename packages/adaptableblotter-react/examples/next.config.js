// const path = require('path');
const withTypescript = require('@zeit/next-typescript');

// const SRC_PATH = path.resolve('../../../src');

// console.log(SRC_PATH);
module.exports = withTypescript()
// {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     config.module.rules.forEach(rule => {
//       if (Array.isArray(rule.include)) {
//         rule.include.push(SRC_PATH);
//       }
//     });

//     // needed in order to avoid 2 copies of react being included, which makes hooks not work
//     config.resolve = config.resolve || {};
//     config.resolve.alias = config.resolve.alias || {};
//     config.resolve.alias.react = path.resolve('../../../node_modules/react');
//     config.resolve.alias['react-dom'] = path.resolve(
//       '../../../node_modules/react-dom'
//     );
//     return config;
//   },
// });
