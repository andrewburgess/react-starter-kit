import React from 'react';
import { Route } from 'react-router';

function createAsyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;

        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent()
                .then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component });
                });
            }
        }

        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component { ...this.props } />;
            }

            return null;
        }
    };
}

const HomeRoute = createAsyncComponent(() => {
    return import('../containers/Home')
    .then((component) => {
        return component.default;
    });
});

const AboutRoute = createAsyncComponent(() => {
    return import('../containers/About')
    .then((component) => {
        return component.default;
    });
});

const Routes = () => {
    return (
        <div>
            <Route exact path="/" component={ HomeRoute } />
            <Route path="/about" component={ AboutRoute } />
        </div>
    );
};

export default Routes;
