import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { trigger } from 'redial';

import configureStore from './store';
import createRoutes from './routes';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);

const render = (routes) => {
    const history = browserHistory;
    match({ routes, history }, (err, redirectLocation, renderProps) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={ store }>
                    <Router key={ Math.random() } { ...renderProps } />
                </Provider>
            </AppContainer>,
            document.getElementById('app')
        );
    });
};

if (module.hot) {
    module.hot.accept('./routes', () => {
        render(require('./routes').default());
    });
}

render(createRoutes());
