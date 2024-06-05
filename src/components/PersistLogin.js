import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

const PersistLogin = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        if (accessToken) {
            console.log("PersistLogin: Setting auth", { accessToken, refreshToken, roles });
            setAuth({ accessToken, refreshToken, roles });
        }
        setIsLoading(false);
    }, [setAuth]);

    useEffect(() => {
        if (!auth.accessToken) {
            console.log('로그인 정보 없음');
            navigate("/login", { replace: true });
        }
    }, [auth, navigate]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {auth.accessToken ? <Outlet /> : <Navigate to="/login" replace />}
        </>
    );
};

export default PersistLogin;
