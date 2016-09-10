import { injectAsyncReducer } from '../store';

export default function createRoute(store) {
    return {
        path: '404',
        getComponents: (location, cb) => {
            require.ensure([
                '../components/Errors/Error404',
                '../ducks/error404'
            ], (require) => {
                let component = require('../components/Errors/Error404').default;
                let reducer = require('../ducks/error404').default;

                injectAsyncReducer(store, 'error404', reducer);
                cb(null, component);
            });
        }
    };
}
