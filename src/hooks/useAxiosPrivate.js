import { axiosPrivate } from "../services/axiosInstance";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                const expiresIn = sessionStorage.getItem("expiresIn");
                if (expiresIn) {
                    const expirationTime = new Date(expiresIn);
                    const currentTime = new Date();
                    const timeDifference = expirationTime - currentTime;
                    if (timeDifference < 60000) {
                        try {
                            await refresh();
                        } catch (error) {
                            console.error('Error refreshing token:', error);
                            throw error; // 에러를 호출한 곳으로 다시 전파
                        }
                    }
                }
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log('useAxiosPrivate-config', config); // 디버깅 로그 추가
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('newAccessToken', newAccessToken); // 디버깅 로그 추가
                    
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;
