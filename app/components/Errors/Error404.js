import React               from 'react';
import { StyleSheet, css } from 'aphrodite';

const Error404 = () => {
    return (
        <div className={ css(Error404.styles.error) }>
            <h1>Error 404</h1>
        </div>
    );
};

Error404.styles = StyleSheet.create({
    error: {

    }
});

export default Error404;
