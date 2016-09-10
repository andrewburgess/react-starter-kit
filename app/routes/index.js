import App  from '../components/App';
import Home from './Home';

export default function createRoutes(store) {
    const root = {
        path: '/',
        component: App,
        getChildRoutes: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, [
                    require('./Error404').default(store)
                ]);
            });
        },

        indexRoute: {
            component: Home
        }
    };

    return root;
}
