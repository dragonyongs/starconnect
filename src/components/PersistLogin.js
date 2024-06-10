import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";

const PersistLogin = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        if (accessToken) {
            setAuth({ accessToken, refreshToken, roles, isAuthenticated: true });
        }
        setIsLoading(false);
    }, [setAuth]);

    useEffect(() => {
        if (!auth.accessToken) {
            navigate("/login", { replace: true });
        } else if (["/login", "/register"].includes(location.pathname)) {
            navigate("/", { replace: true });
        }
    }, [auth, navigate, location]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <Outlet />;
};

export default PersistLogin;
