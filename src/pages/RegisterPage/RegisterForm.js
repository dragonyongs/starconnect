import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../services/axiosInstance";
import "../../index.css";

const USER_REGEX = /^[가-힣]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^010-\d{4}-\d{4}$/;
const REGISTER_URL = '/auth/register';

const RegisterForm = () => {
    const navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    const userRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [company, setCompany] = useState('');
    const [validCompany, setValidCompany] = useState('');
    const [companyFocus, setCompanyFocus] = useState(false);

    const [roles, setRoles] = useState('');
    const [validRoles, setValidRoles] = useState('');
    const [rolesFocus, setRolesFocus] = useState(false);

    const [hireDate, setHireDate] = useState(formattedDate);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidCompany(company);
    }, [company])

    useEffect(() => {
        setValidRoles(roles);
    }, [roles])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // JS 해킹으로 버튼이 활성화된 경우
        const V1 = USER_REGEX.test(user);
        const V2 = PWD_REGEX.test(pwd);
        const V3 = EMAIL_REGEX.test(email);
        const V4 = PHONE_REGEX.test(phone);

        if (!V1 || !V2 || !V3 || !V4) {
            setErrMsg("잘못 입력 하셨습니다");
            return;
        }

        const trimmedData = {
            name: user.trim(),
            password: pwd.trim(),
            email: email.trim(),
            phone: phone.trim(),
            company: company.trim(),
            hireDate: hireDate.trim(),
            roles: roles,
        };
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(trimmedData),
                {
                    headers: { 'Content-Type': 'application/json',},
                    withCredentials: true
                }
            );

            console.log('response', response);
            setSuccess(true);
            
            // 입력 인풋 값 초기화
            setUser('');
            setPwd('');
            setEmail('');
            setPhone('');
            setMatchPwd('');

            localStorage.setItem('savedEmail', response?.data?.email);

            navigate('/login');
        
        } catch (err) {
            if (!err.response) {
                setErrMsg('서버에서 응답이 없습니다');
            } else if (err.response.data.error === '이미 사용 중인 이메일입니다.') {
                setEmailError('이미 사용 중인 이메일입니다.');
            } else if (err.response?.status === 400) {
                setErrMsg('필수 입력 값이 존재합니다');
            } else if (err.response?.status === 409) {
                setErrMsg('사용중인 이메일입니다.');
            }else {
                setErrMsg('회원가입에 실패했습니다');
            }
        }
    }

    return (
        <>
            {/* {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='/login'>Sign In</a>
                    </p>
                </section>
            ) : ( */}
                <section class="auth--form">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="register" onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            <span>이름</span>
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            placeholder="이름"
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2자~6자 한글 문자로 시작해야합니다.
                        </p>

                        <label htmlFor="password">
                            <span>패스워드</span>
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8에서 24자 사이여야 합니다.<br />
                            대문자와 소문자, 숫자, 그리고 특수 문자를 포함해야 합니다.<br />
                            사용할 수 있는 특수 문자: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            <span>패스워드 확인</span>
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor='email'>
                            <span>이메일</span>
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            autoComplete='off'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            이메일 형식을 맞춰 주세요. @ 필수 입니다.
                        </p>
                        <p className={emailError ? "error-message" : "offscreen"}>{emailError}</p> {/* 중복 에러 메시지 표시 */}

                        <label htmlFor='phone'>
                            <span>전화번호</span>
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="text"
                            id="phone"
                            name="personalPhone"
                            ref={phoneRef}
                            autoComplete='off'
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phonenote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            개인 연락처 자리수를 지켜주세요. <br />
                            예시) 010-0000-0000
                        </p>

                        {/* <label htmlFor='company'>
                            Company:
                            <FontAwesomeIcon icon={faCheck} className={validCompany ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCompany || !company ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="text"
                            id="company"
                            autoComplete='off'
                            name="company"
                            onChange={(e) => setCompany(e.target.value)}
                            value={company}
                            required
                            aria-invalid={validCompany ? "false" : "true"}
                            aria-describedby="companynote"
                            onFocus={() => setCompanyFocus(true)}
                            onBlur={() => setCompanyFocus(false)}
                        />
                        <p id="companynote" className={companyFocus && !validCompany? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            필수 입력사항으로 정확한 회사명을 작성해주세요.
                        </p>

                        <label htmlFor='roles'>
                            Roles:
                            <FontAwesomeIcon icon={faCheck} className={validRoles ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validRoles || !roles ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="text"
                            id="roles"
                            autoComplete='off'
                            name="roles"
                            onChange={(e) => setRoles(e.target.value)}
                            value={roles}
                            required
                            aria-invalid={validRoles ? "false" : "true"}
                            aria-describedby="rolesnote"
                            onFocus={() => setRolesFocus(true)}
                            onBlur={() => setRolesFocus(false)}
                        />
                        <p id="rolesnote" className={rolesFocus && !validRoles? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            권한 작성 필수
                        </p> */}

                        {/* <label htmlFor='hireDate'>
                            Hire Date:
                        </label>
                        <input 
                            type="date"
                            id="hireDate"
                            name="hireDate"
                            autoComplete='off'
                            onChange={(e) => setHireDate(e.target.value)}
                            value={hireDate}
                            required
                        /> */}

                        <button className="btn btn-large btn-primary" disabled={!validName || !validPwd || !validMatch || !validEmail || !validPhone ? true : false}>
                            <span className="mx-auto">등록</span>
                        </button>
                    </form>
                    <p>
                        이미 등록 하셨나요?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/login">로그인</a>
                        </span>
                    </p>
                </section>
            {/* )} */}
        </>
    )
}

export default RegisterForm;
