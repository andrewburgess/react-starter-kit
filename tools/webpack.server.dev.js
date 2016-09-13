var fs      = require('fs');
var path    = require('path');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    entry: './server/server.js',
    target: 'node',
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
    output: {
        path: path.join(__dirname, '.tmp'),
        filename: 'server.js'
    },
    externals: nodeModules
};
