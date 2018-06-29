var webpack = require('webpack');
var failPlugin = require('webpack-fail-plugin');

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
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            // note that babel-loader is configured to run after ts-loader
            {
                test: /\.ts(x?)$/, loader: 'babel-loader?presets[]=es2015&plugins[]=transform-runtime!ts-loader'
            },
            // handle main stylesheets required 
            { test: /\.css$/, exclude: /themes/, loader: 'style-loader!css-loader' },
            // handle main stylesheets required 
            { test: /\.css$/, exclude: /stylesheets/, loader: 'css-to-string-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
};