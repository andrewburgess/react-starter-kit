const fs      = require('fs');
const path    = require('path');
const webpack = require('webpack');

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
    devtool: 'inline-source-map',
    entry: './server/server.js',
    target: 'node',
    module: {
        loaders: [{
            test: /\.pug$/,
            loader: 'pug-loader'
        }, {
            test: /\.styl$/,
            loader: 'isomorphic-style!css?modules&camelCase&sourceMap&localIdentName=[name]_[local]_[hash:base64:4]!postcss!stylus'
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
        })
    ],
    externals: [
        nodeModules,
        {
            './assets.json': 'commonjs ./assets.json'
        }
    ]
};
