import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    const userHasRequiredRole = auth?.roles?.some(role => allowedRoles?.includes(role));
    console.log("RequireAuth: Checking roles", auth?.roles, allowedRoles, userHasRequiredRole);

    return (
        userHasRequiredRole
            ? <Outlet />
            : <Navigate to="/unauthorized" />
    );
}

export default RequireAuth;
