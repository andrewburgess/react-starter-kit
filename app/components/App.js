//import _                    from 'lodash';
import { connect }          from 'react-redux';
import Helmet               from 'react-helmet';
import isNode               from 'detect-node';
import React, { PropTypes } from 'react';

import { insertCss } from '../ducks/app';

const mapDispatchToProps = (dispatch) => {
    return {
        insertCss: (css) => dispatch(insertCss(css))
    };
};

class App extends React.Component {
    getChildContext() {
        if (isNode) {
            return {
                insertCss: this.props.insertCss
            };
        }

        return {
            insertCss: (...styles) => {
                const removeCss = styles.map(style => style._insertCss());
                return () => {
                    removeCss.forEach(f => f());
                };
            }
        };
    }

    render() {
        return (
            <div>
                <Helmet title="React Starter Kit" titleTemplate="%s - React Starter Kit" />
                { this.props.children }
            </div>
        );
    }
}

App.childContextTypes = {
    insertCss: PropTypes.func.isRequired
};

App.propTypes = {
    children: PropTypes.element,
    insertCss: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(App);
