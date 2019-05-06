const path = require('path')

// make the app accept sources from everywhere in the monorepo
const SRC_PATH = path.resolve('../');

const TS_PRESET = "@babel/preset-typescript"

const withTypescript = (nextConfig = {}) => {
  if (!nextConfig.pageExtensions) {
    nextConfig.pageExtensions = ['jsx', 'js']
  }

  if (nextConfig.pageExtensions.indexOf('ts') === -1) {
    nextConfig.pageExtensions.unshift('ts')
  }

  if (nextConfig.pageExtensions.indexOf('tsx') === -1) {
    nextConfig.pageExtensions.unshift('tsx')
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { dir, defaultLoaders, dev, isServer } = options

      config.resolve.extensions.push('.ts', '.tsx')

      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [dir],
        exclude: /node_modules/,
        use: defaultLoaders.babel
      })

      config.module.rules.forEach(rule => {
        if (Array.isArray(rule.include)) {

          // accept files from anywhere in the monorepo
          rule.include.push(SRC_PATH)
        }
      });

      if (defaultLoaders.babel.options) {
        if (!defaultLoaders.babel.options.presets || defaultLoaders.babel.options.presets.indexOf(TS_PRESET) === -1) {
          defaultLoaders.babel.options.presets = defaultLoaders.babel.options.presets || []

          // enforce the TS preset
          defaultLoaders.babel.options.presets.push(TS_PRESET)
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

// next.config.js
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');

let nextConfig = withCSS(
  Object.assign({}, withImages(), {
    cssModules: false
  })
);
nextConfig = withTypescript(withFonts(nextConfig));

module.exports = Object.assign({}, nextConfig, {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts']
});