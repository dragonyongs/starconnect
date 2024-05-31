import { createContext, useState, useEffect } from "react";
import useRefreshToken from "../path/to/useRefreshToken"; // useRefreshToken 훅 임포트

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");
        const roles = JSON.parse(localStorage.getItem("roles")) || [];
        console.log("AuthProvider initial auth:", { token, refreshToken, roles });
        return token ? { token, refreshToken, roles } : {};
    });

    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const refresh = useRefreshToken(); // useRefreshToken 훅 사용

    useEffect(() => {
        const checkAccessTokenExpiration = async () => {
            // 엑세스 토큰 만료 시간 체크 및 만료될 때마다 refresh 함수 호출
            const expirationTime = /* 엑세스 토큰의 만료 시간 */;
            const currentTime = /* 현재 시간 */;
            
            if (expirationTime <= currentTime) {
                try {
                    const email = /* 이메일 정보 추출 */;
                    await refresh(email); // 이메일 정보를 전달하여 새로운 액세스 토큰 요청
                } catch (error) {
                    console.error('Error refreshing token:', error);
                }
            }
        };

        const interval = setInterval(checkAccessTokenExpiration, 60000); // 1분마다 엑세스 토큰 만료 체크

        return () => clearInterval(interval); // 언마운트 시에 interval 정리
    }, [refresh]); // refresh 함수 의존성 추가

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
