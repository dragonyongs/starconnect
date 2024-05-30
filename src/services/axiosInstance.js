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