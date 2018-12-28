var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var conditionalEntry = {
    'adaptableblotterhypergrid': ["./App_Scripts/Hypergrid/AdaptableBlotter.ts"],
    'adaptableblotteraggrid': ["./App_Scripts/agGrid/AdaptableBlotter.ts"],
    harness: "./Harness/DataGenerator.ts",
  //  'AdaptableBlotterReact': ["./App_Scripts/View/AdaptableBlotterReact.tsx"],
};
  if (process.env.arg == "hypergrid") {
    conditionalEntry = {
        'adaptableblotterhypergrid': ["./App_Scripts/Hypergrid/AdaptableBlotter.ts"],
        harness: "./Harness/DataGenerator.ts"
    };
}
else if (process.env.arg == "aggrid") {
    conditionalEntry = {
        'adaptableblotteraggrid': ["./App_Scripts/agGrid/AdaptableBlotter.ts"],
        harness: "./Harness/DataGenerator.ts"
    };
}
else if (process.env.arg == "aggrid-react") { 
  conditionalEntry = {
      'adaptableblotteraggrid': ["./agGrid/AdaptableBlotter.ts"],
      harness: ["./Harness/DataGenerator.ts", "./Harness/agGridReact/app.tsx"]
  };
}
else if (process.env.arg == "react") {
  conditionalEntry = {
      'adaptableblotteraggrid': ["./agGrid/AdaptableBlotter.ts"],
      harness: ["./Harness/DataGenerator.ts", "./Harness/React/app.tsx"]
  };
}

module.exports = {
    entry: conditionalEntry,
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
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./ExtLibs/ABVendorsDist/abvendors-manifest.json')
          }),
        //this makes sure we package it in the dist folder and make it available for the webpack dev server
        // new CopyWebpackPlugin([{ context: 'themes', from: '**/*', to: 'adaptable-blotter-themes' }]),
        // new CopyWebpackPlugin([{ from: 'stylesheets/adaptableblotter-style.css', to: '' }]),
        new CopyWebpackPlugin([{ from: 'ExtLibs/**/*', to: '' }]),
        new CopyWebpackPlugin([{ from: 'App_Scripts/Styles', to: 'App_Scripts/Styles' }]),

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
            },
            '/adaptableblotter-teamsharing': {
                target: 'http://127.0.0.1:3000',
                secure: false
            }
        }
    }
};