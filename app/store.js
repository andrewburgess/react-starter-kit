import {
    applyMiddleware,
    compose,
    createStore
}                    from 'redux';
import thunk         from 'redux-thunk';

import createReducers from './reducers';

export default function (initialState) {
    let store = createStore(createReducers(), initialState, compose(
        applyMiddleware(thunk),
        process.env.NODE_ENV === 'development' && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
            window.devToolsExtension() :
            f => f
    ));

    store.asyncReducers = {};

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducers(store.asyncReducers));
}
