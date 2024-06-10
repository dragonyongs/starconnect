// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../services/axiosInstance";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        const expiresIn = sessionStorage.getItem("expiresIn");
        const email = sessionStorage.getItem("email");
        const isAuthenticated = !!accessToken;
        const role = roles.length > 0 ? roles[0] : null; // 첫 번째 역할을 기본 역할로 설정
        console.log("AuthProvider initial auth:", { accessToken, refreshToken, roles, expiresIn, email, isAuthenticated, role });
        return { accessToken, refreshToken, roles, expiresIn, email, isAuthenticated, role };
    });

    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    useEffect(() => {
        const checkAccessTokenExpiration = async () => {
            const { expiresIn, email } = auth;
            if (expiresIn) {
                const expirationTime = new Date(expiresIn);
                const currentTime = new Date();
                const timeDifference = expirationTime.getTime() - currentTime.getTime();

                if (timeDifference < 60000) { // 1분 미만일 경우 새 토큰 요청
                    try {
                        const response = await axios.post("/auth/refresh", { email }, { withCredentials: true });
                        const { accessToken: accessTokenNew, expiresIn: expiresInNew } = response.data;

                        setAuth(prevAuth => ({
                            ...prevAuth,
                            accessToken: accessTokenNew,
                            expiresIn: new Date(expiresInNew).toISOString()
                        }));

                        sessionStorage.setItem("accessToken", accessTokenNew);
                        sessionStorage.setItem("expiresIn", new Date(expiresInNew).toISOString());

                    } catch (error) {
                        console.error('Error refreshing token:', error);
                        navigate('/login', { state: { from: location }, replace: true });
                    }
                }
            }
        };

        const timer = setInterval(checkAccessTokenExpiration, 650000); // 15분마다 체크

        return () => clearInterval(timer);
    }, [auth, navigate, location]);

    // 로그인 시 setAuth를 호출하여 상태를 업데이트
    const login = (role) => {
        setAuth(prevAuth => ({
            ...prevAuth,
            isAuthenticated: true,
            role,
        }));
    };

    // 로그아웃 시 setAuth를 호출하여 상태를 업데이트
    const logout = () => {
        setAuth({
            accessToken: null,
            refreshToken: null,
            roles: [],
            expiresIn: null,
            email: null,
            isAuthenticated: false,
            role: null,
        });
        sessionStorage.clear();
        localStorage.removeItem("roles");
        navigate('/login', { state: { from: location }, replace: true });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
