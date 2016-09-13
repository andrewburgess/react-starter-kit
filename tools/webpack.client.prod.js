const AssetsPlugin      = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');
const webpack           = require('webpack');

const CONFIG = require('./webpack.base');

module.exports = {
    devtool: false,
    entry: {
        main: [CONFIG.CLIENT_ENTRY],
        vendor: CONFIG.VENDOR
    },
    output: {
        filename: '[name]_[chunkhash].js',
        chunkFilename: '[name]_[chunkhash].js',
        publicPath: CONFIG.PUBLIC_PATH,
        path: CONFIG.CLIENT_PROD_OUTPUT
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0', 'react-optimize']
            },
            exclude: /(node_modules)/
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&camelCase&minimize!postcss!stylus')
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
        new ExtractTextPlugin('styles_[contenthash].css'),
        new AssetsPlugin({ filename: 'dist/assets.json' }),
        new webpack.optimize.DedupePlugin(),
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
        new webpack.NoErrorsPlugin()
    ]
};
