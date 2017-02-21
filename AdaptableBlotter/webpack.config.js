var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Kendo/AdaptableBlotter.ts"],
        'adaptableblotterdx': ["./App_Scripts/DevExpress/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Hypergrid/AdaptableBlotter.ts"],
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
        failPlugin,
        //this makes sure we package it in the dist folder and make it available for the webpack dev server
        new CopyWebpackPlugin([{ from: 'themes/**/*', to: '' }]),
        new CopyWebpackPlugin([{ from: 'stylesheets/adaptableblotter-style.css', to: '' }])
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
    },
    devServer: {
        proxy: {
            '/auditlog': {
                target: 'http://127.0.0.1:6767',
                secure: false
            },
            '/adaptableblotter-config': {
                target: 'http://127.0.0.1:3000',
                secure: false
            }
        }
    }
}