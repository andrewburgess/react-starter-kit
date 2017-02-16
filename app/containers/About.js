import React from 'react';
import { Link } from 'react-router';

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
