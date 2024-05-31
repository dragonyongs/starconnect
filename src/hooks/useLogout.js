import axios from "../services/axiosInstance"; // Ensure the path is correct
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('/auth/logout', {}, { withCredentials: true });
            console.log('Logout response:', response);
            localStorage.removeItem('roles');
        } catch (err) {
            console.error('Logout error:', err);
        }
    }

    return logout;
}

export default useLogout;

// 이 훅도 처리해야함