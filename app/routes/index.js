import React from 'react';
import {
    IndexRoute,
    Redirect,
    Route
} from 'react-router';

import App      from '../components/App';
import Error404 from '../components/Errors/Error404';
import Home     from './Home';

export default function createRoutes(store) {
    const getChildRoutes = (location, cb) => {
        require.ensure([], (require) => {
            cb(null, [
                require('./About').default(store),
                <Route component={ Error404 } path="404" />,
                <Redirect from="*" to="/404" />
            ]);
        });
    };

    return (
        <Route component={ App } getChildRoutes={ getChildRoutes } path="/">
            <IndexRoute component={ Home } />
        </Route>
    );
}
