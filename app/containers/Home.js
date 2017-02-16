import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const H2 = styled.h2`
    color: #0f0;
    font-size: 20px;
`;

export default function Home() {
    return (
        <div>
            <H2>Home</H2>
            <div>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}
