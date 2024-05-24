import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetchUsers from '../hooks/useFetchUsers';
import LoadingError from './LoadingError';
import Button from '../components/Button';

const Main = () => {
    const navigate = useNavigate();
    const { users, loading, error } = useFetchUsers();

    const handleClick = () => {
        console.log('버튼이 클릭되었습니다.');
        navigate('/register');
    };
    
    return (
        <>
            <h3>Main</h3>

            <LoadingError loading={loading} error={error} /> {/* LoadingError 컴포넌트 사용 */}

            <ul>
                {users.map((user, index) => (
                    <li key={user._id}>
                        <Link to={`/users/${user._id}`}>{index + 1} {user.name}</Link>
                    </li>
                ))}
            </ul>

            <Button onClick={handleClick}>회원가입</Button>
        </>
    );
};

export default Main;
