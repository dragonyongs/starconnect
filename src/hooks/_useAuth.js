// useAuth.js
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Authcontext';

export const useAuth = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        // 초기화할 때만 실행되도록 설정
        if (isLoggedIn === null) {
            const savedLoginState = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(savedLoginState);
            // console.log('useAuth-savedLoginState', savedLoginState);
        }
    }, [isLoggedIn, setIsLoggedIn]);

    return { isLoggedIn, setIsLoggedIn };
};
