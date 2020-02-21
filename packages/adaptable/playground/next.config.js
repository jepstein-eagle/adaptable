const path = require("path")

const withCSS = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")
const withImages = require("next-images")
const withFonts = require("next-fonts")
// make the app accept sources from everywhere in the monorepo
const SRC_PATH = path.resolve("../../")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
})

const withApp = (nextConfig = {}) => {
  console.log("!", nextConfig)
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.forEach(rule => {
        if (Array.isArray(rule.include)) {
          // accept files from anywhere in the monorepo
          rule.include.push(SRC_PATH)
        }
      })

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias.react = path.resolve("../node_modules/react")
      config.resolve.alias["react-dom"] = path.resolve("../node_modules/react-dom")
      config.resolve.alias["styled-components"] = path.resolve("../node_modules/styled-components")
      config.resolve.alias.redux = path.resolve("../node_modules/redux")
      config.resolve.alias["react-redux"] = path.resolve("../node_modules/react-redux")

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

// const withApp = (nextConfig = {}) => {
//   console.log(nextConfig);
//   return Object.assign({}, nextConfig, {
//     webpack(config, options) {
//       const { dir, defaultLoaders, dev, isServer } = options;

//       config.module.rules.forEach(rule => {
//         if (Array.isArray(rule.include)) {
//           // accept files from anywhere in the monorepo
//           rule.include.push(SRC_PATH);
//         }
//       });
//     },
//   });
// };

module.exports = withApp(
  withSass(
    withCSS(
      Object.assign(
        {},
        withMDX({
          pageExtensions: ["js", "jsx", "md", "mdx", "tsx", "ts"]
        }),
        {
          cssModules: false
        }
      )
    )
  )
)
// const withTypescript = (nextConfig = {}) => {
//   if (!nextConfig.pageExtensions) {
//     nextConfig.pageExtensions = ['jsx', 'js', 'ts', 'tsx', 'mdx'];
//   }

//   if (nextConfig.pageExtensions.indexOf('ts') === -1) {
//     nextConfig.pageExtensions.unshift('ts');
//   }

//   if (nextConfig.pageExtensions.indexOf('tsx') === -1) {
//     nextConfig.pageExtensions.unshift('tsx');
//   }

//   return Object.assign({}, nextConfig, {
//     webpack(config, options) {
//       const { dir, defaultLoaders, dev, isServer } = options;

//       config.resolve.extensions.push('.ts', '.tsx', '.mdx');

//       config.module.rules.push({
//         test: /\.(ts|tsx)$/,
//         include: [dir],
//         exclude: /node_modules/,
//         use: defaultLoaders.babel,
//       });
//       config.module.rules.push({
//         test: /\.mdx?$/,
//         use: ['babel-loader', '@mdx-js/loader'],
//       });

//       config.module.rules.forEach(rule => {
//         if (Array.isArray(rule.include)) {
//           // accept files from anywhere in the monorepo
//           rule.include.push(SRC_PATH);
//         }
//       });

//       if (defaultLoaders.babel.options) {
//         if (
//           !defaultLoaders.babel.options.presets ||
//           defaultLoaders.babel.options.presets.indexOf(TS_PRESET) === -1
//         ) {
//           defaultLoaders.babel.options.presets = defaultLoaders.babel.options.presets || [];

//           // enforce the TS preset
//           defaultLoaders.babel.options.presets.push(TS_PRESET);
//         }
//       }

//       config.plugins = config.plugins || [];

//       config.plugins = [
//         ...config.plugins,

//         // Read the .env file
//         new Dotenv({
//           path: path.join(__dirname, '../../../', '.env'),
//           systemvars: false,
//         }),
//       ];

//       // needed in order to avoid 2 copies of react being included, which makes hooks not work
//       config.resolve = config.resolve || {};
//       config.resolve.alias = config.resolve.alias || {};
//       config.resolve.alias.react = path.resolve('../node_modules/react');
//       config.resolve.alias['react-dom'] = path.resolve('../node_modules/react-dom');
//       config.resolve.alias['styled-components'] = path.resolve('../node_modules/styled-components');
//       config.resolve.alias.redux = path.resolve('../node_modules/redux');
//       config.resolve.alias['react-redux'] = path.resolve('../node_modules/react-redux');
//       config.resolve.alias['@ag-grid-community/all-modules'] = path.resolve(
//         '../node_modules/@ag-grid-community/all-modules'
//       );
//       config.resolve.alias['@ag-grid-community/core'] = path.resolve(
//         '../node_modules/@ag-grid-community/core'
//       );

//       if (typeof nextConfig.webpack === 'function') {
//         return nextConfig.webpack(config, options);
//       }

//       return config;
//     },
//   });
// };

// // next.config.js

// let nextConfig = withSass(
//   withCSS(
//     Object.assign({}, withImages(), {
//       cssModules: false,
//     })
//   )
// );
// nextConfig = withTypescript(withFonts(nextConfig));

// module.exports = Object.assign({}, nextConfig, {
//   pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
// });
