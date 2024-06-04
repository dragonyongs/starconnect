// AuthProvider.js
import { createContext, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../services/axiosInstance";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        const expiresIn = sessionStorage.getItem("expiresIn");
        console.log('AuthProvider-expiresIn', expiresIn);
        const email = sessionStorage.getItem("email");
        console.log("AuthProvider initial auth:", { token, refreshToken, roles, expiresIn, email });
        return {
            token,
            refreshToken,
            roles,
            expiresIn,
            email,
        };
    });

    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    // const refresh = useRefreshToken();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    useEffect(() => {
        const checkAccessTokenExpiration = async () => {
            console.log('auth', auth);
            const expiresIn = auth.expiresIn;
            console.log('expiresIn', expiresIn);
            if (expiresIn) {
                console.log('-----------------------');
                const expirationTime = new Date(expiresIn);
                const currentTime = new Date();
                const timeDifference = expirationTime.getTime() - currentTime.getTime();
                console.log('timeDifference', timeDifference);

                if (timeDifference < 60000) {  // 1분 미만일 경우 새토큰 요청
                    try {
                        // const newToken = await refresh();
                        const response = await axios.post("/auth/refresh", { email: auth.email }, {
                            withCredentials: true
                        });

                        const accessTokenNew = response.data.accessToken;
                        console.log('accessTokenNew', accessTokenNew);
                        const expiresInNew = new Date(response.data.expiresIn).toISOString();
                        // 토큰 갱신 후 auth 상태 업데이트
                        setAuth(prevAuth => ({
                            ...prevAuth,
                            accessToken: accessTokenNew,
                            expiresIn: expiresInNew // 현재 시간으로 업데이트
                        }));

                        // 새로운 엑세스 토큰을 세션 스토리지에 업데이트
                        sessionStorage.setItem("accessToken", accessTokenNew);
                        sessionStorage.setItem("expiresIn", expiresInNew);

                    } catch (error) {
                        console.error('Error refreshing token:', error);
                        navigate('/login', { state: { from: location }, replace: true });
                    }
                }
            }
        };
    
        const timer = setInterval(checkAccessTokenExpiration, 60000); // 65000015분마다 체크
    
        // 컴포넌트가 언마운트되면 타이머 정리
        return () => clearInterval(timer);
    }, [auth, navigate, location]); // auth.expiresIn을 의존성으로 추가

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
