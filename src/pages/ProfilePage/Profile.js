import React from "react";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthProvider";
import Button from '../../components/Button';
import useLogout from '../../hooks/useLogout';

const ProfilePage = () => {
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogOut = async () => {
        await logout();
        navigate('/login'); // Redirect to login page after logout
    }

    return (
        <div>
            <h1>profile Page</h1>
            <div className="flexGrow">
                <Button onClick={handleLogOut}>Sign Out</Button>
            </div>
        </div>
    );
}

export default ProfilePage;