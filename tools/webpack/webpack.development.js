const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            path.join(process.cwd(), 'app/index.js')
        ],
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
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: path.join(process.cwd(), 'app/assets')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'styled-components'
                    ],
                    presets: ['latest', 'react', 'stage-0', 'react-hmre']
                }
            }]
        }, {
            test: /\.pug$/,
            use: 'pug-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
