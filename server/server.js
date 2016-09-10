import bodyParser           from 'body-parser';
import compression          from 'compression';
import express              from 'express';
import helmet               from 'helmet';
import Helmet               from 'react-helmet';
import hpp                  from 'hpp';
import path                 from 'path';
import { Provider }         from 'react-redux';
import React                from 'react';
import ReactDOM             from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { trigger }          from 'redial';

import {
    createMemoryHistory,
    match,
    RouterContext
} from 'react-router';

import createRoutes from '../app/routes';
import createStore  from '../app/store';

const port = process.env.PORT || 8080;
const app = express();

let assets = {};

app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    assets = require(path.join(__dirname, '../', 'assets.json'));
} else {
    const config = require('../tools/webpack.client.dev');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    let compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { quiet: true }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(express.static(path.join(__dirname, '../', 'public')));

app.get('*', (req, res) => {
    const store = createStore({
        app: {
            host: req.headers.host,
            protocol: req.headers['x-forwarded-proto'] || req.protocol
        }
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(req.originalUrl);
    const dispatch = store.dispatch;

    match({ routes, history }, (err, redirect, renderProps) => {
        if (err) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        if (!renderProps) {
            return res.status(404).send('Not found');
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
            const initialState = store.getState();
            const App = (
                <Provider store={ store }>
                    <RouterContext { ...renderProps } />
                </Provider>
            );

            const rendered = StyleSheetServer.renderStatic(() => {
                return ReactDOM.renderToString(App);
            });
            const head = Helmet.rewind();

            res.render('index', {
                assets,
                head,
                html: rendered.html,
                css: rendered.css,
                PROD: process.env.NODE_ENV === 'production',
                state: JSON.stringify(initialState)
            });
        });
    });
});

app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('server listening on port ' + port);
    }
});

module.exports = app;
