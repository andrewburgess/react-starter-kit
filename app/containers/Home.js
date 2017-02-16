import React from 'react';
import { Link } from 'react-router';

export default function Home() {
    return (
        <div>
            Home
            <div>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}
