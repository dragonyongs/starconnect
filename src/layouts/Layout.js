// Layout.js
import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthContext from '../context/AuthProvider';

const Layout = () => {
    const { auth } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(auth?.isAuthenticated);
    
    useEffect(() => {
        setIsAuthenticated(auth?.isAuthenticated);
    }, [auth]);

    console.log('useEffect-isAuthenticated', isAuthenticated);

    return (
        <div>
            {isAuthenticated && <Header />}
            <main>
                <Outlet />
            </main>
            {isAuthenticated && <Footer />}
        </div>
    );
};

export default Layout;

// import { Outlet } from "react-router-dom"

// const Layout = () => {
//     return (
//         <main className="App">
//             <Outlet />
//         </main>
//     )
// }

// export default Layout

