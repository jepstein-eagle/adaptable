//var webpack = require('webpack');
//module.exports = {
//    entry: [
//      "./App_Scripts/MyReactComponent.js"
//    ],
//    output: {
//        path: __dirname + '/dist/',
//        filename: "bundle-webpack.js"
//    },
//    module: {
//    },
//    plugins: [
//      new webpack.NoErrorsPlugin()
//    ]

//};


module.exports = {
    entry: [
      "./App_Scripts/MyReactComponent.tsx"
    ],
    output: {
        path: __dirname + '/dist/',
        filename: "bundle-webpack.js"
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}