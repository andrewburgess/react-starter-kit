const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base')({
    devtool: 'cheap-module-source-map',
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            path.join(process.cwd(), 'app/index.js')
        ]
    },

    plugins: [
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
});
