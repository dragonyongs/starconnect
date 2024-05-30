import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import LoadingError from '../layouts/LoadingError'; 
import Button from './Button';
import Input from './Input';
import '../pages/RegisterPage/RegisterForm.css';

const UserProfile = () => {
    const { userId } = useParams();
    const { user, loading, error, updateUser, deleteUser, setUser} = useFetchUser(userId);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [editableFields, setEditableFields] = useState([]);
    const [requiredFields, setRequiredFields] = useState([]);

    if (!user) {
        return <div>No user found</div>;
    }

    const formatHireDate = (date) => {
        if (!date) return "";
        return date;
    };

    const userDetails = [
        { label: "이름", type: "text", value: user.name, key: "name", editable: editableFields.includes("name"), required: true },
        { label: "이메일", type: "email", value: user.email, key: "email", editable: editableFields.includes("email"), required: true  },
        { label: "회사명", type: "text", value: user.company, key: "company", editable: editableFields.includes("company"), required: true },
        { label: "휴대폰", type: "text", value: user.phone, key: "phone", editable: editableFields.includes("phone"), required: false  },
        { label: "입사일", type: "date", value: formatHireDate(user.hireDate), key: "hireDate", editable: editableFields.includes("hireDate"), required: false },
    ];

    const handleEdit = () => {
        setIsEditing(true);
        setEditedUser({ 
            ...user, 
            hireDate: formatHireDate(user.hireDate)
        });
        setEditableFields(userDetails.map(detail => detail.key));
        setRequiredFields(userDetails.filter(detail => detail.required).map(detail => detail.key));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = async () => {
        if (editedUser) {
            const missingRequiredFields = checkRequiredFields(userDetails, editedUser);
            if (missingRequiredFields.length > 0) {
                alert(`다음 필수 입력 필드를 입력해주세요: ${missingRequiredFields.join(', ')}`);
                return;
            }
            
            try {
                await updateUser(editedUser);
                setUser(editedUser);
                setIsEditing(false);
                setEditedUser(null);
                setEditableFields([]);
                setRequiredFields([]);
            } catch (error) {
                // Handle error (e.g., show error message to the user)
            }
        }
    };

    const handleDelete = async () => {
        await deleteUser(userId);
    };

    const handleBlur = (key) => {
        if (requiredFields.includes(key) && !editedUser[key]) {
            setRequiredFields([...requiredFields, key]);
        } else {
            setRequiredFields(requiredFields.filter(field => field !== key));
        }
    };

    return (
        <div>
            <h3>{user.name}의 정보입니다.</h3>

            <LoadingError loading={loading} error={error} />

            <form className="register-form">
                {userDetails.map((detail, index) => 
                    detail.editable ? (
                        <Input 
                            key={index} 
                            type={detail.type} 
                            aria-label={detail.label} 
                            autoComplete="off" 
                            name={detail.key} 
                            value={editedUser?.[detail.key] ?? detail.value} 
                            required={detail.required} 
                            onBlur={() => handleBlur(detail.key)} 
                            onChange={handleChange} 
                        />
                    ) : (
                        <p key={index}>{detail.label}: {detail.type === 'date' ? new Date(detail.value).toLocaleDateString() : detail.value}</p>
                    )
                )}

                {isEditing ? (
                    <Button onClick={handleSave}>저장</Button>
                ) : (
                    <Button onClick={handleEdit}>수정</Button>
                )}
                <Button onClick={handleDelete}>삭제</Button>
            </form>
        </div>
    );
}

function checkRequiredFields(userDetails, editedUser) {
    return userDetails.filter(detail => detail.required && !editedUser[detail.key]).map(detail => detail.label);
}

export default UserProfile;
