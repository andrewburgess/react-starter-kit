import { AppContainer } from 'react-hot-loader';
import express from 'express';
import fs from 'fs';
import Helmet from 'react-helmet';
import logger from 'winston';
import path from 'path';
import pug from 'pug';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { trigger } from 'redial';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { styleSheet } from 'styled-components';

import config from '../../config';
import configureStore from '../../app/store';
import createRoutes from '../../app/routes';

import App from '../../app/containers/App';

let assets = {
    main: { js: '/main.js' },
    vendor: { js: '/vendor.js' }
};
const template = pug.compileFile(path.join(process.cwd(), 'app/index.pug'));
const router = express.Router();

if (config.get('env') === 'development') {
    const webpackConfig = require('../../tools/webpack/webpack.development');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    router.use(webpackDevMiddleware(compiler));
    router.use(webpackHotMiddleware(compiler, { log: logger.debug }));
} else {
    if (fs.existsSync(path.join(process.cwd(), 'app/assets.json'))) {
        assets = require(path.join(process.cwd(), 'app/assets.json'));
    }
}

router.get('*', (req, res, next) => {
    const store = configureStore({});
    const dispatch = store.dispatch;
    const history = createMemoryHistory(req.originalUrl);

    const routes = createRoutes();

    //styleSheet.reset();
    match({ routes, history }, (err, redirect, renderProps) => {
        if (err) {
            logger.error(err);
            return next(err);
        }

        if (!renderProps) {
            return next();
        }

        const Application = (
            <Provider store={ store }>
                <RouterContext { ...renderProps } />
            </Provider>
        );
        const html = ReactDOM.renderToString(Application);
        const state = store.getState();
        const head = Helmet.rewind();
        const styles = styleSheet.getCSS();
        const rendered = template({
            assets,
            head,
            html,
            state: JSON.stringify(state),
            styles
        });

        res.set('Content-Type', 'text/html').send(rendered);
    });
    /*match({ routes, history }, (err, redirect, renderProps) => {
        if (err) {
            logger.error(err);
            return next(err);
        }

        if (!renderProps) {
            return next();
        }

        const { components } = renderProps;
        const locals = {
            path: renderProps.location.pathname,
            query: renderProps.location.query,
            params: renderProps.params,
            dispatch
        };

        trigger('fetch', components, locals)
        .then(() => {
            const App = (
                <AppContainer>
                    <Provider store={ store }>
                        <RouterContext { ...renderProps } />
                    </Provider>
                </AppContainer>
            );

            const html = ReactDOM.renderToString(App);
            const state = store.getState();
            const head = Helmet.rewind();

            const rendered = template({
                assets,
                head,
                html,
                state: JSON.stringify(state)
            });

            res.set('Content-Type', 'text/html').send(rendered);
        })
        .catch((err) => {
            logger.error(err);
            return next(err);
        });
    });*/
});

export default router;
