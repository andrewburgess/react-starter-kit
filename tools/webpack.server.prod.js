const fs   = require('fs');
const path = require('path');

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
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'server.js'
    },
    module: {
        loaders: [{
            test: /\.pug$/,
            loader: 'pug-loader'
        }, {
            test: /\.styl$/,
            loader: 'isomorphic-style!css?modules&camelCase&minimize!postcss!stylus'
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
    plugins: [
    ],
    externals: [
        nodeModules,
        {
            './assets.json': 'commonjs ./assets.json'
        }
    ]
};
