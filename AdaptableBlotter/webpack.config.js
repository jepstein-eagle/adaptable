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

var webpack = require('webpack');
var failPlugin = require('webpack-fail-plugin');

module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Kendo/AdaptableBlotter.ts"],
        'adaptableblotterdx': ["./App_Scripts/DevExpress/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Hypergrid/AdaptableBlotter.ts"],
        //adaptableblotterkendo : ["./App_Scripts/Kendo/AdaptableBlotter.ts"],
        harness: "./harness/DataGenerator.ts"
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name]-bundle.js",
        publicPath: "/adaptableblotter/",
        library: "[name]",
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    // Turn on sourcemaps
    devtool: 'source-map',

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        failPlugin
            //jo will be added later
    // Add minification
    //  new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // note that babel-loader is configured to run after ts-loader
            { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
        ]
    }
}