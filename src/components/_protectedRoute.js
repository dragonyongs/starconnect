// protectedRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    // console.log('isLoggedIn', isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" /> ;
};

export default ProtectedRoute;