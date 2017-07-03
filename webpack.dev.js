var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Vendors/Kendo/AdaptableBlotter.ts"],
        'adaptableblotterdx': ["./App_Scripts/Vendors/DevExpress/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Vendors/Hypergrid/AdaptableBlotter.ts"],
        'adaptableblottergrid': ["./App_Scripts/Vendors/AdaptableGrid/AdaptableBlotter.ts"],
        'adaptableblotteraggrid': ["./App_Scripts/Vendors/agGrid/AdaptableBlotter.ts"],
        harness: "./Harness/DataGenerator.ts"
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name]-bundle.js",
        publicPath: "/",
        library: "[name]",
        libraryTarget: 'umd'
    },
    // Turn on sourcemaps
    devtool: 'source-map',

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        failPlugin,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        //this makes sure we package it in the dist folder and make it available for the webpack dev server
        // new CopyWebpackPlugin([{ context: 'themes', from: '**/*', to: 'adaptable-blotter-themes' }]),
        // new CopyWebpackPlugin([{ from: 'stylesheets/adaptableblotter-style.css', to: '' }]),
        new CopyWebpackPlugin([{ from: 'ExtLibs/**/*', to: '' }])
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // note that babel-loader is configured to run after ts-loader
            {
                test: /\.ts(x?)$/, loader: 'babel-loader?presets[]=es2015-loose!ts-loader'
            },
            // handle main stylesheets required 
            { test: /\.css$/,  exclude: /themes/, loader: 'style-loader!css-loader' },
                        // handle main stylesheets required 
            { test: /\.css$/,  exclude: /stylesheets/, loader: 'css-to-string-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
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