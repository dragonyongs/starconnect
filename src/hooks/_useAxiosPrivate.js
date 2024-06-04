// useAxiosPrivate.js
import { axiosPrivate } from "../services/axiosInstance";
import { useEffect, useRef } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const isRefreshing = useRef(false); // 새로고침 요청이 진행 중인지 여부를 추적

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {
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
                    if (!isRefreshing.current) { // 새로고침 요청 중이 아닌 경우에만 처리
                        isRefreshing.current = true;
                        try {
                            const newAccessToken = await refresh();
                            console.log('newAccessToken', newAccessToken); // 디버깅 로그 추가
                            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            prevRequest.sent = true;
                            return axiosPrivate(prevRequest);
                        } catch (refreshError) {
                            console.error('Error refreshing access token:', refreshError);
                            return Promise.reject(error); // 새로고침 실패 시 에러 전파
                        } finally {
                            isRefreshing.current = false; // 새로고침 완료 후 플래그 초기화
                        }
                    }
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
