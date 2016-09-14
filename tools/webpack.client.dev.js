const webpack = require('webpack');

const CONFIG = require('./webpack.base');

module.exports = {
    debug: true,
    devtool: 'eval',
    entry: {
        main: [
            'react-hot-loader/patch',
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
        path: CONFIG.CLIENT_DEV_OUTPUT
    },
    module: {
        loaders: [{
            test: /\.styl$/,
            loader: 'isomorphic-style-loader!css-loader?modules&camelCase!postcss-loader!stylus-loader'
        }, {
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
