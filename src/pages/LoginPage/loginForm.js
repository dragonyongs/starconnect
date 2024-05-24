import React from "react";
import Button from '../../components/Button';
import Input from "../../components/Input";

const LoginForm = () => {
    return (
        <>
            <h4>Login Form Area</h4>
            <Input type="text"></Input>
            <Button type="submit" className="register-btn">로그인</Button>
        </>
    );
}

export default LoginForm;