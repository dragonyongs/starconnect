import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const { setAuth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    );
}

export default PersistLogin;
