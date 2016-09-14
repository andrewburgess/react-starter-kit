import { injectAsyncReducer } from '../store';

export default function createRoute(store) {
    return {
        path: 'about',
        getComponents: (location, cb) => {
            require.ensure([
                '../components/About',
                '../ducks/about'
            ], (require) => {
                let component = require('../components/About').default;
                let reducer = require('../ducks/about').default;

                injectAsyncReducer(store, 'about', reducer);
                cb(null, component);
            });
        }
    }; 
}
