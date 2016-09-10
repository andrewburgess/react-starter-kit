import React               from 'react';
import { StyleSheet, css } from 'aphrodite';

const Home = () => {
    return (
        <div className={ css(styles.home) }>
            <h1>Wow</h1>
        </div>
    );
};

const styles = StyleSheet.create({
    home: {
        color: 'blue'
    }
});

export default Home;
