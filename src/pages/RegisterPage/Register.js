import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import TermsOfService from './TermsOfService';
import Button from '../../components/Button';

const RegisterPage = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        // 회원가입 처리 로직

        // 회원가입 성공 시 다음 페이지로 이동
        navigate('/login'); // '/login' 경로로 이동
    };
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm />
            <TermsOfService />
            <Button onClick={handleRegister}>가입하기</Button>
        </div>
    );
}

export default RegisterPage;