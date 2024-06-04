// useRefreshToken.js
import axios from "../services/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async (email) => {
        try {
            console.log('useRefreshToken: Refreshing token'); // 디버깅 로그 추가

            const response = await axios.post("/auth/refresh", { email }, {
                withCredentials: true
            });
            setAuth(prev => {
                console.log('useRefreshToken - JSON.stringify(prev)', JSON.stringify(prev));
                console.log('useRefreshToken - response.data.accessToken', response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // 에러를 호출한 곳으로 다시 전파
        }
    }
    return refresh;
}

export default useRefreshToken;