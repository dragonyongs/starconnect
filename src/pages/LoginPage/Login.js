import React from "react";
import LoginForm from "./LoginForm";
import './LoginLayout.css';
import '../../index.css'

const LoginPage = () => {
    return (
        <>
            <div className="login--page">
                <div className="login--area">
                    <h1 className="login--title">Sign in to StarRich Connect</h1>
                    <LoginForm />
                </div>
                <div className="promotion--area">
                    Background
                </div>
            </div>
        </>
    );
}

export default LoginPage;