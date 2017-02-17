const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
    devtool: options.devtool,

    entry: _.extend({
        vendor: [
            'axios',
            'lodash',
            'react',
            'react-dom',
            'react-helmet',
            'react-hot-loader',
            'react-redux',
            'react-router',
            'redial',
            'redux',
            'styled-components'
        ]
    }, options.entry),

    output: _.extend({
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: path.join(process.cwd(), 'app/assets')
    }, options.output),

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                query: options.babelQuery || {
                    cacheDirectory: true,
                    plugins: [
                        'styled-components'
                    ],
                    presets: ['latest', 'react', 'stage-0', 'react-hmre']
                }
            }]
        }]
    },

    plugins: (options.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.NamedModulesPlugin()
    ]),

    performance: options.performance || {}
});
