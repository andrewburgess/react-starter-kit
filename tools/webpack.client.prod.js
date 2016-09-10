const AssetsPlugin = require('assets-webpack-plugin');
const webpack      = require('webpack');

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
        path: CONFIG.CLIENT_OUTPUT
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
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
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0', 'react-optimize']
            },
            exclude: /(node_modules)/
        }]
    }
};
