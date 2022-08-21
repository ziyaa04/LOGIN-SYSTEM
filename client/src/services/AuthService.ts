import api from "../http/axios";
import {AxiosResponse} from "axios";
import {ILoginResponse, ISuccessResponse} from "./responses/AuthResponse";


export class AuthService {
    static async Login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
        return api.post<ILoginResponse>('/auth/login', {email, password});
    }

    static async SignUp(email: string, password: string, confirmPassword: string): Promise<AxiosResponse<ILoginResponse>> {
        return api.post<ILoginResponse>('/auth/sign-up', {email, password, confirmPassword});
    }

    static async Logout(): Promise<AxiosResponse<ISuccessResponse>> {
        return api.post<ISuccessResponse>('/auth/logout');
    }

}