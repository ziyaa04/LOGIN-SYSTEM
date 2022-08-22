import {createContext, useContext} from "react";

export interface IAuthContextValue {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContextValue>({isAuth: false, setIsAuth: () => null});