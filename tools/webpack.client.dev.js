const webpack = require('webpack');

const CONFIG = require('./webpack.base');

module.exports = {
    devtool: 'eval',
    entry: {
        main: [
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            CONFIG.CLIENT_ENTRY
        ],
        vendor: CONFIG.VENDOR
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: CONFIG.CLIENT_OUTPUT
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /(node_modules|server)/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
        new webpack.NoErrorsPlugin()
    ]
};
