import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import styled from 'styled-components';

const H1 = styled.h1`
    font-size: 2.0em;
    text-transform: uppercase;
`;

const App = (props) => {
    return (
        <div>
            <Helmet title="React Starter Kit" />

            <H1>App</H1>

            { props.children }
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node
};

export default App;
