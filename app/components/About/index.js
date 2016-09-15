import React      from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import style from './index.styl';

const About = () => {
    return (
        <div className={ style.about }>
            <h1>About</h1>
        </div>
    );
};

export default withStyles(style)(About);
