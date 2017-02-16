import App from '../containers/App';

import home from './home';
import about from './about';

export default function createRoutes() {
    return {
        path: '/',
        component: App,
        indexRoute: home(),
        childRoutes: [
            about()
        ]
    };
}
