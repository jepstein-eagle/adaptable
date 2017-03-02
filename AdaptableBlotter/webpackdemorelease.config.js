var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Kendo/AdaptableBlotter.ts"],
        // 'adaptableblotterdx': ["./App_Scripts/DevExpress/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Hypergrid/AdaptableBlotter.ts"],
        harness: "./harness/DataGenerator.ts"
    },
    output: {
        path: __dirname + '/dist/adaptableblotter',
        filename: "[name]-bundle.min.js",
        publicPath: "/adaptableblotter/",
        library: "[name]",
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        failPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //this makes sure we package it in the dist folder and make it available for the webpack dev server
        new CopyWebpackPlugin([{ from: 'themes/**/*', to: '' }]),
        new CopyWebpackPlugin([{ from: 'stylesheets/adaptableblotter-style.css', to: '' }]),
        new CopyWebpackPlugin([{ from: 'Harness/DemoRelease/*', to: '../', flatten: true }])
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // note that babel-loader is configured to run after ts-loader
            {
                test: /\.ts(x?)$/, loader: 'babel-loader?presets[]=es2015!ts-loader'
            }
        ]
    }
}