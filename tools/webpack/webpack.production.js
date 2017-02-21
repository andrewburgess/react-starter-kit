const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base')({
    devtool: false,

    entry: {
        main: [path.join(process.cwd(), 'app/index.js')]
    },

    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: '/',
        path: path.join(process.cwd(), 'build/app/assets')
    },

    babelQuery: {
        babelrc: false,
        cacheDirectory: true,
        plugins: [
            ['styled-components', { 'ssr': true }]
        ],
        presets: [['latest', { 'es2015': { 'modules': false } }], 'react', 'stage-0', 'react-optimize']
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.join(process.cwd(), 'build/app')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                screw_ie8: true
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
