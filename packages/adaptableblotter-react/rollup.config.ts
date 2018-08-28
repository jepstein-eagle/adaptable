import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
// import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import builtins from 'rollup-plugin-node-builtins'
import replace from 'rollup-plugin-replace'

const pkg = require('./package.json')

// const libraryName = 'adaptableblotter-react'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: 'index', format: 'umd', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Node built-in fns support
    builtins(),
    postcss({
      extensions: [ '.css' ],
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    replace({
      values: {
        "require('./createLoader').default": 'createLoader',
        "require('./createLoader')[default]": 'createLoader',
        "require('./createMiddleware').default": 'createMiddleware',
        "require('./createMiddleware')[default]": 'createMiddleware',
        "require('./reducer').default": 'reducer',
        "require('./reducer')[default]": 'reducer',
        "...require('./constants')": 'LOAD, SAVE',
        "require('./constants')": '{LOAD, SAVE}',
      }
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        '../adaptableblotter/node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'cloneElement'],
        '../adaptableblotter/node_modules/react-dom/index.js': ['render']
      }
    }),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
