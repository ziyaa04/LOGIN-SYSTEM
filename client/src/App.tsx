import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthRouter from "./routers/AuthRouter";
import UserRouter from "./routers/UserRouter";
import HomeRouter from "./routers/HomeRouter";
import {AuthContext} from "./context/AuthContext";
import {CookiesProvider} from "react-cookie";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const contextStore = {
        isAuth,
        setIsAuth
    };

    useEffect(() => {

    }, [])

    return (
        <AuthContext.Provider value={contextStore}>
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="user/*" element={<UserRouter/>}/>
                        <Route path="auth/*" element={<AuthRouter/>}/>
                        <Route path="/*" element={<HomeRouter/>}/>
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
        </AuthContext.Provider>
    );
}

export default App;
