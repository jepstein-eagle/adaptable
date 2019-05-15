// TODO - please keep this in sync with .babelrc
module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 2 }]
  ],
  presets: [
    "next/babel",
    "@babel/preset-typescript"
  ]
}