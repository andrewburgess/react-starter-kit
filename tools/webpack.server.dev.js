const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs                = require('fs');
const path              = require('path');
const webpack           = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    debug: true,
    entry: './server/server.js',
    target: 'node',
    module: {
        loaders: [{
            test: /\.pug$/,
            loader: 'pug-loader'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('isomorphic-style', 'css?modules&camelCase&minimize!postcss!stylus')
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    node: {
        __dirname: false
    },
    output: {
        path: path.join(process.cwd(), '.tmp'),
        filename: 'server.js'
    },
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: true,
            exclude: /\.css$/
        }),
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
    ],
    externals: [
        nodeModules,
        {
            './assets.json': 'commonjs ./assets.json'
        }
    ]
};
