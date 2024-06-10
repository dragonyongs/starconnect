import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetchUsers from '../../hooks/useFetchUsers';
import LoadingError from '../../layouts/LoadingError';
import Button from '../../components/Button';
import useLogout from '../../hooks/useLogout';

const Main = () => {
    const navigate = useNavigate();
    const { users, loading, error } = useFetchUsers();
    const logout = useLogout();

    const handleClick = () => {
        navigate('/register');
    };

    const handleLogOut = async () => {
        await logout();
        navigate('/login'); // Redirect to login page after logout
    }
    
    return (
        <>
            <h3>Main</h3>

            <LoadingError loading={loading} error={error} /> {/* LoadingError 컴포넌트 사용 */}

            <ul>
                {users.map((user, index) => (
                    <li key={user._id}>
                        <Link to={`/users/${user._id}`}>{index + 1}. {user.name}</Link>
                    </li>
                ))}
            </ul>

            <Button type="button" onClick={handleClick}>회원가입</Button>
            <Button type="button" onClick={handleLogOut}>로그아웃</Button>
        </>
    );
};

export default Main;
