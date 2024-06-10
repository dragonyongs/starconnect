import React, { useState, forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ name, onChange, required, className, 'aria-label': ariaLabel, autoComplete = 'off', ...props }, ref) => {
    const [isRequired, setIsRequired] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    const checkValidity = () => {
        if (required && !inputValue) {
            setIsRequired(true);
            return false;
        }
        setIsRequired(false);
        return true;
    };

    return (
        <>
            <label className={`${isRequired ? 'required' : ''}`}>
                <span>{ariaLabel}</span>
            </label>
            <input
                ref={ref}
                name={name}
                className={`custom-input ${className ? className : ''}`}
                aria-label={ariaLabel}
                autoComplete={autoComplete}
                onChange={handleChange}
                value={inputValue}
                onBlur={checkValidity}
                {...props}
                required={required}
            />
        </>
    );
});

export default Input;
