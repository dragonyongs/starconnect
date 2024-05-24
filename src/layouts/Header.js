import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <>
            <Link to="/">
                <h2>Header</h2>
            </Link>
        </>
    );
}

export default Header;