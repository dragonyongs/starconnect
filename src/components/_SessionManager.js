import React, { useState, useEffect } from 'react';

const SessionManager = () => {
    // 세션 정보를 담을 상태 변수
    const [session, setSession] = useState(null);

    // 브라우저의 로컬 스토리지에서 세션 정보를 가져와서 상태에 반영
    useEffect(() => {
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
        setSession(JSON.parse(storedSession));
        }
    }, []);

    // 로그인 처리 함수
    const handleLogin = (userData) => {
        // 사용자 정보를 세션에 저장하고 상태에 반영
        localStorage.setItem('session', JSON.stringify(userData));
        setSession(userData);
    };

    // 로그아웃 처리 함수
    const handleLogout = () => {
        // 세션 정보를 삭제하고 상태를 업데이트하여 로그아웃 상태로 변경
        localStorage.removeItem('session');
        setSession(null);
    };

    return (
        <div>
        {/* 세션 정보가 있으면 로그인된 상태를 보여줌 */}
        {session ? (
            <div>
            <p>로그인되었습니다.</p>
            <button onClick={handleLogout}>로그아웃</button>
            </div>
        ) : (
            // 세션 정보가 없으면 로그인 폼을 보여줌
            <LoginForm onLogin={handleLogin} />
        )}
        </div>
    );
};

// 로그인 폼 컴포넌트
const LoginForm = ({ onLogin }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 데이터를 이용하여 로그인 처리 후 부모 컴포넌트로 사용자 정보 전달
        const userData = { /* 폼 데이터 */ };
        onLogin(userData);
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* 로그인 폼 입력 요소들 */}
        <button type="submit">로그인</button>
        </form>
    );
};

export default SessionManager;
