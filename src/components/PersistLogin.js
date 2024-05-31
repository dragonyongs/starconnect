import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const { setAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        if (token) {
            console.log("PersistLogin: Setting auth", { token, refreshToken, roles });
            setAuth({ token, refreshToken, roles });
        }
        setIsLoading(false);
    }, [setAuth]);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;
