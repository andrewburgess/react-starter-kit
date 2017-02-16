import { applyMiddleware, compose, createStore } from 'redux';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
    const middlewares = [
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    const composeEnhancers = process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers)
    );

    store.asyncReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            import('./reducers')
            .then((reducerModule) => {
                const createReducers = reducerModule.default;
                const nextReducers = createReducers(store.asyncReducers);

                store.replaceReducer(nextReducers);
            });
        });
    }

    return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
    if (store.asyncReducers[name]) {
        return;
    }

    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}
