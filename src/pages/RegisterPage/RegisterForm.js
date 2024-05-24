import React, { useRef } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { FiUnlock } from "react-icons/fi";
import './registerForm.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const personalPhoneRef = useRef(null);
    const companyNameRef = useRef(null);
    const hireDateRef = useRef(formattedDate);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const refs = [nameRef, passwordRef, emailRef, personalPhoneRef, companyNameRef, hireDateRef];

        let isFormValid = true;

        refs.forEach((ref) => {
            if (ref.current && !ref.current.checkValidity()) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const formData = {
                name: nameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value,
                personalPhone: personalPhoneRef.current.value,
                companyName: companyNameRef.current.value,
                hireDate: hireDateRef.current.value,
            };

            try {
                await fetch('/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(navigate('/login'))
                .catch(error => console.error(error));
            } catch (error) {
                console.error('An error occurred while registering user:', error);
            }
        } else {
            console.log('Please fill out the required fields.');
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <Input ref={nameRef} type="text" name="name" aria-label="Name" autoComplete="off" required placeholder="Name" onChange={(e) => console.log('Name changed:', e.target.value)} />
            <Input ref={passwordRef} type="password" name="password" aria-label="Password" autoComplete="off" required placeholder="Password" />
            <Input ref={emailRef} type="email" name="email" aria-label="Email" autoComplete="off" required placeholder="Email" />
            <Input ref={personalPhoneRef} type="text" name="personalPhone" aria-label="Personal Phone" autoComplete="off" placeholder="Personal Phone" />
            <Input ref={companyNameRef} type="text" name="companyName" aria-label="Company Name" autoComplete="off" placeholder="Company Name" />
            <Input ref={hireDateRef} type="date" name="hireDate" aria-label="Hire Date" required autoComplete="off" placeholder="hire Date" />
            <Button type="submit" className="register-btn"><FiUnlock /> 등록</Button>
        </form>
    );
}

export default RegisterForm;
