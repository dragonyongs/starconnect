import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from "../../services/axiosInstance";
import "../../index.css";

const LOGIN_URL = '/auth/login';

const LoginForm = () => {
    const { auth, setAuth, persist, setPersist } = useAuth();

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
        if (!auth?.isAuthenticated) {
            emailRef.current.focus();
        }
    }, [auth]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRemember(true);
        }
    }, []);

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [auth, from, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify(loginData),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log('response?.data?', response?.data);

            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const expiresIn = response?.data?.expiresIn;
            const roles = response?.data?.roles;
            
            setAuth({ email, roles, accessToken, refreshToken, expiresIn, isAuthenticated: true });
            setEmail('');
            setPassword('');

            sessionStorage.setItem("email", email);
            sessionStorage.setItem("expiresIn", expiresIn);
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("roles", JSON.stringify(roles));

            if (remember) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing Email or Password');
                setErrMsg(err.response?.data?.error);
            } else if (err.response?.status === 401) {
                console.log('Unauthorized');
                setErrMsg(err.response?.data?.error);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    if (auth?.isAuthenticated) {
        return null;
    }

    return (
        <>
            <section className="auth--form">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <form className="login" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        className="form--input email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        className="form--input password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    
                    <button type="submit" className="btn btn-large btn-primary">
                        <span className="mx-auto">로그인</span>
                    </button>

                    <div className="authOptionsContainer">
                        <div className="persistCheck">
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">신뢰할 수 있는 기기</label>
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                id="savedEmail"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="savedEmail">이메일 기억</label>
                        </div>
                    </div>
                </form>

                <p className="accountNotice">
                    아직 계정이 없으신가요?
                    <br />
                    <span className="line">
                        <Link to="/register">가입하기</Link>
                    </span>
                </p>
            </section>
        </>
    );
};

export default LoginForm;
