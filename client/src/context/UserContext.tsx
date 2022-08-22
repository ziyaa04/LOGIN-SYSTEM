import {createContext} from "react";
import {IUser} from "../services/responses/AuthResponse";

export interface IUserContextValue {
    user?: IUser;
}

export const UserContext = createContext<IUserContextValue>({});