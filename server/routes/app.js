import express from 'express';
import fs from 'fs';
import logger from 'winston';

import config from '../../config';

const router = express.Router();

if (config.get('env') === 'development') {
    const webpackConfig = require('../../tools/webpack/webpack.development');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    router.use(webpackDevMiddleware(compiler));
    router.use(webpackHotMiddleware(compiler, { log: console.log }));

    router.get('*', (req, res) => {
        console.log('hi');
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
            console.log(file.toString());
            if (err) {
                res.sendStatus(404);
            } else {
                res.send(file.toString());
            }
        });
    });
}

export default router;
