import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            About
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}
