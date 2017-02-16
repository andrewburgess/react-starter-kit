import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import Routes from '../routes';

const App = (props) => {
    return (
        <div>
            <Helmet title="React Starter Kit" />

            <h1>App</h1>

            <Routes />
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node
};

export default App;
