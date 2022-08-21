import axios, {AxiosRequestConfig} from 'axios';
import {TokenService} from "../services/TokenService";

export const API_URL = 'http://localhost:8000';


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
    const _token = TokenService.generateToken(50);
    config.data = {_token, ...config.data};
    config!.headers!.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});


export default api;