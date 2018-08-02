var webpack = require('webpack');
var failPlugin = require('webpack-fail-plugin');
var Promise = require('es6-promise').Promise;
var path = require('path');


module.exports = {
    entry: {
        'adaptableblotterkendo': ["./App_Scripts/Vendors/Kendo/AdaptableBlotter.ts"],
        'adaptableblotterhypergrid': ["./App_Scripts/Vendors/Hypergrid/AdaptableBlotter.ts"],
        'adaptableblotteraggrid': ["./App_Scripts/Vendors/agGrid/AdaptableBlotter.ts"],
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name]-bundle.min.js",
        library: "[name]",
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    externals: {
        "ag-grid": "ag-grid",
        "ag-grid/main": "ag-grid",
        "ag-grid/dist/lib/entities/colDef": "ag-grid",
        "ag-grid/dist/lib/entities/gridOptions": "ag-grid",
        "ag-grid/dist/lib/gridApi": "ag-grid",
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
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise', // works as expected 
        }),
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // note that babel-loader is configured to run after ts-loader
            {
                test: /\.ts(x?)$/, loader: 'babel-loader?presets[]=es2015&plugins[]=transform-runtime!ts-loader',
            },
            // JW: added this section on 2/8/18 to mimic what we do in webpack.vendor.js. but not sure if that is right.
            {
                test: /\.js(x?)$/, loader: 'babel-loader?presets[]=es2015&plugins[]=transform-runtime',
                include: [
                    path.resolve(__dirname, "node_modules/igniteui-react-core"),
                    path.resolve(__dirname, "node_modules/igniteui-react-charts")
                ],
            },
            // handle main stylesheets required 
            { test: /\.css$/, exclude: /themes/, loader: 'style-loader!css-loader' },
            // handle main stylesheets required 
            { test: /\.css$/, exclude: /stylesheets/, loader: 'css-to-string-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
};
