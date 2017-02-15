const path = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/'
    }, options.output),
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: options.babelQuery
        }, {
            test: /\.css$/,
            include: /node_modules/,
            loaders: ['style-loader', 'css-loader']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        }, {
            test: /\.(jpg|png|gif)$/,
            loaders: [
                'file-loader', {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }
            ]
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NamedModulesPlugin()
    ]),
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.react.js'
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main'
        ]
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {}
});
