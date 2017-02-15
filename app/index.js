import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import createRoutes from './routes';

import App from './components/App';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

const rootRoute = {
    component: App,
    childRoutes: createRoutes(store)
};

const render = () => {
    ReactDOM.render(
        <Provider store={ store }>
            <Router history={ history } routes={ rootRoute } />
        </Provider>,
        document.getElementById('app')
    );
};

render();
