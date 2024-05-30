import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../services/axiosInstance";
import './registerForm.css';

const USER_REGEX = /^[가-힣]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^010-\d{4}-\d{4}$/;
const REGISTER_URL = '/auth/register';

const RegisterForm2 = () => {

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
            hireDate: hireDate.trim()
        };
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(trimmedData),
                {
                    headers: { 'Content-Type': 'application/json',},
                    withCredentials: true
                }
            );
            // console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response));
            setSuccess(true);
            
            // 입력 인풋 값 초기화
            setUser('');
            setPwd('');
            setEmail('');
            setPhone('');
            setMatchPwd('');

        } catch (err) {
            if (!err.response) {
                setErrMsg('서버에서 응답이 없습니다');
            } else if (err.response?.status === 400) {
                setErrMsg('필수 입력 값이 존재합니다');
            } else {
                setErrMsg('회원가입에 실패했습니다');
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='#'>Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
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
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2자~6자 한글 문자로 시작해야합니다.
                        </p>

                        <label htmlFor="password">
                            Password:
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
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
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
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            autoComplete='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            이메일 형식을 맞춰 주세요. @ 필수 입니다. <br />
                            예시) emailname@company.com
                        </p>

                        <label htmlFor='phone'>
                            Phone:
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

                        <label htmlFor='company'>
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
                        </p>

                        <label htmlFor='hireDate'>
                            Hire Date:
                            {/* <FontAwesomeIcon icon={faCheck} className={validHireDate ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validHireDate || !hireDate ? "hide" : "invalid"} /> */}
                        </label>
                        <input 
                            type="date"
                            id="hireDate"
                            name="hireDate"
                            // ref={hireDateRef}
                            autoComplete='off'
                            onChange={(e) => setHireDate(e.target.value)}
                            value={hireDate}
                            required
                        />

                        <button disabled={!validName || !validPwd || !validMatch || !validEmail || !validPhone|| !validCompany ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default RegisterForm2;
