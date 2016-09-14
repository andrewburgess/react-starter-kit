import React from 'react';
import { Link } from 'react-router';

import style from './index.styl';

const Home = () => {
    return (
        <div className={ style.home }>
            <h1><Link to="/about">Wow</Link></h1>
        </div>
    );
};

export default Home;
