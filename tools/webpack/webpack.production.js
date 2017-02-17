const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base')({
    devtool: false,

    entry: {
        main: [path.join(process.cwd(), 'build/app/index.js')]
    },

    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: '/',
        path: path.join(process.cwd(), 'build/app/assets')
    },

    babelQuery: {
        cacheDirectory: true,
        plugins: [
            'styled-components'
        ],
        presets: ['latest', 'react', 'stage-0', 'react-optimize']
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
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
