var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'abvendors':
            [
                'create-react-class',
                'deep-diff',
                'fin-hypergrid-data-source-base',
                'igniteui-react-charts/ES2015/igr-category-chart-module',
                'igniteui-react-charts/ES2015/igr-category-chart-core-module',
                'isomorphic-fetch',
                'lodash',
                'mathjs',
                'prop-types',
                'react',
                'react-bootstrap',
                'react-bootstrap-sweetalert',
                'react-bootstrap-typeahead',
                'react-data-menu',
                'react-dom',
                'react-redux',
                'redux',
                'redux-devtools-extension',
                'redux-storage',
                'redux-storage-decorator-filter',
                'redux-storage-decorator-migrate'
            ]
    },

    output: {
        filename: '[name].bundle.js',
        path: 'ExtLibs/ABVendorsDist/',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    plugins: [
        failPlugin,
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: 'ExtLibs/ABVendorsDist/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js(x?)$/, loader: 'babel-loader?presets[]=es2015&plugins[]=transform-runtime',
                include: [
                    path.resolve(__dirname, "node_modules/igniteui-react-core"),
                    path.resolve(__dirname, "node_modules/igniteui-react-charts")
                ],
            }
        ]
    }

};