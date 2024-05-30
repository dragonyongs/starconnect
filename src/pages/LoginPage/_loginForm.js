import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "../../services/axiosInstance";
import Button from '../../components/Button';
import Input from "../../components/Input";
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRemember(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password,
            remember: remember
        };

        try {
            const response = await axios.post('/auth/login', loginData);
            const data = response.data;

            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const roles = response?.data?.roles;

            setAuth({ email, password, roles, accessToken, refreshToken });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            if (remember) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }
            
            // if (response.status === 200) {
            //     if (data.success && data.redirectUrl) {
            //         console.log(data.redirectUrl);
            //         setIsLoggedIn(true);
            //         localStorage.setItem('isLoggedIn', true);
            //         navigate(data.redirectUrl);
            //     } else {
            //         console.error('Login failed:', data.error);
            //         navigate('/register');
            //     }
            // } else {
            //     console.error('Login failed:', data.error);
            //     navigate('/register');
            // }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h4>Login</h4>
            <form className="login-form" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="email"
                    placeholder="id@email.com"
                    aria-label="Email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="********"
                    aria-label="Password"
                    autoComplete="off"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <label>
                        Remember Me:
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                    </label>
                </div>
                <Button type="submit" className="register-btn">로그인</Button>
            </form>
        </section>
    );
}

export default LoginForm;
