import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthRouter from "./routers/AuthRouter";
import UserRouter from "./routers/UserRouter";
import HomeRouter from "./routers/HomeRouter";
import {AuthContext, IAuthContextValue} from "./context/AuthContext";
import {CookiesProvider} from "react-cookie";
import {AuthService} from "./services/AuthService";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
    const contextStore: IAuthContextValue = {
        isAuth,
        setIsAuth,
    };

    useEffect(() => {
        const request = AuthService.RefreshToken();
        request.then(response => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setIsAuth(true);
        }).catch(err => {
            console.log('error:' + err);
            localStorage.setItem('accessToken', '');
            setIsAuth(false);
        }).finally(() => {
            setIsCheckingAuth(false);
        });
    }, [])

    return (
        <AuthContext.Provider value={contextStore}>
            <CookiesProvider>
                <BrowserRouter>
                    {!isCheckingAuth
                        ?
                        <Routes>
                            <Route path="user/*" element={<UserRouter/>}/>
                            <Route path="auth/*" element={<AuthRouter/>}/>
                            <Route path="/*" element={<HomeRouter/>}/>
                        </Routes>
                        : <div>Loading...</div>
                    }
                </BrowserRouter>
            </CookiesProvider>
        </AuthContext.Provider>
    );
}

export default App;
