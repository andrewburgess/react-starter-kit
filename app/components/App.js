import Helmet               from 'react-helmet';
import React, { PropTypes } from 'react';

const App = (props) => {
    return (
        <div>
            <Helmet title="React Starter Kit" titleTemplate="%s - React Starter Kit" />
            { props.children }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element
};

export default App;
