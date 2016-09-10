import browserHistory from 'react-router/lib/browserHistory';
import match          from 'react-router/lib/match';
import { Provider }   from 'react-redux';
import React          from 'react';
import ReactDOM       from 'react-dom';
import Router         from 'react-router/lib/Router';
import { StyleSheet } from 'aphrodite';
import { trigger }    from 'redial';

import createStore  from '../app/store';

const INITIAL_STATE = window.INITIAL_STATE || {};

StyleSheet.rehydrate(window.renderedClassNames);

const store = createStore(INITIAL_STATE);
const dispatch = store.dispatch;

const render = () => {
    const location = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const routes = require('../app/routes').default(store);

    match({ routes, location }, () => {
        ReactDOM.render(
            <Provider store={ store }>
                <Router history={ browserHistory } key={ Math.random() } routes={ routes } />
            </Provider>,
            document.getElementById('app')
        );
    });

    return browserHistory.listen((location) => {
        match({ routes, location }, (error, redirect, renderProps) => {
            if (error) {
                console.error(error);
            }

            const { components } = renderProps;
            const locals = {
                path: renderProps.location.pathname,
                query: renderProps.location.query,
                params: renderProps.params,
                dispatch
            };

            if (window.INITIAL_STATE) {
                delete window.INITIAL_STATE;
            } else {
                trigger('fetch', components, locals);
            }

            trigger('defer', components, locals);
        });
    });
};

let unsubscribe = render();

if (module.hot) {
    module.hot.accept('../app/routes/index', () => {
        unsubscribe();
        setTimeout(render);
    });
}
