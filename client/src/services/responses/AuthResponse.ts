export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface ISuccessResponse {
    success: string;
}

export interface IUser {
    email: string;
    isActivated: boolean;
    roles: string[];
}