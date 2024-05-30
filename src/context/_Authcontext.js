// Authcontext.js
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // 초기값을 null로 설정

    useEffect(() => {
        // console.log('AuthContext: useEffect called');
        const savedLoginState = localStorage.getItem('isLoggedIn');
        if (savedLoginState !== null) { // 저장된 값이 있는 경우에만 초기화
            setIsLoggedIn(savedLoginState === 'true');
            // console.log('AuthContext: savedLoginState', savedLoginState);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
