const CircularDependencyPlugin = require('circular-dependency-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        templateContent: fs.readFileSync(path.resolve(process.cwd(), 'app/index.html')).toString()
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false
    })
];

module.exports = require('./webpack.base')({
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(process.cwd(), 'app/index.js')
    ],

    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: plugins,

    babelQuery: {
        presets: ['babel-preset-react-hmre'].map(require.resolve)
    },

    devtool: 'cheap-module-eval-source-map',

    performance: {
        hints: false
    }
});
