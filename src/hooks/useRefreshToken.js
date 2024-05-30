import axios from "../services/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/auth/refresh",  {
            withCredentials: true
        });
        setAuth(prev => {
            console.log('useRefreshToken-JSON.stringify(prev)', JSON.stringify(prev));
            console.log('useRefreshToken-response.data.accessToken', response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;