import React from 'react';
import RegisterForm from './RegisterForm';
import TermsOfService from './TermsOfService';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm />
            <TermsOfService />
        </div>
    );
}

export default RegisterPage;