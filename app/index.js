import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import { trigger } from 'redial';

import App from './containers/App';
import configureStore from './store';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={ store }>
                <Router>
                    <Component />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        render(require('./containers/App').default);
    });
}

render(App);
