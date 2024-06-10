import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [auth, navigate]);

    return children;
};

export default PublicRoute;
