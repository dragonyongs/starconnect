import React from 'react';
import RegisterForm from './RegisterForm';
import MessageBox from '../../components/Messagebox';
import '../../index.css'

const RegisterPage = () => {
    return (
        <>
            <div className="auth--layout">
                <div className="auth--area">
                    <h1 className="register--title">Register</h1>
                    <RegisterForm />
                </div>
                <div className="promotion--area">
                    <MessageBox />
                </div>
            </div>
        </>
    );
}

export default RegisterPage;