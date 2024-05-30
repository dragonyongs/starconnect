import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Button from '../../components/Button';

const ProfilePage = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <div>
            <h1>profile Page</h1>
            <div className="flexGrow">
                <Button onClick={logout}>Sign Out</Button>
            </div>
        </div>
    );
}

export default ProfilePage;