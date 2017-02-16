import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const H2 = styled.h2`
    color: #f00;
    font-size: 14px;
`;

export default function Home() {
    return (
        <div>
            <H2>About</H2>
            <div>
                <Link to="/">Home</Link>
            </div>
        </div>
    );
}
