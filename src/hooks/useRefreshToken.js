// useRefreshToken.js
import axios from "../services/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {

                console.log('useRefreshToken-auth', auth);

                // 리프레시 토큰 요청
                const response = await axios.post("/auth/refresh", { email: auth.email }, {
                    withCredentials: true
                });

                console.log('useRefreshToken-response', response);
                const accessToken = response.data.accessToken;
                console.log('response-accessToken', accessToken);
                const expiresIn = new Date(response.data.expiresIn).toISOString();

                console.log('response-expiresIn', expiresIn);

                // 새로운 액세스 토큰을 auth 상태에 반영
                setAuth(prev => ({
                    ...prev,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }));

                return accessToken;

            
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    return refresh;
}

export default useRefreshToken;
