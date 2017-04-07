var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PACKAGE = require('./package.json');

module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Vendors/Kendo/AdaptableBlotter.ts"],
        // 'adaptableblotterdx': ["./App_Scripts/Vendors/DevExpress/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Vendors//Hypergrid/AdaptableBlotter.ts"],
        harness: "./harness/DataGenerator.ts"
    },
    output: {
        path: __dirname + '/dist/adaptableblotter',
        filename: "[name]-bundle." + PACKAGE.version + ".min.js",
        publicPath: "/beta/adaptableblotter/",
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
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            chunks: ['harness', 'adaptableblotterhypergrid'],
            filename: "../hypergriddemo.html",
            template: 'Harness/DemoRelease/hypergriddemo.ejs',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            chunks: ['harness', 'adaptableblotterkendo'],
            filename: "../kendodemo.html",
            template: 'Harness/DemoRelease/kendodemo.ejs',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            chunks: [],
            filename: "../index.html",
            template: 'Harness/DemoRelease/index.ejs',
            inject: false,
            'version': PACKAGE.version,
            'versiondate': (new Date()).toLocaleDateString("en-GB")
        }),
        //this makes sure we package it in the dist folder and make it available for the webpack dev server
        new CopyWebpackPlugin([{ from: 'themes/**/*', to: '' }]),
        new CopyWebpackPlugin([{ from: 'stylesheets/adaptableblotter-style.css', to: '' }]),
        new CopyWebpackPlugin([{ from: 'UserGuide/Adaptable_Blotter_User_Guide.pdf', to: '../' }]),
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