import App from '../containers/App';

//import createHomeRoute from './home';

function errorLoading(err) {
    console.error(`Dynamic page loading failed`, err);
}

function loadRoute(cb) {
    return module => cb(null, module.default);
}

export default function createRoutes() {
    return {
        path: '/',
        component: App,
        indexRoute: {
            getComponent(location, cb) {
                import('../containers/Home').then(loadRoute(cb)).catch(errorLoading);
            }
        },
        childRoutes: [{
            path: '/about',
            getComponent(location, cb) {
                import('../containers/About').then(loadRoute(cb)).catch(errorLoading);
            }
        }]
    };
}
