
// axios.defaults.withCredentials = true;

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_DEV_BASE_URL,
//     withCredentials: true,
// });



// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken');
//         console.log('token--axiosInstance', token);
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

import axios from 'axios';
import { process } from "process";

const BASE_URL = process.env.REACT_APP_DEV_BASE_URL;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});