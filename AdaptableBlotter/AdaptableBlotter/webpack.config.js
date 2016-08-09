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

module.exports = {
    entry: {
        adaptableblotter : ["./App_Scripts/MyReactComponent.tsx", "./App_Scripts/AdaptableBlotterPopup.tsx"],
        //adaptableblotterkendo : ["./App_Scripts/Kendo/AdaptableBlotter.ts"],
        harness : "./harness/DataGenerator.ts"
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name]-bundle.js",
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
    //jo will be added later
    // Add minification
    //plugins: [
    //  new webpack.optimize.UglifyJsPlugin()
    //],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}