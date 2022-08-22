import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {TokenService} from "../services/TokenService";
import {AuthService} from "../services/AuthService";
import {ILoginResponse} from "../services/responses/AuthResponse";

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


api.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, async (err: AxiosError) => {
    const originalReq = err.config as AxiosRequestConfig & { _isRetry?: boolean };
    const status = err.response?.status;
    if ((status === 401 || status === 403) && !originalReq._isRetry) {
        const newOriginalReq = {...originalReq, _isRetry: true};
        const response = await axios.get<ILoginResponse>(`${API_URL}/auth/refresh-token`, {withCredentials: true});
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(newOriginalReq);
    } else throw err;
})


export default api;