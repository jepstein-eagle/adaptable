import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import url from 'postcss-url'
import builtins from 'rollup-plugin-node-builtins'

const pkg = require('./package.json')

// const libraryName = 'adaptableblotter-react'

export default {
  external: ['react', 'react-dom'],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'index',
      format: 'umd',
      sourcemap: false
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: false
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    copy({
      'node_modules/adaptableblotter/dist/App_Scripts/Styles/stylesheets/adaptableblotter-style.css':
        'dist/styles/adaptableblotter-style.css',
      'node_modules/adaptableblotter/dist/App_Scripts/Styles/fonts': 'dist/fonts',
      verbose: true
    }),
    // Node built-in fns support
    builtins(),
    postcss({
      extensions: ['.css'],
      plugins: [url({ url: 'inline' })],
      inject: false
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      abortOnError: false,
      check: false
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        '../adaptableblotter/node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
          'cloneElement'
        ],
        '../adaptableblotter/node_modules/react-dom/index.js': ['render']
      },
      sourceMap: false
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({
      jsnext: true,
      main: true,
      browser: true
    })

    // Resolve source maps to the original source
    // sourceMaps(),
  ]
}
